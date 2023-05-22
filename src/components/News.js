import React, { Component } from 'react'
import NewsItem from './NewsItem'

export default class News extends Component {
    articles = [

    ]

    async componentDidMount() {
        let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=9c4136563cb84f42becdbc8bfecc9ef2&pagesize=20"
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults })
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
        console.log("next")
        if (this.state.page + 1 > Math.ceil(this.state.totalResults / 20)) {

        } else {


            let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=9c4136563cb84f42becdbc8bfecc9ef2&page=${this.state.page + 1}&pagesize=20`
            let data = await fetch(url);
            let parsedData = await data.json();
            console.log(parsedData);

            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles

            })
        }
    }

    handleprev = async () => {
        console.log("prev")
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=9c4136563cb84f42becdbc8bfecc9ef2&page=${this.state.page - 1}&pagesize=20`
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            page: this.state.page = -1,
            articles: parsedData.articles

        })


    }
    render() {
        return (
            <div className='container my-3'>
                <h1 className="text-center">NewsStack-Top HeadLines</h1>


                <div className="row">
                    {this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title ? element.title.slice(0, 44) : " "} description={element.description ? element.description.slice(0, 88) : ""} imgUrl={element.urlToImage} newsUrl={element.url} />
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
