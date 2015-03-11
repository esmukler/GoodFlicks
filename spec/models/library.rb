require 'rails_helper'

describe Library do
  it { should validate_presence_of(:title) }
  it { should belong_to(:user) }

  it "is invalid if no is_public attribute" do
    lib = Library.new(title: "sample", user_id: 1)
    expect(lib.save).to be(false)
  end
end
