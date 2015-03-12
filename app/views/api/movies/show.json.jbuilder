json.extract! @movie, :title, :description, :poster_img, :year, :director

json.reviews @movie.reviews do |review|
  if review.is_public
    json.partial! "api/reviews/review", review: review
  end
end
