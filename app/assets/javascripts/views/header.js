GoodFlicks.Views.Header = Backbone.View.extend({
  template: JST["header"],

  events: {
    "change .query": "search",
    "click .browse-movies": "goToBrowse",
    "click .my-feed": "goToFeed"
  },

  search: function(event) {
    event.preventDefault();
    var query = this.$(".query").val()
    Backbone.history.navigate("#/search/movies/" + query, { trigger: true })
  },

  goToBrowse: function(event) {
    event.preventDefault();
    Backbone.history.navigate("#movies", {trigger: true})
  },

  goToFeed: function(event) {
    event.preventDefault();
    if ($(".home-content").length > 0 && $("figure.follow").length === 0) {
      console.log("render the Feed straight!")
    } else {
      Backbone.history.navigate("#", { trigger: true })
    }
  },

  render: function() {
    this.$el.html(this.template());

    return this;
  }

})
