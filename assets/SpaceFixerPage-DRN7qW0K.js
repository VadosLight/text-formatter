import{c as h,j as n,g as $,a as w,s as R,r as F,b as p,m as M,d as i,u as O,e as T,f as H,h as v,i as j,k as V}from"./index-CG_-kNkc.js";import{S as L,B as d,F as W,a as A,T as S}from"./TextField-BE9UxBf_.js";import{P as D}from"./PageWrapper-YUp0P_UT.js";const E=h(n.jsx("path",{d:"M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"}),"CheckBoxOutlineBlank"),N=h(n.jsx("path",{d:"M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"}),"CheckBox"),U=h(n.jsx("path",{d:"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"}),"IndeterminateCheckBox");function G(e){return $("MuiCheckbox",e)}const x=w("MuiCheckbox",["root","checked","disabled","indeterminate","colorPrimary","colorSecondary","sizeSmall","sizeMedium"]),q=e=>{const{classes:t,indeterminate:o,color:s,size:r}=e,a={root:["root",o&&"indeterminate",`color${p(s)}`,`size${p(r)}`]},l=H(a,G,t);return{...t,...l}},J=R(L,{shouldForwardProp:e=>F(e)||e==="classes",name:"MuiCheckbox",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[t.root,o.indeterminate&&t.indeterminate,t[`size${p(o.size)}`],o.color!=="default"&&t[`color${p(o.color)}`]]}})(M(({theme:e})=>({color:(e.vars||e).palette.text.secondary,variants:[{props:{color:"default",disableRipple:!1},style:{"&:hover":{backgroundColor:e.vars?`rgba(${e.vars.palette.action.activeChannel} / ${e.vars.palette.action.hoverOpacity})`:v(e.palette.action.active,e.palette.action.hoverOpacity)}}},...Object.entries(e.palette).filter(j()).map(([t])=>({props:{color:t,disableRipple:!1},style:{"&:hover":{backgroundColor:e.vars?`rgba(${e.vars.palette[t].mainChannel} / ${e.vars.palette.action.hoverOpacity})`:v(e.palette[t].main,e.palette.action.hoverOpacity)}}})),...Object.entries(e.palette).filter(j()).map(([t])=>({props:{color:t},style:{[`&.${x.checked}, &.${x.indeterminate}`]:{color:(e.vars||e).palette[t].main},[`&.${x.disabled}`]:{color:(e.vars||e).palette.action.disabled}}})),{props:{disableRipple:!1},style:{"&:hover":{"@media (hover: none)":{backgroundColor:"transparent"}}}}]}))),K=n.jsx(N,{}),Q=n.jsx(E,{}),X=n.jsx(U,{}),Y=i.forwardRef(function(t,o){const s=O({props:t,name:"MuiCheckbox"}),{checkedIcon:r=K,color:a="primary",icon:l=Q,indeterminate:c=!1,indeterminateIcon:f=X,inputProps:I,size:u="medium",disableRipple:b=!1,className:B,...P}=s,m=c?f:l,g=c?f:r,k={...s,disableRipple:b,color:a,indeterminate:c,size:u},C=q(k);return n.jsx(J,{type:"checkbox",inputProps:{"data-indeterminate":c,...I},icon:i.cloneElement(m,{fontSize:m.props.fontSize??u}),checkedIcon:i.cloneElement(g,{fontSize:g.props.fontSize??u}),ownerState:k,ref:o,className:T(C.root,B),disableRipple:b,...P,classes:C})});function y(e){const t=["в","на","за","о","у","с","к","и"],o=e.split(" "),s=[];let r=0;for(;r<o.length;){const a=o[r],l=a.toLowerCase();t.includes(l)&&r<o.length-1?(s.push(a+" "+o[r+1]),r+=2):(s.push(a),r++)}return s.join(" ")}const Z="Я живу в Москве и часто бываю на Красной площади.",_=y(Z);console.log(_);const ee=e=>e.replace(/\s+/g," ");function te(e){if(!e)return!1;for(let t=0;t<e.length;t++){const o=e.charCodeAt(t);if(o<48||o>57)return!1}return!0}function z(e){const t=e.split(" "),o=[];let s=[];function r(){s.length>0&&(o.push(s.join(" ")),s=[])}for(let a=0;a<t.length;a++){const l=t[a];te(l)?s.push(l):(r(),o.push(l))}return r(),o.join(" ")}const oe="У меня на счету 1 000 000 рублей и 20 000 долларов.",ne=z(oe);console.log(ne);const se=e=>e.trim(),re=(e,t)=>{let o=e;return t!=null&&t.trim&&(o=se(o)),t!=null&&t.innerSpaces&&(o=ee(o)),t!=null&&t.predlog&&(o=y(o)),t!=null&&t.numbers&&(o=z(o)),{resultText:o}},ce=[{name:"predlog",label:"Неразрывные пробелы предлогов"},{name:"numbers",label:"Неразрывные пробелы числительных"},{name:"trim",label:"Убрать висячие пробелы"},{name:"innerSpaces",label:"Убрать повторяющиеся пробелы"}],ae={numbers:!0,predlog:!0,trim:!0,innerSpaces:!0},le=()=>{const[e,t]=i.useState(ae),[o,s]=i.useState(""),r=V(o,1500),{resultText:a}=re(r,e),l=c=>{t({...e,[c.target.name]:c.target.checked})};return n.jsxs(d,{sx:{backgroundColor:"AppWorkspace",borderRadius:1,padding:2,display:"flex",flexDirection:"column",gap:4},children:[n.jsx(d,{sx:{backgroundColor:"AppWorkspace",padding:1,gap:1,display:"flex"},children:n.jsx(W,{children:ce.map(c=>n.jsx(A,{label:c.label,control:n.jsx(Y,{checked:!!e[c.name],onChange:l,name:c.name})},c.name))})}),n.jsxs(d,{sx:{backgroundColor:"AppWorkspace",padding:1,gap:1,display:"flex"},children:[n.jsx(S,{multiline:!0,label:"Ваш текст",minRows:10,value:o,defaultValue:o,onChange:c=>s(c.currentTarget.value)}),n.jsx(S,{multiline:!0,label:"Результат",minRows:10,value:a})]})]})},de=()=>n.jsx(D,{children:n.jsx(le,{})});export{de as default};
