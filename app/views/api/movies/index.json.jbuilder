json.array! @movies do |movie|
  json.extract! movie, :id, :title, :description, :poster_img, :year, :director
end
