(function() { // javascript is wrapped in a closure.
	var app = angular.module('lrStore', [ ]);
	
	app.controller('StoreController', ['$http', '$scope', '$timeout', function($http, $scope, $timeout) {
		var store = this;
		
		// Import products from json file:
	/*	store.products = [];
		$http.get('inventory.json').
			success(function(data){
				store.products = data;
		});	*/

		// Import products from MySQL Database through PHP file:
		store.products = [];
		$http.get('products.php').
			success(function(data){
				store.products = data;
		});	

		
		// Import features from json file:
		store.features = [];
		$http.get('features.json').
			success(function(data){
				store.features = data;
				console.log(store.features);
		});	
		// Initialize product page variables:
		$scope.myQty = 1;
		$scope.mySize;
		$scope.myPrice;
		$scope.myImg;
		
		// Toggle Not ready message:
		store.showMsg = false;
		store.showMsgNow = function() {
			store.showMsg = !store.showMsg;
		};

		// Initialize Invoice items object:
		store.invoice = {
			items: [
			]
		};
		
		// Add item to Store invoice and switch to cart by triggering click event.
		// Click event is wrapped in $timeout to break out of angularjs $apply:
		store.addItem = function(model, qty, cost, myImg) {
			myImg = "images/"+myImg;
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
		
		// Test for items in Cart or notify that cart is empty.
		store.cartOn = function() {
			if (store.invoice.items.length > 0) {
				return true;
			} else {
				return false;
			}
		};
		
		// Delete item from Invoice.items to remove from cart
		store.removeItem = function(index) {
			store.invoice.items.splice(index, 1);
		};
		
		// Figure out total by adding items on Invoice.items
		store.total = function() {
			var total = 0;
			angular.forEach(store.invoice.items, function(item) {
				total += item.quantity * item.price;
			})

			return total;
		}

	}]);
	
	// Directive with top most bar
	app.directive('topBar', function() {
		return {
			restrict: 'E',
			templateUrl: 'top-bar.html'
		};
	});	
	
	// Directive with cart code
	app.directive('myCart', function() {
		return {
			restrict: 'E',
			templateUrl: 'shopping-cart.html'
		};
	});	
	
	// Directive with all product display code
	app.directive('myProduct', function() {
		return {
			restrict: 'E',
			templateUrl: 'product-form.html'
		};
	});		

	// Directive to display autoshift details
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
	
	// Directive with the big welcome image
	app.directive('topImage', function() {
		return {
			restrict: 'E',
			templateUrl: 'top-image.html'
		};
	});	
	
	// Directive with footer information
	app.directive('pageFooter', function() {
		return {
			restrict: 'E',
			templateUrl: 'page-footer.html'
		};
	});	
	
	// Directive that selects which product page to display
	app.directive('productDisplay', function() {
		return {
			templateUrl: function(elem, attr) {
				return 'product-display'+attr.type+'.html'
			}
		};
	});	
	
	// Directive with contact info code
	app.directive('contactUs', function() {
		return {
			restrict: 'E',
			templateUrl: 'contact-us.html'
		};
	});	
	
	// Directive with all product tabs
	app.directive('productListing', function() {
		return {
			restrict: 'E',
			templateUrl: 'product-listing.html'
		};
	});	

	// Directive with feature display code
	// clicked item is set to true, all others to false 
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
	
	// Directive with FAQ tabs code
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
	
	// Directive with assembly tab code
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
	
	// Directive with main tab code
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