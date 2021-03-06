json.partial! "api/movies/movie", movie: @movie

json.extract! @movie, :budget, :revenue

json.cast @movie.cast

json.critics do
  json.metacritic do
    json.rating @movie.metacritic_rating
    json.url @movie.metacritic_url
  end
  json.imdb do
    json.rating @movie.imdb_rating
    json.url @movie.imdb_url
  end
end

json.reviews @movie.reviews.order(updated_at: :desc) do |review|
  if review.is_public
    json.partial! "api/reviews/review", review: review
  end
end

json.libraries current_user.libraries do |library|
  json.id     library.id
  json.title  library.title
  json.added  @movie.libraries.include?(library)
end

json.poster_url image_url(@movie.poster.url)

if @movie.reviews.where(user_id: current_user.id).first
  json.cu_rating @movie.reviews.where(user_id: current_user.id).order(updated_at: :desc).first.num_stars
end

if @movie.reviews
  sum = 0
  @movie.reviews.each do |review|
    sum += review.num_stars
  end
  json.avg_rating (sum.to_f / @movie.reviews.length)
end
