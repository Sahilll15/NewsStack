import React, { Component } from 'react'

export class NewsItem extends Component {


    render() {
        let { title, description, imgUrl, newsUrl, author, date } = this.props;
        return (
            <div className='my-4'>
                <div className="card" >
                    <img src={!imgUrl ? "https://images.cnbctv18.com/wp-content/uploads/2022/06/Nothing2-1019x573.jpg" : imgUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className="text-muted">by {!author ? "unknown" : author} on {new Date(date).toGMTString()}</small></p>
                        <a href={newsUrl} target='_blank' className="btn btn-sm btn-primary">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
