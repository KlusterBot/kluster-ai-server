const axios = require("axios");
const crypto = require("crypto");

const messages = [];

const sendMessage = async (messages) => {
    const pass = null;
    try {
        const now = Date.now()
        const get = await axios.post("https://chatbb.free2gpt.xyz/api/generate", {
            messages: messages,
            time: now,
            pass,
            sign: await generateSignature({
                t: now,
                m: messages?.[messages.length - 1]?.content || ""
            })
        });

        console.log(get.data);
        
        try {
            const response = await get.data;
            return response;
        } catch (error) {
            error.response.data.error
            return "An error occured!";
        }
    } catch (q) {
        console.error(q);
    }

}

async function digestMessage(r) {
    if (typeof crypto < "u" && crypto?.subtle?.digest) {
        const e = new TextEncoder().encode(r)
          , t = await crypto.subtle.digest("SHA-256", e);
        return Array.from(new Uint8Array(t)).map(a=>a.toString(16).padStart(2, "0")).join("")
    } else
        return sha256Exports.sha256(r).toString()
}

const generateSignature = async (r) => {
    const {t: e, m: t} = r
      , n = {}.PUBLIC_SECRET_KEY || ""
      , a = `${e}:${t}:${n}`;
    return await digestMessage(a)
}

module.exports = sendMessage