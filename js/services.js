angular.module('services', [])

.factory('UserContactsService', ['$http', '$q', function($http, $q) {
  // global varible
  var contactList = [
    {
      _id: 1,
      groupType: "friends",
      name: "Sanjeet Kumar",
      email: "sanjeet.k@gmail.com",
      company: "MobillionLabs",
      mobile: "9445165233",
      address: "Hyd"
    },
    {
      _id: 2,
      groupType: "friends",
      name: "Santu Kumar",
      email: "santu.k@gmail.com",
      company: "MobillionLabs",
      mobile: "9445165233",
      address: "Hyd"
    },
    {
      _id: 3,
      groupType: "friends",
      name: "Akash Kumar",
      email: "akash.k@gmail.com",
      company: "MobillionLabs",
      mobile: "9445165233",
      address: "Hyd"
    },
    {
      _id: 4,
      groupType: "family",
      name: "Mohan Kumar",
      email: "mohan.k@gmail.com",
      company: "TCS",
      mobile: "9445165233",
      address: "Chennai"
    },
    {
      _id: 5,
      groupType: "others",
      name: "Raj Kumar",
      email: "raj.k@gmail.com",
      company: "Intel",
      mobile: "9445165233",
      address: "Bangalore"
    }
  ];

  var result = {};

  // UserContacts factory
  var UserContactsServiceFunctions = {
      find: find,
      findOne: findOne,
      addContact: addContact,
      updateContact: updateContact,
      deleteContact: deleteContact
   };
   return UserContactsServiceFunctions;

  //  local factory fuctions
   function find () {
     var deferred = $q.defer();
     deferred.resolve(contactList);
     return deferred.promise;
   }

   function findOne (id) {
     var deferred = $q.defer();
     for(var i = 0; i< contactList.length; i++){
       if(id == contactList[i]._id){
         deferred.resolve(contactList[i]);
       }
     }
     return deferred.promise;
   }

   function addContact (contact) {
     var deferred = $q.defer();
     var id = contactList.length + 1;
     contact._id = id;
     contactList.push(contact);
     result.message = "successfully added your contact!";
     deferred.resolve(result);
     return deferred.promise;
   }

   function updateContact (contact) {
     var deferred = $q.defer();
     for(var i = 0; i< contactList.length; i++){
       if(contact._id == contactList[i]._id){
         contactList[i] = contact;
         result.message = "successfully updated your contact!";
         deferred.resolve(result);
       }
     }
     return deferred.promise;
   }

   function deleteContact (id) {
     var deferred = $q.defer();
     for(var i = 0; i< contactList.length; i++){
       if(id == contactList[i]._id){
         contactList.splice(i, 1);
         result.message = "successfully deleted your contact!";
         deferred.resolve(result);
       }
     }
     return deferred.promise;
   }

}]);
