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
    var crew = fullResult.credits.crew
    crew.forEach( function(person) {
      if (person.job === "Director") {
        fullResult.director = person.name
      }
    })
    if (fullResult.poster_path) {
      fullResult.poster = "http://image.tmdb.org/t/p/w500" + fullResult.poster_path
    } else {
      fullResult.poster = null
    }

    $.ajax({
      url: "/api/movies",
      type: "POST",
      data: {
        movie: {
          title: fullResult.title,
          year: parseInt(fullResult.release_date.slice(0,4)),
          description: fullResult.overview,
          director: fullResult.director,
          poster: fullResult.poster
        }
      },
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
