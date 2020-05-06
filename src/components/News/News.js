import React from 'react'
import ProgressAnimation from "../ProgressAnimation";

class News extends React.Component {
    state = {
        data: null
    }

    componentDidMount() {
        const url = "https://newsapi.org/v2/top-headlines?q=coronavirus&apiKey=57f93d392c59452fa5341a4dc1d1c29d"

        fetch(url)
            .then(res => res.json())
            .then(data => this.setState({
                data
            }))
    }

    render() {

        // No re-render here !!! need to be fixed !!!

        const news = this.state.data ? this.state.data.articles.map(article => (
            <div key={this.state.data.articles.indexOf(article)} className={"News__entry"}>
                <a href={article.url} className={"News__url"}>
                    <img className={"News__image"} src={article.urlToImage} alt={"alt"}/>
                    <div className={"News__title"}>{article.title}</div>
                    <div className={"News__source"}>{article.source.name}</div>
                </a>
            </div>
        )) : <ProgressAnimation />


        return (
            <div className={"News"}>
                { news }
            </div>
        )
    }
}

export default News