import server from './server.json';
import { ExpressServer } from './server';
import { AllRoutes } from './routes/index'

new ExpressServer(server,AllRoutes).run();