class Api::UsersController < ApplicationController

  def index
    @users = current_user.followings.all
    render 'index'
  end


  def show
    @user = User.find(params[:id])
    render 'show'
  end

end
