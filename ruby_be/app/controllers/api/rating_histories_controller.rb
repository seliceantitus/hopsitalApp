module Api
  class RatingHistoriesController < ApplicationController
    before_action :set_rating_history, only: [:show, :update, :destroy]

    # GET /rating_histories
    def index
      @rating_histories = RatingHistory.all

      render json: @rating_histories
    end

    # GET /rating_histories/1
    def show
      render json: @rating_history
    end

    # POST /rating_histories
    def create
      @rating_history = RatingHistory.new(rating_history_params)

      if @rating_history.save
        render json: @rating_history, status: :created, location: @rating_history
      else
        render json: @rating_history.errors, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /rating_histories/1
    def update
      if @rating_history.update(rating_history_params)
        render json: @rating_history
      else
        render json: @rating_history.errors, status: :unprocessable_entity
      end
    end

    # DELETE /rating_histories/1
    def destroy
      @rating_history.destroy
    end

    private

    # Use callbacks to share common setup or constraints between actions.
    def set_rating_history
      @rating_history = RatingHistory.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def rating_history_params
      params.permit(:hidden)
    end
  end
end
