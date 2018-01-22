const Super = require('../dist/index.min');

test('document.body.innerHTML', () => {
    new Super();
    console.log(document.body.innerHTML);
    expect(true).toEqual(true);
});
