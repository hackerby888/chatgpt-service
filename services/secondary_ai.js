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
}

class Utils {
  static getQuestion(content) {

    let payload = {
      question: content,
      chat_id: "651e93ecbd2fb217ef1cb060",
      timestamp: 1696501203210,
    };

    return JSON.stringify(payload);
  }
}

exports.secondaryAI = AI;
exports.secondaryUtils = Utils;
