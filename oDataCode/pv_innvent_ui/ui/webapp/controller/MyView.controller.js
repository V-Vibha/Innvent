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
      dataPath:
        "test-resources/sap/viz/demokit/dataset/milk_production_testing_data/revenue_cost_consume_country/1_percent",

      settingsModel: {
        dataset: {
          name: "Dataset",
          defaultSelected: 1,
          values: [
            {
              name: "Small",
              value: "/small.json",
            },
            {
              name: "Medium",
              value: "/medium.json",
            },
            {
              name: "Large",
              value: "/large.json",
            },
          ],
        },
        dataLabel: {
          name: "Value Label",
          defaultState: true,
        },
        semanticColor: {
          name: "Semantic colors",
          defaultState: false,
          values: {
            false: {},
            true: {
              rules: [
                {
                  dataContext: { SC_Number_Of_Instances: { max: 50 } },
                  properties: {
                    color: "sapUiChartPaletteSemanticGood",
                  },
                  displayName: "> 4.0L",
                },
                {
                  dataContext: {
                    SC_Number_Of_Instances: { min: 50, max: 250 },
                  },
                  properties: {
                    color: "sapUiChartPaletteSemanticCritical",
                  },
                  displayName: "2.2L - 4.0L",
                },
                {
                  dataContext: { SC_Number_Of_Instances: { min: 250 } },
                  properties: {
                    color: "sapUiChartPaletteSemanticBad",
                  },
                  displayName: "< 1.8L",
                },
              ],
            },
          },
        },
      },
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
          ],
          data: {
            path: "/Instances",
            filters: [oFilterQ1],
            parameters:
            {
                select: "SC_Number_Of_Instances,businessArea" 
            }
          },
        });
        
        oTreeMap.setDataset(treeDataset);
        console.log(treeDataset);
        oTreeMap.setModel(OdataModel);

        var attData = [  
          {  value:"Invoiced Manually", 
           selected:false, 
           color:"green" 
           }, 
          { 
             value:"Late Payment", 
              selected:false ,
              color:"green" 
          }, 
          { 
             value:"Completed Phases", 
             selected:false ,
             color:"green" 
          }, 
          { 
             value:"Active Phases", 
              selected:false 
          }, 
          { 
             value:"Critical Vendor", 
              selected:false 
          }, 
           { 
             value:"Item", 
              selected:false 
          } ,
          { 
               value:"Document Type", 
                selected:false, 
                color:"green" 
          }, 
          { 
                   value:"Early Payment", 
                    selected:false 
           }, 
          { 
             value:"Company Code", 
              selected:false 
           }, 
          { 
              value:"Business Area", 
              selected:true 
            
            }, 
             { 
               value:"Vendor", 
                selected:false 
               }, 
                { 
                   value:"Invoice Value", 
                    selected:false 
                   }];
        
           var RBModel = new JSONModel(attData);
           var CheckBoxList = this.getView().byId("attributeList");
           CheckBoxList.setModel(RBModel);

          //  var firstItem = this.getView().byId("attributeList").getItems()[0]; 
          //  this.getView().byId("attributeList").setSelectedItem(firstItem,true); 

      },
      handleSelectChange: function (oEvent) {
        var title =oEvent.getSource().getText();
        sap.m.MessageToast.show(oEvent.getSource().getText());
      },

      onAfterRendering: function () {
        // var list = new sap.m.List({
        //   id : "attributeList" ,
        //   updateFinished : function(oEvent){ 
        //        var firstItem = this.getView().byId("attributeList").getItems()[0]; 
        //        this.getView().byId("attributeList").setSelectedItem(firstItem,true); 
        //        // perform further neede code here..like modfieng detail page based upon first item
        //        }
        //   });
          
        //   var firstItem = this.getView().byId("attributeList").getItems()[0]; 
        //   this.getView().byId("attributeList").setSelectedItem(firstItem,true); 

        // this.datasetRadioGroup = this.getView().byId("attributeList");
        // this.datasetRadioGroup.setSelectedIndex(
        //   this.settingsModel.dataset.defaultSelected
        // );
      },
      onDatasetSelected: function (oEvent) {
        var datasetRadio = oEvent.getSource();
        if (this.oVizFrame && datasetRadio.getSelected()) {
          var bindValue = datasetRadio.getBindingContext().getObject();
          this.oVizFrame.setModel(dataModel);
        }
      },
      onDataLabelChanged: function (oEvent) {
        if (this.oVizFrame) {
          this.oVizFrame.setVizProperties({
            plotArea: {
              dataLabel: {
                visible: oEvent.getParameter("state"),
              },
            },
          });
        }
      },
      onSemanticColorChanged: function (oEvent) {
        this._initializeSectionData();
        if (this.oVizFrame) {
          var oVizProperties = this.oVizFrame.getVizProperties();
          console.log(oVizProperties); // eslint-disable-line no-console
          this.oVizFrame.setVizProperties({
            plotArea: {
              dataPointStyle:
                this.settingsModel.semanticColor.values[
                  oEvent.getParameter("state")
                ],
            },
          });
          window.test = this.oVizFrame.getVizProperties();
        }
      },
    });
  }
);
