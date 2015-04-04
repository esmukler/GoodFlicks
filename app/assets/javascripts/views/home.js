GoodFlicks.Views.HomeView = Backbone.View.extend({

  initialize: function(options) {
    if (options.libId) {
      this.libId = options.libId;
    }
    this.feed = options.feed;
    this.reviews = options.reviews;
    this.libraries = options.libraries;
    this.followings = options.followings;
    this.subViews = [];
    this.listenTo(this.followings, "add remove", this.render)
    this.listenTo(this.libraries, "add remove", this.render);
    this.listenTo(this.reviews, "sync", this.render);
    this.listenTo(this.feed, "sync", this.render)
  },

  template: JST['home'],

  className: "home-container",

  events: {
    "click button.all-movies": "showAllMovies",
    "click button.add-library": "addLibrary",
    "sortupdate .library-list" : "updateLibOrder",
    "change .friend-query": "searchUsers",
    "click .find-friends-btn": "goToUsersIndex"
  },

  goToUsersIndex: function(event) {
    Backbone.history.navigate("#/search/users/users_index", { trigger: true })
  },

  searchUsers: function(event) {
    event.preventDefault();
    var query = event.currentTarget.value
    Backbone.history.navigate("#/search/users/" + query, { trigger: true })
  },

  renderFeed: function() {
    if (!(this.libId && this.libId > 0)) {
      this.$('section.library-show').html(JST["lib_show_prompt"]);
    }
    this.$('.feed-list').removeClass("hidden")
    if (this.feed.length > 0) {
      this.feed.each( function(review) {
        var revItem = new GoodFlicks.Views.ReviewItem({
          model: review
        });
        this.subViews.push(revItem);
        this.$('.feed-list').append(revItem.render().$el);
      }.bind(this))
    } else {
      this.$('.feed-list').html("<p class='empty-feed'>No one you follow has written any reviews yet.</p>")
      this.$('.feed-list').append("<div class='find-friends-btn'>Find More Friends</div>");
    }
  },

  renderFollowings: function() {
    if (this.followings.length === 0) {
      this.$('.followings-list').html("You don't follow anyone yet.")
    } else {
      this.followings.each( function(user) {
        var userItem = new GoodFlicks.Views.UserItem({
          model: user
        })
        this.subViews.push(userItem);
        this.$('.followings-list').append(userItem.render().$el)
      }.bind(this))
    }
    this.$('.followings-list').after(JST['find_friends']);
  },

  showAllMovies: function(event) {
    event.preventDefault();
    var libAll = new GoodFlicks.Models.Library({
      id: 0,
      title: "All My Movies",
      is_cu: true
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
        this.$(".feed").addClass("hidden");
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

    this.renderFollowings();

    this.renderReviews();

    if (!this.libId || this.libId == 0) {
      this.renderFeed();
    }

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
