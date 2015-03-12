class CreateLibraryMovies < ActiveRecord::Migration
  def change
    create_table :library_movies do |t|
      t.integer   :library_id, null: false
      t.integer   :movie_id, null: false

      t.timestamps
    end
  end
end
