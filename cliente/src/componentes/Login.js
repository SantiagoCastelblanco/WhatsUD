import React, {useRef} from 'react'
import './Login.css'

function Login({numberInpt,pass}) {
  const numeroEntrada = useRef()
  const contra = useRef()

  function manejarEntrada(e){
    e.preventDefault()
    numberInpt(numeroEntrada.current.value)
    pass(contra.current.value)
  }

  return (
    <div className='login'>
      <form onSubmit={manejarEntrada}>
        <div className = 'contenedor_entrada'>
          <label>Numero de telefono</label>
          <input type={"number"}
          minLength={10} 
          placeholder="123-4567-8901"
          ref={numeroEntrada} required />
        </div>

        <div className = 'contenedor_entrada'>
          <label>Contraseña</label>
          <input type={"password"} ref={contra} required />
        </div>

        <div className='contenedor_boton'>
          <input type = "submit"/>
        </div>
      </form>
    </div>
  )
  
}

export default Login