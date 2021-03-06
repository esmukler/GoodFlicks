GoodFlicks.Views.MovieListItem = Backbone.View.extend({

  template: JST['movie_list_item'],

  className: "movie-item group",

  tagName: "li",

  events: {
    "click": "goToMovie"
  },

  initialize: function() {
    this.listenTo(this.model, "sync", this.render)
  },

  goToMovie: function(event) {
    Backbone.history.navigate("#/movies/" + this.model.id, { trigger: true })
  },

  renderStars: function() {
    if (this.model.get("rating")) {
      this.$('div.item-stars').raty({
        score: function() {
          return this.model.get("rating")
        }.bind(this),
        readOnly: true
      })
    }
  },

  render: function() {
    var content = this.template({ movie: this.model })

    this.$el.html(content);
    this.renderStars();
    return this;
  }

})
