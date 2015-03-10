GoodFlicks.Views.MovieForm = Backbone.View.extend({

  template: JST['movie_form'],

  tagName: "form",

  className: "movie-form",

  events: {
    "submit" : "submitForm"
  },

  submitForm: function(event) {
    event.preventDefault();
    var formData = this.$el.serializeJSON();

    this.model.set(formData.movie)
    this.model.save({}, {
      success: function() {
        this.collection.add(this.model) // merge false??
        Backbone.history.navigate("#movies/" + this.model.id, {trigger: true})
      }.bind(this)
    })
  },

  render: function() {
    var content = this.template({ movie: this.model })

    this.$el.html(content);
    return this
  }

})
