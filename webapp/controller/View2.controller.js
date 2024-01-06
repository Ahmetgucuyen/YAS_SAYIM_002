var tanim;
var sayimId;
var Tablo;
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (Controller, MessageBox, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("app.YAS_SAYIM_002.controller.View2", {
		onInit: function () {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("TargetView2").attachMatched(this._onRouteMatched, this);
			var viewModel = new sap.ui.model.json.JSONModel({

				sayimId: undefined
			});
			this.getView().setModel(viewModel, "viewModel");

		},
		_onRouteMatched: function (oEvent) {
			sayimId = oEvent.getParameter("arguments").sayim_id;

			// Tablo = oEvent.getParameter("arguments").table;
			// sayimId'yi kullanarak gerekli işlemleri yapabilirsiniz
			var oView = this.getView();
			oView.getModel("viewModel").setProperty("/sayimId", sayimId.slice(8));

			// oView.getModel("viewModel").setProperty("/table", Tablo);
		},
		_getRouter: function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
		onBack: function () {
			this._getRouter().navTo("TargetView1");
			// Tablo.refresh(true);
			// this.getView().byId("table").getBinding("items").refresh(true);
			sap.ui.getCore().getEventBus().publish("channelName", "eventName", {});

		},
		onCreate: function () {
			var that = this;
			var oModel = this.getView().getModel();

			var oEntry = {};

			oEntry.Matnr = this.getView().byId("idBarkod").getValue();
			oEntry.SayimId = sayimId;
			// oEntry.Matnr = this.getView().byId("idMatnr2").getValue();
			oEntry.Maktx = this.getView().byId("idMatnr").getText();

			oEntry.Adet = this.getView().byId("idAdet").getValue();
			if (oEntry.Adet.includes(",")) {
				oEntry.Adet = oEntry.Adet.replace(/,/g, ".");

			}
			if ((oEntry.Maktx === null || oEntry.Maktx === "" || oEntry.Maktx === undefined)) {
				MessageBox.error("Malzeme Bulunmamaktadır");
			} else if ((oEntry.Adet === null || oEntry.Adet === "" || oEntry.Adet === undefined)) {
				MessageBox.error("Adet Giriniz");
			} else {
				oModel.create("/SayimKayitSet", oEntry, {
					method: "POST",
					success: function (data) {
						MessageBox.information("Kayıt Başarılı");
						// location.reload();	
						that.getView().byId("idBarkod").setValue("");
						// that.getView().byId("idMatnr2").setValue("");
						that.getView().byId("idMatnr").setText("");
						that.getView().byId("idAdet").setValue("");
						that.getView().byId("panel2").setVisible(false);

						// that.getView().byId("idMatnr2").setVisible(false);

						that.getView().byId("panel2").setExpanded(false);
						that.onUpdate();
					},
					error: function (e) {
						alert("error");

					},

				});
			}
		},
		onUpdate: function (oEvent) {

			// var buton = this.getView().byId("idOnaylaKanal");

			var oModel = this.getView().getModel();
			var oEntry = {};
			oEntry.Statu = "02";
			var that = this;
			var sayimidd = sayimId;

			oModel.update("/TalepListesi1Set(SayimId='" + sayimidd + "')", oEntry, {
				method: "POST",
				success: function (data) {

				},
				error: function (e) {
					alert("error");
				},
			});

		},
		onTamamla: function (oEvent) {

			// var buton = this.getView().byId("idOnaylaKanal");

			var oModel = this.getView().getModel();
			var oEntry = {};
			oEntry.Statu = "03";
			var that = this;
			var sayimidd = sayimId;

			oModel.update("/TalepListesi1Set(SayimId='" + sayimidd + "')", oEntry, {
				method: "POST",
				success: function (data) {
					that.onBack();
				},
				error: function (e) {
					alert("error");
				},
			});

		},
		onBarkod: function () {

			var aFilter = [];
			var that = this;
			var oModel = this.getOwnerComponent().getModel();

			// tableMainList = [];
			//var form = this.getView().byId("idDurumRaporuFormnoGecmis").getValue().toUpperCase();
			aFilter.push(new Filter("Barkod", FilterOperator.EQ, this.getView().byId("idBarkod").getValue()));

			aFilter.push(new Filter("Matnr", FilterOperator.EQ, this.getView().byId("idBarkod").getValue()));
			// aFilter.push(new Filter("Lgort", FilterOperator.Contains, this.getView().byId("idLgort").getValue()));

			// this.getView().byId("table").getBinding("items").filter(aFilter);
			sap.ui.core.BusyIndicator.show();
			oModel.read("/BarkodGetirSet", {
				filters: aFilter,

				method: "GET",
				success: function (oData) {

					// var ismatnr = that.getView().byId("idMatnr1").getVisible();
					if (oData.results[0] !== undefined) {

						tanim = oData.results[0].Tanim;
						that.getView().byId("idMatnr").setText(tanim);
						that.getView().byId("panel2").setVisible(true);

						that.getView().byId("panel2").setExpanded(true);

					} else if (oData.results[0] === undefined) {

						MessageBox.warning("Malzeme Bulunamadı");

					}
					sap.ui.core.BusyIndicator.hide();
				},
				error: function (oError) {
					sap.ui.core.BusyIndicator.hide();
					MessageBox.warning("error");
				}

			});
		}
	});
});