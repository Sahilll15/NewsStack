import React, { Component } from 'react'
import NewsItem from './NewsItem'
import propTypes from 'prop-types'

export default class News extends Component {

    static defaultProps = {
        country: 'in',
        PageSize: 9,
        category: 'general',
    }
    static propTypes = {
        country: propTypes.string,
        PageSize: propTypes.number
    }
    articles = [

    ]

    async updateNews() {
        this.props.setProgess(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}  &page=${this.state.page}&pagesize=${this.props.PageSize}`
        let data = await fetch(url);
        this.props.setProgess(30);
        let parsedData = await data.json();
        this.props.setProgess(50);

        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false, })
        this.props.setProgess(100);
    }

    async componentDidMount() {
        this.updateNews();
    }
    capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    constructor(props) {
        super(props);
        console.log("sahil")
        this.state = {
            articles: this.articles,
            loading: false,
            page: 1
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsStack`;

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
                <h1 className="text-center">NewsStack-Top HeadLines on {this.capitalizeFirstLetter(this.props.category)} Category</h1>


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
