Circle
```js
import Circle from './Circle.jsx';
<Circle />
```

Circle onChange
```js
import Circle from './Circle.jsx';
const changeSpy = (props) => {
    console.dir(props.hex)
}
<div>
    Select color and see console
    <Circle onChange={ changeSpy } />
</div>
```


Circle onSwatchHover
```js
import Circle from './Circle.jsx';
const changeSpy = (props) => {
    console.dir(props.hex)
}
<div>
    Hover a color and see console
    <Circle onSwatchHover={ changeSpy } />
</div>
```


Circle custom styles
```js
import Circle from './Circle.jsx';

<Circle styles={{ default: { card: { boxShadow: 'none' } } }} />
```

