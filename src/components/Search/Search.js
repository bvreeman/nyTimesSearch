import React from "react";
import "./Search.css";

const Search = () => (
    <div className = "container">
        <div className="panel panel-default" id="panelBody">
            <div className="panel-heading">
                <h3>Search</h3>    
            </div>
            <div className="panel-body">
                <form>
                    <div class="form-group">
                        <label for="topicInput">Topic</label>
                        <input type="input" class="form-control" id="topicInput" aria-describedby="topicHelp"></input>
                        <small id="topicHelp" class="form-text text-muted">What topic do you want to search for?</small>
                    </div>
                    <div class="form-group">
                        <label for="startYear">Start Year</label>
                        <input type="input" class="form-control" id="startYear" aria-describedby="startYearHelp"></input>
                        <small id="startYearHelp" class="form-text text-muted">What year do you want to start searching from?</small>
                    </div>
                    <div class="form-group">
                        <label for="finishYear">Finish Year</label>
                        <input type="input" class="form-control" id="finishYear" aria-describedby="fnishYearHelp"></input>
                        <small id="finishYearHelp" class="form-text text-muted">What year do you want your search to go until?</small>
                    </div>
                    <button type="submit" class="btn btn-primary submit">Submit</button>
                </form>
            </div>
        </div>
    </div>
);

export default Search;