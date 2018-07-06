import React, { Component } from 'react';
import "./Search.css";
import API from '../../utils/API';
import { List, ListItem } from "../../components/List";
// import DeleteBtn from "../../components/DeleteBtn";
// import axios from "axios";
// import Saved from "../Saved";
class Search extends Component {
    state = {
        articles: [],
        savedArticles: [],
        queryTerm: '',
        startDate: '',
        endDate: ''
    };

    componentDidMount() {
        this.loadSavedArticles();
    }

    loadSavedArticles = () => {
        API.getSavedArticles()
        .then(res => {
            this.setState({ savedArticles: res.data })
        })
        .catch(err => console.log(err))
    };

    loadSearchedArticles = (queryTerm) => {
        this.setState({articles: []});
        this.getArticles(queryTerm)
    };

    getArticles = () => {    
        API.nytSearch(this.state.queryTerm, this.state.startDate, this.state.endDate)
          .then(res => {
            // console.log(res);
            this.setState({
              articles: res.data.response.docs,
              queryTerm: '',
              startDate: '',
              endDate: ''
            });
          })
          .catch(err => console.log(err));
    };

    handleQueryTermsChange = event => {
        this.setState({queryTerm: event.target.value});
    };

    handleStartDateChange = event => {
        this.setState({startDate: event.target.value});
    };

    handleEndDateChange = event => {
        this.setState({endDate: event.target.value});
    };

    handleFormSubmit = event => {
        event.preventDefault();
        this.setState({ articles: [] })
        this.getArticles();
    };

    handleDelete = event => {
        API.deleteArticle(event.target.id)
        .then(res => {
            this.getSavedArticles();
        })
    }

     // when save button is clicked post the article to my db
  saveArticle = event => {
    // event.preventDefault();
    this.state.articles.map((elem) => {
        // console.log(elem)
        // if(elem._id === event.target.id){
            API.saveArticle({
                headline: elem.headline.main,
                web_url: elem.web_url,
                snippet: elem.snippet,
                pub_date: Date.now()
            })
            .then(res => {
                console.log(res);
                this.state.savedArticles.push(res.articleData)
                this.getSavedArticles();
            })
        // }
        .catch(err => console.log(err));
    })
  }


    render() {
        return (
            <div className = "container">
                <div className="panel panel-default" id="panelBody">
                    <div className="panel-heading">
                        <h3>Search</h3>    
                    </div>
                    <div className="panel-body">
                        <form>
                            <div className="form-group">
                                <label>Topic</label>
                                <input 
                                    type="input" 
                                    value={this.state.queryTerm}
                                    onChange={this.handleQueryTermsChange}
                                    name="queryTerm"
                                    className="form-control" 
                                    id="queryTermsInput" 
                                    aria-describedby="queryTermsHelp">
                                </input>
                                <small 
                                    id="queryTermsHelp" 
                                    className="form-text text-muted"
                                    >What topic do you want to search for?
                                    </small>
                            </div>
                            <div className="form-group">
                                <label>Start Year</label>
                                <input 
                                    type="text" 
                                    value={this.state.startDate}
                                    onChange={this.handleStartDateChange}
                                    className="form-control" 
                                    id="startDate" 
                                    aria-describedby="startDateHelp">
                                </input>
                                <small 
                                    id="startDateHelp" 
                                    className="form-text text-muted"
                                    >What year do you want to start searching from?
                                </small>
                            </div>
                            <div className="form-group">
                                <label>Finish Year</label>
                                <input 
                                    type="text" 
                                    value={this.state.endDate}
                                    onChange={this.handleEndDateChange}
                                    className="form-control" 
                                    id="endDate" 
                                    aria-describedby="endDateHelp">
                                </input>
                                <small 
                                    id="endDateHelp" 
                                    className="form-text text-muted"
                                    >What year do you want your search to go until?
                                </small>
                            </div>
                            <button 
                                type="submit" 
                                disabled={!this.state.queryTerm}
                                onClick={this.handleFormSubmit}
                                className="btn btn-primary submit"
                                >Submit
                            </button>
                        </form>
                    </div>
                </div>
                <div className="panel panel-default" id="panelBody">
                    <div className="panel-heading">
                        <h3>Results</h3>    
                    </div>
                    <div className="panel-body">
                        {this.state.articles.length ? (
                        <List>
                            {/* {console.log()} */}
                            {this.state.articles.map((articles, i) => (
                                <ListItem key={articles._id}>
                                    {/* {console.log('check here', article)} */}
                                    <div className='col-md-12 headline'>
                                        {articles.headline.main}
                                    </div>
                                    <div className='col-md-12 snippet'>
                                        {articles.snippet}
                                    </div>
                                    <div className='row'>
                                        <div className='col-md-6 col-xs-12'>
                                            <div className='url'>
                                                <button><a target="_blank" href={articles.web_url}>Full Article Here</a></button>
                                                {/* {<a target="_blank" href={article.web_url}>{article.web_url}</a>} */}
                                            </div>
                                        </div>
                                        <div className='col-md-6 col-xs-12 saveButton'>
                                            <button id={this.id} className="btn btn-primary" onClick={this.saveArticle}
                                                > Save Article 
                                            </button> 
                                            {/* <DeleteBtn onClick={() => this.deleteArticle(article._id)} /> */}
                                        </div>
                                    </div>
                                </ListItem>
                            ))}
                        </List>
                        ) : (
                            <h3 className="noResults">No Results to Display</h3>
                        )}
                    </div>
                </div>
                <div className="panel panel-default" id="panelBody">
                    <div className="panel-heading">
                        <h3>To Read Later</h3>    
                    </div>
                    <div className="panel-body results">
                        {this.state.savedArticles.length ? (
                            <List>
                                {this.state.savedArticles.map(article => (
                                    <ListItem key={article._id}>
                                        <div className='col-md-12 headline'>
                                            {article.headline.main}
                                        </div>
                                        <div className='col-md-12 snippet'>
                                            {article.snippet}
                                        </div>
                                        <div className='col-md-12'>
                                            <div className='url'>
                                                <button><a target="_blank" href={article.web_url}>Full Article Here</a></button>
                                                {/* {<a target="_blank" href={article.web_url}>{article.web_url}</a>} */}
                                            </div>
                                        </div>
                                    </ListItem>
                                ))}
                            </List>
                        ) : (
                            <h3 className="noResults">No Results to Display</h3>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default Search;