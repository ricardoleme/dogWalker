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
    const [nameField, setNameField] = useState('')

    const handleMessageButtonClick = () => {
        //iremos enviá-lo para o SignUp, sem a possibilidade de voltar. (se voltar, fecha o App )
        navigation.reset({
            routes: [{ name: 'SignIn' }]
        })
    }

    const handleSignClick = async () => {
        if (nameField && passwordField && emailField) {
            let res = await Api.signUp(nameField, emailField, passwordField)
            if (res.token) {
                await AsyncStorage.setItem('token', res.token)
                let usuario = await Api.checkToken(res.token)
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
                alert("Erro: " + JSON.stringify(res.errors))
            }
        } else {
            alert('Preencha todos os campos')
        }

    }

    return (
        <Container>
            <Logo>
            <Dog />
            </Logo>
            <InputArea>
                <SignInput
                    icon="user"
                    placeholder="Digite o seu nome completo"
                    value={nameField}
                    onChangeText={t => setNameField(t)}
                />
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
                    <CustomButtonText>Cadastrar</CustomButtonText>
                </CustomButton>
            </InputArea>
            <SignMessageButton onPress={handleMessageButtonClick}>
                <SignMessageButtonText>Já possui uma conta?</SignMessageButtonText>
                <SignMessageButtonTextBold>Efetue o Login</SignMessageButtonTextBold>
            </SignMessageButton>
        </Container>
    )
}