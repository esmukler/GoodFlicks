json.array! @reviews do |review|
  json.extract! review, :id, :body, :updated_at, :num_stars, :movie_id, :user_id, :is_public

  if @feed
    json.username review.user.username
  else
    json.movie_title review.movie.title
  end

  json.updated_at review.updated_at.to_time.strftime('%b %d %Y %I:%M%P')
end
