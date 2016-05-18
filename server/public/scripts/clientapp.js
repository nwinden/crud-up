$(function() {

  addToDropdown();


  $('.registerOwner').on('click', registerOwner);


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
