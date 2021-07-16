// HTML table theme interfaces

export interface tableTheme {
    attributes?: object,
    thead: thead,
    tbody: tbody
}

interface thead {
    attributes?: object,
    tr?: tr
}

interface tbody {
    attributes?: object,
    tr?: tr
}

interface tr {
    attributes?: object,
    th?: th,
    td?: td
}

interface th {
    attributes?: object
}

interface td {
    attributes?: object
}



