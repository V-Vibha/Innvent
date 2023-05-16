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
        var url = "python_app/";
        var attData = [  
          { 
            name:"Completed Phase",
            value:"SC_Completed_Phases", 
            color:"Success" 
          }, 
          { name:"Active Phase", 
            value:"SC_Active_Phases", 
            color:"Success" 
          }, 
          { 
            name: "Item",
            value:"item", 
            color:"Warning" 
          } ,
          { name:"Document Type",  
            value:"documentType", 
            color:"Warning" 
          }, 
          { 
            name: "Company Code",
            value:"companyCode", 
            color:"Warning"  
          }, 
          { 
            
            name:"Business Area", 
            value:"businessArea", 
            color:"Warning"  
           }, 
          { 
            name: "Vendor",
            value:"vendor", 
            color:"Warning"  
          }, 
        ];
        var attData1 = [];
        //  jQuery.sap.delayedCall(3000, this, function() {
        jQuery.ajax({
          url: url,
          
          success: function(data) {
              
              console.log('Response from Python app' + data);
              
                    }
          ,
        error: function(err)
      {
         console.log('error' + err);
      }})
          //  });
          //  var metadata = myControl.getModel().getMetaModel(); // Assuming myControl is the UI control you're working with
          //  var entityType = metadata.getODataEntityType("xmlns:sap='http://www.sap.com/Protocols/SAPData' Name='InstanceType' sap:semantics='aggregate'"); // Replace "EntityTypeName" with the actual entity type name
           
          //  if (entityType) {
          //    var propertyMetadata = entityType.getProperty("PropertyName"); // Replace "PropertyName" with the actual property name
          //    if (propertyMetadata) {
          //      var label = propertyMetadata["sap:label"];
          //      console.log("Label:", label);
          //    }
          //  }
           
       
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
              text: 'Instances by'
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

        this.updateTreeMap(this.title);
        OdataModel.metadataLoaded().then(function() {
          var oMetadata = OdataModel.getServiceMetadata();
          var entityName = "/Instances"; // Replace with the entity name you want to retrieve data from
        
          var oEntityMetadata = oMetadata.dataServices.schema[0][0].entityType.find(function(entity) {
            return entity.name === entityName;
          });
          console.log(oEntityMetadata);
          if (oEntityMetadata) {
            oEntityMetadata.property.forEach(function(property) {
              var propertyName = property.name;
              var propertyLabel = property["sap:label"];
        
              console.log("Property Name: " + propertyName);
              console.log("Property Label: " + propertyLabel);
            });}});
        oTreeMap.setModel(OdataModel);
      },
      updateTreeMap: function (attributeName) {
        console.log("attributeName= " + attributeName)
        this.treeDataset = new sap.viz.ui5.data.FlattenedDataset({
          dimensions: [
            { axis: 1, name: "Status", value: "Critical" },
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
          var datasetRadio = oEvent.getSource();
          var bindValue = datasetRadio.getBindingContext().getObject();
        this.title = oEvent.getSource().getText();
        this.oTreeMap.setVizProperties({
          title : { text: "Instances by "+this.title }});
          this.updateTreeMap(bindValue.value);
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
