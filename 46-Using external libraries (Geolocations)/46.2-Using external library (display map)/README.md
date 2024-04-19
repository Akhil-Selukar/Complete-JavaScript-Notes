## 46.2 Using external library to load map.

To display maps in out website we are going to use an opensource javascript library for maps which is '[leaflet](https://leafletjs.com/)'. To add leaflet in out application here we are using CDN and hence we have script file of leaflet in our html code. It is important to load this cdn before our js file, because we will be importing this library in our js file. Hence before loading our js file leaflet must be loaded. As here the order matters hence we will load the css files in defer mode.

```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="ie=edge" />
  <link rel="shortcut icon" type="image/png" href="images/icon.png" />

  <link
    href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&display=swap"
    rel="stylesheet"
  />
  <link
    rel="stylesheet"
    href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
    integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
    crossorigin=""
  />
  <link rel="stylesheet" href="style.css" />

  <script
    defer
    src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
    integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
    crossorigin=""
  ></script>

  <script defer src="script.js"></script>
  <title>mapty // Map your workouts</title>
</head>
```

To actually add the map we have to add below code to our js file.

```javascript
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      //   console.log(position);
      const { latitude, longitude } = position.coords;

      const coords = [latitude, longitude];

      const map = L.map("map").setView(coords, 13);

      L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      L.marker(coords)
        .addTo(map)
        .bindPopup("A pretty CSS popup.<br> Easily customizable.")
        .openPopup();
    },
    function () {
      alert("Error getting your location..!!");
    }
  );
}
```

We already know the use of geolocation.getCurrentPosition() api, we use it to get the coordinate of our current location. Now to display the map we have to specify where exactly in our html page we want to add the map. This is what we have mentioned in line `const map = L.map("map").setView(coords, 13);`. Here L is the namespace provided by leaflet on which we can call different functions. One of those functions is map() function. This function accepts the id of html element where we want the map to be displayed. (Note that it need Id and not class name). Then on that map we have have to specify what exactly should be the default view. As we want our current location's map to be displayed by default, hence we have given an array of current coordinate [latitude, longitude] which will be the center of the loaded map. Then the next parameter is the zoom level of the displayed map. Now based on this informaation leaflet load the map in small tiles (from openstreetmaps.org which is opensource map) and display in specified element. The `L.marker()` method is to add the marker at given location, we will discuss this in detail further.

The main takeaway from this section is that how to add external js libraries in our code using CDN url's.
