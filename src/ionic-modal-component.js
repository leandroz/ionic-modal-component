(function() {

  @Inject('$scope', '$ionicModal', '$transclude', '$rootScope', '$timeout')
  class Modal {
    constructor() {
      let { animation, focusFirstInput, backdropClickToClose, hardwareBackButtonClose } = this;
      focusFirstInput = (focusFirstInput == 'true');
      backdropClickToClose = (backdropClickToClose == 'true');
      hardwareBackButtonClose = (hardwareBackButtonClose == 'true');
      $transclude((clone, scope) => {
        this.cloneTranscludeScope = scope;
        let modal = this.createModalAndAppendClone({
          scope,
          animation,
          focusFirstInput,
          backdropClickToClose,
          hardwareBackButtonClose
        }, clone);
        this.setupScopeListeners(modal.scope);
        this.createIsOpenWatcher();
        this.addOnDestroyListener();
        this.emitOnSetupEvent();
      });
    }
    setupScopeListeners(scope) {
      scope.$on('modal.shown', this.onShown);
      scope.$on('modal.hidden', this.onHidden);
      scope.$on('modal.removed', this.onRemoved);
    }
    addOnDestroyListener() {
      this.$scope.$on('$destroy', () => {
        this.modal.remove();
        this.cloneTranscludeScope.$destroy();
        this.isOpenWatcher();
      });
    }
    createIsOpenWatcher() {
      this.isOpenWatcher = this.$scope.$watch(() => this.isOpen, () => {
        if (this.isOpen) {
          this.modal.show();
        } else {
          this.modal.hide();
        }
      });
    }
    emitOnSetupEvent() {
      this.$timeout(() => {
        this.onSetup({ $removeModal: this.removeModal.bind(this) });
      });
    }
    createModalAndAppendClone({
      scope = this.$rootScope.$new(true),
      animation = 'slide-in-up',
      focusFirstInput = false,
      backdropClickToClose = true,
      hardwareBackButtonClose = true
    }, clone) {
      let options = {
        scope,
        animation,
        focusFirstInput,
        backdropClickToClose,
        hardwareBackButtonClose
      }
      this.modal = this.$ionicModal.fromTemplate('<ion-modal-view></ion-modal-view>', options);
      let $modalEl = angular.element(this.modal.modalEl);
      $modalEl.append(clone);
      return this.modal;
    }
    removeModal() {
      this.$scope.$destroy();
    }
  }

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
    }
  }
  
  angular
    .module('ionicModalComponent', ['ionic'])
    .directive('ionicModalComponent', ionicModalComponent);

})();
