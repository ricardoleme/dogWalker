import React, { useState, useContext } from 'react'
import {
    Container, InputArea, CustomButton, CustomButtonText,
    SignMessageButton, SignMessageButtonText, SignMessageButtonTextBold, Logo
} from './styles'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage'

import Dog from '../../components/icons/Dog'
import SignInput from '../../components/SignInput'
import Api from '../../Api'
import { UserContext } from '../../contexts/UserContext'


export default () => {
    const { dispatch: userDispatch } = useContext(UserContext)
    const navigation = useNavigation()

    const [emailField, setEmailField] = useState('')
    const [passwordField, setPasswordField] = useState('')

    const handleMessageButtonClick = () => {
        //iremos enviá-lo para o SignUp, sem a possibilidade de voltar. (se voltar, fecha o App )
        navigation.reset({
            routes: [{ name: 'SignUp' }]
        })
    }

    const handleSignClick = async () => {
        if (emailField && passwordField) {
            let json = await Api.signIn(emailField, passwordField)
            if (json.token) {
                await AsyncStorage.setItem('token', json.token)
                let usuario = await Api.checkToken(json.token)
                userDispatch({
                    type: 'setAvatar',
                    payload: {
                        avatar: usuario.avatar
                    }
                })
                userDispatch({
                    type: 'setNome',
                    payload: {
                        nome: usuario.nome
                    }
                })
                navigation.reset({
                    routes: [{ name: 'MainTab' }]
                })
            } else {
                alert("Email ou senha informados são inválidos!")
            }
        } else {
            alert("Preencha todos os campos!")
        }
    }

    return (
        <Container>
            <Logo>
            <Dog/>
            </Logo>
            <InputArea>
                <SignInput
                    icon="mail"
                    placeholder="Digite o seu e-mail"
                    value={emailField}
                    onChangeText={t => setEmailField(t)}
                />
                <SignInput
                    icon="lock"
                    placeholder="Digite a sua senha"
                    value={passwordField}
                    onChangeText={t => setPasswordField(t)}
                    password={true}
                />

                <CustomButton onPress={handleSignClick}>
                    <CustomButtonText>Login</CustomButtonText>
                </CustomButton>
            </InputArea>
            <SignMessageButton onPress={handleMessageButtonClick}>
                <SignMessageButtonText>Ainda não possui uma conta?</SignMessageButtonText>
                <SignMessageButtonTextBold>Cadastre-se</SignMessageButtonTextBold>
            </SignMessageButton>
        </Container>
    )
}