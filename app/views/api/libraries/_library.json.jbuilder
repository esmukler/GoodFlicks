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
  json.partial! "api/reviews/review", review: review
end
