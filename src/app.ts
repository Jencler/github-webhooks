import express, { json } from 'express'
import { envs } from './config/envs';
import { GithubController } from './presentation/github/controller';


(() => {
    main()
})();

function main() {
    const app = express();
    app.use(json())
    const controller = new GithubController()

    app.get("/", (req, res) => {
        res.send("ok")
    })
    app.post('/api/github', controller.webHookHandler)

    app.listen(envs.PORT, () => {
        console.log(`App running on port http://localhost:${envs.PORT}`)
    });
};