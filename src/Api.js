// cSpell:Ignore usuario
import AsyncStorage from '@react-native-community/async-storage';

//const BASE_API = 'https://backdogwalker.herokuapp.com'
const BASE_API = 'http://localhost:4000'

export default {
    checkToken:async(token) => {
        const req = await fetch(`${BASE_API}/usuario/eu`,{
            method: 'GET',
            mode: 'cors',
            headers: {
                Accept : 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        })
        const json = await req.json()
        return json
    },
    signIn:async(email, senha) => {
        const req = await fetch(`${BASE_API}/usuario/login`,{
            mode:'cors',
            method: 'POST',
            headers: {
                Accept : 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, senha})
        })
        const json = await req.json()
        return json
        
    },
    signUp:async(nome, email, senha, tipo='cliente') => {
        const req = await fetch(`${BASE_API}/usuario/novo`,{
            method: 'POST',
            headers: {
                Accept : 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({nome, email, senha, tipo})
        })
        const json = await req.json()
        return json
        
    },
    logout:async() => {
        const chaves = ['token', 'usuario']
        await AsyncStorage.multiRemove(chaves)
        return null
        
    },
    getPasseadores:async() => {
        let token = await AsyncStorage.getItem('token')
        const req = await fetch(`${BASE_API}/passeador`,{
            method: 'GET',
            headers: {
                Accept : 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        })
        const json = await req.json()
        return json
    },
    getPasseador:async(id) => {
        let token = await AsyncStorage.getItem('token')
        const req = await fetch(`${BASE_API}/passeador/${id}`,{
            method: 'GET',
            headers: {
                Accept : 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        })
        const json = await req.json()
        console.log(json)
        return json
    }
}