// Start server
import express from 'express';
// import { AllRoutes } from './routes/index'

export class ExpressServer {

  private app: express.Application;
  private server: any;
  private routes: any;

  constructor(config: any, routes:any) {
    this.app = express();
    this.server = config;
    this.routes = routes;
  }
  public run() {
    // Set json parser
    this.app.use(express.json());

    // Setup directory for static files (html, css, etc.)
    this.app.use(express.static(this.server.dir));

    // Setup all routess
    new this.routes(this.app).init();
    this.app.listen(this.server.port);
  }
}
