const axios = require("axios");
const crypto = require("crypto");
const moment = require("moment");

// const messages = [];

const sendMessage = async (messages) => {
    const pass = null;
    try {
        const now = Date.now();
        const get = await axios.post(
            "https://chatbb.free2gpt.xyz/api/generate",
            {
                messages: messages,
                time: now,
                pass,
                sign: await generateSignature({
                    t: now,
                    m: messages?.[messages.length - 1]?.content || "",
                }),
            }
        );

        const response = get.data;
        return response;
    } catch (q) {
        console.error(q.response.data);
    }
};

async function digestMessage(r) {
    if (typeof crypto < "u" && crypto?.subtle?.digest) {
        const e = new TextEncoder().encode(r),
            t = await crypto.subtle.digest("SHA-256", e);
        return Array.from(new Uint8Array(t))
            .map((a) => a.toString(16).padStart(2, "0"))
            .join("");
    } else
        return crypto.createHash("sha256").update(r).digest("hex").toString();
}

const generateSignature = async (r) => {
    const { t: e, m: t } = r,
        n = {}.PUBLIC_SECRET_KEY || "",
        a = `${e}:${t}:${n}`;
    return await digestMessage(a);
};

// const sendMessage = async (messages) => {
//     try {
//         const get = await axios.post("http://127.0.0.1:5000", {
//             messages,
//         });

//         try {
//             const response = await get.data;
//             return response.message;
//         } catch (error) {
//             console.log(error);
//             return "An error occured!";
//         }
//     } catch (q) {
//         console.error(q);
//     }
// };

const messages = [
    { role: "user", content: "Hi" },
    { role: "assistant", content: "Hello\u0021 How can I assist you today?" },
    { role: "user", content: "How are you doing?" },
    {
        role: "assistant",
        content:
            "As an AI, I don't have feelings, but I'm here and ready to help you with any questions or tasks you have. How can I assist you today?",
    },
    { role: "user", content: "Lol" },
];

// function converTimestamp(t) {
//     const e = parseInt(t),
//         n = e % 10,
//         r = n % 2 === 0 ? n + 1 : n;
//     return (e - n + r).toString();
// }

// async function digestMessage(t) {
//     if (typeof crypto == "object" && crypto.subtle && crypto.subtle.digest) {
//         const e = new TextEncoder().encode(t),
//             n = await crypto.subtle.digest("SHA-256", e);
//         return Array.from(new Uint8Array(n))
//             .map((a) => a.toString(16).padStart(2, "0"))
//             .join("");
//     } else return sha256(t).toString();
// }

// function getKey() {
//     return "WI,2rU#_r:r~aF4aJ36[.Z(/8Rv93Rf"; // "WI,2rU#_r:r~aF4aJ36[.Z(/8Rv93Rf"
// }

// const generateSignature = async (t) => {
//     const { t: e, m: n } = t,
//         r = `${e}:${n}:${getKey()}:${n.length}`;
//     return await digestMessage(r);
// };

// const sendMessage2 = async (messages) => {
//     try {
//         const now = converTimestamp(new Date().getTime());

//         const signature = await generateSignature({
//             t: now,
//             m: messages?.[messages.length - 1]?.content || "",
//         });

//         const get = await axios.post(
//             "https://api.caipacity.com/v1/chat/completions?full=false",
//             {
//                 model: "gpt-3.5-turbo",
//                 temperature: 0.6,
//                 stream: true,
//                 messages,
//                 d: moment().format("YYYY-MM-DD"),
//                 t: now,
//                 s: signature,
//             },
//             {
//                 headers: {
//                     accept: "*/*",
//                     "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
//                     authorization: "Bearer free",
//                     "cache-control": "no-cache",
//                     "client-id":
//                         "0d2ec7bd-d4f6-4fce-a169-4593fd7" +
//                         Math.floor(Math.random() * 100),
//                     "client-v": "0.1.293",
//                     "content-type": "application/json",
//                     "from-url": "https://ai.ls/?chat=1",
//                     pragma: "no-cache",
//                     "sec-fetch-dest": "empty",
//                     "sec-fetch-mode": "cors",
//                     "sec-fetch-site": "cross-site",
//                     referrer: "https://ai.ls/",
//                 },
//             }
//         );

//         const response = get.data;
//         return response;
//     } catch (q) {
//         console.error(q.response.data);
//     }
// };

module.exports = sendMessage;
