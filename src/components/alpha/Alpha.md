Alpha
```js
import Alpha from './Alpha.jsx';
<Alpha />
```


Alpha Color Red
```js
import Alpha from './Alpha.jsx';
import { red } from '../../helpers/color';

<Alpha {...red} color={red.hex} />
```


Alpha renders vertically
```js
import Alpha from './Alpha.jsx';
import { red } from '../../helpers/color';

<Alpha {...red} width={20} height={100} direction="vertical" />
```

Alpha onChange events
```js
import Alpha from './Alpha.jsx';
import { red } from '../../helpers/color';

const changeSpy = (prop) => { console.log(prop.hsl.a)};

<div>
    Change and see Console
    <Alpha {...red} onChange={changeSpy} />
</div>
```
