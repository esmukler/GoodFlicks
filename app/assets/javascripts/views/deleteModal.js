GoodFlicks.Views.DeleteModal = Backbone.View.extend({
  template: JST['delete_modal'],

  className: "delete-form",

  initialize: function() {
    this.listenTo(this.model, "sync", this.render)
  },

  events: {
    "click button.yes": "delete",
    "click button.no": "goBack"
  },

  delete: function() {
    this.model.destroy();
    this.remove();
    $('.modal').addClass("hidden");
  },

  goBack: function() {
    this.remove();
    $('.modal').addClass("hidden");
  },

  render: function() {
    if (this.model.escape("title"))
    this.$el.html(this.template({
      title: this.model.escape("title")
    }))

    return this;
  }

})
