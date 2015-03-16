class Api::StaticPagesController < ApplicationController

  def search
    if (params[:apiResults])
      byebug
    else
      @search_results = Movie.search_by_title(params[:query])
      render :search
    end
  end

end
