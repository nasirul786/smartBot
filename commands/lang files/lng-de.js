/*CMD
  command: lng-de
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

const currentLang = "🇩🇪 Deutsch";

const LANG = {
  "commands": {
    "/start": {
      text: "*Willkommen bei Meinungsbelohnung!*\n\nVerdiene BBPoints, indem du deine Meinungen zu verschiedenen Themen teilst.",
      keyboard: "#/keyboard/mainMenu"
    },
    "/menu": {
      text: "Hauptmenü. \n\nKlicke auf den Button unten, um deine Meinung abzugeben.",
      keyboard: "#/keyboard/mainMenu"
    },
    "notAuthorised": {
      text: "Nur Admins können das tun"
    },
    "newTopicCreated": {
      text: "Neues Thema erfolgreich erstellt"
    },
    "/newTopicMessage": {
      text: "Klicke auf den Button unten, um ein neues Thema zu erstellen. Dann können alle Nutzer ihre Meinungen zu diesem neuen Thema teilen.",
      inline_buttons: [
        [{ text: "Neues Thema erstellen", web_app: { url: "https://api.bots.business/v2/bots/{botid}/web-app/createForm" } }]
      ]
    },
    "noMessageIdError": {
      alert: "Fehler beim Abrufen der Nachrichten-ID"
    },
    "/recievedAnswer": {
      text: "Deine Antworten wurden an den Log-Kanal übermittelt. Ein Admin wird sie überprüfen und dir, wenn berechtigt, eine BBP-Belohnung zukommen lassen. Du erhältst eine Benachrichtigung, sobald deine Einreichung genehmigt oder abgelehnt wurde.",
      inline_buttons: "#/keyboard/getAns",
      run: { command: "sendToAdmin", params: { userid: "{userid}" } }
    },
    "sendToAdmin": {
      text: "Nutzer {userid} hat eine Meinung abgegeben. Bitte überprüfe sie und belohne sie entsprechend.\n\nDie BBP-Übertragungs-Webhook-URL funktionierte nicht, daher haben wir einen manuellen Übertragungsbutton hinzugefügt.\n\nBitte stelle sicher, dass die BBP übertragen werden, bevor du dies als ✅ markierst.",
      chat_id: "-1002289286399",
      inline_buttons: [
        [{ text: "Antworten anzeigen", url: "https://api.bots.business/v2/bots/1890089/web-app/ans?id={topicid}" }],
        [{ text: "Ablehnen", callback_data: "/declined {userid}" }],
        [{ text: "BBP manuell senden", url: "https://t.me/BBPointBot?start=req1887-5-points-to-{userid}" }],
        [{ text: "BBP erfolgreich gesendet ✅", callback_data: "/accept {userid}" }]
      ]
    },
    "declinedAdminMessage": {
      text: "Du hast diese Meinung abgelehnt. ({userid})\n\n*Nicht berechtigt* ❌",
      edit: true,
      message_id: "{message_id}",
      run: { command: "declinedUserMessage", params: { userid: "{userid}" } }
    },
    "declinedUserMessage": {
      text: "Ein Admin hat deine Meinung *abgelehnt*. Die BBP-Belohnung wird nicht gutgeschrieben.",
      chat_id: "{userid}"
    },
    "acceptedAdminMessage": {
      text: "Du hast diese Meinung *genehmigt* und BBP gesendet. ({userid})\n\n*Belohnt ✅*",
      edit: true,
      message_id: "{message_id}",
      run: { command: "acceptedUserMessage", params: { userid: "{userid}" } }
    },
    "acceptedUserMessage": {
      text: "Glückwunsch! 🎉 Deine Meinung wurde *genehmigt*, und deine BBP-Belohnung wurde bei @BBPointbot gutgeschrieben.",
      chat_id: "{userid}"
    },
    "giveOpinion": {
      alias: "#/button/giveOpinion",
      text: "Klicke auf den Button unten, um deine Meinung zum aktuellen Thema zu äußern: {topic}",
      inline_buttons: "#/keyboard/give_opinion"
    },
    "selectLanguage": {
      alias: "#/button/changeLanguage",
      text: "Bitte wähle deine bevorzugte Sprache. \n\nAktuelle Sprache: \"{curLang}\"",
      inline_buttons: "#/keyboard/selectLanguage"
    },
    "setLng": {
      text: "Sprache geändert auf \"{newLang}\"",
      run: { command: "/menu" }
    }
  },
  "titles": {
    curLang: currentLang
  },
  "types": {
    button: {
      giveOpinion: "Meinung abgeben",
      changeLanguage: "🌐 Sprache ändern"
    },
    keyboard: {
      mainMenu: "📰 Meinung abgeben,\n🌐 Sprache ändern",
      getAns: [
        [
          {
            text: "Antworten anzeigen",
            web_app: { url: "https://api.bots.business/v2/bots/{botid}/web-app/ans?id={topicid}" }
          }
        ]
      ],give_opinion: [
        [
          {
            text: "Meinung abgeben",
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

smartBot.setupLng("de", LANG);
