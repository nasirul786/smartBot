/*CMD
  command: createform.html
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

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Form Builder</title>
  <script src="https://telegram.org/js/telegram-web-app.js"></script>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f8f9fa;
      margin: 20px;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: auto;
    }
    .form-field {
      background: white;
      padding: 15px;
      border-radius: 10px;
      box-shadow: 0px 4px 10px rgba(55, 222, 177, 0.5);
      margin-bottom: 15px;
      transition: transform 0.2s ease;
    }
    .form-field:hover {
      transform: translateY(-3px);
    }
    .form-group {
      margin-bottom: 10px;
    }
    label {
      font-weight: bold;
      display: block;
      margin: 5px;
      margin-bottom: 5px;
    }
    input, select, textarea {
      width: 90%;
      padding: 8px;
      outline: none;
      border: 2px solid #daf542;
      border-radius: 5px;
    }
    .switch {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .switch input {
      width: auto;
    }
    .btn {
      padding: 10px 14px;
      width: auto;
      border: none;
      margin: 5px;
      border-radius: 5px;
      cursor: pointer;
      transition: 0.3s;
    }
    .btn-small {
      font-size: 14px;
      padding: 5px 10px;
    }
    .btn-red {
      background: #ff4d4d;
      color: white;
    }
    .btn-red:hover {
      background: #cc0000;
    }
    .btn-green {
      background: #28a745;
      color: white;
    }
    .btn-green:hover {
      background: #1e7e34;
    }
    .option-pair {
      display: flex;
      gap: 10px;
      margin-bottom: 5px;
    }
    .option-pair input {
      flex: 1;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Form Builder</h1>

    <div class="form-group">
      <label>Form Title</label>
      <input type="text" id="form-title" placeholder="Enter form title">
    </div>

    <div class="form-group">
      <label>Form Description</label>
      <textarea id="form-description" placeholder="Enter form description"></textarea>
    </div>

    <div id="fields-container"></div>

    <button id="add-field" class="btn btn-green">+ Add Field</button>
    <button id="submit-form" class="btn btn-blue">Submit Form</button>
  </div>

  <script>
    const tg = window.Telegram.WebApp;
    tg.expand();
    const userid = tg.initDataUnsafe.user?.id;

    const fieldTypes = ["text", "number", "select", "textarea"];

    document.getElementById("add-field").addEventListener("click", () => {
      const fieldsContainer = document.getElementById("fields-container");

      const fieldDiv = document.createElement("div");
      fieldDiv.className = "form-field";

      fieldDiv.innerHTML = `
        <div class="form-group">
          <label>Question</label>
          <input type="text" placeholder="Enter question">
        </div>
        <div class="form-group">
          <label>Field Type</label>
          <select>
            ${fieldTypes.map(type => `<option value="${type}">${type}</option>`).join("")}
          </select>
        </div>
        <div class="form-group">
          <label>Placeholder</label>
          <input type="text" placeholder="Enter placeholder">
        </div>
        <div class="form-group">
          <label>Max Length</label>
          <input type="number" placeholder="Max length">
        </div>
        <div class="form-group switch">
          <label>Required</label>
          <input type="checkbox">
        </div>
        <div class="options-container" style="display: none;">
          <label>Options</label>
          <div class="options-list"></div>
          <button class="btn btn-small btn-green add-option">+ Add Option</button>
        </div>
        <button class="btn btn-small btn-red remove-field">Remove Field</button>
      `;

      fieldsContainer.appendChild(fieldDiv);

      const typeSelect = fieldDiv.querySelector("select");
      const optionsContainer = fieldDiv.querySelector(".options-container");
      const optionsList = fieldDiv.querySelector(".options-list");
      const addOptionBtn = fieldDiv.querySelector(".add-option");

      typeSelect.addEventListener("change", (e) => {
        optionsContainer.style.display = e.target.value === "select" ? "block" : "none";
      });

      addOptionBtn.addEventListener("click", () => {
        const optionDiv = document.createElement("div");
        optionDiv.className = "option-pair";
        optionDiv.innerHTML = `
          <input type="text" placeholder="Label">
          <input type="text" placeholder="Value">
          <button class="btn btn-small btn-red remove-option">x</button>
        `;
        optionsList.appendChild(optionDiv);

        optionDiv.querySelector(".remove-option").addEventListener("click", () => {
          optionsList.removeChild(optionDiv);
        });
      });

      fieldDiv.querySelector(".remove-field").addEventListener("click", () => {
        fieldsContainer.removeChild(fieldDiv);
      });
    });

    document.getElementById("submit-form").addEventListener("click", async () => {
      const formTitle = document.getElementById("form-title").value;
      const formDescription = document.getElementById("form-description").value;
      const fields = [];

      document.querySelectorAll(".form-field").forEach(fieldDiv => {
        const question = fieldDiv.querySelector("input[type='text']").value;
        const type = fieldDiv.querySelector("select").value;
        const placeholder = fieldDiv.querySelector("input[type='text'][placeholder='Enter placeholder']").value;
        const maxLength = fieldDiv.querySelector("input[type='number']").value;
        const required = fieldDiv.querySelector("input[type='checkbox']").checked;

        const options = [];
        if (type === "select") {
          fieldDiv.querySelectorAll(".option-pair").forEach(pair => {
            const label = pair.children[0].value;
            const value = pair.children[1].value;
            if (!label || !value) {
              alert("All select options must have both a label and a value.");
              return;
            }
            options.push({ label, value });
          });
        }

        fields.push({
          question,
          type,
          placeholder,
          maxLength: maxLength ? parseInt(maxLength) : undefined,
          required,
          options: type === "select" ? options : undefined
        });
      });

      const formData = {
        title: formTitle,
        description: formDescription,
        fields
      };

      try {
        const response = await fetch("https://api.bots.business/v2/bots/<%bot.id%>/web-app/createdNewTopic", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            form: JSON.stringify(formData),
            userid: userid
          })
        });

        const result = await response.json();
        if (result.success) {
          tg.showAlert(result.msg) || "Topic created successfully";
        } else {
          tg.showAlert(result.msg || "Failed to submit form.");
        }
      } catch (error) {
        tg.showAlert("An error occurred while submitting the form.");
      }
    });
  </script>
</body>
</html>
