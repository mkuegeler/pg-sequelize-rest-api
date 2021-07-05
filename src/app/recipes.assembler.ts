// Assemble recipes
import { createDocument } from './markup.generator';
import { markup_document } from '../interfaces/markup.interface';

export class Recipes {
    public values: any;


    constructor(tpl: any) {
        this.values = tpl;

    }
    get() {

        // let tpl: any = {};
        // // tpl = this.values[0];

        // this.values.forEach((element: any, index: number) => {
        //     element.forEach((child: { parent: any; }) => {
        //         if (!child.parent || child.parent === "root") {
        //             tpl = child; 
        //             // this.values.splice(index, 1);
        //         }
        //     });
        // });
        // let parentChecker: string = "";
        // let parentHistory: string[] = [];

        let root: any = {"children":[]};
        // let first: string = "";
        // let second: string = "";

        this.values.forEach((fragment: any[]) => {
            fragment.forEach(el => {
                !el.parent ? root = el : root.children.push(el); 
                // first = el.parent;
                

            });


            // let [parent] = tpl.children.filter((parentFilter: { name: string; }) => parentFilter.name === fragment[0].parent);
           
            // if (![parentChecker, parentHistory.find(x => x === fragment[0].parent)].includes(fragment[0].parent)) {
                // parent.children = []; 
                
            // }

            // parentChecker = fragment[0].parent;
            // parentHistory.push(parentChecker);

            // fragment.forEach((frg: any) => {
            //     parent.children.push(frg);
            // });
        });

        // console.log(root);

        let p: markup_document = {
            name: root.name,
            attributes: root.attributes,
            doctype: root.doctype,
            children: root.children
        }

        return new createDocument(p).el;


    }

}