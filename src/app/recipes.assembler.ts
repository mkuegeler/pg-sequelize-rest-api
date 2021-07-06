// Assemble recipes
import { createDocument } from './markup.generator';
import { markup_document } from '../interfaces/markup.interface';

export class Recipes {
    public values: any;


    constructor(tpl: any) {
        this.values = tpl;

    }
    get() {

        // return this.values;

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
        let idChecker: string = "";
        let idHistory: string[] = [];

        let root: any = { "children": [] };
        // let root: any = [];
        // let firstID: number = 0;
        // let firstID:number, secondID:number = -1; 
        // // let second: string = "";
        // // return this.values.sort((a: { parent: number; }, b: { parent: number; }) => (a.parent < b.parent ? -1 : 1));

        let sorted = this.values.sort((a: { parent: number; }, b: { parent: number; }) => (a.parent < b.parent ? -1 : 1));
        sorted.forEach((fragment: any) => {
            //     // root.children.push(fragment);
            console.log(fragment.id);
            if (fragment.id === fragment.parent) { root = fragment };

            if (fragment.parent != 0 && fragment.id != 0) {
                let parent = sorted.find((template: { id: number }) => template.id === fragment.parent);


                if (![idChecker, idHistory.find(x => x === fragment.id)].includes(fragment.id)) {
                parent.children = []; 
                }

                   idChecker = fragment.id;
                   idHistory.push(idChecker);
               
                if (parent) {
                    parent.children ? parent.children.push(fragment) : parent.children = [fragment];
                }

                // root.children ? root.children.push(fragment) : root.children = [fragment];
            }

            if (fragment.parent === 0 && fragment.id != 0) {
                root.children ? root.children.push(fragment) : root.children = [fragment];
            }


            // if (parent) {
            //     root.children ? root.children.push(parent) : root.children = [parent];
            // }


            //     //if (![idChecker, idHistory.find(x => x === fragment.id)].includes(fragment.id)) {
            //     // parent.children = []; 
            //     //    if (fragment.parent===0) {root.children.push(fragment);}
            //     // root.children.push(fragment);
            //     //    }

            //     //    idChecker = fragment.id;
            //     //    idHistory.push(idChecker);

            //     //     let parent = sorted.find((template: { id: number }) => template.id === fragment.parent);
            //     //     console.log(fragment.parent);
            //     //     console.log(parent);

            //     //     // if (fragment.id === fragment.parent) {
            //     //     root = fragment;
            //     // } else {
            //     // let [parent] = sorted.filter((parentFilter: { id: number; }) => parentFilter.id === fragment.parent);

            //     // parent.children.push(fragment);
            //     // console.log(parent);

            //     // }


            //     // !fragment.parent ? root = fragment : root.children.push(fragment); 
            //     // first = el.parent;
            //     // if (fragment.parent) {


            //     //     let parent = this.values.filter((parentFilter: { id: number; }) => parentFilter.id === fragment.parent);
            //     //     console.log(parent);

            //     //     parent.children.push(fragment);
            //     //     root.children.push(parent); 
            //     // }
            //     // else {
            //     //     root = fragment;
            //     //     console.log("No parent!");
            //     // }


            //     // return root;

            //     // let [parent] = tpl.children.filter((parentFilter: { name: string; }) => parentFilter.name === fragment[0].parent);

            //     // if (![parentChecker, parentHistory.find(x => x === fragment[0].parent)].includes(fragment[0].parent)) {
            //     // parent.children = []; 

            //     // }

            //     // parentChecker = fragment[0].parent;
            //     // parentHistory.push(parentChecker);

            //     // fragment.forEach((frg: any) => {
            //     //     parent.children.push(frg);
            //     // });
        });

        // // // if (parent) { root.children.push(parent); }
        // // // const [root] = parent;
        // // return root;

        // // console.log(root);

        let p: markup_document = {
            name: root.name,
            attributes: root.attributes,
            doctype: root.doctype,
            children: root.children
        }

        return new createDocument(p).el;


    }

}