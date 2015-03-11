GoodFlicks.Views.LibForm = Backbone.View.extend({

  template: JST['lib_form'],

  tagName: "form",

  className: "lib-form",

  events: {
    "submit" : "submitForm"
  },

  submitForm: function(event) {
    event.preventDefault();
    var formData = this.$el.serializeJSON();

    this.model.set(formData.library)
    this.model.save({}, {
      success: function() {
        this.collection.add(this.model)
      }.bind(this)
    })
  },

  render: function() {
    var content = this.template({ library: this.model })

    this.$el.html(content);
    return this
  }

})
