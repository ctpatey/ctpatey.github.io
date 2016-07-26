// Data. Including Ajax request for relevant info from Wikipedia
var historicLocations = 
  [{
    "name": "Holocaust Memorial",
    "lat": 42.361211,
    "lng": -71.057086,
    "wikiPageid": 15507987
  }, {
    "name": "Old State House",
    "lat": 42.358781,
    "lng": -71.057448,
    "wikiPageid": 1418090
  }, {
    "name": "Paul Revere's House",
    "lat": 42.363668,
    "lng": -71.053757,
    "wikiPageid": 2709194
  }, {
    "name": "Old North Church",
    "lat": 42.366388,
    "lng": -71.054360,
    "wikiPageid": 667505
  }, {
    "name": "Old South Meeting House",
    "lat": 42.356970,
    "lng": -71.058331,
    "wikiPageid": 1115450
  }, {
    "name": "Boston Tea Party Ships and Museum",
    "lat": 42.352175,
    "lng": -71.051213,
    "wikiPageid": 4608353
  }]



function loadData (){

  var $wikiElem = $('#wikipedia-links');
  
  var wikiUrl = "https://en.wikipedia.org/w/api.php?"

  $.ajax({
    url: wikiUrl,
    dataType: "jsonp",
    success: function( response ) {

      
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

loadData();






// GoogleMaps API integration
var map;



function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 42.3601, lng: -71.0589 },
    zoom: 15
  });

  
  ko.applyBindings(new ViewModel());

}


// Here's my data model
var ViewModel = function() {
    var self = this;
    self.locations = ko.observableArray(historicLocations);
    
    
    self.clickFunction = function() {
      
    }

    var largeInfoWindow = new google.maps.InfoWindow();

    self.locations().forEach(function(location) {

	    var marker = new google.maps.Marker ({
	      map: map,
	      position: { lat: location.lat, lng: location.lng },
	      title: location.name,
	      animation: google.maps.Animation.DROP    

	    })
	      location.marker = marker;

	      marker.addListener('click', function(){
	           
		      self.populateInfoWindow(marker, largeInfoWindow);
		      marker.setAnimation(google.maps.Animation.BOUNCE);
		      setTimeout(function(){ 
	          location.marker.setAnimation(null);
	          }, 750);
	    });
       
    });


    self.populateInfoWindow = function(marker, infowindow) {
      if (infowindow.marker != marker) {
        infowindow.marker = marker; 
        infowindow.setContent('<div>' + marker.title + '</div>');
        infowindow.open(map, marker);
    
      }
    }
    
    
};








