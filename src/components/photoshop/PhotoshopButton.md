PhotoshopButton
```js
import PhotoshopButton from './PhotoshopButton.jsx';
import { red } from '../../example_color';
<PhotoshopButton {...red} label="accept" onClick={ () => {} } />
```


PhotoshopButton children
```js
import PhotoshopButton from './PhotoshopButton.jsx';
import { red } from '../../helpers/color';
const c = <strong>children</strong>;
<PhotoshopButton {...red} label="" onClick={ () => {}}  children={c} />
```
