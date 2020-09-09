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
        id: route.params.id,
        avatar: route.params.avatar,
        name: route.params.name,
        stars: route.params.stars
    })
    const [loading, setLoading] = useState(false)
    const [favorited, setFavorited] = useState(false)

    useEffect(() => {
        const getBarberInfo = async () => {
            setLoading(true)
            let json = await Api.getBarber(userInfo.id)
            if (json.error) {
                alert(json.error)
            } else {
                setUserInfo(json.data)
                setFavorited(json.data.favorited)
            }
            setLoading(false)
        }
        getBarberInfo()
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
                    userInfo.photos && userInfo.photos.length > 0
                        ? <Swiper
                            style={{ height: 240 }}
                            dot={<SwipeDot />}
                            activeDot={<SwipeDotActive />}
                            paginationStyle={{ top: 15, right: 15, bottom: null, left: null }}
                            autoplay={true}
                        >
                            {userInfo.photos.map((item, key) => (
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
                            <UserInfoName>{userInfo.name}</UserInfoName>
                            <Stars stars={userInfo.stars} showNumber={true} />
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
                    {userInfo.services &&
                        <ServiceArea>
                            <ServiceTitle>Lista de Serviços</ServiceTitle>
                            {userInfo.services.map((item, key) => (
                                <ServiceItem key={key}>
                                    <ServiceInfo>
                                        <ServiceName>{item.name}</ServiceName>
                                        <ServicePrice>R$ {item.price}</ServicePrice>
                                    </ServiceInfo>
                                    <ServiceChooseButton>
                                        <ServiceChooseBtnText>Agendar</ServiceChooseBtnText>
                                    </ServiceChooseButton>
                                </ServiceItem>
                            ))}
                        </ServiceArea>
                    }
                    {userInfo.testimonials && userInfo.testimonials.length > 0 &&
                        <TestimonialArea>
                            <Swiper
                                style={{ height: 110 }}
                                showsPagination={false}
                                showsButtons={true}
                                prevButton={<AntDesign name="arrowleft" size={35} color="#000" />}
                                nextButton={<AntDesign name="arrowright" size={35} color="#000" />}
                            >
                                {userInfo.testimonials.map((item, key) => (
                                    <TestimonialItem key={key}>
                                        <TestimonialInfo>
                                            <TestimonialName>{item.name}</TestimonialName>
                                            <Stars stars={item.rate} showNumber={false} />
                                        </TestimonialInfo>
                                        <TestimonialBody>
                                            {item.body}
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