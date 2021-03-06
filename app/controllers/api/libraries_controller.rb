class Api::LibrariesController < ApplicationController

  def index
    if current_user
      @libraries = current_user.libraries.order(:order)
      render "index"
    end
  end


  def new
  end

  def create
    @library = current_user.libraries.new(library_params)

    if @library.save
      render "show"
    else
      render json: @library.errors.full_messages, status: :unprocessable_entity
    end
  end

  def show
    @library = Library.find(params[:id])
    render :show
  end

  def edit
  end

  def update
    @library = current_user.libraries.find(params[:id])

    if @library.update(library_params)
      render "show"
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
