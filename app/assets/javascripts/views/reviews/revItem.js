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
    "click img": "goToMovie",
    "mouseenter": "showOwnerButtons",
    "mouseleave": "showOwnerButtons",
    "click button.edit": "editReview",
    "click button.delete": "deleteReview"
  },

  goToMovie: function() {
    Backbone.history.navigate("#/movies/" + this.model.get("movie_id"),
      { trigger: true } );
  },

  showOwnerButtons: function() {
    if (this.model.get("user_id") === GoodFlicks.current_user_id) {
      this.$("button.edit").toggleClass("hidden");
      this.$("button.delete").toggleClass("hidden");
    }
  },

  userOrMovie: function() {
    var author = this.$('.author a');
    var movie = this.$('.movie a');
    if (this.model.get("mine")) {
      author.html("Written by: me");
    } else if (this.model.get("username")) {
      author.attr("href", "#/users/" + this.model.get("user_id"));
      author.html("Written by: " + this.model.escape("username"));
    }
    if (this.model.get("movie_title")){
      movie.attr("href", "#/movies/" + this.model.get("movie_id"))
      movie.html("Movie: " + this.model.get("movie_title"))
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
      this.goToMovie();
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
