const crypto = require("crypto");

async function digestMessage(r) {
    // if (typeof crypto < "u" && crypto?.subtle?.digest) {
    //     const e = new TextEncoder().encode(r)
    //       , t = await crypto.subtle.digest("SHA-256", e);
    //     return Array.from(new Uint8Array(t)).map(a=>a.toString(16).padStart(2, "0")).join("")
    // } else
        return crypto.createHash("sha256").update(r).digest("hex")
}


digestMessage("test").then(console.log)