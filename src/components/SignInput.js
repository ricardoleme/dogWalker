import React from 'react'
import styled from 'styled-components/native'
import { AntDesign } from '@expo/vector-icons';

const InputArea = styled.View`
    width: 100%;
    height: 60px;
    background-color: #83D6E3;
    flex-direction: row;
    border-radius: 30px;
    padding-left: 15px;
    align-items: center;
    margin-bottom: 15px;
`
const Input = styled.TextInput`
    flex: 1;
    font-size: 16px;
    color: #268596;
    margin-left: 10px;
`

export default ({ icon, placeholder, value, onChangeText, password }) => {
    return (
        <InputArea>
            <AntDesign name={icon} size={40} color="#268596" />
            <Input 
            placeholder={placeholder}
            placeholderTextColor="#268596"
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={password}
            />
        </InputArea>
    )
}