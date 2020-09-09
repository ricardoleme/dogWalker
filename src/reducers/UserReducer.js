export const initialState = {
    avatar: '',
    favorites: [],
    appointments: []
}

export const UserReducer = (state, action) => {
    switch(action.type){
        case 'setAvatar':
            return { ...state, avatar: action.payload.avatar }
            break
        case 'setNome':
            return { ...state, nome: action.payload.nome }
            break    
        default:
            return state
    }

}