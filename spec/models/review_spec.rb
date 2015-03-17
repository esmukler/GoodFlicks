require 'rails_helper'

describe Review do
  it { should belong_to(:movie) }
  it { should belong_to(:user) }
  it { should validate_inclusion_of(:num_stars).in_range(0..5) }

  it "is invalid if no is_public attribute" do
    rev = Review.new(movie_id: 1, user_id: 1)
    expect(rev.save).to be(false)
  end
end
