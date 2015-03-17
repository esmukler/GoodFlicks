require 'rails_helper'

describe Movie do
  it { should validate_presence_of(:title) }
  it { should validate_uniqueness_of(:title).scoped_to(:year)}
  it { should validate_numericality_of(:year) }
  it { should allow_value(1950, 2015). for(:year) }
  it { should_not allow_value(7). for(:year) }
  it { should_not allow_value(2070). for(:year) }

end
