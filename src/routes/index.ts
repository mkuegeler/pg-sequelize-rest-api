// export { CommonRoutesConfig } from './common.routes.config';
import express from 'express';
import { TemplatesRoutes } from './templates.routes';
import { RecipesRoutes } from './recipes.routes';

const routeList:any = [
    TemplatesRoutes,
    RecipesRoutes
]

export class AllRoutes {
    private app: express.Application;
    private routes: any[];
    constructor(app: express.Application) {
        this.app = app;
        this.routes = routeList
    }
    public init() {
        this.routes.forEach(route => {
            new route(this.app).init();
        });
    }
}
