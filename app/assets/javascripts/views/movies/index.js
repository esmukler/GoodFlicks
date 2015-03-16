GoodFlicks.Views.MovieIndex = Backbone.View.extend({

  initialize: function() {
    this.subViews = [];

    this.listenTo(this.collection, "add sync remove", this.render)
  },

  template: JST["movie_index"],

  className: "movie-index",

  tagName: "section",

  render: function() {
    var movies = this.collection;

    var baseContent = this.template({ movies: movies })
    this.$el.html(baseContent);

    var $movieList = this.$el.find('.movie-list')
    movies.each( function(movie) {
      var movieItem = new GoodFlicks.Views.MovieListItem({
        model: movie
      })
      this.subViews.push(movieItem);
      this.$('.movie-list').append(movieItem.render().$el)
    }.bind(this))

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
