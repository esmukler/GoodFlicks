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
                        year: 1974, director: "Roman Polanski")

movie2 = Movie.create!(title: "Office Space", description: "Three company workers who hate their jobs and decide to rebel against their greedy boss.",
                        year: 1999, director: "Mike Judge")

movie3 = Movie.create!(title: "Wall-E", description: "In the distant future, a small waste collecting robot inadvertently embarks on a space journey that will ultimately decide the fate of mankind.",
                        year: 2008, director: "Andrew Stanton")



library1 = Library.create!(title: "Seen", user_id: user1.id)
library2 = Library.create!(title: "Want to See", user_id: user1.id)
library3 = Library.create!(title: "Favorites", user_id: user1.id)
library4 = Library.create!(title: "Guilty Pleasures", user_id: user1.id, is_public: false)


rev1 = Review.create!(user_id: user1.id, movie_id: movie1.id,
                        num_stars: 5, body: "This movie is great!",
                        is_public: true)
rev2 = Review.create!(user_id: user2.id, movie_id: movie1.id,
                        num_stars: 4, body: "This movie is pretty good.",
                        is_public: true)
rev3 = Review.create!(user_id: user1.id, movie_id: movie2.id,
                        num_stars: 2, body: "This movie is lame!",
                        is_public: true)
rev4 = Review.create!(user_id: user2.id, movie_id: movie2.id,
                        num_stars: 1, body: "This movie is terrible.",
                        is_public: false)
rev4 = Review.create!(user_id: user2.id, movie_id: movie3.id,
                        num_stars: 3, body: "I cried often during this movie.",
                        is_public: true)
rev5 = Review.create!(user_id: user1.id, movie_id: movie3.id,
                        num_stars: 3, body: "This movie is super realistic. The end is nigh.",
                        is_public: true)
