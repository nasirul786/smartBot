/*CMD
  command: formJson
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

var form = Bot.getProp("currentTopic");
var topicId = Bot.getProp("topicId");
var userId = options.id;

// Validate user ID
if (!userId) {
  WebApp.render({
    content: {
      error: true,
      msg: "Invalid request. User ID is missing."
    },
    mime_type: "application/json"
  });
  return;
}

// Check if the user has already submitted for this topic
var userCompletedTopic = Bot.getProp(topicId + "-" + userId);
if (userCompletedTopic) {
  WebApp.render({
    content: {
      error: true,
      msg: "You have already submitted your opinion on this topic.\n\nYou can submit another opinion when the admins create a new topic. Stay tuned!"
    },
    mime_type: "application/json"
  });
  return;
}

// Validate if a topic exists
if (!form) {
  WebApp.render({
    content: {
      error: true,
      msg: "No topics available at the moment. Please come back later."
    },
    mime_type: "application/json"
  });
  return;
}

// Render the topic for the user
WebApp.render({
  content: form,
  mime_type: "application/json"
});
