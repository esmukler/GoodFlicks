class Api::MoviesController < ApplicationController

  def index
    @movies = Movie.all.order("updated_at DESC").limit(10)
    render "index"
  end

  def new
  end

  def create
    movie_results = Movie.where(title: params[:movie][:title],
                                year: params[:movie][:year])

    if movie_results.first
      @movie = movie_results.first
      render "show"
    else
      @movie = Movie.new(movie_params)

      if @movie.save
        render "show"
      else
        render json: @movie.errors.full_messages, status: :unprocessable_entity
      end
    end

  end

  def show
    @movie = Movie.find(params[:id])
    render :show
  end

  def metacritic
    @metacritic = Unirest.post "https://byroredux-metacritic.p.mashape.com/find/movie",
      headers:{
        "X-Mashape-Key" => ENV["MASHAPE_KEY"],
        "Content-Type" => "application/x-www-form-urlencoded",
        "Accept" => "application/json"
      },
      parameters:{
        "retry" => 4,
        "title" => Movie.find(params[:id]).title
      }
    render json: @metacritic
  end

  private

    def movie_params
      params.require(:movie)
            .permit(:title, :description, :director, :year, :poster)
    end


end
