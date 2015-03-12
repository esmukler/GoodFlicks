GoodFlicks.Collections.Reviews = Backbone.Collection.extend({
  url: "/api/reviews",

  comparator: "updated_at",

  model: GoodFlicks.Models.Review,

  initialize: function(models, options) {
    this.movie = options.movie;
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
