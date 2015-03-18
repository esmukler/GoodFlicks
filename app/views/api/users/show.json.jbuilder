json.extract! @user, :id, :username

json.is_current_user (@user == current_user)

json.libraries @user.libraries.where(is_public: true).order(:order) do |library|
    json.partial! "api/libraries/library", library: library
end

json.reviews @user.reviews.where(is_public: true).order(:updated_at).limit(5) do |review|
  json.extract! review, :id, :movie_id, :body, :num_stars, :updated_at

  json.movie_title review.movie.title

  json.updated_at review.updated_at.strftime('%b %d %Y %I:%M%P')
end
