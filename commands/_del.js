/*CMD
  command: /del
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

if (request.message?.message_id) {
  Api.deleteMessage({
    message_id: request.message?.message_id
  })
}
