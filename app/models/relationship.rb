class Relationship < ActiveRecord::Base
  validates :follower_id, :followed_id, presence: true
  validates :follower_id, uniqueness: { scope: :followed_id }
  validates :followed_id, uniqueness: { scope: :follower_id }

  belongs_to :follower,
    class_name: "User",
    foreign_key: :follower_id,
    primary_key: :id,
    inverse_of: :active_relationships

  belongs_to :followed,
    class_name: "User",
    foreign_key: :followed_id,
    primary_key: :id,
    inverse_of: :passive_relationships


end
