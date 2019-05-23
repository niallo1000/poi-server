'use strict';

const axios = require('axios');

class PoiService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async authenticate(user) {
    try {
      const response = await axios.post(this.baseUrl + '/api/users/authenticate', user);
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async clearAuth(user) {
    axios.defaults.headers.common['Authorization'] = '';
  }

  async getUsers() {
    try {
      const response = await axios.get(this.baseUrl + '/api/users');
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async getUser(id) {
    try {
      const response = await axios.get(this.baseUrl + '/api/users/' + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async createUser(newUser) {
    try {
      const response = await axios.post(this.baseUrl + '/api/users', newUser);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async deleteAllUsers() {
    try {
      const response = await axios.delete(this.baseUrl + '/api/users');
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async deleteOneUser(id) {
    try {
      const response = await axios.delete(this.baseUrl + '/api/users/' + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async getComments() {
    try {
      const response = await axios.get(this.baseUrl + '/api/comments');
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async getComment(id) {
    try {
      const response = await axios.get(this.baseUrl + '/api/comments/' + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async createComment(newComment) {
    try {
      const response = await axios.post(this.baseUrl + '/api/comments', newComment);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async deleteAllComments() {
    try {
      const response = await axios.delete(this.baseUrl + '/api/comments');
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async deleteOneComment(id) {
    try {
      const response = await axios.delete(this.baseUrl + '/api/comments/' + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async makePoi(id, poi) {
    try {
      const repsonse = await axios.post(this.baseUrl + '/api/comments/' + id + '/pois', poi);
      return repsonse.data;
    } catch (e) {
      return null;
    }
  }

  async getPois(id) {
    try {
      const response = await axios.get(this.baseUrl + '/api/comments/' + id + '/pois');
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async deleteAllPois() {
    try {
      const response = await axios.delete(this.baseUrl + '/api/pois');
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async deletePois(commentId) {
    try {
      const response = await axios.delete(this.baseUrl + '/api/comments/' + commentId + '/pois');
      return response.data;
    } catch (e) {
      return null;
    }
  }
}

module.exports = PoiService;
