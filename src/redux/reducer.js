const intialState = {
    hoveredProvinceId: null,
    coordinates: null,
    hoveredProvinceName: null,
    hoveredProvincePinyin: null,
    data: {}
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
                data: action.data
            }    
        default:
            return map
    }
}