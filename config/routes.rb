Rails.application.routes.draw do
  root 'products#index'


  get 'product_form', to: 'products#form'


  resources :products do
    resources :ingredients
  end
  
  
end
