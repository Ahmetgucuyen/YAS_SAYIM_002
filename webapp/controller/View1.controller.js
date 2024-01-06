var Table;
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"../model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (Controller, MessageBox, formatter, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("app.YAS_SAYIM_002.controller.View1", {

		formatter: formatter,
		onInit: function () {
			var key = this.getView().byId("table").getBinding("items");

			if (key !== undefined) {
				Table = key;
				key.refresh(true);
			}
			sap.ui.getCore().getEventBus().subscribe("channelName", "eventName", this.onEventTriggered, this);

		},
		onEventTriggered: function (channel, event, data) {
			// İlgili fonksiyonu burada çağır
			this.tablerefresh();
		},
		tablerefresh: function () {
			Table.refresh(true);
		},
		confirmedState: function (sValue) {
			switch (sValue) {
			case "01":
				return "Success";
			case "02":
				return "Warning";
			case "03":
				return "Error";
			}

		},
		periodFormatter: function (sPeriod) {
			if (sPeriod === '01') {
				return 'Aylık';
			} else if (sPeriod === '02') {
				return '3 Aylık';
			} else if (sPeriod === '03') {
				return '6 Aylık';
			} else if (sPeriod === '04') {
				return 'Yıllık';
			}
			return sPeriod;

		},
		idFormatter: function (sId) {
			sId = sId.slice(8);
			return sId;

		},
		statuFormatter: function (sStatu) {
			if (sStatu === '01') {
				return 'Yeni Talep';
			} else if (sStatu === '02') {
				return 'Sayım Devam Ediyor';
			} else if (sStatu === '03') {
				return 'Sayım Tamamlandı';
			}
			return sStatu;

		},
		onValueHelpBukrs: function () {
			var oModel = this.getView();
			if (!this._bukrsSH) {
				this._bukrsSH = sap.ui.xmlfragment("app.YAS_SAYIM_002.view.fragments.BukrsSH", this);
				oModel.addDependent(this._bukrsSH);
				this._bukrsSH.open();
			} else {
				oModel.addDependent(this._bukrsSH);
				this._bukrsSH.open();
			}
		},
		onValueHelpWerks: function () {
			var oModel = this.getView();
			if (!this._werksSH) {
				this._werksSH = sap.ui.xmlfragment("app.YAS_SAYIM_002.view.fragments.WerksSH", this);
				oModel.addDependent(this._werksSH);
				this._werksSH.open();
			} else {
				oModel.addDependent(this._werksSH);
				this._werksSH.open();
			}
			// var oBinding = this._werksSH.getBinding("items");
			// var oFilter2 = new sap.ui.model.Filter("ItBukrs", sap.ui.model.FilterOperator.EQ, sFilterValueBukrs);

			// var oFilter1 = new sap.ui.model.Filter("IvCountry", sap.ui.model.FilterOperator.EQ, sFilterValueSehir);
			// var oFilter = [oFilter1, oFilter2];
			// oBinding.filter([oFilter2]);
			// this._werksSH.setNoDataText("Şirket Kodu Seçiniz");
		},
		onValueHelpLgort: function () {
			var oModel = this.getView();
			if (!this._lgortSH) {
				this._lgortSH = sap.ui.xmlfragment("app.YAS_SAYIM_002.view.fragments.LgortSH", this);
				oModel.addDependent(this._lgortSH);
				this._lgortSH.open();
			} else {
				oModel.addDependent(this._lgortSH);
				this._lgortSH.open();
			}
			// var oBinding = this._lgortSH.getBinding("items");
			// var oFilter2 = new sap.ui.model.Filter("Werks", sap.ui.model.FilterOperator.EQ, sFilterValueWerks);

			// var oFilter1 = new sap.ui.model.Filter("IvCountry", sap.ui.model.FilterOperator.EQ, sFilterValueSehir);
			// var oFilter = [oFilter1, oFilter2];
			// oBinding.filter([oFilter2]);
			// this._lgortSH.setNoDataText("Üretim Yeri Seçiniz");
		},
		_confirmBukrsSH: function (e) {
			var t = e.getParameter("selectedContexts");
			if (t && t.length) {
				var s = t[0].getProperty("Bukrs");
				// var g = t[0].getProperty("Bezei");
				e.getSource().getBinding("items").filter([]);
				this.byId("idBukrs").setValue(s);
				// this.byId("idSehirr").setValue(g);
				// sFilterValueBukrs = s;

			}
			// this.getView().byId("idWerks").setValue("");

			// this.getView().byId("idLgort").setValue("");

		},
		_confirmWerksSH: function (e) {
			var t = e.getParameter("selectedContexts");
			if (t && t.length) {
				var s = t[0].getProperty("Werks");
				// var g = t[0].getProperty("Bezei");
				e.getSource().getBinding("items").filter([]);
				this.byId("idWerks").setValue(s);
				// this.byId("idSehirr").setValue(g);
				// sFilterValueWerks = s;

			}
			// this.getView().byId("idLgort").setValue("");

		},
		_confirmLgortSH: function (e) {
			var t = e.getParameter("selectedContexts");
			if (t && t.length) {
				var s = t[0].getProperty("Lgort");
				// var g = t[0].getProperty("Bezei");
				e.getSource().getBinding("items").filter([]);
				this.byId("idLgort").setValue(s);
				// this.byId("idSehirr").setValue(g);
				// sFilterValueWerks = s;

			}
			// this.getView().byId("idLgort").setValue("");

		},
		_searchBukrsSH: function (oEvent) {

			var oFilter = [];
			var sValue = oEvent.getParameter("value");
			if (isNaN(parseInt(sValue.slice(-1)))) {
				oFilter = new Filter("Butxt", FilterOperator.Contains, sValue);

			} else {
				oFilter = new Filter("Bukrs", FilterOperator.Contains, sValue);
			}
			oEvent.getSource().getBinding("items").filter([oFilter]);
		},
		_searchWerksSH: function (oEvent) {

			var oFilter = [];
			var sValue = oEvent.getParameter("value");
			if (isNaN(parseInt(sValue.slice(-1)))) {
				oFilter = new Filter("Name1", FilterOperator.Contains, sValue);

			} else {
				oFilter = new Filter("Werks", FilterOperator.Contains, sValue);
			}
			oEvent.getSource().getBinding("items").filter([oFilter]);
		},
		_searchLgortSH: function (oEvent) {

			var oFilter = [];
			var sValue = oEvent.getParameter("value");
			if (isNaN(parseInt(sValue.slice(-1)))) {
				oFilter = new Filter("Lgobe", FilterOperator.Contains, sValue);

			} else {
				oFilter = new Filter("Lgort", FilterOperator.Contains, sValue);
			}
			oEvent.getSource().getBinding("items").filter([oFilter]);
		},
		onSearch: function () {

			var aFilter = [];
			var that = this;
			var oModel = this.getOwnerComponent().getModel();

			// tableMainList = [];
			//var form = this.getView().byId("idDurumRaporuFormnoGecmis").getValue().toUpperCase();
			aFilter.push(new Filter("Bukrs", FilterOperator.Contains, this.getView().byId("idBukrs").getValue()));
			aFilter.push(new Filter("Lgort", FilterOperator.Contains, this.getView().byId("idLgort").getValue()));
			aFilter.push(new Filter("Werks", FilterOperator.Contains, this.getView().byId("idWerks").getValue()));
			var durum = this.getView().byId("idStatu").getSelectedKey();
			// durum = durum.slice(1);
			aFilter.push(new Filter("Statu", FilterOperator.EQ, durum));
			this.getView().byId("table").getBinding("items").filter(aFilter);

		},
		onGoto: function (oEvent) {
			// var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			var istamam = oEvent.getSource().getSelectedItem().getBindingContext().getObject().Statu;
			if (istamam === '03') {
				MessageBox.warning("Seçtiğiniz talebin sayımı tamamlanmıştır");

			} else {

				this._getRouter().navTo("TargetView2", {
					sayim_id: oEvent.getSource().getSelectedItem().getBindingContext().getObject().SayimId
				});
			}
			var oTable = this.getView().byId("table"); // Tablo nesnesini alın
			oTable.removeSelections(true); // true, tüm seçimleri kaldırmak için kullanılır

		},
		_getRouter: function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		}
	});
});