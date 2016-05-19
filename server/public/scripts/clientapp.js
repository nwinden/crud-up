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

  $.get('/owners', function(owners) {

    console.log(owners);
    $('.owner_name').empty();

    owners.forEach(function(owner) {
      $('.owner_name').append('<option value="' + owner.id + '" class="selecter ' + owner.first_name + '">' + owner.first_name + ' ' + owner.last_name + '</option>');
      $('.' + owner.first_name).data('ownerID', owner.id);
    });

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
