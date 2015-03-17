class Library < ActiveRecord::Base
  validates :user, presence: true
  validates :title, presence: true, allow_blank: false

  belongs_to :user,
    class_name: "User",
    foreign_key: :user_id,
    primary_key: :id,
    inverse_of: :libraries

  has_many :library_movies,
    class_name: "LibraryMovie",
    foreign_key: :library_id,
    primary_key: :id,
    inverse_of: :library

  has_many :movies, through: :library_movies, source: :movie

  has_many :reviews, through: :movies, source: :reviews

  after_initialize :set_is_public


  def set_is_public
    if self.is_public.nil?
      self.is_public = true
    end
  end

end
