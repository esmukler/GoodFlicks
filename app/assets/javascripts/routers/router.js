GoodFlicks.Routers.Router = Backbone.Router.extend({

  initialize: function(options) {
    this.movies = options.movies;
    this.$rootEl = options.$rootEl;
    this.libs = options.libs;
    this.revs = options.revs;
  },

  routes: {
    "": "home",
    "movies" : "movieIndex",
    "movies/new" : "movieNew",
    "movies/:id" : "movieShow"
  },

  home: function() {
    this.libs.fetch();

    var homeView = new GoodFlicks.Views.HomeView({
      libraries: this.libs,
      reviews: this.revs
    })

    this._swapView(homeView);
  },

  movieIndex: function() {
    var movieIndex = new GoodFlicks.Views.MovieIndex({
      collection: this.movies
    });

    this._swapView(movieIndex)
  },

  movieShow: function(id) {
    var movie = this.movies.getOrFetch(id);

    var movieShow = new GoodFlicks.Views.MovieShow({
      model: movie
    });

    this._swapView(movieShow);
  },

  movieNew: function() {
    var movie = new GoodFlicks.Models.Movie();

    var movieForm = new GoodFlicks.Views.MovieForm({
      model: movie,
      collection: this.movies
    });

    this._swapView(movieForm);
  },


  _swapView: function(view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;
    this.$rootEl.html(view.render().$el);
  }


})
