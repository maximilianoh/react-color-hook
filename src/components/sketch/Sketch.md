Sketch
```js
import Sketch from './Sketch.jsx';
import { red } from '../../helpers/color';
<Sketch {...red} />
```


Sketch custom style
```js
import Sketch from './Sketch.jsx';
import { red } from '../../helpers/color';
<Sketch styles={{ default: { picker: { boxShadow: 'none' } } }} />
```


Sketch Onchange
```js
import Sketch from './Sketch.jsx';
const changeSpy = (props) =>{
    console.dir(props.hex)
};
<div>
    Click and see console
    <Sketch onChange={ changeSpy } />
</div>
```


Sketch onSwatchHover
```js
import Sketch from './Sketch.jsx';
const changeSpy = (props) =>{
    console.dir(props.hex)
};

<div>
    Hover and see console
    <Sketch onSwatchHover={ changeSpy } />
</div>
```


Sketch present colors
```js
import Sketch from './Sketch.jsx';
import { red } from '../../helpers/color';
<Sketch {...red} presetColors={ ['#BD10E0', '#9013FE', '#4A90E2', '#50E3C2', '#B8E986', '#000000']} />
```

