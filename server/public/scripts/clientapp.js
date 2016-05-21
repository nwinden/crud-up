var data = [];

$(function() {

	addToDropdown();


	$('.update').on('click', updatePet);
	$('.registerOwner').on('click', registerOwner);
	getPets();

	$('.table').on('click', '.delete', function() {

		deletePet($(this).parent().parent().find('.arrayIndex').text());

	});

	$('.addPet').on('click', function() {

		addPet();
	});

	$('.table').on('click', '.check_in', function() {
    var checkIn = {};

    checkIn['check_in_date'] = Date();
    checkIn['pet_id'] = data[$(this).parent().parent().find('.arrayIndex').text() - 1].id;

    $.ajax({
      type: 'POST',
      url: '/pets/check_in',
      data: checkIn,
      success: function(){

      }

    })
		$(this).replaceWith('<button class="check_out">OUT</button>');

	});


	$('.table').on('click', '.check_out', function() {
    var checkOut = {};

    checkOut['check_out_date'] = Date();
    checkOut['pet_id'] = data[$(this).parent().parent().find('.arrayIndex').text() - 1].id;

    $.ajax({
      type: 'PUT',
      url:'/pets/check_out',
      data: checkOut,
      success: function(){

      }

    })
    $(this).replaceWith('<button class="check_in">IN</button>');
	});

	$('.table').on('click', '.update', function() {
		var updateInfo = {};
		updateInfo['id'] = data[$(this).parent().parent().find('.arrayIndex').text()].id - 1;
		updateInfo['pet_name'] = $(this).parent().parent().find('.pet_name').val();
		updateInfo['breed'] = $(this).parent().parent().find('.breed').val();
		updateInfo['color'] = $(this).parent().parent().find('.pet_color').val();
		console.log('if update info is cool we win', updateInfo);
		updatePet(updateInfo);
	})


});

function updatePet(pet) {
	event.preventDefault();

	$.ajax({
		type: 'PUT',
		url: '/pets',
		data: pet,
		success: function() {

			getPets();
		}
	});
};


function registerOwner() {

	event.preventDefault();

	var owner = {};

	$.each($('.owner-registration').serializeArray(), function(i, field) {

		owner[field.name] = field.value;

	});

	$.post('/owners', owner, function(response) {

		addToDropdown();

	});

}

function addToDropdown() {

	$.get('/owners', function(owners) {

		console.log(owners);
		$('.owner_id').empty();

		owners.forEach(function(owner) {
			$('.owner_id').append('<option value="' + owner.id + '" class="selecter ' + owner.first_name + '">' + owner.first_name + ' ' + owner.last_name + '</option>');
			$('.' + owner.first_name).data('ownerID', owner.id);
		});

	});


}

function deletePet(target) {
	$.ajax({
		type: 'DELETE',
		url: '/pets',
		data: data[target - 1],
		success: function() {
			console.log('didnt fail');
			getPets();
		}
	});
}

function getPets() {
	$.ajax({
		type: 'GET',
		url: '/pets',
		success: function(pets) {
			data = pets;
			$('.target-container').empty();
			for (var i = 0; i < data.length; ++i) {
				appendPet(i);
			}
		}
	})
}



function addPet() {

	event.preventDefault();

	var pet = {};

	$.each($('.pet-registration').serializeArray(), function(i, field) {
		pet[field.name] = field.value;
	});


	$.ajax({
		type: 'POST',
		url: '/pets',
		data: pet,
		success: function(success) {

			getPets();
		}

	});



}

function appendPet(registeredOwner) {
	//console.log('this ran', data[registeredOwner].first_name);
	console.log(data);
	var targetData = data[registeredOwner]
	$('.target-container').append('<tr><td class="arrayIndex">' + (registeredOwner + 1) + '</td><td>' + targetData.first_name + ' ' + targetData.last_name + '</td><td><input class="pet_name" name="pet_name" type="text" value="' + targetData.pet_name + '"></input></td><td><input class="breed" name="breed" type="text" value="' + targetData.breed + '"></input></td><td><input class="pet_color" name="color" type="text" value="' + targetData.color + '"></input></td> <td> <button class="update"> Go </button> </td><td> <button class="delete"> Go </button> </td><td> <button class="check_in"> IN </button> </td>  </tr>')


}
