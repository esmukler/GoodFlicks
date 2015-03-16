GoodFlicks.Views.Header = Backbone.View.extend({
  template: JST["header"],

  events: {
    "change .query": "search",
  },

  initialize: function() {
  },

  search: function(event) {
    event.preventDefault();
    var query = this.$(".query").val()
    Backbone.history.navigate("#/search/" + query, { trigger: true })
  },

  render: function() {

    var content = this.template;

    this.$el.html(content)

    return this;
  }

})
