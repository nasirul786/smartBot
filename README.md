# [Opinion_Reward_SmartBot](https://t.me/Opinion_Reward_SmartBot) 

A Telegram bot designed to collect customer reviews and opinions on topics created by admins, built using SmartBot technology on BB.  

This isn't just a regular bot—it supports 10 languages and integrates with a WebApp.  

---  

## Aiming for 1st Place in the Contest  

I strongly believe no one else has attempted to connect SmartBot with a WebApp. While WebApp integration is relatively straightforward, building the logic with SmartBot is quite challenging.  

This is my first attempt to make it happen. Read below to learn how this bot works and explore its functionalities.

## How It Works  

Bot admins can create topics and add questions in four formats:  
1. Text  
2. Textarea  
3. Number  
4. Select  

Admins create topics using the WebApp by sending the `/newtopic` command. (Security measures are in place to prevent unauthorized use—**BB Admin is automatically an admin on this bot**.)  

The bot sends a WebApp button, allowing admins to create topic and define the topic name, description, and fields.  

After the topic is set up, users can share their opinions or reviews. They will see a **"Give Opinion"** button (to their own language) in the bot, which opens the WebApp containing the form created by the admin. Upon submission, the user's opinion is sent to the **LOG channel**, where admins can review it by clicking the **"See Answers"** button in the post.  

(WebApp integration was necessary for reviewing responses, as long texts cannot be sent via a Telegram bot.)

Once reviewed, an admin can either **decline the opinion** or **reward the user with BB Points**.  

Since the BB Point transfer webhook URL was causing errors, an alternative **"Send BBP Manually"** button was added. After transferring the BB Points, admins must click the **"Rewarded"** button, updating the post in the LOG channel and notifying the user of approval.  

### LOG Channel: [Join Here](https://t.me/+F_LYwqs5OJA1ZmI1)  

Implementing this system in **10 languages** was a major challenge, but so far, no errors have been encountered.  

Below is a **9-minute demo video** showcasing all functionalities. Please watch the video and test the bot yourself!
**Vidoe Link:** https://t.me/c/2289286399/53

**channel:** https://t.me/+F_LYwqs5OJA1ZmI1

### Image showing how to create topic. 
![creating topic](https://i.ibb.co/h1Jf81rD/IMG-20250209-104534.png)
**BB Admin can also create topic, they have admin permission for the testing purpose**

## Dynamic HTML Page and API URL Generation  

All HTML page codes are stored within this bot, and the **API URL is generated dynamically** to work with any bot.  

If someone copies this bot, they **won't need to edit the HTML code**, as the only difference in the API URL will be the **bot ID**.  

We used the `<% %>` tag to **detect the current bot ID** and dynamically insert it into the API URL as a variable.
```js
fetch("https://api.bots.business/v2/bots/<%bot.id%>/web-app/save-answer", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        })
```

### Setting up 10 language was tough:
```js
// uncomment this for production
//return

// add new language here
//only 5 language can be set once
const languages = ['hinglish', 'id', 'pt', 'bn', 'ru']
//const languages = ['en','de', 'es', 'fr', 'hi']

let cmdName;
for(let i in languages){
  cmdName = "lng-" + languages[i];
  Bot.run({ command: cmdName })
}

Bot.sendMessage("Setup complete.");
```

The reason, Only **five commands** can be executed at once; otherwise, an error appears:  
*"Too many subcommands."*  

To work around this, I used **two variables**, each containing an array of **five languages**. I ran the `/setup` command twice—first with one variable, then with the other—by **commenting out one while uncommenting the other**. This allowed me to configure all **10 languages** successfully.

### Preventing Duplicate Submissions  

To ensure users don't submit opinions on the same topic multiple times, we generate a **unique topic ID** using a random string.  

When a user submits an opinion, we **store the topic ID along with their user ID**. This allows us to detect duplicate submissions and prevent users from submitting again on the same topic.
![not multiple img](https://i.ibb.co/QF9LHMHF/Screenshot-2025-02-09-11-10-06-948-org-telegram-messenger-web-edit.jpg)

we check the duplicates using below code:
```js
var userCompletedTopic = Bot.getProp(topicId + "-" + userId);
if (userCompletedTopic) {
  WebApp.render({
    content: {
      error: true,
      msg: "You have already submitted your opinion on this topic.\n\nYou can submit another opinion when the admins create a new topic. Stay tuned!"
    },
    mime_type: "application/json"
  });
  return;
}
```

and save the submit status using below code, also we save the answer in answer id for rendering it on the web page:
```js
var randomString = Math.random().toString(36).substring(2, 7).toUpperCase(); //this is answer id

var topicid = Bot.getProp("topicId") //created while creating new topic.

Bot.setProp({
  name: randomString,
  value: options
})

Bot.setProp(topicid+"-"+options.user_id, true); //saving the user id with topic id, it will help us to verify if the user already submitted their opinion on the topic.
```

We save props in global variables, because we dont have BB user on the webApp, we have only webApp user.

we send the form data along with userid so we can run the confirmation command for the user and show them a message in their own language.


#### Reviewing answers from user.
![reviewing](https://i.ibb.co/GvZzk0yJ/Screenshot-2025-02-09-11-21-10-871-org-telegram-messenger-web-edit.jpg)
Admin will review answers by clicking the button sent with the oost on LOG channel:

![imglogchannel](https://i.ibb.co/hRjyLVRz/file-159.jpg)

**User gets confirmation if their opinion got declined or aproved**
![declined](https://i.ibb.co/TB3skhYf/Screenshot-2025-02-09-11-26-25-611-com-i-Me-android-edit.jpg)

![aproved](https://i.ibb.co/V5GvYK3/Screenshot-2025-02-09-11-27-25-421-org-telegram-messenger-web-edit.jpg)

#### Users can see their own answers after submitting an review or opinion.
![seeImg](https://i.ibb.co/jP11cchJ/file-160.jpg)

## List of languages 
1. English (default)
2. Hindi
3. Russian
4. Portuguese
5. Germany
6. Indonesian
7. Bangla
8. Hinglish
9. Francis
10. Spanish 
