GoodFlicks.Views.ResultItem = Backbone.View.extend({

  initialize: function(options) {
    this.parentView = options.parentView;
    this.result = options.result;
    this.result.year = parseInt(this.result.release_date.slice(0,4));
  },

  tagName: "li",

  className: "result",

  template: JST['result'],

  events: {
    "click": "getInfo",
  },

  getInfo: function(event) {
    event.preventDefault();
    if (!this.parentView.busy) {
      this.parentView.busy = true;
      $(event.currentTarget).addClass("clicked");
      this.$('.message').html("Just a second. Let me get that for you...  ");
      this.$('.message').append("<img src='/images/ajax-loader.gif'>")

      $.ajax({
        url: "https://api.themoviedb.org/3/movie/" + this.result.id + "?api_key=a1d5f291d84e71e51b248b86ec9c9e2a&append_to_response=credits",
        type: "GET",
        success: function(data) {
          this.makeOrGet(data)
        }.bind(this)
      })
    }
  },

  makeOrGet: function(fullResult) {
    var movie = {};
    movie.title = fullResult.title;
    movie.year = parseInt(fullResult.release_date.slice(0,4));
    movie.description = fullResult.overview;
    movie.tagline = fullResult.tagline;
    movie.budget = fullResult.budget;
    movie.revenue = fullResult.revenue;
    movie.runtime = fullResult.runtime;

    var directors = [];
    var writers = [];

    fullResult.credits.crew.forEach( function(person) {
      if (person.job === "Director") {
        if (directors.indexOf(person.name) === -1) {
          directors.push(person.name);
        }
      }

      if (person.department === "Writing") {
        if (writers.indexOf(person.name) === -1) {
          writers.push(person.name);
        }
      }
    })
    movie.director = directors.join(",")
    movie.writer = writers.join(",")

    var cast = fullResult.credits.cast;
    for (var i = 0; i<= 2; i++) {
      if (cast[i]) {
        movie["cast" + (i + 1) + "_actor"] = cast[i].name
        if (cast[i].character) {
          movie["cast" + (i + 1) + "_character"] = cast[i].character
        }
      }
    }

    if (fullResult.poster_path) {
      movie.poster = "http://image.tmdb.org/t/p/w500" + fullResult.poster_path
    } else {
      movie.poster = null
    }
    $.ajax({
      url: "/api/movies",
      type: "POST",
      data: { movie: movie },
      success: function(data) {
        Backbone.history.navigate("#movies/" + data.id, { trigger: true })
      }
    })
  },

  render: function() {
    this.$el.html(this.template({
      result: this.result
    }))

    return this;
  }

})
