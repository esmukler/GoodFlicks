class AddMoreMovieColumns < ActiveRecord::Migration
  def change
    add_column :movies, :budget,  :integer
    add_column :movies, :revenue, :integer
    add_column :movies, :tagline, :text
    add_column :movies, :runtime, :integer
    add_column :movies, :cast1_actor, :string
    add_column :movies, :cast1_character, :string
    add_column :movies, :cast2_actor, :string
    add_column :movies, :cast2_character, :string
    add_column :movies, :cast3_actor, :string
    add_column :movies, :cast3_character, :string
    add_column :movies, :writer, :string

  end
end
