class Api::LibraryMoviesController < ApplicationController

  def new
  end

  def create
    @library_movie = LibraryMovie.new(lm_params)

    if @library_movie.save
      render json: @library_movie
    else
      render json: @library_movie.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @library_movie = LibraryMovie.find(params[:id])
    @library_movie.destroy
    render json: @library_movie
  end

  private

    def lm_params
      params.require(:library_movie).permit(:library_id, :movie_id)
    end

end
