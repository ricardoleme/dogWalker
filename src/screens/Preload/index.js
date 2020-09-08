import React, { useEffect } from 'react'
import { Container, LoadingIcon } from './styles'
import AsyncStorage from '@react-native-community/async-storage'
import { useNavigation } from '@react-navigation/native'
import Walker from '../../components/icons/Walker'


export default () => {
    const navigation = useNavigation()

    useEffect(() => {
        const checkToken = async () => {
            const token = await AsyncStorage.getItem('token')
        if(token){
            //validar o token
        } else {
            //direcionar para o login
            navigation.navigate('SignIn')
        }
        }
        checkToken()
    },[])

    return (
        <Container>
            <Walker width="95%" />
            <LoadingIcon size="large" color="#FFFFFF" />
        </Container>
    )
}