class Api::StaticPagesController < ApplicationController

  def search
    if params[:query] == "users_index"
      @search_results = User.all.order(created_at: :desc).limit(20)
    else
      @search_results = User.search_by_username(params[:query])
      render "search"
    end
  end

end
