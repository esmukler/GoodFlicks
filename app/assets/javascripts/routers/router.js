GoodFlicks.Routers.Router = Backbone.Router.extend({

  initialize: function(options) {
    this.movies = options.movies;
    this.$rootEl = options.$rootEl;
    this.libs = options.libs;
    this.revs = options.revs;
  },

  routes: {
    "": "home",
    "users/:id": "userShow",
    "movies" : "movieIndex",
    "movies/new" : "movieNew",
    "movies/:id" : "movieShow",
    "libraries/:lib_id": "home",
    "search": "search",
    "search/:query" : "search"
  },

  userShow: function(id) {
    var users = new GoodFlicks.Collections.Users()
    var user = users.getOrFetch(id)

    var userShow = new GoodFlicks.Views.UserShow({
      model: user
    })

    this._swapView(userShow);
  },

  search: function(query) {
    var search = new GoodFlicks.Views.Search({
      query: query
    })
    this._swapView(search);
  },

  home: function(libId) {
    this.libs.fetch();
    this.revs.fetch();
    var homeView = new GoodFlicks.Views.HomeView({
      libraries: this.libs,
      reviews: this.revs,
      libId: libId
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
    this.libs.fetch();
    var movie = this.movies.getOrFetch(id);

    var movieShow = new GoodFlicks.Views.MovieShow({
      model: movie,
      libs: this.libs
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
