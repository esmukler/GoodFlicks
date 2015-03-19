GoodFlicks.Views.Header = Backbone.View.extend({
  template: JST["header"],

  events: {
    "change .query": "search",
  },

  search: function(event) {
    event.preventDefault();
    var query = this.$(".query").val()
    Backbone.history.navigate("#/search/" + query, { trigger: true })
  },

  render: function() {
    this.$el.html(this.template());

    return this;
  }

})
