class Product < ApplicationRecord

has_many :ingredients, dependent: :destroy
validates_presence_of :name

end
