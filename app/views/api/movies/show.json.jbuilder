json.extract! @movie, :title, :description, :poster_img, :year, :director

json.reviews (@movie.reviews) do |review|
  if review.is_public
    json.extract! review, :id, :body, :user_id, :num_stars, :is_public
  end
end
