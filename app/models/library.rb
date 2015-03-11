class Library < ActiveRecord::Base
  validates :user, :title, :is_public, presence: true


  belongs_to :user,
    class_name: "User",
    foreign_key: :user_id,
    primary_key: :id,
    inverse_of: :libraries


end
