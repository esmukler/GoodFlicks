class CreateMovieAdds < ActiveRecord::Migration
  def change
    create_table :movie_adds do |t|
      t.integer   :library_id, null: false
      t.integer   :movie_id, null: false
      t.integer    :num_stars
      t.text      :review
      t.boolean   :is_public, null: false

      t.timestamps
    end
  end
end
