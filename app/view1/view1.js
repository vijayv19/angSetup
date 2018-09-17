/*** 
//- all business logic will be in service & not in controller 
//- put your logic & data in corresponding section only
//- all variables & function name must be in camelcase & should represent what it will do
//- add comment on every function about what it will do   
***/

(function () {
  'use strict';

  angular
    .module('myApp')
    .controller('aboutCtrl', aboutCtrl);

  // aboutCtrl.$inject = ['$http', '$state'];

  function aboutCtrl($scope, $state, $http) {

    console.log('**** inside aboutCtrl of view1.js ****');
    //- ********************************* default variables/tasks begin here *************************** //
    var itemsDetails;
    $scope.searchs = [];
    var flag = true;
    //- ********************************* default functions begin here  ******************************** //

    //- ********************************* functions to be triggered form view begin here *************** // 
    $scope.addPerson = function (personObj) {
      $http({
        url: "http://localhost:3002/Person/createPersonData",
        method: "POST",
        data:
          // 'FirstName': 'David'
          personObj

      }).then(function (response) {
        console.log('response', response.data);
        if (response.data.code == 200) {
          //   $scope.cancelModal();
          // toaster.pop(vm.toaster.type, vm.toaster.title, vm.toaster.text);

          $('#squarespaceModal').modal('hide');
          $scope.default();
          // var instance = Modal.getInstance($('#squarespaceModal'));
          // instance.close();

        }
      });
    };
    //-logout
    $scope.updatePerson = function (user) {

      $http({
        url: "http://localhost:3002/Person/updatePersonData",
        method: "PUT",
        data: user
        // 'FirstName': 'David'


      }).then(function (response) {
        console.log('response', response.data);
        if (response.data.code == 200) {
          //$state.go('about');
          $scope.cancelModal();
        }
      });
    };
    //- get data by api
    $scope.findPerson = function (search) {
      $http({
        url: "http://localhost:3002/Person/findData",
        method: "GET",
        data:
          // 'FirstName': 'David'
          login

      }).then(function (response) {
        console.log('response', response.data);
        if (response.data.code == 200) {
          // $state.go('about');
        }
      });
    };
    //- get default data from login
    $scope.deletePerson = function (deleteObj) {
      $http({
        url: "http://localhost:3002/Person/deletePerson",
        method: "POST",
        data: deleteObj
      }).then(function (response) {
        console.log('response', response.data);
        if (response.data.code == 200) {
          // $state.go('about');
        }
      });
    };

    //-open detail modal
    $scope.openModal = function (CandidateId) {
      console.log(CandidateId);
      $http({
        url: "http://localhost:1337/trail/getCandiateDetail",
        method: "POST",
        data: {
          'CandidateId': CandidateId
        }
      }).then(function (response) {
        $scope.candiateDetail = response.data.shift();
        console.log(' $scope.candiateDetail', $scope.candiateDetail)
      })


      $('.modal').modal();

      var instance = M.Modal.getInstance($('#modal1'));
      console.log('instance', M.Modal.getInstance($('#modal1')));
      instance.open();

      // $scope.modalInstance = $uibModal.open({
      //   animation: true,
      //   // ariaLabelledBy: 'modal-title',
      //   // ariaDescribedBy: 'modal-body',
      //   templateUrl: 'modal/newModal.html',
      //   controller: aboutCtrl,
      //   backdrop: true,
      //   scope: $scope,
      //   size: 'lg'
      // });
    }

    $scope.default = function () {
      $http({
        url: "http://localhost:3002/Person/findData",
        method: "GET",

        // 'FirstName': 'David'


      }).then(function (response) {
        console.log('response', response.data);
        $scope.users = response.data.Data;
        if (response.data.code == 200) {
          $state.go('about');
        }
      });
    };
    $scope.personData = function (user) {
      $scope.person = user;
    };
    $scope.cancelModal = function () {
      // console.log('inside cancel')
      var instance = M.Modal.getInstance($('#modal1'));
      instance.close();
    };
    //- ********************************* init all default functions begin here ************************ //
    //- Initilize the default function in this section only
    $scope.init = function () {
      console.log('**** inside controoler aboout of view1.js ****');
      $scope.default();

    }
    $scope.init();
  }


})();