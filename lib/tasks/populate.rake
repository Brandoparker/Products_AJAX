namespace :populate do
  desc "Populate Products"
  task products: :environment do
    30.times do
      product = Product.create(name: Faker::Beer.brand, description: Faker::Beer.name)
      2.times { Ingredient.create(name: Faker::Beer.style, product_id: product.id) }
    end
  end

end
