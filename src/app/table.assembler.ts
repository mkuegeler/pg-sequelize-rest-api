import { table } from '../interfaces/table.interface';
import { recipe } from '../interfaces/recipe.interface';
import RecipesService from '../services/recipes.service';
import TemplatesService from '../services/templates.service';

export class Table {

    async post(resource: table, id: string) {

        // let headers: recipe[] = [];
        let tableRecipe: recipe[] = [];
        // let count: number = 0;

        // const Templates = await TemplatesService.all(100, 0);
        const selectedRecipe = await RecipesService.get(id);
        

        if (selectedRecipe) {
            let table = selectedRecipe.doc.find((template: { name: string }) => template.name === "default.dark.table");
            let thead = selectedRecipe.doc.find((template: { name: string }) => template.name === "default.thead");
            let tbody = selectedRecipe.doc.find((template: { name: string }) => template.name === "default.tbody");
            let tr = selectedRecipe.doc.find((template: { name: string }) => template.name === "default.tr");
            let td = selectedRecipe.doc.find((template: { name: string }) => template.name === "default.td");

            selectedRecipe.doc.forEach((element: any) => {

                tableRecipe.push({
                    id: element.id,
                    parent: element.parent,
                    template: element.template,
                    ...(element.text && { text: element.text }),
                    ...(element.attributes && { attributes: element.attributes })
                });

            });

        }

        return tableRecipe;

        // let table = Templates.find((template: { name: string }) => template.name === "default.dark.table");
        // let thead = Templates.find((template: { name: string }) => template.name === "default.thead");
        // let tbody = Templates.find((template: { name: string }) => template.name === "default.tbody");
        // let tr = Templates.find((template: { name: string }) => template.name === "default.tr");
        // let td = Templates.find((template: { name: string }) => template.name === "default.td");

        /*  
        
        html table example:
        <table class="table align-middle">
            <thead>
              <tr>
                ...
              </tr>
            </thead>
            <tbody>
              <tr>
                ...
              </tr>
              <tr class="align-bottom">
                ...
              </tr>
              <tr>
                <td>...</td>
                <td>...</td>
                <td class="align-top">This cell is aligned to the top.</td>
                <td>...</td>
              </tr>
            </tbody>
          </table>
        
          table: 
          - parent=body
          - id: 0
          
          thead:
          - parent=0
          - id: 1
        
          - tr
          - parent=1
          - id: 2
        
          - tr
          - parent=1
          - id: 3
        
          - tr
          - parent=1
          - id: x
        
          tbody
          - parent=0
          -id: x
        
          tr
          - parent=tbody-id
          - id: x
        
          td
          - parent=tr-id
          - id: x
          
        
        
        */



        //     if (selectedRecipe) {
        //         count = selectedRecipe.doc.length;
        //         selectedRecipe.doc.forEach((element: any) => {

        //             tableRecipe.push({
        //                 id: element.id,
        //                 parent: element.parent,
        //                 template: element.template,
        //                 ...(element.text && { text: element.text }),
        //                 ...(element.attributes && { attributes: element.attributes })
        //             });

        //         });

        //     }


        //     resource.header.forEach(element => {

        //         headers.push({
        //             id: count,
        //             parent: 0,
        //             template: "div",
        //             text: element
        //         });

        //         count++;

        //     });

        //     tableRecipe.push(...headers);

        //     return tableRecipe;
    }
}

export default new Table();