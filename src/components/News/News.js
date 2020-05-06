import React from 'react'
import ProgressAnimation from "../ProgressAnimation";
import {alpha3ToAlpha2} from 'i18n-iso-countries'
import {connect} from 'react-redux'

class News extends React.Component {
    constructor(props) {
        super(props);
    }

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     fetch(url)
    //         .then(res => res.json())
    //         .then(data => this.setState({
    //             data
    //         }))
    // }
    //
    // componentDidMount() {
    //     fetch(url)
    //         .then(res => res.json())
    //         .then(data => this.setState({
    //             data
    //         }))
    // }

    render() {

        const news = !this.props.news ? <ProgressAnimation/> : this.props.news.articles ? this.props.news.articles.map(article => (
            <div key={this.props.news.articles.indexOf(article)} className={"News__entry"}>
                <a href={article.url} className={"News__url"}>
                    <img className={"News__image"} src={article.urlToImage} alt={"alt"}/>
                    <div className={"News__title"}>{article.title}</div>
                    <div className={"News__source"}>{article.source.name}</div>
                </a>
            </div>
        )) : <div>Click on a country to view its news</div>


        return (
            <div className={"News"}>
                <div>{"News in " + this.props.focusedCountryName}</div>
                {news}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps)(News)