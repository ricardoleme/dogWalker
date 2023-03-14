// cSpell:Ignore usuario
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_API = 'https://dog-walker-back.vercel.app/api/'
//const BASE_API = 'http://localhost:4000'

export default {
    checkToken:async(token) => {
        const req = await fetch(`${BASE_API}/usuarios/token`,{
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
        const req = await fetch(`${BASE_API}/usuarios/login`,{
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
    signUp:async(nome, email, senha, tipo='Cliente') => {
        const req = await fetch(`${BASE_API}/usuarios`,{
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
        const req = await fetch(`${BASE_API}/passeadores`,{
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
        const req = await fetch(`${BASE_API}/passeadores/${id}`,{
            method: 'GET',
            headers: {
                Accept : 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        })
        const json = await req.json()
        const primeiroItem = json.shift()
        console.log(primeiroItem)
        return primeiroItem
    }
}