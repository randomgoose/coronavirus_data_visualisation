const intialState = {
    hoveredProvinceId: null,
    coordinates: null,
    hoveredProvinceName: null,
    hoveredProvincePinyin: null,
    hoveredCountryId: null,
    hoveredCountryCode: null,
    hoveredCountryName: null,
    data_china: {},
    data_world: {},
    news: {},
    date: "2020-01-22",
    layersLoaded: false,
    progress: "",
    focusedCountryId: "",
    focusedCountryName: "",
    focusedCountryCode: "",
    focusedCountryCoordinates: ""
}

export function reducer(state=intialState, action) {
    switch(action.type) {
        case "HOVER_COUNTRY":
            return {
                ...state,
                hoveredCountryId: action.hoveredCountryId,
                hoveredCountryCode: action.hoveredCountryCode,
                hoveredCountryName: action.hoveredCountryName,
                coordinates: action.coordinates
            }
        // case "MOUSE_MOVE":
        //     return {
        //         ...state,
        //         hoveredProvinceId: action.hoveredProvinceId,
        //         coordinates: action.coordinates,
        //         hoveredProvinceName: action.hoveredProvinceName,
        //         hoveredProvincePinyin: action.hoveredProvincePinyin
        //     }
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
        case "LAYERS_FINISH_LOADING":
            return {
                ...state,
                layersLoaded: true
            }
        case "LOAD_LAYERS":
            return {
                ...state,
                progress: action.progress
            }
        case "FOCUS_ON_COUNTRY":
            console.log(action.focusedCountryCode)
            return {
                ...state,
                focusedCountryId: action.focusedCountryId,
                focusedCountryName: action.focusedCountryName,
                focusedCountryCoordinates: action.focusedCountryCoordinates,
                focusedCountryCode: action.focusedCountryCode
            }
        case "FETCH_NEWS":
            return {
                ...state,
                news: action.news
            }
        default:
            return state
    }
}