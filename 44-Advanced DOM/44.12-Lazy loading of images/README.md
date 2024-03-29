## 44.12 Lazy loading of images

In modern days look and feel of the webpage need to be best and hence it is very important to use high definition images in the webpage. But with high definition images there comes the problem of loading time. Because the time required to load the images will be more in case of high definition images. Hence to solve this issue and improve the performance and reduce the load time of the webpage we use the concept of lazy loading. Lazyloading is the way to load the elements as and when required and loading only those elements which are necessary to display the webpage. In case of our example at first page load we will load the smaller and low definition images and cover them with blur mask. The low definition images will load faster and the blur mask will not show the user that the image is low definition instead it will create an effect of loading the section images on scroll. As on scrolling to the element we will load the high definition image and remove the blur effect.

Now to achieve this we have to keep both high and low definition images and in image tag we will have to keep the src path for both the images with smaller image as default. And as a part of lazy loading we will switch the image to high definition one. To do this in html code we are using a data attribute/custom-attribute and adding the scr path for high definition image.

```html
<img
  src="img/digital-lazy.jpg"
  data-src="img/digital.jpg"
  alt="Computer"
  class="features__img lazy-img"
/>
```

Here in above code we can see that the src path is for smaller image and for actual image the path is stored in `data-src` attribute.

Now in javascript we have to select all such images which has this data-src attribute, because we don't want the logo and other images to load lazily. Then based on which section is intersected we can manipulate the src attribute.

```javascript
const imageTargets = document.querySelectorAll("img[data-src]");

const imageLoader = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });

  observer.unobserve(entry.target);
};

const imageObserver = new IntersectionObserver(imageLoader, {
  root: null,
  threshold: 0,
});

imageTargets.forEach((image) => imageObserver.observe(image));
```

In above code we have selected all the images which has attribute 'data-src' and then for each such image we have attached the imageObserver. The main part here is the callback function of imageObserver. In the callback function first we are geting the entry, if the attribute isIntersecting is true then only we want to load the image because when the isIntersecting is true at that time only the image will be in window. So when the isIntersecting is true we want to replace the value of src with the value of data-src. As we have already seen that the data-src is a data attribute and these are stored in dataset, hence it will be present in the entry.target.dataset. At line `entry.target.src = entry.target.dataset.src;` we have replaced the src attribute with the value in datase. Now we have changed the url to high definition image but we want to remove the blur effect as well. To remove the blur effect we have to remove the 'lazy-img' class. The important thing here is if we remove the blur class right after changing the src then it will not wait for the original image to load and just remove the blur without bothering about if the actual high resolution image is completly loaded or not. This can result into bad user experience. Hence to fix this we can use the 'load' event which is triggered when the image is completly loaded. This load event will be triggered on the img as image will be loaded hence we have added an event listner to that img tag (which is the target for that entry observed by intersectionObserver). And once the loading of image is done and the load event is triggered then we are removing the 'lazy-img' class which will remove the blur.

Now if you don't want your users to know that you are doing lazy loading of images then you can load the images few pixels early, by adding the rootMargin to the observerOptions. like below.

```javascript
const imageObserver = new IntersectionObserver(imageLoader, {
  root: null,
  threshold: 0,
  rootMargin: "400px",
});

imageTargets.forEach((image) => imageObserver.observe(image));
```
