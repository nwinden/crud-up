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
      console.log(pets);
      pets.forEach(function (pets) {
        $('td').append('<p>' + pets.first_name +
        '</p>');
      });
    },
  });
}
