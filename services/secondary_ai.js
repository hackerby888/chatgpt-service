const promt = require("prompt-sync")();
const baseUrl = "https://chat.chatgptdemo.net/chat_api_stream";

class AI {
  static async getAIAnswer(payload) {
    return fetch(baseUrl, {
      headers: {
        accept: "*/*",
        "accept-language":
          "vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5",
        "content-type": "application/json",
        "sec-ch-ua":
          '"Not_A Brand";v="99", "Google Chrome";v="109", "Chromium";v="109"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        cookie:
          "_ga=GA1.1.696521412.1696408154; _ga_79BE24GTS7=GS1.1.1696484265.3.0.1696484265.0.0.0; _ga_3J2500708C=GS1.1.1696484269.4.0.1696484269.0.0.0; cf_clearance=UhKm16CZ0bqPHNmPnVuddOjuhRaEpUB40aUOpKtgE1w-1696484270-0-1-c39b7481.8172e7c9.9eaf3dfb-0.2.1696484270; FCNEC=%5B%5B%22AKsRol92w2smtR4fEKXBahEwlB6Lm536C6GGJgdFWYGs5u4a0K_Qai_laFAI1jDVqxL3L1jaBwkBMYOjPsB80nmxDMVVfNcMhVMqFfUAZ5INKYrTQuLlZfAQeaXXIfUXKO79VNCzOYUKIpJoW9_UVJHwExJV_Hre6g%3D%3D%22%5D%2Cnull%2C%5B%5D%5D; session=eyJ1c2VyX2lkIjogImhmcmd3aHljaXVwYjNpcmhvIn0=.ZR5LuA.HbVx5NP0EPd6QBftD5358r-oKK8",
        Referer: "https://chat.chatgptdemo.net/",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
      body: payload,
      method: "POST",
    })
      .then((res) => res.text())
      .then((text) => text.split("\n"));
  }

  static async createChatRoom() {
    return fetch("https://chat.chatgptdemo.net/new_chat", {
      "headers": {
        "accept": "*/*",
        "accept-language": "vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5",
        "cache-control": "max-age=0",
        "content-type": "application/json",
        "sec-ch-ua": "\"Not_A Brand\";v=\"99\", \"Google Chrome\";v=\"109\", \"Chromium\";v=\"109\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        cookie: "_ga=GA1.1.696521412.1696408154; _ga_79BE24GTS7=GS1.1.1696501173.4.1.1696503140.0.0.0; cf_clearance=D9duiY4I97QbTf9n9RaVO8ZZml1TFZSzgoiZ5Ce43us-1696984871-0-1-bd560c2f.b062a45e.782d2503-0.2.1696984871; _ga_3J2500708C=GS1.1.1696984870.6.1.1696984928.0.0.0; FCNEC=%5B%5B%22AKsRol-09ouyDj5mnHfQvk8OhMlqJfTvlE-vzxW-DQwlDCLrjAL5P9z0SeXuP7osihiG0d7t20qPdLXxzQ_bNWMdCmr9hGRKlDWLpAL4_NYyNDfIFYUVrCFM9rJ0PycrugI5r8fPNZGbqdjYArprq_CjDJKU9eq5EQ%3D%3D%22%5D%2Cnull%2C%5B%5D%5D; session=eyJ1c2VyX2lkIjogImhmcmd3aHljaXVwYjNpcmhvIiwgInNob3dfcG9wdXAiOiB0cnVlfQ==.ZSXvaQ.ZmUG-jrE5N2EwJjjFhOOBMaXBSY"
      },
      referrerPolicy: "no-referrer",
      "body": "{\"user_id\":\"hfrgwhyciupb3irho\"}",
      "method": "POST"
    }).then(res => res.json());
  }
}

class Utils {
  static getQuestion(content, chatRoomId = "6525f3330b53fc1e5cf27aeb") {

    let payload = {
      question: content,
      chat_id: chatRoomId,
      timestamp: 1696985922220,
    };

    return JSON.stringify(payload);
  }

  static getMessageFromData(data) {
    let message = "";

    data.forEach((line) => {
      if (line.includes("data: {")) {
        const data = JSON.parse(line.replace("data: ", ""));
        const content = data.choices[0].delta.content;
        if (content) {
          message += content;
        }
      }
    });

    return "from:gptserverglobal " + message;
  }
}

exports.secondaryAI = AI;
exports.secondaryUtils = Utils;
