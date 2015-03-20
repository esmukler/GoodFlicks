GoodFlicks.Views.Search = Backbone.View.extend({
  initialize: function(options) {
    this.userResults = new GoodFlicks.Collections.SearchResults();
    this.listenTo(this.userResults, "sync", this.render);

    this.apiResults = [];
    this.collection = new GoodFlicks.Collections.Movies()
    this.collection.fetch();
    this.listenTo(this.collection, "sync", this.render)

    if (options.query) {
      this.searchAPI(options.query);
      this.userSearch(options.query);
    }

    this.subViews = [];
    this.render();
  },

  events: {
    "change .query": "insideSearch",
  },

  template: JST["search"],

  renderAPIResults: function() {
    this.apiResults.forEach( function(result) {
      var resultView = new GoodFlicks.Views.ResultItem({
        result: result
      })
      this.subViews.push(resultView)
      this.$('ul.movie-results').append(resultView.render().$el)
    }.bind(this))
  },

  renderUserResults: function() {
    if (this.userResults.length === 0 && this.userResults.query) {
      this.$('.empty-user-msg').html("Sorry we couldn't find that username. Please try again.")
    } else {
      this.userResults.each( function(user) {
        var userResult = new GoodFlicks.Views.UserResult({
          model: user
        })
        this.subViews.push(userResult)
        this.$('ul.user-results').append(userResult.render().$el)
      }.bind(this))
    }
  },

  render: function() {
    this.$el.html(this.template());

    if (this.apiResults) {
      this.renderAPIResults();
    }
    this.renderUserResults();

    return this;
  },

  insideSearch: function(event) {
    event.preventDefault();
    var query = this.$(".query").val();
    this.searchAPI(query);
    this.userSearch(query);
  },

  userSearch: function(query) {
    this.userResults.query = query;
    this.userResults.fetch({
      data: {
        query: this.userResults.query
      }
    })
  },

  searchAPI: function(query) {
    var that = this;
    $.ajax({
      url: "http://api.themoviedb.org/3/search/movie?api_key=a1d5f291d84e71e51b248b86ec9c9e2a&query=" + query,
      type: "GET",
      success: function(data) {
        if (data.results.length === 0) {
          that.$('.empty-movie-msg').html("Sorry we couldn't find that title. Please try again.")
        } else {
          that.apiResults = data.results;
          that.render();
        }
      }
    })
  },

  remove: function() {
    this.subViews.forEach( function(view) {
      view.remove();
    })
    this.subViews = []
    Backbone.View.prototype.remove.call(this);
  }

})
