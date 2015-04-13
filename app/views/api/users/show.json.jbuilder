json.extract! @user, :id, :username

json.is_current_user (@user == current_user)

json.followed current_user.followings.include?(@user)

json.libraries @user.libraries.where(is_public: true).order(:order) do |library|
  json.partial! "api/libraries/library", library: library
end

json.reviews @user.reviews.where(is_public: true).order(updated_at: :desc).limit(5) do |review|
  json.partial! "api/reviews/review", review: review

  json.movie_title review.movie.title

  json.movie_poster image_url(review.movie.poster.url(:thumb))
end

json.followings @user.followings do |user|
  json.extract! user, :id, :username
  if (user == current_user)
    json.is_cu true
  end
end
