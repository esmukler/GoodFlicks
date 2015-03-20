# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

user1 = User.create!(username: "guy", password: "password", session_token: "fake123")
user2 = User.create!(username: "dude", password: "password", session_token: "fake456")

25.times do |i|

  user = User.create!(username: Faker::Internet.user_name, password: "gfpassword")

end





movie1 = Movie.create!(title: "Chinatown", description: "A private detective hired to expose an adulterer finds himself caught up in a web of deceit, corruption and murder.",
                        year: 1974, director: "Roman Polanski",
                        poster: "http://image.tmdb.org/t/p/w500/iIHO6FzF6lL4mA90rrmk3Y705XS.jpg")

movie2 = Movie.create!(title: "Office Space", description: "Three company workers who hate their jobs and decide to rebel against their greedy boss.",
                        year: 1999, director: "Mike Judge",
                        poster: "http://image.tmdb.org/t/p/w500/iO9aZzrfmMvm3IqkFiQyuuUMLh2.jpg")

movie3 = Movie.create!(title: "WALL·E", description: "WALL-E is the last robot left on an Earth that has been overrun with garbage and all humans have fled to outer space. For 700 years he has continued to try and clean up the mess, but has developed some rather interesting human-like qualities. When a ship arrives with a sleek new type of robot, Wall-E thinks he's finally found a friend and stows away on the ship when it leaves.",
                        year: 2008, director: "Andrew Stanton",
                        poster: "http://image.tmdb.org/t/p/w500//4qOKgcDcB0SojUIg2syzor1FeL7.jpg")




library1 = Library.create!(title: "Favorites", user_id: user1.id)
library2 = Library.create!(title: "Guilty Pleasures", user_id: user1.id, is_public: false)


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
