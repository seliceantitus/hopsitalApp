Rails.application.routes.draw do
  namespace 'api' do
    resources :users
    resources :medical_units
    resources :medics
    resources :rating_histories
    resources :unit_types
    resources :specializations
    resources :ratings
  end
end
