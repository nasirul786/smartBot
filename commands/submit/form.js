/*CMD
  command: form
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

// command index
WebApp.render({
  template: "submit.html",
  // you can pass mime type also:
  mime_type: "text/html" // html by default
});
