GoodFlicks.Views.Search = Backbone.View.extend({
  initialize: function(options) {
    this.userResults = new GoodFlicks.Collections.SearchResults();
    this.listenTo(this.userResults, "sync", this.render);

    this.apiResults = [];
    this.collection = new GoodFlicks.Collections.Movies()
    this.collection.fetch();
    this.listenTo(this.collection, "sync", this.render)

// if a search is requested from another page on the site:
    this.currentQuery = "";
    if (options.model && options.model === "movies") {
      this.searchAPI(options.query);
      this.currentQuery = options.query
    } else if (options.model && options.model === "users") {
      this.userSearch(options.query);
      this.currentQuery = options.query
    }
    this.busy = false;
    this.subViews = [];
    this.render();
  },

  template: JST["search"],

  events: {
    "submit .search-form": "insideSearch",
    "click .results-list": "showClick"
  },

  insideSearch: function(event) {
    event.preventDefault();
    var formData = this.$(".search-form").serializeJSON();

    if (formData.search.query === "") {
      formData.search.query = "users_index";
    }

    this.currentQuery = formData.search.query;

    if (formData.search.model === "movies") {
      this.userResults.query = null;
      this.searchAPI(formData.search.query);
    } else {
      this.apiResults = [];
      this.userSearch(formData.search.query);
    }
  },

  searchAPI: function(query) {
    var that = this;
    $.ajax({
      url: "http://api.themoviedb.org/3/search/movie?api_key=a1d5f291d84e71e51b248b86ec9c9e2a&query=" + query,
      type: "GET",
      success: function(data) {
        if (data.results.length === 0) {
          that.apiResults = "noResults";
        } else {
          that.apiResults = data.results;
        }
        that.render();
      }
    })
  },

  renderEmptyAPI: function() {
    this.apiResults = [];
    this.$(".results-title").html("Movies that matched '" + this.currentQuery + "'");
    this.$('.empty-msg').html("Sorry we couldn't find that title. Please try again.");
    this.$(".results-list").empty();
  },

  userSearch: function(query) {
    this.userResults.query = query;
    this.userResults.fetch({
      data: {
        query: this.userResults.query
      }
    })
  },

  renderAPIResults: function() {
    var view = this;
    view.$(".results-title").html("Movies that matched '" + view.currentQuery + "'");
    view.apiResults.forEach( function(result) {
      if (!!result.release_date) {
        var resultView = new GoodFlicks.Views.ResultItem({
          result: result,
          parentView: view
        })
        view.subViews.push(resultView)
        view.$('ul.results-list').append(resultView.render().$el)
      }
    })
  },

  renderUserResults: function() {
    if (this.currentQuery == "users_index") {
      this.$(".results-title").html("New users");
    } else {
      this.$(".results-title").html("Users that matched '" + this.currentQuery + "'");
    }
    if (this.userResults.length === 0 && this.userResults.query) {
      this.$('.empty-msg').html("Sorry we couldn't find that username. Please try again.")
    } else {
      this.$('.empty-msg').empty();
      this.userResults.each( function(user) {
        var userResult = new GoodFlicks.Views.UserItem({
          model: user
        })
        this.subViews.push(userResult)
        this.$('ul.results-list').append(userResult.render().$el)
      }.bind(this))
    }
  },

  render: function() {
    this.$el.html(this.template());

    if (this.userResults.query) {
      this.renderUserResults();
    } else if (this.apiResults === "noResults") {
      this.renderEmptyAPI();
    } else if (this.apiResults.length > 0) {
      this.renderAPIResults();
    }

    return this;
  },

  remove: function() {
    this.subViews.forEach( function(view) {
      view.remove();
    })
    this.subViews = []
    Backbone.View.prototype.remove.call(this);
  }

})
