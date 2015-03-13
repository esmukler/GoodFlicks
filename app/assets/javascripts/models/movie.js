GoodFlicks.Models.Movie = Backbone.Model.extend({
  urlRoot: "/api/movies",


  // toggle from lib??
  addToLibrary: function(libId) {
    $.ajax({
      url: "/api/library_movies",
      type: "POST",
      dataType: "json",
      data: {
        library_movie: {
          library_id: libId,
          movie_id: this.id
        }
      }, success: function(data) {
        console.log("successful post", data);
      }
    })
  },

  removeFromLibrary: function(libId) {
    $.ajax({
      url: "/api/library_movies",
      type: "POST",
      dataType: "json",
      data: {
        library_movie: {
          library_id: libId,
          movie_id: this.id
        }
      }, success: function(data) {
        console.log("removed post!", data);
      }
    })
  },

  parse: function(jsonResp) {
    if (jsonResp.reviews) {
      this.reviews().set(jsonResp.reviews, { parse: true })
      delete jsonResp.reviews
    }
    if (jsonResp.libraries) {
      this.libraries().set(jsonResp.libraries, { parse: true })
      delete jsonResp.libraries
    }
    return jsonResp
  },

  libraries: function() {
    if (!this._libraries) {
      this._libraries = new GoodFlicks.Collections.Libraries([], {
        movie: this
      })
    }
    return this._libraries;
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
