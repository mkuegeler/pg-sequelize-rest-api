import express from 'express';
import RecipesService from '../services/recipes.service';
import TemplatesService from '../services/templates.service';
import { GenericController } from './generic.controller';
import { Recipes } from '../app/recipes.assembler'
//import RecipesDao from '../dao/recipes.dao'
// import { PostRecipeDto } from "src/dto/";

class Controller extends GenericController {

    constructor(s: any = RecipesService) {
        super(s);
    }
    async render(req: express.Request, res: express.Response) {
        let doc:any[] = [];
        const Templates = await TemplatesService.all(100, 0);
        const recipe = await RecipesService.get(Number(req.params.id));
        // let doc:any[] = service ? new Recipes(service).get() : ["Doc not found!"];
        if (recipe) {
            recipe.doc.forEach( (element: { index: any; }) => {
                if (Templates[Number(element.index)]) {doc.push(Templates[Number(element.index)]);}
            });
            
        } else {
            doc = ["No Recipes found!"];
        }
        res.status(200).send(doc);
    }
}

export default new Controller();

