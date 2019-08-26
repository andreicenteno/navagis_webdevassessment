
var current_location_latitude ="0";
var current_location_longitude ="0";

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  current_location_latitude = position.coords.latitude;
  current_location_longitude = position.coords.longitude;

}


function calculateDistance(lat1, lon1, lat2, lon2, unit) {
      var radlat1 = Math.PI * lat1/180;
      var radlat2 = Math.PI * lat2/180;
      var radlon1 = Math.PI * lon1/180;
      var radlon2 = Math.PI * lon2/180;
      var theta = lon1-lon2;
      var radtheta = Math.PI * theta/180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      dist = Math.acos(dist);
      dist = dist * 180/Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit=="K") { dist = dist * 1.609344; }
      if (unit=="N") { dist = dist * 0.8684; }
      return dist;
  }


var markerPositions = [
      // filipino
      {lat: 10.312044, lng: 123.918810},
      {lat: 10.326320, lng: 123.880830},
      {lat: 10.310690, lng: 123.881790},
      {lat: 10.311780, lng: 123.916410},
     
     // japanesse
       {lat: 10.297020, lng: 123.883050},
       {lat: 10.309938, lng: 123.919534},

       // korean
      {lat: 10.289610, lng: 123.867610},
      {lat: 10.343889, lng: 123.911421},  
      {lat: 10.321577, lng: 123.904081},


      // chinesse
      {lat: 10.281350, lng: 123.976580},
      {lat: 10.291020, lng: 123.866820},
      {lat: 10.282591, lng: 123.881018},

      //pizza
      {lat: 10.3415839, lng: 123.9173618},
      {lat: 10.358810, lng: 123.920270},
      
      //coffee
      {lat: 10.358810, lng: 123.920270},
      {lat: 10.343678, lng: 123.911597},
      {lat: 10.357420, lng: 123.911330}
 
];


function setContents(countRestaurant){

 var contents = '<div id="content">'+    
  '<div id="siteNotice">'+    
  '</div>'+    
  '<span style="font-size:medium; color: black; font-weight:bold;">Total Restaurant: '+countRestaurant+'</span>'+    
  '</div>';   

return contents;
}

