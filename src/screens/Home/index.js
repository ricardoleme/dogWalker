// cSpell:ignore Scroller
import React, { useState, useEffect, useContext } from 'react';
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
import { UserContext } from '../../contexts/UserContext'

import Api from '../../Api'
import BarberItem from '../../components/BarberItem'


export default () => {
    const { state: user } = useContext(UserContext)
    const navigation = useNavigation()

    const [locationText, setLocationText] = useState('')
    const [latitude, setLatitude] = useState(null)
    const [longitude, setLongitude] = useState(null)
    const [loading, setLoading] = useState(false)
    const [list, setList] = useState([])
    const [refreshing, setRefreshing] = useState(false)

    var location = null;


    async function handleLocationFinder() {
        //http://www.mapquestapi.com/geocoding/v1/reverse?key=jnXhx8FAN7mrYKXRGYKN9OACPzeoAfvR&location=30.333472,-81.470448
        let { status } = await Location.requestPermissionsAsync();
        if (status == 'granted') {
            //iremos limpar o campo localização da UI
            setLocationText('Obtendo a sua localização...')
            setLoading(true)
            location = await Location.getCurrentPositionAsync({});
            let lat = location.coords.latitude
            let lng = location.coords.longitude
            let url = `http://www.mapquestapi.com/geocoding/v1/reverse?key=jnXhx8FAN7mrYKXRGYKN9OACPzeoAfvR&location=${lat},${lng}`
            
            const endereco = await fetch(url)
            const cidade = await endereco.json()
            
            setLocationText(cidade.results[0].locations[0].adminArea5+", "+cidade.results[0].locations[0].adminArea3)
            //getBarbers()           
        } else {
            alert("Não há acesso a sua geolocalização. Digite sua cidade no campo por favor.")
        }
        setLoading(false)
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
        //getBarbers()
    }, [])


    const onRefresh = () => {
        setRefreshing(false)
        //getBarbers()
    }

    return (
        <Container>
            <Scroller refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                <HeaderArea>
                    <HeaderTitle numberOfLines={2}>
                        
                        {user.nome}, encontre um passeador para o seu pet
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