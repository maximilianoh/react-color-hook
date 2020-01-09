Compact
```js
import Compact from './Compact.jsx';
import { red } from '../../helpers/color';

<Compact { ...red } />
```


Compact onSwatchHover
```js
import Compact from './Compact.jsx';
import { red } from '../../helpers/color';
const onChange = (props) => {
    console.dir(props.hex)
}
<div>
    Hover a color and see console
    <Compact { ...red } onSwatchHover={ onChange } />
</div>
```

Compact onClick
```js
import Compact from './Compact.jsx';
import { red } from '../../helpers/color';
const changeSpy = (props) => {
    console.dir(props.hex)
}
<div>
    Click a color and see console
    <Compact { ...red } onChange={ changeSpy } />
</div>
```

Compact custom style
```js
import Compact from './Compact.jsx';
import { red } from '../../helpers/color';
<Compact { ...red } styles={{ default: { wrap: { boxShadow: '0 0 10px red' } } }} />
```
