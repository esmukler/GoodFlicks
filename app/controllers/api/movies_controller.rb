class Api::MoviesController < ApplicationController

  def index
    @movies = Movie.all
    render "index"
  end

  def new
  end

  def create
    @movie = Movie.new(movie_params)

    if @movie.save
      render "show"
    else
      render json: @movie.errors.full_messages, status: :unprocessable_entity
    end
  end

  def show
    @movie = Movie.find(params[:id])
    render :show
  end

  private

    def movie_params
      params.require(:movie)
            .permit(:title, :description, :director, :year, :poster_img)
    end


end
