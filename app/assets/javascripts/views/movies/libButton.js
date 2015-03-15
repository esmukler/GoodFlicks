GoodFlicks.Views.LibButton = Backbone.View.extend({
  template: JST['lib_button'],

  className: "lib-button",

  tagName: "li",

  events: {
    "click a": "goToLibrary",
    "click button.add" : "addToLibrary",
    "click button.remove" : "removeFromLibrary"
  },

  renderButton: function() {
    
  },

  render: function() {
    var content = this.template({
      library: this.model
      // state:
    })

    this.$el.html(content);

    return this;
  }



})
