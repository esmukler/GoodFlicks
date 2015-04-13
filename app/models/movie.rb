class Movie < ActiveRecord::Base
  include PgSearch
  pg_search_scope :search_by_title,
                  against: :title,
                  using: {
                    tsearch: { prefix: true }
                  }

  validates :title, presence: true
  validates :title, uniqueness: { scope: :year }
  validates :year, numericality: { only_integer: true }
  validates_inclusion_of :year, in: 1896..(Time.now.year + 10)

  has_attached_file :poster, styles: {thumb: "75x100"}, convert_options: {thumb: "-resize 75x100"}, default_url: "/images/:style/oscar-statue.jpg"
  validates_attachment_content_type :poster, :content_type => /\Aimage\/.*\Z/
  before_post_process :check_file_size

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

  def check_file_size
    if self.poster_file_size > 1048576
      self.poster.url = "/images/oscar-statue.jpg"
    end
  end

end
