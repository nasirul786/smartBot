/*CMD
  command: lng-hinglish
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

const currentLang = "🇮🇳 Hinglish";

const LANG = {
  "commands": {
    "/start": {
      text: "*Welcome to Opinion Reward!*\n\nAlag-alag topics par apni rai share karke BBPoints kamao.",
      keyboard: "#/keyboard/mainMenu"
    },
    "/menu": {
      text: "Main menu.\n\nNeeche diye gaye button par click karke apni rai do.",
      keyboard: "#/keyboard/mainMenu"
    },
    "notAuthorised": {
      text: "Ye sirf admins kar sakte hain"
    },
    "newTopicCreated": {
      text: "Naya topic safaltapurvak create ho gaya"
    },
    "/newTopicMessage": {
      text: "Naya topic banane ke liye neeche button dabayein. Phir sabhi users apni rai de sakenge.",
      inline_buttons: [
        [{ text: "Naya Topic Banao", web_app: { url: "https://api.bots.business/v2/bots/{botid}/web-app/createForm" } }]
      ]
    },
    "noMessageIdError": {
      alert: "Message ID lene me error aayi"
    },
    "/recievedAnswer": {
      text: "Aapke answers log channel me submit ho gaye hain. Ek admin unhe review karega aur agar aap eligible hain to BBP reward bhejega. Jab aapka submission approve ya decline hoga, aapko notification milega.",
      inline_buttons: "#/keyboard/getAns",
      run: { command: "sendToAdmin", params: { userid: "{userid}" } }
    },
    "sendToAdmin": {
      text: "User {userid} ne ek opinion submit kiya hai. Kripya review karein aur BBP reward dein.\n\nBBP transfer webhook kaam nahi kar raha tha, isliye humne manual transfer ka option diya hai.\n\nBBP bhejne ke baad ✅ par click karein.",
      chat_id: "-1002289286399",
      inline_buttons: [
        [{ text: "Answers Dekho", url: "https://api.bots.business/v2/bots/1890089/web-app/ans?id={topicid}" }],
        [{ text: "Decline Karo", callback_data: "/declined {userid}" }],
        [{ text: "BBP Manually Bhejo", url: "https://t.me/BBPointBot?start=req1887-5-points-to-{userid}" }],
        [{ text: "BBP Successfully Bhej Diya ✅", callback_data: "/accept {userid}" }]
      ]
    },
    "declinedAdminMessage": {
      text: "Aapne is opinion ko decline kar diya hai. ({userid})\n\n*Not Eligible* ❌",
      edit: true,
      message_id: "{message_id}",
      run: { command: "declinedUserMessage", params: { userid: "{userid}" } }
    },
    "declinedUserMessage": {
      text: "Admin ne aapka opinion *decline* kar diya. BBP reward nahi milega.",
      chat_id: "{userid}"
    },
    "acceptedAdminMessage": {
      text: "Aapne is opinion ko *approve* kar diya aur BBP bhej diya. ({userid})\n\n*Rewarded ✅*",
      edit: true,
      message_id: "{message_id}",
      run: { command: "acceptedUserMessage", user_telegramid: "{userid}", params: { userid: "{userid}" } }
    },
    "acceptedUserMessage": {
      text: "Mubarak ho! 🎉 Aapka opinion *approve* ho gaya hai, aur BBP reward @BBPointbot me credit ho gaya hai.",
      chat_id: "{userid}"
    },
    "giveOpinion": {
      alias: "#/button/giveOpinion",
      text: "Neeche diye gaye button par click karke apni rai dein: {topic}",
      inline_buttons: "#/keyboard/give_opinion"
    },
    "selectLanguage": {
      alias: "#/button/changeLanguage",
      text: "Kripya apni pasand ki language choose karein.\n\nCurrent language: \"{curLang}\"",
      inline_buttons: "#/keyboard/selectLanguage"
    },
    "setLng": {
      text: "Language \"{newLang}\" me badal diya gaya hai",
      run: { command: "/menu" }
    }
  },
  "titles": {
    curLang: currentLang
  },
  "types": {
    button: {
      giveOpinion: "Apni Rai Do",
      changeLanguage: "🌐 Language Badlo"
    },
    keyboard: {
      mainMenu: "📰 Apni Rai Do,\n🌐 Language Badlo",
      getAns: [
        [
          {
            text: "Answers Dekho",
            web_app: { url: "https://api.bots.business/v2/bots/1889497/web-app/ans?id={topicid}" }
          }
        ]
      ],
      give_opinion: [
        [
          {
            text: "Apni Rai Do",
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
        [{ text: "❌ Cancel Karo", command: "/del" }]
      ]
    }
  }
};

smartBot.setupLng("hinglish", LANG);
