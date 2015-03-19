class Api::RelationshipsController < ApplicationController

  def new
  end

  def create
    @relationship = Relationship.find_by(
          followed_id: relationship_params[:followed_id],
          follower_id: current_user.id)

    if @relationship
      @relationship.destroy
      @user = @relationship.followed
      render "api/users/show"
    else
      @relationship = current_user.active_relationships.new(relationship_params)

      if @relationship.save
        @user = @relationship.followed
        render "api/users/show"
      else
        render json: @relationship.errors.full_messages, status: :unprocessable_entity
      end
    end
  end

  def destroy
    @relationship = Relationship.find(params[:id])
    @relationship.destroy
    render json: @relationship
  end

  private

    def relationship_params
      params.require(:relationship).permit(:followed_id)
    end

end
