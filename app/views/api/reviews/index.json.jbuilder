json.array! @reviews do |review|
  json.extract! review, :id, :body, :updated_at, :num_stars, :movie_id, :user_id, :is_public

  json.movie_title review.movie.title

  json.updated_at review.updated_at.strftime('%b %d %Y %I:%M%P')
end
