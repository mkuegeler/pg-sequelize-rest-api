import express from 'express';
import { GenericRoutes } from './generic.routes';
import Controller from '../controllers/templates.controller';

import { Routes } from './generic.routes.interfaces';

const routeSetup: Routes = {
    name: "TemplatesRoutes",
    route: "templates",
    id: "id",
    controller: Controller
    
};

export class TemplatesRoutes extends GenericRoutes {
    constructor(app: express.Application) {
        super(app, routeSetup);
    }
}






// import express from 'express';
// import Controller from '../controllers/templates.controller';

// Routes:
// GET without argument: Controller.all
// Example: http://localhost:3000/templates

// GET with argument: Controller.get
// Example: http://localhost:3000/templates/id

// export class TemplatesRoutes {
//     private app: express.Application;
//     constructor(app: express.Application) {
//         this.app = app;
//     }
//     public init() {
//         this.app
//             .route(`/templates`)
//             .get(Controller.all)
//             .post(Controller.post);
//         this.app
//             .route(`/templates/:id`)
//             .get(Controller.get)
//             .patch(Controller.patch)
//             .put(Controller.put)
//             .delete(Controller.delete);
//     }
// }
