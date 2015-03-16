Rails.application.routes.draw do
  root to: "static_pages#root"

  resources :users
  resource :session
  namespace :api, defaults: { format: :json } do
    get "/search", to: "static_pages#search"
    resources :movies
    resources :libraries
    resources :reviews
    resources :library_movies, only: [:create, :destroy]
  end

end
