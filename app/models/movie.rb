class Movie < ActiveRecord::Base
  validates :title, presence: true
  validates :year, numericality: { only_integer: true }
  validates_inclusion_of :year, in: 1896..(Time.now.year + 2)
end
