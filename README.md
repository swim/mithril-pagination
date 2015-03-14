# mithril.pagination
Provides a simple Mithril pagination component.

# Usage
```javascript
var data = function(data) {
  this.id = m.prop(data.id);
  this.title = m.prop(data.title);
};

app.load = function() {
  return m.request({method: 'GET', url: 'data.json', type: data, background: true, initialValue: []});
};

app.controller = function() {
  this.data = app.load()
  this.pagination = new pagination.controller({
    data: this.data,
    callback: app.myView,
    perPage: 1,
    currentPage: 1,
    navigation: true,
    pagination: false
  })
};

app.myView = function(ctrl) {
  // Theme data results.
};

app.view = function(ctrl) {
  // Render pager.
  return pagination.view(ctrl.pagination);
};
```

# Options
| Option        | Type           |
| ------------- |:-------------:|
| Data          | Array/Promise |
| Callback      | Function      |
| perPage       | Int           |
| currentPage   | Int           |
| navigationText| Array         |
| navigation    | Boolean       |
| pagination    | Boolean       |
