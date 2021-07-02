import express from 'express';
import RecipesService from '../services/recipes.service';
import TemplatesService from '../services/templates.service';
import { GenericController } from './generic.controller';
import { Recipes } from '../app/recipes.assembler'

class Controller extends GenericController {

    constructor(s: any = RecipesService) {
        super(s);
    }
    async render(req: express.Request, res: express.Response) {
        let record: any[] = [];
        let result: any = "VOID";
        const Templates = await TemplatesService.all(100, 0);
        const recipe = await RecipesService.get(Number(req.params.id));

        if (recipe) {
            recipe.doc.forEach((element: { index: any; }) => {
                if (Templates[Number(element.index)]) {
                    let doc = Templates[Number(element.index)].doc;
                    record.push(doc);
                }
            });
            result = new Recipes(record).get();
        } else {
            record = ["No Recipes found!"];
        }
        res.status(200).send(result);
    }

    async create(req: express.Request, res: express.Response) {
        const recipe = await RecipesService.get(Number(req.params.id));
        res.status(200).send(recipe);
    }
}

export default new Controller();

