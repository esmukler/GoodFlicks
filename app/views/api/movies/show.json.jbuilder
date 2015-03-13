json.extract! @movie, :title, :description, :poster_img, :year, :director

json.reviews @movie.reviews do |review|
  if review.is_public
    json.partial! "api/reviews/review", review: review
  end
end

json.libraries @movie.libraries do |library|
  json.partial! "api/libraries/library", library: library
end
