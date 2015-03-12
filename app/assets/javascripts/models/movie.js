GoodFlicks.Models.Movie = Backbone.Model.extend({
  urlRoot: "/api/movies",

  parse: function(jsonResp) {
    // debugger
    if (jsonResp.reviews) {
      this.reviews().set(jsonResp.reviews, { parse: true })
      delete jsonResp.reviews
    }
    return jsonResp
  },

  reviews: function() {
    if (!this._reviews) {
      this._reviews = new GoodFlicks.Collections.Reviews([], {
        movie: this
      })
    }
    return this._reviews;
  }

})
