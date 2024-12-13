//crear una variable llamada animales que sea un array y dentro del array tenga 10 objetos 
//que tengan name el cual sea un nimbre al  azar y la especie sea como gato, perro, leon
const animales = [
  {name: 'Fido',species: 'dog'},
  {name: 'Whiskers', species: 'cat'},
  {name: 'Buddy', species: 'dog'},
  {name: 'Lola',species: 'cat'},
  {name: 'Simba',species: 'lion'},
  {name: 'Leo',species: 'lion'},
  {name: 'Baxter',species: 'dog'},
  {name: 'Molly',species: 'cat'},
  {name: 'Snoopy', species: 'dog'},
  {name: 'Rover',species: 'dog'}
];
let dogs=[]

const course = {
  id: 1,
  name: 'Half Stack application development',
  parts: [
    {
      name: 'Fundamentals of React',
      exercises: 10,
      id: 1
    },
    {
      name: 'Using props to pass data',
      exercises: 7,
      id: 2
    },
    {
      name: 'State of a component',
      exercises: 14,
      id: 3
    }
  ]
}
let sumatoria=course['parts'].reduce((acc,rec)=>acc+rec.exercises)
console.log(sumatoria)

for(let i in animales){
    if(animales[i]['species']=='dog')
    dogs.push(animales[i])
}
console.log(dogs)
//es lo mismo que escribir con filter
let dogs2=animales.filter((animal)=>{return animal.species=='dog'})
console.log(dogs2)

//como funciona .map
let nombres=animales.map(animal=>'su nombre es '+ animal.name)
console.log(nombres)

const perros=animales.filter(animal=>animal.species==='dog')
const nombrePerros=perros.map(perro=>perro.name)
console.log(nombrePerros)