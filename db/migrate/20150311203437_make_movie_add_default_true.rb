class MakeMovieAddDefaultTrue < ActiveRecord::Migration
  def change
    change_column_default(:movie_adds, :is_public, true)
  end
end
