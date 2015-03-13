json.array! @libraries do |library|
  json.partial! "api/libraries/library", library: library
end
