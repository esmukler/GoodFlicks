GoodFlicks.Views.MovieForm = Backbone.View.extend({

  template: JST['movie_form'],

  tagName: "div",

  className: "movie-form-container",

  events: {
    "submit" : "submitForm",
    "change #input-picture-file": "changePicture"
  },

  submitForm: function(event) {
    event.preventDefault();
    var formData = this.$('.movie-form').serializeJSON();
    this.model.save(formData.movie, {
      success: function() {
        this.collection.add(this.model)

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
