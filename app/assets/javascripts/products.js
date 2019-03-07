var currentProduct = {};
var showForm = false;

$(document).ready( function() {
  $('#toggle').on('click', function() {
    showForm = !showForm;
    $('#game-form').remove()
    $('#games-list').toggle()
    
    if (showForm) {
    
      $.ajax({
        url: '/game_form',
        method: 'GET'
      }).done( function(html) {
        $('#toggle').after(html);
      });
    }
  });
  
  
  
  
  
  $('.product-item').on('click', function() {
    currentProduct.id = this.dataset.id;
    currentProduct.name = this.dataset.name;
    $.ajax({
      url: '/products/' + currentProduct.id + '/ingredients',
      method: 'GET',
      dataType: 'JSON'
    }).done( function(ingredients) {
      $('#product').text('Ingredients in ' + currentProduct.name);
      var list = $('#ingredients');
      list.empty();
      ingredients.forEach( function(char) {
        var li = '<li data-ingredient-id="' + ingredient.id + '">' + ingredient.name + '-' + '</li>'
        list.append(li)
      });
    });
  });
});