class Api::StaticPagesController < ApplicationController

  def search
    @search_results = User.search_by_username(params[:query])
    render "search"
  end

end
