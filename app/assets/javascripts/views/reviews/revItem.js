GoodFlicks.Views.ReviewItem = Backbone.View.extend({

  template: JST['review_item'],

  className: "review-item",

  tagName: "li",

  initialize: function() {
    this.listenTo(this.model, "sync", this.render)
    // this.subViews = [];
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

  render: function() {
    var content = this.template({ review: this.model })

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
