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

  const placesApiUrl = 'http://127.0.0.1:5001/api/v1/places_search/';
  
  function fetchPlaces(amenities) {
    $.ajax({
      url: placesApiUrl,
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ amenities: amenities }),
      success: function(data) {
        $('.places').empty();
	data.forEach(function(place) {
	  const placeHTML = `
	    <article>
	      <div class="title_box">
	        <h2>${place.name}</h2>
		<div class="price_by_night">$${place.price_by_night}</div>
	      </div>
	      <div class="information">
	        <div class="max_guest">${place.max_guest} Guest${place.max_guest != 1 ? 's' : ''}</div>
		<div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms != 1 ? 's' : ''}</div>
		<div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms != 1 ? 's' : ''}</div>
	      </div>
	      <div class="description">
	        ${place.description}
	      </div>
	    </article>
	  `;
	  $('.places').append(placeHTML);
	});
      },
      error: function(xhr, status, error) {
	console.log('Failed to fetch places:', status, error);
      }
    });
  }

  // Function to get selected amenities
  function getSelectedAmenities() {
    let selectedAmenities = [];
    $('input[type="checkbox"]:checked').each(function() {
      selectedAmenities.push($(this).data('id'));
    });
    return selectedAmenities;
  }

  // Listener for on click event on button
  $('button').click(function() {
    const amenities = getSelectedAmenities();
    fetchPlaces(amenities);
  });

  // Initial fetch to display places
  fetchPlaces([]);
});
