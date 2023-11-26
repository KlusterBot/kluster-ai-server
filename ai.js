const OpenAI = require("openai");

// Create an instance of the OpenAI API client
const openai = new OpenAI({
    apiKey: "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",
});

const sendMessage = async (messages) => {
    try {
        const completion = await openai.chat.completions.create({
            messages,
            model: "gpt-3.5-turbo",
        });

        return completion.choices[0].message.content;
    } catch (error) {
        return "Something went wrong!";
    }
};

module.exports = sendMessage;
