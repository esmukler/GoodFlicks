class SessionsController < ApplicationController

  def new
    @credentials = true
    user = User.new
    render :new
  end

  def create
    user = User.find_by_credentials(params[:user][:username],
                                    params[:user][:password])
    if user
      log_in(user)
      redirect_to root_url
    else
      flash.now[:errors] = ['That information does not match our files']
      render :new
    end
  end

  def destroy
    logout
    redirect_to new_session_url
  end


end
