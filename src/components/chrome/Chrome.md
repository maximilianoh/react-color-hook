Chrome
```js
import Chrome from './Chrome.jsx';
import { red } from '../../example_color';

<Chrome {...red} />
```

Chrome Views
```js
import Chrome from './Chrome.jsx';
import { red } from '../../example_color';
<div>
    <Chrome {...red} defaultView="hex" />
    <Chrome {...red} defaultView="hsl" />
    <Chrome {...red} defaultView="rgb" />
</div>
```

Chrome onChange
```js
import Chrome from './Chrome.jsx';
import { red } from '../../example_color';

const changeSpy = (props) => { console.dir(props.hex);}

<div>
    Select color and see console
    <Chrome {...red} onChange={changeSpy} />
</div>
```

Chrome custom styles
```js
import Chrome from './Chrome.jsx';

<Chrome styles={{ default: { picker: { boxShadow: 'none' } } }} />
```

Chrome custom width
```js
import Chrome from './Chrome.jsx';

<Chrome width={300} />
```
