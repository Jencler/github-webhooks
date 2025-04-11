import { envs } from "../config/envs";

export class DiscordService {

    private readonly discordWebhookUrl: string = envs.DISCORD_WEBHOOK_URL

    constructor() { }

    notify = async (message: string) => {
        const body = {
            content: message,
            embeds: [
                {
                    image: {
                        url: 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZGIwN2k4YjJkbHQ3cTBrNWN6ZzRxemkzNHUycnVya2FjcWZ6OWgzOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Ws6T5PN7wHv3cY8xy8/giphy.gif'
                    }
                }
            ]
        }

        const response = await fetch(this.discordWebhookUrl, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
        })

        if (!response.ok) {
            console.log(`Error sending message to discord`)
            return false
        }

        return true
    }
}