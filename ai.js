const OpenAI = require("openai");

// Create an instance of the OpenAI API client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY,
});

const sendMessage = async (messages) => {
    try {
        const completion = await openai.chat.completions.create({
            messages,
            model: "gpt-3.5-turbo",
        });

        return completion.choices[0].message.content;
    } catch (error) {
        console.log(error);
        return "Something went wrong!";
    }
};

module.exports = sendMessage;
