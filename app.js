const express = require("express");
const app = express();

const { getHtmlResponeFromPayload } = require("./utils/utils");
const { AI_SERVER_VN, AI_SERVER_GLOBAL } = require("./consts/ai_server");
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    res.send(await getHtmlResponeFromPayload(req.query.prompt, AI_SERVER_VN));
  } catch (error) {
    // try again with secondary AI
    console.log("\x1b[33m" + "Try again... " + error + "\x1b[0m");
    try {
      res.send(res.send(await getHtmlResponeFromPayload(req.query.prompt, AI_SERVER_GLOBAL)));
    } catch {
      res.status(500).send("Something went wrong");
    }
  }
});

app.listen(PORT, () => {
  console.log(`AI services at http://localhost:${PORT}`);
});
