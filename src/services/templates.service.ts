import TemplatesDao from '../dao/templates.dao'
import { CRUD } from '../interfaces/crud.interface';
import { PostTemplateDto, PutTemplateDto, PatchTemplateDto } from "src/dto/";

// import { createDocument, viewDocument, markup_document } from '../app/markup-generator';

// import { template_lib } from '../assets/index';

class Service implements CRUD {

    async all (limit: number, page: number) {
        return TemplatesDao.all();
    }
    async get (id: number) {
        return TemplatesDao.get(id);
    }
    async post (resource: PostTemplateDto) {
        return TemplatesDao.post(resource);
    }
    async patch (id: number, resource: PatchTemplateDto) {
        return  TemplatesDao.patch(id, resource);
    }
    async put (id: number, resource: PutTemplateDto) {
        return  TemplatesDao.put(id, resource);
    }
    async delete (id: number) {
        return TemplatesDao.delete(id);
    }
}

export default new Service();