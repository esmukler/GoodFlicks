class Api::LibraryMoviesController < ApplicationController

  def new
  end

  def create
    @library_movie = LibraryMovie.find_by(:library_id => lm_params["library_id"], :movie_id => lm_params["movie_id"])


    if @library_movie
      @library_movie.destroy
      @movie = @library_movie.movie
      render "api/movies/show"
    else
      @library_movie = LibraryMovie.new(lm_params)

      if @library_movie.save
        @movie = @library_movie.movie
        render "api/movies/show"
      else
        render json: @library_movie.errors.full_messages, status: :unprocessable_entity
      end
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
