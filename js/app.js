// Data. Including Ajax request for relevant info from Wikipedia
var historicLocations = 
  [{
    "name": "Holocaust Memorial",
    "lat": 42.361211,
    "lng": -71.057086,
    "wikiPageName": "New_England_Holocaust_Memorial"
  }, {
    "name": "Old State House",
    "lat": 42.358781,
    "lng": -71.057448,
    "wikiPageName": "Old_State_House_(Boston)"
  }, {
    "name": "Paul Revere's House",
    "lat": 42.363668,
    "lng": -71.053757,
    "wikiPageName": "Paul_Revere_House"
  }, {
    "name": "Old North Church",
    "lat": 42.366388,
    "lng": -71.054360,
    "wikiPageName": "Old_North_Church"
  }, {
    "name": "Old South Meeting House",
    "lat": 42.356970,
    "lng": -71.058331,
    "wikiPageName": "Old_South_Meeting_House"
  }, {
    "name": "Boston Tea Party Ships and Museum",
    "lat": 42.352175,
    "lng": -71.051213,
    "wikiPageName": "Boston_Tea_Party"
  }]






function loadData (location){

  var $wikiElem = $('#wikipedia-links');
  

  
    var wikiUrl = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + location.wikiPageName + "&format=json&callback=wikiCallback;"

    $.ajax({
      url: wikiUrl,
      dataType: "jsonp",
      success: function( response ) {

        
        var articleList = response[1];


        var url = "http://en.wikipedia.org/wiki/" + articleList[0];
        // $wikiElem.append("<li><a target='_blank' href='" + url + "'>" + articleList[0] + "</a></li>")
        
        
        location.url = url
        location.extract = response[2]

      }
    });
  
};

console.log(historicLocations)










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
    

    self.locations().forEach(function(location){
      loadData(location)

    });

    
    var largeInfoWindow = new google.maps.InfoWindow();

    self.locations().forEach(function(location) { 
      console.log(location)
      var marker = new google.maps.Marker ({
        map: map,
        position: { lat: location.lat, lng: location.lng },
        title: location.name,
        animation: google.maps.Animation.DROP    

      })
        location.marker = marker;

        marker.addListener('click', function(){
             
          self.populateInfoWindow(marker, largeInfoWindow, location);
          marker.setAnimation(google.maps.Animation.BOUNCE);
          setTimeout(function(){ 
            location.marker.setAnimation(null);
            }, 750);
      });
      
      self.populateInfoWindow = function(marker, infowindow, location) {
        if (infowindow.marker != marker) {
          infowindow.marker = marker; 
          infowindow.setContent("<div><b><a target='_blank' href='" + location.url + "'>" + marker.title + "</a></b></div>" + "<div>" + location.extract[0] + "</div>" );
          infowindow.open(map, marker);
      
        }
      }

    });
  
  // // filter function
  // self.singleLocation = ko.observable()

  // self.locationFilter = ko.computed(function() {
  //   return ko.utils.arrayFilter(self.locations(), function(location){
  //     return 
  //   });
  // });


};












