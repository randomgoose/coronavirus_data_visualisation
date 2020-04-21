import React from 'react'

class TimeSlider extends React.Component {

        render() {
                return (
                        <div className="TimeSlider">
                                <input type="range" min="0" max="11" step="1" value="0"></input>
                        </div>
                )
        }

}

export default TimeSlider