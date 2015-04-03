GoodFlicks.Views.LibraryShow = Backbone.View.extend({

  template: JST["library_show"],

  className: "library-show",

  tagName: "feature",

  initialize: function(options) {
    if (this.model.id === 0) {
      this.libAll = true;
    }
    this.subViews = [];
    this.$revs = options.$revs;
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.movies(), "add sync remove", this.render)
    this.listenTo(this.model.reviews(), "add remove", this.render)
  },

  render: function() {
    var content = this.template({
      library: this.model
    })
    this.$el.html(content)

    this.renderMovies();
    this.renderReviews();

    return this;
  },

  renderMovies: function() {
    if (this.model.movies().length !== 0) {
      this.model.movies().each( function(movie) {
        var movieItem = new GoodFlicks.Views.MovieListItem({
          model: movie
        })
        this.subViews.push(movieItem);
        this.$('ul.movie-list').append(movieItem.render().$el);
      }.bind(this))
    } else {
      this.$('.movie-list').html("No movies here. Yet...")
      // TODO Recommend a movie to them!
    }

  },

  renderReviews: function() {
    if (this.libAll) {
      this.$revs.find('h3').html("Recent Reviews:")
    } else {
      this.$revs.find('h3').html("My reviews for movies in " + this.model.escape("title"))
    }

    this.$revs.find('.my-review-list').empty();
    if (this.model.reviews().length === 0) {
      this.$revs.find('.my-review-list').html("<div>No reviews yet.<div>")
    }
    this.model.reviews().each( function(review) {
      var revItem = new GoodFlicks.Views.ReviewItem({
        model: review
      });
      this.subViews.push(revItem);
      this.$revs.find('.my-review-list').append(revItem.render().$el);
    }.bind(this))
  },

  remove: function() {
    this.subViews.forEach( function(view) {
      view.remove();
    });
    this.subViews = [];
    Backbone.View.prototype.remove.call(this);
  }

})
