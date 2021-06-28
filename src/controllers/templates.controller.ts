import express from 'express';
// import TemplatesDao from '../dao/templates.dao';
import Service from '../services/templates.service';

class TemplatesController {

    async all(req: express.Request, res: express.Response) {
        // let result = await TemplatesDao.all();
        // res.status(200).send(result);
        const services = await Service.all(100, 0);
        res.status(200).send(services);
    }

    async get(req: express.Request, res: express.Response) {
        // let result = await TemplatesDao.get(Number(req.params.id));
        // res.status(200).send(result);
        const service = await Service.get(Number(req.params.id));
        res.status(200).send(service);
    }

    async post(req: express.Request, res: express.Response) {
        // let result = await TemplatesDao.post(req.body);
        // res.status(200).send(result);
        const result = await Service.post(req.body);
        res.status(201).send({ id: result });
    }

    async patch(req: express.Request, res: express.Response) {
        // let result = await TemplatesDao.patch(Number(req.params.id),req.body);
        // res.status(200).send(result);
        await Service.patch(Number(req.params.id), req.body)
        res.status(204).send();
    }

    async put(req: express.Request, res: express.Response) {
        // let result = await TemplatesDao.put();
        // res.status(200).send(result);
        await Service.put(Number(req.params.id), req.body)
        res.status(204).send();
    }

    async delete(req: express.Request, res: express.Response) {
        // let result = await TemplatesDao.delete();
        // res.status(200).send(result);
        await Service.delete(Number(req.params.id));
        res.status(204).send();
    }

}

export default new TemplatesController();