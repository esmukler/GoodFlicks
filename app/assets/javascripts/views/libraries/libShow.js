GoodFlicks.Views.LibraryShow = Backbone.View.extend({

  template: JST["library_show"],

  className: "library-show",

  tagName: "feature",

  initialize: function(options) {
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
    console.log(this.model.movies())
    if (this.model.movies().length !== 0) {
      this.model.movies().each( function(movie) {
        var movieItem = new GoodFlicks.Views.MovieListItem({
          model: movie
        })
        this.subViews.push(movieItem);
        this.$('ul.movie-list').append(movieItem.render().$el);
      }.bind(this))
    } else {
      console.log("no movies here")
      this.$('.lib-show.prompt').html("no movies here")
      // TODO
    }

  },

  renderReviews: function() {
    this.$revs.find('h3').html("Reviews for movies in " + this.model.escape("title"))
    this.$revs.find('.my-review-list').empty();

    this.model.reviews().each( function(review) {
      var revItem = new GoodFlicks.Views.ReviewItem({
        model: review
      });
      this.subViews.push(revItem);
      this.$revs.find('.my-review-list').append(revItem.render().$el);
    }.bind(this))
  },

  remove: function() {
    console.log("libshow render movies", this.model.movies())
    this.subViews.forEach( function(view) {
      view.remove();
    });
    this.subViews = [];
    Backbone.View.prototype.remove.call(this);
  }

})
