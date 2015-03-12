GoodFlicks.Views.MovieShow = Backbone.View.extend({

  template: JST['movie_show'],

  className: "movie-show",

  initialize: function() {
    this.subViews = [];
    this.listenTo(this.model, "sync", this.render)
  },

  render: function() {
    var baseContent = this.template({ movie: this.model })
    this.$el.html(baseContent);

    if (this.model.reviews()) {
      this.model.reviews().each( function(review) {
        var revItem = new GoodFlicks.Views.ReviewItem({
          model: review
        });
        this.subViews.push(revItem);
        this.$('.reviews-list').append(revItem.render().$el);
      }.bind(this))
    }

    return this
  },

  remove: function() {
    this.subViews.forEach( function(view) {
      view.remove();
    })
    this.subViews = []
    Backbone.View.prototype.remove.call(this);
  }

})
