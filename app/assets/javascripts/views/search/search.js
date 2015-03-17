GoodFlicks.Views.Search = Backbone.View.extend({
  initialize: function(options) {
    // this.searchResults = new GoodFlicks.Collections.SearchResults();
    // this.listenTo(this.searchResults, "sync", this.render);
    if (options.query) {
      this.searchAPI(options.query);
    }
    this.apiResults = [];
    this.subViews = [];
    this.collection = new GoodFlicks.Collections.Movies()
    this.collection.fetch();
    this.listenTo(this.collection, "sync", this.render)
    this.render();

  },

  events: {
    "change .query": "insideSearch",
  },

  template: JST["search"],

  renderResults: function() {
    this.apiResults.forEach( function(result) {
      var resultView = new GoodFlicks.Views.ResultItem({
        result: result
      })
      this.subViews.push(resultView)
      this.$('.search-results').append(resultView.render().$el)
    }.bind(this))
  },

  render: function() {
    this.$el.html(this.template());

    if (this.apiResults) {
      this.renderResults();
    }

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
      url: "http://api.themoviedb.org/3/search/movie?api_key=a1d5f291d84e71e51b248b86ec9c9e2a&query=" + query,
      type: "GET",
      success: function(data) {
        if (data.results.length === 0) {
          that.$('.empty-msg').text("Sorry we couldn't find that title. Please try again.")
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
