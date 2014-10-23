(function(){function c(k){var l,j,n,m=document.cookie.split(";");for(l=0;l<m.length;l++){j=m[l].substr(0,m[l].indexOf("="));n=m[l].substr(m[l].indexOf("=")+1);j=j.replace(/^\s+|\s+$/g,"");if(j==k){return unescape(n)}}}function e(i,l,j){var m=new Date();m.setDate(m.getDate()+j);var k=escape(l)+((j==null)?"":"; expires="+m.toUTCString());document.cookie=i+"="+k}function g(j){query_str="";for(var i in j){if(query_str.length>0){query_str+="&"}if(j[i] instanceof Array){query_str+=i+"="+encodeURIComponent(j[i].join(","))}else{query_str+=i+"="+encodeURIComponent(j[i])}}if(query_str.length==0){return query_str}return"?"+query_str}var a={};var f="<geocore-base-url>";var b="<geocore-project-id>";var h=c("accessToken");a.setup=function(j,i){b=j||b;f=i||f};a.request=function(j,i,k,l){i=f+i;$.ajax({url:i,data:k?JSON.stringify(k):null,type:j,dataType:"json",contentType:"application/json; charset=UTF-8",beforeSend:function(m){if(h){m.setRequestHeader("Geocore-Access-Token",h)}},error:function(m,n){return l(n,null)},success:function(m){if(m.error){return l(m.error)}return l(null,m.result)}})};a.login=function(l,j,k){var i="/auth?id="+l+"&password="+j+"&project_id="+b;a.request("GET",i,null,function(n,m){if(n){return k(n,null)}h=m.token;return k(null,h)})};a.logout=function(){e("accessToken","");h=null};a.saveSession=function(){if(!h){return}e("accessToken",h,1)};a.authenticated=function(){if(!h||h==""){return false}return h};a.users={};a.users.list=function(j,i,k){if(arguments.length<3){k=i;i=100}if(arguments.length<2){k=j;j=0}a.request("GET","/users",null,k)};a.users.get=function(j,i){a.request("GET","/users/"+j,null,i)};a.users.update=function(k,i,j){a.request("POST","/users/"+k,i,j)};a.items={};a.items.list=function(j,k){if(arguments.length<2){k=j;j={}}var i="/items"+g(j);a.request("GET",i,null,k)};a.items.get=function(j,i){a.request("GET","/items/"+j,null,i)};a.items.create=function(l,i,m){var k="/items/";if(arguments.length>=3){var j=i.join(",");j=encodeURIComponent(j);k+="?tag_names="+j}else{m=i}a.request("POST",k,l,m)};a.items.update=function(k,i,j){a.request("POST","/items/"+k,i,j)};a.items.remove=function(j,i){a.request("DELETE","/items/"+j,null,i)};a.places={};a.places.list=function(j,k){if(arguments.length<2){k=j;j={}}var i="/places"+g(j);a.request("GET",i,null,k)};a.places.in_rect=function(l,k,n,m,j,o){if(arguments.length<6){o=j;j={}}j.max_lat=l;j.min_lon=k;j.min_lat=n;j.max_lon=m;var i="/places/search/within/rect"+g(j);a.request("GET",i,null,o)};a.places.in_circle=function(n,l,i,k,m){if(arguments.length<5){m=k;k={}}k.lat=n;k.lon=l;k.radius=i;var j="//places/search/within/circle"+g(k);a.request("GET",j,null,m)};a.places.nearest=function(m,k,j,l){if(arguments.length<4){l=j;j={}}j.lat=m;j.lon=k;var i="/places/search/nearest"+g(j);a.request("GET",i,null,l)};a.places.by_name=function(k,j,l){if(arguments.length<3){l=j;j={}}var i="/places/search/name/"+encodeURIComponent(k)+g(j);a.request("GET",i,null,l)};a.places.get=function(j,i){a.request("GET","/places/"+j,null,i)};a.places.update=function(k,i,j){a.request("POST","/places/"+k,i,j)};a.places.remove=function(j,i){a.request("DELETE","/places/"+j,null,i)};a.places.deleteGeometry=function(j,i){a.request("DELETE","/places/"+j+"/geometry",null,i)};a.places.create=function(j,i,m){var l="/places/";if(arguments.length>=3){var k=i.join(",");k=encodeURIComponent(k);l+="?tag_names="+k}else{m=i}a.request("POST",l,j,m)};a.places.getItems=function(j,i){a.request("GET","/places/"+j+"/items",null,i)};a.places.addItem=function(k,i,j){a.request("POST","/places/"+k+"/items",i,j)};a.places.getChildren=function(j,i){a.request("GET","/places/"+j+"/children",null,i)};a.places.getTags=function(k,j){var i="/places/"+k+"/tags";a.request("GET",i,null,j)};a.places.setTags=function(m,i,k,l){if(arguments.length<3){l=k;k=[]}i=i.join(",");i=encodeURIComponent(i);k=k.join(",");k=encodeURIComponent(k);var j="/places/"+m+"/tags?tag_names="+i+"&del_tag_names="+k;a.request("POST",j,null,l)};a.places.delTags=function(l,j,k){if(arguments.length<3){k=j;j=[]}j=j.join(",");j=encodeURIComponent(j);var i="/places/"+l+"/tags?del_tag_names="+j;a.request("POST",i,null,k)};a.timeline={};a.timeline.get=function(n,j,m,i,l){if(j instanceof Date){j=j.getTime()}if(m instanceof Date){m=m.getTime()}var k="?from="+j+"&to="+m+"&resolution="+i;a.request("GET","/users/"+n+"/timeline"+k,null,l)};a.timeline.requestUpdate=function(j,i){a.request("GET","/users/"+j+"/locationlogs/request",null,i)};var d={};a.streams={};a.streams.subscribe=function(j,k){if(typeof(j)==="string"){j={id:j,info:{}}}var i=d[j.id];if(!i){if(!io){return null}i=io.connect("http://api-stream.herokuapp.com");i.on("connect",function(){i.emit("subscribe",j)});d[j.id]=i}i.on("message",k);return i};a.streams.unSubscribe=function(k,j){var i=d[k];if(!i){return}i.close();delete d[k]};a.objs={};a.objs.get=function(j,i){a.request("GET","/objs/"+j,null,i)};a.objs.putcustomData=function(l,i,j,k){a.request("PUT","/objs/"+l+"/customData/"+i+"/"+j,null,k)};a.objs.deletecustomData=function(k,i,j){a.request("DELETE","/objs/"+k+"/customData/"+i,null,j)};a.places.createSimple=function(i,k){var j="/places/";a.request("POST",j,i,k)};window.geocore=a})();