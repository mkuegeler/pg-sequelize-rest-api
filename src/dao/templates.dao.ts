// template DAO
import { nanoid } from 'nanoid';
import { Templates } from "../db/models/templates";
import { PostTemplateDto, PutTemplateDto, PatchTemplateDto } from "src/dto/";

class TemplatesDao {
    public daos: Array<PostTemplateDto> = [];
    constructor() {
        console.log('Created new instance of TemplatesDao');
        this.init();
    }
    private async init() {
        const result = await Templates.findAll({ include: [{ all: true }] });
        this.daos = [];

        // Map the ORM object to the DTO
        result.forEach(record => {
            let dto: PostTemplateDto = {
                uid: record.getDataValue("uid"),
                name: record.getDataValue("name"),
                type: record.getDataValue("type"),
                doc: record.getDataValue("doc")
            }
            this.daos.push(dto);
        });

    }
    // GET without arguments returns all records
    public async all() {
        this.init();
        // Ascending sort by uid
        return this.daos.sort((a, b) => (a.uid < b.uid ? -1 : 1));
    }

    // GET a single element by Id
    public async get(uid: string) {
        this.init();
        return this.daos.find((template: { uid: string }) => template.uid === uid);
    }

    // POST (Create) a new element
    public async post(dto: PostTemplateDto) {
        dto.uid = nanoid();
        this.daos.push(dto);
        
         // Persistent insert in database
        const insert = {
            uid: dto.uid,
            name: dto.name,
            type: dto.type,
            doc: dto.doc,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        await Templates.create(insert);
        // Update DAO cache
        this.init();

        return dto.uid;

    }

    // PATCH a single element
    public async patch(uid: string, dto: PatchTemplateDto) {

        let index = this.daos.findIndex(
            (obj: { uid: string }) => obj.uid === uid
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
        await Templates.update(update, {
            where: {
                uid: uid
            }
        });
        this.init();
        return `${dto.uid} patched`;
        // return this.templates.find((template: { id: number }) => template.id === id);
    }

    // PUT a single element
    public async put(uid: string, dto: PutTemplateDto) {
        
        let index = this.daos.findIndex(
            (obj: { uid: string }) => obj.uid === uid
        );
        this.daos.splice(index, 1, dto);

        // Persistent update in database
        const update = {
            name: dto.name,
            type: dto.type,
            doc: dto.doc
        }
        await Templates.update(update, {
            where: {
                uid: uid
            }
        });
        this.init();
        return `${dto.uid} updated via put`;
    }

    // DELETE a single element
    public async delete(uid: string) {
        let index = this.daos.findIndex(
            (obj: { uid: string }) => obj.uid === uid
        );
        this.daos.splice(index, 1);

        // Persistent deletion in database
        await Templates.destroy({
            where: {
                uid: uid
            }
        });
        this.init();
        return `${uid} deleted`;
        
    }
}

export default new TemplatesDao();