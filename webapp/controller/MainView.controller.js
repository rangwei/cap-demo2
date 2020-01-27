sap.ui.define([
  "com/myorg/myUI5App8/controller/BaseController"
], function(BaseController) {
  "use strict";

  return BaseController.extend("com.myorg.myUI5App8.controller.MainView", {
    onListItemPressed : function(oEvent){
			var oItem, oCtx;
			oItem = oEvent.getSource();
			oCtx = oItem.getBindingContext();
			this.getRouter().navTo("detail",{
				authorId : oCtx.getProperty("ID")
			});
    }
  });
});
