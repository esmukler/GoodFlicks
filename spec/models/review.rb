require 'rails_helper'

describe Review do
  it { should belong_to(:movie) }
  it { should belong_to(:user) }
  it { should validate_presence_of(:is_public) }
  it { should validate_inclusion_of(:num_stars).in_range(0..5) }
  it { should validate_inclusion_of(:is_public).in_array([true, false]) }

end
