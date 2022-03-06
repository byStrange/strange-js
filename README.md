# simple-js
Javascript Library


## every

```js
every(5).seconds(funtion CallBack() {
    console.log("It's been 5 seconds")
})
```

<code> every(number).time(callBack) </code>


```js
every(2)
.minutes(()=> {
    console.log('Something')
})
```

## after


```js
after(2).days(() => {
    console.log('Days')
})
```
<p>and it has also 4 methods</p>

<ul>
    <li>milliSeconds</li>
    <li>seconds</li>
    <li>minutes</li>
    <li>hours</li>
    <li>days</li>
</ul>

## Handling

```js
let e1 = every(4).seconds(() => {
    console.log('Running')
})
after(16).seconds(() => {
    clearInterval(e1)
    console.log('interval stopped')
})
```


```js
let t1 = after(5).minutes(() => {
    console.log('Finally i worked')
})
clearTimeout(t1) // before running t1 was stopped
```


### Note:
<p>If you don't give any number to "every" or "after" functions it thinks you entered 1 then there would be some changes. For example</p>

```js
every().minute(()=> {
    console.log('minute')
})

every(1).minutes(() => {
    console.log('minute')
})

// the first one as the same as second one

every(1).minute(callBack)  // this occurs error
every().minutes(callBack)  // this occurs error also
 
```


<h3>You can also use cdn <a href="https://cdn.jsdelivr.net/gh/Strange-bs/strange-js/js/strange.js">link</a></h3>

```html
<script src="https://cdn.jsdelivr.net/gh/Strange-bs/strange-js/js/strange.js"></script>
```

<h3>or minimized</h3>

```html
<script src="https://cdn.jsdelivr.net/gh/Strange-bs/strange-js/js/strange.min.js"></script>
```
<p>First Release 2021.08.07</p>
