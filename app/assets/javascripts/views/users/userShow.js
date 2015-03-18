GoodFlicks.Views.UserShow = Backbone.View.extend({
  initialize: function() {
    this.subViews = [];
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.libraries(), "add sync remove", this.render);
    this.listenTo(this.model.reviews(), "add remove", this.render);
  },

  template: JST['user_show'],

  className: "home-container",

  renderHeader: function() {
    var header = new GoodFlicks.Views.Header()
    this.subViews.push(header)
    this.$('header.home').html(header.render().$el)
  },

  renderLibraries: function() {
    var $libList = $('.library-list')

    this.model.libraries().each( function(library) {
      var libItem = new GoodFlicks.Views.LibItem({
        model: library,
        $show: this.$('.library-show'),
        $revs: this.$('.reviews')
      });
      
      this.subViews.push(libItem);
      $libList.append(libItem.render().$el)
    }.bind(this))
  },


  render: function() {
    this.$el.html(this.template({
      user: this.model
    }))

    this.renderHeader();
    this.renderLibraries();


    return this;
  },

  remove: function() {
    this.subViews.forEach( function(view) {
      view.remove();
    });
    this.subViews = [];
    Backbone.View.prototype.remove.call(this);
  }

})
