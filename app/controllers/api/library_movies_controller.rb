class LibraryMoviesController < ApplicationController

  def new
  end

  def create
    @library_movie = current_user.library_movies.new

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

end
