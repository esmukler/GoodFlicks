require 'spec_helper'

feature "the signup process" do

  it "has a new user page" do
    visit ('/users/new')
    fill_in('Username', :with => "alphadog")
    fill_in('Password', :with => "abcdefg")
    click_button('Sign Up')
  end


end
