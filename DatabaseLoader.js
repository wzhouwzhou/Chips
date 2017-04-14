
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
			// asdf
		}
		else if (sheet.title == 'quests') {
			// fdsa
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
	sheets: sheets
	// more stuff here
};
