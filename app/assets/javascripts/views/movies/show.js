GoodFlicks.Views.MovieShow = Backbone.View.extend({

  template: JST['movie_show'],

  className: "movie-show group",

  initialize: function(options) {
    this.subViews = [];
    this.libs = options.libs;
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.reviews(), "add remove", this.render);
    this.listenTo(this.model.libraries(), "add remove", this.render);
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
    if (this.model.escape("title")) {
      this.renderCritics();
    }
  },

  renderCritics: function() {
    var title = this.model.escape("title");
    var year = this.model.get("year");
    var yearplusone = this.model.get("year") + 1;
    $.ajax({
      url: 'https://byroredux-metacritic.p.mashape.com/search/movie',
      type: 'POST',
      headers: {
        'X-Mashape-Key': '3WkDBcbCfBmshCiGHzGRcea5Fyopp1tuYtWjsnZaQs9WVXYrhT',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      data: {
        'max_pages': '1',
        'retry': '4',
        'title': title,
        'year_from': year,
        'year_to': yearplusone
      },
      success: function(data) {
        if (data.count > 0) {
          var result = data.results[0]
          this.$('.metacritic').removeClass("hidden");
          this.$('.metacritic-rating').html(result.score);
          this.$('.metacritic a').attr("href", result.url);
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
