import axios from "axios";
require('dotenv').config()

const APIKEY = '402206c1ad1e4b02a94655a84f0d41ce'

const queryUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=' + APIKEY + '&q=';

export default {
  nytSearch: function(queryTerms) {
    return axios.get(`${queryUrl}${queryTerms}`);
  },
  getSavedArticles: function() {
    return axios.get('/api/saved/');
  },
  deleteArticle: function(id) {
    return axios.delete('/api/saved/' + id);
  },
  saveArticle: function(articleData) {
    return axios.post('/api/saved', articleData);
  }
};