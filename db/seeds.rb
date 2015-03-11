# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

user1 = User.create!(username: "eli", password: "password", session_token: "fake123")
user2 = User.create!(username: "dude", password: "password", session_token: "fake456")

movie1 = Movie.create!(title: "Chinatown", description: "A private detective hired to expose an adulterer finds himself caught up in a web of deceit, corruption and murder.",
                        year: 1974, director: "Roman Polanski",
                        poster_img: "https://noirwhale.files.wordpress.com/2012/02/film-noir-chinatown-1974-movie-poster-via-professormortis-wordpress.jpg")

movie2 = Movie.create!(title: "Office Space", description: "Three company workers who hate their jobs and decide to rebel against their greedy boss.",
                        year: 1999, director: "Mike Judge",
                        poster_img: "https://www.movieposter.com/posters/archive/main/58/MPW-29049")

library1 = Library.create!(title: "Seen", user_id: user1.id)
library2 = Library.create!(title: "Want to See", user_id: user1.id)
library3 = Library.create!(title: "Favorites", user_id: user1.id)
library4 = Library.create!(title: "Guilty Pleasures", user_id: user1.id, is_public: false)
