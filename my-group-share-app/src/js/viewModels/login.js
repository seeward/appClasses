
define(['ojs/ojcore', 'knockout', 'jquery','ojs/ojinputtext'],
 function(oj, ko, $) {
  
    function LoginViewModel() {
      var self = this;
      
      // get the data we need for this view
      self.doLogin = function(evt){
        console.log($('#pass').val())
        let myPass = $('#pass').val();
        
      }
      self.username = ko.observable("");

      self.connected = function() {
        
      };

      self.disconnected = function() {
        
      };


      self.transitionCompleted = function() {
       
      };
    }


    return new LoginViewModel();
  }
);
