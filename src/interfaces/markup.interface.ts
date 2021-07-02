export interface markup_document {
    name: string;
    attributes?: object;
    doctype?: boolean;
    children?: markup_document[];
    text?: string | string[]
}