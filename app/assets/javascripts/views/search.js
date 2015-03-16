GoodFlicks.Views.Search = Backbone.View.extend({
  initialize: function(options) {
    this.searchResults = new GoodFlicks.Collections.SearchResults();
    this.listenTo(this.searchResults, "sync", this.render);
    if (options.query) {
      this.outsideSearch(options.query);
    }
  },

  events: {
    "change .query": "search",
  },

  template: JST["search"],

  render: function() {

    var content = this.template({
      results: this.searchResults
    })

    this.$el.html(content);

    return this;
  },

  search: function(event) {
    event.preventDefault();

    this.searchResults.query = this.$(".query").val();
    this.searchResults.fetch({
      data: {
        query: this.searchResults.query
      }
    })
  },

  outsideSearch: function(query) {
    this.searchResults.query = query;
    this.searchResults.fetch({
      data: {
        query: this.searchResults.query
      }
    })
  }
})
