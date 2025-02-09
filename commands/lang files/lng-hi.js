/*CMD
  command: lng-hi
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

const currentLang = "🇮🇳 हिंदी";

const LANG = {
  "commands": {
    "/start": {
      text: "*ओपिनियन रिवार्ड में आपका स्वागत है!*\n\nविभिन्न विषयों पर अपनी राय साझा करके BBPoints कमाएँ।",
      keyboard: "#/keyboard/mainMenu"
    },
    "/menu": {
      text: "मुख्य मेनू। \n\nअपनी राय देने के लिए नीचे दिए गए बटन पर क्लिक करें।",
      keyboard: "#/keyboard/mainMenu"
    },
    "notAuthorised": {
      text: "केवल एडमिन ही यह कर सकते हैं"
    },
    "newTopicCreated": {
      text: "नया विषय सफलतापूर्वक बनाया गया"
    },
    "/newTopicMessage": {
      text: "नया विषय बनाने के लिए नीचे दिए गए बटन पर क्लिक करें, फिर सभी उपयोगकर्ता इस नए विषय पर अपनी राय दे सकेंगे।",
      inline_buttons: [
      [{text: "नया विषय बनाएँ", web_app: {url: "https://api.bots.business/v2/bots/{botid}/web-app/createForm"}}]
      ]
    },
    "noMessageIdError": {
      alert: "संदेश आईडी प्राप्त करने में त्रुटि"
    },
    "/recievedAnswer": {
      text: "आपके उत्तर लॉग चैनल में भेज दिए गए हैं। एक एडमिन उनकी समीक्षा करेगा और यदि योग्य पाया जाता है तो आपको BBP इनाम भेजेगा। स्वीकृत या अस्वीकृत होने पर आपको सूचना मिलेगी।",
      inline_buttons: "#/keyboard/getAns",
      run: { command: "sendToAdmin", params: { userid: "{userid}" } }
    },
    "sendToAdmin": {
      text: "उपयोगकर्ता {userid} ने एक राय प्रस्तुत की है। कृपया इसे समीक्षा करें और उचित इनाम दें।\n\nBBP ट्रांसफर वेबहुक URL काम नहीं कर रहा था, इसलिए हमने इसके लिए एक मैन्युअल ट्रांसफर बटन जोड़ा है।\n\nकृपया इसे ✅ के रूप में चिह्नित करने से पहले सुनिश्चित करें कि BBP ट्रांसफर किया गया है।",
      chat_id: "-1002289286399",
      inline_buttons: [
        [{ text: "उत्तर देखें", url: "https://api.bots.business/v2/bots/1890089/web-app/ans?id={topicid}" }], 
        [{ text: "अस्वीकृत", callback_data: "/declined {userid}" }],
        [{text: "BBP मैन्युअली भेजें", url: "https://t.me/BBPointBot?start=req1887-5-points-to-{userid}"}],
        [{ text: "BBP सफलतापूर्वक भेजा गया ✅", callback_data: "/accept {userid}" }]
      ]
    },
    "declinedAdminMessage": {
      text: "आपने इस राय को अस्वीकार कर दिया है। ({userid})\n\n*योग्य नहीं* ❌",
      edit: true,
      message_id: "{message_id}",
      run: { command: "declinedUserMessage", params: { userid: "{userid}" } }
    },
    "declinedUserMessage": {
      text: "एडमिन ने आपकी राय *अस्वीकृत* कर दी है। BBP इनाम प्रदान नहीं किया जाएगा।",
      chat_id: "{userid}"
    },
    "acceptedAdminMessage": {
      text: "आपने इस राय को *स्वीकृत* कर लिया है और BBP भेज दिया है। ({userid})\n\n*इनाम दिया गया ✅*",
      edit: true,
      message_id: "{message_id}",
      run: { command: "acceptedUserMessage", params: { userid: "{userid}" } }
    },
    "acceptedUserMessage": {
      text: "बधाई हो! 🎉 आपकी राय *स्वीकृत* कर ली गई है, और आपका BBP इनाम @BBPointBot पर क्रेडिट कर दिया गया है।",
      chat_id: "{userid}"
    },
    "giveOpinion": {
      alias: "#/button/giveOpinion",
      text: "वर्तमान विषय पर अपनी राय देने के लिए नीचे दिए गए बटन पर क्लिक करें: {topic}",
      inline_buttons: "#/keyboard/give_opinion"
    },
    "selectLanguage": {
      alias: "#/button/changeLanguage",
      text: "कृपया अपनी पसंदीदा भाषा चुनें। \n\nवर्तमान भाषा: \"{curLang}\"",
      inline_buttons: "#/keyboard/selectLanguage"
    },
    "setLng": {
      text: "भाषा \"{newLang}\" में बदल दी गई है।",
      run: { command: "/menu" }
    }
  },
  "titles": {
    curLang: currentLang
  },
  "types": {
    button: {
      giveOpinion: "राय दें",
      changeLanguage: "🌐 भाषा बदलें"
    },
    keyboard: {
      mainMenu: "📰 राय दें,\n🌐 भाषा बदलें",
      getAns: [
        [
          {
            text: "उत्तर देखें",
            web_app: { url: "https://api.bots.business/v2/bots/{botid}/web-app/ans?id={topicid}" }
          }
        ]
      ],
      give_opinion: [
        [
          {
            text: "राय दें",
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

smartBot.setupLng("hi", LANG);
