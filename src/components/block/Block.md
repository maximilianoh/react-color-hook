Block
```js
import Block from './Block.jsx';
<Block />
```

Block Onchange
```js
import Block from './Block.jsx';
const changeSpy = (props) =>{
    console.dir(props.hex)
};
<div>
    Click and see console
    <Block onChange={ changeSpy } />
</div>
```


Block onSwatchHover
```js
import Block from './Block.jsx';
const changeSpy = (props) =>{
    console.dir(props.hex)
};

<div>
    Hover and see console
    <Block onSwatchHover={ changeSpy } />
</div>
```


Block hide triangle 
```js
import Block from './Block.jsx';
<Block triangle="hide" />
```

Block custom styles
```js
import Block from './Block.jsx';
<Block styles={{ default: { card: { boxShadow: 'none' } } }} />
```

