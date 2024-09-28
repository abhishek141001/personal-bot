document.addEventListener("DOMContentLoaded", function () {
  const chatBox = document.getElementById("chat-box");
  const userInput = document.getElementById("userInput");
  const sendBtn = document.getElementById("sendBtn");

  // Load previous messages from local storage
  // loadMessages();

  sendBtn.addEventListener("click", function () {
    const message = userInput.value.trim();
    if (message) {
      addMessageToChatBox("user", message);
      saveMessage(message); // Save message to local storage
      getBotResponse(message);
      userInput.value = ""; // Clear the input
    }
  });

  function addMessageToChatBox(sender, message) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", `${sender}-message`);
    messageDiv.innerHTML = message;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to the bottom
  }

async function getTechNews(){
    const response = await fetch(
        `https://newsdata.io/api/1/news?apikey=pub_547793312e0428df5691ef08007c067cccfbf&q=innovation technology`
      );
      const data = await response.json();
      return data;
}
const  stackOverFlow = async () => {
    const response = await fetch('https://api.stackexchange.com/2.3/search?order=desc&sort=activity&intitle=react&site=stackoverflow');
    const data = await response.json();
    console.log(data.items[0]);  // Array of search results
  };
  
  async function getBotResponse(userMessage) {
    let botResponse;

    switch (userMessage.toLowerCase()) {
      case "hello":
      case "hi":
      case "hii":
        case "hiii":
            case "hiiii":
                case "hiiiiii":
      case "hlo":
      case "hey":
        botResponse = "Hi there! How can I help you today?";
        setTimeout(function () {
            addMessageToChatBox("bot", botResponse);
          }, 1000);
        break;
        case 'error':
            botResponse = 'searching'
            stackOverFlow()
            setTimeout(  function () {
                 addMessageToChatBox("bot", botResponse);
               }, 1000);
               break;
       case 'start my day':
        botResponse = "Good morning Boss, I'll start your day now";
        setTimeout( async function () {
           await addMessageToChatBox("bot", botResponse);
          }, 1000);

          let secondResponse = "I'll share some tech news.";
          setTimeout(async function () {
           await addMessageToChatBox("bot", secondResponse);
          }, 2500);

          const techNews = await getTechNews()
          if (techNews.results && techNews.results.length > 0) {
            news =
              `Here are some latest tech news:<br><br>` +
              techNews.results
                .map(
                  (result) =>
                    `<div style="margin-bottom: 10px; padding: 10px; border: 1px solid #ccc; border-radius: 8px;">
                                        <a style="color: #007BFF; font-weight: bold; text-decoration: none;" href="${
                                          result.link
                                        }" target="_blank">${result.title}</a>
                                        <p style="font-size: 12px; color: #555;">${
                                          result.pubDate
                                        }</p>
                                        <p style="font-size: 14px; color: #333;">${
                                          result.description ||
                                          "No description available."
                                        }</p>
                                    </div>`
                )
                .join("");
                setTimeout(function () {
                    addMessageToChatBox("bot", news);
                  }, 3000);
          } 
        break;
      case "show tech trends":
      case "tech trends":
      case "tech news":
        try {
          const response = await fetch(
            `https://newsdata.io/api/1/news?apikey=pub_547793312e0428df5691ef08007c067cccfbf&q=latest tech&country=in`
          );
          const data = await response.json();

          if (data.results && data.results.length > 0) {
            botResponse =
              `Here are some latest "${userMessage}":<br><br>` +
              data.results
                .map(
                  (result) =>
                    `<div style="margin-bottom: 10px; padding: 10px; border: 1px solid #ccc; border-radius: 8px;">
                                        <a style="color: #007BFF; font-weight: bold; text-decoration: none;" href="${
                                          result.link
                                        }" target="_blank">${result.title}</a>
                                        <p style="font-size: 12px; color: #555;">${
                                          result.pubDate
                                        }</p>
                                        <p style="font-size: 14px; color: #333;">${
                                          result.description ||
                                          "No description available."
                                        }</p>
                                    </div>`
                )
                .join("");
                setTimeout(function () {
                    addMessageToChatBox("bot", botResponse);
                  }, 1000);
          } else {
            botResponse = `No articles found for "${userMessage}".`;
            setTimeout(function () {
                addMessageToChatBox("bot", botResponse);
              }, 1000);
          }
        } catch (error) {
          botResponse =
            "There was an error fetching the news. Please try again later.";
            setTimeout(function () {
                addMessageToChatBox("bot", botResponse);
              }, 1000);
        }
        break;
      case "bye":
        botResponse = "Goodbye! Have a great day!";
        setTimeout(function () {
            addMessageToChatBox("bot", botResponse);
          }, 1000);
        break;
      default:
        try {
          const response = await fetch(
            `https://newsdata.io/api/1/news?apikey=pub_547793312e0428df5691ef08007c067cccfbf&q=${userMessage}&country=in`
          );
          const data = await response.json();

          if (data.results && data.results.length > 0) {
            botResponse =
              `Here are some articles on "${userMessage}":<br><br>` +
              data.results
                .map(
                  (result) =>
                    `<div style="margin-bottom: 10px; padding: 10px; border: 1px solid #ccc; border-radius: 8px;">
                                        <a style="color: #007BFF; font-weight: bold; text-decoration: none;" href="${
                                          result.link
                                        }" target="_blank">${result.title}</a>
                                        <p style="font-size: 12px; color: #555;">${
                                          result.pubDate
                                        }</p>
                                        <p style="font-size: 14px; color: #333;">${
                                          result.description ||
                                          "No description available."
                                        }</p>
                                    </div>`
                )
                .join("");
                setTimeout(function () {
                    addMessageToChatBox("bot", botResponse);
                  }, 1000);
          } else {
            botResponse = `No articles found for "${userMessage}".`;
            setTimeout(function () {
                addMessageToChatBox("bot", botResponse);
              }, 1000);
          }
        } catch (error) {
          botResponse =
            "There was an error fetching the news. Please try again later.";
        }
        setTimeout(function () {
            addMessageToChatBox("bot", botResponse);
          }, 1000);
    }


  }

  function saveMessage(message) {
    let messages = JSON.parse(localStorage.getItem("chatMessages")) || [];
    messages.push({ sender: "user", message: message });
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }

  // function loadMessages() {
  //     const messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
  //     messages.forEach(msg => {
  //         addMessageToChatBox(msg.sender, msg.message);
  //     });
  // }
});
