const intialState = {
    hoveredProvinceId: null,
    coordinates: null,
    hoveredProvinceName: null,
    hoveredProvincePinyin: null,
    data_china: {},
    data_world: {},
    date: "2020-01-22"
}

export function reducer(state=intialState, action) {
    switch(action.type) {
        case "MOUSE_MOVE":
            return {
                ...state,
                hoveredProvinceId: action.hoveredProvinceId,
                coordinates: action.coordinates,
                hoveredProvinceName: action.hoveredProvinceName,
                hoveredProvincePinyin: action.hoveredProvincePinyin
            }
        case "FETCH_DATA":
            return {
                ...state,
                data_china: action.data_china
            }
        case "FETCH_ALL_DATA":
            return { 
                ...state,
                data_world: action.data_world
            }
        case "CHANGE_DATE":
            return {
                ...state,
                date: action.newDate
            }
        default:
            return state
    }
}