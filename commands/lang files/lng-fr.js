/*CMD
  command: lng-fr
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

const currentLang = "🇫🇷 Français";

const LANG = {
  "commands": {
    "/start": {
      text: "*Bienvenue sur Opinion Reward !*\n\nGagnez des BBPoints en partageant vos opinions sur divers sujets.",
      keyboard: "#/keyboard/mainMenu"
    },
    "/menu": {
      text: "Menu principal. \n\nCliquez sur le bouton ci-dessous pour donner votre avis.",
      keyboard: "#/keyboard/mainMenu"
    },
    "notAuthorised": {
      text: "Seuls les administrateurs peuvent faire cela."
    },
    "newTopicCreated": {
      text: "Nouveau sujet créé avec succès."
    },
    "/newTopicMessage": {
      text: "Cliquez sur le bouton ci-dessous pour créer un nouveau sujet. Ensuite, tous les utilisateurs pourront donner leur avis sur ce nouveau sujet.",
      inline_buttons: [
        [{ text: "Créer un nouveau sujet", web_app: { url: "https://api.bots.business/v2/bots/{botid}/web-app/createForm" } }]
      ]
    },
    "noMessageIdError": {
      alert: "Erreur lors de la récupération de l'ID du message."
    },
    "/recievedAnswer": {
      text: "Vos réponses ont été soumises au canal de journalisation. Un administrateur les examinera et vous enverra une récompense BBP si vous êtes éligible. Vous recevrez une notification une fois votre soumission approuvée ou refusée.",
      inline_buttons: "#/keyboard/getAns",
      run: { command: "sendToAdmin", params: { userid: "{userid}" } }
    },
    "sendToAdmin": {
      text: "L'utilisateur {userid} a soumis une opinion. Veuillez l'examiner et le récompenser en conséquence.\n\nL'URL du webhook de transfert BBP ne fonctionnait pas, nous avons donc ajouté un bouton de transfert manuel.\n\nVeuillez vous assurer que le BBP est transféré avant de le marquer comme ✅.",
      chat_id: "-1002289286399",
      inline_buttons: [
        [{ text: "Voir les réponses", url: "https://api.bots.business/v2/bots/1890089/web-app/ans?id={topicid}" }],
        [{ text: "Refuser", callback_data: "/declined {userid}" }],
        [{ text: "Envoyer BBP manuellement", url: "https://t.me/BBPointBot?start=req1887-5-points-to-{userid}" }],
        [{ text: "BBP envoyé avec succès ✅", callback_data: "/accept {userid}" }]
      ]
    },
    "declinedAdminMessage": {
      text: "Vous avez refusé cette opinion. ({userid})\n\n*Non éligible* ❌",
      edit: true,
      message_id: "{message_id}",
      run: { command: "declinedUserMessage", params: { userid: "{userid}" } }
    },
    "declinedUserMessage": {
      text: "L'administrateur a *refusé* votre opinion. La récompense BBP ne sera pas créditée.",
      chat_id: "{userid}"
    },
    "acceptedAdminMessage": {
      text: "Vous avez *approuvé* cette opinion et envoyé BBP. ({userid})\n\n*Récompensé ✅*",
      edit: true,
      message_id: "{message_id}",
      run: { command: "acceptedUserMessage", params: { userid: "{userid}" } }
    },
    "acceptedUserMessage": {
      text: "Félicitations ! 🎉 Votre opinion a été *approuvée*, et votre récompense BBP a été créditée sur @BBPointbot.",
      chat_id: "{userid}"
    },
    "giveOpinion": {
      alias: "#/button/giveOpinion",
      text: "Cliquez sur le bouton ci-dessous pour donner votre avis sur le sujet actuel : {topic}",
      inline_buttons: "#/keyboard/give_opinion"
    },
    "selectLanguage": {
      alias: "#/button/changeLanguage",
      text: "Veuillez sélectionner votre langue préférée. \n\nLangue actuelle : \"{curLang}\"",
      inline_buttons: "#/keyboard/selectLanguage"
    },
    "setLng": {
      text: "Langue changée en \"{newLang}\"",
      run: { command: "/menu" }
    }
  },
  "titles": {
    curLang: currentLang
  },
  "types": {
    button: {
      giveOpinion: "Donner une opinion",
      changeLanguage: "🌐 Changer de langue"
    },
    keyboard: {
      mainMenu: "📰 Donner une opinion,\n🌐 Changer de langue",
      getAns: [
        [
          {
            text: "Voir les réponses",
            web_app: { url: "https://api.bots.business/v2/bots/{botid}/web-app/ans?id={topicid}" }
          }
        ]
      ],
      give_opinion: [
        [
          {
            text: "Donner une opinion",
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
        [{ text: "❌ Cancelar", command: "/del" }]
      ]
    }
  }
};

smartBot.setupLng("fr", LANG);
