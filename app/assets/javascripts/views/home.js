GoodFlicks.Views.HomeView = Backbone.View.extend({

  initialize: function(options) {
    if (options.libId) {
      this.libId = options.libId;
    }
    this.reviews = options.reviews;
    this.libraries = options.libraries;
    this.subViews = [];
    this.listenTo(this.libraries, "add remove", this.render);
    this.listenTo(this.reviews, "sync", this.render);
  },

  template: JST['home'],

  className: "home-container",

  events: {
    "click button.all-movies": "showAllMovies",
    "click button.add-library": "addLibrary",
    "sortupdate .library-list" : "updateLibOrder"
  },

  showAllMovies: function(event) {
    event.preventDefault();
    var libAll = new GoodFlicks.Models.Library({
      id: 0,
      title: "All My Movies"
    })

    this.libraries.each( function(library) {
      library.movies().each( function(movie) {
        libAll.movies().add(movie);
      })
    })
    this.reviews.each( function(review) {
      libAll.reviews().add(review)
    })

    var allView = new GoodFlicks.Views.LibraryShow({
      model: libAll,
      $revs: this.$('.reviews')
    })

    this.subViews.push(allView)
    this.$('.library-show').html(allView.render().$el)
  },

  updateLibOrder: function(event, ui) {
    var newOrder = [];
    var $children = $($(event.currentTarget).children())
    for (var i = 0; i< $children.length; i++) {
      newOrder.push($($children[i]).attr("data-lib-id"));
    }
    var libs = this.libraries;

    if (newOrder) {
      for (var j = 0; j < newOrder.length; j++) {
        libs.each(function(lib) {
          if (newOrder[j] == lib.id) {
            lib.save({order: j})
          }
        })
      }
    }
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
    var $libList = $('.library-list');

    this.libraries.each( function(library) {
      if (libId == library.id) {
        var libItem = new GoodFlicks.Views.LibItem({
          model: library,
          $show: this.$('.library-show'),
          $revs: this.$('.reviews'),
          quickStart: true
        });

      } else {
        var libItem = new GoodFlicks.Views.LibItem({
          model: library,
          $show: this.$('.library-show'),
          $revs: this.$('.reviews')
        });
      }
      this.subViews.push(libItem);
      $libList.append(libItem.render().$el)
    }.bind(this))
  },

  renderReviews: function() {
    if (!this.libId) {
      this.reviews.each( function(review) {
        var revItem = new GoodFlicks.Views.ReviewItem({
          model: review
        });
        this.subViews.push(revItem);
        this.$('.my-review-list').append(revItem.render().$el);
      }.bind(this))
    }
  },

  render: function() {
    var baseContent = this.template();

    this.$el.html(baseContent);

    this.renderHeader();

    this.$('.library-list').sortable();
    this.libraries.sort();
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
