export interface CRUD {
    all: (limit: number, page: number) => Promise<any>;
    get: (id: string) => Promise<any>;
    post: (resource: any) => Promise<any>;
    patch: (id: string, resource: any) => Promise<any>;
    put: (id: string, resource: any) => Promise<any>;
    // putById: (id: string, resource: any) => Promise<string>;
    delete: (id: string) => Promise<any>;
    
}