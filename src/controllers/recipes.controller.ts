import express from 'express';
import RecipesService from '../services/recipes.service';
import TemplatesService from '../services/templates.service';
import { GenericController } from './generic.controller';
import { Recipes } from '../app/recipes.assembler';
import  Table from '../app/table.assembler';

class Controller extends GenericController {

    constructor(s: any = RecipesService) {
        super(s);
    }
    async create(req: express.Request, res: express.Response) {

        const result =  await Table.post(req.body,req.params.uid);
        res.status(201).send(result);
        
    }

    async preview(req: express.Request, res: express.Response) {
        let record: any[] = [];
        let result: any = "VOID";
        const Templates = await TemplatesService.all(100, 0);
        const recipe = await RecipesService.get(req.params.uid);
       
        if (recipe) {
            recipe.doc.forEach((element: any) => {

                let template = Templates.find((template: { name: string }) => template.name === element.template);
                if (template) {

                    let doc = {
                        "name": template.doc.name,
                        ...(element.text && { "text": element.text }),
                        ...(!element.text && { "text": template.doc.text }),
                        "id": element.id,
                        "parent": element.parent,
                        ...(element.attributes && { "attributes": element.attributes }),
                        ...(!element.attributes && { "attributes": template.doc.attributes })
                    };
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
