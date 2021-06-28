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
    public init() {
        this.app = this.default();
    }
}