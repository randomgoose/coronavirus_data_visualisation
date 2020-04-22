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
            dispatch({
                type: "FETCH_DATA",
                data_china: data
            })             
        })
        .catch(err => {
            console.log(err)
        })
    }
}

export function fetchAllData() {
    return (dispatch, getState) => {
        const url = "https://coronavirus-tracker-api.herokuapp.com/all"

        fetch(url)
        .then(res => res.json())
        .then(data => {
            dispatch({
                type: "FETCH_ALL_DATA",
                data_world: data
            })
        })
    }
}

export function changeDate(newDate) {
    return {
        type: "CHANGE_DATE",
        newDate
    }
}