// template DAO
import { Recipes } from "../db/models/recipes";
import { PostRecipeDto, PutRecipeDto, PatchRecipeDto } from "src/dto/";

class RecipesDao {
    public daos: Array<PostRecipeDto> = [];
    constructor() {
        console.log('Created new instance of RecipesDao');
        this.init();
    }
    private async init() {
        const result = await Recipes.findAll({ include: [{ all: true }] });
        this.daos = [];

        // Map the ORM object to the DTO
        result.forEach(record => {
            let dto: PostRecipeDto = {
                id: Number(record.getDataValue("id")),
                name: record.getDataValue("name"),
                type: record.getDataValue("type"),
                doc: record.getDataValue("doc")
            }
            this.daos.push(dto);
        });

    }
    // GET without arguments returns all records
    public async all() {
        // Ascending sort by id
        return this.daos.sort((a, b) => (a.id < b.id ? -1 : 1));
    }

    // GET a single element by Id
    public async get(id: number) {
        return this.daos.find((template: { id: number }) => template.id === id);
    }

    // POST (Create) a new element
    public async post(dto: PostRecipeDto) {

        this.daos.push(dto);
        
         // Persistent insert in database
        const insert = {
            name: dto.name,
            type: dto.type,
            doc: dto.doc,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        await Recipes.create(insert);

        return `${dto.name} created`;

    }

    // PATCH a single element
    public async patch(id: number, dto: PatchRecipeDto) {

        let index = this.daos.findIndex(
            (obj: { id: number }) => obj.id === id
        );
        let currentRecord = this.daos[index];
        const allowedPatchFields = [
            'name',
            'type',
            'doc',
        ];
        for (let field of allowedPatchFields) {
            if (field in dto) {
                // @ts-ignore
                currentRecord[field] = dto[field];
            }
        }
        this.daos.splice(index, 1, currentRecord);
        
        // Persistent update in database
        const update = {
            name: dto.name,
            type: dto.type,
            doc: dto.doc
        }
        await Recipes.update(update, {
            where: {
                id: id
            }
        });

        return `${dto.id} patched`;
        // return this.templates.find((template: { id: number }) => template.id === id);
    }

    // PUT a single element
    public async put(id: number, dto: PutRecipeDto) {
        
        let index = this.daos.findIndex(
            (obj: { id: number }) => obj.id === id
        );
        this.daos.splice(index, 1, dto);

        // Persistent update in database
        const update = {
            name: dto.name,
            type: dto.type,
            doc: dto.doc
        }
        await Recipes.update(update, {
            where: {
                id: id
            }
        });

        return `${dto.id} updated via put`;
    }

    // DELETE a single element
    public async delete(id: number) {
        let index = this.daos.findIndex(
            (obj: { id: number }) => obj.id === id
        );
        this.daos.splice(index, 1);

        // Persistent deletion in database
        await Recipes.destroy({
            where: {
                id: id
            }
        });
        return `${id} deleted`;
        
    }
}

export default new RecipesDao();