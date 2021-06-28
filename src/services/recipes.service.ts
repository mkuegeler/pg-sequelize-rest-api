import RecipesDao from '../dao/recipes.dao'
import { CRUD } from '../interfaces/crud.interface';
import { PostRecipeDto, PutRecipeDto, PatchRecipeDto } from "src/dto/";

// import { createDocument, viewDocument, markup_document } from '../app/markup-generator';

// import { template_lib } from '../assets/index';

class Service implements CRUD {

    async all (limit: number, page: number) {
        return RecipesDao.all();
    }
    async get (id: number) {
        return RecipesDao.get(id);
    }
    async post (resource: PostRecipeDto) {
        return RecipesDao.post(resource);
    }
    async patch (id: number, resource: PatchRecipeDto) {
        return  RecipesDao.patch(id, resource);
    }
    async put (id: number, resource: PutRecipeDto) {
        return  RecipesDao.put(id, resource);
    }
    async delete (id: number) {
        return RecipesDao.delete(id);
    }
}

export default new Service();