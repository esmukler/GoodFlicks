json.extract! library, :title, :id, :order

json.is_cu library.user == current_user

json.movies library.movies do |movie|
  json.extract! movie, :id, :title, :year

  json.poster_url image_url(movie.poster.url(:thumb))

  if movie.reviews.where(user_id: library.user_id).first
    json.rating movie.reviews.where(user_id: library.user_id).order(updated_at: :desc).first.num_stars
  end
end

json.reviews library.reviews.where(:user_id => library.user_id).order(updated_at: :desc).limit(5) do |review|
  json.extract! review, :id, :movie_id, :body, :num_stars, :updated_at, :is_public

  json.movie_title review.movie.title

  json.updated_at review.updated_at.to_time.strftime('%b %d %Y %I:%M%P')
end
