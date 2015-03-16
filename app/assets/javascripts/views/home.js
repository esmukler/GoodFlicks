GoodFlicks.Views.HomeView = Backbone.View.extend({

  initialize: function(options) {
    if (options.libId) {
      this.libId = options.libId;
    }
    this.reviews = options.reviews;
    this.libraries = options.libraries;
    this.subViews = [];
    this.listenTo(this.libraries, "sync destroy", this.render);
    this.listenTo(this.reviews, "sync", this.render);
  },

  template: JST['home'],

  className: "home-container",

  events: {
    "click button.add-library": "addLibrary"
  },

  renderHeader: function() {
    var header = new GoodFlicks.Views.Header()
    this.subViews.push(header)
    this.$('header.home').html(header.render().$el)
  },

  addLibrary: function(event) {
    var model = new GoodFlicks.Models.Library()

    var addLib = new GoodFlicks.Views.LibForm({
      collection: this.libraries,
      model: model,
    })
    this.subViews.push(addLib);
    $(event.currentTarget).parent().html(addLib.render().$el);

  },

  renderLibraries: function(libId) {
    var $libList = $('.library-list')
    this.libraries.each( function(library) {
      if (libId == library.id) {
        var libItem = new GoodFlicks.Views.LibItem({
          model: library,
          $show: this.$('.library-show'),
          quickStart: true
        });

      } else {
        var libItem = new GoodFlicks.Views.LibItem({
          model: library,
          $show: this.$('.library-show')
        });
      }
      this.subViews.push(libItem);
      $libList.append(libItem.render().$el)
    }.bind(this))
  },

  renderReviews: function() {
    this.reviews.each( function(review) {
      var revItem = new GoodFlicks.Views.ReviewItem({
        model: review
      });
      this.subViews.push(revItem);
      this.$('.my-review-list').append(revItem.render().$el);
    }.bind(this))
  },

  render: function() {
    var baseContent = this.template();

    this.$el.html(baseContent);

    this.renderHeader();
    this.renderLibraries(this.libId);
    this.renderReviews();

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
