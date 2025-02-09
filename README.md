# [Opinion_Reward_SmartBot](t.me/Opinion_Reward_SmartBot) 

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

Once a topic is created, the bot sends a WebApp button, allowing admins to define the topic name, description, and fields.  

After the topic is set up, users can share their opinions or reviews. They will see a **"Give Opinion"** button in the bot, which opens the WebApp containing the form created by the admin. Upon submission, the user's opinion is sent to the **LOG channel**, where admins can review it by clicking the **"See Answers"** button in the post.  

(WebApp integration was necessary for reviewing responses, as long texts cannot be sent via a Telegram bot.)  

Once reviewed, an admin can either **decline the opinion** or **reward the user with BB Points**.  

Since the BB Point transfer webhook URL was causing errors, an alternative **"Send BBP Manually"** button was added. After transferring the BB Points, admins must click the **"Rewarded"** button, updating the post in the LOG channel and notifying the user of approval.  

### LOG Channel: [Join Here](https://t.me/+F_LYwqs5OJA1ZmI1)  

Implementing this system in **10 languages** was a major challenge, but so far, no errors have been encountered.  

Below is a **9-minute demo video** showcasing all functionalities. Please watch the video and test the bot yourself!
