import * as functions from 'firebase-functions'
import dotenv from 'dotenv'
import { OpenAI } from 'openai/client.js'

dotenv.config()
const ai = new OpenAI({apiKey: process.env["KEY"]})

const items = async (texts) => {
    const response = await ai.chat.completions.create({
        model: "o4-mini",
        reasoning_effort: "low", 
        messages: [
            {
                role: "user", 
                content: [
                    {type: "text", text: "improve this text in the same language " + texts  + ", please"}
                ]
            }
        ]
    })
    return response.choices[0].message["content"]
}

export const obj = functions.https.onRequest({cors: true}, async (req, res) => {
    const {text} = req.query

    const target = await items(text)

    res.status(200).send(target)
    return res.end()
})