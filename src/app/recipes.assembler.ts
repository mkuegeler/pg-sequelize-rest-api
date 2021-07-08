// Assemble recipes
import { createDocument } from './markup.generator';
import { markup_document } from '../interfaces/markup.interface';

export class Recipes {
    public values: any;
    constructor(tpl: any) {
        this.values = tpl;

    }
    get() {

        let root: any = { "children": [] };
        this.values.forEach((fragment: any) => {
           
            if (fragment.id === fragment.parent) { root = fragment };

            if (fragment.parent != 0 && fragment.id != 0) {
                let parent = this.values.find((template: { id: number }) => template.id === fragment.parent);
               
                if (parent) {
                    parent.children ? parent.children.push(fragment) : parent.children = [fragment];
                }
            }
            if (fragment.parent === 0 && fragment.id != 0) {
                root.children ? root.children.push(fragment) : root.children = [fragment];
            }
           
        });
        let p: markup_document = {
            name: root.name,
            attributes: root.attributes,
            doctype: root.doctype,
            children: root.children
        }
        return new createDocument(p).el;


    }

}