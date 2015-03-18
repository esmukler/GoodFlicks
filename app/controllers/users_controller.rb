class UsersController < ApplicationController

  def index
    @users = User.all
    render :index
  end

  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      log_in(@user)
      redirect_to root_url
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end

  # def edit
  #   @user = User.find(params[:id])
  #   render json: @user
  # end

  # def update
  #   @user = User.find(params[:id])
  #   if @user.update(user_params)
  #     render json: @user
  #   else
  #     render json: @user.errors.full_messages
  #   end
  # end

  # def destroy
  #   @user = User.find(params[:id])
  #   @user.destroy
  #   render json: @user
  # end

  private

    def user_params
      params.require(:user).permit(:username, :password)
    end

end
