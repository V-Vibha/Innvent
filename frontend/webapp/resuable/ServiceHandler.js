/**
	 * @description Interface for all the get service calls
	 * @param {object} oParams - this objects has url, isAsync, success and error as attributes
	 * @since 1.0
	 * @author I077866
	 */
	ServiceHandler.prototype.getData = function (oParams) {
		var oHeaderData = {};
		if (oParams && oParams.headerData && oParams.headerData.constructor === Object) {
			oHeaderData = oParams.headerData;
		}
		return this.sendRequest(oParams, function () {
			return jQuery.ajax({
				"url": oParams.url,
				"async": oParams.isAsync,
				"dataType": oParams.dataType,
				"type": "GET",
				"headers": oHeaderData,
				"success": jQuery.proxy(this.handleSuccess, this, oParams),
				"error": jQuery.proxy(this.handleErrors, this, oParams, null),
				"complete": jQuery.proxy(this.handleComplete, this, oParams)
			});
		}.bind(this));
	};
	/**
	 * @description Function to return instance of an oData Model
	 * @param {Object} oParams - parameters to be passed to the oData model eg: url, params
	 * @returns {sap.ui.model.odata.v2.ODataModel} ODataModel Instance
	 * @since 1.0
	 * @author I077866
	 */
	ServiceHandler.prototype.getODataModel = function (oParams) {
		var url = "";
		var params = {
			loadMetadataAsync: true,
			defaultCountMode: "None",
			disableHeadRequestForToken: true
		};
		if (oParams) {
			if (oParams.url) {
				url = oParams.url;
			}
			if (oParams.params) {
				oParams.params.disableHeadRequestForToken = true;
				params = oParams.params;
			} else {
				oParams.params = {
					disableHeadRequestForToken: true
				};
				params = oParams.params;
			}
		}
		if (jQuery.sap.getUriParameters().get("sap-logged-scope")) {
			params.headers = {
				"scope": jQuery.sap.getUriParameters().get("sap-logged-scope")
			};
		}
		var oModel = new sap.ui.model.odata.v2.ODataModel(this._getURL(url), params).attachRequestFailed(function (e) {
			var sErrorText = "";
			if (e.getParameter("statusCode") === 503) {
				sErrorText = this._oReusableResourceBundle.getText(
					"sap.iot.ain.lib.reusable.serviceUnavailable.text");
				sap.m.MessageBox.error(sErrorText, {
					styleClass: "help-id-ain-serviceHandler-errorMessageBox"
				});
			}
		}.bind(this));
		return oModel;
	};