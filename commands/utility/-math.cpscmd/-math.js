require('nodecpp-test')
const splitter = (/(\s|,)+/)

module.exports = {
  name: '-math',
  async func(msg, { suffix, args, send }) {

    if (!suffix.substring(suffix.indexOf(args[0])).match(/[0-9,]/))
      return send('Numbers/Comma\'s?')
    
    if(args[0].match(/add|plus/)) 
      suffix.split(splitter)
      return send(`${math.add(splitter)}`) 
    
    if(args[0]==='round') 
      suffix.split(splitter)
      return send(`${math.round(spliter)}`)
    
    if(args[0].match(/min|minimum|low|lowest/)) 
      suffix.split(splitter)
      return send(`${math.min(splitter)}`)
    
    if(args[0].match(/highest|high|maximum|max/)) 
      suffix.split(splitter)
      return send(`${math.max(splitter)}`) 
    
    if(args[0].match(/pi|mathpi/)) 
      return send(`${math.PI}`)
  }  
}
