class Library < ActiveRecord::Base
  validates :user, :title, presence: true

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

  after_initialize :set_is_public


  def set_is_public
    if self.is_public.nil?
      self.is_public = true
    end
  end

end
