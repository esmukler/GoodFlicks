class Api::UsersController < ApplicationController

  def index
    if current_user
      @users = current_user.followings.all
      render 'index'
    end
  end

  def show
    @user = User.find(params[:id])
    render 'show'
  end

end
