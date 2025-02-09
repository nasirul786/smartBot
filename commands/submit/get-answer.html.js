/*CMD
  command: get-answer.html
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
  <title>User Answers</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #f9f9f9;
      color: #333;
      margin: 0;
      padding: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }
    .container {
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      max-width: 600px;
      width: 100%;
      padding: 20px;
    }
    h1 {
      font-size: 24px;
      margin-bottom: 10px;
      color: #007bff;
    }
    .user-id {
      font-size: 18px;
      margin-bottom: 20px;
      color: #555;
    }
    .qa-section {
      margin-bottom: 15px;
    }
    .question {
      font-weight: bold;
      margin-bottom: 5px;
    }
    .answer {
      background-color: #f1f1f1;
      padding: 10px;
      border-radius: 5px;
    }
    .error-message {
      color: #ff0000;
      font-weight: bold;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>User Answers</h1>
    <div id="user-id" class="user-id"></div>
    <div id="qa-list"></div>
    <div id="error-message" class="error-message"></div>
  </div>

  <script>
    document.addEventListener('DOMContentLoaded', () => {
      const urlParams = new URLSearchParams(window.location.search);
      const id = urlParams.get('id');

      if (!id) {
        showError('ID parameter is missing in the URL.');
        return;
      }

      const apiUrl = `https://api.bots.business/v2/bots/<%bot.id%>/web-app/get-answer?id=${id}`;

      fetch(apiUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          if (!data || !data.user_id || !Array.isArray(data.answers)) {
            throw new Error('Invalid data format received from the API.');
          }

          // Display user ID
          document.getElementById('user-id').textContent = `User ID: ${data.user_id}`;

          // Display questions and answers
          const qaList = document.getElementById('qa-list');
          data.answers.forEach(qa => {
            const qaSection = document.createElement('div');
            qaSection.className = 'qa-section';

            const question = document.createElement('div');
            question.className = 'question';
            question.textContent = qa.q;

            const answer = document.createElement('div');
            answer.className = 'answer';
            answer.textContent = qa.a || 'No answer provided';

            qaSection.appendChild(question);
            qaSection.appendChild(answer);
            qaList.appendChild(qaSection);
          });
        })
        .catch(error => {
          console.error('Fetch error:', error);
          showError('Failed to fetch data. Please try again later.');
        });
    });

    function showError(message) {
      const errorMessageElem = document.getElementById('error-message');
      errorMessageElem.textContent = message;
    }
  </script>
</body>
</html>
