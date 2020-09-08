// cSpell:ignore Scroller
import React from 'react'
import styled from 'styled-components/native'

export const Container = styled.SafeAreaView`
background-color: #52B5AC;
flex: 1;
justify-content: center;
align-items: center;
`

export const Scroller = styled.ScrollView`
flex: 1;
padding: 5px;
`

export const HeaderArea = styled.View`
flex-direction: row;
justify-content: space-between;
align-items: center;
`

export const HeaderTitle = styled.Text`
width: 280px;
font-size: 20px;
font-weight: bold;
color: #FFF;
margin-top: 15px;
`

export const SearchButton = styled.TouchableOpacity`
width: 26px;
height: 26px;

`

export const LocationArea = styled.View`
background-color: #4EADBE;
height: 60px;
border-radius: 30px;
flex-direction: row;
align-items: center;
padding-left: 10px;
padding-right: 10px;
margin-top: 30px;
`

export const LocationInput = styled.TextInput`
flex: 1;
font-size: 16px;
color: #FFF;

`

export const LocationFinder = styled.TouchableOpacity`
width: 24px;
height: 24px;
`

export const LoadingIcon = styled.ActivityIndicator`
margin-top: 50px;
`

export const ListArea = styled.View`
margin-top: 30px;
margin-bottom: 30px;
`