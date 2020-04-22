import React from 'react'

class TimeSlider extends React.Component {


        state = {
                        value: 0
                }
       

        render() {
                return (
                        <div className="TimeSlider">
                                <input type="range" min="0" max="11" step="1" value="5" onChange={e => console.log(e.target)}></input>
                        </div>
                )
        }

}

export default TimeSlider