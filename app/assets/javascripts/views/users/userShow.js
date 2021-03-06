GoodFlicks.Views.UserShow = Backbone.View.extend({
  initialize: function() {
    this.subViews = [];
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.libraries(), "add sync remove", this.render);
    this.listenTo(this.model.reviews(), "add remove", this.render);
    this.listenTo(this.model.followings(), "add remove", this.render)
  },

  template: JST['user_show'],

  className: "home-container",

  events: {
    "click button.all-movies": "showAllMovies"
  },

  renderFollowings: function() {
    if (this.model.followings().length === 0) {
      this.$('.followings-list').html(this.model.get("username") + " isn't following anyone yet.")
    } else {
      this.model.followings().each( function(user) {
        var userItem = new GoodFlicks.Views.UserItem({
          model: user
        })
        this.subViews.push(userItem);
        if (user.get("is_cu")) {
          this.$('.followings-list').before(userItem.render().$el)
        } else {
          this.$('.followings-list').append(userItem.render().$el)
        }
      }.bind(this))
    }
  },

  showAllMovies: function(event) {
    event.preventDefault();
    var libAll = new GoodFlicks.Models.Library({
      id: 0,
      title: "All " + this.model.escape("username") + "'s Movies"
    })

    this.model.libraries().each( function(library) {
      library.movies().each( function(movie) {
        libAll.movies().add(movie);
      })
    })
    this.model.reviews().each( function(review) {
      libAll.reviews().add(review)
    })

    var allView = new GoodFlicks.Views.LibraryShow({
      model: libAll,
      $revs: this.$('.reviews')
    })

    this.subViews.push(allView)
    this.$('.library-show').html(allView.render().$el)
  },

  renderFollowButton: function() {
    var followButton = new GoodFlicks.Views.FollowButton({
      model: this.model
    })
    this.subViews.push(followButton)
    this.$('figure.follow').html(followButton.render().$el)
  },

  // renderHeader: function() {
  //   var header = new GoodFlicks.Views.Header({
  //     user: this.model
  //   })
  //   this.subViews.push(header)
  //   this.$('.search-bar').html(header.render().$el)
  // },

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

  renderReviews: function() {
    this.model.reviews().each( function(review) {
      var revItem = new GoodFlicks.Views.ReviewItem({
        model: review
      });
      this.subViews.push(revItem);
      this.$('.my-review-list').append(revItem.render().$el);
    }.bind(this))
  },

  render: function() {
    this.$el.html(this.template({
      username: this.model.escape("username")
    }))

    this.renderHeader();
    this.renderFollowButton();
    this.renderLibraries();
    this.renderFollowings();
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
