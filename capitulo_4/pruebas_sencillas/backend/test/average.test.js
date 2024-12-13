const {test, describe}=require('node:test')
const assert=require('node:assert')
const average=require("../utils/for_testing").average

describe('average',()=>{
    test('de un valor como el mismo valor',()=>{
        assert.strictEqual(average([1]),1)
    })
    test('de muchos que se calcula bien',()=>{
        assert.strictEqual(average([1,2,3,4,5,6]),3.5)
    })
    test('de un array vacio que de 0',()=>{
        assert.strictEqual(average([]),0)
    })
})
//al hacer el test con npm test da el siguiente resultado: 
/*▶ average
  ✔ de un valor como el mismo valor (0.871875ms)
  ✔ de muchos que se calcula bien (0.090458ms)
  ✔ de un array vacio que de 0 (0.080667ms)
   */


