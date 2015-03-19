GoodFlicks.Views.UserResult = Backbone.View.extend({
  template: JST['user_result'],

  tagName: 'li',

  className: 'user-result',

  initialize: function() {
    this.listenTo(this.model, "sync", this.render)
  },

  render: function() {
    this.$el.html(this.template({
      id: this.model.id,
      username: this.model.escape("username")
    }))

    return this;
  }

})
