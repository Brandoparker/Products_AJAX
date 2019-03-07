class IngredientsController < ApplicationController
  before_action :set_product, only: [:index, :create]
  before_action :set_ingredient, only: [:show, :update, :destroy]

  def index
   render json: @product.ingredients
  end

  def show
   render json: @ingredient
  end

  def create
    @ingredient = @product.ingredients.new(ingredient_params)
    if @ingredient.save
      render json: @ingredient
    else
      render_error(@ingredient)
    end
  end

  def update
    if @ingredient.update(ingredient_params)
      render json: @ingredient
    else
      render_error(@ingredient)
    end
  end

  def destroy
    @ingredient.destroy
    render json: { message: 'removed' }, status: :ok
  end

  private
    def set_product
      @product = Product.find(params[:product_id])
    end

    def set_ingredient
      @ingredient = Ingredient.find(params[:id])
    end

    def character_params
      params.require(:ingredient).permit(:name)
    end
end