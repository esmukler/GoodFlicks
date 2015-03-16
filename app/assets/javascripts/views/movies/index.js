GoodFlicks.Views.MovieIndex = Backbone.View.extend({

  initialize: function() {
    this.subViews = [];

    this.listenTo(this.collection, "add sync remove", this.render)
  },

  template: JST["movie_index"],

  className: "movie-index",

  tagName: "section",

  renderHeader: function() {
    var header = new GoodFlicks.Views.Header()
    this.subViews.push(header)
    this.$('header.movie-index').html(header.render().$el)
  },

  renderMovies: function() {
    this.collection.each( function(movie) {
      var movieItem = new GoodFlicks.Views.MovieListItem({
        model: movie
      })
      this.subViews.push(movieItem);
      this.$('.movie-list').append(movieItem.render().$el)
    }.bind(this))
  },

  render: function() {

    var baseContent = this.template({ movies: this.collection })
    this.$el.html(baseContent);

    this.renderHeader();
    this.renderMovies();

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
