GoodFlicks.Collections.Libraries = Backbone.Collection.extend({
  url: "/api/libraries",

  comparator: "order",

  model: GoodFlicks.Models.Library,

  initialize: function(models, options) {
    if (options) this.movie = options.movies;
  },

  getOrFetch: function(id) {
    var library = this.get(id);

    if (!library) {
      var library = new GoodFlicks.Models.Library({ id : id });
      library.fetch({
        success: function() {
          this.add(library);
        }.bind(this)
      });
    } else {
      library.fetch();
    }
    return library;
  }
})
