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

export function changeDate(newDate, value) {
    return {
        type: "CHANGE_DATE",
        newDate
    }
}

export function layersFinishLoading() {
    return {
        type: "LAYERS_FINISH_LOADING"
    }
}

export function loadLayers(progress) {
    return {
        type: "LOAD_LAYERS",
        progress
    }
}

export function hoverCountry(hoveredCountryId, hoveredCountryCode, hoveredCountryName, coordinates) {
    return {
        type: "HOVER_COUNTRY",
        coordinates,
        hoveredCountryId,
        hoveredCountryName,
        hoveredCountryCode
    }
}

export function focusOnCountry (focusedCountryId, focusedCountryCode, focusedCountryName, focusedCountryCoordinates) {
    return {
        type: "FOCUS_ON_COUNTRY",
        focusedCountryId,
        focusedCountryCode,
        focusedCountryName,
        focusedCountryCoordinates
    }
}