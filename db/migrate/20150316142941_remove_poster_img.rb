class RemovePosterImg < ActiveRecord::Migration
  def change
    remove_column :movies, :poster_img, :string
  end
end
