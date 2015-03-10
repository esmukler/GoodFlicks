class CreateMovies < ActiveRecord::Migration
  def change
    create_table :movies do |t|
      t.string    :title, null: false
      t.text      :description
      t.string    :poster_img
      t.integer   :year
      t.string    :director

      t.timestamps
    end
  end
end
