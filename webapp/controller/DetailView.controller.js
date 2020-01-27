sap.ui.define([
    "com/myorg/myUI5App8/controller/BaseController"
  ], function(BaseController) {
    "use strict";
  
    return BaseController.extend("com.myorg.myUI5App8.controller.DetailView", {
      onInit: function () {
        var oRouter = this.getRouter();
        oRouter.getRoute("detail").attachMatched(this._onRouteMatched, this);
        // Hint: we don't want to do it this way
        /*
        oRouter.attachRouteMatched(function (oEvent){
          var sRouteName, oArgs, oView;
          sRouteName = oEvent.getParameter("name");
          if (sRouteName === "employee"){
            this._onRouteMatched(oEvent);
          }
        }, this);
        */
      },
      _onRouteMatched : function (oEvent) {
        var oArgs, oView;
        oArgs = oEvent.getParameter("arguments");
        oView = this.getView();


        oView.bindElement({
          path : "/Authors(" + oArgs.authorId + ")?$expand=books($select=ID,title)",
          events : {
            change: this._onBindingChange.bind(this),
            dataRequested: function (oEvent) {
              oView.setBusy(true);
            },
            dataReceived: function (oEvent) {
              oView.setBusy(false);
            }
          }
        });
      },
      _onBindingChange : function (oEvent) {
        // No data for the binding
        if (!this.getView().getBindingContext()) {
          this.getRouter().getTargets().display("notFound");
        }
      },
      showBook : function(oEvent){
        var oItem, oCtx;
        oItem = oEvent.getSource();
        oCtx = oItem.getBindingContext();


        this.getRouter().navTo("book",{
          bookId : oCtx.getProperty("ID")
        });
      }

    });
  });
  