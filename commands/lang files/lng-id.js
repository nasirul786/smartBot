/*CMD
  command: lng-id
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

const currentLang = "🇮🇩 Bahasa Indonesia";

const LANG = {
  "commands": {
    "/start": {
      text: "*Selamat datang di Opinion Reward!*\n\nDapatkan BBPoints dengan membagikan pendapat Anda tentang berbagai topik.",
      keyboard: "#/keyboard/mainMenu"
    },
    "/menu": {
      text: "Menu utama. \n\nKlik tombol di bawah untuk memberikan pendapat Anda.",
      keyboard: "#/keyboard/mainMenu"
    },
    "notAuthorised": {
      text: "Hanya admin yang dapat melakukan ini"
    },
    "newTopicCreated": {
      text: "Topik baru berhasil dibuat"
    },
    "/newTopicMessage": {
      text: "Klik tombol di bawah untuk membuat topik baru, maka semua pengguna akan dapat memberikan pendapat tentang topik baru ini.",
      inline_buttons: [
        [{ text: "Buat Topik Baru", web_app: { url: "https://api.bots.business/v2/bots/{botid}/web-app/createForm" } }]
      ]
    },
    "noMessageIdError": {
      alert: "Terjadi kesalahan saat mendapatkan ID pesan"
    },
    "/recievedAnswer": {
      text: "Jawaban Anda telah dikirim ke saluran log. Admin akan meninjaunya dan mengirimkan hadiah BBP jika memenuhi syarat. Anda akan menerima notifikasi setelah pengajuan Anda disetujui atau ditolak.",
      inline_buttons: "#/keyboard/getAns",
      run: { command: "sendToAdmin", params: { userid: "{userid}" } }
    },
    "sendToAdmin": {
      text: "Pengguna {userid} telah mengirimkan pendapat. Silakan tinjau dan berikan hadiah yang sesuai.\n\nURL webhook transfer BBP tidak berfungsi, jadi kami menambahkan tombol transfer manual untuk ini.\n\nPastikan BBP telah ditransfer sebelum menandai ini sebagai ✅.",
      chat_id: "-1002289286399",
      inline_buttons: [
        [{ text: "Lihat Jawaban", url: "https://api.bots.business/v2/bots/1890089/web-app/ans?id={topicid}" }],
        [{ text: "Tolak", callback_data: "/declined {userid}" }],
        [{ text: "Kirim BBP Secara Manual", url: "https://t.me/BBPointBot?start=req1887-5-points-to-{userid}" }],
        [{ text: "BBP berhasil dikirim ✅", callback_data: "/accept {userid}" }]
      ]
    },
    "declinedAdminMessage": {
      text: "Anda telah menolak pendapat ini. ({userid})\n\n*Tidak Memenuhi Syarat* ❌",
      edit: true,
      message_id: "{message_id}",
      run: { command: "declinedUserMessage", params: { userid: "{userid}" } }
    },
    "declinedUserMessage": {
      text: "Admin telah *menolak* pendapat Anda. Hadiah BBP tidak akan dikreditkan.",
      chat_id: "{userid}"
    },
    "acceptedAdminMessage": {
      text: "Anda telah *menyetujui* pendapat ini dan mengirim BBP. ({userid})\n\n*Diberikan Hadiah ✅*",
      edit: true,
      message_id: "{message_id}",
      run: { command: "acceptedUserMessage", params: { userid: "{userid}" } }
    },
    "acceptedUserMessage": {
      text: "Selamat! 🎉 Pendapat Anda telah *disetujui*, dan hadiah BBP Anda telah dikreditkan di @BBPointbot.",
      chat_id: "{userid}"
    },
    "giveOpinion": {
      alias: "#/button/giveOpinion",
      text: "Klik tombol di bawah untuk memberikan pendapat Anda tentang topik saat ini: {topic}",
      inline_buttons: "#/keyboard/give_opinion"
    },
    "selectLanguage": {
      alias: "#/button/changeLanguage",
      text: "Silakan pilih bahasa yang Anda inginkan. \n\nBahasa saat ini: \"{curLang}\"",
      inline_buttons: "#/keyboard/selectLanguage"
    },
    "setLng": {
      text: "Bahasa diubah ke \"{newLang}\"",
      run: { command: "/menu" }
    }
  },
  "titles": {
    curLang: currentLang
  },
  "types": {
    button: {
      giveOpinion: "Berikan Pendapat",
      changeLanguage: "🌐 Ganti Bahasa"
    },
    keyboard: {
      mainMenu: "📰 Berikan Pendapat,\n🌐 Ganti Bahasa",
      getAns: [
        [
          {
            text: "Lihat Jawaban",
            web_app: { url: "https://api.bots.business/v2/bots/{botid}/web-app/ans?id={topicid}" }
          }
        ]
      ],
      give_opinion: [
        [
          {
            text: "Berikan Pendapat",
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
        [{ text: "❌ Batal", command: "/del" }]
      ]
    }
  }
};

smartBot.setupLng("id", LANG);
