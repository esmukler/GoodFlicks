Rails.application.routes.draw do
  root to: "static_pages#root"

  resource :session, only: [:new, :create, :destroy]
  resources :users, except: [:show]
  namespace :api, defaults: { format: :json } do
    get "/search", to: "static_pages#search"
    resources :users, only: [:show]
    resources :movies
    resources :libraries
    resources :reviews
    resources :library_movies, only: [:create, :destroy]
  end

end
