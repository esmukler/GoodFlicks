GoodFlicks.Views.FollowButton = Backbone.View.extend({
  className: "follow-button",

  initialize: function() {
    this.listenTo(this.model, "sync change:followed", this.render)
  },

  events: {
    "click": "toggleFollow",
  },

  toggleFollow: function(event) {
    event.preventDefault();
    this.model.toggleFollow();
  },
  render: function() {
    if (this.model.get("followed")) {
      this.$el.html("Unfollow " + this.model.escape("username"))
    } else {
      this.$el.html("Follow " + this.model.escape("username"))
    }

    return this;
  }
})
