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

        let First: any = "";
        let Second: any = "";
        let History: any[] = [];

        let count: number = 0;

        if (recipe) {
            recipe.doc.forEach((element: any) => {

                let template = Templates.find((template: { name: string }) => template.name === element.template);
                if (template) {


                    First = template.doc.name;
                    History.push(First);

                    let doc = template.doc;

                    // let IsName = History.find((x: any) => x === First);

                    if (History.find((x: any) => x === First) === Second) {
                        doc = {
                            "name": template.doc.name,
                            "text": element.text,
                            "id": element.id,
                            "parent": element.parent
                        };
                    } else {

                        doc.id = element.id;
                        doc.parent = element.parent;
                        if (element.attributes) { doc.attributes = element.attributes };
                        if (element.children) { doc.children = element.children };
                        if (element.text) { doc.text = element.text };


                    }


                    // if (element.text==='Sub title 1') {
                    //     template.doc.text = element.text;
                    //     History.push(template.doc);
                    //     // count++;
                    // }
                    // if (element.text==='Sub title 2') {
                    //     // template.doc.text = element.text;
                    //     let doc = {"name":  template.doc.name,  "text": element.text};
                    //     History.push(doc);
                    //     // count++;
                    // }

                    // record[count] = doc;


                    // console.log(doc);


                    // if (doc.name==='h4' && count===1) {
                    //     History.push(doc);
                    //     count++;
                    // }

                    // let IsName = History.find((x: any) => x === First);

                    // if (IsName===Second) {
                    //     console.log(IsName); 
                    // }
                    Second = template.doc.name;

                    record.push(doc);
                    // count++;
                }
            });

            result = new Recipes(record).get();
            // console.log(record);
        } else {
            record = ["No Recipes found!"];
        }
        res.status(200).send(result);
    }
}

export default new Controller();

