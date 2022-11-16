import {useEffect, useState} from 'react'
import LocalStorageManager from './LocalStorageManager'

export default function UserManager( number, password) {
    
    useEffect(()=>{
        console.log('useEffect')
        console.log(number)
    })
}
