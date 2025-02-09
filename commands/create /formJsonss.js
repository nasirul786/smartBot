/*CMD
  command: formJsonss
  help: 
  need_reply: false
  auto_retry_time: 
  folder: create 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

var form = {
  title: "User Information Form",
  description: "Please fill out the form below.",
  fields: [
    {
      question: "What is your name?",
      type: "text",
      maxLength: 10,
      placeholder: "Enter your name",
      required: true
    },
    {
      question: "What is your age?",
      type: "number",
      maxLength: 3,
      placeholder: "Enter your age",
      required: true
    },
    {
      question: "What is your favorite color?",
      type: "select",
      options: [
        { value: "red", label: "Red" },
        { value: "blue", label: "Blue" },
        { value: "green", label: "Green" }
      ],
      required: true
    },
    {
      question: "Tell us about yourself",
      type: "textarea",
      maxLength: 100,
      placeholder: "Write something...",
      required: false
    }
  ]
}

WebApp.render({
  content: form,
  mime_type: 'application/json'
});
