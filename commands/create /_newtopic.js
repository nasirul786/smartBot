/*CMD
  command: /newtopic
  help: 
  need_reply: false
  auto_retry_time: 
  folder: create 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

var message_id = request.message?.message_id;
var admins = [7378059553, 519829299]

if (!admins.includes(user.telegramid)) {
 return smartBot.run({
   command: "notAuthorised"
 });
}

smartBot.run({
  command: "/newTopicMessage",
  options: {
    botid: bot.id //required for generating webApp url dynamically, for bots cloned from this
  }
});
