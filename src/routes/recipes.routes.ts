import express from 'express';
import { GenericRoutes } from './generic.routes';
import Controller from '../controllers/recipes.controller';

import { Routes } from './generic.routes.interfaces';

const routeSetup: Routes = {
    name: "RecipesRoutes",
    route: "recipes",
    id: "id",
    controller: Controller

};

export class RecipesRoutes extends GenericRoutes {
    constructor(app: express.Application) {
        super(app, routeSetup);
    }
    public init() {
        this.app = this.default();
        this.app
            .route(`/${this.params.route}/:${this.params.id}/render`)
            .get(this.params.controller.render);
        this.app
            .route(`/${this.params.route}/:${this.params.id}`)
            .post(this.params.controller.create);
    }
}