$(window).load(function (){


//-- Filipino Food, Japanese, Korean, Chinese, Pizza, Cafe
getLocation();

  var places={
    filipino:{
      label:'filipino',
      // we will use GeoJson data for importing locations. 
      //reference: https://developers.google.com/maps/documentation/javascript/importing_data?authuser=1#data

      //the category may be default-checked when you want to
      //uncomment the next line
      //checked:true,
      icon: 'http://maps.gstatic.com/mapfiles/markers2/marker.png' ,
      items: [
              ['Vikings SM City Cebu Restaurant', 10.312044, 123.918810,130],
              ['Lantaw 2 Native Restaurant Cebu City', 10.326320, 123.880830, 102], 
              ['House Of Lechon Cebu City', 10.310690, 123.881790, 92],
              ['Zubuchon Cebu City', 10.311780, 123.916410, 103]
             ]
    },
    japanese:{
      label:'Japanese',
      //the category may be default-checked when you want to
      //uncomment the next line
      //checked:true,
      icon: 'http://maps.gstatic.com/mapfiles/markers2/boost-marker-mapview.png',
      items: [
              ['Cafe Marco', 10.297020, 123.883050, 201],
              ['Feria', 10.309938, 123.919534, 200],
             ]   
    } ,

    korean:{
      label:'korean',
      //the category may be default-checked when you want to
      //uncomment the next line
      //checked:true,
      icon: 'http://maps.gstatic.com/mapfiles/markers2/icon_green.png',
      items: [
              ['KAYA Korean BBQ', 10.289610, 123.867610, 220],
              ['Ma Roo Korean Restaurant', 10.343889, 123.911421, 223],
              ['Han Guk Kwan Korean Restaurant', 10.321577, 123.904081,113]
             ]    
    }  ,
     chinese:{
      label:'chinese',
      //the category may be default-checked when you want to
      //uncomment the next line
      //checked:true,
      icon: 'http://maps.gstatic.com/mapfiles/markers2/marker.png',
      items: [
              ['Tsay Cheng Chinese Restaurant', 10.281350, 123.976580, 112],
              ['Ding Qua Qua Cebu City', 10.291020, 123.866820,115],
              ['Tim Ho Wan', 10.282591, 123.881018, 120]
             ]
    },
     pizza:{
      label:'pizza',
      //the category may be default-checked when you want to
      //uncomment the next line
      //checked:true,
      icon: 'http://maps.gstatic.com/mapfiles/markers2/icon_green.png',
      items: [
              ['La Nostra Pizzeria Napoletana', 10.340830, 123.910580, 100],
              ['Tavolata', 10.3415839, 123.9173618, 120]
             ] 
    }  ,
    cafe:{
      label:'cafe',
      //the category may be default-checked when you want to
      //uncomment the next line
      //checked:true,
      icon: 'http://maps.gstatic.com/mapfiles/markers2/boost-marker-mapview.png',
      items: [
              ['Yolk Coffee And Breakfast', 10.330026, 123.905555, 130],
              ['Bloom Cakes & Coffee', 10.343678, 123.911597, 50],
              ['Soho Park', 10.357420, 123.911330, 40]
             ]    
    }              
  },
  map = new google.maps.Map(
              document.getElementById('map'), 
              {
                zoom: 13,
                center: new google.maps.LatLng(10.3145975, 123.9018502),
              }
            ),
  infowindow = new google.maps.InfoWindow(),
  
  // a  div where we will place the buttons
  ctrl=$('<div/>').css({background:'#fff',
                        border:'1px solid #000',
                        padding: '25px',
                        margin:'2px',
                        height: '700px',
                        left: '7px',
                        width: '15%',
                        top: '50px',
                        'font-size':'medium',
                        textAlign:'center'
                       });
 

  

   var drawingManager = new google.maps.drawing.DrawingManager({
          drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: ['circle', 'rectangle']
          },
          circleOptions: {
            fillColor: '#0c5460',
            fillOpacity: 0.35,
            strokeWeight: 0,
            clickable: true,
            editable: true,
            zIndex: 1
          }
        });
        drawingManager.setMap(map);


var countRestaurant = 0; // total counts of restaurant after drawing
 google.maps.event.addListener(drawingManager, 'circlecomplete', function(circle) {
          var radius = circle.getRadius();
          console.log("circle radius: "+radius);
          
            var count = 0;
            for (var i=0; i<markerPositions.length; i++) {
                var distance = calculateDistance(
                        markerPositions[i].lat,
                        markerPositions[i].lng,
                        circle.getCenter().lat(),
                        circle.getCenter().lng(),
                        "K");

                var radConvertToKM = radius;
                console.log("distance:"+distance+"| distance x 1000: "+distance*100+" | radius: "+ radConvertToKM);
                if (distance * 1000 < radConvertToKM) {  // radius is in meter; distance in km
                    console.log("Have 1 record of Restaurant");
                    count++;
                }
                else {
                    console.log("No Record of Restaurant");
                }

            }// end of for loop

            console.log("Total Restaurant: "+count);
            var contents = setContents(count);

            var infowindow = new google.maps.InfoWindow({    
              content: contents    
            });

          infowindow.setPosition(circle.getCenter());
          infowindow.open(map);

        });
 


google.maps.event.addListener(drawingManager, 'rectanglecomplete', function(rectangle) {
   var ne = rectangle.getBounds().getNorthEast();
   var sw = rectangle.getBounds().getSouthWest();
  console.log("NE: "+ne+" | SW: "+sw);
  infowindow.setPosition(rectangle.getBounds().getNorthEast());
  infowindow.open(map);
});



  //show all-button
  ctrl.append($('<input>',{type:'button',value:'show all',class:'btn btn-primary'})
                .click(function(){
                  $(this).parent().find('input[type="checkbox"]')
                    .prop('checked',true).trigger('change');
                }));
  ctrl.append($('<br/>'));
   ctrl.append($('<br/>'));
  
  //clear all-button
  ctrl.append($('<input>',{type:'button',value:'clear all', class:'btn btn-danger'})
                .click(function(){
                  $(this).parent().find('input[type="checkbox"]')
                    .prop('checked',false).trigger('change');
                }));
  ctrl.append($('<hr/>'));
  
  //now loop over the categories
  $.each(places,function(c,category){
    
    //a checkbox fo the category
    var cat=$('<input>',{type:'checkbox'}).change(function(){
       $(this).data('goo').set('map',(this.checked)?map:null);
    })
      //create a data-property with a google.maps.MVCObject
      //this MVC-object will do all the show/hide for the category 
      .data('goo',new google.maps.MVCObject)
      .prop('checked',!!category.checked)
      
      //this will initialize the map-property of the MVCObject
      .trigger('change')
      
      //label for the checkbox
      .appendTo($('<div/>').css({whiteSpace:'nowrap',textAlign:'left'}).appendTo(ctrl))
      .after(category.label);
      
      //loop over the items(markers)
      $.each(category.items,function(m,item){
         var marker=new google.maps.Marker({
                position:new google.maps.LatLng(item[1],item[2]),
                title:item[0],
                icon:category.icon
              });
         
         //bind the map-property of the marker to the map-property
         //of the MVCObject that has been stored as checkbox-data 
         marker.bindTo('map',cat.data('goo'),'map');
         google.maps.event.addListener(marker,'click',function(){
            infowindow.setContent(item[0]+'<br/>Total Customer Visited: '+item[3]);
            infowindow.open(map,this);
            console.log('location: '+item[0]);
            console.log("Current Location (Latitude): " + current_location_latitude);
            console.log("Current Location (Longitude): " + current_location_longitude);
            googleMapService.getGeolocationData(current_location_latitude,current_location_longitude, item[1], item[2]);
         });







      });
        
  });
 
 //use the buttons-div as map-control 
 map.controls[google.maps.ControlPosition.TOP_RIGHT].push(ctrl[0]);
}
);

