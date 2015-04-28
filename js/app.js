(function() { // javascript is wrapped in a closure (good habit.)
	var app = angular.module('lrStore', [ ]);
	
	app.controller('StoreController', ['$http', '$scope', '$timeout', function($http, $scope, $timeout) {
		var store = this;
		store.products = [];
		$http.get('inventory.json').
			success(function(data){
				store.products = data;
		});	
		
		$scope.myQty = 1;
		$scope.mySize;
		$scope.myPrice;
		$scope.myImg;
		
		store.showMsg = false;
		store.showMsgNow = function() {
			store.showMsg = !store.showMsg;
		};

		
		store.invoice = {
			items: [
			]
		};
		store.addItem = function(model, qty, cost, myImg) {
			store.invoice.items.push({
				img: myImg,
				item: model,
				quantity: qty,
				price: cost
			});
			var myElem = angular.element('#cartTab');
			$timeout(function() {
				angular.element(myElem).triggerHandler('click');
			}, 0);			
		};
		
		store.cartOn = function() {
			if (store.invoice.items.length > 0) {
				return true;
			} else {
				return false;
			}
		};
		
		store.removeItem = function(index) {
			store.invoice.items.splice(index, 1);
		};
		
		store.total = function() {
			var total = 0;
			angular.forEach(store.invoice.items, function(item) {
				total += item.quantity * item.price;
			})

			return total;
		}

	}]);
	
	app.directive('topBar', function() {
		return {
			restrict: 'E',
			templateUrl: 'top-bar.html'
		};
	});	

	app.directive('myCart', function() {
		return {
			restrict: 'E',
			templateUrl: 'shopping-cart.html'
		};
	});	

	app.directive('myProduct', function() {
		return {
			restrict: 'E',
			templateUrl: 'product-form.html'
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

	app.directive('productDisplay', function() {
		return {
			templateUrl: function(elem, attr) {
				return 'product-display'+attr.type+'.html'
			}
		};
	});	
	
	app.directive('contactUs', function() {
		return {
			restrict: 'E',
			templateUrl: 'contact-us.html'
		};
	});	

	app.directive('productListing', function() {
		return {
			restrict: 'E',
			templateUrl: 'product-listing.html'
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