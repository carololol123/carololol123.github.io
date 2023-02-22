/* 
Add an event listener that runs
  when a user clicks on the map element.
*/
map.on("click", (event) => {
  /*What should happen when something is clicked*/

  // If the user clicked on one of your markers, get its information.
  const features = map.queryRenderedFeatures(event.point, {
    layers: ["apartment-building-evaluation"] // replace with your layer name
  });
  if (!features.length) {
    return;
  }
  const feature = features[0];

  /* 
    Create a popup, specify its options 
    and properties, and add it to the map.
  */
  const popup = new mapboxgl.Popup({ offset: [0, -15], className: "my-popup" })
    .setLngLat(feature.geometry.coordinates)
    .setHTML(
      `<h3>Location: ${feature.properties.SITE_ADDRESS}</h3>
    <p>OverallScore: ${feature.properties.SCORE}</p>
    <p>Entrance: ${feature.properties.ENTRANCE_LOBBY}</p>
    <p>Security: ${feature.properties.SECURITY}</p>
    <p>Graffiti: ${feature.properties.GRAFFITI}</p>
    <p>LaundryRoom: ${feature.properties.LAUNDRY_ROOMS}</p>`
    )
    .addTo(map);
});
map.addControl(new mapboxgl.NavigationControl(), "top-left");
map.addControl(
  new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },
    trackUserLocation: true,
    showUserHeading: true
  }),
  "top-left"
);
const geocoder = new MapboxGeocoder({
  // Initialize the geocoder
  accessToken: mapboxgl.accessToken, // Set the access token
  mapboxgl: mapboxgl, // Set the mapbox-gl instance
  marker: false, // Do not use the default marker style
  placeholder: "Search for places in Toronto", // Placeholder text for the search bar
  proximity: {
    longitude: 79.3832,
    latitude: 43.6532
  } // Coordinates of Toronto center
});

map.addControl(geocoder, "top-left");
