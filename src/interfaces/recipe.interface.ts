export interface recipe {
    template: string,
    id: number,
    parent: number,
    text?: string | string[],
    attributes?: object
}