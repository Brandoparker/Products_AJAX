class Product < ApplicationRecord

has_many :ingredients, dependent: :destroy
end
