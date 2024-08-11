$(document).ready(function () {
  const selectedAmenities = {};

  $('input[type="checkbox"]').change(function () {
    const amenityId = $(this).data('id');
    const amenityName = $(this).data('name');

    if ($(this).is(':checked')) {
      selectedAmenities[amenityId] = amenityName;
    } else {
      delete selectedAmenities[amenityId];
    }

    const amenitiesList = Object.values(selectedAmenities).join(', ');
    $('div.amenities h4').text(amenitiesList);
  });

  const apiUrl = 'http://127.0.0.1:5001/api/v1/status/';
	
  function checkApiStatus() {
    $.get(apiUrl, function (data) {
      if (data.status === 'OK') {
        $('#api_status').addClass('available');
      } else {
	$('#api_status').removeClass('available');
      }
    }).fail(function () {
	$('#api_status').removeClass('available');
    });
  }

  checkApiStatus();
});
