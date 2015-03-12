GoodFlicks.Views.LibForm = Backbone.View.extend({

  template: JST['lib_form'],

  tagName: "form",

  className: "lib-form",

  events: {
    "click button" : "submitForm"
  },

  submitForm: function(event) {
    var isNew = this.isNew();
    event.preventDefault();
    var formData = this.$el.serializeJSON();
    this.model.set(formData.library)
    this.model.save({}, {
      success: function() {
        if (isNew) {
          this.collection.add(this.model, {merge: true});
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
