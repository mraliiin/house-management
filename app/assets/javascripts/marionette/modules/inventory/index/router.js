HousePad.TradeApp.module("Inventory.Index", function(Index, TradeApp, Backbone, Marionette, $, _){

    Index.Router = Backbone.Router.extend({

        routes: {
            "trade/inventory": "performSearch"
        },

        performSearch: function(){
            var url_params = this.getUrlParams(window.location.search);
            var filters = Backbone.Radio.request("app:data", "filters");
            filters.set("current", url_params);

            Backbone.Radio.command("inventory-items", "search", filters);
        },


        filtersChanged: function(){
            var url = this.getPageNavigationURL();
            HousePad.pageRouter.navigate(url, {trigger: false});

            $('html, body').animate({ scrollTop: 0 }, 'fast');

            Backbone.Radio.command("inventory-items", "search");
        },


        getPageNavigationURL: function(page_number) {
            var filters = Backbone.Radio.request("app:data", "filters");
            var url = "inventory";

            var url_params = new Array;
            for (var f in filters.get("current"))
            {
                if (filters.get("current")[f] && filters.get("current")[f].toString().length > 0)
                    url_params.push(f+"="+filters.get("current")[f]);
            }
            if (typeof (page_number) != "undefined" && page_number != "1")
                url_params.push("page="+page_number);

            if (url_params.length > 0)
                url += "?" + url_params.join("&");

            return url;
        },

        getUrlParams: function(url) {
            if (url[0] == "/")
                url = url.substr(1);
            if (url.indexOf("?")>=0)
                url = url.substring(url.indexOf("?")+1);

            a = url.split('&');
            if (a == "") return {};
            var b = {};
            for (var i = 0; i < a.length; ++i)
            {
                var p=a[i].split('=');
                if (p.length != 2) continue;
                b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
            }
            return b;
        }

    });

});
