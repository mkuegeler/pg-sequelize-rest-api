import express from 'express';
import Service from '../services/templates.service';

class Controller {

    async all(req: express.Request, res: express.Response) {
        const services = await Service.all(100, 0);
        res.status(200).send(services);
    }

    async get(req: express.Request, res: express.Response) {
        const service = await Service.get(Number(req.params.id));
        res.status(200).send(service);
    }

    async post(req: express.Request, res: express.Response) {
        const result = await Service.post(req.body);
        res.status(201).send({ id: result });
    }

    async patch(req: express.Request, res: express.Response) {
        await Service.patch(Number(req.params.id), req.body)
        res.status(204).send();
    }

    async put(req: express.Request, res: express.Response) {
        await Service.put(Number(req.params.id), req.body)
        res.status(204).send();
    }

    async delete(req: express.Request, res: express.Response) {
        await Service.delete(Number(req.params.id));
        res.status(204).send();
    }
}

export default new Controller();