import { createDocument } from "../../common/markup.generator";
import { markup_document } from "../../common/markup.interface";
import { source } from "../../../interfaces/source.interface";
import { tableTheme } from "../themes/interfaces/html.table.theme.interface";

export class TableGenerator {
    public src: source;
    public theme: tableTheme;
    constructor(src: source, theme: tableTheme) {
        this.src = src;
        this.theme = theme;
    }
    public create() {

        let thead = this.buildHeader();
        let tbody = this.buildTable();

        let children = thead.children? [thead, tbody] : [tbody];

        // Build main element: Table.
        let table: markup_document = {
            name: "table",
            ...(this.theme.attributes && { attributes: this.theme.attributes }),
            children: children

        }
        return new createDocument(table).el;


    }
    private buildHeader() {
        let header: any = [];

        let thead: markup_document = {
            name: "thead",
            ...(this.theme.thead.attributes && { attributes: this.theme.thead.attributes }),
        }
        let tr: markup_document = {
            name: "tr",
            ...(this.theme.thead.tr?.attributes && { attributes: this.theme.thead.tr?.attributes })
        }

        if (this.src.header) {
            let th: markup_document = {
                name: "th",
                ...(this.theme.thead.tr?.th?.attributes && { attributes: this.theme.thead.tr?.th?.attributes }),
                text: "#"
            }
            header.push(th);

            this.src.header.forEach((element: any) => {
                let th: markup_document = {
                    name: "th",
                    ...(this.theme.thead.tr?.th?.attributes && { attributes: this.theme.thead.tr?.th?.attributes }),
                    text: element
                }
                header.push(th);
            });

            tr.children = header;
            thead.children = [tr];
        }
        
        return thead;

    }
    private buildTable() {
        let rows: any = [];
        let cols: any = [];
        let tbody: markup_document = {
            name: "tbody",
            ...(this.theme.tbody.attributes && { attributes: this.theme.tbody.attributes }),
        }
        let colNumber: number = this.src.header ? this.src.header.length : 1;
        let colCounter: number = 0;
        let rowCounter: number = 1;

        if (this.src.header) {

            this.src.data.forEach(element => {

                if (colCounter < (colNumber+1)) {

                    if (colCounter === 0) {
                        let th: markup_document = {
                            name: "th",
                            ...(this.theme.tbody.tr?.th?.attributes && { attributes: this.theme.tbody.tr?.th?.attributes }),
                            text: String(rowCounter)
                        }
                        rowCounter++;
                        cols.push(th);
                    }
                    else {

                        let td: markup_document = {
                            name: "td",
                            ...(this.theme.tbody.tr?.td?.attributes && { attributes: this.theme.tbody.tr?.td?.attributes }),
                            text: String(element)
                        }

                        cols.push(td);
                    }
                    colCounter++;
                } else {
                    let tr: markup_document = {
                        name: "tr",
                        ...(this.theme.tbody.tr?.attributes && { attributes: this.theme.tbody.tr?.attributes }),
                        children: cols
                    }
                    rows.push(tr);
                    colCounter = 0;
                    cols = [];

                }
            });

        }

        tbody.children = rows;

        return tbody;

    }

}