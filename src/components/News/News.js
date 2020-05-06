import React from 'react'
import ProgressAnimation from "../ProgressAnimation";
import {alpha3ToAlpha2} from 'i18n-iso-countries'
import {connect} from 'react-redux'

class News extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            countryCode: this.props.focusedCountryCode,
            data: null
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    componentDidMount() {

        const countryCode = this.props.focusedCountryCode ? alpha3ToAlpha2(this.props.focusedCountryCode) : "gb"
        console.log(countryCode)
        const url = "https://newsapi.org/v2/top-headlines?q=coronavirus&apiKey=57f93d392c59452fa5341a4dc1d1c29d" + "&country=" + countryCode
        fetch(url)
            .then(res => res.json())
            .then(data => this.setState({
                data
            }))
    }

    render() {

        const news = this.state.data ? this.state.data.articles.map(article => (
            <div key={this.state.data.articles.indexOf(article)} className={"News__entry"}>
                <a href={article.url} className={"News__url"}>
                    <img className={"News__image"} src={article.urlToImage} alt={"alt"}/>
                    <div className={"News__title"}>{article.title}</div>
                    <div className={"News__source"}>{article.source.name}</div>
                </a>
            </div>
        )) : <ProgressAnimation/>


        return (
            <div className={"News"}>
                <div>{this.props.focusedCoutnryId}</div>
                {news}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps)(News)