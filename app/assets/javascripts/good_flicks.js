window.GoodFlicks = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var $rootEl = $("#content");

    var movies = new GoodFlicks.Collections.Movies()
    movies.fetch();

    var cuLibraries = new GoodFlicks.Collections.Libraries(); //{ user_id: cuid });
    cuLibraries.fetch();

    var router = new GoodFlicks.Routers.Router({
      $rootEl: $rootEl,
      movies: movies,
      libs: cuLibraries
    });

    Backbone.history.start();
  }
};
