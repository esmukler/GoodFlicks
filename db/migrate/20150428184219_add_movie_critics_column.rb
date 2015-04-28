class AddMovieCriticsColumn < ActiveRecord::Migration
  def change
    add_column :movies, :imdb_rating,       :string
    add_column :movies, :imdb_url,          :string
    add_column :movies, :metacritic_rating, :string
    add_column :movies, :metacritic_url,    :string

  end
end
