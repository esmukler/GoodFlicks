GoodFlicks.Views.LibForm = Backbone.View.extend({

  template: JST['lib_form'],

  tagName: "form",

  className: "lib-form",

  events: {
    "click button" : "submitForm"
  },

  submitForm: function(event) {
    event.preventDefault();
    var formData = this.$el.serializeJSON();

    var isNew = (this.model.id) ? false : true;

    this.model.set(formData.library)
    this.model.save({}, {
      success: function() {
        if (isNew) {
          this.collection.add(this.model, {merge: true})
        }
      }.bind(this)
    })


  },

  render: function() {
    var content = this.template({ library: this.model })

    this.$el.html(content);
    return this
  }

})
