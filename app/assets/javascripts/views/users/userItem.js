GoodFlicks.Views.UserItem = Backbone.View.extend({
  template: JST["user_item"],

  tagName: "li",

  className: "user-item",

  render: function() {
    this.$el.html(this.template({
      user: this.model
    }))

    if (this.model.get("is_cu")) {
      this.$('a').html("me")
      this.$('a').attr("href", "#")
    }
    return this
  }
})
