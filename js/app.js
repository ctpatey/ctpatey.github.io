// This is a simple *viewmodel* - JavaScript that defines the data and behavior of your UI
function AppViewModel() {
	this.firstName = ko.observable('Bert');
	this.lastName = ko.observable('Bertington');
}


// Activates knockout.js
ko.applyBindings(new AppViewModel());







// Data. Including Ajax request for relevant info from Wikipedia
var historicLocations = [{
	name: 'Holocaust Memorial',
	lat: 42.361211,
	lng: -71.057086,
}, {
	name: 'Old State House',
	lat: 42.358781,
	lng: -71.057448,
}, {
	name: 'Paul Revere\'s House',
	lat: 42.363668,
	lng: -71.053757,
}, {
	name: 'Old North Church',
	lat: 42.366388,
	lng: -71.054360,
}, {
	name: 'Old South Meeting House',
	lat: 42.356970,
	lng: -71.058331,
}, {
	name: 'Boston Tea Party Ships and Museum',
	lat: 42.352175,
	lng: -71.051213
}];



function loadData (){

	var $wikiElem = $('#wikipedia-links');

	var wikiUrl = "https://en.wikipedia.org/w/api.php?action=opensearch&search=New_England_Holocaust_Memorial&format=json&callback=wikiCallback"

	$.ajax({
		url: wikiUrl,
		dataType: "jsonp",
		success: function( response ) {

			helloWorld(response);
			var articleList = response[1];


			console.log(response)

			for (var i = 0; i < articleList.length; i++) {
				articleStr = articleList[i];

				var url = "http://en.wikipedia.org/wiki/" + articleStr;
				$wikiElem.append("<li><a target='_blank' href='" + url + "'>" + articleStr + "</a></li>")
			};


		}
	});
};

console.log(loadData());

function helloWorld(response){
	console.log(response)
}











// GoogleMaps API integration
var map;



function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 42.3601, lng: -71.0589 },
    zoom: 15
  });

  


  


  	var largeInfoWindow = new google.maps.InfoWindow();
  	
  	var markers = []

  	for (let value of historicLocations) {
  		var marker = new google.maps.Marker({
		  	position: { lat: value.lat, lng: value.lng },
		  	map: map,
		  	animation: google.maps.Animation.DROP,
		  	title: value.name
		  });

  		markers.push(marker);

  	};

  	for (let value of markers){
	  	value.addListener('click', function (){
  			populateInfoWindow(this, largeInfoWindow);
  			
  			this.setAnimation(google.maps.Animation.BOUNCE);
			  	
  		});
	  };

  	function populateInfoWindow (marker, infowindow) {
  		if (infowindow.marker != marker) {
  			infowindow.marker = marker;
  			infowindow.setContent('<div>' + marker.title + '</div>');
  			infowindow.open(map, marker);
  	
  		}
  	}
  	
  	
}



// Here's my data model
var ViewModel = function(first, last) {
    this.firstName = ko.observable(first);
    this.lastName = ko.observable(last);
 
    this.fullName = ko.pureComputed(function() {
        // Knockout tracks dependencies automatically. It knows that fullName depends on firstName and lastName, because these get called when evaluating fullName.
        return this.firstName() + " " + this.lastName();
    }, this);
};
 


$(document).ready(function(){
    ko.applyBindings(new ViewModel("Planet", "Earth"));
});


















