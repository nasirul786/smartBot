/*CMD
  command: lng-bn
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

const currentLang = "🇧🇩 বাংলা";

const LANG = {
  "commands": {
    "/start": {
      text: "*Opinion Reward-এ স্বাগতম!*\n\nবিভিন্ন বিষয়ে আপনার মতামত শেয়ার করে BBPoints উপার্জন করুন।",
      keyboard: "#/keyboard/mainMenu"
    },
    "/menu": {
      text: "প্রধান মেনু।\n\nআপনার মতামত জানাতে নিচের বোতামে ক্লিক করুন।",
      keyboard: "#/keyboard/mainMenu"
    },
    "notAuthorised": {
      text: "শুধুমাত্র অ্যাডমিনরা এটি করতে পারেন"
    },
    "newTopicCreated": {
      text: "নতুন টপিক সফলভাবে তৈরি হয়েছে"
    },
    "/newTopicMessage": {
      text: "নতুন টপিক তৈরি করতে নিচের বোতামে ক্লিক করুন। এরপর সকল ব্যবহারকারী এই টপিকে তাদের মতামত জানাতে পারবেন।",
      inline_buttons: [
        [{ text: "নতুন টপিক তৈরি করুন", web_app: { url: "https://api.bots.business/v2/bots/{botid}/web-app/createForm" } }]
      ]
    },
    "noMessageIdError": {
      alert: "মেসেজ আইডি পাওয়ার সময় ত্রুটি হয়েছে"
    },
    "/recievedAnswer": {
      text: "আপনার উত্তর লগ চ্যানেলে জমা দেওয়া হয়েছে। একজন অ্যাডমিন এটি পর্যালোচনা করবেন এবং আপনি যোগ্য হলে BBP পুরস্কার পাঠাবেন। আপনার জমা দেওয়া মতামত অনুমোদিত বা বাতিল হলে আপনাকে একটি বিজ্ঞপ্তি পাঠানো হবে।",
      inline_buttons: "#/keyboard/getAns",
      run: { command: "sendToAdmin", params: { userid: "{userid}" } }
    },
    "sendToAdmin": {
      text: "ব্যবহারকারী {userid} একটি মতামত জমা দিয়েছেন। দয়া করে এটি পর্যালোচনা করুন এবং প্রয়োজনীয় BBP প্রদান করুন।\n\nBBP ট্রান্সফার ওয়েবহুক কাজ করছিল না, তাই আমরা এটি ম্যানুয়ালি পাঠানোর বোতাম যুক্ত করেছি।\n\nBBP প্রেরণের আগে নিশ্চিত করুন এবং তারপর ✅ চিহ্নিত করুন।",
      chat_id: "-1002289286399",
      inline_buttons: [
        [{ text: "উত্তর দেখুন", url: "https://api.bots.business/v2/bots/1890089/web-app/ans?id={topicid}" }],
        [{ text: "বাতিল করুন", callback_data: "/declined {userid}" }],
        [{ text: "BBP ম্যানুয়ালি পাঠান", url: "https://t.me/BBPointBot?start=req1887-5-points-to-{userid}" }],
        [{ text: "BBP সফলভাবে পাঠানো হয়েছে ✅", callback_data: "/accept {userid}" }]
      ]
    },
    "declinedAdminMessage": {
      text: "আপনি এই মতামত বাতিল করেছেন। ({userid})\n\n*অযোগ্য* ❌",
      edit: true,
      message_id: "{message_id}",
      run: { command: "declinedUserMessage", params: { userid: "{userid}" } }
    },
    "declinedUserMessage": {
      text: "অ্যাডমিন আপনার মতামত *বাতিল* করেছেন। BBP পুরস্কার প্রদান করা হবে না।",
      chat_id: "{userid}"
    },
    "acceptedAdminMessage": {
      text: "আপনি এই মতামত *অনুমোদন* করেছেন এবং BBP পাঠিয়েছেন। ({userid})\n\n*পুরস্কৃত ✅*",
      edit: true,
      message_id: "{message_id}",
      run: { command: "acceptedUserMessage", params: { userid: "{userid}" } }
    },
    "acceptedUserMessage": {
      text: "অভিনন্দন! 🎉 আপনার মতামত *অনুমোদিত হয়েছে*, এবং আপনার BBP পুরস্কার @BBPointbot-এ জমা হয়েছে।",
      chat_id: "{userid}"
    },
    "giveOpinion": {
      alias: "#/button/giveOpinion",
      text: "বর্তমান টপিকের উপর আপনার মতামত জানানোর জন্য নিচের বোতামে ক্লিক করুন: {topic}",
      inline_buttons: "#/keyboard/give_opinion"
    },
    "selectLanguage": {
      alias: "#/button/changeLanguage",
      text: "অনুগ্রহ করে আপনার পছন্দের ভাষা নির্বাচন করুন।\n\nবর্তমান ভাষা: \"{curLang}\"",
      inline_buttons: "#/keyboard/selectLanguage"
    },
    "setLng": {
      text: "ভাষা পরিবর্তন করা হয়েছে \"{newLang}\"",
      run: { command: "/menu" }
    }
  },
  "titles": {
    curLang: currentLang
  },
  "types": {
    button: {
      giveOpinion: "মতামত দিন",
      changeLanguage: "🌐 ভাষা পরিবর্তন করুন"
    },
    keyboard: {
      mainMenu: "📰 মতামত দিন,\n🌐 ভাষা পরিবর্তন করুন",
      getAns: [
        [
          {
            text: "উত্তর দেখুন",
            web_app: { url: "https://api.bots.business/v2/bots/{botid}/web-app/ans?id={topicid}" }
          }
        ]
      ],
      give_opinion: [
        [
          {
            text: "মতামত দিন",
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
        [{ text: "❌ বাতিল করুন", command: "/del" }]
      ]
    }
  }
};

smartBot.setupLng("bn", LANG);
