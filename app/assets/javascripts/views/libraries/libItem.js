GoodFlicks.Views.LibItem = Backbone.View.extend({

  template: JST['library_item'],

  className: "library-item",

  tagName: "li",

  initialize: function(options) {
    this.$show = options.$show;
    this.listenTo(this.model, "sync", this.render);
    this.subViews = [];
  },

  events: {
    "click button.edit": "editLibrary",
    "click button.delete": "deleteLibrary",
    "click .lib-title" : "showLibrary"
  },

  showLibrary: function(event) {
    this.$show.empty();
    this.model.movies().each( function(movie) {
      var movieItem = new GoodFlicks.Views.MovieListItem({
        model: movie
      })
      this.subViews.push(movieItem);

      this.$show.append(movieItem.render().$el);
    }.bind(this));

  },

  editLibrary: function(event) {
    var libForm = new GoodFlicks.Views.LibForm({ model: this.model })
    this.subViews.push(libForm);

    this.$el.html(libForm.render().$el)
  },

  deleteLibrary: function(event) {
    if (confirm("Are you sure you want to delete the whole library '" +
                    this.model.escape("title") + "'?")) {
      this.model.destroy();
      Backbone.history.navigate("", {trigger: true});
    }
  },

  render: function() {
    var content = this.template({ library: this.model })

    this.$el.html(content);
    return this
  },

  remove: function() {
    this.subViews.forEach( function(view) {
      view.remove();
    })
    this.subViews = []
    Backbone.View.prototype.remove.call(this);
  }

})
