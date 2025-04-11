import { Request, Response } from "express"
import { GitHubService } from "../../services/github.service"
import { DiscordService } from "../../services/discord.service"

export class GithubController {
    constructor(
        private readonly hithubService = new GitHubService(),
        private readonly discordService = new DiscordService(),
    ) { }

    webHookHandler = (req: Request, res: Response) => {
        const githubEvent = req.header('x-github-event') ?? 'unknown'
        const payload = req.body
        let message: string

        switch (githubEvent) {
            case 'star':
                message = this.hithubService.onStart(payload)
                break

            case 'issues':
                message = this.hithubService.onIssue(payload)
                break

            default:
                message = `Unknown Event ${githubEvent}`
                break
        }


        console.log({ message })

        this.discordService.notify(message)
            .then(() => res.status(202).send('accepted'))
            .catch(() => res.status(500).json({
                error: "Internal server error"
            }))
    }
}