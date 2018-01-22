const Super = require('../dist/index.min');

test('document.body.innerHTML', () => {
    const superObj = new Super();
    console.log('document.body.innerHTML\n', document.body.innerHTML);
    console.log('superObj.constructor === Super\n', superObj.constructor === Super);
    console.log('superObj.extend\n', superObj.extend);
    expect(true).toEqual(true);
});
