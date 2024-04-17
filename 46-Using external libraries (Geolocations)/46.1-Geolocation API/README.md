46.1 Geolocation API.

Geolocation API is a browser API just like internationalization or timers, etc which browser provides us.
We can get the geolocation data from navigator by using `navigator.geolocation.getCurrentPosition()` method. This method accepts two callback functions. The first one will be executed when location details are received successfully, the second one is to handle failure scenarios. Have a look at below code.

```javascript
"use strict";

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      console.log(position);
    },
    function () {
      alert("Error getting your location..!!");
    }
  );
}
```

Here we are checking if the browser supports geolocation or not (some old browsers does not support geolocations.). If the geolocation is supported then we are calling .getCurrentPosition() method on geolocation. This will ask users permission to access location related information from user. Hence you will see a popup from browser asking permission to read location related data. If you don't allow the access, the alert window will be shown with message "Error getting your location..!!". But if you allow the access, then it will print the position object (which holds all the location related data) to console.

Position object holds information like latitude, longitude, altitude, speed, accuracy, etc. So if we modify the above code a bit and create a google map link using the location data obtained above then we can use that link to load the map in our application. This is what done below.

```javascript
"use strict";

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      //   console.log(position);
      const { latitude, longitude } = position.coords;
      //   console.log(latitude);
      //   console.log(longitude);
      console.log(`https://www.google.com/maps/@${latitude},${longitude}`);
    },
    function () {
      alert("Error getting your location..!!");
    }
  );
}
```

Here we have used destructuring of object and extracted latitude and longitude from position.coords object and then used those two values to create a google maps link. If you click on the link generated using above code, it will load google maps to your approximate location.

Now this all is the basics of how we can access the geolocation of user. But we want to display the map of that location in our applucation.
