var data = [];

$(function() {

  addToDropdown();


  $('.registerOwner').on('click', registerOwner);

  getPets();


});



function registerOwner() {

  event.preventDefault();

  var owner = {};

  $.each($('.owner-registration').serializeArray(), function (i,field) {

    owner[field.name] = field.value;

  });

  $.post('/owners', owner, function(response) {

    addToDropdown();

  });

}

function addToDropdown() {

  $.get('/owners', function(response) {

    console.log(response);

  });

}

function getPets() {
  $.ajax({
    type: 'GET',
    url: '/pets',
    success: function (pets) {
      data = pets;
      console.log(data[0]);
      appendPet(0);
    }
  })
}



function appendPet (registeredOwner) {
  //console.log('this ran', data[registeredOwner].first_name);
   var targetData = data[registeredOwner]
  $('.target-container').append('<tr><div><td>' + targetData.first_name + ' ' + targetData.last_name + '</td><td>' + targetData.pet_name + '</td><td>' + targetData.breed + '</td><td>' + targetData.color + '</td> <td> <button class="update"> Go </button> </td><td> <button class="delete"> Go </button> </td><td> <button class="checked_in"> IN </button> </td>  </tr>' )


}
