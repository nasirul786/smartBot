/*CMD
  command: get-answer
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

var id = options.id;
var ans = Bot.getProp(id)

if (!ans) {
  return WebApp.render({
    content: {
      success: false,
      msg: "Answer not found"
    },
    mime_type: 'application/json'
  })
}

WebApp.render({
  content: ans,
  mime_type: 'application/json'
});
