class CreateLibraries < ActiveRecord::Migration
  def change
    create_table :libraries do |t|
      t.integer   :user_id, null: false
      t.string    :title,   null: false
      t.integer   :order
      t.boolean   :is_public, { default: true, null: false }

      t.timestamps
    end
  end
end
