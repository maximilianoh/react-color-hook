Photoshop
```js
import Photoshop from './Photoshop.jsx';
import { red } from '../../example_color';
<Photoshop { ...red } onAccept={ () => {} } onCancel={ () => {} } />
```

Photoshop custom style
```js
import Photoshop from './Photoshop.jsx';
import { red } from '../../example_color';
<Photoshop { ...red } styles={{ default: { picker: { boxShadow: '0 0 10px red' } } }} />
```