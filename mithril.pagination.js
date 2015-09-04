/**
 * @file
 * mithril.pagination.js
 *
 * Simple pagination component with view callback.
 * @todo, provide limit condition
 */

var pagination = {};

/**
 * Pagination controller
 */
pagination.controller = function(options) {
  var options = options || {};

  this.pages = m.prop([]);
  this.range = m.prop([]);
  this.data = options.data || [];
  this.callback = options.callback || '';
  this.perPage = m.prop(options.perPage || 5);
  this.currentPage = m.prop(options.currentPage || 1);
  this.navigationText = m.prop(options.navigationText || ['Next', 'Previous']);
  this.navigation = m.prop(options.navigation !== null ? options.navigation : true);
  this.pagination = m.prop(options.pagination !== null ? options.pagination : false);

  this.data.then(function(projects) {
    this.lastPage = m.prop(Math.ceil(projects.length / this.perPage()));

    this.pages = function() {
      var current = this.currentPage() - 1;
      var perPage = this.perPage();

      return projects.slice(current * perPage, (current * perPage) + perPage);
    }.bind(this);

    this.range = function() {
      var page = 1;
      var start = 1;
      var end = this.data().length;
      var perPage = this.perPage();

      var range = [];
      while (perPage > 0 ? end >= start : end <= start) {
        range.push(page);
        start += perPage;
        page++;
      }

      return range;
    }

    this.nextPage = function(event) {
      event.preventDefault();
      var currentPage = this.currentPage();

      if (this.lastPage() != this.currentPage()) {
        currentPage++;
        this.currentPage(currentPage);
      }
    }.bind(this);

    this.prevPage = function(event) {
      event.preventDefault();
      var currentPage = this.currentPage();

      if (currentPage > 1) {
        currentPage--;
        this.currentPage(currentPage);
      }
    }.bind(this);

    this.goToPage = function(event) {
      event.preventDefault();

      var page = event.target.getAttribute('data-page');
      this.currentPage(page);
    }.bind(this);

  }.bind(this));
}

/**
 * Navigation view
 */
pagination.navigation = function(ctrl) {
  if (ctrl.navigation()) {
    return m('ul', {class: 'nav'}, [
      m('li', {class: 'next'}, [
        m('a', {href: '#', onclick: ctrl.nextPage}, ctrl.navigationText()[0])
      ]),
      m('li', {class: 'previous'}, [
        m('a', {href: '#', onclick: ctrl.prevPage}, ctrl.navigationText()[1])
      ])
    ]);
  }
}

/**
 * Pager view
 */
pagination.pager = function(ctrl) {
  if (ctrl.pagination()) {
    return m('ul', {class: 'pager'}, [
      ctrl.range().map(function(item) {
        return m('li', {class: 'pager-item item-' + item}, [
          m('a', {href: '#', onclick: ctrl.goToPage, 'data-page': item}, item)
        ]);
      })
    ]);
  }
}

/**
 * Pagination view
 */
pagination.view = function(ctrl) {
  return [
    pagination.navigation(ctrl),
    m('ul', {class: 'items'}, ctrl.pages().map(function(page) {
      return m('li', ctrl.callback(page));
    })),
    pagination.pager(ctrl)
  ]
}

module.exports = pagination;