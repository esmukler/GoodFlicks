json.extract! review, :id, :user_id, :movie_id, :num_stars, :updated_at, :is_public

if review.body.length > 300
  json.body simple_format(review.body, class: "long-text")
else
  json.body simple_format(review.body)
end

json.movie_poster image_url(review.movie.poster.url(:thumb))

json.username review.user.username

json.mine (review.user == current_user)

json.updated_at review.updated_at.to_time.strftime('%b %d %Y %I:%M%P')
