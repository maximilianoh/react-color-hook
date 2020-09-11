Github
```js
import Github from './Github.jsx';
import { red } from '../../example_color';
<Github { ...red } />
```



Github onSwatchHover
```js
import Github from './Github.jsx';
import { red } from '../../example_color';
const onChange = (props) => {
    console.dir(props.hex)
}
<div>
    Hover a color and see console
    <Github { ...red } onSwatchHover={ onChange } />
</div>
```

Github onClick
```js
import Github from './Github.jsx';
import { red } from '../../example_color';
const changeSpy = (props) => {
    console.dir(props.hex)
}
<div>
    Click a color and see console
    <Github { ...red } onChange={ changeSpy } />
</div>
```


Github triangle hide
```js
import Github from './Github.jsx';
import { red } from '../../example_color';
<Github { ...red } triangle="hide" />
```

Github triangle top-right
```js
import Github from './Github.jsx';
import { red } from '../../example_color';
<Github { ...red } triangle="top-right" />
```


Github custom style
```js
import Github from './Github.jsx';
import { red } from '../../example_color';
<Github { ...red } styles={{ default: { card: { boxShadow: '0 0 10px red' } } }} />
```


Github custom colors
```js
import Github from './Github.jsx';
import { red } from '../../example_color';
<Github  { ...red }  colors={[ '#008B02', '#006B76', '#1273DE', '#004DCF', '#5300EB',
    '#EB9694', '#FAD0C3', '#FEF3BD']} />
```

