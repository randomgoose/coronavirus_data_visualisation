import React from 'react'
import Item from './Item.js'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBookmark, faChartLine, faNewspaper} from '@fortawesome/free-solid-svg-icons'
import Dashboard from "../Dashboard";
import { connect } from 'react-redux'
import Bookmark from "../Bookmark";

class Sidebar extends React.Component {

    state = {
        focus: 'dashboard'
    }

    toggleTab = (tabName) => {
        this.setState({
            focus: tabName
        })
    }

    render() {
        let panelContent
        switch(this.state.focus) {
            case "dashboard":
                panelContent = <Dashboard date={this.props.date}/>
                break
            case "news":
                panelContent = null
                break
            case "bookmark":
                panelContent = <Bookmark />
                break
            default:
                panelContent = <Dashboard date={this.props.date}/>
        }

        return (
            <div className={"Sidebar"}>
                <div className={"Sidebar__nav"}>
                    <Item name={"dashboard"} focused={this.state.focus === 'dashboard'} handler={this.toggleTab}>
                        <FontAwesomeIcon className={"Item__icon"} icon={faChartLine} size={"lg"}/>
                    </Item>

                    <Item name={"bookmark"} focused={this.state.focus === 'bookmark'} handler={this.toggleTab}>
                        <FontAwesomeIcon className={"Item__icon"} icon={faBookmark} size={"lg"}/>
                    </Item>

                    <Item name={"news"} focused={this.state.focus === 'news'} handler={this.toggleTab}>
                        <FontAwesomeIcon className={"Item__icon"} icon={faNewspaper} size={"lg"}/>
                    </Item>
                </div>

                <div className={"Sidebar__panel"}>
                    <div className={"Sidebar__panel__title"}>{this.state.focus[0].toUpperCase() + this.state.focus.slice(1)}</div>
                    { panelContent}
                </div>
            </div>
        )
    }

}

function mapStateToProps(state){
    return state;
}

export default connect(mapStateToProps)(Sidebar)