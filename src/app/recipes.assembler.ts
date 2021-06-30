// Assemble recipes
import { createDocument, viewDocument, markup_document } from './markup.generator';
import { PostRecipeDto, PostTemplateDto } from "src/dto/";
import TemplatesDao from '../dao/templates.dao';
import Service from '../services/templates.service';

export class Recipes {
    public el: any[];


    constructor(el: any[]) {
        this.el = el;

    }
     get() {

        
    }

}