module Api
  class UnitTypesController < ApplicationController
    before_action :set_unit_type, only: [:show, :update, :destroy]

    # GET /unit_types
    def index
      @unit_types = UnitType.all


      render json: @unit_types
    end

    # GET /unit_types/1
    def show
      render json: @unit_type
    end

    # POST /unit_types
    def create
      @unit_type = UnitType.new(unit_type_params)

      if @unit_type.save
        render json: @unit_type, status: :created, location: @unit_type
      else
        render json: @unit_type.errors, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /unit_types/1
    def update
      if @unit_type.update(unit_type_params)
        render json: @unit_type
      else
        render json: @unit_type.errors, status: :unprocessable_entity
      end
    end

    # DELETE /unit_types/1
    def destroy
      @unit_type.destroy
    end

    private

    # Use callbacks to share common setup or constraints between actions.
    def set_unit_type
      @unit_type = UnitType.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def unit_type_params
      params.permit(:type)
    end
  end
end
