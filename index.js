const express = require("express");
const app = express();
const port = 4000;

const NodeCache = require("node-cache");
const chatCache = new NodeCache();

const ai = require("./ai");

// const prompt = `I want you to act as a website support agent, assisting visitors with information about our company website. Imagine the user is inquiring about our products, services, or specific features. Begin the prompt by greeting the user and anticipating their needs, then guide them through the available resources on the website to provide comprehensive assistance. Make sure to convey a helpful and friendly tone throughout the conversation.
// Your name is Kluster Bot,
// If a visitor requests for a phone call,
// Reply with "{call}" on the first line of your response and a response below assuring an incoming call in few seconds.
// In brackets below is our company information,
// {${info}}
// `

// const prompt = `I want you to act as a website support agent, assisting visitors with information about our company website. Imagine the user is inquiring about our products, services, or specific features. Begin the prompt by greeting the user and anticipating their needs, then guide them through the available resources on the website to provide comprehensive assistance. Make sure to convey a helpful and friendly tone throughout the conversation.
// I want you to reply with the solution, not write any explanations.
// Always redirect your conversations back to assisting visitors,
// Try not to talk much about other things unrelated to this.
// Your name is Kluster Bot,
// In brackets below is our company information,
// {${info}}`;

const getFirstMessage = (message, model) => {
    return `I want you to act as a website support agent, assisting visitors with information about our company website. Imagine the user is inquiring about our products, services, or specific features. Begin the prompt by greeting the user and anticipating their needs, then guide them through the available resources on the website to provide comprehensive assistance. Make sure to convey a helpful and friendly tone throughout the conversation.
I want you to reply with the solution, not write any explanations.
Always redirect your conversations back to assisting visitors,
Try not to talk much about other things unrelated to this.
Your name is Kluster Bot,
In brackets below is our company information,
{${model}}
my first message is "${message}`;
};

const getAction = (message) => {
    const firstLine = message.split("\n")[0];

    if (firstLine == "{call}") {
        return {
            message: message.replace("{call}", "").trim(),
            action: "call",
        };
    }
    return { message, action: "" };
};

app.use(express.json());

app.get("/", (req, res) => {
    res.send("AI Server is active!");
});

app.post("/", async (req, res) => {
    try {
        let { id, message, model } = req.body;
    const messages = chatCache.get(id) || [];

    console.log({model})

    if (messages.length === 0) {
        messages.push({
            role: "user",
            content: getFirstMessage(message, model),
        });
    } else {
        messages.push({ role: "user", content: message });
    }
    console.log(messages);

    console.log("Me:", message);

    const response = await ai(messages);

    if (!response) {
        return res.send({}).status(500);
    }

    messages.push({ role: "assistant", content: response });

    chatCache.set(id, messages);

    console.log("AI:", response);

    const data = getAction(response);

    res.send({ response: data.message, action: data.action });

    } catch (error) {
        console.log(error)
        res.send({}).status(500);
    }
});

app.listen(port, () => {
    console.log(`AI app listening on port ${port}`);
});
