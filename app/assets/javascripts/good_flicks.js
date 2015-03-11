window.GoodFlicks = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function(options) {
    var $rootEl = $("#content");

    var cuid = options.cuid;

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
