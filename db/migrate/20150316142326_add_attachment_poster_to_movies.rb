class AddAttachmentPosterToMovies < ActiveRecord::Migration
  def self.up
    change_table :movies do |t|
      t.attachment :poster
    end
  end

  def self.down
    remove_attachment :movies, :poster
  end
end
