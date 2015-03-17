GoodFlicks.Models.Library = Backbone.Model.extend({
  urlRoot: "/api/libraries",

  parse: function(jsonResp) {
    if (jsonResp.movies) {
      this.movies().set(jsonResp.movies, { parse: true })
      delete jsonResp.movies
    }
    if (jsonResp.reviews) {
      this.reviews().set(jsonResp.reviews, { parse: true })
      delete jsonResp.reviews
    }
    return jsonResp
  },

  movies: function() {
    if (!this._movies) {
      this._movies = new GoodFlicks.Collections.Movies()
    }
    return this._movies;
  },

  reviews: function() {
    if (!this._reviews) {
      this._reviews = new GoodFlicks.Collections.Reviews()
    }
    return this._reviews;
  },

})
