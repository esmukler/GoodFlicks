GoodFlicks.Views.UserItem = Backbone.View.extend({
  template: JST["user_item"],

  tagName: "li",

  className: "user-item",

  events: {
    "click": "goToUser"
  },

  goToUser: function(event) {
    if (this.model.get("is_cu")) {
      Backbone.history.navigate("#", { trigger: true });
    } else {
      Backbone.history.navigate("#/users/" + this.model.id, { trigger: true })
    }
  },

  render: function() {
    this.$el.html(this.template({
      user: this.model
    }))

    if (this.model.get("is_cu")) {
      this.$('p').html("ME!")
      this.$el.css("list-style", "none")
    }
    return this
  }
})
