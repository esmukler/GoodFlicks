class CreateReviews < ActiveRecord::Migration
  def change
    create_table :reviews do |t|
      t.integer   :user_id, null: false
      t.integer   :movie_id, null: false
      t.integer   :num_stars
      t.text      :body
      t.boolean   :is_public, { null: false, default: true }

      t.timestamps
    end
  end
end
