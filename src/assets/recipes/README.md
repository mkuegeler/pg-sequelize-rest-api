# Recipes
A brief introduction

## What are recipes?
Recipes are data structures which enable the design of parametric items.
Basically, a recipe is a JSON data object. It consists of a meta section and a data section.

Example:

```JSON
{
    "id": 1,
    "name": "html-sample-page",
    "type": "html",
    "doc": [
        {
            "index": 0,
            "template": "document"
        },
        {
            "index": 1,
            "template": "meta"
        },
        {
            "index": 2,
            "template": "link"
        },
        {
            "index": 3,
            "template": "header",
            "params": [{"key":"value"}, {"key":"value"}, {"key":"value"}]
        },
        {
            "index": 4,
            "template": "script"
        }
    ]
}
```

This record accepts parameters. Parameters are an array of multiple objects. The format and structure depends on the definition in the corresponding template.

```JSON
{
            "index": 3,
            "template": "header",
            "params": [{"key":"value"}, {"key":"value"}, {"key":"value"}]
        }
```

## Parameter definition in templates
Parameters and corresponding actions need to be defined in a template.

### Example 1: Overwriting attributes
The following example shows a html template to provide external css links. The array `params` defines which subsequent elements depend on parameters. In the example below, value of `attributes` can be overwritten by a parameter.

#### Template
```JSON
[
    {
        "name": "link",
        "parent": "head",
        "params": ["attributes"],
        "attributes": {
            "rel": "stylesheet",
            "href": "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css",
            "integrity": "sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm",
            "crossorigin": "anonymous"
        }
    }
]
```

The corresponding recipe defines a new value for `attributes`. Those keys not mentioned in the recipe will be taken over from the orginal dataset. Default values depend on the domain the attributes belong to (html, svg or others).

#### Recipe
```JSON
[
  {
    "id": 1,
    "name": "html-sample-page",
    "type": "html",
    "doc": [
        {
            "index": 0,
            "template": "document"
        },
        {
            "index": 1,
            "template": "meta"
        },
        {
            "index": 2,
            "template": "link",
            "params": [{"attributes":{"href": "my.css"}}]
        },
        {
            "index": 3,
            "template": "header"
        },
        {
            "index": 4,
            "template": "script"
        }
    ]
}  
]
```

### Example 2: Text injection
It is possible to replace text content on multiple positions. Depending on the order of elements in the parameter array, all text content will be replaced.


#### Template
```JSON
[
    {
        "name": "header",
        "parent": "body",
        "params": ["text"],
        "children": [
            {
                "name": "div",
                "attributes": {
                    "class": "jumbotron"
                },
                "children": [
                    {
                        "name": "h1",
                        "attributes": {
                            "class": "display-3"
                        },
                        "text": "Header Title"
                    },
                    {
                        "name": "p",
                        "attributes": {
                            "class": "lead"
                        },
                        "text": "Sub Title"
                    },
                    {
                        "name": "hr",
                        "attributes": {
                            "class": "my-2"
                        }
                    },
                    {
                        "name": "p",
                        "attributes": {
                            "class": "lead"
                        },
                        "children": [
                            {
                                "name": "div",
                                "attributes": {
                                    "id": "main"
                                },
                                "children": [
                                    {
                                        "name": "h4",
                                        "text": "Main Title"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
]
```

#### Recipe
```JSON
[
  {
    "id": 1,
    "name": "html-sample-page",
    "type": "html",
    "doc": [
        {
            "index": 0,
            "template": "document"
        },
        {
            "index": 1,
            "template": "meta"
        },
        {
            "index": 2,
            "template": "link"
        },
        {
            "index": 3,
            "template": "header",
            "params": [{"text": "Replacement of Header Title"}, {"text": "Replacement of Sub Title"}]
        },
        {
            "index": 4,
            "template": "script"
        }
    ]
}  
]
```

### A more advanced Example: Element generation using macros.
A more advanced option is to create an element based on a set of parameters.
Example: Creating a table with multiple rows and colums.

#### Template
The name of the template indicates which macro is being used to create the parametric content. 

A macro in a template is just the name of the template with a dot: `html.table`. The first part of the name indicates the macro domain. The second part indicates the macro itself.

```JSON
[
    {
        "name": "html.table",
        "attributes": {
            "class": "table table-dark table-striped"
        },
        "params": ["name"],
        "children": [
            {
                "name": "thead",
                "children": [
                    {
                        "name": "th"
                    }
                ]
            }
        ]
    }
]

```


