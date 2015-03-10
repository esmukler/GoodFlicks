GoodFlicks.Routers.Router = Backbone.Router.extend({

  initialize: function(options) {
    this.collection = options.collection;
    this.$rootEl = options.$rootEl;
  },

  routes: {
    "": "home",
    "movies" : "movieIndex",
    "movies/new" : "movieNew",
    "movies/:id" : "movieShow"
  },

  home: function() {
    console.log("home")
    // var homeView = new GoodFlicks.Views.HomeView()


    // this._swapView(homeView);
  },

  movieShow: function(id) {
    var movie = this.collection.getOrFetch(id);

    var movieShow = new GoodFlicks.Views.MovieShow({
      model: movie
    });

    this._swapView(movieShow);
  },

  movieNew: function() {
    var movie = new GoodFlicks.Models.Movie();
// this.collection.getOrFetch();
    var movieForm = new GoodFlicks.Views.MovieForm({
      model: movie,
      collection: movies
    });

    this._swapView(movieForm);
  },


  _swapView: function(view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;
    this.$rootEl.html(view.render().$el);
  }


})
