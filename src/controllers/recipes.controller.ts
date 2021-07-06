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
        const recipe = await RecipesService.get(req.params.uid);

        if (recipe) {
            recipe.doc.forEach((element: { template: any; }) => {

                let template = Templates.find((template: { name: string }) => template.name === element.template);

                if (template) {
                    let doc = template.doc;
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
        let record: any[] = [];
        let result: any = "VOID";
        const Templates = await TemplatesService.all(100, 0);
        const recipe = await RecipesService.get(req.params.uid);

        if (recipe) {
            recipe.doc.forEach((element: any) => {
                let template = Templates.find((template: { name: string }) => template.name === element.template);
                if (template) {
                    let doc = template.doc;
                    doc.name = element.template;
                    doc.id = element.id;
                    doc.parent = element.parent;
                    if (element.attributes) { doc.attributes = element.attributes };
                    if (element.children) { doc.children = element.children };
                    // doc.parent = element.parent ? doc.parent : 0;
                    record.push(doc);
                }
            });
            result = new Recipes(record).get();
        } else {
            record = ["No Recipes found!"];
        }
        res.status(200).send(result);
    }
}

export default new Controller();

