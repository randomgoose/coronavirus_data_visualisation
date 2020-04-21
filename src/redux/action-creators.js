export function mousemove(hoveredProvinceId, coordinates, hoveredProvinceName, hoveredProvincePinyin) {
    return {
        type: "MOUSE_MOVE",
        hoveredProvinceId,
        coordinates,
        hoveredProvinceName,
        hoveredProvincePinyin
    }
}

export function fetchData() {
    return (dispatch, getState) => {
        const url = "https://coronavirus-tracker-api.herokuapp.com/v2/locations?source=jhu&country_code=CN&timelines=true"
        
        fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            dispatch({
                type: "FETCH_DATA",
                data: data
            })             
        })
    }
}