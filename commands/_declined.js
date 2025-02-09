/*CMD
  command: /declined
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

var userid = params;
var message_id = request.message?.message_id;

if (!message_id) {
  return smartBot.run({
    command: "noMessageIdError"
  })
}

smartBot.run({
  command: "declinedAdminMessage",
  options: {
    userid: params,
    message_id: message_id
  }
})
