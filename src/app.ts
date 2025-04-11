import express, { json } from 'express'
import { envs } from './config/envs';
import { GithubController } from './presentation/github/controller';
import { GitHubSha256Middleware } from './presentation/middlewares/github-sha256.middleware';


(() => {
    main()
})();

function main() {
    const app = express();
    
    app.use(json())
    app.use(GitHubSha256Middleware.verifyGitHubSignature)

    const controller = new GithubController()

    app.get("/", (req, res) => {
        res.send("ok")
    })
    app.post('/api/github', controller.webHookHandler)

    app.listen(envs.PORT, () => {
        console.log(`App running on port http://localhost:${envs.PORT}`)
    });
};