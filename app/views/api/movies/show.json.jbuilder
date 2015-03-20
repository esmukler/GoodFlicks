json.extract! @movie, :title, :description, :year, :director, :id

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
