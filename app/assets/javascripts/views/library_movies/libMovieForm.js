GoodFlicks.Views.LibMovieForm = Backbone.View.extend({

  initialize: function() {
    this.listenTo(this.collection, "sync", this.render)
  },

  template: JST['lib_movie_add_form'],

  tagName: "form",

  className: "lib-movie-add-form",

  events: {
    "submit" : "addMovieToLibs"
  },

  addMovieToLibs: function(event) {
    event.preventDefault();
    var formData = this.$el.serializeJSON();
    if (formData.lm) {
      formData.lm.library_ids.forEach( function(libId) {
        console.log("Make a libMovie w/ libId: ", libId, "and movId: ", this.model.id)
      }.bind(this))
      this.render();
    }
  },

  render: function() {

    var content = this.template({
      libraries: this.collection,
      movie: this.model
    })
    this.$el.html(content);

    return this;
  }


})
