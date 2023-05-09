sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/BindingMode",
    "sap/ui/model/json/JSONModel",
    "sap/viz/ui5/format/ChartFormatter",
    "sap/viz/ui5/api/env/Format",
    "./InitPage",
    "sap/ui/model/odata/v2/ODataModel",
  ],
  function (
    Controller,
    BindingMode,
    JSONModel,
    ChartFormatter,
    Format,
    InitPageUtil,
    ODataModel
  ) {
    "use strict";

    return Controller.extend("com.sap.bpm.pv.innvent.ui.controller.MyView", {
      oVizFrame: null,

      onInit: function (evt) {
        Format.numericFormatter(ChartFormatter.getInstance());
        var formatPattern = ChartFormatter.DefaultPattern;
        var oModel = new JSONModel(this.settingsModel);
        oModel.setDefaultBindingMode(BindingMode.OneWay);
        this.getView().setModel(oModel);

        var OdataModel = new sap.ui.model.odata.v2.ODataModel(
          "pv-service/runtime/odata/v1/Accounts_Payable",
          {
            json: true,
            useBatch: false,
            defaultCountMode: sap.ui.model.odata.CountMode.None,
          }
        );
        var oFilterQ1 = new sap.ui.model.Filter(
          "SC_Status",
          sap.ui.model.FilterOperator.EQ,
          "Critical"
        );

        var oTreeMap = this.getView().byId("myTreeMap");

        /////////////////////////////////////////////////////////////////
        //tree
        var treeDataset = new sap.viz.ui5.data.FlattenedDataset({
          dimensions: [
            { axis: 1, name: "SC_Status", value: "{SC_Status}" },
            { axis: 1, name: "businessArea", value: "{businessArea}" },
          ],
          measures: [
            {
              group: 1,
              name: "SC_Number_Of_Instances",
              value: "{SC_Number_Of_Instances}",
            },
            {
              group: 1,
              name: "invoiceValue",
              value: "{invoiceValue}",
            },
          ],
          data: {
            path: "/Instances",
            filters: [oFilterQ1],
            parameters: {
              select: "SC_Number_Of_Instances,businessArea,invoiceValue",
            },
          },
        });

        oTreeMap.setDataset(treeDataset);
        console.log(treeDataset);
        oTreeMap.setModel(OdataModel);
      },
      onAfterRendering: function () {},
      onDatasetSelected: function (oEvent) {},
      onDataLabelChanged: function (oEvent) {},
      onSemanticColorChanged: function (oEvent) {},
    });
  }
);
