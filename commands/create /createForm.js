/*CMD
  command: createForm
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

// command index
WebApp.render({
  template: "createform.html",
  // you can pass mime type also:
  mime_type: "text/html" // html by default
});
