const userReducerDefaultState = [{
    id:"",
    fullName:'',
    email:'',
    password:'',
    createdAt:0
}]

export default (state = userReducerDefaultState, action) => {
    switch (action.type) {

        case 'CREATE-USER':
            return [
                ...state,
                action.user
            ]

        case 'USER-SIGNIN':
            return {
                ...state,
                ...action.user
            }
        default:
            return state;
    }

}