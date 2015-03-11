class DropMovieAdds < ActiveRecord::Migration
  def change
    drop_table(:movie_adds)
  end
end
