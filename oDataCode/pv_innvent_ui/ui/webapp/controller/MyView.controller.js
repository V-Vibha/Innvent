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
                  dataContext: { SC_Number_Of_Instances: { max: 50 } },
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

        var attData = [  
          { 
            value:"SC_Completed_Phases", 
            color:"Success" 
          }, 
          { 
            value:"SC_Active_Phases", 
            color:"Success" 
          }, 
          { 
            value:"item", 
            color:"Warning" 
          } ,
          { 
            value:"documentType", 
            color:"Warning" 
          }, 
          { 
            value:"companyCode", 
            color:"Warning"  
          }, 
          { 
            value:"businessArea", 
            color:"Warning"  
           }, 
          { 
            value:"vendor", 
            color:"Warning"  
          }, 
        ];
          var RBModel = new JSONModel(attData);
          this.CheckBoxList = this.getView().byId("attributeList");
          this.CheckBoxList.setModel(RBModel);


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
              text: 'Slice and Dice for Critical Processes'
          }
      });
      
        var OdataModel = new sap.ui.model.odata.v2.ODataModel(
          "pv-service/runtime/odata/v1/Accounts_Payable",
          {
            json: true,
            useBatch: false,
            defaultCountMode: sap.ui.model.odata.CountMode.None,
          }
        );
        var oFilterQ1=this.oFilterQ1 = new sap.ui.model.Filter(
          "SC_Status",
          sap.ui.model.FilterOperator.EQ,
          "Critical"
        );

        // this.title =sap.ui.getCore().byId("__button0-"+this.CheckBoxList.sId+"-0").getText();
        this.updateTreeMap(this.title);
        oTreeMap.setModel(OdataModel);
      },
      updateTreeMap: function (attributeName) {
        this.treeDataset = new sap.viz.ui5.data.FlattenedDataset({
          dimensions: [
            { axis: 1, name: "SC_Status", value: "Critical" },
            { axis: 1, name: "Selected_Attribute", value: '{'+ attributeName +'}'},
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
        this.title = oEvent.getSource().getText();
        this.oTreeMap.setVizProperties({
          title : { text: "Slice and Dice for Critical Processes and "+this.title }});
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
