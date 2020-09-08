// cSpell:ignore Scroller
import React, { useState, useEffect } from 'react';
import { RefreshControl } from 'react-native'
import {
    Container,
    Scroller,
    HeaderArea,
    HeaderTitle,
    SearchButton,
    LocationArea,
    LocationInput,
    LocationFinder,
    LoadingIcon,
    ListArea
} from './styles';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import * as Location from 'expo-location';

import Api from '../../Api'
import BarberItem from '../../components/BarberItem'


export default () => {

    const navigation = useNavigation()

    const [locationText, setLocationText] = useState('')
    const [latitude, setLatitude] = useState(null)
    const [longitude, setLongitude] = useState(null)
    const [loading, setLoading] = useState(false)
    const [list, setList] = useState([])
    const [refreshing, setRefreshing] = useState(false)

    var location = null;


    async function handleLocationFinder() {
        let { status } = await Location.requestPermissionsAsync();
        if (status == 'granted') {
            //iremos limpar o campo localização da UI
            setLocationText('Obtendo a sua localização...')
            location = await Location.getCurrentPositionAsync({});
               
            setLatitude(location.coords.latitude)
            console.log(latitude)
            //https://pt-br.reactjs.org/docs/hooks-rules.html
            getBarbers()
            

        } else {
            alert("Não há acesso a sua geolocalização. Digite no campo por favor.")
        }
    }

    const getBarbers = async () => {
        setLoading(true)
        setList([])
        let lat = null
        let lng = null
        if (latitude && longitude) {
            lat = latitude
            lng = longitude
        }
        let res = await Api.getBarbers(lat, lng)
        if (res.error === '') {
            if (res.loc) {
                setLocationText(res.loc)
            }
            setList(res.data)
        } else {
            alert("Erro: " + res.error)
        }
        setLoading(false)
    }

    //Carregando registros na primeira vez
    useEffect(() => {
        getBarbers()
    }, [])


    const onRefresh = () => {
        setRefreshing(false)
        getBarbers()
    }

    return (
        <Container>
            <Scroller refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                <HeaderArea>
                    <HeaderTitle numberOfLines={2}>
                        Encontre um passeador para o seu pet
                    </HeaderTitle>
                    <SearchButton onPress={() => navigation.navigate('Search')}>
                        <AntDesign name="search1" size={26} color="#FFFFFF" />
                    </SearchButton>
                </HeaderArea>

                <LocationArea>
                    <LocationInput
                        placeholder="Onde você está?"
                        placeholderTextColor="#FFF"
                        value={locationText}
                        onChangeText={t => setLocationText(t)}
                    />
                    <LocationFinder onPress={handleLocationFinder}>
                        <AntDesign name="find" size={24} color="#FFFFFF" />
                    </LocationFinder>
                </LocationArea>
                {loading &&
                    <LoadingIcon size="large" color="#FFF" />
                }
                <ListArea>
                    {list.map((item, k) => (
                        <BarberItem key={k} data={item} />
                    ))}
                </ListArea>
            </Scroller>
        </Container>
    )
}