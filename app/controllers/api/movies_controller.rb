class Api::MoviesController < ApplicationController

  def index
    @movies = Movie.all
    render json: @movies
  end

  def new
  end

  def create
    @movie = Movie.new(movie_params)

    if @movie.save
      render json: @movie
    else
      render json: @movie.errors.full_messages, status: :unprocessable_entity
    end
  end

  def show
    @movie = Movie.find(params[:id])
    render json: @movie
  end

  private

    def movie_params
      params.require(:movie)
            .permit(:title, :description, :director, :year, :poster_img)
    end


end
