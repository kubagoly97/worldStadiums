mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/satellite-streets-v12', // style URL
    center: stadium.geometry.coordinates, // starting position [lng, lat]
    zoom: 14, // starting zoom
});

map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');


const marker = new mapboxgl.Marker()
    .setLngLat(stadium.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(
                `<h3>${stadium.title}</h3><p>${stadium.location}</p>`
            ))
    .addTo(map);
