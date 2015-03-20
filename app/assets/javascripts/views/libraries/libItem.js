GoodFlicks.Views.LibItem = Backbone.View.extend({

  template: JST['library_item'],

  className: "library-item",

  tagName: "li",

  initialize: function(options) {
    this.$show = options.$show;
    this.$revs = options.$revs;
    this.listenTo(this.model, "sync", this.render);
    this.subViews = [];
    if (options.quickStart) {
      this.quickStart = true;
    }
  },

  attributes: function() {
    return {
      'data-lib-id': this.model.get("id")
    };
  },

  events: {
    "click button.edit": "editLibrary",
    "click button.delete": "deleteLibrary",
    "click .lib-title" : "showLibrary",
    "mouseenter" : "addButton",
    "mouseleave" : "removeButton",
  },

  addButton: function(event) {
    if (this.model.get("is_cu")) {
      this.$('button.edit').removeClass("hidden");
      this.$('button.delete').removeClass("hidden");
    }
  },

  removeButton: function(event) {
    if (this.model.get("is_cu")) {
      this.$('button.edit').addClass("hidden");
      this.$('button.delete').addClass("hidden");
    }
  },

  showLibrary: function(event) {
    var libShow = new GoodFlicks.Views.LibraryShow({
      model: this.model,
      $revs: this.$revs
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
    event.preventDefault();
    var deleteModal = new GoodFlicks.Views.DeleteModal({
      model: this.model
    })
    this.subViews.push(deleteModal);
    $('.modal').toggleClass("hidden")
    $('.modal-form').html(deleteModal.render().$el)
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
