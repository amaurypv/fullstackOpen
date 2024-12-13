//importa la función a ser probada y la asigna a una variable llamada reverse:
const {test}=require('node:test')
const assert= require('node:assert')
// importa la función a ser probada y la asigna a una variable llamada reverse:
const reverse=require('../utils/for_testing').reverse

//Los casos de prueba individual se definen con la función test. El primer argumento de la función es la descripción de la prueba como una cadena. El segundo argumento es una función, que define la funcionalidad para el caso de prueba
test('reverse of a',()=>{
    const result=reverse('a')
    assert.strictEqual(result,'a')
})

test('reverse of react',()=>{
    const result= reverse('react')
    assert.strictEqual(result,'tcaer')
})

test('reverse of airia',()=>{
    const result=reverse('airia')
    assert.strictEqual(result,'airia')
})
//ejecutamos el código que se va a probar, es decir, generamos un reverso para el string react. Luego, verificamos los resultados con el método strictEqual de la librería assert.
//con npm test 


