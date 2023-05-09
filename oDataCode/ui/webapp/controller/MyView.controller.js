sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/BindingMode',
    'sap/ui/model/json/JSONModel',
    'sap/viz/ui5/format/ChartFormatter',
    'sap/viz/ui5/api/env/Format',
    './InitPage'
], function(Controller, BindingMode, JSONModel, ChartFormatter, Format, InitPageUtil) {
"use strict";

        return Controller.extend("com.sap.bpm.pv.innvent.ui.controller.MyView", {
        dataPath : "test-resources/sap/viz/demokit/dataset/milk_production_testing_data/revenue_cost_consume_country/1_percent",

        settingsModel : {
            dataset : {
                name: "Dataset",
                defaultSelected : 1,
                values : [{
                    name : "Small",
                    value : "/small.json"
                },{
                    name : "Medium",
                    value : "/medium.json"
                },{
                    name : "Large",
                    value : "/large.json"
                }]
            },
            dataLabel : {
                name : "Value Label",
                defaultState : true
            },
            semanticColor: {
                name:"Semantic colors",
                defaultState: false,
                values: {
                            "false":{},
                            "true":{
                                rules:[
                                    {
                                        dataContext: {Count:{max:50}},
                                        properties:{
                                            color: "sapUiChartPaletteSemanticGood"
                                        },
                                        displayName: "> 4.0L"
                                    },
                                    {
                                        dataContext: {Count:{min:50, max:170}},
                                        properties:{
                                            color: "sapUiChartPaletteSemanticCritical"
                                        },
                                        displayName: "2.2L - 4.0L"
                                    },
                                    {
                                        dataContext: {Count:{min:170}},
                                        properties:{
                                            color: "sapUiChartPaletteSemanticBad"
                                        },
                                        displayName: "< 1.8L"
                                    }
                            

                                ]
                            }
                        }
            }
        },
        oVizFrame : null,
        onInit : function (evt) {
            Format.numericFormatter(ChartFormatter.getInstance());
            var formatPattern = ChartFormatter.DefaultPattern;
            var OdataModel = new sap.ui.model.odata.v2.ODataModel("pv-service/runtime/odata/v1/Accounts_Payable", {

                                json: true,
                                useBatch: false
                                //  defaultCountMode: sap.ui.model.odata.CountMode.None
                    
                   });
                   var aTreeMapData = [];
                   var jsonModel;
                   OdataModel.read("/Instances", {
                    success: function(data) {
                      
                    var oProduct;
                    // aTreeMapData.push(data.results);
                    jsonModel = new sap.ui.model.json.JSONModel(data.results);
                    // console.log(jsonModel.getData());
                    jsonModel.setDefaultBindingMode(BindingMode.OneWay);
                    // console.log(`omodel: ${jsonModel.getData()}`);
                    console.log(this);
                    window.getView().setModel(jsonModel);
                    // var oVizFrame = this.oVizFrame = window.byId("oVizFrame");
                    
                    oVizFrame.setVizProperties({
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
                          visible: false,
                          text: 'Revenue and Cost by Country and Store Name'
                      }
                  });

            oVizFrame.setModel(jsonModel);
      
              var oPopOver = this.getView().byId("idPopOver");
              oPopOver.connect(oVizFrame.getVizUid());
              oPopOver.setFormatString(formatPattern.STANDARDFLOAT);
  
              InitPageUtil.initPageSettings(this.getView());

                },
                    error: function(error) {
                      // Error callback function
                      console.log(error);
                    }
                  });
                 
                  //new trial
                //   var oModel = new sap.ui.model.json.JSONModel(aTreeMapData);
            //      jsonModel.setDefaultBindingMode(BindingMode.OneWay);
            //       console.log(`omodel: ${jsonModel.getData()}`);

            //       this.getView().setModel(jsonModel);
            //       var oVizFrame = this.oVizFrame = this.getView().byId("oVizFrame");
            //       oVizFrame.setVizProperties({
            //         plotArea: {
            //             dataLabel: {
            //                 formatString:formatPattern.SHORTFLOAT_MFD2,
            //                 visible: true
            //             }
            //         },
            //         legend: {
            //             visible: true,
            //             formatString:formatPattern.SHORTFLOAT,
            //             title: {
            //                 visible: false
            //             }
            //         },
            //         title: {
            //             visible: false,
            //             text: 'Revenue and Cost by Country and Store Name'
            //         }
            //     });
    
            // var oPopOver = this.getView().byId("idPopOver");
            // oPopOver.connect(oVizFrame.getVizUid());
            // oPopOver.setFormatString(formatPattern.STANDARDFLOAT);

            // InitPageUtil.initPageSettings(this.getView());
    var oFilterQ1=new sap.ui.model.Filter('SC_Status',sap.ui.model.FilterOperator.EQ,'Critical');


        },
        onAfterRendering : function(){
            this.datasetRadioGroup = this.getView().byId('datasetRadioGroup');
            this.datasetRadioGroup.setSelectedIndex(this.settingsModel.dataset.defaultSelected);

            },
        onDatasetSelected : function(oEvent){
            var datasetRadio = oEvent.getSource();
            if (this.oVizFrame && datasetRadio.getSelected()){
                var bindValue = datasetRadio.getBindingContext().getObject();
                this.oVizFrame.setModel(dataModel);
            }
        },
        onDataLabelChanged : function(oEvent){
            if (this.oVizFrame){
                this.oVizFrame.setVizProperties({
                    plotArea: {
                        dataLabel: {
                            visible: oEvent.getParameter('state')
                        }
                    }
                });
            }
        },
        onSemanticColorChanged : function(oEvent){
            this._initializeSectionData();
            if (this.oVizFrame) {
                var oVizProperties = this.oVizFrame.getVizProperties();
                console.log(oVizProperties); // eslint-disable-line no-console
                this.oVizFrame.setVizProperties({
                    plotArea: {
                        dataPointStyle: this.settingsModel.semanticColor.values[oEvent.getParameter("state")]
                    }
                });
                window.test = this.oVizFrame.getVizProperties();
            }
        }
        
        });
    });
