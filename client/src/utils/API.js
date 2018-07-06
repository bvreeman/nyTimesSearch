import axios from "axios";
require('dotenv').config()

const APIKEY = '402206c1ad1e4b02a94655a84f0d41ce'

const queryUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=' + APIKEY + '&q=';

export default {
  nytSearch: function(queryTerms) {
    return axios.get(`${queryUrl}${queryTerms}`);
  },
  getArticles: function() {
    return axios.get('/api/articles/');
  },
  getARticle: function (id) {
    return axios.get("/api/articles/" + id);
  },
  deleteArticle: function(id) {
    return axios.delete('/api/articles/' + id);
  },
  saveArticle: function(articleData) {
    return axios.post('/api/articles', articleData);
  }
};