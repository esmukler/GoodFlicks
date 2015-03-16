class Api::StaticPagesController < ApplicationController

  def search
    @search_results = Movie.search_by_title(params[:query])

    render :search
  end

end
