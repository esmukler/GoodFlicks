json.array! @libraries do |library|
  json.extract! library, :id, :title, :order, :is_public, :user_id
end
