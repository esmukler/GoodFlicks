require 'rails_helper'

describe Library do
  it { should validate_presence_of(:title) }
  it { should validate_presence_of(:is_public) }
  it { should belong_to(:user) }

end
