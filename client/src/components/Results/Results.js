import React from "react";
import "./Results.css";

const Results = (props) => {
    // const items = props.results.map(item => {
    //     return (
    //         console.log('test')
    //     )
    // }
    return (
    <div className = "container">
        <div className="panel panel-default" id="panelBody">
            <div className="panel-heading">
                <h3>Results</h3>    
            </div>
            <div className="panel-body">
                <div className="results" />
            </div>
        </div>
    </div>
    )
};

export default Results;