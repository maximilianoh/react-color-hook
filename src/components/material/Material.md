Material
```js
import Material from './Material.jsx';
<Material />
```


Material custom style
```js
import Material from './Material.jsx';
import { red } from '../../example_color';
<Material { ...red } styles={{ default: { wrap: { boxShadow: '0 0 10px red' } } }} />
```