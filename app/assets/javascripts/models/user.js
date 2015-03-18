GoodFlicks.Models.User = Backbone.Model.extend({
  urlRoot: "/api/users",

  parse: function(jsonResp) {
    if (jsonResp.libraries) {
      this.libraries().set(jsonResp.libraries, { parse: true })
      delete jsonResp.libraries
    }
    if (jsonResp.reviews) {
      this.reviews().set(jsonResp.reviews, { parse: true })
      delete jsonResp.reviews
    }

    return jsonResp
  },

  libraries: function() {
    if (!this._libraries) {
      this._libraries = new GoodFlicks.Collections.Libraries()
    }
    return this._libraries;
  },

  reviews: function() {
    if (!this._reviews) {
      this._reviews = new GoodFlicks.Collections.Reviews()
    }
    return this._reviews;
  }

})
