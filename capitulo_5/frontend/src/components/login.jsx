
const FormaUsuario=({handleLogin,formLogin,handleCHange})=>{
    return(
    <form onSubmit={handleLogin}>
      <div>
        username
        <input 
          type='text'
          value={formLogin.username} 
          name='username' 
          onChange={handleCHange}
          
        />  
      </div>
      <div>
        password
        <input 
          type='text'
          value={formLogin.password}
          name='password'
          onChange={handleCHange}
        />
      </div>
      <button type='submit'>login</button>
    </form>
    )
  }

export default FormaUsuario