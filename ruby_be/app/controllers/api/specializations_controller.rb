module Api
  class SpecializationsController < ApplicationController
    before_action :set_specialization, only: [:show, :update, :destroy]

    # GET /specializations
    def index
      @specializations = Specialization.all

      render json: @specializations
    end

    # GET /specializations/1
    def show
      render json: @specialization
    end

    # POST /specializations
    def create
      @specialization = Specialization.new(specialization_params)

      if @specialization.save
        render json: @specialization, status: :created, location: @specialization
      else
        render json: @specialization.errors, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /specializations/1
    def update
      if @specialization.update(specialization_params)
        render json: @specialization
      else
        render json: @specialization.errors, status: :unprocessable_entity
      end
    end

    # DELETE /specializations/1
    def destroy
      @specialization.destroy
    end

    private

    # Use callbacks to share common setup or constraints between actions.
    def set_specialization
      @specialization = Specialization.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def specialization_params
      params.fetch(:specialization, {})
    end
  end
end
