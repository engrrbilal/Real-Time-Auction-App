const dataReducerDefaultState = {
    usersData:[],
    companyData:[],
    userProfile:[],
    updateData:[],
    submitAuctionData:[],
    auctionsData:[],
    submitBidData:[]
}

export default (state = dataReducerDefaultState, action) => {
    switch (action.type) {

            case 'USER-DATA':
            return ({
                ...state,
                    usersData:action.data
            })
            case 'START-SUBMIT-AUCTION':
            return ({
                ...state,
                    submitAuctionData:action.data
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
                    submitBidData:action.data
            })
            case 'DELETE-USER':
            return ({
                ...state,
                deleteStudent:action.data
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