import express from 'express';
import Service from '../services/recipes.service';
import { GenericController } from './generic.controller';

class Controller extends GenericController {

    constructor(s:any=Service) {
        super(s);
    }
    async render(req: express.Request, res: express.Response) {
        let result:string = "render a template";
          res.status(200).send(result);
      }
   
}

export default new Controller();

