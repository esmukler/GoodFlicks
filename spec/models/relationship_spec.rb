require 'rails_helper'

describe Relationship do

  it { should validate_presence_of(:follower_id) }
  it { should validate_presence_of(:followed_id) }
  it { should belong_to(:follower) }
  it { should belong_to(:followed) }
  it { should validate_uniqueness_of(:follower_id).scoped_to(:followed_id) }
  it { should validate_uniqueness_of(:followed_id).scoped_to(:follower_id) }
end
