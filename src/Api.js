import AsyncStorage from '@react-native-community/async-storage';

const BASE_API = 'https://api.b7web.com.br/devbarber/api'

export default {
    checkToken:async(token) => {
        const req = await fetch(`${BASE_API}/auth/refresh`,{
            method: 'POST',
            headers: {
                Accept : 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token})
        })
        const json = await req.json()
        return json
    },
    signIn:async(email, password) => {
        const req = await fetch(`${BASE_API}/auth/login`,{
            method: 'POST',
            headers: {
                Accept : 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        })
        const json = await req.json()
        return json
        
    },
    signUp:async(name, email, password) => {
        const req = await fetch(`${BASE_API}/user`,{
            method: 'POST',
            headers: {
                Accept : 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, email, password})
        })
        const json = await req.json()
        return json
        
    },
    getBarbers:async(lat=null, lng=null) => {
        console.log("lat"+lat)
        console.log("lng"+lng)
        const token = await AsyncStorage.getItem('token')
        const req = await fetch(`${BASE_API}/barbers?token=${token}&lat=${lat}&lng=${lng}`)
        const json = await req.json()
        return json 
    }
}