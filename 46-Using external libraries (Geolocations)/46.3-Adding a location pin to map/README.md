## 46.3 Adding a location pin to the map

Now to add the location pin on the location on map where we click, wehave to add an event listner. We can simply add an event listner to the html element in which we are rendering the map. In this case the click event will be listened but what about the co-ordinates on map where that click event occurs. We have no way to get the coordinates if we add an event listner to html element in which we are rendering the map i.e. `<div id="map"></div>`. So for this purpose we have a special event listner provided by leaflet library which is present on the returned objectof `L.map()`. So we can call .on() method on that object and it will give us the eact coordinates on map where the click event is triggered. Have a look at below code.

```javascript
"use strict";

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      //   console.log(position);
      const { latitude, longitude } = position.coords;
      console.log(latitude);
      console.log(longitude);
      console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

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

      map.on("click", function (mapEvent) {
        console.log(mapEvent);
      });
    },
    function () {
      alert("Error getting your location..!!");
    }
  );
}
```

Here in above code we have used map.on() method which is a special type of eventlistner added in leaflet library. After loading the application if we click somewhere on the map then this event listner will be called and we can see the output in console. The mapEvent which is generated after clicking will have the exact coordinate of the place on map where we clicked.

Now we can use this coordinate and add the location marker pin on the map at exactly that coordinate. Have a look at below code.

```javascript
"use strict";

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      //   console.log(position);
      const { latitude, longitude } = position.coords;
      console.log(latitude);
      console.log(longitude);
      console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

      const coords = [latitude, longitude];

      const map = L.map("map").setView(coords, 13);

      L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      map.on("click", function (mapEvent) {
        // console.log(mapEvent);
        const { lat, lng } = mapEvent.latlng;

        L.marker([lat, lng]).addTo(map).bindPopup("New location").openPopup();
      });
    },
    function () {
      alert("Error getting your location..!!");
    }
  );
}
```

Here by using the latitude and longitude obtained from click event we are adding the location pin with message "New location".
If you try this code then as soon as you click on any location on map, a location pin will be added to that location.

Now if you observe the location pin will display the message "New location" above it, but as soon as you click somewhere else the message on old pin will be gone. In leaflet we can add our custome classes to the predefined components of leaflet hence by using this we can modify the css properties of those elements. For exampel we will modift the behavior and look of the popup displayed on pinned location.

Note: Do check the [leaflet documentation](https://leafletjs.com/reference.html) for what all things we can modify and what all options we have to change default behaviour of maps and markers. (Here we have used [Marker](https://leafletjs.com/reference.html#marker) documentation)

In code above this code where we have added the location marker using map.on() method, if you look closely at line `L.marker([lat, lng]).addTo(map).bindPopup("New location").openPopup();` Here L.marker() is generating the marker using the given lat and lng. Then addTo() method add that marker on the map. After adding the marker .bindPopup() method creates and attach the popup message with given message to the marker and at last .openPopup() metthod opens that popup message.

Now in all the above steps the step where the popup message is getting generated is .bindPopup(), hence here we can create a cutom popup and modify it by passing an option object with options specified as per the documentation.

```javascript
map.on("click", function (mapEvent) {
  // console.log(mapEvent);
  const { lat, lng } = mapEvent.latlng;

  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        // closeButton: false,
        closeOnClick: false,
        className: "running-popup",
      })
    )
    .setPopupContent("New location")
    .openPopup();
});
```

Here in above code we have generated a new popup using L.popup() and passes an object of option in which we override the some default behaviours like maxWidth, minWidth, autoClose, closeOnClick, etc. The important thing to note here is we have added our custom css class called 'running-popup' and appied custom css properties to the popup message. Now by using .setPopupContent() we can set the message of the popup and that's it now the opoups on map will have custome style, it will also have a fixed minimum width and it will not be closed automatically as soon as we click somewhere else on the map.

Below is the screenshot of the final UI after above code is implemented.

![Location pin with message popup(46-Using external libraries (Geolocations)/46.3-Adding a location pin to map/images/UI_location pin.png)](<https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/blob/master/46-Using%20external%20libraries%20(Geolocations)/46.3-Adding%20a%20location%20pin%20to%20map/images/UI_location%20pin.png>)
