GoodFlicks.Views.MovieShow = Backbone.View.extend({

  template: JST['movie_show'],

  className: "movie-show",

  initialize: function() {
    this.listenTo(this.model, "sync", this.render)
  },

  render: function() {
    var content = this.template({ movie: this.model })

    this.$el.html(content);
    return this
  }

})
