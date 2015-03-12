json.extract! review, :id, :user_id, :body, :num_stars, :updated_at, :is_public

json.username review.user.username

json.updated_at review.updated_at.strftime('%b %d %Y %I:%M%P')
