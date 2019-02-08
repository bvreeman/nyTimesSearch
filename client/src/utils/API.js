import axios from "axios";
require('dotenv').config()

const API = {
  nytSearch: function(queryTerms, startDate, endDate) {
    const APIKEY = process.env.REACT_APP_APIKEY
    // this is set up so there is a default year when searching. If no value is entered
    // for either, it starts at 2018 and the endDate is automatically set to be
    // one year later than the startDate. If a startDate is entered, but an
    // endDate isn't, the endDate is still set to go one year after the startDate.
    if (startDate === '') {
      startDate = '2019'
    // Also set it so a date before the StartDate could not be set. It will 
    // still start one year after the startDate
    } if (endDate === '' || Number(endDate) < Number(startDate)) {
      endDate = Number(startDate)+1
    }
    console.log(startDate)
    console.log(endDate)
    const queryUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + queryTerms + "&api-key=" + APIKEY + "&begin_date=" + startDate + "0101&end_date=" + endDate + "1231";
    return axios.get(queryUrl);
  },
  getSavedArticles: function () {
    return axios.get("/api/articles");
  },
  deleteArticle: function(id) {
    return axios.delete('/api/articles/' + id);
  },
  saveArticle: function(articleData) {
    return axios.post('/api/articles', articleData);
  }
};

export default API;