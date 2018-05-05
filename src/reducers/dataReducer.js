const dataReducerDefaultState = {
    userData:[],
    companyData:[],
    jobPost:[],
    jobData:[],
    userProfile:[],
    updateData:[],
    addArea:[],
    parkingArea:[],
    bookedSlots:[],
    cancelSlots:[],
    usersFeedback:[],
    feedbackReply:[]
}

export default (state = dataReducerDefaultState, action) => {
    switch (action.type) {

            case 'USER-DATA':
            return ({
                ...state,
                    userData:action.data
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
            case 'ADD-AREA':
            return({
                ...state,
                addArea:action.parkingArea,
                addSlots:action.parkingSlots
            })
            case 'AREA-DATA':
            return({
                ...state,
                parkingArea:action.data
            })
            case 'START-BOOKING':
            return({
                ...state,
                bookedSlots:action.data
            })
            case 'CANCEL-BOOKING':
            return({
                ...state,
                cancelSlots:action.data
            })
            case 'USER-FEEDBACKS-DATA':
            console.log(action.data)
            return({
                ...state,
               usersFeedback:action.data
            })
            case 'USER-FEEDBACK-REPLY':
            console.log(action.data)
            return({
                ...state,
               feedbackReply:action.data
            })
        default:
            return state;
    }
}