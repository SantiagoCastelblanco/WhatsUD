import React, { useRef } from 'react'
import {useNavigate} from 'react-router-dom'
import './Login.css'

function Login({ numberInpt, pass }) {
  const numeroEntrada = useRef()
  const contra = useRef()
  const navigate = useNavigate()

  function manejarEntrada(e) {
    e.preventDefault()
    numberInpt(numeroEntrada.current.value)
    pass(contra.current.value)

    
    console.log(numeroEntrada.current.value)
    console.log(contra.current.value)  
    navigate('/usuario')
  }

  return (
    <div className='login'>
      <div className = 'izquierda'>
      <form onSubmit={manejarEntrada}>
        <div className='contenedor_entrada'>
          <label>Numero de telefono</label>
          <input type={"number"}
            minLength={10}
            placeholder="123-4567-8901"
            ref={numeroEntrada} required />
        </div>
        <div className='contenedor_entrada'>
          <label>Contraseña</label>
          <input type={"password"} ref={contra} required />
        </div>
        <div className='contenedor_boton'>
          <input type="submit" />
        </div>
      </form>
      </div>

      <div id="derecho">
        <div class="titulo">
          Bienvenido
        </div>
        <hr></hr>
        <div class="pie-form">
          <a href="#">¿Perdiste tu contraseña?</a>
          <a href="#">¿No tienes Cuenta? Registrate</a>
          <hr></hr>
          <a href="#">« Volver</a>
        </div>
      </div>
    </div>
  )
}

export default Login