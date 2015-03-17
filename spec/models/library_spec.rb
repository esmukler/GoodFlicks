require 'rails_helper'

describe Library do
  it { should validate_presence_of(:title) }
  it { should belong_to(:user) }

  it "is invalid if no is_public attribute" do
    rev = Review.new(movie_id: 1, user_id: 1)
    expect(rev.save).to be(false)
  end
end
