class Movie < ActiveRecord::Base
  include PgSearch
  pg_search_scope :search_by_title,
                  against: :title,
                  using: {
                    tsearch: { prefix: true }
                  }

  validates :title, presence: true
  validates :year, numericality: { only_integer: true }
  validates_inclusion_of :year, in: 1896..(Time.now.year + 2)

  has_attached_file :poster, :styles => { :medium => "300x300>", :thumb => "100x100>"}, default_url: "https://s3.amazonaws.com/goodflicks-dev/oscar-statue.jpg"
  validates_attachment_content_type :poster, :content_type => /\Aimage\/.*\Z/

  has_many :library_movies,
    class_name: "LibraryMovie",
    foreign_key: :movie_id,
    primary_key: :id,
    inverse_of: :movie

  has_many :reviews,
    class_name: "Review",
    foreign_key: :movie_id,
    primary_key: :id,
    inverse_of: :movie

  has_many :libraries, through: :library_movies, source: :library

  has_many :reviewing_users, through: :reviews, source: :user

end
