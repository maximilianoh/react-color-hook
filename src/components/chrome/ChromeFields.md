ChromeFields
```js
import ChromeFields from './ChromeFields.jsx';
<ChromeFields hsl={{h:150, l:20, s:51, a:1}} rgb={{r:25, g:77, b:51, a:1}} 
    hex="#194D33" onChange={()=>{}} />
```


ChromeFields Views
```js
import ChromeFields from './ChromeFields.jsx';
<div>
    <ChromeFields hsl={{h:150, l:20, s:51, a:1}} rgb={{r:25, g:77, b:51, a:1}} 
        hex="#194D33" onChange={()=>{}} view="hex"/>
    <ChromeFields hsl={{h:150, l:20, s:51, a:1}} rgb={{r:25, g:77, b:51, a:1}} 
        hex="#194D33" onChange={()=>{}} view="hsl"/>
    <ChromeFields hsl={{h:150, l:20, s:51, a:1}} rgb={{r:25, g:77, b:51, a:1}} 
        hex="#194D33" onChange={()=>{}} view="rgb"/>
</div>
```