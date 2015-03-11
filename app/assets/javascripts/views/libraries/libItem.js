GoodFlicks.Views.LibItem = Backbone.View.extend({

  template: JST['library_item'],

  className: "library-item",

  tagName: "li",

  initialize: function() {
    this.listenTo(this.model, "sync", this.render)
    this.subViews = [];
  },

  events: {
    "click button.edit": "editLibrary",
    "click button.delete": "deleteLibrary"
  },

  editLibrary: function(event) {
    var libForm = new GoodFlicks.Views.LibForm({ model: this.model })
    this.subViews.push(libForm);

    this.$el.html(libForm.render().$el)
  },

  deleteLibrary: function(event) {
    console.log("are you sure you want to delete this?")
  },

  render: function() {
    var content = this.template({ library: this.model })

    this.$el.html(content);
    return this
  },

  remove: function() {
    this.subViews.forEach( function(view) {
      view.remove();
    })
    this.subViews = []
    Backbone.View.prototype.remove.call(this);
  }

})
