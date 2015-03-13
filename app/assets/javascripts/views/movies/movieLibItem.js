GoodFlicks.Views.MovieLibItem = Backbone.View.extend({

  template: JST['movie_lib_item'],

  className: "movie-lib-item",

  tagName: "li",

  initialize: function() {
    this.listenTo(this.model, "sync", this.render)
  },

  events: {
    "click a": "goToLibrary",
    "click button": "removeFromLib"
  },





  render: function() {
    var content = this.template({ library: this.model })
    this.$el.html(content);

    return this;
  }

})
