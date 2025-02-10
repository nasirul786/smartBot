/*CMD
  command: /del
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

if (request.message?.message_id) {
  Api.deleteMessage({
    message_id: request.message?.message_id
  })
}
