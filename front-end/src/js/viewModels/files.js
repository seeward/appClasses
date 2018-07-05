
define(['ojs/ojcore', 'knockout', 'jquery'],
 function(oj, ko, $) {
  
    function FilesViewModel() {
      var self = this;
      
      self.files = ko.observable([]);

    self.getFiles = function(){
      // ajax to server

      setTimeout(function(){ 
        self.files([
            { id: 0, type: "pdf", isOwner: true, name: "File 1" , url: "data:image/png;base64,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"},
            { id: 1, name: "File 2", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJoyqctNpDIocX1DUIXy31GyZd0JQMT1DLmm_DGepjZzbTERL3" },
            { id: 2, name: "File 3", url: "http://www.steltix.com/images/steltix-logo-new.png" }
          ])
      }, 4000)
      // $.ajax({
      //   url: "http://0.0.0.0:5000/api/v1.0/files",
      //   method: "get"
      // }).done(function(data){
      //   // check our server response
      //   console.log(data);

      //   self.files(data);
      // })
    }

    self.getFiles();
      
      self.downloadFile = function(evt){
        const fileClicked = evt.target.id;
        self.files().forEach(function(oneFile){
          if(oneFile.id == fileClicked){
            alert(JSON.stringify(oneFile));
          }
        });

      }
    }

    return new FilesViewModel();
  }
);
