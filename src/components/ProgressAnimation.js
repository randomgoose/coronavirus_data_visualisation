import React from 'react'

class ProgressAnimation extends React.Component {

    render() {
        const subDivs = [0, 1, 2, 3, 4, 5, 6, 7, 8].forEach(item => <div key={item}></div>)

        return (
            <div className={`ProgressAnimation ${this.props.fs ? "fullscreen" : "default"}`}>
                <div className={"ProgressAnimation__text"}>加载中</div>
                {/*{subDivs}*/}
                <div className={"ProgressAnimation__group"}>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        )
    }
}

export default ProgressAnimation