json.array! @search_results do |result|
  json.extract! result, :title, :release_date
end
