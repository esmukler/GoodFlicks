class LibraryMovie < ActiveRecord::Base
  validates :library, :movie, presence: true
  validates :movie, uniqueness: { scope: :library,
    message: "movie already in library" }

  belongs_to :movie,
    class_name: "Movie",
    foreign_key: :movie_id,
    primary_key: :id,
    inverse_of: :library_movies

  belongs_to :library,
    class_name: "Library",
    foreign_key: :library_id,
    primary_key: :id,
    inverse_of: :library_movies


end
