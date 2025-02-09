/*CMD
  command: lng-es
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

const currentLang = "🇪🇸 Español";

const LANG = {
  "commands": {
    "/start": {
      text: "*¡Bienvenido a Opinion Reward!*\n\nGana BBPoints compartiendo tus opiniones sobre diversos temas.",
      keyboard: "#/keyboard/mainMenu"
    },
    "/menu": {
      text: "Menú principal.\n\nHaz clic en el botón de abajo para dar tu opinión.",
      keyboard: "#/keyboard/mainMenu"
    },
    "notAuthorised": {
      text: "Esto solo es para administradores."
    },
    "newTopicCreated": {
      text: "¡Nuevo tema creado con éxito!"
    },
    "/newTopicMessage": {
      text: "Haz clic en el botón de abajo para crear un nuevo tema y permitir que los usuarios den su opinión.",
      inline_buttons: [
        [{ text: "Crear nuevo tema", web_app: { url: "https://api.bots.business/v2/bots/{botid}/web-app/createForm" } }]
      ]
    },
    "noMessageIdError": {
      alert: "Error al obtener el ID del mensaje."
    },
    "/recievedAnswer": {
      text: "Tus respuestas han sido enviadas al canal de registro. Un administrador las revisará y, si eres elegible, recibirás una recompensa de BBP. Recibirás una notificación cuando tu envío sea aprobado o rechazado.",
      inline_buttons: "#/keyboard/getAns",
      run: { command: "sendToAdmin", params: { userid: "{userid}" } }
    },
    "sendToAdmin": {
      text: "El usuario {userid} ha enviado una opinión. Por favor, revísala y otórgale la recompensa correspondiente.\n\nLa URL del webhook de transferencia de BBP no está funcionando, por lo que hemos agregado un botón de transferencia manual.\n\nAsegúrate de transferir el BBP antes de marcarlo como ✅.",
      chat_id: "-1002289286399",
      inline_buttons: [
        [{ text: "Ver respuestas", url: "https://api.bots.business/v2/bots/1890089/web-app/ans?id={topicid}" }],
        [{ text: "Rechazar", callback_data: "/declined {userid}" }],
        [{ text: "Enviar BBP manualmente", url: "https://t.me/BBPointBot?start=req1887-5-points-to-{userid}" }],
        [{ text: "BBP enviado con éxito ✅", callback_data: "/accept {userid}" }]
      ]
    },
    "declinedAdminMessage": {
      text: "Has rechazado esta opinión. ({userid})\n\n*No elegible* ❌",
      edit: true,
      message_id: "{message_id}",
      run: { command: "declinedUserMessage", params: { userid: "{userid}" } }
    },
    "declinedUserMessage": {
      text: "El administrador ha *rechazado* tu opinión. No recibirás la recompensa de BBP.",
      chat_id: "{userid}"
    },
    "acceptedAdminMessage": {
      text: "Has *aprobado* esta opinión y enviado BBP. ({userid})\n\n*Recompensado ✅*",
      edit: true,
      message_id: "{message_id}",
      run: { command: "acceptedUserMessage", params: { userid: "{userid}" } }
    },
    "acceptedUserMessage": {
      text: "¡Felicidades! 🎉 Tu opinión ha sido *aprobada* y tu recompensa de BBP ha sido acreditada en @BBPointBot.",
      chat_id: "{userid}"
    },
    "giveOpinion": {
      alias: "#/button/giveOpinion",
      text: "Haz clic en el botón de abajo para dar tu opinión sobre el tema actual: {topic}",
      inline_buttons: "#/keyboard/give_opinion"
    },
    "selectLanguage": {
      alias: "#/button/changeLanguage",
      text: "Selecciona tu idioma preferido.\n\nIdioma actual: \"{curLang}\"",
      inline_buttons: "#/keyboard/selectLanguage"
    },
    "setLng": {
      text: "El idioma ha cambiado a \"{newLang}\".",
      run: { command: "/menu" }
    }
  },
  "titles": {
    curLang: currentLang
  },
  "types": {
    button: {
      giveOpinion: "Dar opinión",
      changeLanguage: "🌐 Cambiar idioma"
    },
    keyboard: {
      mainMenu: "📰 Dar opinión,\n🌐 Cambiar idioma",
      getAns: [
        [
          {
            text: "Ver respuestas",
            web_app: { url: "https://api.bots.business/v2/bots/{botid}/web-app/ans?id={topicid}" }
          }
        ]
      ],
      give_opinion: [
        [
          {
            text: "Dar opinión",
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

smartBot.setupLng("es", LANG);
