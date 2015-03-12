GoodFlicks.Views.ReviewItem = Backbone.View.extend({

  template: JST['review_item'],

  className: "review-item",

  tagName: "li",

  initialize: function() {
    this.listenTo(this.model, "sync", this.render)
    // this.subViews = [];
    this.getUser();
  },

  getUser: function() {
    var users = new GoodFlicks.Collections.Users();
    var user = users.getOrFetch(this.model.get("user_id"));
    this.model.set("user", user);
    // debugger
    // console.log(this.model.get("user"))
  },

  events: {
    // "click button.edit": "editReview",
    // "click button.delete": "deleteReview"
  },

  // EDITREVIEW: function(event) {
  //   var libForm = new GoodFlicks.Views.LibForm({ model: this.model })
  //   this.subViews.push(libForm);
  //
  //   this.$el.html(libForm.render().$el)
  // },

  // DELETEREVIEW: function(event) {
  //   if (confirm("Are you sure you want to delete the whole library '" +
  //                   this.model.escape("title") + "'?")) {
  //     this.model.destroy();
  //     Backbone.history.navigate("", {trigger: true});
  //   }
  // },
  // parseTime: function() {
  //   var time = this.model.get("updated_at")
  //   TODO: Make it look nice!
  // },

  render: function() {
    // debugger
    var content = this.template({ review: this.model })

    this.$el.html(content);
    return this
  },

  remove: function() {
    if (this.subViews) {
      this.subViews.forEach( function(view) {
        view.remove();
      })
      this.subViews = []
    }
    Backbone.View.prototype.remove.call(this);
  }

})
