module Api
  class MedicsController < ApplicationController
    before_action :set_medic, only: [:show, :update, :destroy]

    def index
      medics = Medic.all
      render :json => medics
    end

    def show
      medic = Medic.find(params[:id])
      render :json => medic
    end

    def create
      medic = Medic.new(medic_params)
      if medic.save
        rating = Rating.new({idMedic: medic.id, average: 0})
        if !rating.save
          render :json => {status: 403, data: rating.errors}
        end
        render :json => {medic: medic, rating: rating}
      else
        render json: {status: 403, data: medic.errors}
      end
    end

    def update
      if @medic.update(medic_params)
        render json: @medic
      else
        render json: {status: 403, error: @medic.errors}
      end
    end

    def destroy
      medic = Medic.find(params[:id])
      medic.destroy!
      render :json => medic
    end

    def set_medic
      @medic = Medic.find(params[:id])
    end

    private

    def medic_params
      params.permit(:name, :specialization, :graduation_year, :image)
    end

    def rating_params
      params.permit(:idMedic, :average)
    end
  end
end

