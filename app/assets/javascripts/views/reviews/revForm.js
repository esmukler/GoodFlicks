GoodFlicks.Views.ReviewForm = Backbone.View.extend({

  template: JST['review_form'],

  tagName: "form",

  className: "review-form",

  events: {
    "click button" : "submitForm"
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
      }.bind(this)
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

  render: function() {
    var content = this.template({ library: this.model, isNew: this.isNew() })

    this.$el.html(content);
    this.checkPublic();

    return this
  }

})
