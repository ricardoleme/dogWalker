import React, { useState } from 'react'
import {
    Container, InputArea, CustomButton, CustomButtonText,
    SignMessageButton, SignMessageButtonText, SignMessageButtonTextBold
} from './styles'
import { useNavigation } from '@react-navigation/native'

import Walker from '../../components/icons/Walker'
import SignInput from '../../components/SignInput'


export default () => {
    const navigation = useNavigation()

    const [emailField, setEmailField] = useState(null)
    const [passwordField, setPasswordField] = useState(null)
    const [nameField, setNameField] = useState(null)

    const handleMessageButtonClick = () => {
        //iremos enviá-lo para o SignUp, sem a possibilidade de voltar. (se voltar, fecha o App )
        navigation.reset({
            routes: [{ name: 'SignIn' }]
        })
    }

    const handleSignClick = () => {

    }

    return (
        <Container>
            <Walker height="40%" />
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