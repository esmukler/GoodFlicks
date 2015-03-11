GoodFlicks.Views.MovieIndex = Backbone.View.extend({

  initialize: function() {
    this.subViews = [];

    this.listenTo(this.collection, "sync", this.render)
  },

  template: JST["movie_index"],

  className: "movie-index",

  tagName: "section",

  render: function() {
    var movies = this.collection;

    var baseContent = this.template({ movies: movies })
    this.$el.html(baseContent);

    var $movieList = this.$el.find('.movie-list')
    // this.collection.sort(); I want reverse updated_at
    for (var i=0; i<= 10; i++) {
      if (movies.at(i)) {
        var itemView = new GoodFlicks.Views.MovieListItem({
          model: movies.at(i)
        })
        this.subViews.push(itemView);
        $movieList.append(itemView.render().$el);
      }
    };

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
