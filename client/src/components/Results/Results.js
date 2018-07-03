import React, { Component } from "react";
import "./Results.css";
import API from "../../utils/API";

class Results extends Component {
    state = {
        article: {}
    };
 
    componentDidMount() {
        API.findAll()
        // .then(res => this.setState({ article: res.data}))
        // .catch(err => console.log(err));
    }

    // <p>{this.state.article}</p>

    render() {
        return (
        <div className = "container">
            <div className="panel panel-default" id="panelBody">
                <div className="panel-heading">
                    <h3>Results</h3>    
                </div>
                <div className="panel-body">
                    <div className="results">
                    {console.log(this.state.article)}
                    </div>
                </div>
            </div>
        </div>
        )
    }
};

export default Results;