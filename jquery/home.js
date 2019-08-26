
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
            ['Feria', 10.311780, 123.916412, 200],
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
              ['Ma Roo Korean Restaurant', 10.311780, 123.916410, 223],
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
              ['Tim Ho Wan', 10.311780, 123.916410, 120]
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
              ['Tavolata', 10.311780, 123.916410, 120]
             ]
    }  ,
    cafe:{
      label:'cafe',
      //the category may be default-checked when you want to
      //uncomment the next line
      //checked:true,
      icon: 'http://maps.gstatic.com/mapfiles/markers2/boost-marker-mapview.png',
      items: [
              ['Yolk Coffee And Breakfast', 10.358810, 123.920270, 130],
              ['Bloom Cakes & Coffee', 10.281350, 123.976580, 50],
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
          // drawingMode: google.maps.drawing.OverlayType.MARKER,
          // drawingControl: true,
          drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: ['circle', 'rectangle']
          },
          // markerOptions: {icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'},
          circleOptions: {
            fillColor: '#0c5460',
            fillOpacity: 1,
            strokeWeight: 1,
            clickable: true,
            editable: true,
            zIndex: 1
          }
        });
        drawingManager.setMap(map);

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

