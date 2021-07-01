// Assemble recipes
import { createDocument, markup_document } from './markup.generator';

export class Recipes {
    public values: any;


    constructor(tpl: any) {
        this.values = tpl;

    }
    get() {

        let tpl: any = {};

        this.values.forEach((element: any, index: number) => {
            element.forEach((child: { parent: any; }) => {
                if (!child.parent || child.parent === "root") {
                    tpl = child; this.values.splice(index, 1);
                }
            });
        });
        let parentChecker: string = "";
        let parentHistory: string[] = [];

        this.values.forEach((fragment: any[]) => {

            let [parent] = tpl.children.filter((parentFilter: { name: string; }) => parentFilter.name === fragment[0].parent);

            if (![parentChecker, parentHistory.find(x => x === fragment[0].parent)].includes(fragment[0].parent)) {
                parent.children = [];
            }

            parentChecker = fragment[0].parent;
            parentHistory.push(parentChecker);

            fragment.forEach((frg: any) => {
                parent.children.push(frg);
            });
        });

        let p: markup_document = {
            name: tpl.name,
            attributes: tpl.attributes,
            doctype: tpl.doctype,
            children: tpl.children
        }

        return new createDocument(p).el;


    }

}