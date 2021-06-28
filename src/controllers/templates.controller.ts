import Service from '../services/templates.service';
import { GenericController } from './generic.controller';

class Controller extends GenericController {

    constructor(s:any=Service) {
        super(s);
    }
   
}

export default new Controller();
