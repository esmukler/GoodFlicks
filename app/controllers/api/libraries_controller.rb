class Api::LibrariesController < ApplicationController

  def index
    @libraries = current_user.libraries
    render json: @libraries
  end

  def new
  end

  def create
    @library = Library.new(library_params)

    if @library.save
      render json: @library
    else
      render json: @library.errors.full_messages, status: :unprocessable_entity
    end
  end

  def show
    @libary = Library.find(params[:id])
    render json: @library
  end

  def update
    @library = Library.find(params[:id])

    if @library.update(library_params)
      render json: @library
    else
      render json: @library.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @library = Library.find(params[:id])
    @library.destroy
    render json: @library
  end

  private

    def library_params
      params.require(:library).permit(:title, :order, :is_public)
    end

end
