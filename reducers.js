import {combineReducers} from 'redux'

import {SELECT_WORKSPACE} from './actions'

function selectworkspace(state,action) {
    switch (action.type){
        case SELECT_WORKSPACE:
            return fetch("http://www.subreddit.com/r/reactjs.json")
                .then(response=>response.json())
                .then(json=>
                    console.log(`json = ${json.kind}`)
                )
        default:
            return state
    }
}
const rootReducer =combineReducers({
    selectworkspace
})

export default rootReducer