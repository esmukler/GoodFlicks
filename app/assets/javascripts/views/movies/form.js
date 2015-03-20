GoodFlicks.Views.MovieForm = Backbone.View.extend({

  template: JST['movie_form'],

  tagName: "div",

  className: "movie-form-container",

  events: {
    "click .submit-movie-form" : "submitForm",
    "click .cancel-movie-form" : "cancel",
    "change #input-picture-file": "changePicture"
  },

  cancel: function(event) {
    event.preventDefault();
    Backbone.history.navigate("#/search", { trigger: true })
    this.remove();

  },

  submitForm: function(event) {
    event.preventDefault();
    var formData = $('.movie-form').serializeJSON();
    this.model.save(formData.movie, {
      success: function() {
        this.collection.add(this.model)
        this.remove();
        Backbone.history.navigate("#/movies/" + this.model.id, {trigger: true})
      }.bind(this)
    })
  },

  changePicture: function(event) {
    var file = event.currentTarget.files[0]
    var fileReader = new FileReader();

    fileReader.onloadend = function () {
      this.model.set("poster", fileReader.result);
      this.previewPic(fileReader.result);
    }.bind(this)

    fileReader.readAsDataURL(file);
  },

  previewPic: function(src) {
    this.$('#picture-preview').attr("src", src);
  },

  render: function() {
    var content = this.template({ movie: this.model })

    this.$el.html(content);
    return this
  }

})
