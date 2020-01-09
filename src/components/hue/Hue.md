Hue
```js
import Hue from './Hue.jsx';
<Hue />
```

Hue vertically
```js
import Hue from './Hue.jsx';
import { red } from '../../helpers/color';
<Hue { ...red } width={ 20 } height={ 200 } direction="vertical" />
```

Hue custom styles
```js
import Hue from './Hue.jsx';
import { red } from '../../helpers/color';
<Hue { ...red } styles={{ default: { picker: { boxShadow: '0 0 10px red' } } }} />
```