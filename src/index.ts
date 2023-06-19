import { App } from "./app";
import { EmailController } from "./app/controller/emailController";
import { EmailRouter } from "./app/routes/emailRouter";
import { Logger } from "./app/services/logger.service";

const port = 3006;

export class Index {
  constructor(private emailRouter: EmailRouter) {
    new App(emailRouter).server
      .listen(port, () => {
        Logger.infoLog(`Server running on port ${port}`);
      })
      .on("error", (err: any) => {
        Logger.errorLog(`Server error: ${err.message}`);
      });
  }
}

new Index(
  new EmailRouter(new EmailController()));
