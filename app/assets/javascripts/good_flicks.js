window.GoodFlicks = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var $rootEl = $("#content");
    var movies = new GoodFlicks.Collections.Movies()
    movies.fetch();

    var router = new GoodFlicks.Routers.Router({
      $rootEl: $rootEl,
      collection: movies
    });

    Backbone.history.start();
  }
};

$(document).ready(function(){
  GoodFlicks.initialize();
});
