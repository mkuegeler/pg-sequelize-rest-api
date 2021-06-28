export interface CRUD {
    all: (limit: number, page: number) => Promise<any>;
    get: (id: number) => Promise<any>;
    post: (resource: any) => Promise<any>;
    patch: (id: number, resource: any) => Promise<any>;
    put: (id: number, resource: any) => Promise<any>;
    // putById: (id: string, resource: any) => Promise<string>;
    delete: (id: number) => Promise<any>;
    
}