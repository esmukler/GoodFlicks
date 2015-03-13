GoodFlicks.Models.Library = Backbone.Model.extend({
  urlRoot: "/api/libraries",

  parse: function(jsonResp) {
    if (jsonResp.movies) {
      this.movies().set(jsonResp.movies, { parse: true })
      delete jsonResp.movies
    }
    return jsonResp
  },

  movies: function() {
    if (!this._movies) {
      this._movies = new GoodFlicks.Collections.Movies()
    }
    return this._movies;
  },

})
