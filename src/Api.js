import AsyncStorage from '@react-native-community/async-storage';

const BASE_API = 'http://localhost:4000'

export default {
    checkToken:async(token) => {
        const req = await fetch(`${BASE_API}/usuario/eu`,{
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
    signIn:async(email, senha) => {
        const req = await fetch(`${BASE_API}/usuario/login`,{
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
        const token = await AsyncStorage.removeItem('token')
        return null
        
    },
    getBarbers:async(lat=null, lng=null) => {
        const token = await AsyncStorage.getItem('token')
        const req = await fetch(`${BASE_API}/barbers?token=${token}&lat=${lat}&lng=${lng}`)
        const json = await req.json()
        return json 
    },
    getBarber:async(id) => {
        const token = await AsyncStorage.getItem('token')
        const req = await fetch(`${BASE_API}/barber/${id}?token=${token}`)
        const json = await req.json()
        return json 
    }
}