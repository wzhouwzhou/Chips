
global.blacklist = {
  252525368865456130: [
      'ok',
      'xani',
      'ko',
      'ok*'
    ],
};

let sinxUsers = new Map();

const GoogleSpreadsheet = require('google-spreadsheet');

const doc = new GoogleSpreadsheet(process.env.SPREADSHEET_ID);

const sheets = {};
let numloads = -1;

const login_info = {
	client_email:process.env.SERVICE_ACCOUNT_EMAIL,
	private_key:process.env.GOOGLE_PRIVATE_KEY,
};

const loadsheet = function(sheet) {
	sheets[sheet.title] = sheet;
	sheet.getRows({offset: 1,limit: 999999}, (err, rows) => {
		if (sheet.title == 'submissions') {
			// load sheet data into some nice data structure and put it in `ex`
		}
		else if (sheet.title == 'members') {
      rows.forEach(r => {
        if(ex.sinxUsers.get(r.userid)==null)
          ex.sinxUsers.set(r.userid,r);
        else
          ex.sinxUsers.get(r.userid).points=parseInt(ex.sinxUsers.get(r.userid).points,10)+parseInt(r.points,10);

        console.log(`Loaded user pts action for user: <@${r.userid}>, ${r.points} points, approved by: <@${r.managerid}>`);
      });
		}
		else if (sheet.title == 'quests') {
			// fdsa
		}
		else if (sheet.title == 'botlog') {
			sheets[`botlog`].addRow({time: `${moment().format('ddd, Do of MMM @ HH:mm:ss')}`, action: "restart+load"},(err) => {console.log(err);});
		}
		else if (sheet.title == 'filter') {
			rows.forEach(row =>{
					if(blacklist[row.guildid]==null){
						console.log("[Filter] Creating new blacklist for guild " + row.guildid);
						blacklist[row.guildid]=['ok'];
					}
					blacklist[row.guildid].push(row.keyword);
					console.log("[Filter] Added keyword to guild " + row.guildid + ": " + row.keyword);
				});
		}
		else {
			console.log('useless sheet found: '+sheet.title);
		}
		numloads--;
		if (numloads == 0) {
			console.log('database loaded!');
			ex.ready = true;
		}
	});
};

doc.useServiceAccountAuth(login_info,() => {
	doc.getInfo((err,info) => {
		numloads = info.worksheets.length;
		for (var i=0;i<info.worksheets.length;i++) {
			loadsheet(info.worksheets[i]);
		}
	});
});


const ex = module.exports = { // module exports
	ready: false,
	sheets: sheets,
  sinxUsers: sinxUsers
	// more stuff here
};
