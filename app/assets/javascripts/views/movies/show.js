GoodFlicks.Views.MovieShow = Backbone.View.extend({

  template: JST['movie_show'],

  className: "movie-show group",

  initialize: function() {
    this.subViews = [];
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.reviews(), "sync", this.render);
    this.listenTo(this.model.libraries(), "sync remove", this.renderCurrentLibs);
  },

  events: {
    "click .add-review": "addReview"
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

  renderLibAddForm: function() {
    if (this.model.get("unadded_libraries")) {
      console.log(this.model.get("unadded_libraries"))
      var libAdd = new GoodFlicks.Views.LibMovieForm({
        model: this.model
      })
      this.$('feature.lib-add').html(libAdd.render().$el);
      this.subViews.push(libAdd);
    }
  },


  renderCurrentLibs: function() {
    if (this.model.libraries()) {
      this.model.libraries().each( function(lib) {
        var movieLibItem = new GoodFlicks.Views.MovieLibItem({
          movie: this.model,
          model: lib
        })
        this.$('.current-libs > ul').append(movieLibItem.render().$el);
        this.subViews.push(movieLibItem);
      }.bind(this))
    }
  },

  render: function() {
    var baseContent = this.template({ movie: this.model })
    this.$el.html(baseContent);

    this.renderLibAddForm();
    this.renderReviews();
    this.renderCurrentLibs();


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
