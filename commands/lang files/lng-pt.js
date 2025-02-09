/*CMD
  command: lng-pt
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

const currentLang = "🇵🇹 Português";

const LANG = {
  "commands": {
    "/start": {
      text: "*Bem-vindo ao Opinion Reward!*\n\nGanhe BBPoints compartilhando suas opiniões sobre vários tópicos.",
      keyboard: "#/keyboard/mainMenu"
    },
    "/menu": {
      text: "Menu principal.\n\nClique no botão abaixo para dar sua opinião.",
      keyboard: "#/keyboard/mainMenu"
    },
    "notAuthorised": {
      text: "Apenas administradores podem fazer isso"
    },
    "newTopicCreated": {
      text: "Novo tópico criado com sucesso"
    },
    "/newTopicMessage": {
      text: "Clique no botão abaixo para criar um novo tópico. Então, todos os usuários poderão dar sua opinião sobre ele.",
      inline_buttons: [
        [{ text: "Criar novo tópico", web_app: { url: "https://api.bots.business/v2/bots/{botid}/web-app/createForm" } }]
      ]
    },
    "noMessageIdError": {
      alert: "Erro ao obter o ID da mensagem"
    },
    "/recievedAnswer": {
      text: "Suas respostas foram enviadas para o canal de registro. Um administrador as revisará e enviará BBP como recompensa, se elegível. Você receberá uma notificação assim que sua submissão for aprovada ou recusada.",
      inline_buttons: "#/keyboard/getAns",
      run: { command: "sendToAdmin", params: { userid: "{userid}" } }
    },
    "sendToAdmin": {
      text: "O usuário {userid} enviou uma opinião. Por favor, revise e recompense-o adequadamente.\n\nA URL do webhook de transferência de BBP não está funcionando, então adicionamos um botão de transferência manual.\n\nCertifique-se de transferir os BBP antes de marcar como ✅.",
      chat_id: "-1002289286399",
      inline_buttons: [
        [{ text: "Ver respostas", url: "https://api.bots.business/v2/bots/1890089/web-app/ans?id={topicid}" }],
        [{ text: "Recusar", callback_data: "/declined {userid}" }],
        [{ text: "Enviar BBP Manualmente", url: "https://t.me/BBPointBot?start=req1887-5-points-to-{userid}" }],
        [{ text: "BBP enviado com sucesso ✅", callback_data: "/accept {userid}" }]
      ]
    },
    "declinedAdminMessage": {
      text: "Você recusou esta opinião. ({userid})\n\n*Não Elegível* ❌",
      edit: true,
      message_id: "{message_id}",
      run: { command: "declinedUserMessage", params: { userid: "{userid}" } }
    },
    "declinedUserMessage": {
      text: "O administrador *recusou* sua opinião. A recompensa BBP não será creditada.",
      chat_id: "{userid}"
    },
    "acceptedAdminMessage": {
      text: "Você *aprovou* esta opinião e enviou BBP. ({userid})\n\n*Recompensado ✅*",
      edit: true,
      message_id: "{message_id}",
      run: { command: "acceptedUserMessage", params: { userid: "{userid}" } }
    },
    "acceptedUserMessage": {
      text: "Parabéns! 🎉 Sua opinião foi *aprovada* e sua recompensa BBP foi creditada no @BBPointbot",
      chat_id: "{userid}"
    },
    "giveOpinion": {
      alias: "#/button/giveOpinion",
      text: "Clique no botão abaixo para dar sua opinião sobre o tópico atual: {topic}",
      inline_buttons: "#/keyboard/give_opinion"
    },
    "selectLanguage": {
      alias: "#/button/changeLanguage",
      text: "Por favor, selecione seu idioma preferido.\n\nIdioma atual: \"{curLang}\"",
      inline_buttons: "#/keyboard/selectLanguage"
    },
    "setLng": {
      text: "Idioma alterado para \"{newLang}\"",
      run: { command: "/menu" }
    }
  },
  "titles": {
    curLang: currentLang
  },
  "types": {
    button: {
      giveOpinion: "Dar opinião",
      changeLanguage: "🌐 Alterar idioma"
    },
    keyboard: {
      mainMenu: "📰 Dar opinião,\n🌐 Alterar idioma",
      getAns: [
        [
          {
            text: "Ver respostas",
            web_app: { url: "https://api.bots.business/v2/bots/{botid}/web-app/ans?id={topicid}" }
          }
        ]
      ],
      give_opinion: [
        [
          {
            text: "Dar opinião",
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

smartBot.setupLng("pt", LANG);
