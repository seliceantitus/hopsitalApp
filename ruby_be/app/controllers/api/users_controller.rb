module Api
  class UsersController < ApplicationController
    def index
      users = User.all
      render :json => users
    end
    
    def show
      user = User.find(params[:id])
      render :json => user
    end

    def destroy
      user = User.find(params[:id])
      user.destroy!
      render :json => user
    end

    def user_params
      params.permit(:name, :email, :role, :password, :image)
    end
  end
end
