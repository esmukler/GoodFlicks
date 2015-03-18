json.extract! review, :id, :user_id, :movie_id, :body, :num_stars, :updated_at, :is_public

json.username review.user.username

json.mine (review.user == current_user)

json.updated_at review.updated_at.strftime('%b %d %Y %I:%M%P')
