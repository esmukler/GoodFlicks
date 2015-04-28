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

  renderPeople: function() {
    var directors = this.model.escape("director")
    var writers = this.model.get("writer")
    var cast = this.model.get("cast")

    this.renderMultPeople("Director", directors)
    this.renderMultPeople("Writer", writers)

    if (cast) {
      for (var i = 0; i < cast.length; i++) {
        if (cast[i]) {
          var role = cast[i][0] + " as " + cast[i][1];
          this.$(".cast").append("<li>" + role + "</li>");
        }
      }
    }

  },

  renderMultPeople: function(jobName, people) {
    if (people) {
      people = people.split(",")
      if (people.length === 1) {
        var text = people[0];
      } else if (people.length == 2) {
        var text = people[0] + " and " + people[1];
      } else {
        var text = people[0];
        for (var i = 1; i < people.length - 1; i++) {
          text += ", " + people[i]
        }
        text += ", and " + people[people.length - 1]
      }
      this.$('.' + jobName.toLowerCase()).html(jobName + ": " + text)
    }
  },

  renderAttrs: function() {
    var description = this.model.escape("description");
    var tagline = this.model.get("tagline");
    var runtime = this.model.get("runtime");
    var budget = this.model.get("budget");
    var revenue = this.model.get("revenue");


    if (description) {
      this.$('.description').html(description);
    }
    if (tagline) {
      this.$('.tagline').html("\"" + tagline + "\"");
    }
    if (runtime) {
      this.$('.runtime').html(runtime + " minutes")
    }
    if (budget) {
      this.$('.budget').html("Budget: " + this.renderMoney(budget));
    }
    if (revenue) {
      this.$('.revenue').html("Revenue: " + this.renderMoney(revenue));
    }
  },

  renderMoney: function(num) {
    num = num.toString();
    if (num.length > 3) {
      var arr = [];
      while (num.length > 0) {
        arr.unshift(num.slice(-3))
        num = num.slice(0, -3)
      }
      num = arr.join(",")
    }
    return "$" + num
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
      this.$('.avg-rating').html("Avg. GoodFlicks rating:")
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
    this.$('.metacritic-rating').html(this.metacritic.rating);
    this.$('.metacritic a').attr("href", this.metacritic.url);
    this.$('.metacritic').removeClass("hidden");
  },

  renderImdb: function() {
    this.$('.imdb-rating').html(this.imdb.rating);
    this.$('.imdb a').attr("href", this.imdb.url);
    this.$('.imdb').removeClass("hidden");
  },

  fetchCritics: function() {
    this.imdb = "none";
    this.metacritic = "none";
    $.ajax({
      url: "api/movies/" + this.model.id + "/critics",
      type: 'GET',
      success: function(data) {
        if (data.metacritic.rating !== "none") {
          this.metacritic = data.metacritic
          this.renderMetacritic();
        }

        if (data.imdb.rating !== "none") {
          this.imdb = data.imdb
          this.renderImdb();
        }
      }.bind(this),
    })
  },

  render: function() {
    var baseContent = this.template({ movie: this.model })
    this.$el.html(baseContent);

    this.renderHeader();
    this.renderPeople();
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
