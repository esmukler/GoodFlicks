GoodFlicks.Collections.Movies = Backbone.Collection.extend({
  url: "/api/movies",

  comparator: "updated_at",

  model: GoodFlicks.Models.Movie,

  getOrFetch: function(id) {
    var movie = this.get(id);

    if (!movie) {
      var movie = new GoodFlicks.Models.Movie({ id : id });
      movie.fetch({
        success: function() {
          this.add(movie);
        }.bind(this)
      });
    } else {
      movie.fetch();
    }
    return movie;
  }
})
