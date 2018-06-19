
define(['ojs/ojcore', 'knockout', 'jquery','ojs/ojrouter','ojs/ojinputtext'],
 function(oj, ko, $) {
  
    function LoginViewModel() {
      var self = this;
      // variables to hold our values
      self.router = oj.Router.rootInstance;      
      self.username = ko.observable("");
      self.password = ko.observable("");
      
      // method to login user
      self.doLogin = function(evt){
        console.log(self.username(), self.password());
        // our backend 
        // http://localhost:5000?user=
        $.ajax({
          url: "http://0.0.0.0:5000/api/v1.0/checkuser?user="+self.username(),
          method: "get"
        }).done(function(data){
          //alert(data.success);
          if(data.success == "true"){
            console.log("success");
            self.router.go('files');
          } else {
            alert("forbidden login... ")
            return
          }
        })


      }

      


    }


    return new LoginViewModel();
  }
);
