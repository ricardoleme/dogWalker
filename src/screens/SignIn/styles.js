import React from 'react'
import styled from 'styled-components/native'

export const Container = styled.SafeAreaView`
background-color: #52B5AC;
flex: 1;
justify-content: center;
align-items: center;
`


export const InputArea = styled.View`
padding: 40px;
width: 100%;
`
export const Logo = styled.View`
transform: scale(0.5)
`

export const CustomButton = styled.TouchableOpacity`
height: 60px;
background-color: #268596;
border-radius: 30px;
justify-content: center;
align-items: center;
`
export const CustomButtonText = styled.Text`
font-size: 18px;
color: #FFF;

`
export const SignMessageButton = styled.TouchableOpacity`
flex-direction: row;
justify-content: center;
margin-top: 20px;
margin-bottom: 50px;
`
export const SignMessageButtonText = styled.Text`
font-size: 14px;
color: #268596;
`
export const SignMessageButtonTextBold = styled.Text`
font-size: 14px;
color: #fff;
font-weight: bold;
margin-left: 5px;
margin-bottom: 50px;
`