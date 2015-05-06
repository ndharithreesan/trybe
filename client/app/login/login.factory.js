/*
* @Author: vincetam
* @Date:   2015-05-05 17:51:40
* @Last Modified by:   VINCE
* @Last Modified time: 2015-05-05 18:15:30
*/

'use strict';
(function (angular, _) {

  /**
   * Handles auth services for login view
   * @param {[angular]} $http
   * @param {[angular]} $location
   * @param {[angular]} $window
   */
  var AuthFactory = function ($http, $location, $window) {
    // Authenticates user by exchanging the user's username and password
    // for a JWT from the server
    // that JWT is then stored in localStorage as 'com.trybe'
    var signin = function (user) {
      return $http({
        method: 'POST',
        url: '/api/users/signin',
        data: user
      })
      .then(function (resp) {
        return resp.data; //should receive user token and id
      });
    };

    var signup = function (user) {
      return $http({
        method: 'POST',
        url: '/api/users/signup',
        data: user
      })
      .then(function (resp) {
        return resp.data; //should receive user token and id
      });
    };

    var isAuth = function () {
      return !!$window.localStorage.getItem('com.trybe');
    };

    var signout = function () {
      $window.localStorage.removeItem('com.trybe');
      $location.path('/signin');
    };

    return {
      signin: signin,
      signup: signup,
      isAuth: isAuth,
      signout: signout
    };
  };

angular.module('trybe-app.login', [])
  .factory('Auth', AuthFactory);

})(angular, _);

