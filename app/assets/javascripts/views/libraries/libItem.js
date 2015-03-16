GoodFlicks.Views.LibItem = Backbone.View.extend({

  template: JST['library_item'],

  className: "library-item",

  tagName: "li",

  initialize: function(options) {
    this.$show = options.$show;
    this.listenTo(this.model, "sync", this.render);
    this.subViews = [];
    if (options.quickStart) {
      this.quickStart = true;
    }
  },

  events: {
    "click button.edit": "editLibrary",
    "click button.delete": "deleteLibrary",
    "click .lib-title" : "showLibrary",
    "mouseenter" : "toggleButton",
    "mouseleave" : "toggleButton",
  },

  toggleButton: function(event) {
    this.$('button.edit').toggleClass("hidden");
    this.$('button.delete').toggleClass("hidden");
  },

  showLibrary: function(event) {
    var libShow = new GoodFlicks.Views.LibraryShow({
      model: this.model
    })
    this.subViews.push(libShow)
    this.$show.html(libShow.render().$el)
  },

  editLibrary: function(event) {
    var libForm = new GoodFlicks.Views.LibForm({ model: this.model })
    this.subViews.push(libForm);

    this.$el.html(libForm.render().$el)
  },

  deleteLibrary: function(event) {
    if (confirm("Are you sure you want to delete the whole library '" +
                    this.model.escape("title") + "'?")) {
      this.model.destroy();
      Backbone.history.navigate("", {trigger: true});
    }
  },

  render: function() {
    var content = this.template({ library: this.model });
    if (this.quickStart) {
      this.showLibrary();
    }
    this.$el.html(content);
    return this;
  },

  remove: function() {
    this.subViews.forEach( function(view) {
      view.remove();
    })
    this.subViews = []
    Backbone.View.prototype.remove.call(this);
  }

})
