$(document).ready(function () {
  getPets();


});

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
