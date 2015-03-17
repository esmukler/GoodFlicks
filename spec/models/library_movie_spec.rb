require 'rails_helper'

describe LibraryMovie do
  it { should belong_to(:movie) }
  it { should belong_to(:library) }

end
