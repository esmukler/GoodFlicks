GoodFlicks.Views.MovieListItem = Backbone.View.extend({

  template: JST['movie_list_item'],

  className: "movie-item",

  tagName: "li",

  initialize: function() {
    this.listenTo(this.model, "sync", this.render)
  },

  render: function() {
    var content = this.template({ movie: this.model })

    this.$el.html(content);
    return this
  }

})
