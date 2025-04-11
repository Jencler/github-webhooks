import { GitHubIssuesPayload, GitHubStartPayload } from "../interfaces";

export class GitHubService {
    constructor() { }

    onStart = (payload: GitHubStartPayload): string => {
        const { starred_at, action, repository, sender } = payload
        return `Usuario ${sender.login} - ${action} - una estrella al repositorio ${repository.full_name}`
    }

    onIssue = (payload: GitHubIssuesPayload): string => {
        const { action, issue, repository, sender } = payload

        if (action === 'opened') {
            return `Usuario ${sender.login} - abrió una issue al repo ${repository.full_name}, con titulo de : ${issue.title}`
        }
        if (action === 'closed') {
            return `User ${sender.login} - closed - issue on ${repository.full_name}, with title : ${issue.title}`
        }

        if (action === 'reopened') {
            return `User ${sender.login} - reopened - issue on ${repository.full_name}, with title : ${issue.title}`
        }

        return `unhandled action for the issue event ${action}`

    }
}