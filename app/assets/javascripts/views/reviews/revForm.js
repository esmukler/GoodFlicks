GoodFlicks.Views.ReviewForm = Backbone.View.extend({

  template: JST['review_form'],

  tagName: "form",

  className: "review-form",

  events: {
    "click .submit-button" : "submitForm",
    "click button.cancel" : "cancelForm"
  },

  cancelForm: function(event) {
    event.preventDefault();
    this.remove();
    $('.modal').toggleClass("hidden")
  },

  submitForm: function(event) {
    var isNew = this.isNew();
    event.preventDefault();
    var formData = this.$el.serializeJSON();

    this.model.set(formData.review)
    this.model.save({}, {
      success: function() {
        if (isNew) {
          this.collection.add(this.model, {merge: true});
        }
        if (!this.model.get("is_public")) {
          alert("Private review saved. It will display on your home page.");
        }
        this.remove();
        $('.modal').addClass("hidden");
      }.bind(this),
      error: function(model, errorData) {
        errorData.responseJSON.forEach(function(error) {
          this.$('.errors-list').append("<li>" + error + "</li>")
        })
      }
    })
  },

  isNew: function() {
    return (this.model.id) ? false : true;
  },

  checkPublic: function() {
    if (this.model.isNew() || this.model.get("is_public")) {
      this.$("#is_public").prop("checked", true)
    } else {
      this.$("#is_private").prop("checked", true)
    }
  },

  addButtonText: function() {
    if (this.isNew()) {
      this.$('.submit-button button').text('Add Review')
    } else {
      this.$('.submit-button button').text('Update Review')
    }
  },

  render: function() {
    var content = this.template({ review: this.model, isNew: this.isNew() })

    this.$el.html(content);
    this.checkPublic();
    this.addButtonText();
    return this
  }

})
