/*CMD
  command: lng-en
  help: 
  need_reply: false
  auto_retry_time: 
  folder: lang files

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

const currentLang = "🇺🇸 English";

const LANG = {
  "commands": {
    "/start": {
      text: "*Welcome to Opinion Reward!*\n\nEarn BBPoints by sharing your opinions on various topics.",
      keyboard: "#/keyboard/mainMenu"
    },
    "/menu": {
      text: "Main menu. \n\nClick the button below to give your opinion.",
      keyboard: "#/keyboard/mainMenu"
    },
    "notAuthorised": {
      text: "Only admins can do this"
    },
    "newTopicCreated": {
      text: "New topic created successfully"
    },
    "/newTopicMessage": {
      text: "Click the button below to create a new topic. Then, all users will be able to give their opinions on this new topic.",
      inline_buttons: [
        [{ text: "Create New Topic", web_app: { url: "https://api.bots.business/v2/bots/{botid}/web-app/createForm" } }]
      ]
    },
    "noMessageIdError": {
      alert: "Error while getting message ID"
    },
    "/recievedAnswer": {
      text: "Your answers have been submitted to the log channel. An admin will review them and send you a BBP reward if eligible. You will receive a notification once your submission is approved or declined.",
      inline_buttons: "#/keyboard/getAns",
      run: { command: "sendToAdmin", params: { userid: "{userid}" } }
    },
    "sendToAdmin": {
      text: "User {userid} has submitted an opinion. Please review it and reward them accordingly.\n\nThe BBP transfer webhook URL was not working, so we've added a manual transfer button for this.\n\nPlease ensure the BBP is transferred before marking this as ✅.",
      chat_id: "-1002289286399",
      inline_buttons: [
        [{ text: "See Answers", url: "https://api.bots.business/v2/bots/1890089/web-app/ans?id={topicid}" }],
        [{ text: "Decline", callback_data: "/declined {userid}" }],
        [{ text: "Send BBP Manually", url: "https://t.me/BBPointBot?start=req1887-5-points-to-{userid}" }],
        [{ text: "BBP Sent Successfully ✅", callback_data: "/accept {userid}" }]
      ]
    },
    "declinedAdminMessage": {
      text: "You have declined this opinion. ({userid})\n\n*Not Eligible* ❌",
      edit: true,
      message_id: "{message_id}",
      run: { command: "declinedUserMessage", params: { userid: "{userid}" } }
    },
    "declinedUserMessage": {
      text: "Admin has *declined* your opinion. BBP reward will not be credited.",
      chat_id: "{userid}"
    },
    "acceptedAdminMessage": {
      text: "You have *approved* this opinion and sent BBP. ({userid})\n\n*Rewarded ✅*",
      edit: true,
      message_id: "{message_id}",
      run: { command: "acceptedUserMessage", params: { userid: "{userid}" } }
    },
    "acceptedUserMessage": {
      text: "Congratulations! 🎉 Your opinion has been *approved*, and your BBP reward has been credited on @BBPointbot.",
      chat_id: "{userid}"
    },
    "giveOpinion": {
      alias: "#/button/giveOpinion",
      text: "Click the button below to give your opinion on the current topic: {topic}",
      inline_buttons: "#/keyboard/give_opinion"
    },
    "selectLanguage": {
      alias: "#/button/changeLanguage",
      text: "Please select your preferred language. \n\nCurrent language: \"{curLang}\"",
      inline_buttons: "#/keyboard/selectLanguage"
    },
    "setLng": {
      text: "Language changed to \"{newLang}\"",
      run: { command: "/menu" }
    }
  },
  "titles": {
    curLang: currentLang
  },
  "types": {
    button: {
      giveOpinion: "Give Opinion",
      changeLanguage: "🌐 Change Language"
    },
    keyboard: {
      mainMenu: "📰 Give Opinion,\n🌐 Change Language",
      getAns: [
        [
          {
            text: "See Answers",
            web_app: { url: "https://api.bots.business/v2/bots/{botid}/web-app/ans?id={topicid}" }
          }
        ]
      ],
      give_opinion: [
        [
          {
            text: "Give Opinion",
            web_app: { url: "https://api.bots.business/v2/bots/{botid}/web-app/form?id={id}" }
          }
        ]
      ],
      selectLanguage: [
        [{ text: "🇺🇸 English", command: "setLng en" }, { text: "🇪🇸 Español", command: "setLng es" }],
        [{ text: "🇷🇺 Русский", command: "setLng ru" }, { text: "🇮🇳 हिंदी", command: "setLng hi" }],
        [{ text: "🇫🇷 Français", command: "setLng fr" }, { text: "🇧🇷 Português", command: "setLng pt" }],
        [{ text: "🇩🇪 Deutsch", command: "setLng de" }, { text: "🇮🇩 Bahasa Indonesia", command: "setLng id" }],
        [{ text: "🇧🇩 বাংলা", command: "setLng bn" }, { text: "🇮🇳 Hinglish", command: "setLng hinglish" }],
        [{ text: "❌ Cancel", command: "/del" }]
      ]
    }
  }
};

smartBot.setupLng("en", LANG);
