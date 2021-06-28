import express from 'express';
import { Routes } from './generic.routes.interfaces';

export abstract class GenericRoutes {
    public app: express.Application;
    public params: Routes;
    constructor(app: express.Application, params: Routes) {
        this.app = app;
        this.params = params;
    }
    public default() {
        this.app
            .route(`/${this.params.route}`)
            .get(this.params.controller.all)
            .post(this.params.controller.post);
        this.app
            .route(`/${this.params.route}/:${this.params.id}`)
            .get(this.params.controller.get)
            .patch(this.params.controller.patch)
            .put(this.params.controller.put)
            .delete(this.params.controller.delete);
        return this.app;
    }
}
