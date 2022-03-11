
# Simple-js project

Hello everyone I'm Rahmatullo from Uzbekistan I love javascript so I made javascript library with it. It was not big project but anyways let me show you ⚡️


# core-js
now we have a [core-js](https://github.com/strange-bs/strange-js/js/core.js) file that minimized version of [strange-js](https://github.com/strange-bs/strange-js/js/strange.js)
here is the some documentation

# [CDN](https://cdn.jsdelivr.net/gh/strange-bs/strange-js/js/core.js) for core-js

```html
<script src="https://cdn.jsdelivr.net/gh/strange-bs/strange-js/js/core.js"></script>
```

# docs for core-js
## styling with attributes
With this you can easily control your element's styles with it's attributes. Now you can use `propertyName="propertyValue"` syntax for example
```html
<div width="40px" height="50px" background="cyan">
    <!-- something -->
</div>

<!-- it equals -->

<div style="width: 40px; height: 50px;background: cyan;">
    <!-- something -->
</div>
```
it will be very useful when you wanted to style your element with one property. You don't have to create a class and style in css.

`! NOTE:` the style property names shoud be [camel case](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwiOmOr20LH2AhUJyosKHXwxC7EQFnoECAcQAQ&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FCamel_case&usg=AOvVaw3rpk9xbQSt-mdoJTG9ynM5) as javascript used or it doesn't work

## Javascript evaluvating
And also you can use javascript execution in attribute values
here is a simple div element

```html
<div 
    width="window.innerWidth / 2 + 'px' " 
    height="window.innerHeight / 2 + 'px' " 
    background="`rgba(${Math.random() * 255}, ${Math.random() * 255},${Math.random() * 255}, ${Math.random()})`">
</div>
```
Yes the output would be as you think :)

`! NOTE:`  if your execution that given in attributes rises error then it understands you only entered string as we saw [first](https://gihub.com/strange-bs/strange-js#styling-with-attributes)

## Media with attributes

After hard working I added amazing media tool with attributes. Talk is cheap let's take an example

```html
<div 
    sm:display:flex 
    sm:justify-content:center
    sm:flex-direction:column>
    <span>Lorem ipsum dolor sit</span>
    <span>Lorem ipsum dolor sit</span>
    <span>Lorem ipsum dolor sit</span>
</div>
```
when window is small size it takes those styles by default we have media sizes
### Media sizes
- **sm**
    -  max-width: 767px
- **md**
    - max-width: 991px
- **lg**
    - max-width: 1124px
- **xlg**
    - max-width: 1400px

It's not added that controlling those media sizes but I'm working on it 

`! NOTE: ` Here you should use kebab-case like css used not camelCase

You can use as much as you wanted of media styles in one element
```html
<p sm:color:red md:color:blue lg:color:green xlg:color:black>
    Hi I'm amazing text 😸
</p>

<!-- put ! sign after value if you want !important -->

<p sm:display:none!></p>
```
And if you want to use `!important` keyword then you can put `!` 
(exclamation) mark. It is very useful 
`mediaKey:propName:propValue!`

## .Class and #Id names

Now you needn't class attribute anymore you can use `.className` syntax for example

```html
<div .container></div>
<!-- it equals -->
<div class="container"></div>

<div .container.second></div>
<!-- it equals -->
<div class="container second"></div>
```
It's pretty easy now. And also id attribute can be used like this `#idName`


```html
<div #target></div>
<!-- it equals -->
<div id="target"></div>

<!-- but we can not use double ids as you know -->
```

`! NOTE: ` Don't use any spaces for all of these attributes because if you use space it will be other attribute


## Js in HTML
After hard working again I created amazing class on Javascript now you can render your `js` object to `html`

Let's create a simple object first

```js
const app = {
    greeting: "Hello world",
    count: 2,
    isLower: false
}

// then we call our function

const mount = createApp(app, "#app") // #app is our element on html
mount.render()
// then we call render method for rendering it to html element
```
After this we create an elemen in html

```html
<div id="app">
        <!-- here we can use everything in our app object -->
    {{ greeting }}
    {{ count }}
    {{ isLower == false }}
</div>

    <!-- but not here we can't use that feature because we only mounted for our #app element -->
```
If you make changes after rendering for your `app` object then you should call render method again

```js
const app = {
    price: 2500
}

const m = createApp(app, "#app")
m.render()
// we rendered it and made changes

app.price = 5000
app.newKey = "I am added after rendering"

// and we should call render method again 

m.render() 
```
You can understand `render` method is for rendering and also refreshing 

`createApp(object, HTMLelement)`

Here is simple example with all of those

```html
<div #app 
    display="flex" 
    width="100%" 
    height="100vh"
    justifyContent="center"
    alignItems="center" 
    fontSize="10em"
    color="#151515"> 
        {{ random }}        
</div>

<script>
    var randomColor = `rgba(${Math.random() * 250}, ${Math.random() * 250}, ${Math.random() * 250}, 1)`
       
    const app = {
        random: randomColor
    }

    document.body.style.background = app.random
        
    const m = createApp(app, "#app")
        m.render()

    window.click = e => {
        app.random = `rgba(${Math.random() * 250}, ${Math.random() * 250}, ${Math.random() * 250}, 1)`
        m.render()
    }
</script>

```

# class-names
Now you can use responsive class names and control where to use class names
for example 
```html
	<div :sm:small :md:big class="container"></div>
```
`:mediaKey:className`
as you thought if screen size matches small `sm` size `small` class will be added or if screen size matches medium `md` big class will be added.  I think this will be useful when you want to use css power
Those media sizes shown [above](https://github.com/strange-bs/strange-js#media-sizes)  

It is my first library on `javascript` 😭.
It is clear that there are lots of mistakes.
Anyways I hope you like this and you use this 🙂


> First Release 2021.08.07 🔥 


Made with 🖤 and [me](https://github.com/strange-bs/)\
And special thanks for my teacher [@rashidov21](https://github.com/rashidov21)
