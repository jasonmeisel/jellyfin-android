define(["components/paperdialoghelper","paper-dialog","paper-fab","paper-input"],function(e){function a(){var e=$(this).parents(".editorContent");return t(e),!1}function t(e){var a={ProviderIds:{}};$(".identifyField",e).each(function(){var e=this.value;e&&("number"==this.type&&(e=parseInt(e)),a[this.getAttribute("data-lookup")]=e)});var t=!1;return $(".txtLookupId",e).each(function(){var e=this.value;e&&(t=!0),a.ProviderIds[this.getAttribute("data-providerkey")]=e}),t||a.Name?(m.GameSystem&&(a.GameSystem=m.GameSystem),a={SearchInfo:a,IncludeDisabledProviders:!0},Dashboard.showLoadingMsg(),void ApiClient.ajax({type:"POST",url:ApiClient.getUrl("Items/RemoteSearch/"+m.Type),data:JSON.stringify(a),contentType:"application/json",dataType:"json"}).then(function(a){Dashboard.hideLoadingMsg(),i(e,a)})):void Dashboard.alert(Globalize.translate("MessagePleaseEnterNameOrId"))}function i(e,a){$(".popupIdentifyForm",e).hide(),$(".identificationSearchResults",e).show(),$(".identifyOptionsForm",e).hide(),$(".btnIdentifyBack",e).show();for(var t="",i=0,o=a.length;o>i;i++){var d=a[i];t+=n(d,i)}var s=$(".identificationSearchResultList",e).html(t).trigger("create");$(".searchImage",s).on("click",function(){var t=parseInt(this.getAttribute("data-index")),i=a[t];r(e,i)})}function r(e,a){$(".popupIdentifyForm",e).hide(),$(".identificationSearchResults",e).hide(),$(".identifyOptionsForm",e).show(),$(".btnIdentifyBack",e).show(),$("#chkIdentifyReplaceImages",e).checked(!0),v=a;var t=[];t.push(a.Name),a.ProductionYear&&t.push(a.ProductionYear),a.GameSystem&&t.push(a.GameSystem);var i=t.join("<br/>");if(a.ImageUrl){var r=o(a.ImageUrl,a.SearchProviderName);i='<img src="'+r+'" style="max-height:160px;" /><br/>'+i}$(".selectedSearchResult",e).html(i)}function n(e,a){var t="",i="card";if(i+="Episode"==m.Type?" backdropCard":"MusicAlbum"==m.Type||"MusicArtist"==m.Type?" squareCard":" portraitCard",t+='<div class="'+i+'">',t+='<div class="cardBox">',t+='<div class="cardScalable">',t+='<div class="cardPadder"></div>',t+='<a class="cardContent searchImage" href="#" data-index="'+a+'">',e.ImageUrl){var r=o(e.ImageUrl,e.SearchProviderName);t+='<div class="cardImage" style="background-image:url(\''+r+"');\"></div>"}else t+='<div class="cardImage iconCardImage"><iron-icon icon="search"></iron-icon></div>';return t+="</a>",t+="</div>",t+='<div class="cardFooter outerCardFooter">',t+='<div class="cardText cardTextCentered">'+e.Name+"</div>",t+='<div class="cardText cardTextCentered">',t+=e.ProductionYear||"&nbsp;",t+="</div>",e.GameSystem&&(t+='<div class="cardText cardTextCentered">',t+=e.GameSystem,t+="</div>"),t+="</div>",t+="</div>",t+="</div>"}function o(e,a){return ApiClient.getUrl("Items/RemoteSearch/Image",{imageUrl:e,ProviderName:a})}function d(){var e=$(this).parents(".editorContent");return s(e),!1}function s(a){Dashboard.showLoadingMsg();var t={ReplaceAllImages:$("#chkIdentifyReplaceImages",a).checked()};ApiClient.ajax({type:"POST",url:ApiClient.getUrl("Items/RemoteSearch/Apply/"+m.Id,t),data:JSON.stringify(v),contentType:"application/json"}).then(function(){f=!0,Dashboard.hideLoadingMsg(),e.close(document.querySelector(".identifyDialog"))},function(){Dashboard.hideLoadingMsg(),e.close(document.querySelector(".identifyDialog"))})}function l(e){$(".popupIdentifyForm",e).off("submit",a).on("submit",a),$(".identifyOptionsForm",e).off("submit",d).on("submit",d)}function c(e,a){ApiClient.getJSON(ApiClient.getUrl("Items/"+a.Id+"/ExternalIdInfos")).then(function(t){for(var i="",r=a.ProviderIds||{},n=0,o=t.length;o>n;n++){var d=t[n],s="txtLookup"+d.Key;i+="<div>";var l=Globalize.translate("LabelDynamicExternalId").replace("{0}",d.Name),c=r[d.Key]||"";i+='<paper-input class="txtLookupId" value="'+c+'" data-providerkey="'+d.Key+'" id="'+s+'" label="'+l+'"></paper-input>',i+="</div>"}$("#txtLookupName",e).val(a.Name),"Person"==a.Type||"BoxSet"==a.Type?($(".fldLookupYear",e).hide(),$("#txtLookupYear",e).val("")):($(".fldLookupYear",e).show(),$("#txtLookupYear",e).val(a.ProductionYear)),$(".identifyProviderIds",e).html(i).trigger("create"),$(".identificationHeader",e).html(Globalize.translate("HeaderIdentify"))})}function p(a){Dashboard.showLoadingMsg();var t=new XMLHttpRequest;t.open("GET","components/itemidentifier/itemidentifier.template.html",!0),t.onload=function(){var t=this.response;ApiClient.getItem(Dashboard.getCurrentUserId(),a).then(function(a){m=a;var i=e.createDialog(),r="";r+='<h2 class="dialogHeader">',r+='<paper-fab icon="arrow-back" mini class="btnCloseDialog"></paper-fab>',r+='<div style="display:inline-block;margin-left:.6em;vertical-align:middle;">'+Globalize.translate("HeaderIdentifyItem")+"</div>",r+="</h2>",r+='<div class="editorContent">',r+=Globalize.translateDocument(t),r+="</div>",i.innerHTML=r,document.body.appendChild(i),$(i).on("iron-overlay-closed",u),e.open(i);var n=i.querySelector(".editorContent");l(n),$(".btnCloseDialog",i).on("click",function(){e.close(i)}),i.classList.add("identifyDialog"),c(i,a),Dashboard.hideLoadingMsg()})},t.send()}function u(){$(this).remove(),Dashboard.hideLoadingMsg(),h.resolveWith(null,[f])}var m,h,v,f=!1;window.ItemIdentifier={show:function(e){var a=DeferredBuilder.Deferred();return h=a,f=!1,p(e),a.promise()}}});