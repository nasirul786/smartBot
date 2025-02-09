/*CMD
  command: /setup
  help: 
  need_reply: false
  auto_retry_time: 
  folder: ⚙️ Setup

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// uncomment this for production
//return

// add new language here
//only 5 language can be set once
const languages = ['hinglish', 'id', 'pt', 'bn', 'ru']
//const languages = ['en','de', 'es', 'fr', 'hi']

let cmdName;
for(let i in languages){
  cmdName = "lng-" + languages[i];
  Bot.run({ command: cmdName })
}

Bot.sendMessage("Setup complete.");
