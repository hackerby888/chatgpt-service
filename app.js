const express = require("express");
const app = express();

const { mainAI, mainUtils } = require("./services/main__ai"); // main AI
const { secondaryAI, secondaryUtils } = require("./services/secondary_ai"); // secondary AI
const { toHtmlFormat } = require("./utils/utils");
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const hightlightStyle = "androidstudio";
const hightlightScript = `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/${hightlightStyle}.min.css"><script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/highlight.min.js"></script><script>hljs.highlightAll();</script>`;

app.get("/", async (req, res) => {
  try {
    let data = await mainAI.getAIAnswer(mainUtils.getQuestion(req.query.prompt));
    let message = mainUtils.getMessageFromData(data);
    let html = `${hightlightScript} ${toHtmlFormat(message)}`;
    res.send(html);
  } catch (error) {
    // try again with secondary AI
    console.log("\x1b[33m" + "Try again... " + error + "\x1b[0m");
    try {
      let data = await secondaryAI.getAIAnswer(secondaryUtils.getQuestion(req.query.prompt));
      let message = secondaryUtils.getMessageFromData(data);
      let html = `${hightlightScript} ${toHtmlFormat(message)}`;
      res.send(html);
    } catch {
      res.status(500).send("Something went wrong");
    }
  }
});

app.listen(PORT, () => {
  console.log(`AI services at http://localhost:${PORT}`);
});
