
define(['ojs/ojcore', 'knockout', 'jquery'],
 function(oj, ko, $) {
  
    function FilesViewModel() {
      var self = this;
      
      self.users = ko.observableArray([
        { name: "Bert" , url: "myfilesitting"},
        { name: "Charles", url: "myfilesitting" },
        { name: "Denise", url: "myfilesitting" }
      ]);
      
      self.connected = function() {
        // Implement if needed
       
      };

      /**
       * Optional ViewModel method invoked after the View is disconnected from the DOM.
       */
      self.disconnected = function() {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after transition to the new View is complete.
       * That includes any possible animation between the old and the new View.
       */
      self.transitionCompleted = function() {
        // Implement if needed
      };
    }

    return new FilesViewModel();
  }
);
