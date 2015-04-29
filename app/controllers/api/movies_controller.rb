# encoding: utf-8
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

    check_for_strings(movie_params)

    if movie_results.first && movie_results.first.cast1_actor
      @movie = movie_results.first
      render "show"
    elsif movie_results.first
      @movie = movie_results.first

      if @movie.update(movie_params)
        critics(@movie)
        render "show"
      else
        render json: @movie.errors.full_messages, status: :unprocessable_entity
      end

    else
      @movie = Movie.new(movie_params)

      if @movie.save
        critics(@movie)
        render "show"
      else
        render json: @movie.errors.full_messages, status: :unprocessable_entity
      end
    end
  end

  def show
    @movie = Movie.find(params[:id])

    if !@movie.imdb_rating && !@movie.metacritic_rating
      critics(@movie)
    end
    
    render :show
  end

  private

    def critics(movie)
      imdb = Unirest.get "http://www.omdbapi.com/",
      parameters:{
        "t" => movie.title,
        "y" => movie.year
      }

      metacritic = Unirest.post "https://byroredux-metacritic.p.mashape.com/find/movie",
        headers:{
          "X-Mashape-Key" => ENV["MASHAPE_KEY"],
          "Content-Type" => "application/x-www-form-urlencoded",
          "Accept" => "application/json"
        },
        parameters:{
          "retry" => 4,
          "title" => movie.title
        }

      if metacritic.body["result"]
        movie.update(metacritic_rating: metacritic.body["result"]["score"],
                     metacritic_url: metacritic.body["result"]["url"])
      end

      if imdb.body["Response"] == "True"
        movie.update(imdb_rating: imdb.body["imdbRating"],
                     imdb_url: ("http://www.imdb.com/title/" + imdb.body["imdbID"]))
      end
    end

    def movie_params
      params.require(:movie)
            .permit(:title, :description, :director, :year, :poster, :budget,
                    :revenue, :tagline, :runtime, :cast1_actor, :cast1_character,
                    :cast2_actor, :cast2_character, :cast3_actor, :cast3_character,
                    :writer, :imdb_rating, :imdb_url, :metacritic_rating,
                    :metacritic_url)
    end

    def check_for_strings(mp)
      if mp["year"].class == String
        mp["year"] = mp["year"].to_i
      end
      if mp["runtime"].class == String
        mp["runtime"] = mp["runtime"].to_i
      end
      if mp["budget"].class == String
        mp["budget"] = mp["budget"].to_i
      end
      if mp["revenue"].class == String
        mp["revenue"] = mp["revenue"].to_i
      end
    end


end
