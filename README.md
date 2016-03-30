# ionic-modal-component

[![Build Status](https://travis-ci.org/leandroz/ionic-modal-component.svg?branch=master)](https://travis-ci.org/leandroz/ionic-modal-component)

A better way to handle modals in Ionic

ionic-modal-component is a simple directive that lets you use Ionic modal as a component instead of creating it programmatically.

### Component method usage and attributes

- onShown: Event fired when the modal is shown.
- onHidden: Event fired when the modal is hiiden.
- onRemoved: Event fired when the modal is removed.
- onSetup: Event that is fired when the modal is ready.It has ```$removeModal``` injected as an argument. Call it to remove the modal.
- isOpen: Boolean to control wheather or not to show or hide the modal. 
- animation: The animation to show & hide with. Default: 'slide-in-up'
- focusFirstInput: Whether to autofocus the first input of the modal when shown. Will only show the keyboard on iOS, to force the keyboard to show on Android, please use the Ionic keyboard plugin. Default: false.
- backdropClickToClose: Whether to close the modal on clicking the backdrop. Default: true.
- hardwareBackButtonClose: Whether the modal can be closed using the hardware back button on Android and similar devices. Default: true.

```html
<div ng-app="app">
  <div ng-controller="MainCtrl as vm">
    <button class="button" ng-click="vm.openModal()">Open Modal</button>
    <button class="button" ng-click="vm.$removeModal()">Remove Modal</button>
    <ionic-modal-component is-open="vm.isOpen" on-setup="vm.onSetup($removeModal)">
      <button class="button" ng-click="vm.closeModal()">Close Modal</button>
    </ionic-modal-component>
  </div>
</div>

<script>
angular
  .module('app', [
    'ionic',
    'ionicModalComponent'
  ])
  .controller('MainCtrl', function MainCtrl() {
    var vm = this;
    
    vm.isOpen = false;
    
    vm.openModal = function() {
      vm.isOpen = true;
    };

    vm.closeModal = function() {
      vm.isOpen = false;
    };

    vm.onSetup = function($removeModal) {
      vm.$removeModal = $removeModal;
    };


  });
</script>
```

## Installing with NPM

```
npm install ionic-modal-component --save
```

## Installing with Bower

```
bower install ionic-modal-component --save
```

## Manual installation
Ensure you place the script after Angular and after Ionic.

```html
<body>
  <!-- html above -->
  <script src="angular.js"></script>
  <script src="ionic.js"></script>
  <script src="dist/ionic-modal-component.js"></script>
  <script src="app.js"></script>
</body>
```

## Release history

- 0.0.1
  - Initial release
