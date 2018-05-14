const dataReducerDefaultState = {
    usersData:[],
    companyData:[],
    userProfile:[],
    updateData:[],
    submitAuctionData:[],
    auctionsData:[],
    submitBidData:[],
    flag:''
}

export default (state = dataReducerDefaultState, action) => {
    switch (action.type) {

            case 'USER-DATA':
            return ({
                ...state,
                    usersData:action.data
            })
            case 'START-SUBMIT-AUCTION':
            console.log(action.flag)
            
            return ({
                ...state,
                    submitAuctionData:action.data,
                    flag:action.flag
            })
            case 'AUCTIONS-DATA':
            console.log(action.data)
            return ({
                ...state,
                auctionsData:action.data
            })
            case 'START-SUBMIT-BID':
            return ({
                ...state,
                    submitBidData:action.data,
            })
            case 'USER-PROFILE-DATA':
            return ({
                ...state,
                userProfile:action.data
            })
            case 'UPDATE-USER':
            return({
                ...state,
                updateData:action.updates
                })
            
        default:
            return state;
    }
}