window.GoodFlicks = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var $rootEl = $("#content");

    var movies = new GoodFlicks.Collections.Movies()
    movies.fetch();

    var cuLibraries = new GoodFlicks.Collections.Libraries();
    cuLibraries.fetch();

    var cuReviews = new GoodFlicks.Collections.Reviews();
    cuReviews.fetch();

    var cuFollowings = new GoodFlicks.Collections.Users()
    cuFollowings.fetch();

    var router = new GoodFlicks.Routers.Router({
      $rootEl: $rootEl,
      movies: movies,
      libs: cuLibraries,
      revs: cuReviews,
      followings: cuFollowings
    });

    Backbone.history.start();
  }
};

$(document).ready(function(){
  GoodFlicks.initialize();
});
