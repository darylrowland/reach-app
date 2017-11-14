var axios = require("axios");

const BASE_URL = "https://oz5ws973ze.execute-api.eu-west-1.amazonaws.com/testing";
const APP_TOKEN = "abc123";

const DEFAULT_TIMEOUT = 20000;
const SIMULATOR_CUSTOMER = "SIMULATOR_CUSTOMER";

var userToken = null;

var convertParamsToStr = function(params) {
  if (!params || Object.keys(params).length == 0) {
    return "";
  }

  var queryStr = "?";

  Object.keys(params).forEach(function(key, index) {
    if (index > 0) {
      queryStr += "&";
    }

    queryStr += key + "=" + params[key];
  });

  return queryStr;
};

var getErrorMessage = function(err) {
  if (err && err.response && err.response.data && err.response.data.error) {
    return err.response.data.error;
  } else {
    console.error(err);
    return "An unexpected error occurred";
  }
};

var getResponseData = function(res) {
  if (res && res.data) {
    return res.data;
  } else {
    return res;
  }
};

module.exports = {
  user: null,
  token: null,
  customerId: null,

  getBaseUrl: function() {
    return BASE_URL;
  },

  isSimulator: function() {
    if (this.customerId && this.customerId == SIMULATOR_CUSTOMER) {
      console.log("Is simulator = true");
      return true;

    }

    return false;
  },

  setCustomerId: function(customerId) {
    this.customerId = customerId
  },

  getProfilePicUrl(fileName) {
    return PROFILE_IMAGE_URL + fileName + "_thumb";
  },

  getToken() {
    return this.token;
  },

  createHeaders: function() {
    var headers = {
      "Accept": 'application/json',
      "Content-Type": 'application/json',
      "appToken": APP_TOKEN,
    };

    if (this.customerId) {
      headers["x-customer-id"] = this.customerId;
    }

    return headers;
  },

  makeRequest: function(url, method, body, callback, excludeBaseUrl) {
    var urlToUse;

    if (excludeBaseUrl) {
      urlToUse = url;
    } else {
      urlToUse = BASE_URL + url;
    }

    axios({
      url: urlToUse,
      method: method,
      data: body,
      timeout: DEFAULT_TIMEOUT,
      headers: this.createHeaders()
    }).then(function(result) {
      return callback(null, getResponseData(result));
    }).catch(function(e) {
      return callback(getErrorMessage(e));
    });

  },

  patch: function(url, body, callback, excludeBaseUrl) {
    this.makeRequest(url, "patch", body, callback, excludeBaseUrl);
  },

  post: function(url, body, callback, excludeBaseUrl) {
    this.makeRequest(url, "post", body, callback, excludeBaseUrl);
  },

  get: function(url, callback, excludeBaseUrl) {
    this.makeRequest(url, "get", null, callback, excludeBaseUrl);
  },

  setUserAndToken: function(user, token) {
    this.user = user;
    this.token = token
  },

  clearUserAndToken: function() {
    this.user = null;
    this.token = null;
  },

  uploadFile: function(uploadUrl, fileUrl, callback) {
    let data = new FormData()
    if (fileUrl) {
      data.append('profile_pic', {uri: fileUrl, name: 'profile_pic', type: 'image/jpg'})
    }

    const config = {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        "x-user-token": this.token
      },
      body: data
    }

    fetch(BASE_URL + uploadUrl, config).then(function(res) {
      return callback(null, res);
    }).catch(function(err) {
      return callback(err);
    });

  }

};