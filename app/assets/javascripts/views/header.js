GoodFlicks.Views.Header = Backbone.View.extend({
  template: JST["header"],

  render: function() {
    
    var content = this.template;

    this.$el.html(content)

    return this;
  }

})
