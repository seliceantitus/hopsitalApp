module Api
  class MedicalUnitsController < ApplicationController
    before_action :set_unit, only: [:show, :update, :destroy]

    def index
      units = MedicalUnit.all
      render :json => units
    end

    def show
      unit = MedicalUnit.find(params[:id])
      render :json => unit
    end

    def create
      unit = MedicalUnit.new(medical_units_params)
      if unit.save
        render :json => unit
      else
        render json: {status: 403, data: unit.errors}
      end
    end

    def update
      if @unit.update(medical_units_params)
        render json: @unit
      else
        render json: {status: 403, error: @unit.errors}
      end
    end

    def destroy
      unit = MedicalUnit.find(params[:id])
      unit.destroy!
      render :json => unit
    end

    private

    def set_unit
      @unit = MedicalUnit.find(params[:id])
    end

    def medical_units_params
      params.permit(:name, :type, :location, :logo)
    end
  end
end

