GoodFlicks.Collections.Reviews = Backbone.Collection.extend({

  model: GoodFlicks.Models.Review,

  initialize: function(models, options) {
    if (options) {
      this.movie = options.movie;
      this.route = options.route;
    }
  },

  url: function() {
    if (this.route == "feed") {
      return "/api/reviews/feed";
    } else {
      return "/api/reviews"
    }
  },

  getOrFetch: function(id) {
    var review = this.get(id);

    if (!review) {
      var review = new GoodFlicks.Models.Review({ id : id });
      review.fetch({
        success: function() {
          this.add(review);
        }.bind(this)
      });
    } else {
      review.fetch();
    }
    return review;
  }
})
