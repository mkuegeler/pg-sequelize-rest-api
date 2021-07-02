export interface tpl {
    name: string;
    attributes?: object;
    doctype?: boolean;
    children?: tpl[];
    text?: string | string[];
    parent?: string,
    params?: string
}