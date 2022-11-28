import {useEffect,useState} from 'react'

const APP_PREFIX = 'whats-ud'

export default function LocalStorageManager(numero, valorInicial) {
    const llaveCodificada = APP_PREFIX+numero
    const[valor,setValor] = useState(()=>{
        const valorJson = localStorage.getItem(llaveCodificada)
        if(valorJson != null && valorJson !== undefined) return JSON.parse(valorJson)
        if(typeof valorInicial === 'function'){
            return valorInicial()
        }else{
            return valorInicial
        }
    })

    useEffect(()=>{
        localStorage.setItem(llaveCodificada, JSON.stringify(valor))
    },[llaveCodificada,valor])

    return [valor,setValor]
}