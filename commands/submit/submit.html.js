/*CMD
  command: submit.html
  help: 
  need_reply: false
  auto_retry_time: 
  folder: submit

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dynamic Form</title>
  <script src="https://telegram.org/js/telegram-web-app.js"></script>
  <link href="https://fonts.googleapis.com/css2?family=Merienda:wght@700&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 20px;
      padding: 0;
      color: var(--tg-color-scheme) == 'dark' ? 'white' : 'black';
      background: transparent;
    }
    h1 {
      margin-bottom: 5px;
    }
    p {
      opacity: 0.8;
    }
    .form-group {
      margin-bottom: 15px;
    }
    .form-group label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }
    .form-group input,
    .form-group textarea,
    .form-group select {
      width: 100%;
      padding: 12px;
      border: none;
      border-bottom: 2px solid #ccc;
      font-size: 16px;
      color: var(--tg-color-scheme) == 'dark' ? 'white' : 'black';
      background: transparent;
      outline: none;
      transition: border-color 0.3s ease;
    }
    .form-group input:focus,
    .form-group textarea:focus,
    .form-group select:focus {
      border-color: #007bff;
    }
    .form-group textarea {
      resize: vertical;
    }
    .submit-btn {
      background-color: #007bff;
      color: white;
      border: none;
      padding: 15px;
      font-size: 18px;
      cursor: pointer;
      width: 100%;
      border-radius: 8px;
      transition: background 0.3s ease;
    }
    .submit-btn:hover {
      background-color: #0056b3;
    }
    .error-message {
      font-family: 'Merienda', cursive;
      font-size: 1.5rem;
      font-weight: bold;
      text-align: center;
      background: linear-gradient(90deg, #ff416c, #ff4b2b);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <h1 id="form-title">Loading Form...</h1>
  <p id="form-description"></p>
  <form id="dynamic-form">
    <!-- Form fields will be dynamically inserted here -->
  </form>
  <div id="error-message" class="error-message"></div>

  <script>
    const tg = window.Telegram.WebApp;
    tg.expand();
    tg.enableClosingConfirmation();
    const userid = tg.initDataUnsafe.user?.id;

    document.body.style.color = tg.colorScheme === "dark" ? "white" : "black";

    const urlParams = new URLSearchParams(window.location.search);
    const formId = urlParams.get('id') || '123';

    if (!userid) {
      tg.showAlert('Open it inside Telegram WebApp, cannot detect user.');
    } else {
      fetch(`https://api.bots.business/v2/bots/<%bot.id%>/web-app/formJson?id=${userid}`)
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            // Display the error message in a stylish way
            const errorMessage = document.getElementById('error-message');
            errorMessage.textContent = data.msg || "Failed to load form.";
            tg.HapticFeedback.notificationOccurred('error');
            return;
          }

          // Set form title and description
          document.getElementById('form-title').textContent = data.title;
          document.getElementById('form-description').textContent = data.description;

          const form = document.getElementById('dynamic-form');

          // Dynamically create form fields
          data.fields.forEach(field => {
            const formGroup = document.createElement('div');
            formGroup.className = 'form-group';

            const label = document.createElement('label');
            label.innerHTML = field.question;
            if (field.required) label.innerHTML += " *";
            if (field.maxLength) label.innerHTML += ` (Max ${field.maxLength} characters)`;

            formGroup.appendChild(label);

            let input;
            if (field.type === 'textarea') {
              input = document.createElement('textarea');
              input.rows = 4;
            } else if (field.type === 'select') {
              input = document.createElement('select');
              field.options.forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.value = option.value;
                optionElement.textContent = option.label;
                input.appendChild(optionElement);
              });
            } else {
              input = document.createElement('input');
              input.type = field.type;
            }

            input.name = field.question;
            if (field.maxLength) input.maxLength = field.maxLength;
            if (field.placeholder) input.placeholder = field.placeholder;
            if (field.required) input.required = true;

            // Handle number input max length
            if (field.type === "number" && field.maxLength) {
              input.addEventListener("input", function () {
                if (this.value.length > field.maxLength) {
                  this.value = this.value.slice(0, field.maxLength);
                }
              });
            }

            formGroup.appendChild(input);
            form.appendChild(formGroup);
          });

          // Add submit button
          const submitButton = document.createElement('input');
          submitButton.type = 'submit';
          submitButton.value = 'Submit';
          submitButton.className = 'submit-btn';
          form.appendChild(submitButton);
        })
        .catch(error => {
          console.error('Error fetching form details:', error);
          const errorMessage = document.getElementById('error-message');
          errorMessage.textContent = 'Failed to load form details.';
          tg.HapticFeedback.notificationOccurred('error');
        });

      // Handle form submission
      document.getElementById('dynamic-form').addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const answers = [];
        formData.forEach((value, key) => {
          answers.push({ q: key, a: value });
        });

        const payload = {
          user_id: tg.initDataUnsafe.user.id,
          answers: answers
        };

        fetch("https://api.bots.business/v2/bots/<%bot.id%>/web-app/save-answer", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        })
          .then(response => response.json())
          .then(result => {
            if (result.success) {
              tg.showAlert('Form submitted successfully!');
              tg.HapticFeedback.notificationOccurred('success');
              tg.close();
            } else {
              // Display the error message in a stylish way
              const errorMessage = document.getElementById('error-message');
              errorMessage.textContent = result.msg || 'Failed to submit form.';
              tg.HapticFeedback.notificationOccurred('error');
            }
          })
          .catch(error => {
            console.error('Error submitting form:', error);
            const errorMessage = document.getElementById('error-message');
            errorMessage.textContent = 'Failed to submit form.';
            tg.HapticFeedback.notificationOccurred('error');
          });
      });
    }
  </script>
</body>
</html>
