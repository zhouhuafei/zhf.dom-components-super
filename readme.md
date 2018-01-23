# dom系列组件的的超类
```
const Super = require('zhf.dom-components-super');

const superObj = new Super();
console.log(document.body.innerHTML); // <div></div>
console.log(superObj.constructor === Super); // true
```
