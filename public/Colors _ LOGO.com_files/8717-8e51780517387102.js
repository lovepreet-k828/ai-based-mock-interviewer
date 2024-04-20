"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8717],{93454:function(t,e,n){n.d(e,{M8:function(){return c},hP:function(){return s},n5:function(){return l}});var o,r,i=n(68806),u=n(89056);(o=r||(r={})).AccessToken="access_token",o.RefreshToken="refresh_token",o.IDToken="id_token",o.ClientId="client_id",o[o.DomainInfo=u.iZ]="DomainInfo";let a=()=>!0,c=t=>{a()&&(0,i.Eo)("access_token",t)},s=()=>a()?(0,i.u9)("access_token"):null,l=()=>{let t=s();if(t){let e=JSON.parse(window.atob(t.split(".")[1]));return e.sub.startsWith("user_")?e.sub:"user_".concat(e.sub)}return null}},89056:function(t,e,n){n.d(e,{AI:function(){return E},C0:function(){return I},F2:function(){return h},Is:function(){return u},J$:function(){return s},JD:function(){return f},MI:function(){return o},OS:function(){return b},Px:function(){return i},Qw:function(){return a},Sl:function(){return S},V3:function(){return p},bF:function(){return L},dq:function(){return l},eD:function(){return d},f5:function(){return c},hE:function(){return T},iZ:function(){return _},lU:function(){return g},oY:function(){return r},ph:function(){return y},q9:function(){return k},qE:function(){return v},qY:function(){return m}});let o="logo",r="currency",i="language",u="country",a="logo-editor",c="selected-domains-lsk",s="domain-search-term-lsk",l="domain-bundle-lsk",d="hide-domain-banner-lsk",f="has-shown-domain-banner-lsk",g="emailSignatureId",v="edit",p="logoId",h="templateId",m="tutorial",y="ldid",S="dev_mode",L="coupon",b="checkout_completed",k="checkout_completed_has_run",_="domain-registration-info",T="website-builder-flow",E="showPromptWhatsNext",I="businessEmailUpsell"},59307:function(t,e,n){n.d(e,{j:function(){return o}});let o="LIST"},68806:function(t,e,n){n.d(e,{E9:function(){return a},Eo:function(){return i},to:function(){return u},u9:function(){return r}});let o=()=>!0,r=t=>{var e;return t&&o()?null===(e=localStorage)||void 0===e?void 0:e.getItem(t):null},i=(t,e)=>{var n;t&&e&&o()&&(null===(n=localStorage)||void 0===n||n.setItem(t,e))},u=t=>{var e;return t&&o()?null===(e=localStorage)||void 0===e?void 0:e.removeItem(t):null},a=t=>{let e=Object.keys(localStorage);for(let n=0;n<e.length;n++){let o=e[n];t.includes(o)||localStorage.removeItem(o)}}},63336:function(t,e,n){n.d(e,{Rp:function(){return c},hi:function(){return l},pJ:function(){return s}});var o=n(84901),r=n(41544),i=n(93454);let u=(0,o.ni)({baseUrl:"https://api.logo.com",prepareHeaders:t=>{let e=(0,i.hP)();if(e)return t.set("Authorization","Bearer ".concat(e)),t}}),a=(0,o.XD)(u,{maxRetries:0}),c=t=>"object"==typeof t&&!!t.status&&!!t.data,s=["EmailSignatures","Users","Logos","LogoFavourites","DataContainers","BrandInformation","Sites","Pages","Emails","EcommerceSites","EcommerceSiteLinks","PaymentMethods","Uploads","Orders","Subscriptions","Invoices","Catalogs","Enterprises","Domains","SetupIntent","Subscriptions","Fonts","Keywords","RedeemableTrials"],l=(0,r.LC)({reducerPath:"splitApi",baseQuery:a,tagTypes:s,endpoints:()=>({})})},38717:function(t,e,n){n.d(e,{C:function(){return c},FY:function(){return l},Gz:function(){return a},IA:function(){return v},Jl:function(){return u},_O:function(){return h},gN:function(){return g},lM:function(){return d},ns:function(){return f},oy:function(){return p},xt:function(){return s}});var o=n(63336),r=n(59307),i=n(79164);let{useListLogosQuery:u,useLazyListLogosQuery:a,useGetLogoQuery:c,useLazyGetLogoQuery:s,useGetDataContainerQuery:l,useArchiveLogoMutation:d,useCreateSavedLogoMutation:f,useUpdateSavedLogoMutation:g,useListFavouritedLogosQuery:v,useCreateFavouritedLogoMutation:p,useDeleteFavouritedLogoMutation:h}=o.hi.injectEndpoints({endpoints:t=>({listLogos:t.query({query:t=>{let{userId:e,order:n="desc",limit:o=50,cursor:r}=t,u=n||o||r?(0,i.VJ)({order:n,limit:o,cursor:r}):"";return"api/v2/logos/saved/".concat(e,"/all").concat(u&&"?").concat(u)},providesTags:()=>[{type:"Logos",id:r.j}]}),getLogo:t.query({query:t=>{let{logoId:e}=t;return"api/v2/logos/".concat(e)},providesTags:(t,e,n)=>{let{logoId:o}=n;return[{type:"Logos",id:o}]}}),archiveLogo:t.mutation({query:t=>{let{logoId:e}=t;return{url:"api/v2/logos/saved/".concat(e,"/archive"),method:"POST"}},invalidatesTags:(t,e,n)=>{let{logoId:o}=n;return[{type:"Logos",id:o},{type:"Logos",id:r.j}]}}),getDataContainer:t.query({query:t=>"/api/v3/stitch/projects/data-container?logo_package=".concat(t),providesTags:(t,e,n)=>[{type:"DataContainers",id:n}]}),createSavedLogo:t.mutation({query:t=>(t.eid="eid_placeholder",{url:"/api/v2/logos/saved",method:"POST",body:t}),invalidatesTags:[{type:"Logos",id:r.j}]}),updateSavedLogo:t.mutation({query:t=>(t.eid="eid_placeholder",{url:"/api/v2/logos/saved/".concat(t.id),method:"PATCH",body:t}),invalidatesTags:(t,e,n)=>[{type:"Logos",id:r.j},{type:"Logos",id:n.id}]}),listFavouritedLogos:t.query({query:()=>({url:"/api/v2/logos/favourites"}),providesTags:()=>[{type:"LogoFavourites",id:r.j}]}),createFavouritedLogo:t.mutation({query:t=>({url:"/api/v2/logos/favourites",method:"POST",body:t}),invalidatesTags:()=>[{type:"LogoFavourites",id:r.j}]}),deleteFavouritedLogo:t.mutation({query:t=>({url:"/api/v2/logos/favourites/".concat(t),method:"DELETE"}),invalidatesTags:(t,e,n)=>[{type:"LogoFavourites",id:r.j},{type:"LogoFavourites",id:n}]})})})},79164:function(t,e,n){n.d(e,{QU:function(){return c},Sr:function(){return a},VJ:function(){return o},aR:function(){return u}});let o=t=>{let{cursor:e,...n}=Object.fromEntries(Object.entries(t).filter(t=>{let[e,n]=t;return void 0!==n&&""!==n})),o=e&&"object"==typeof e,r={...n,...o?{cursor:JSON.stringify(e)}:{}};return new URLSearchParams(r).toString()},r=function(t,e){let n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],o=new URLSearchParams(e?Array.from(e.entries()).filter(e=>!n||void 0===t[e[0]]):void 0);return Object.keys(t).forEach(e=>{var n;e in t&&(null===(n=t[e])||void 0===n?void 0:n.length)>0&&o.append(e,t[e])}),o},i=(t,e)=>{let n=new URLSearchParams(e?Array.from(e.entries()):void 0);for(let e of t)n.delete(e);return n},u=function(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],n=arguments.length>2?arguments[2]:void 0,o=i(e,n);return(null==o?void 0:o.size)>0?"".concat(t,"?").concat(null==o?void 0:o.toString()):t},a=function(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2?arguments[2]:void 0,o=arguments.length>3&&void 0!==arguments[3]&&arguments[3],i=r(e,n,o);return(null==i?void 0:i.size)>0?"".concat(t,"?").concat(null==i?void 0:i.toString()):t},c=function(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],o=arguments.length>3?arguments[3]:void 0,u=arguments.length>4&&void 0!==arguments[4]&&arguments[4],a=o;return(null==(a=i(n,a=r(e,o,u)))?void 0:a.size)>0?"".concat(t,"?").concat(null==a?void 0:a.toString()):t}}}]);