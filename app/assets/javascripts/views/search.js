GoodFlicks.Views.Search = Backbone.View.extend({
  initialize: function() {

    this.searchResults = new GoodFlicks.Collections.SearchResults();
    this.listenTo(this.searchResults, "sync", this.render);
  },

  events: {
    "change .query": "search",
  },

  template: JST["search"],

  render: function() {
    console.log(this.searchResults)
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
  }
})
