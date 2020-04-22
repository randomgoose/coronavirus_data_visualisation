const intialState = {
    hoveredProvinceId: null,
    coordinates: null,
    hoveredProvinceName: null,
    hoveredProvincePinyin: null,
    data_china: {},
    data_world: {},
    date: new Date()
}

export function reducer(map=intialState, action) {
    switch(action.type) {
        case "MOUSE_MOVE":
            return {
                ...map,
                hoveredProvinceId: action.hoveredProvinceId,
                coordinates: action.coordinates,
                hoveredProvinceName: action.hoveredProvinceName,
                hoveredProvincePinyin: action.hoveredProvincePinyin
            }
        case "FETCH_DATA":
            return {
                ...map,
                data_china: action.data_china
            }
        case "FETCH_ALL_DATA":
            return { 
                ...map,
                data_world: action.data_world
            }
        default:
            return map
    }
}