GoodFlicks.Views.MovieForm = Backbone.View.extend({

  template: JST['movie_form'],

  tagName: "form",

  className: "movie-form",

  events: {
    "submit" : "submitForm"
  },

  submitForm: function(event) {
    event.preventDefault();
    console.log(event);
  },

  render: function() {
    var content = this.template({ movie: this.model })

    this.$el.html(content);
    return this
  }

})
