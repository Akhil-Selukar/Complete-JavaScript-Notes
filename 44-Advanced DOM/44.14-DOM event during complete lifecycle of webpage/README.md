## 44.14 DOM events during complete lifecycle of a webpage.

Apart from the events like click, mouseover, mouseenter, keydown, etc. (user events or events performed by user), there are some events which gets triggered during the lifecycle of a webpage i.e. from the instance we hit url of the webpage to the instance we click on close button and close the webpage. Below are some important events.

### 1. DOM content loaded event (DOMContentLoaded)

This event is triggered on document as soon as the complete html file is loaded and converted to DOM tree. Also all scripts are downloaded and executed before the 'DOMContentLoaaded' event is triggered. The important thing to note here is that, this event doesnot wait for images and other external resources to load. (Just HTML and javascript must be loaded for this event to trigger.) Below is the code which demonstrate how we can listen to this event.

```javascript
document.addEventListener("DOMContentLoaded", function (e) {
  console.log("DOMContentLoaded event is triggered.");
  console.log(e);
});
```

The above code will print the message `DOMContentLoaded event is triggered.` and the event in console as soon as the whole html page and javascript is loaded. It will not wait for the Images and other external resources to complete loading. This event is used to show welcome popups or discount/promotional ads on many websites. Output of above code is.

```
DOMContentLoaded event is triggered.
Event{
  isTrusted: true
  bubbles: true
  cancelBubble: false
  cancelable: false
  composed: false
  currentTarge: null
  defaultPrevented: false
  eventPhase: 0
  returnValue: true
  srcElement: document
  target: document
  timeStamp: 275.2999999523163
  type: "DOMContentLoaded"
}
```

Now whatever code we are writing we want to execute it after the entire DOM tree is ready so does that mean we must wrap our entire js file inide this event listner?. The answer is no, we have inserted our javascript file at the end of the html file which means it will be loaded at the end of html hence by the time our js file is loaded the entire DOM tree will be ready. But you might find some very old code where the entire javascript is written inside an event handler which listen to the DOMContentLoaded event.

### 2. Load event

Load event is fired on window when the entire page including images and other external files like css are loaded completly. We can listen to this event like below.

```javascript
window.addEventListener("load", function (e) {
  console.log("load event is triggered.");
  console.log(e);
});
```

If you observe, the load event will always be triggered after the 'DOMContentLoaded' event. The output of above code will be.

```
load event is triggered.
Event{
  isTrusted: true
  bubbles: false
  cancelBubble: false
  cancelable: false
  composed: false
  currentTarget: Window {window: Window, self: Window, document: document, name: '', location: Location, …}
  defaultPrevented: false
  eventPhase: 2
  returnValue: true
  srcElement: document
  target: document
  timeStamp: 203.60000002384186
  type: "load"
}
```

### 3. Beforeunload event

This event is also triggered on the window. This event is triggered just before closing the page and after you clicked on close button. This is something like getting confirmation from user that do they really want to close the page. In this event some browsers need to preventDefault() to work. Also this event need to return an empty string using `e.returnvalue` (earlier instead of empty string we were allowed to pass message to be displayed in the confirmation window, but it was removed because some people were using it inappropriatel. So for historic reasons we have to return an empty string now.)

```javascript
window.addEventListener("beforeunload", function (e) {
  e.preventDefault();
  console.log("Beforeload event is triggered");
  console.log(e);
  e.returnValue = "";
});
```

The message on popup wll be 'Changes you made may not be saved.'
