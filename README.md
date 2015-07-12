# Ember-cli-iagen

>  generate models, routes and templates 

## Installation

In your ember-cli app, do `npm install --save-dev ember-cli-iagen`

## Running

```sh
ember generate iagen post title:string body:string
ember s
open http://localhost:4200/posts
```

The generated files are the following:

- app/adapters/post.js
- app/mixins/posts/save-model-mixin.js
- app/routes/posts/edit.js
- app/routes/posts/index.js
- app/routes/posts/new.js
- app/templates/posts/-form.hbs
- app/templates/posts/edit.hbs
- app/templates/posts/index.hbs
- app/templates/posts/new.hbs
- app/templates/posts/show.hbs
- tests/acceptance/posts-test.js
- app/models/post.js

They contain all the CRUD

