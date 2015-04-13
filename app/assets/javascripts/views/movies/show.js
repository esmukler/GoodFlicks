GoodFlicks.Views.MovieShow = Backbone.View.extend({

  template: JST['movie_show'],

  className: "movie-show group",

  initialize: function(options) {
    this.subViews = [];
    this.libs = options.libs;
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.reviews(), "add remove", this.render);
    this.listenTo(this.model.libraries(), "add remove", this.render);
    this.metacritic = null;
    this.imdb = null;
  },

  events: {
    "click .add-review": "addReview"
  },

  renderAttrs: function() {
    if (this.model.escape("director")) {
      this.$('.director').html("Director: " + this.model.escape("director"))
    }
    if (this.model.escape("description")) {
      this.$('.description').html(this.model.escape("description"))
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
      collection: this.model.reviews(),
      movie: this.model
    });

    this.subViews.push(addRev);
    $('.modal').toggleClass("hidden")
    $('.modal-form').html(addRev.render().$el)
  },

  renderReviews: function(newStarRating) {
    if (this.model.reviews()) {
      this.$('.reviews-list').empty();
      this.model.reviews().each( function(review) {
        if (newStarRating && review.get("mine")) {
          review.set("num_stars", newStarRating);
          review.save();
        }

        if (review.get("is_public")) {

          var revItem = new GoodFlicks.Views.ReviewItem({
            model: review,
            movie: this.model
          });
          this.subViews.push(revItem);
          this.$('.reviews-list').append(revItem.render().$el);
        }
      }.bind(this))
    }
  },

  renderStars: function() {
    var that = this;
    if (this.model.get("cu_rating")) {
      this.$('div.stars').raty({
        score: function() {
          return that.model.get("cu_rating")
        },
        click: function(score, event) {
          that.renderReviews(score);
        },
        hints: ["hated it", "didn't like it", "it was ok", "liked it", "loved it"]
      })
      this.$('.your-rating').html("Your Rating:")
    }
    if (this.model.get("avg_rating")) {
      this.$('div.avg-stars').raty({
        score: function() {
          return that.model.get("avg_rating")
        },
        readOnly: true,
      })
      this.$('.avg-rating').html("Average Rating:")
    }
    if (this.metacritic && this.metacritic !== "none") {
      this.renderMetacritic();
    }
    if (this.imdb && this.imdb !== "none") {
      this.renderImdb();
    }

    if (this.model.escape("title") && !this.metacritic && !this.imdb) {
      this.fetchCritics();
    }
  },

  renderMetacritic: function() {
    this.$('.metacritic-rating').html(this.metacritic.score);
    this.$('.metacritic a').attr("href", this.metacritic.url);
    this.$('.metacritic').removeClass("hidden");
  },

  renderImdb: function() {
    this.$('.imdb-rating').html(this.imdb.imdbRating);
    this.$('.imdb a').attr(
      "href", "http://imdb.com/title/" + this.imdb.imdbID
      );
    this.$('.imdb').removeClass("hidden");
  },

  fetchCritics: function() {
    var title = this.model.get("title");

    $.ajax({
      url: "api/movies/" + this.model.id + "/metacritic",
      type: 'GET',
      success: function(data) {
        if (data.metacritic.body.result) {
          this.metacritic = data.metacritic.body.result;
          this.renderMetacritic();
        } else {
          this.metacritic = "none";
        }
        if (data.imdb.body.Response === "True") {
          this.imdb = data.imdb.body
          this.renderImdb();
        } else {
          this.imdb = "none";
        }
      }.bind(this)
    })
  },

  render: function() {
    var baseContent = this.template({ movie: this.model })
    this.$el.html(baseContent);

    this.renderHeader();
    this.renderAttrs();
    this.renderLibButtons();
    this.renderReviews();
    this.renderStars();
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
