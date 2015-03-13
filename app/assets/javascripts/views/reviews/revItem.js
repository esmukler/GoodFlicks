GoodFlicks.Views.ReviewItem = Backbone.View.extend({

  template: JST['review_item'],

  className: "review-item",

  tagName: "li",

  initialize: function() {
    this.listenTo(this.model, "sync", this.render)
    this.subViews = [];
  },

  showOwnerButtons: function() {
    if (this.model.get("user_id") === GoodFlicks.current_user_id) {
      this.$("button").toggleClass("hidden");
    }
  },

  userOrMovie: function() {
    // console.log(this.model.get("username"))
    // console.log(this.model.get("movie_title"))
    if (this.model.get("username")) {
      this.$('.userOrMovie').text("Written by: " + this.model.get("username"));
    } else {
      this.$('.userOrMovie').text("Movie: " + this.model.get("movie_title"));
    }
  },

  events: {
    "click button.edit": "editReview",
    "click button.delete": "deleteReview"
  },

  editReview: function(event) {
    var revForm = new GoodFlicks.Views.ReviewForm({
      model: this.model
    });
    this.subViews.push(revForm);

    this.$el.html(revForm.render().$el);
  },

  deleteReview: function(event) {
    if (confirm("Are you sure you want to delete this review?")) {
      this.model.destroy();
      Backbone.history.navigate("#/movies/" + this.model.get("movie_id"),
        { trigger: true } );
    }
  },

  render: function() {
    // debugger
    var content = this.template({ review: this.model })

    this.$el.html(content);
    this.showOwnerButtons();
    this.userOrMovie();
    return this
  },

  remove: function() {
    if (this.subViews) {
      this.subViews.forEach( function(view) {
        view.remove();
      })
      this.subViews = []
    }
    Backbone.View.prototype.remove.call(this);
  }

})