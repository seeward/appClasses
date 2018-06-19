
define(['ojs/ojcore', 'knockout', 'jquery'],
 function(oj, ko, $) {
  
    function FilesViewModel() {
      var self = this;
      
      self.users = ko.observable([
        { id: 0, name: "File 1" , url: "http://www.steltix.com/images/steltix-logo-new.png"},
        { id: 1, name: "File 2", url: "http://www.steltix.com/images/steltix-logo-new.png" },
        { id: 2, name: "File 3", url: "http://www.steltix.com/images/steltix-logo-new.png" }
      ]);
      
      self.downloadFile = function(evt){
        const fileClicked = evt.target.id;
        self.users().forEach(function(oneUser){
          if(oneUser.id == fileClicked){
            alert(JSON.stringify(oneUser));
          }
        });

      }
    }

    return new FilesViewModel();
  }
);
