class Review < ActiveRecord::Base
  validates :user, :movie, presence: true
  validates_inclusion_of :num_stars, :in => 0..5

  belongs_to :user,
    class_name: "User",
    foreign_key: :user_id,
    primary_key: :id,
    inverse_of: :reviews

  belongs_to :movie,
    class_name: "Movie",
    foreign_key: :movie_id,
    primary_key: :id,
    inverse_of: :reviews

  after_initialize :set_is_public

  def set_is_public
    if self.is_public.nil?
      self.is_public = true
    end
  end

end
