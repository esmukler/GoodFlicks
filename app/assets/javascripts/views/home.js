GoodFlicks.Views.HomeView = Backbone.View.extend({

  initialize: function() {
    this.subViews = [];
    this.listenTo(this.collection, "sync", this.render)
  },

  template: JST['home'],

  events: {
    "click .add-library": "addLibrary"
  },

  addLibrary: function(event) {

    var addLib = new GoodFlicks.Views.LibForm
    $(event.currentTarget).html(addLib.render().$el);

    // TODO Make LibForm view and template, make sure it acutally creates

  },

  render: function() {
    var baseContent = this.template();

    this.$el.html(baseContent);

    var $libList = $('.library-list')
    this.collection.each( function(library) {
      var libItem = new GoodFlicks.Views.LibItem({
        model: library
      });
      this.subViews.push(libItem);
      $libList.append(libItem.render().$el)

    }.bind(this))


    return this;
  },

  remove: function() {
    this.subViews.forEach( function(view) {
      view.remove();
    });
    this.subViews = [];
    Backbone.View.prototype.remove.call(this);
  }
})
