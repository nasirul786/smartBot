/*CMD
  command: setLng
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

let newLang  = params; // it is "en", "fr"
let message_id = request.message?.message_id;

smartBot.setUserLang(newLang);
smartBot.add({ newLang: newLang });

if (message_id) {
  Api.deleteMessage({
    message_id: message_id
  })
}
