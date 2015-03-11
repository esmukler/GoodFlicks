class Library < ActiveRecord::Base
  validates :user, :title, presence: true


  belongs_to :user,
    class_name: "User",
    foreign_key: :user_id,
    primary_key: :id,
    inverse_of: :libraries

  after_initialize :set_is_public


  def set_is_public
    if self.is_public.nil?
      self.is_public = true
    end
  end



end
