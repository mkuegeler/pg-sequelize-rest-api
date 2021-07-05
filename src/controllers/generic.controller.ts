import express from 'express';
// import Service from '../services/templates.service';

export abstract class GenericController {
    public Service: any;
    constructor(Service:any) {
        this.Service = Service;
        
        this.all = this.all.bind(this);
        this.get = this.get.bind(this);
        this.post = this.post.bind(this);
        this.patch = this.patch.bind(this);
        this.put = this.put.bind(this);
        this.delete = this.delete.bind(this);
    }
    async all(req: express.Request, res: express.Response) {
        const services = await this.Service.all(100, 0);
        res.status(200).send(services);
    }

    async get(req: express.Request, res: express.Response) {
        const service = await this.Service.get(req.params.uid);
        res.status(200).send(service);
    }

    async post(req: express.Request, res: express.Response) {
        const result = await this.Service.post(req.body);
        res.status(201).send({ uid: result });
    }

    async patch(req: express.Request, res: express.Response) {
        await this.Service.patch(req.params.uid, req.body)
        res.status(204).send();
    }

    async put(req: express.Request, res: express.Response) {
        await this.Service.put(req.params.uid, req.body)
        res.status(204).send();
    }

    async delete(req: express.Request, res: express.Response) {
        await this.Service.delete(req.params.uid);
        res.status(204).send();
    }
}