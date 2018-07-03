import React, { Component } from 'react';
import "./Search.css";
import API from '../../utils/API';
import { List, ListItem } from "../../components/List";
import DeleteBtn from "../../components/DeleteBtn";

class Search extends Component {
    state = {
        articles: [],
        queryTerm: '',
        startDate: '',
        endDate: ''
    };

    getArticles = () => {
        let query = `${this.state.queryTerm}`;
        if (this.state.startDate) {
          query = `${query}&begin_date=${this.state.startDate}`;
        }
        if (this.state.endDate) {
          query = `${query}&end_date=${this.state.endDate}`;
        }
    
        API.nytSearch(query)
          .then(res => {
            console.log(res);
            this.setState({
              articles: res.data.response.docs,
              queryTerm: '',
              startDate: '',
              endDate: ''
            });
          })
          .catch(err => console.log(err));
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
        [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        if (this.state.queryTerm) {
        this.getArticles();
        this.setState({
            queryTerm: "",
            startDate: '',
            endDate: ''
        })
        }
    };

    saveArticle = articleInfo => {
        API.saveArticle(articleInfo)
          .then(res => {
            console.log('hey it saved');
          })
          .catch(err => {
            console.log(err);
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
                                    onChange={this.handleInputChange}
                                    name="queryTerm"
                                    className="form-control" 
                                    id="topicInput" 
                                    aria-describedby="topicHelp">
                                </input>
                                <small 
                                    id="topicHelp" 
                                    className="form-text text-muted"
                                    >What topic do you want to search for?
                                    </small>
                            </div>
                            <div className="form-group">
                                <label>Start Year</label>
                                <input 
                                    type="input" 
                                    // value={this.state.startDate}
                                    onChange={this.handleInputChange}
                                    className="form-control" 
                                    id="startYear" 
                                    aria-describedby="startYearHelp">
                                </input>
                                <small 
                                    id="startYearHelp" 
                                    className="form-text text-muted"
                                    >What year do you want to start searching from?
                                </small>
                            </div>
                            <div className="form-group">
                                <label>Finish Year</label>
                                <input 
                                    type="input" 
                                    // value={this.state.endDate}
                                    onChange={this.handleInputChange}
                                    className="form-control" 
                                    id="finishYear" 
                                    aria-describedby="fnishYearHelp">
                                </input>
                                <small 
                                    id="finishYearHelp" 
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
                        <List>
                            {console.log(this.state.articles.headline)}
                            {this.state.articles.map(article => (
                                <ListItem key={article._id}>
                                    {console.log('check here', article)}
                                    <div className='container'>
                                        <div className='headline'>
                                            {article.headline.main}
                                        </div>
                                        <div className='snippet'>
                                            {article.snippet}
                                        </div>
                                        <div className='row'>
                                            <div className='col-md-6 col-xs-12'>
                                                <div className='url'>
                                                    <button><a target="_blank" href={article.web_url}>Full Article Here</a></button>
                                                    {/* {<a target="_blank" href={article.web_url}>{article.web_url}</a>} */}
                                                </div>
                                            </div>
                                            <div className='col-md-6 col-xs-12 saveButton'>
                                                <button className="btn btn-primary" style={{float: "right"}} onClick={() => this.saveArticle({
                                                    title: article.headline.main,
                                                    url: article.web_url, 
                                                    date: article.pub_date
                                                    })}> Save Article 
                                                </button> 
                                                {/* <DeleteBtn onClick={() => this.deleteArticle(article._id)} /> */}
                                            </div>
                                        </div>
                                    </div>
                                </ListItem>
                            ))}
                        </List>
                    </div>
                </div>
            </div>
        )
    }
}

export default Search;