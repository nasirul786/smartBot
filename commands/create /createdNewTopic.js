/*CMD
  command: createdNewTopic
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

var randomString = Math.random().toString(36).substring(2, 7).toUpperCase();

if (!options) {
  WebApp.render({
    content: {
      success: false,
      msg: "Form Data not received"
    },
    mime_type: "application/json"
  });
  return;
}

Bot.setProp("topicId", randomString); // We need topic ID to restrict multiple submissions
Bot.setProp({
  name: "currentTopic",
  value: options.form,
  type: "json"
});

WebApp.render({
  content: {
    success: true,
    msg: "Form saved Successfully"
  },
  mime_type: "application/json"
});

smartBot.run({
  command: "newTopicCreated",
  options: {
    user_telegramid: options.userid
  }
});
