GoodFlicks.Collections.Users = Backbone.Collection.extend({
  url: "/users",

  model: GoodFlicks.Models.User,

  getOrFetch: function(id) {
    var user = this.get(id);

    if (!user) {
      var user = new GoodFlicks.Models.User({ id : id });
      user.fetch({
        success: function() {
          this.add(user);
        }.bind(this)
      });
    } else {
      user.fetch();
    }
    return user;
  }
})
