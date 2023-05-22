import React, { Component } from 'react'
import NewsItem from './NewsItem'
import propTypes from 'prop-types'

export default class News extends Component {

    static defaultProps = {
        country: 'us',
        PageSize: 8,
        category: 'general',
    }
    static propTypes = {
        country: propTypes.string,
        PageSize: propTypes.number
    }
    articles = [

    ]

    async updateNews() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9c4136563cb84f42becdbc8bfecc9ef2&page=${this.state.page}&pagesize=${this.props.PageSize}`
        let data = await fetch(url);
        let parsedData = await data.json();

        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults })
    }

    async componentDidMount() {
        this.updateNews();
    }

    constructor() {
        super();
        console.log("sahil")
        this.state = {
            articles: this.articles,
            loading: false,
            page: 1
        }

    }
    handlenext = async () => {
        this.setState({ page: this.state.page + 1 })
        this.updateNews();
    }

    handleprev = async () => {
        this.setState({ page: this.state.page - 1 })
        this.updateNews();


    }
    render() {
        return (
            <div className='container my-3'>
                <h1 className="text-center">NewsStack-Top HeadLines</h1>


                <div className="row">
                    {this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title ? element.title.slice(0, 44) : " "} description={element.description ? element.description.slice(0, 88) : ""} imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} />
                        </div>
                    })}

                </div>

                <div className="container d-flex justify-content-between ">
                    <button disabled={this.state.page <= 1} type="button" class="btn btn-dark" onClick={this.handleprev}>&larr;Previous</button>
                    <button type="button" class="btn btn-dark sm-2" onClick={this.handlenext}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}
