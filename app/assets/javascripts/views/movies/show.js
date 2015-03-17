GoodFlicks.Views.MovieShow = Backbone.View.extend({

  template: JST['movie_show'],

  className: "movie-show group",

  initialize: function(options) {
    this.subViews = [];
    this.libs = options.libs;
    this.listenTo(this.model, "sync change", this.render);
    this.listenTo(this.model.reviews(), "add remove", this.render);
    this.listenTo(this.model.libraries(), "add remove", this.render);
  },

  events: {
    "click .add-review": "addReview"
  },

  renderAttrs: function() {
    if (this.model.escape("director")) {
      this.$('.director').text("Director: " + this.model.escape("director"))
    }
    if (this.model.escape("description")) {
      this.$('.description').text(this.model.escape("description"))
    }
  },

  renderHeader: function() {
    var header = new GoodFlicks.Views.Header()
    this.subViews.push(header)
    this.$('header.movie-show').html(header.render().$el)
  },

  renderLibButtons: function() {
    var cuLibs = this.model.libraries();

    cuLibs.each( function(lib) {
      var libButton = new GoodFlicks.Views.LibButton({
        model: lib,
        movie: this.model
      })
      this.subViews.push(libButton);
      this.$('.lib-button-list').append(libButton.render().$el)
    }.bind(this))
  },

  addReview: function(event) {
    var newRev = new GoodFlicks.Models.Review()
    newRev.set("movie_id", this.model.id);
    newRev.set("user_id", GoodFlicks.current_user_id);

    var addRev = new GoodFlicks.Views.ReviewForm({
      model: newRev,
      collection: this.model.reviews()
    });

    this.subViews.push(addRev);
    $(event.currentTarget).parent().html(addRev.render().$el)
  },

  renderReviews: function() {
    if (this.model.reviews()) {
      this.model.reviews().each( function(review) {
        if (review.get("is_public")) {

          var revItem = new GoodFlicks.Views.ReviewItem({
            model: review
          });
          this.subViews.push(revItem);
          this.$('.reviews-list').append(revItem.render().$el);
        }
      }.bind(this))
    }
  },

  render: function() {
    var baseContent = this.template({ movie: this.model })
    this.$el.html(baseContent);

    this.renderHeader();
    this.renderAttrs();
    this.renderLibButtons();
    this.renderReviews();

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
