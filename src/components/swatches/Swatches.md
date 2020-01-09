Swatches
```js
import Swatches from './Swatches.jsx';
<Swatches />
```



Swatches colors
```js
import Swatches from './Swatches.jsx';
import  { red } from '../../helpers/color';
<Swatches hex={ red.hex } colors={ [['#004d40'], ['#333']] } />
```

Swatches custom style
```js
import Swatches from './Swatches.jsx';
import  { red } from '../../helpers/color';
<Swatches hex={ red.hex } styles={{ default: { picker: { boxShadow: '0 0 10px red' } } }} />
```


Swatches Onchange
```js
import Swatches from './Swatches.jsx';
const changeSpy = (props) =>{
    console.dir(props.hex)
};
<div>
    Click and see console
    <Swatches onChange={ changeSpy } />
</div>
```


Swatches onSwatchHover
```js
import Swatches from './Swatches.jsx';
const changeSpy = (props) =>{
    console.dir(props.hex)
};

<div>
    Hover and see console
    <Swatches onSwatchHover={ changeSpy } />
</div>
```