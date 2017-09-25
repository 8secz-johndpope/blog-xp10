// Copyright IBM Corp. 2015,2016. All Rights Reserved.
// Node module: loopback-example-angular
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

angular
.module('blog', [
	'lbServices',
	'ui.router'
	])
.config(function($stateProvider, $urlRouterProvider) {

	// $urlRouterProvider.otherwise('/home');
	$stateProvider
	.state('home', {
		url: '/home',
		templateUrl: 'views/home.html',
		controller: 'HomeController'
	})
	.state('section', {
		url: '/section/:id',
		templateUrl: 'views/section.html',
		controller: 'SectionController'
	})
	.state('post', {
		url: '/post/:slug',
		templateUrl: 'views/post.html',
		controller: 'PostController'
	});
	$urlRouterProvider.otherwise('home');

})
.filter('startFrom', function() {
    return function(input, start) {
        if(input) {
            start = +start; //parse to int
            return input.slice(start);
        }
        return [];
    }
})
.filter('unsafe', function($sce) { return $sce.trustAsHtml; })
.filter('dateFormat', function () {
	return function (dt) {
		date = new Date(dt);
		year = date.getFullYear();
		month = date.getMonth()+1;
		dt = date.getDate();

		if (dt < 10) {
			dt = '0' + dt;
		}
		if (month < 10) {
			month = '0' + month;
		}

		return dt+"/"+month+"/"+year;
	};
})
.filter('extenseDate', function () {
	return function (dt) {
		
		var monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
		"Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
		];

		date = new Date(dt);
		year = date.getFullYear();
		month = date.getMonth()+1;
		dt = date.getDate();

		if (dt < 10) {
			dt = '0' + dt;
		}

		return dt+" de "+monthNames[month]+" de "+year;
	};
});