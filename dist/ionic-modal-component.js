'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*! ionic-modal-component v0.0.2 | (c) 2017 @leanzubrezki | https://github.com/leandroz/ionic-modal-component */
(function () {
  var Modal = function () {
    function Modal($scope, $ionicModal, $transclude, $rootScope, $timeout) {
      var _this = this;

      _classCallCheck(this, Modal);

      this.$timeout = $timeout;
      this.$rootScope = $rootScope;
      this.$transclude = $transclude;
      this.$ionicModal = $ionicModal;
      this.$scope = $scope;
      var animation = this.animation,
          focusFirstInput = this.focusFirstInput,
          backdropClickToClose = this.backdropClickToClose,
          hardwareBackButtonClose = this.hardwareBackButtonClose;

      focusFirstInput = focusFirstInput == 'true';
      backdropClickToClose = backdropClickToClose == 'true';
      hardwareBackButtonClose = hardwareBackButtonClose == 'true';
      $transclude(function (clone, scope) {
        _this.cloneTranscludeScope = scope;
        var modal = _this.createModalAndAppendClone({
          scope: scope,
          animation: animation,
          focusFirstInput: focusFirstInput,
          backdropClickToClose: backdropClickToClose,
          hardwareBackButtonClose: hardwareBackButtonClose
        }, clone);
        _this.setupScopeListeners(modal.scope);
        _this.createIsOpenWatcher();
        _this.addOnDestroyListener();
        _this.emitOnSetupEvent();
      });
    }

    _createClass(Modal, [{
      key: 'setupScopeListeners',
      value: function setupScopeListeners(scope) {
        scope.$on('modal.shown', this.onShown);
        scope.$on('modal.hidden', this.onHidden);
        scope.$on('modal.removed', this.onRemoved);
      }
    }, {
      key: 'addOnDestroyListener',
      value: function addOnDestroyListener() {
        var _this2 = this;

        this.$scope.$on('$destroy', function () {
          _this2.modal.remove();
          _this2.cloneTranscludeScope.$destroy();
          _this2.isOpenWatcher();
        });
      }
    }, {
      key: 'createIsOpenWatcher',
      value: function createIsOpenWatcher() {
        var _this3 = this;

        this.isOpenWatcher = this.$scope.$watch(function () {
          return _this3.isOpen;
        }, function () {
          if (_this3.isOpen) {
            _this3.modal.show();
          } else {
            _this3.modal.hide();
          }
        });
      }
    }, {
      key: 'emitOnSetupEvent',
      value: function emitOnSetupEvent() {
        var _this4 = this;

        this.$timeout(function () {
          _this4.onSetup({ $removeModal: _this4.removeModal.bind(_this4) });
        });
      }
    }, {
      key: 'createModalAndAppendClone',
      value: function createModalAndAppendClone(_ref, clone) {
        var _ref$scope = _ref.scope,
            scope = _ref$scope === undefined ? this.$rootScope.$new(true) : _ref$scope,
            _ref$animation = _ref.animation,
            animation = _ref$animation === undefined ? 'slide-in-up' : _ref$animation,
            _ref$focusFirstInput = _ref.focusFirstInput,
            focusFirstInput = _ref$focusFirstInput === undefined ? false : _ref$focusFirstInput,
            _ref$backdropClickToC = _ref.backdropClickToClose,
            backdropClickToClose = _ref$backdropClickToC === undefined ? true : _ref$backdropClickToC,
            _ref$hardwareBackButt = _ref.hardwareBackButtonClose,
            hardwareBackButtonClose = _ref$hardwareBackButt === undefined ? true : _ref$hardwareBackButt;

        var options = {
          scope: scope,
          animation: animation,
          focusFirstInput: focusFirstInput,
          backdropClickToClose: backdropClickToClose,
          hardwareBackButtonClose: hardwareBackButtonClose
        };
        this.modal = this.$ionicModal.fromTemplate('<ion-modal-view></ion-modal-view>', options);
        var $modalEl = angular.element(this.modal.modalEl);
        $modalEl.append(clone);
        return this.modal;
      }
    }, {
      key: 'removeModal',
      value: function removeModal() {
        this.$scope.$destroy();
      }
    }]);

    return Modal;
  }();

  Modal.$inject = ['$scope', '$ionicModal', '$transclude', '$rootScope', '$timeout'];


  function ionicModalComponent() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        'onShown': '&',
        'onHidden': '&',
        'onRemoved': '&',
        'onSetup': '&',
        'isOpen': '=',
        'animation': '@',
        'focusFirstInput': '@',
        'backdropClickToClose': '@',
        'hardwareBackButtonClose': '@'
      },
      controller: Modal,
      bindToController: true,
      controllerAs: 'vm'
    };
  }

  angular.module('ionicModalComponent', ['ionic']).directive('ionicModalComponent', ionicModalComponent);
})();