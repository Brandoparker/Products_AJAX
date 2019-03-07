var currentProduct = {};
var showForm = false;

$(document).ready( function() {
  
  $('#toggle').on('click', function() {
    toggle();
  })
    
    
    
    
  function toggle() {
    showForm = !showForm;
    $("#product-form").remove();
    $("#products-list").toggle();
    
    
    if (showForm) {
      $.ajax({
        url: '/product_form',
        method: 'GET'
      }).done( function(html) {
        $('#toggle').after(html);
      });
    }
  }
  
  $(document).on('submit', '#product-form form', function(e) {
    e.preventDefault();
    var data = $(this).serializeArray();
    $.ajax({
      url: '/products',
      type: 'POST',
      dataType: 'JSON',
      data: data
    }).done( function(product) {
      toggle();
      var g = '<li class="product-item" data-id="' + product.id + '" data-name="' + product.name + '">' + product.
      name + '-' + product.name + '</li>';
      $('#products-list').append(g);
    }).fail( function(err) {
      alert(err.responseJSON.errors)
    });
  });
  
  
  
  $(documents).on('click', "product-item", function() {
    currentProduct.id = this.dataset.id;
    currentProduct.name = this.dataset.name;
    $.ajax({
      url: '/products/' + currentProduct.id + '/ingredients',
      method: 'GET',
      dataType: 'JSON'
    }).done( function(ingredients) {
      var list = $('#ingredients');
      $('#product').text('Ingredients in ' + currentProduct.name);
      list.empty();
      ingredients.forEach( function(char) {
        var li = '<li data-ingredient-id="' + ingredient.id + '">' + ingredient.name + '-' + '</li>'
        list.append(li)
      });
    });
  });
});