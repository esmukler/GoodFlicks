json.extract! library, :title, :id

json.movies library.movies do |movie|
  json.extract! movie, :id, :title, :description, :year, :director

  json.poster_url image_url(movie.poster.url(:thumb))
end
