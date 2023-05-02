sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/BindingMode',
    'sap/ui/model/json/JSONModel',
    'sap/viz/ui5/format/ChartFormatter',
    'sap/viz/ui5/api/env/Format',
    './InitPage'
], function(Controller, BindingMode, JSONModel, ChartFormatter, Format, InitPageUtil) {
"use strict";

        return Controller.extend("project2.controller.View1", {
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
            // set explored app's demo model on this sample
            var oModel = new JSONModel(this.settingsModel);
            oModel.setDefaultBindingMode(BindingMode.OneWay);
            this.getView().setModel(oModel);

            var Vbox =  this.getView().byId("Vbox");
            var oVizFrame = this.oVizFrame = this.getView().byId("idVizFrame");
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

            var oData= {
                "Reports": [
                  {
                    "Scenario Instance Id": "643ed8013398cc24c76d01fd",
                    "State": "Open",
                    "Status": "Critical",
                    "SubStatus": "Payment Block Set",
                    "Company Code": "R100",
                    "Document Number": "66942",
                    "Count": "20",
                    "Business Area": "8889",
                    "Document Type": "RE",
                    "Cycle Time": "4.63 Days",
                    "Vendor": "Acme Industrial Supplies",
                    "Invoice Value": "6050 EUR",
                    "Active Phases": "Record Invoice",
                    "Completed Phases": "Create Invoice",
                    "Compliance Issues": "0",
                    "Critical Vendor": "0",
                    "Early Payment": "0",
                    "Invoiced Manually": "1",
                    "Count":1,
                    "Late Payment": "0"
                  },
                  {
                    "Scenario Instance Id": "643ed8013398cc24c76d027f",
                    "State": "Open",
                    "Status": "Critical",
                    "SubStatus": "On Time",
                    "Company Code": "2000",
                    "Document Number": "44910",
                    "Count": "12",
                    "Business Area": "7000",
                    "Document Type": "KR",
                    "Cycle Time": "7.83 Days",
                    "Vendor": "American Business Services",
                    "Invoice Value": "10814 EUR",
                    "Active Phases": "Pay Invoice",
                    "Completed Phases": "Create Invoice,Record Invoice",
                    "Compliance Issues": "0",
                    "Critical Vendor": "1",
                    "Early Payment": "0",
                    "Invoiced Manually": "0",
                    "Count":1,
                    "Late Payment": "0"
                  },
                  {
                    "Scenario Instance Id": "643ed8013398cc24c76d020c",
                    "State": "Open",
                    "Status": "Critical",
                    "SubStatus": "Payment Block Set",
                    "Company Code": "R100",
                    "Document Number": "294336",
                    "Count": "2",
                    "Business Area": "9900",
                    "Document Type": "KR",
                    "Cycle Time": "4.62 Days",
                    "Vendor": "Sommer GmbH",
                    "Invoice Value": "7600 EUR",
                    "Active Phases": "Record Invoice",
                    "Completed Phases": "Create Invoice",
                    "Compliance Issues": "0",
                    "Critical Vendor": "0",
                    "Early Payment": "0",
                    "Invoiced Manually": "1",
                    "Count":1,
                    "Late Payment": "0"
                  },
                  {
                    "Scenario Instance Id": "643ed8013398cc24c76d018a",
                    "State": "Open",
                    "Status": "Critical",
                    "SubStatus": "Payment Block Set",
                    "Company Code": "3000",
                    "Document Number": "235458",
                    "Count": "5",
                    "Business Area": "3000",
                    "Document Type": "RE",
                    "Cycle Time": "4.62 Days",
                    "Vendor": "AluCast",
                    "Invoice Value": "358 EUR",
                    "Active Phases": "Record Invoice",
                    "Completed Phases": "Create Invoice",
                    "Compliance Issues": "0",
                    "Critical Vendor": "0",
                    "Early Payment": "0",
                    "Invoiced Manually": "1",
                    "Count":1,
                    "Late Payment": "0"
                  },
                  {
                    "Scenario Instance Id": "643ed8013398cc24c76cff82",
                    "State": "Open",
                    "Status": "Critical",
                    "SubStatus": "Payment Block Set",
                    "Company Code": "1000",
                    "Document Number": "101610",
                    "Count": "9",
                    "Business Area": "9900",
                    "Document Type": "RE",
                    "Cycle Time": "4.63 Days",
                    "Vendor": "Acme Industrial Supplies",
                    "Invoice Value": "10814 EUR",
                    "Active Phases": "Record Invoice",
                    "Completed Phases": "Create Invoice",
                    "Compliance Issues": "0",
                    "Critical Vendor": "0",
                    "Early Payment": "0",
                    "Invoiced Manually": "1",
                    "Count":1,
                    "Late Payment": "0"
                  },
                  {
                    "Scenario Instance Id": "643ed8013398cc24c76cffb3",
                    "State": "Open",
                    "Status": "Critical",
                    "SubStatus": "Payment Block Set",
                    "Company Code": "R100",
                    "Document Number": "298512",
                    "Count": "22",
                    "Business Area": "2000",
                    "Document Type": "KR",
                    "Cycle Time": "4.62 Days",
                    "Vendor": "Phunix GmbH",
                    "Invoice Value": "10814 EUR",
                    "Active Phases": "Record Invoice",
                    "Completed Phases": "Create Invoice",
                    "Compliance Issues": "0",
                    "Critical Vendor": "0",
                    "Early Payment": "0",
                    "Invoiced Manually": "1",
                    "Count":1,
                    "Late Payment": "0"
                  },
                  {
                    "Scenario Instance Id": "643ed8013398cc24c76d0159",
                    "State": "Open",
                    "Status": "Critical",
                    "SubStatus": "On Time",
                    "Company Code": "2000",
                    "Document Number": "173772",
                    "Count": "11",
                    "Business Area": "4000",
                    "Document Type": "RE",
                    "Cycle Time": "7.82 Days",
                    "Vendor": "American Business Services",
                    "Invoice Value": "7543 EUR",
                    "Active Phases": "Pay Invoice",
                    "Completed Phases": "Create Invoice,Record Invoice",
                    "Compliance Issues": "0",
                    "Critical Vendor": "1",
                    "Early Payment": "0",
                    "Invoiced Manually": "0",
                    "Count":1,
                    "Late Payment": "0"
                  },
                  {
                    "Scenario Instance Id": "643ed8013398cc24c76cff31",
                    "State": "Open",
                    "Status": "Critical",
                    "SubStatus": "On Time",
                    "Company Code": "2000",
                    "Document Number": "186750",
                    "Count": "7",
                    "Business Area": "9900",
                    "Document Type": "KR",
                    "Cycle Time": "7.82 Days",
                    "Vendor": "American Business Services",
                    "Invoice Value": "8114 EUR",
                    "Active Phases": "Pay Invoice",
                    "Completed Phases": "Create Invoice,Record Invoice",
                    "Compliance Issues": "0",
                    "Critical Vendor": "1",
                    "Early Payment": "0",
                    "Invoiced Manually": "0",
                    "Count":1,
                    "Late Payment": "0"
                  },
                  {
                    "Scenario Instance Id": "643ed8013398cc24c76d025d",
                    "State": "Open",
                    "Status": "Critical",
                    "SubStatus": "Payment Block Set",
                    "Company Code": "2000",
                    "Document Number": "56772",
                    "Count": "2",
                    "Business Area": "9900",
                    "Document Type": "KR",
                    "Cycle Time": "4.63 Days",
                    "Vendor": "Sunny Electronics GmbH",
                    "Invoice Value": "7831 EUR",
                    "Active Phases": "Record Invoice",
                    "Completed Phases": "Create Invoice",
                    "Compliance Issues": "0",
                    "Critical Vendor": "0",
                    "Early Payment": "0",
                    "Invoiced Manually": "1",
                    "Count":1,
                    "Late Payment": "0"
                  },
                  {
                    "Scenario Instance Id": "643ed8013398cc24c76d01ec",
                    "State": "Open",
                    "Status": "Critical",
                    "SubStatus": "Payment Block Set",
                    "Company Code": "3000",
                    "Document Number": "269460",
                    "Count": "3",
                    "Business Area": "9900",
                    "Document Type": "KR",
                    "Cycle Time": "4.63 Days",
                    "Vendor": "Tiefland Glass AG",
                    "Invoice Value": "358 EUR",
                    "Active Phases": "Record Invoice",
                    "Completed Phases": "Create Invoice",
                    "Compliance Issues": "0",
                    "Critical Vendor": "0",
                    "Early Payment": "0",
                    "Invoiced Manually": "1",
                    "Count":1,
                    "Late Payment": "0"
                  }
                ]
              };

            var dataModel = new JSONModel(oData);
            oVizFrame.setModel(dataModel);

            var oPopOver = this.getView().byId("idPopOver");
            oPopOver.connect(oVizFrame.getVizUid());
            oPopOver.setFormatString(formatPattern.STANDARDFLOAT);

            InitPageUtil.initPageSettings(this.getView());




            // ///////////////////////////////////////////////////////////////

    var sURI = 'https://srk-spa-test.sap-process-automation.cfapps.sap.hana.ondemand.com/comsapspaprocessautomation.comsapspapvinstances/pv-service/runtime/odata/v1/Accounts_Payable/';
    var oModel = new sap.ui.model.odata.ODataModel(sURI, true);
    var oFilterQ1=new sap.ui.model.Filter('SC_Status',sap.ui.model.FilterOperator.EQ,'Critical');

// // — - - - - - - - - —  - - - - - 

// ///////////////////////////////////////////////////////////////
// //tree
//             var treeDataset = new sap.viz.ui5.data.FlattenedDataset({
//               dimensions : [ 
// {axis : 1,
//                 name : 'Status',
//                 value : '{Status}'
//               },
// {axis : 1,
//                 name : 'Business Area',
//                 value : '{Business Area}'
//               }
//             //   ,{
//             //     axis : 1,
//             //     name : 'REGION',
//             //     value : "{REGION}"
//             //   },{
//             //     axis : 1,
//             //     name : 'OPPORTUNITY_OWNER',
//             //     value : "{OPPORTUNITY_OWNER}"
//             //   } ,{
//             //     axis : 1,
//             //     name : 'CUSTOMER_DESC',
//             //     value : "{CUSTOMER_DESC}"
//             //   } 
//              ],

//               measures : [ {
//                 group : 1,
//                 name : 'Count',
//                 value : '{Count}'
//               }],

//               data : {
//                 path : "",
//              filters: [oFilterQ1]
//               }
//             });
            
//             var vbar = new sap.viz.ui5.Treemap({
//               id : "treemap",
//               width : "80%",
//               height : "400px",
//               plotArea : {
//                 "endColor":"#3300c0", 
//                 "startColor":"#a9f0ff"
//               },
//               title : {
//                 visible : true,
//                 text : 'Profit By Country & Population'
//               },
//               dataset : treeDataset
//             });
//             vbar.setModel(oModel);
//            vbar.placeAt(Vbox); 

////////////////- - - - - - - - - - -- - - - - - - - - - -- - - - --  - -- -
        },
        onAfterRendering : function(){
            this.datasetRadioGroup = this.getView().byId('datasetRadioGroup');
            this.datasetRadioGroup.setSelectedIndex(this.settingsModel.dataset.defaultSelected);

            },
        onDatasetSelected : function(oEvent){
            var datasetRadio = oEvent.getSource();
            if (this.oVizFrame && datasetRadio.getSelected()){
                var bindValue = datasetRadio.getBindingContext().getObject();
                // var dataModel = new JSONModel(this.dataPath + bindValue.value);
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
        // onInit: function () {
        //         var a="abc"
        //         console.log(typeof a);
                
        //     }
        });
    });
