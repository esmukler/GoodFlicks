GoodFlicks.Views.ReviewForm = Backbone.View.extend({

  template: JST['review_form'],

  tagName: "form",

  className: "review-form",

  initialize: function(options) {
    this.movie = options.movie;
    this.num_stars = this.model.get("num_stars") || 3;
  },

  events: {
    "click .submit-button" : "submitForm",
    "click button.cancel" : "cancelForm"
  },

  renderStars: function() {
    this.$('div.rev-form-stars').raty({
      score: this.num_stars,
      click: function(score, event) {
        this.num_stars = score;
      }.bind(this)
    })
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
    formData.review.num_stars = this.num_stars

    this.model.set(formData.review)
    this.model.save({}, {
      success: function() {
        if (this.model.get("num_stars")) {
          this.movie.set("cu_rating", this.model.get("num_stars"))
        }
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
    this.renderStars();
    return this
  }

})
