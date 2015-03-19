json.array! @search_results do |result|
  json.extract! result, :id, :username
end
