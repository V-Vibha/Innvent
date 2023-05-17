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
        // atta :
        //   {  
        //     selectedAttribute: "Invoiced_Manually", 
            
        //    },
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
                  dataContext: { "{Number Of Instances}": { max: 50 } },
                  properties: {
                    color: "sapUiChartPaletteSemanticGood",
                  },
                  displayName: "< 50",
                },
                {
                  dataContext: {
                    SC_Number_Of_Instances: { min: 50, max: 250 },
                  },
                  properties: {
                    color: "sapUiChartPaletteSemanticCritical",
                  },
                  displayName: "50 - 250",
                },
                {
                  dataContext: { SC_Number_Of_Instances: { min: 250 } },
                  properties: {
                    color: "sapUiChartPaletteSemanticBad",
                  },
                  displayName: "> 250",
                },
              ],
            },
          },
        },
      },
      oTreeMap: null,

      onInit: function (evt) {
        Format.numericFormatter(ChartFormatter.getInstance());
        var formatPattern = ChartFormatter.DefaultPattern;
        var oModel = new JSONModel(this.settingsModel);
        oModel.setDefaultBindingMode(BindingMode.OneWay);
        this.getView().setModel(oModel);
        var title = this.title = '';
        this.vizfeed1 = this.getView().byId("IDGenFeedItem4");

        var pyData = this.pyData=[];
        var url = "python_app/";
        jQuery.ajax({ 
          url: url, 
          success: function(data) { 
            pyData = data;
            // console.log('Response from Python app' + data);
            data.forEach(element => {
              console.log(' ' + element);
            });
            data.forEach(function(item) {
               console.log(item);
            });
          } , 
          error: function(err) { 
            console.log('error' + err); 
          }});
          jQuery.sap.delayedCall(3000, this, function() { 
          var RBModel= this.RBModel = new JSONModel(pyData);
          this.CheckBoxList = this.getView().byId("attributeList");
          this.CheckBoxList.setModel(RBModel); 
          
          });
          

        var OdataModel = new sap.ui.model.odata.v2.ODataModel(
          "pv-service/runtime/odata/v1/Accounts_Payable",
          {
            json: true,
            useBatch: false,
            loadMetadataAsync : false,
            defaultCountMode: sap.ui.model.odata.CountMode.None,
          }
        );
        var oFilterQ1=this.oFilterQ1 = new sap.ui.model.Filter(
          "SC_Status",
          sap.ui.model.FilterOperator.EQ,
          "Critical"
        );

        // var attData = [
        //   { 
        //     "label":"Completed Phases",
        //     "key":"SC_Completed_Phases"
        //   },
        //   { 
        //     "label":"Active Phases",
        //     "key":"SC_Active_Phases"
        //   },
        //   { 
        //     "label":"Item",
        //     "key":"item"
        //   },
        //   { 
        //     "label":"Document Type",
        //     "key":"documentType"
        //   },
        //   { 
        //     "label":"Company Code",
        //     "key":"companyCode"
        //   },
        //   { 
        //     "label":"Business Area",
        //     "key":"businessArea"
        //   },
        //   { 
        //     "label":"Vendor",
        //     "key":"vendor"
        //   }
        // ];

          // var RBModel= this.RBModel = new JSONModel(attData);
          // this.CheckBoxList = this.getView().byId("attributeList");
          // this.CheckBoxList.setModel(RBModel);
          
// ========================================================
// console.log(OdataModel);
//         var RBModel2;
//         var CheckBoxList2= this.CheckBoxList2= this.getView().byId("attributeList2");
//         OdataModel.attachRequestCompleted(function() {
//           var aD = this.getMetaModel().oMetadata.mEntityTypes["com.sap.pvs.InstanceType"].property
//           var attData = { 
//             "value": [  "SC_Completed_Phases",
//                         "SC_Active_Phases",
//                         "item",
//                         "documentType",
//                         "companyCode",
//                         "businessArea",
//                         "vendor"
//                       ]
//                     };
//           var RBModel= this.RBModel = new JSONModel(attData);
//           var keys=[];
//           for (var j = 0; j < 7; j++ ) {
//             for(var i = 0; i < aD.length; i++) {
//               if(attData.value[j] === aD[i].name){
//                 console.log(aD[i].extensions[1].value);

//                 keys.push(aD[i].extensions[1].value);
//                 // console.loxg(keys);
//               }
//             }
//             // var obj = aD[i];
//             // console.log(aD[i].extensions[1].value);
//          }
//         //  RBModel.setdata("keys",keys);
//          console.log(keys);
//          console.log(RBModel);
        
//           RBModel2 = new JSONModel(aD);
//           CheckBoxList2.setModel(RBModel2);
//         });
// ========================================================

      var oTreeMap = this.oTreeMap = this.getView().byId("myTreeMap");
      oTreeMap.setVizProperties({
        plotArea: {
          dataLabel: {
            formatString:formatPattern.SHORTFLOAT_MFD2,
            visible: true
          }
        },
        legend: {
          visible: true,
          formatString:formatPattern.SHORTFLOAT,
          title: {
            visible: false
          }
        },
        title: {
          visible: true,
          formatString:formatPattern.SHORTFLOAT,
          text: 'Instances by'
        }
      });

        // this.updateTreeMap(this.title);
        oTreeMap.setModel(OdataModel);
      },
      updateTreeMap: function (attributeName) {
        this.treeDataset = new sap.viz.ui5.data.FlattenedDataset({
          dimensions: [
            { axis: 1, name: "Status", value: "Critical" },
            { axis: 1, name: "Selected Attribute", value: '{'+ attributeName +'}'},
          ],
          measures: [
            {
              group: 1,
              name: "Number Of Instances",
              value: "{SC_Number_Of_Instances}",
            },
          ],
          data: {
            path: "/Instances",
            filters: [this.oFilterQ1],
            parameters:
            {
                select: "SC_Number_Of_Instances," + attributeName
            }
          },
        });
        this.oTreeMap.setDataset(this.treeDataset);
        
      },
      handleSelectChange: function (oEvent) {
        // if(this.title !== oEvent.getSource().getSelectedItem().getText()){
        this.title = oEvent.getSource().getCustomData()[0].getValue();
        this.oTreeMap.setVizProperties({
          title : { text: "Instances by "+oEvent.getSource().getText() }});
          this.updateTreeMap(this.title);
        // }
      },
      onAfterRendering: function () {
          var firstItem ="__button0-"+this.CheckBoxList.sId+"-0"
          sap.ui.getCore().byId(firstItem).setSelected(true); 
          sap.ui.getCore().byId(firstItem).fireSelect();
          this.title =sap.ui.getCore().byId(firstItem).getText();
      },
      onDatasetSelected: function (oEvent) {
        var datasetRadio = oEvent.getSource();
        if (this.oTreeMap && datasetRadio.getSelected()) {
          var bindValue = datasetRadio.getBindingContext().getObject();
          this.oTreeMap.setModel(dataModel);
        }
      },
      onDataLabelChanged: function (oEvent) {
        if (this.oTreeMap) {
          this.oTreeMap.setVizProperties({
            plotArea: {
              dataLabel: {
                visible: oEvent.getParameter("state"),
              },
            },
          });
        }
      },
      onSemanticColorChanged: function (oEvent) {
        if (this.oTreeMap) {
          var oVizProperties = this.oTreeMap.getVizProperties();
          this.oTreeMap.setVizProperties({
            plotArea: {
              dataPointStyle:
                this.settingsModel.semanticColor.values[
                  oEvent.getParameter("state")
                ],
            },
          });
          window.test = this.oTreeMap.getVizProperties();
        }
      }
      
    });
  }
);
