const  notes = [
    {
      id: 1,
      content: "HTML is easy",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    },
    {
      id: 4,
      content: "express es mucho mas facil",
      important: true
    }
]
// let ids= notes.map(n=>n.id)
// console.log(Math.max(...ids))

const si=notes.map(n=>n.id)
console.log(si)
console.log(si.includes(4))
console.log(Math.max(...si))
let idRandom=Math.floor(Math.random()*100)+1
console.log(idRandom)