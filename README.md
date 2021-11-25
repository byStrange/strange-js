# strange-js
Javascript Library
With this you don't have to store your elements in your js file all elements will be pre-created as variable
```html
<div id="myId">
    ...
</div>
```
You set any #id name in your html file and  In a your  javascript file, all the id variables in your html file will be pre-created. Let's see!

```js
console.log($myId) // it returns your div#myId
```

Or if you want to grab all ids you can use like that

```html
<div id="container">
    ...
</div>
<div id="container">
    ...
</div>
<div id="container">
    ...
</div>
```
```js
console.log($containers) // not $container
// it returns all elements that have 'container' id 
```

<h3>You can also use cdn <a href="https://cdn.jsdelivr.net/gh/Strange-bs/strange-js/js/strange.js">link</h3>

```html
<script src="https://cdn.jsdelivr.net/gh/Strange-bs/strange-js/js/strange.js"></script>
```

<h3>or minimized</h3>

```html
<script src="https://cdn.jsdelivr.net/gh/Strange-bs/strange-js/js/strange.min.js"></script>
```
