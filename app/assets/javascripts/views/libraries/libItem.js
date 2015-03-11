GoodFlicks.Views.LibItem = Backbone.View.extend({

  template: JST['library_item'],

  className: "library-item",

  tagName: "li",

  initialize: function() {
    this.listenTo(this.model, "sync", this.render)
  },

  render: function() {
    var content = this.template({ library: this.model })

    this.$el.html(content);
    return this
  }

})
