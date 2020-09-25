// cSpell:ignore Scroller, endereco, usuario
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
import AsyncStorage from '@react-native-community/async-storage';

import Api from '../../Api'
import DogWalkerItem from '../../components/DogWalkerItem'
import Constants from 'expo-constants';

export default () => {

    //Carregando registros na primeira vez
    useEffect(() => {
        getPasseadores()
    }, [])

    //Verificando usuário logado
    useEffect(() => {
        verificaUsuario()
    }, [usuario])

    const verificaUsuario = async () => {
        setLoading(true)
        setUsuario([])
        let dados = await AsyncStorage.getItem('usuario')
        setUsuario(JSON.parse(dados))
        setLoading(false)
    }

    const navigation = useNavigation()
    const [locationText, setLocationText] = useState('')
    const [loading, setLoading] = useState(false)
    const [list, setList] = useState([])
    const [refreshing, setRefreshing] = useState(false)
    const [usuario, setUsuario] = useState([])

    var location = null;

    async function handleLocationFinder() {
        let { status } = await Location.requestPermissionsAsync();
        if (status == 'granted') {
            //iremos limpar o campo localização da UI
            setLocationText('Obtendo a sua localização...')
            setLoading(true)
            location = await Location.getCurrentPositionAsync({});
            let lat = location.coords.latitude
            let lng = location.coords.longitude
            let keyMap = Constants.manifest.extra.MAP_QUEST_API_KEY
            let url = `http://www.mapquestapi.com/geocoding/v1/reverse?key=${keyMap}&location=${lat},${lng}`

            const endereco = await fetch(url)
            const cidade = await endereco.json()

            setLocationText(cidade.results[0].locations[0].adminArea5 + ", " + cidade.results[0].locations[0].adminArea3)
            //getPasseadores(token)          
        } else {
            alert("Não há acesso a sua geolocalização. Digite sua cidade no campo por favor.")
        }
        setLoading(false)
    }

    const getPasseadores = async () => {
        setLoading(true)
        setList([])
        let res = await Api.getPasseadores()
        setList(res)
        setLoading(false)
    }




    const onRefresh = () => {
        setRefreshing(false)
        getPasseadores()
    }

    return (
        <Container>
            <Scroller refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                <HeaderArea>
                    <HeaderTitle numberOfLines={2}>
                        {usuario !== null
                            ? `${usuario.nome}, encontre um profissional para o seu pet`
                            : 'Encontre um profissional para o seu pet'}

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
                        <DogWalkerItem key={k} data={item} />
                    ))}
                </ListArea>
            </Scroller>
        </Container>
    )
}