/*CMD
  command: save-answer
  help: 
  need_reply: false
  auto_retry_time: 
  folder: submit

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

var randomString = Math.random().toString(36).substring(2, 7).toUpperCase(); //this is answer id

var topicid = Bot.getProp("topicId")

Bot.setProp({
  name: randomString,
  value: options
})

Bot.setProp(topicid+"-"+options.user_id, true); //saving the user id with topic id, it will help us to verify if the user already submitted their opinion on the topic 

smartBot.run({
  command: "/recievedAnswer",
  user_telegramid: options.user_id,
  options: {
    userid: options.user_id,
    topicid: randomString,
    botid: bot.id
  }
});

WebApp.render({
  content: {
    success: true,
    msg: "Success"
  },
  mime_type: 'application/json'
});
