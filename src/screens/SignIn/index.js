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

    const handleMessageButtonClick = () => {
        //iremos enviá-lo para o SignUp, sem a possibilidade de voltar. (se voltar, fecha o App )
        navigation.reset({
            routes: [{ name: 'SignUp' }]
        })
    }

    const handleSignClick = () => {

    }

    return (
        <Container>
            <Walker height="40%" />
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