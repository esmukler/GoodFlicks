json.array! @reviews do |review|
  json.partial! "api/reviews/review", review: review

  if @feed
    json.username review.user.username
  end

  json.movie_title review.movie.title

  json.updated_at review.updated_at.to_time.strftime('%b %d %Y %I:%M%P')
end
