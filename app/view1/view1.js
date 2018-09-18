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

  function aboutCtrl($scope, $state, $http, $uibModal) {
    console.log('**** inside function_name of view1.js ****', $uibModal);
    console.log('**** inside aboutCtrl of view1.js ****');
    //- ********************************* default variables/tasks begin here *************************** //
    var itemsDetails;
    $scope.searchs = [];
    var flag = true;
    $scope.validationObj = {
      errorCount: 0
    }
    //- ********************************* default functions begin here  ******************************** //

    //- ********************************* functions to be triggered form view begin here *************** // 
    //- function called when person added
    $scope.addPerson = function (personObj) {
      debugger;
      $http({
        url: "http://localhost:3002/Person/createPersonData",
        method: "POST",
        data: personObj
      }).then(function (response) {
        console.log('response', response.data);
        if (response.data.code == 200) {
          $scope.default();
          $scope.cancelModal();
        } else {
          $scope.validationObj.errorMsg = "Something went wrong!"
        }
      });
    };

    //- validation for form
    $scope.checkValidation = function (crudType, personObj) {

      $scope.validationObj = {
        errorCount: 0
      };
      if (_.isEmpty(personObj)) {
        $scope.validationObj.errorMsg = "Please form properly"
      } else {
        if (!isNaN(personObj.personid)) {
          var pattern = "/^[0-9]*$/"
          if (!eval(pattern + '.test(personObj.personid)')) {
            $scope.validationObj.errorCount++;
            $scope.validationObj.idError = "Please Enter Valid Id"
          }
        } else {
          $scope.validationObj.errorCount++;
          $scope.validationObj.idError = "Please Enter Id!"
        }
        if (_.isEmpty(personObj.name)) {
          $scope.validationObj.errorCount++;
          $scope.validationObj.nameError = "Please Enter Name"
        } else if (personObj.name) {
          var pattern = "/^[a-zA-Z ]*$/"
          if (!eval(pattern + '.test(personObj.name)')) {
            $scope.validationObj.errorCount++;
            $scope.validationObj.nameError = "Name should be in alphabet"
          }
        }
        if (!isNaN(personObj.mobile)) {
          debugger;
          var pattern = /^([1-9][0-9]{9})/
          // if (pattern.match(personObj.mobile)) {
          //   $scope.validationObj.errorCount++;
          //   $scope.validationObj.mobileError = "Mobile number should be 10 digit"
          // }
          if (!eval(pattern + '.test(personObj.mobile)')) {
            $scope.validationObj.errorCount++;
            $scope.validationObj.mobileError = "Mobile number should be 10 digit"
          }
        } else {
          $scope.validationObj.errorCount++;
          $scope.validationObj.mobileError = "Please Enter Mobile Number"
        }

        if (_.isEmpty(personObj.email)) {
          $scope.validationObj.errorCount++;
          $scope.validationObj.emailError = "Please Enter Email Address"
        }
        //else if (personObj.email) {
        //   var pattern = "/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/"
        //   if (!eval(pattern + '.test(personObj.email)')) {
        //     $scope.validationObj.errorCount++;
        //     $scope.validationObj.emailError = "Enter Valid Email address"
        //   }
        // }
      }
      //-if error count is 0 then update/save function call
      if ($scope.validationObj.errorCount == 0) {
        if (crudType == 'save') {
          $scope.addPerson(personObj);
        } else if (crudType == 'update') {
          $scope.updatePerson(personObj);
        }
      }
    };
    //-logout
    $scope.updatePerson = function (user) {
      debugger;
      $http({
        url: "http://localhost:3002/Person/updatePersonData",
        method: "PUT",
        data: {
          updateData: user,
          personid: user.prevPersonId
        }
      }).then(function (response) {
        debugger;
        console.log('response', response.data);
        if (response.data.code == 200) {
          //$state.go('about');
          $scope.cancelModal();
          $scope.default();
        }
      });
    };

    //- delete person
    $scope.deletePerson = function (deleteObj) {
      var delteConfirm = confirm("Are you sure you want to delete?");
      if (delteConfirm)
        $http({
          url: "http://localhost:3002/Person/deletePerson",
          method: "POST",
          data: deleteObj
        }).then(function (response) {
          console.log('response', response.data);
          if (response.data.code == 200) {
            // $state.go('about');
            $scope.default();
          }
        });
      // return true;
      else
        return false;
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

    //- function call in default
    $scope.default = function () {
      debugger;
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

    //-modal for add and update
    $scope.addEditPerson = function (crudType, peronUpdatedData) {
      debugger;
      $scope.crudType = crudType;
      if (!_.isEmpty(peronUpdatedData)) {
        $scope.personObj = peronUpdatedData;
        $scope.personObj.mobile = parseInt(peronUpdatedData.mobile);
        $scope.personObj.prevPersonId = peronUpdatedData.personid;
      } else {
        $scope.personObj = {}
      }
      $scope.modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'view1/modal/addEditPerson.html',
        scope: $scope,
        size: 'lg'
      });
    }
    $scope.personData = function (user) {
      $scope.person = user;
    };
    //-cancel modal
    $scope.cancelModal = function () {
      $scope.modalInstance.dismiss();
    }
    //- ********************************* init all default functions begin here ************************ //
    //- Initilize the default function in this section only
    $scope.init = function () {
      $scope.default();
    }
    $scope.init();
  }


})();