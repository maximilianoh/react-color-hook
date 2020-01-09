Twitter
```js
import Twitter from './Twitter.jsx';
import { red } from '../../helpers/color';
<Twitter { ...red } />
```


Twitter custom style
```js
import Twitter from './Twitter.jsx';
import { red } from '../../helpers/color';
<Twitter { ...red } styles={{ default: { card: { boxShadow: '0 0 10px red' } } }} />
```

Twitter triangle hide
```js
import Twitter from './Twitter.jsx';
import { red } from '../../helpers/color';
<Twitter { ...red } triangle="hide" />
```


Twitter triangle top-right
```js
import Twitter from './Twitter.jsx';
import { red } from '../../helpers/color';
<Twitter { ...red } triangle="top-right" />
```



Twitter Onchange
```js
import Twitter from './Twitter.jsx';
const changeSpy = (props) =>{
    console.dir(props.hex)
};
<div>
    Click and see console
    <Twitter onChange={ changeSpy } />
</div>
```


Twitter onSwatchHover
```js
import Twitter from './Twitter.jsx';
const changeSpy = (props) =>{
    console.dir(props.hex)
};

<div>
    Hover and see console
    <Twitter onSwatchHover={ changeSpy } />
</div>
```