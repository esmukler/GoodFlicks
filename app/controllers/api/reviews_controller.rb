class Api::ReviewsController < ApplicationController

  def index
    @reviews = current_user.reviews.order(:updated_at => :desc).limit(5)
    render :index
  end

  def show
    @review = Review.find(params[:id])
    render :show
  end

  def new
  end

  def create
    @review = current_user.reviews.new(review_params)

    if @review.save
      render :show
    else
      render json: @review.errors.full_messages, status: :unprocessable_entity
    end
  end

  def edit
  end

  def update
    @review = Review.find(params[:id])

    if @review.update(review_params)
      render :show
    else
      render json: @review.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @review = Review.find(params[:id])
    @review.destroy
    render json: @review
  end

  private

    def review_params
      params.require(:review).permit(:movie_id, :num_stars, :body, :is_public)
    end

end
