// cSpell:Ignore scroller, ionicons, favorited
import React, { useState, useEffect } from 'react';
import {
    Container,
    Scroller,
    FakeSwiper,
    PageBody,
    UserInfoArea,
    ServiceArea,
    TestimonialArea,
    SwipeDot,
    SwipeDotActive,
    SwipeItem,
    SwipeImage,
    UserAvatar,
    UserInfo,
    UserInfoName,
    UserFavButton,
    BackButton,
    LoadingIcon,
    ServiceItem,
    ServiceInfo,
    ServiceName,
    ServicePrice,
    ServiceChooseButton,
    ServiceChooseBtnText,
    ServiceTitle,
    TestimonialItem,
    TestimonialBody,
    TestimonialInfo,
    TestimonialName
} from './styles';
import { useNavigation, useRoute } from '@react-navigation/native'

import { AntDesign, Ionicons } from '@expo/vector-icons';

import Swiper from 'react-native-swiper'
/*Para resolver o bug de readonly no Swiper, edite o arquivo node_modules/react-native-swiper/index.js
Comentar as linhas : module.exports = Swiper 
Adicionar: export default Swiper;
*/

import Api from '../../Api'
import Stars from '../../components/Stars'


export default () => {
    const navigation = useNavigation()
    const route = useRoute()

    const [userInfo, setUserInfo] = useState({
        _id: route.params._id,
        avatar: route.params.avatar,
        nome: route.params.nome,
        estrelas: route.params.estrelas
    })
    const [loading, setLoading] = useState(false)
    const [favorited, setFavorited] = useState(false)

    useEffect(() => {
        const getPasseadorInfo = async () => {
            setLoading(true)
            let json = await Api.getPasseador(userInfo._id)
            if (json.error) {
                alert(json.error)
            } else {
                setUserInfo(json)
                setFavorited(json.favorited)
            }
            setLoading(false)
        }
        getPasseadorInfo()
    }, [])

    const handleBackButton = () => {
        navigation.goBack()
    }
const handleFavClick = () => {
    setFavorited(!favorited)
}
    return (
        <Container>
            <Scroller>
                {
                    userInfo.fotos && userInfo.fotos.length > 0
                        ? <Swiper
                            style={{ height: 240 }}
                            dot={<SwipeDot />}
                            activeDot={<SwipeDotActive />}
                            paginationStyle={{ top: 15, right: 15, bottom: null, left: null }}
                            autoplay={true}
                        >
                            {userInfo.fotos.map((item, key) => (
                                <SwipeItem key={key}>
                                    <SwipeImage source={{ uri: item.url }} resizeMode="cover" />
                                </SwipeItem>
                            ))}
                        </Swiper>
                        : <FakeSwiper></FakeSwiper>
                }
                <PageBody>
                    <UserInfoArea>
                        <UserAvatar source={{ uri: userInfo.avatar }} />
                        <UserInfo>
                            <UserInfoName>{userInfo.nome} </UserInfoName>
                            <Stars stars={userInfo.estrelas} showNumber={true} />
                        </UserInfo>
                        <UserFavButton onPress={handleFavClick}>
                            {favorited 
                            ? <AntDesign name="heart" size={24} color="#FF0000" />
                            : <AntDesign name="hearto" size={24} color="#AAA" />
                            }

                        </UserFavButton>
                    </UserInfoArea>
                    {loading &&
                        <LoadingIcon size="large" color="#000" />
                    }
                    {userInfo.servicos &&
                        <ServiceArea>
                            <ServiceTitle>Lista de Serviços</ServiceTitle>
                            {userInfo.servicos.map((item, key) => (
                                <ServiceItem key={key}>
                                    <ServiceInfo>
                                        <ServiceName>{item.nome}</ServiceName>
                                        <ServicePrice>R$ {item.preco}</ServicePrice>
                                    </ServiceInfo>
                                    <ServiceChooseButton>
                                        <ServiceChooseBtnText>Agendar</ServiceChooseBtnText>
                                    </ServiceChooseButton>
                                </ServiceItem>
                            ))}
                        </ServiceArea>
                    }
                    {userInfo.testemunhos && userInfo.testemunhos.length > 0 &&
                        <TestimonialArea>
                            <Swiper
                                style={{ height: 110 }}
                                showsPagination={false}
                                showsButtons={true}
                                prevButton={<AntDesign name="arrowleft" size={35} color="#000" />}
                                nextButton={<AntDesign name="arrowright" size={35} color="#000" />}
                            >
                                {userInfo.testemunhos.map((item, key) => (
                                    <TestimonialItem key={key}>
                                        <TestimonialInfo>
                                            <TestimonialName>{item.usuario}</TestimonialName>
                                            <Stars stars={item.estrelas} showNumber={false} />
                                        </TestimonialInfo>
                                        <TestimonialBody>
                                            {item.texto}
                                        </TestimonialBody>
                                    </TestimonialItem>
                                )
                                )}
                            </Swiper>

                        </TestimonialArea>
                    }
                </PageBody>
            </Scroller>
            <BackButton onPress={handleBackButton}>
                <Ionicons name="ios-arrow-back" size={44} color="#FFF" />
            </BackButton>
        </Container>
    )
}