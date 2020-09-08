import React, { useContext } from 'react'
import styled from 'styled-components/native'
import { Ionicons } from '@expo/vector-icons';

export default ({ stars, showNumber }) => {
    let estrela = [0, 0, 0, 0, 0] // 0 vazio, 1 meia, 2 cheia
    let floor = Math.floor(stars) // retorna o valor inteiro
    let left = stars - floor

    for (var i = 0; i < floor; i++) {
        estrela[i] = 2
    }

    if (left > 0) {
        estrela[i] = 1
    }

    return (
        <StarArea>
            {estrela.map((i, k) => (

                <StarView key={k}>
                    {i === 0 && <Ionicons name="md-star-outline" size={18} color="#FF9200" />}
                    {i === 1 && <Ionicons name="md-star-half" size={18} color="#FF9200" />}
                    {i === 2 && <Ionicons name="md-star" size={18} color="#FF9200" />}
                </StarView>
            ))}
            {showNumber && <StarText>{stars}</StarText>}
        </StarArea>
    )
}

const StarArea = styled.View`
flex-direction: row;
`
const StarView = styled.View``

const StarText = styled.Text`
font-size: 12px;
font-weight: bold;
margin-left: 15px;
color: #737373;
`