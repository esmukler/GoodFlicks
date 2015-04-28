class EditMovieMoneyColumns < ActiveRecord::Migration
  def change
    change_column :movies, :budget, :integer, limit: 8
    change_column :movies, :revenue, :integer, limit: 8
  end
end
