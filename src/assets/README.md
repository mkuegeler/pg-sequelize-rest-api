# Endpoints

### GET http://localhost:3000/
Static html page

## Endpoint: `templates`
Templates are predefined building blocks with optional parameters.


### GET http://localhost:3000/templates
Shows list of all templates of all types.
Unfiltered.

Access: ALL

### POST http://localhost:3000/templates
Creates a new template

Access: ADMIN

### PATCH http://localhost:3000/templates/{id}
Partial update a template.

Access: ADMIN

### PUT http://localhost:3000/templates/{id}
Full update a template.

Access: ADMIN

### DELETE http://localhost:3000/templates/{id}
Delete a template

Access: ADMIN

## Endpoint: `recipes`
Recipes are combinations of templates.

### GET http://localhost:3000/recipes
Shows list of all recipes of all types.
Unfiltered.

Access: ALL

### GET http://localhost:3000/recipes/{id}
Shows a single recipe as pure JSON.

Access: ALL

### GET http://localhost:3000/recipes/{id}/render
Renders a single recipe in a markup language. 

Access: ALL

### POST http://localhost:3000/recipes
Creates a new recipe.

Access: ADMIN

### POST http://localhost:3000/recipes/{id}
Returns the recipe with user input (parameters).

Access: ALL



