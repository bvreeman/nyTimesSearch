import axios from "axios";
require('dotenv').config()

const API = {
  nytSearch: function(queryTerms, startDate, endDate) {
    const APIKEY = '402206c1ad1e4b02a94655a84f0d41ce'
    const queryUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=' + APIKEY + "&q=" + queryTerms + "&begin_date=" + startDate + "0101&end_date=" + endDate + "1231";
    return axios.get(queryUrl);
  },
  getSavedArticles: function () {
    return axios.get("/api/articles/");
  },
  deleteArticle: function(id) {
    return axios.delete('/api/articles/' + id);
  },
  saveArticle: function(articleData) {
    return axios.post('/api/articles', articleData);
  }
};

export default API;