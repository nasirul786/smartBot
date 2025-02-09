/*CMD
  command: lng-ru
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

const currentLang = "🇷🇺 Русский";

const LANG = {
  "commands": {
    "/start": {
      text: "*Добро пожаловать в Opinion Reward!*\n\nЗарабатывайте BBPoints, делясь своим мнением по различным темам.",
      keyboard: "#/keyboard/mainMenu"
    },
    "/menu": {
      text: "Главное меню. \n\nНажмите кнопку ниже, чтобы оставить свое мнение.",
      keyboard: "#/keyboard/mainMenu"
    },
    "notAuthorised": {
      text: "Только администраторы могут выполнить это действие."
    },
    "newTopicCreated": {
      text: "Новая тема успешно создана."
    },
    "/newTopicMessage": {
      text: "Нажмите кнопку ниже, чтобы создать новую тему. После этого все пользователи смогут оставить свое мнение по этому вопросу.",
      inline_buttons: [
      [{text: "Создать новую тему", web_app: {url: "https://api.bots.business/v2/bots/{botid}/web-app/createForm"}}]
      ]
    },
    "noMessageIdError": {
      alert: "Ошибка при получении ID сообщения."
    },
    "/recievedAnswer": {
      text: "Ваши ответы были отправлены в канал логирования. Администратор проверит их и начислит BBP, если они подходят. Вы получите уведомление, когда ваша заявка будет одобрена или отклонена.",
      inline_buttons: "#/keyboard/getAns",
      run: { command: "sendToAdmin", params: { userid: "{userid}" } }
    },
    "sendToAdmin": {
      text: "Пользователь {userid} отправил мнение. Пожалуйста, рассмотрите его и начислите награду.\n\nURL вебхука перевода BBP не работает, поэтому мы добавили кнопку ручного перевода.\n\nУбедитесь, что BBP был переведен, прежде чем отмечать как ✅.",
      chat_id: "-1002289286399",
      inline_buttons: [
        [{ text: "Посмотреть ответы", url: "https://api.bots.business/v2/bots/1890089/web-app/ans?id={topicid}" }], 
        [{ text: "Отклонить", callback_data: "/declined {userid}" }],
        [{ text: "Отправить BBP вручную", url: "https://t.me/BBPointBot?start=req1887-5-points-to-{userid}"}],
        [{ text: "BBP успешно отправлен ✅", callback_data: "/accept {userid}" }]
      ]
    },
    "declinedAdminMessage": {
      text: "Вы отклонили это мнение. ({userid})\n\n*Не подходит* ❌",
      edit: true,
      message_id: "{message_id}",
      run: { command: "declinedUserMessage", params: { userid: "{userid}" } }
    },
    "declinedUserMessage": {
      text: "Администратор *отклонил* ваше мнение. BBP не будет начислен.",
      chat_id: "{userid}"
    },
    "acceptedAdminMessage": {
      text: "Вы *одобрили* это мнение и отправили BBP. ({userid})\n\n*Награда выдана ✅*",
      edit: true,
      message_id: "{message_id}",
      run: { command: "acceptedUserMessage", params: { userid: "{userid}" } }
    },
    "acceptedUserMessage": {
      text: "Поздравляем! 🎉 Ваше мнение *одобрено*, и BBP начислен в @BBPointBot.",
      chat_id: "{userid}"
    },
    "giveOpinion": {
      alias: "#/button/giveOpinion",
      text: "Нажмите кнопку ниже, чтобы оставить свое мнение по текущей теме: {topic}",
      inline_buttons: "#/keyboard/give_opinion"
    },
    "selectLanguage": {
      alias: "#/button/changeLanguage",
      text: "Пожалуйста, выберите предпочитаемый язык. \n\nТекущий язык: \"{curLang}\"",
      inline_buttons: "#/keyboard/selectLanguage"
    },
    "setLng": {
      text: "Язык изменен на \"{newLang}\"",
      run: { command: "/menu" }
    }
  },
  "titles": {
    curLang: currentLang
  },
  "types": {
    button: {
      giveOpinion: "Оставить мнение",
      changeLanguage: "🌐 Изменить язык"
    },
    keyboard: {
      mainMenu: "📰 Оставить мнение,\n🌐 Изменить язык",
      getAns: [
        [
          {
            text: "Посмотреть ответы",
            web_app: { url: "https://api.bots.business/v2/bots/{botid}/web-app/ans?id={topicid}" }
          }
        ]
      ],
      give_opinion: [
        [
          {
            text: "Оставить мнение",
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

smartBot.setupLng("ru", LANG);
