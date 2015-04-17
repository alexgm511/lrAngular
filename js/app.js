(function() { // javascript is wrapped in a closure (good habit.)
	var app = angular.module('lrStore', [ ]);
	
	app.controller('StoreController', ['$http', function($http) {
		var store = this;
		store.products = [];
		$http.get('/inventory.json').
		success(function(data){
			store.products = data;
		});	
	}]);

	app.directive('topBar', function() {
		return {
			restrict: 'E',
			templateUrl: 'top-bar.html'
		};
	});	

	app.directive('discoverAutoshift', function() {
		return {
			restrict: 'E',
			templateUrl: 'discover-autoshift.html',
			// controller toggles the details panel when button is pressed
			controller: function() {
				this.canSee = false;			
				this.toggleView = function() {
					this.canSee = !this.canSee;
				}	
			}, 
			controllerAs: 'discover'
		};
	});	

	app.directive('topImage', function() {
		return {
			restrict: 'E',
			templateUrl: 'top-image.html'
		};
	});	
	
	app.directive('pageFooter', function() {
		return {
			restrict: 'E',
			templateUrl: 'page-footer.html'
		};
	});	

	app.directive('contactUs', function() {
		return {
			restrict: 'E',
			templateUrl: 'contact-us.html'
		};
	});	

	app.directive('featureControl', function() {
		return {
			restrict: 'E',
			templateUrl: 'feature-control.html',
			controller: function(){
				this.imageShow = true;
				this.items = [false,false,false,false,false];
				
				this.showImg = function(bln) {
					this.imageShow = bln;
				};
				
				this.setItem = function(itemSet) {
					for (var i = 0; i < this.items.length; i++) {
						this.items[i] = false;
						if (i === itemSet) {
							this.items[i] = true;
						}
					}
				};
				this.getItem = function(itemGet) {
					return this.item[itemGet];
				};			
			},
			controllerAs: 'feature'
			
		};
	});	

	app.directive('faqControl', function() {
		return {
			restrict: 'E',
			templateUrl: 'faq-control.html',
			controller: function(){
				this.tab = -1;
				
				this.selectTab = function(setTab) {
					this.tab = setTab;
				};
				this.isSelected = function(checkTab) {
					return this.tab === checkTab;
				};			
			},
			controllerAs: 'faq'
		};
	});	

	app.directive('assemblyControl', function() {
		return {
			restrict: 'E',
			templateUrl: 'assembly-control.html',
			controller: function(){
				this.tab = -1;
				
				this.selectTab = function(setTab) {
					this.tab = setTab;
				};
				this.isSelected = function(checkTab) {
					return this.tab === checkTab;
				};			
			},
			controllerAs: 'assemble'
		};
	});	

	app.directive('tabControl', function() {
		return {
			restrict: 'E',
			templateUrl: 'tab-control.html',
			controller: function(){
				this.tab = 1;
				
				this.selectTab = function(setTab) {
					this.tab = setTab;
				};
				this.isSelected = function(checkTab) {
					return this.tab === checkTab;
				};			
			},
			controllerAs: 'panels'
		};
	});	
	
})();