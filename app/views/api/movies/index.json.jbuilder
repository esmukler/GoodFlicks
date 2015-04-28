json.array! @movies do |movie|
  json.partial! "api/movies/movie", movie: movie

  json.poster_url image_url(movie.poster.url(:thumb))
end
