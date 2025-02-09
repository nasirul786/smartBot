/*CMD
  command: 📰 Give Opinion
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 📰 राय दें, 📰 মতামত দিন, 📰 donner une opinion, 📰 оставить мнение, 📰 meinung abgeben, 📰 apni rai do, 📰 dar opinião
  group: 
CMD*/

var opinion = Bot.getProp("topic")
var topic = Bot.getProp("currentTopic")
var topicTitle = topic?.title || "Not specified";
var id = Bot.getProp("topicId")

smartBot.run({
  command: "giveOpinion",
  options: {
    topic: topicTitle,
    id: id,
    botid: bot.id
   }
 })
