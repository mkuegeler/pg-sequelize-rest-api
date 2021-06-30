// Templates
import document from './html/document.json';
import header from './html/header.json';
import script from './html/script.json';
import meta from './html/meta.json';
import link from './html/link.json';

export interface templates {
    id: number,
    name: string,
    type: string,
    doc: any
}

export const template_lib: templates[] = [
    { id: 0, name: "document", type: "html", doc: document },
    { id: 1, name: "meta", type: "html", doc: meta },
    { id: 2, name: "header", type: "html", doc: header },
    { id: 3, name: "script", type: "html", doc: script },
    { id: 4, name: "link", type: "html", doc: link }

]

