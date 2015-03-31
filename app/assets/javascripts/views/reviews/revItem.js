GoodFlicks.Views.ReviewItem = Backbone.View.extend({

  template: JST['review_item'],

  className: "review-item group",

  tagName: "li",

  initialize: function(options) {
    this.movie = options.movie;
    this.listenTo(this.model, "sync change:num_stars", this.render)
    this.subViews = [];
  },

  events: {
    "mouseenter": "showOwnerButtons",
    "mouseleave": "showOwnerButtons",
    "click button.edit": "editReview",
    "click button.delete": "deleteReview"
  },

  showOwnerButtons: function() {
    if (this.model.get("user_id") === GoodFlicks.current_user_id) {
      this.$("button.edit").toggleClass("hidden");
      this.$("button.delete").toggleClass("hidden");
    }
  },

  userOrMovie: function() {
    var link = this.$('.user-or-movie a');
    if (this.model.get("mine")) {
      link.html("Written by: me");

    } else if (this.model.get("username")) {

      link.attr("href", "#/users/" + this.model.get("user_id"));
      link.html("Written by: " + this.model.escape("username"));

    } else {

      link.attr("href", "#/movies/" + this.model.get("movie_id"))
      link.html("Movie: " + this.model.get("movie_title"))
    }
  },

  renderStars: function() {
    var that = this;
    this.$('div.rev-stars').raty({
      score: function() {
        return that.model.get("num_stars")
      },
      readOnly: true,
      hints: ["hated it", "didn't like it", "it was ok", "liked it", "loved it"]
    })
  },

  editReview: function(event) {
    var revForm = new GoodFlicks.Views.ReviewForm({
      model: this.model,
      movie: this.movie
    });
    this.subViews.push(revForm);

    $('.modal').toggleClass("hidden")
    $('.modal-form').html(revForm.render().$el)
  },

  deleteReview: function(event) {
    if (confirm("Are you sure you want to delete this review?")) {
      this.model.destroy();
      Backbone.history.navigate("#/movies/" + this.model.get("movie_id"),
        { trigger: true } );
    }
  },

  render: function() {
    var content = this.template({ review: this.model })

    this.$el.html(content);
    this.userOrMovie();
    this.renderStars();
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
