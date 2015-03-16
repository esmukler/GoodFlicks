GoodFlicks.Views.Search = Backbone.View.extend({
  initialize: function(options) {
    // this.searchResults = new GoodFlicks.Collections.SearchResults();
    // this.listenTo(this.searchResults, "sync", this.render);
    if (options.query) {
      this.searchAPI(options.query);
    }
    this.apiResults = [];
    this.collection = new GoodFlicks.Collections.Movies()
    this.collection.fetch();
  },

  events: {
    "change .query": "insideSearch",
    "click li.result": "getInfo"
  },

  template: JST["search"],

  render: function() {

    var content = this.template({
      results: this.apiResults
    })

    this.$el.html(content);

    return this;
  },

  insideSearch: function(event) {
    event.preventDefault();
    var query = this.$(".query").val();
    this.searchAPI(query);
  },

  searchAPI: function(query) {
    var that = this;
    $.ajax({
      url: "http://api.themoviedb.org/3/search/movie?api_key=" + ENV['MOVIE_DB_API'] + "&query=" + query,
      type: "GET",
      success: function(data) {
        that.apiResults = data.results;
        that.render();
      }
    })
  },

  getInfo: function(event) {
    event.preventDefault();
    var dbId = this.$(event.currentTarget).data("movie-db-id")

    $.ajax({
      url: "https://api.themoviedb.org/3/movie/" + dbId + "?api_key=" + ENV['MOVIE_DB_API'] + "&append_to_response=credits",
      type: "GET",
      success: function(data) {
        this.makeMovieModel(data)
      }.bind(this)
    })
  },

  makeMovieModel: function(results) {
    var attrs = {}

    attrs.title = results.title
    attrs.year = parseInt(results.release_date.slice(0, 4))
    var crew = results.credits.crew
    crew.forEach( function(person) {
      if (person.job === "Director") {
        attrs.director = person.name
      }
    })
    // attrs.poster = results.poster_path
    attrs.description = results.overview

    var movie = new GoodFlicks.Models.Movie()
    movie.save(attrs, {
      success: function() {
        this.collection.add(movie);
        Backbone.history.navigate("#/movies/" + movie.id, {trigger: true})
      }.bind(this)
    })
  },

  // search: function(event) {
  //   event.preventDefault();
  //
  //   this.searchResults.query = this.$(".query").val();
  //   this.searchResults.fetch({
  //     data: {
  //       query: this.searchResults.query
  //     }
  //   })
  // },

})
