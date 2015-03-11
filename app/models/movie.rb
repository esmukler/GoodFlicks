class Movie < ActiveRecord::Base
  validates :title, presence: true
  validates :year, numericality: { only_integer: true }
  validates_inclusion_of :year, in: 1896..(Time.now.year + 2)

  has_many :reviews,
    class_name: "Review",
    foreign_key: :movie_id,
    primary_key: :id,
    inverse_of: :movie

  has_many :reviewing_users, through: :reviews, source: :user

end
