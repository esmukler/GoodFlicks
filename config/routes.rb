Rails.application.routes.draw do
  root to: "static_pages#root"

  resource :session, only: [:new, :create, :destroy] do
    member { get :demo_sign_in }
  end
  resources :users, except: [:show]
  namespace :api, defaults: { format: :json } do
    get "/search", to: "static_pages#search"
    resources :users, only: [:index, :show]
    resources :movies do
      member { get :critics }
    end
    resources :libraries
    resources :reviews do
      collection { get :feed }
    end
    resources :relationships, only: [:create, :destroy]
    resources :library_movies, only: [:create, :destroy]
  end

end
