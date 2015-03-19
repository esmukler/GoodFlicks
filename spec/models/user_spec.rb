require 'rails_helper'

describe User do
  it { should validate_length_of(:password).is_at_least(6) }
  it { should validate_presence_of(:username) }
  it { should validate_presence_of(:session_token) }
  it { should have_many(:libraries) }
  it { should have_many(:active_relationships) }
  it { should have_many(:passive_relationships) }
  it { should have_many(:followings) }
  it { should have_many(:followers) }
end
