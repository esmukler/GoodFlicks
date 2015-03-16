GoodFlicks.Views.LibraryShow = Backbone.View.extend({

  template: JST["library_show"],

  className: "library-show",

  tagName: "feature",

  initialize: function() {
    this.subViews = [];

    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.movies(), "add remove", this.render)
  },

  events: {

  },

  render: function() {
    var content = this.template({
      library: this.model
    })
    this.$el.html(content)

    this.model.movies().each( function(movie) {
      var movieItem = new GoodFlicks.Views.MovieListItem({
        model: movie
      })
      this.subViews.push(movieItem);
      this.$('ul.movie-list').append(movieItem.render().$el);
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
