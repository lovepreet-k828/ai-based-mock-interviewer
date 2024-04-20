(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7601],{18728:function(e,t,n){Promise.resolve().then(n.bind(n,36392))},36392:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return c}});var r=n(74069),o=n(8266),i=n(15884),l=n(94496);async function a(e){let{req:t,res:n,err:r}=e,a=n&&n.statusCode||e.statusCode;if(a&&a<500||!e.pathname)return Promise.resolve();(0,i.$e)(e=>{e.addEventProcessor(e=>((0,l.EG)(e,{type:"instrument",handled:!1,data:{function:"_error.getInitialProps"}}),e)),t&&e.setSDKProcessingMetadata({request:t}),(0,i.Tb)(r||`_error.js called with falsy error (${r})`)}),await function(e){let t=(0,o.Gd)().getClient();return t?t.flush(2e3):Promise.resolve(!1)}(0)}var s=n(59839),d=n.n(s);let u=e=>(0,r.jsx)(d(),{statusCode:e.statusCode});u.getInitialProps=async e=>(await a(e),d().getInitialProps(e));var c=u},56926:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return u}});let r=n(2688),o=n(74069),i=r._(n(30247)),l=r._(n(34806)),a={400:"Bad Request",404:"This page could not be found",405:"Method Not Allowed",500:"Internal Server Error"};function s(e){let{res:t,err:n}=e;return{statusCode:t&&t.statusCode?t.statusCode:n?n.statusCode:404}}let d={error:{fontFamily:'system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',height:"100vh",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"},desc:{lineHeight:"48px"},h1:{display:"inline-block",margin:"0 20px 0 0",paddingRight:23,fontSize:24,fontWeight:500,verticalAlign:"top"},h2:{fontSize:14,fontWeight:400,lineHeight:"28px"},wrap:{display:"inline-block"}};class u extends i.default.Component{render(){let{statusCode:e,withDarkMode:t=!0}=this.props,n=this.props.title||a[e]||"An unexpected error has occurred";return(0,o.jsxs)("div",{style:d.error,children:[(0,o.jsx)(l.default,{children:(0,o.jsx)("title",{children:e?e+": "+n:"Application error: a client-side exception has occurred"})}),(0,o.jsxs)("div",{style:d.desc,children:[(0,o.jsx)("style",{dangerouslySetInnerHTML:{__html:"body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}"+(t?"@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}":"")}}),e?(0,o.jsx)("h1",{className:"next-error-h1",style:d.h1,children:e}):null,(0,o.jsx)("div",{style:d.wrap,children:(0,o.jsxs)("h2",{style:d.h2,children:[this.props.title||e?n:(0,o.jsx)(o.Fragment,{children:"Application error: a client-side exception has occurred (see the browser console for more information)"}),"."]})})]})]})}}u.displayName="ErrorPage",u.getInitialProps=s,u.origGetInitialProps=s,("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},8878:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"AmpStateContext",{enumerable:!0,get:function(){return r}});let r=n(2688)._(n(30247)).default.createContext({})},90592:function(e,t){"use strict";function n(e){let{ampFirst:t=!1,hybrid:n=!1,hasQuery:r=!1}=void 0===e?{}:e;return t||n&&r}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"isInAmpMode",{enumerable:!0,get:function(){return n}})},34806:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var n in t)Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}(t,{defaultHead:function(){return c},default:function(){return y}});let r=n(2688),o=n(68203),i=n(74069),l=o._(n(30247)),a=r._(n(88114)),s=n(8878),d=n(94520),u=n(90592);function c(e){void 0===e&&(e=!1);let t=[(0,i.jsx)("meta",{charSet:"utf-8"})];return e||t.push((0,i.jsx)("meta",{name:"viewport",content:"width=device-width"})),t}function f(e,t){return"string"==typeof t||"number"==typeof t?e:t.type===l.default.Fragment?e.concat(l.default.Children.toArray(t.props.children).reduce((e,t)=>"string"==typeof t||"number"==typeof t?e:e.concat(t),[])):e.concat(t)}n(31510);let p=["name","httpEquiv","charSet","itemProp"];function h(e,t){let{inAmpMode:n}=t;return e.reduce(f,[]).reverse().concat(c(n).reverse()).filter(function(){let e=new Set,t=new Set,n=new Set,r={};return o=>{let i=!0,l=!1;if(o.key&&"number"!=typeof o.key&&o.key.indexOf("$")>0){l=!0;let t=o.key.slice(o.key.indexOf("$")+1);e.has(t)?i=!1:e.add(t)}switch(o.type){case"title":case"base":t.has(o.type)?i=!1:t.add(o.type);break;case"meta":for(let e=0,t=p.length;e<t;e++){let t=p[e];if(o.props.hasOwnProperty(t)){if("charSet"===t)n.has(t)?i=!1:n.add(t);else{let e=o.props[t],n=r[t]||new Set;("name"!==t||!l)&&n.has(e)?i=!1:(n.add(e),r[t]=n)}}}}return i}}()).reverse().map((e,t)=>{let r=e.key||t;if(!n&&"link"===e.type&&e.props.href&&["https://fonts.googleapis.com/css","https://use.typekit.net/"].some(t=>e.props.href.startsWith(t))){let t={...e.props||{}};return t["data-href"]=t.href,t.href=void 0,t["data-optimized-fonts"]=!0,l.default.cloneElement(e,t)}return l.default.cloneElement(e,{key:r})})}let y=function(e){let{children:t}=e,n=(0,l.useContext)(s.AmpStateContext),r=(0,l.useContext)(d.HeadManagerContext);return(0,i.jsx)(a.default,{reduceComponentsToState:h,headManager:r,inAmpMode:(0,u.isInAmpMode)(n),children:t})};("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},88114:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return a}});let r=n(30247),o="undefined"==typeof window,i=o?()=>{}:r.useLayoutEffect,l=o?()=>{}:r.useEffect;function a(e){let{headManager:t,reduceComponentsToState:n}=e;function a(){if(t&&t.mountedInstances){let o=r.Children.toArray(Array.from(t.mountedInstances).filter(Boolean));t.updateHead(n(o,e))}}if(o){var s;null==t||null==(s=t.mountedInstances)||s.add(e.children),a()}return i(()=>{var n;return null==t||null==(n=t.mountedInstances)||n.add(e.children),()=>{var n;null==t||null==(n=t.mountedInstances)||n.delete(e.children)}}),i(()=>(t&&(t._pendingUpdate=a),()=>{t&&(t._pendingUpdate=a)})),l(()=>(t&&t._pendingUpdate&&(t._pendingUpdate(),t._pendingUpdate=null),()=>{t&&t._pendingUpdate&&(t._pendingUpdate(),t._pendingUpdate=null)})),null}},59839:function(e,t,n){e.exports=n(56926)}},function(e){e.O(0,[715,6538,143,1744],function(){return e(e.s=18728)}),_N_E=e.O()}]);