/*CMD
  command: /accept
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

var userId = params;
var messageId = request.message?.message_id;
var admins = [7378059553, 519829299];

// Check if the user is an admin
if (!admins.includes(user.telegramid)) {
  return smartBot.run({ command: "notAuthorised" });
}

// Validate required parameters
if (!userId) {
  return;
}

if (!messageId) {
  return smartBot.run({ command: "noMessageIdError" });
}

// Proceed with the action
smartBot.run({
  command: "acceptedAdminMessage",
  options: {
    userid: userId,
    message_id: messageId
  }
});
