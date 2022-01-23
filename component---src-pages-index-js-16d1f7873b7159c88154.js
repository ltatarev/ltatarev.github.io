/*! For license information please see component---src-pages-index-js-16d1f7873b7159c88154.js.LICENSE.txt */
(self.webpackChunkltatarev_github_io=self.webpackChunkltatarev_github_io||[]).push([[678],{5900:function(e,t){var r;!function(){"use strict";var n={}.hasOwnProperty;function i(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var a=typeof r;if("string"===a||"number"===a)e.push(r);else if(Array.isArray(r)){if(r.length){var o=i.apply(null,r);o&&e.push(o)}}else if("object"===a)if(r.toString===Object.prototype.toString)for(var c in r)n.call(r,c)&&r[c]&&e.push(c);else e.push(r.toString())}}return e.join(" ")}e.exports?(i.default=i,e.exports=i):void 0===(r=function(){return i}.apply(t,[]))||(e.exports=r)}()},2993:function(e){var t="undefined"!=typeof Element,r="function"==typeof Map,n="function"==typeof Set,i="function"==typeof ArrayBuffer&&!!ArrayBuffer.isView;function a(e,o){if(e===o)return!0;if(e&&o&&"object"==typeof e&&"object"==typeof o){if(e.constructor!==o.constructor)return!1;var c,l,s,u;if(Array.isArray(e)){if((c=e.length)!=o.length)return!1;for(l=c;0!=l--;)if(!a(e[l],o[l]))return!1;return!0}if(r&&e instanceof Map&&o instanceof Map){if(e.size!==o.size)return!1;for(u=e.entries();!(l=u.next()).done;)if(!o.has(l.value[0]))return!1;for(u=e.entries();!(l=u.next()).done;)if(!a(l.value[1],o.get(l.value[0])))return!1;return!0}if(n&&e instanceof Set&&o instanceof Set){if(e.size!==o.size)return!1;for(u=e.entries();!(l=u.next()).done;)if(!o.has(l.value[0]))return!1;return!0}if(i&&ArrayBuffer.isView(e)&&ArrayBuffer.isView(o)){if((c=e.length)!=o.length)return!1;for(l=c;0!=l--;)if(e[l]!==o[l])return!1;return!0}if(e.constructor===RegExp)return e.source===o.source&&e.flags===o.flags;if(e.valueOf!==Object.prototype.valueOf)return e.valueOf()===o.valueOf();if(e.toString!==Object.prototype.toString)return e.toString()===o.toString();if((c=(s=Object.keys(e)).length)!==Object.keys(o).length)return!1;for(l=c;0!=l--;)if(!Object.prototype.hasOwnProperty.call(o,s[l]))return!1;if(t&&e instanceof Element)return!1;for(l=c;0!=l--;)if(("_owner"!==s[l]&&"__v"!==s[l]&&"__o"!==s[l]||!e.$$typeof)&&!a(e[s[l]],o[s[l]]))return!1;return!0}return e!=e&&o!=o}e.exports=function(e,t){try{return a(e,t)}catch(r){if((r.message||"").match(/stack|recursion/i))return console.warn("react-fast-compare cannot handle circular refs"),!1;throw r}}},4839:function(e,t,r){"use strict";var n,i=r(7294),a=(n=i)&&"object"==typeof n&&"default"in n?n.default:n;function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var c=!("undefined"==typeof window||!window.document||!window.document.createElement);e.exports=function(e,t,r){if("function"!=typeof e)throw new Error("Expected reducePropsToState to be a function.");if("function"!=typeof t)throw new Error("Expected handleStateChangeOnClient to be a function.");if(void 0!==r&&"function"!=typeof r)throw new Error("Expected mapStateOnServer to either be undefined or a function.");return function(n){if("function"!=typeof n)throw new Error("Expected WrappedComponent to be a React component.");var l,s=[];function u(){l=e(s.map((function(e){return e.props}))),p.canUseDOM?t(l):r&&(l=r(l))}var p=function(e){var t,r;function i(){return e.apply(this,arguments)||this}r=e,(t=i).prototype=Object.create(r.prototype),t.prototype.constructor=t,t.__proto__=r,i.peek=function(){return l},i.rewind=function(){if(i.canUseDOM)throw new Error("You may only call rewind() on the server. Call peek() to read the current state.");var e=l;return l=void 0,s=[],e};var o=i.prototype;return o.UNSAFE_componentWillMount=function(){s.push(this),u()},o.componentDidUpdate=function(){u()},o.componentWillUnmount=function(){var e=s.indexOf(this);s.splice(e,1),u()},o.render=function(){return a.createElement(n,this.props)},i}(i.PureComponent);return o(p,"displayName","SideEffect("+function(e){return e.displayName||e.name||"Component"}(n)+")"),o(p,"canUseDOM",c),p}}},3833:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return Ue}});var n,i,a,o,c=r(7294),l=r(5697),s=r.n(l),u=r(4839),p=r.n(u),f=r(2993),d=r.n(f),m=r(6494),h=r.n(m),y="bodyAttributes",b="htmlAttributes",g="titleAttributes",v={BASE:"base",BODY:"body",HEAD:"head",HTML:"html",LINK:"link",META:"meta",NOSCRIPT:"noscript",SCRIPT:"script",STYLE:"style",TITLE:"title"},A=(Object.keys(v).map((function(e){return v[e]})),"charset"),w="cssText",E="href",T="http-equiv",S="innerHTML",C="itemprop",O="name",j="property",N="rel",k="src",x="target",P={accesskey:"accessKey",charset:"charSet",class:"className",contenteditable:"contentEditable",contextmenu:"contextMenu","http-equiv":"httpEquiv",itemprop:"itemProp",tabindex:"tabIndex"},I="defaultTitle",L="defer",R="encodeSpecialCharacters",_="onChangeClientState",M="titleTemplate",U=Object.keys(P).reduce((function(e,t){return e[P[t]]=t,e}),{}),B=[v.NOSCRIPT,v.SCRIPT,v.STYLE],D="data-react-helmet",F="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Y=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},W=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),H=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},K=function(e,t){var r={};for(var n in e)t.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(e,n)&&(r[n]=e[n]);return r},z=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t},X=function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];return!1===t?String(e):String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")},q=function(e){var t=J(e,v.TITLE),r=J(e,M);if(r&&t)return r.replace(/%s/g,(function(){return Array.isArray(t)?t.join(""):t}));var n=J(e,I);return t||n||void 0},G=function(e){return J(e,_)||function(){}},V=function(e,t){return t.filter((function(t){return void 0!==t[e]})).map((function(t){return t[e]})).reduce((function(e,t){return H({},e,t)}),{})},Z=function(e,t){return t.filter((function(e){return void 0!==e[v.BASE]})).map((function(e){return e[v.BASE]})).reverse().reduce((function(t,r){if(!t.length)for(var n=Object.keys(r),i=0;i<n.length;i++){var a=n[i].toLowerCase();if(-1!==e.indexOf(a)&&r[a])return t.concat(r)}return t}),[])},Q=function(e,t,r){var n={};return r.filter((function(t){return!!Array.isArray(t[e])||(void 0!==t[e]&&ne("Helmet: "+e+' should be of type "Array". Instead found type "'+F(t[e])+'"'),!1)})).map((function(t){return t[e]})).reverse().reduce((function(e,r){var i={};r.filter((function(e){for(var r=void 0,a=Object.keys(e),o=0;o<a.length;o++){var c=a[o],l=c.toLowerCase();-1===t.indexOf(l)||r===N&&"canonical"===e[r].toLowerCase()||l===N&&"stylesheet"===e[l].toLowerCase()||(r=l),-1===t.indexOf(c)||c!==S&&c!==w&&c!==C||(r=c)}if(!r||!e[r])return!1;var s=e[r].toLowerCase();return n[r]||(n[r]={}),i[r]||(i[r]={}),!n[r][s]&&(i[r][s]=!0,!0)})).reverse().forEach((function(t){return e.push(t)}));for(var a=Object.keys(i),o=0;o<a.length;o++){var c=a[o],l=h()({},n[c],i[c]);n[c]=l}return e}),[]).reverse()},J=function(e,t){for(var r=e.length-1;r>=0;r--){var n=e[r];if(n.hasOwnProperty(t))return n[t]}return null},$=(n=Date.now(),function(e){var t=Date.now();t-n>16?(n=t,e(t)):setTimeout((function(){$(e)}),0)}),ee=function(e){return clearTimeout(e)},te="undefined"!=typeof window?window.requestAnimationFrame&&window.requestAnimationFrame.bind(window)||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||$:r.g.requestAnimationFrame||$,re="undefined"!=typeof window?window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||ee:r.g.cancelAnimationFrame||ee,ne=function(e){return console&&"function"==typeof console.warn&&console.warn(e)},ie=null,ae=function(e,t){var r=e.baseTag,n=e.bodyAttributes,i=e.htmlAttributes,a=e.linkTags,o=e.metaTags,c=e.noscriptTags,l=e.onChangeClientState,s=e.scriptTags,u=e.styleTags,p=e.title,f=e.titleAttributes;le(v.BODY,n),le(v.HTML,i),ce(p,f);var d={baseTag:se(v.BASE,r),linkTags:se(v.LINK,a),metaTags:se(v.META,o),noscriptTags:se(v.NOSCRIPT,c),scriptTags:se(v.SCRIPT,s),styleTags:se(v.STYLE,u)},m={},h={};Object.keys(d).forEach((function(e){var t=d[e],r=t.newTags,n=t.oldTags;r.length&&(m[e]=r),n.length&&(h[e]=d[e].oldTags)})),t&&t(),l(e,m,h)},oe=function(e){return Array.isArray(e)?e.join(""):e},ce=function(e,t){void 0!==e&&document.title!==e&&(document.title=oe(e)),le(v.TITLE,t)},le=function(e,t){var r=document.getElementsByTagName(e)[0];if(r){for(var n=r.getAttribute(D),i=n?n.split(","):[],a=[].concat(i),o=Object.keys(t),c=0;c<o.length;c++){var l=o[c],s=t[l]||"";r.getAttribute(l)!==s&&r.setAttribute(l,s),-1===i.indexOf(l)&&i.push(l);var u=a.indexOf(l);-1!==u&&a.splice(u,1)}for(var p=a.length-1;p>=0;p--)r.removeAttribute(a[p]);i.length===a.length?r.removeAttribute(D):r.getAttribute(D)!==o.join(",")&&r.setAttribute(D,o.join(","))}},se=function(e,t){var r=document.head||document.querySelector(v.HEAD),n=r.querySelectorAll(e+"["+"data-react-helmet]"),i=Array.prototype.slice.call(n),a=[],o=void 0;return t&&t.length&&t.forEach((function(t){var r=document.createElement(e);for(var n in t)if(t.hasOwnProperty(n))if(n===S)r.innerHTML=t.innerHTML;else if(n===w)r.styleSheet?r.styleSheet.cssText=t.cssText:r.appendChild(document.createTextNode(t.cssText));else{var c=void 0===t[n]?"":t[n];r.setAttribute(n,c)}r.setAttribute(D,"true"),i.some((function(e,t){return o=t,r.isEqualNode(e)}))?i.splice(o,1):a.push(r)})),i.forEach((function(e){return e.parentNode.removeChild(e)})),a.forEach((function(e){return r.appendChild(e)})),{oldTags:i,newTags:a}},ue=function(e){return Object.keys(e).reduce((function(t,r){var n=void 0!==e[r]?r+'="'+e[r]+'"':""+r;return t?t+" "+n:n}),"")},pe=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object.keys(e).reduce((function(t,r){return t[P[r]||r]=e[r],t}),t)},fe=function(e,t,r){switch(e){case v.TITLE:return{toComponent:function(){return e=t.title,r=t.titleAttributes,(n={key:e})[D]=!0,i=pe(r,n),[c.createElement(v.TITLE,i,e)];var e,r,n,i},toString:function(){return function(e,t,r,n){var i=ue(r),a=oe(t);return i?"<"+e+' data-react-helmet="true" '+i+">"+X(a,n)+"</"+e+">":"<"+e+' data-react-helmet="true">'+X(a,n)+"</"+e+">"}(e,t.title,t.titleAttributes,r)}};case y:case b:return{toComponent:function(){return pe(t)},toString:function(){return ue(t)}};default:return{toComponent:function(){return function(e,t){return t.map((function(t,r){var n,i=((n={key:r})[D]=!0,n);return Object.keys(t).forEach((function(e){var r=P[e]||e;if(r===S||r===w){var n=t.innerHTML||t.cssText;i.dangerouslySetInnerHTML={__html:n}}else i[r]=t[e]})),c.createElement(e,i)}))}(e,t)},toString:function(){return function(e,t,r){return t.reduce((function(t,n){var i=Object.keys(n).filter((function(e){return!(e===S||e===w)})).reduce((function(e,t){var i=void 0===n[t]?t:t+'="'+X(n[t],r)+'"';return e?e+" "+i:i}),""),a=n.innerHTML||n.cssText||"",o=-1===B.indexOf(e);return t+"<"+e+' data-react-helmet="true" '+i+(o?"/>":">"+a+"</"+e+">")}),"")}(e,t,r)}}}},de=function(e){var t=e.baseTag,r=e.bodyAttributes,n=e.encode,i=e.htmlAttributes,a=e.linkTags,o=e.metaTags,c=e.noscriptTags,l=e.scriptTags,s=e.styleTags,u=e.title,p=void 0===u?"":u,f=e.titleAttributes;return{base:fe(v.BASE,t,n),bodyAttributes:fe(y,r,n),htmlAttributes:fe(b,i,n),link:fe(v.LINK,a,n),meta:fe(v.META,o,n),noscript:fe(v.NOSCRIPT,c,n),script:fe(v.SCRIPT,l,n),style:fe(v.STYLE,s,n),title:fe(v.TITLE,{title:p,titleAttributes:f},n)}},me=p()((function(e){return{baseTag:Z([E,x],e),bodyAttributes:V(y,e),defer:J(e,L),encode:J(e,R),htmlAttributes:V(b,e),linkTags:Q(v.LINK,[N,E],e),metaTags:Q(v.META,[O,A,T,j,C],e),noscriptTags:Q(v.NOSCRIPT,[S],e),onChangeClientState:G(e),scriptTags:Q(v.SCRIPT,[k,S],e),styleTags:Q(v.STYLE,[w],e),title:q(e),titleAttributes:V(g,e)}}),(function(e){ie&&re(ie),e.defer?ie=te((function(){ae(e,(function(){ie=null}))})):(ae(e),ie=null)}),de)((function(){return null})),he=(i=me,o=a=function(e){function t(){return Y(this,t),z(this,e.apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),t.prototype.shouldComponentUpdate=function(e){return!d()(this.props,e)},t.prototype.mapNestedChildrenToProps=function(e,t){if(!t)return null;switch(e.type){case v.SCRIPT:case v.NOSCRIPT:return{innerHTML:t};case v.STYLE:return{cssText:t}}throw new Error("<"+e.type+" /> elements are self-closing and can not contain children. Refer to our API for more information.")},t.prototype.flattenArrayTypeChildren=function(e){var t,r=e.child,n=e.arrayTypeChildren,i=e.newChildProps,a=e.nestedChildren;return H({},n,((t={})[r.type]=[].concat(n[r.type]||[],[H({},i,this.mapNestedChildrenToProps(r,a))]),t))},t.prototype.mapObjectTypeChildren=function(e){var t,r,n=e.child,i=e.newProps,a=e.newChildProps,o=e.nestedChildren;switch(n.type){case v.TITLE:return H({},i,((t={})[n.type]=o,t.titleAttributes=H({},a),t));case v.BODY:return H({},i,{bodyAttributes:H({},a)});case v.HTML:return H({},i,{htmlAttributes:H({},a)})}return H({},i,((r={})[n.type]=H({},a),r))},t.prototype.mapArrayTypeChildrenToProps=function(e,t){var r=H({},t);return Object.keys(e).forEach((function(t){var n;r=H({},r,((n={})[t]=e[t],n))})),r},t.prototype.warnOnInvalidChildren=function(e,t){return!0},t.prototype.mapChildrenToProps=function(e,t){var r=this,n={};return c.Children.forEach(e,(function(e){if(e&&e.props){var i=e.props,a=i.children,o=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object.keys(e).reduce((function(t,r){return t[U[r]||r]=e[r],t}),t)}(K(i,["children"]));switch(r.warnOnInvalidChildren(e,a),e.type){case v.LINK:case v.META:case v.NOSCRIPT:case v.SCRIPT:case v.STYLE:n=r.flattenArrayTypeChildren({child:e,arrayTypeChildren:n,newChildProps:o,nestedChildren:a});break;default:t=r.mapObjectTypeChildren({child:e,newProps:t,newChildProps:o,nestedChildren:a})}}})),t=this.mapArrayTypeChildrenToProps(n,t)},t.prototype.render=function(){var e=this.props,t=e.children,r=K(e,["children"]),n=H({},r);return t&&(n=this.mapChildrenToProps(t,n)),c.createElement(i,n)},W(t,null,[{key:"canUseDOM",set:function(e){i.canUseDOM=e}}]),t}(c.Component),a.propTypes={base:s().object,bodyAttributes:s().object,children:s().oneOfType([s().arrayOf(s().node),s().node]),defaultTitle:s().string,defer:s().bool,encodeSpecialCharacters:s().bool,htmlAttributes:s().object,link:s().arrayOf(s().object),meta:s().arrayOf(s().object),noscript:s().arrayOf(s().object),onChangeClientState:s().func,script:s().arrayOf(s().object),style:s().arrayOf(s().object),title:s().string,titleAttributes:s().object,titleTemplate:s().string},a.defaultProps={defer:!0,encodeSpecialCharacters:!0},a.peek=i.peek,a.rewind=function(){var e=i.rewind();return e||(e=de({baseTag:[],bodyAttributes:{},encodeSpecialCharacters:!0,htmlAttributes:{},linkTags:[],metaTags:[],noscriptTags:[],scriptTags:[],styleTags:[],title:"",titleAttributes:{}})),e},o);he.renderStatic=he.rewind;function ye(e){var t=e.color,r=e.title,n=(0,c.useMemo)((function(){return{color:t}}),[t]),i=(0,c.useMemo)((function(){return"("+r+")"}),[r]);return c.createElement("p",{className:"section-title__title",style:n},i)}ye.defaultProps={color:"#CA718D"};var be=c.memo(ye),ge=[{id:1,year:"2021-",title:"Shoutem",description:"React Native developer"},{id:2,year:"2019 - 2021",title:"Five Agency",description:["React Native developer"],details:[c.createElement("b",{key:1},"Plato Money - mobile wallet app"),"React Native, Redux, backend conforming to JSON:API spec",c.createElement("b",{key:2},"Mint House - apartment booking app"),"React Native, Redux, Jumio (identity verification), \n       Stripe (payments), Intercom (in-app messaging)",c.createElement("b",{key:3},"57hours - mountain guide booking app"),"React Native, Redux, backend conforming to \n       JSON:API spec, backend in NodeJS"]},{id:3,year:"Aug 2019 - Sep 2019",title:"Five Agency",description:"Student intern - React Native Bootcamp"},{id:4,year:"2014 - 2018",title:"Department of Mathematics",description:["J. J. Strossmayer University of Osijek","Undergraduate university study programme in mathematics"]}];function ve(e){var t=e.className,r=e.text;return Array.isArray(r)?r.map((function(e){return c.createElement("div",{key:e,className:t},e,c.createElement("br",null))})):c.createElement("div",{className:t},r," ")}ve.defaultProps={className:null};var Ae=c.memo(ve);function we(e){var t=e.title,r=e.year,n=e.description,i=e.details;return c.createElement("div",null,c.createElement("div",{className:"timestamp"},r),c.createElement("div",{className:"timeline__content-container "},c.createElement("div",{className:"timeline__main-container"},c.createElement(Ae,{className:"item-title",text:t}),!!n&&c.createElement(Ae,{className:"item-description",text:n})),c.createElement("div",{className:"timeline__details-container"},!!i&&c.createElement(Ae,{className:"item-detailed-description",text:i}))))}we.defaultProps={description:"",details:""};var Ee=c.memo(we);function Te(){return c.createElement("div",{className:"rb-container"},c.createElement("ul",{className:"rb"},ge.map((function(e){return c.createElement("li",{key:e.id,className:"rb-item"},c.createElement(Ee,{description:e.description,details:e.details,title:e.title,year:e.year}))}))))}var Se=c.memo(Te);function Ce(){return c.createElement("div",{className:"experience__container"},c.createElement(be,{color:"#AE7DB8",title:"experience"}),c.createElement(Se,null))}var Oe=c.memo(Ce),je=r(6125);function Ne(){return c.createElement("div",{className:"header__header-container"},c.createElement(je.S,{alt:"Header",height:200,layout:"constrained",objectFit:"contain",placeholder:"blurred",quality:100,src:"./memoji.png",__imageData:r(9975)}),c.createElement("div",{className:"header__text-container"},c.createElement("h2",{className:"header__title"},"hi, i'm ",c.createElement("p",{className:"header__inline-color"},"lucija"),";"),c.createElement("span",{className:"header__text"},"I'm a software developer based in Croatia. Interested in ",c.createElement("p",{className:"header__text-inline-color"},"full stack development"),",",c.createElement("br",null),c.createElement("p",{className:"header__text-inline-color"},"cross platform mobile development"),", and everything ",c.createElement("p",{className:"header__text-inline-color"},"JavaScript"),".")))}var ke=c.memo(Ne),xe=r(5900),Pe=r.n(xe);function Ie(e){var t=e.backgroundColor,r=e.overlayColor,n=e.imgSrc,i=e.url,a=e.title,o=e.description,l=(0,c.useMemo)((function(){return{backgroundColor:t}}),[t]),s=Pe()({"card__main-container":!0,"card__main-container-pink":"pink"===r,"card__main-container-blue":"blue"===r,"card__main-container-peach":"peach"===r});return c.createElement("div",{className:"card__container"},c.createElement("a",{href:i,rel:"noreferrer",target:"_blank"},c.createElement("div",{className:s,style:l},c.createElement("div",{className:"card__image-box"},c.createElement("img",{alt:"movie",border:"0",src:n})),c.createElement("div",{className:"card__content-box"},c.createElement("h2",null,a),c.createElement("p",null,o)))))}Ie.defaultProps={backgroundColor:null,overlayColor:"purple"};var Le=c.memo(Ie),Re=[{id:1,title:"Moviest",description:"MEAN stack movie app",image:"https://i.ibb.co/HDZQyGT/movie.png",url:"https://github.com/ltatarev/the-moviest",color:"purple"},{id:2,title:"3 day weather",description:"Weather app using OpenWeatherMapAPI",image:"https://i.ibb.co/GP0C0GN/cloudy.png",url:"https://github.com/ltatarev/3-day-weather",color:"pink"},{id:3,title:"React Native to do",description:"Simple to do app",image:"https://i.ibb.co/KWrtPx8/to-do-list.png",url:"https://github.com/ltatarev/react-native-to-do",color:"blue"},{id:4,title:"React Native news",description:"News app using newsapi.org",image:"https://i.ibb.co/1TSY10f/newspaper.png",url:"https://github.com/ltatarev/news-app",color:"peach"},{id:5,title:"Electron to do",description:"Simple desktop to do app",image:"https://i.ibb.co/fxT2nHY/to-do.png",url:"https://github.com/ltatarev/electron-to-do",color:"blue"},{id:6,title:"Personal page",description:"Landing page using GatsbyJS",image:"https://i.ibb.co/t2nQmR7/laptop.png",url:"https://github.com/ltatarev/ltatarev.github.io",color:"purple"}];function _e(){return c.createElement("div",null,c.createElement(be,{color:"#6099C2",title:"projects"}),c.createElement("div",{className:"projects__grid-container"},Re.map((function(e){return c.createElement(Le,{key:e.id,description:e.description,imgSrc:e.image,overlayColor:e.color,title:e.title,url:e.url})}))))}var Me=c.memo(_e);function Ue(){return c.createElement(c.Fragment,null,c.createElement(he,null,c.createElement("meta",{charSet:"utf-8"}),c.createElement("title",null,"lucija tatarević"),c.createElement("link",{href:"https://ltatarev.github.io/",rel:"canonical"})),c.createElement("div",{className:"main-container"},c.createElement(ke,null),c.createElement(Oe,null),c.createElement(Me,null)))}},9975:function(e){"use strict";e.exports=JSON.parse('{"layout":"constrained","placeholder":{"fallback":"data:image/png;base64,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"},"images":{"fallback":{"src":"/static/ddf760d7c82993224826313645e37729/d5c6e/memoji.png","srcSet":"/static/ddf760d7c82993224826313645e37729/a13b7/memoji.png 44w,\\n/static/ddf760d7c82993224826313645e37729/04f0f/memoji.png 87w,\\n/static/ddf760d7c82993224826313645e37729/d5c6e/memoji.png 174w,\\n/static/ddf760d7c82993224826313645e37729/feb55/memoji.png 348w","sizes":"(min-width: 174px) 174px, 100vw"},"sources":[{"srcSet":"/static/ddf760d7c82993224826313645e37729/e2b81/memoji.webp 44w,\\n/static/ddf760d7c82993224826313645e37729/befe5/memoji.webp 87w,\\n/static/ddf760d7c82993224826313645e37729/3c921/memoji.webp 174w,\\n/static/ddf760d7c82993224826313645e37729/7d84a/memoji.webp 348w","type":"image/webp","sizes":"(min-width: 174px) 174px, 100vw"}]},"width":174,"height":200}')}}]);
//# sourceMappingURL=component---src-pages-index-js-16d1f7873b7159c88154.js.map