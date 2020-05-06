import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch, faShieldVirus} from '@fortawesome/free-solid-svg-icons'

class Header extends React.Component {
    render() {
        return (
            <div className={"Header"}>
                <div className={"Header__logo-box"}>
                    <FontAwesomeIcon className={"Header__logo"} icon={faShieldVirus} size={"2x"} color={"red"}/>
                </div>
                <div className={"Header__title"}>
                    <span className={"Header__title-up"}>Covid-19</span>
                    <span className={"Header__title-down"}>Dashboard</span>
                </div>
                <div className={"Header__search-box"}>
                    <FontAwesomeIcon className={"Header__search-logo"} icon={faSearch} />
                    <input type="search" className={"Header__search"}/>
                </div>

            </div>
        );
    }
}

export default Header