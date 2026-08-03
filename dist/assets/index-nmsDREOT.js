(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function t(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(a){if(a.ep)return;a.ep=!0;const r=t(a);fetch(a.href,r)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const oo="170",uu=0,Go=1,du=2,lc=1,cc=2,bn=3,jn=0,gt=1,Ut=2,Rn=0,Fi=1,Nt=2,Vo=3,Ho=4,hu=5,ci=100,fu=101,pu=102,mu=103,gu=104,vu=200,_u=201,xu=202,Mu=203,_s=204,xs=205,Su=206,yu=207,Eu=208,bu=209,Tu=210,wu=211,Au=212,Cu=213,Ru=214,Ms=0,Ss=1,ys=2,Gi=3,Es=4,bs=5,Ts=6,ws=7,uc=0,Pu=1,Lu=2,qn=0,Iu=1,Du=2,Uu=3,dc=4,Nu=5,Fu=6,Ou=7,hc=300,Vi=301,Hi=302,As=303,Cs=304,br=306,Rs=1e3,hi=1001,Ps=1002,cn=1003,Bu=1004,Ua=1005,Zt=1006,Rr=1007,wn=1008,Nn=1009,fc=1010,pc=1011,_a=1012,lo=1013,fi=1014,An=1015,Pn=1016,co=1017,uo=1018,Wi=1020,mc=35902,gc=1021,vc=1022,ln=1023,_c=1024,xc=1025,Oi=1026,Xi=1027,Mc=1028,ho=1029,Sc=1030,fo=1031,po=1033,cr=33776,ur=33777,dr=33778,hr=33779,Ls=35840,Is=35841,Ds=35842,Us=35843,Ns=36196,Fs=37492,Os=37496,Bs=37808,zs=37809,ks=37810,Gs=37811,Vs=37812,Hs=37813,Ws=37814,Xs=37815,qs=37816,js=37817,Ys=37818,$s=37819,Ks=37820,Zs=37821,fr=36492,Js=36494,Qs=36495,yc=36283,eo=36284,to=36285,no=36286,zu=3200,ku=3201,Ec=0,Gu=1,Xn="",Ht="srgb",Ki="srgb-linear",Tr="linear",Ze="srgb",gi=7680,Wo=519,Vu=512,Hu=513,Wu=514,bc=515,Xu=516,qu=517,ju=518,Yu=519,io=35044,Xo="300 es",Cn=2e3,vr=2001;class Zi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const a=this._listeners[e];if(a!==void 0){const r=a.indexOf(t);r!==-1&&a.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const a=n.slice(0);for(let r=0,s=a.length;r<s;r++)a[r].call(this,e);e.target=null}}}const Rt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let qo=1234567;const ma=Math.PI/180,xa=180/Math.PI;function Ln(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Rt[i&255]+Rt[i>>8&255]+Rt[i>>16&255]+Rt[i>>24&255]+"-"+Rt[e&255]+Rt[e>>8&255]+"-"+Rt[e>>16&15|64]+Rt[e>>24&255]+"-"+Rt[t&63|128]+Rt[t>>8&255]+"-"+Rt[t>>16&255]+Rt[t>>24&255]+Rt[n&255]+Rt[n>>8&255]+Rt[n>>16&255]+Rt[n>>24&255]).toLowerCase()}function Dt(i,e,t){return Math.max(e,Math.min(t,i))}function mo(i,e){return(i%e+e)%e}function $u(i,e,t,n,a){return n+(i-e)*(a-n)/(t-e)}function Ku(i,e,t){return i!==e?(t-i)/(e-i):0}function ga(i,e,t){return(1-t)*i+t*e}function Zu(i,e,t,n){return ga(i,e,1-Math.exp(-t*n))}function Ju(i,e=1){return e-Math.abs(mo(i,e*2)-e)}function Qu(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function ed(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function td(i,e){return i+Math.floor(Math.random()*(e-i+1))}function nd(i,e){return i+Math.random()*(e-i)}function id(i){return i*(.5-Math.random())}function ad(i){i!==void 0&&(qo=i);let e=qo+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function rd(i){return i*ma}function sd(i){return i*xa}function od(i){return(i&i-1)===0&&i!==0}function ld(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function cd(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function ud(i,e,t,n,a){const r=Math.cos,s=Math.sin,o=r(t/2),l=s(t/2),u=r((e+n)/2),c=s((e+n)/2),f=r((e-n)/2),d=s((e-n)/2),m=r((n-e)/2),g=s((n-e)/2);switch(a){case"XYX":i.set(o*c,l*f,l*d,o*u);break;case"YZY":i.set(l*d,o*c,l*f,o*u);break;case"ZXZ":i.set(l*f,l*d,o*c,o*u);break;case"XZX":i.set(o*c,l*g,l*m,o*u);break;case"YXY":i.set(l*m,o*c,l*g,o*u);break;case"ZYZ":i.set(l*g,l*m,o*c,o*u);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+a)}}function on(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Ke(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Tc={DEG2RAD:ma,RAD2DEG:xa,generateUUID:Ln,clamp:Dt,euclideanModulo:mo,mapLinear:$u,inverseLerp:Ku,lerp:ga,damp:Zu,pingpong:Ju,smoothstep:Qu,smootherstep:ed,randInt:td,randFloat:nd,randFloatSpread:id,seededRandom:ad,degToRad:rd,radToDeg:sd,isPowerOfTwo:od,ceilPowerOfTwo:ld,floorPowerOfTwo:cd,setQuaternionFromProperEuler:ud,normalize:Ke,denormalize:on};class ye{constructor(e=0,t=0){ye.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,a=e.elements;return this.x=a[0]*t+a[3]*n+a[6],this.y=a[1]*t+a[4]*n+a[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Dt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),a=Math.sin(t),r=this.x-e.x,s=this.y-e.y;return this.x=r*n-s*a+e.x,this.y=r*a+s*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ne{constructor(e,t,n,a,r,s,o,l,u){Ne.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,a,r,s,o,l,u)}set(e,t,n,a,r,s,o,l,u){const c=this.elements;return c[0]=e,c[1]=a,c[2]=o,c[3]=t,c[4]=r,c[5]=l,c[6]=n,c[7]=s,c[8]=u,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,a=t.elements,r=this.elements,s=n[0],o=n[3],l=n[6],u=n[1],c=n[4],f=n[7],d=n[2],m=n[5],g=n[8],v=a[0],p=a[3],h=a[6],E=a[1],b=a[4],M=a[7],I=a[2],w=a[5],A=a[8];return r[0]=s*v+o*E+l*I,r[3]=s*p+o*b+l*w,r[6]=s*h+o*M+l*A,r[1]=u*v+c*E+f*I,r[4]=u*p+c*b+f*w,r[7]=u*h+c*M+f*A,r[2]=d*v+m*E+g*I,r[5]=d*p+m*b+g*w,r[8]=d*h+m*M+g*A,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],a=e[2],r=e[3],s=e[4],o=e[5],l=e[6],u=e[7],c=e[8];return t*s*c-t*o*u-n*r*c+n*o*l+a*r*u-a*s*l}invert(){const e=this.elements,t=e[0],n=e[1],a=e[2],r=e[3],s=e[4],o=e[5],l=e[6],u=e[7],c=e[8],f=c*s-o*u,d=o*l-c*r,m=u*r-s*l,g=t*f+n*d+a*m;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return e[0]=f*v,e[1]=(a*u-c*n)*v,e[2]=(o*n-a*s)*v,e[3]=d*v,e[4]=(c*t-a*l)*v,e[5]=(a*r-o*t)*v,e[6]=m*v,e[7]=(n*l-u*t)*v,e[8]=(s*t-n*r)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,a,r,s,o){const l=Math.cos(r),u=Math.sin(r);return this.set(n*l,n*u,-n*(l*s+u*o)+s+e,-a*u,a*l,-a*(-u*s+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Pr.makeScale(e,t)),this}rotate(e){return this.premultiply(Pr.makeRotation(-e)),this}translate(e,t){return this.premultiply(Pr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let a=0;a<9;a++)if(t[a]!==n[a])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Pr=new Ne;function wc(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function _r(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function dd(){const i=_r("canvas");return i.style.display="block",i}const jo={};function da(i){i in jo||(jo[i]=!0,console.warn(i))}function hd(i,e,t){return new Promise(function(n,a){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:a();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}function fd(i){const e=i.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function pd(i){const e=i.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const We={enabled:!0,workingColorSpace:Ki,spaces:{},convert:function(i,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===Ze&&(i.r=In(i.r),i.g=In(i.g),i.b=In(i.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(i.applyMatrix3(this.spaces[e].toXYZ),i.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===Ze&&(i.r=Bi(i.r),i.g=Bi(i.g),i.b=Bi(i.b))),i},fromWorkingColorSpace:function(i,e){return this.convert(i,this.workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Xn?Tr:this.spaces[i].transfer},getLuminanceCoefficients:function(i,e=this.workingColorSpace){return i.fromArray(this.spaces[e].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,e,t){return i.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function In(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Bi(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}const Yo=[.64,.33,.3,.6,.15,.06],$o=[.2126,.7152,.0722],Ko=[.3127,.329],Zo=new Ne().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Jo=new Ne().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);We.define({[Ki]:{primaries:Yo,whitePoint:Ko,transfer:Tr,toXYZ:Zo,fromXYZ:Jo,luminanceCoefficients:$o,workingColorSpaceConfig:{unpackColorSpace:Ht},outputColorSpaceConfig:{drawingBufferColorSpace:Ht}},[Ht]:{primaries:Yo,whitePoint:Ko,transfer:Ze,toXYZ:Zo,fromXYZ:Jo,luminanceCoefficients:$o,outputColorSpaceConfig:{drawingBufferColorSpace:Ht}}});let vi;class md{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{vi===void 0&&(vi=_r("canvas")),vi.width=e.width,vi.height=e.height;const n=vi.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=vi}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=_r("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const a=n.getImageData(0,0,e.width,e.height),r=a.data;for(let s=0;s<r.length;s++)r[s]=In(r[s]/255)*255;return n.putImageData(a,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(In(t[n]/255)*255):t[n]=In(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let gd=0;class Ac{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:gd++}),this.uuid=Ln(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},a=this.data;if(a!==null){let r;if(Array.isArray(a)){r=[];for(let s=0,o=a.length;s<o;s++)a[s].isDataTexture?r.push(Lr(a[s].image)):r.push(Lr(a[s]))}else r=Lr(a);n.url=r}return t||(e.images[this.uuid]=n),n}}function Lr(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?md.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let vd=0;class Ft extends Zi{constructor(e=Ft.DEFAULT_IMAGE,t=Ft.DEFAULT_MAPPING,n=hi,a=hi,r=Zt,s=wn,o=ln,l=Nn,u=Ft.DEFAULT_ANISOTROPY,c=Xn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:vd++}),this.uuid=Ln(),this.name="",this.source=new Ac(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=a,this.magFilter=r,this.minFilter=s,this.anisotropy=u,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ye(0,0),this.repeat=new ye(1,1),this.center=new ye(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ne,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=c,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==hc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Rs:e.x=e.x-Math.floor(e.x);break;case hi:e.x=e.x<0?0:1;break;case Ps:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Rs:e.y=e.y-Math.floor(e.y);break;case hi:e.y=e.y<0?0:1;break;case Ps:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Ft.DEFAULT_IMAGE=null;Ft.DEFAULT_MAPPING=hc;Ft.DEFAULT_ANISOTROPY=1;class Je{constructor(e=0,t=0,n=0,a=1){Je.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=a}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,a){return this.x=e,this.y=t,this.z=n,this.w=a,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,a=this.z,r=this.w,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*a+s[12]*r,this.y=s[1]*t+s[5]*n+s[9]*a+s[13]*r,this.z=s[2]*t+s[6]*n+s[10]*a+s[14]*r,this.w=s[3]*t+s[7]*n+s[11]*a+s[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,a,r;const l=e.elements,u=l[0],c=l[4],f=l[8],d=l[1],m=l[5],g=l[9],v=l[2],p=l[6],h=l[10];if(Math.abs(c-d)<.01&&Math.abs(f-v)<.01&&Math.abs(g-p)<.01){if(Math.abs(c+d)<.1&&Math.abs(f+v)<.1&&Math.abs(g+p)<.1&&Math.abs(u+m+h-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const b=(u+1)/2,M=(m+1)/2,I=(h+1)/2,w=(c+d)/4,A=(f+v)/4,R=(g+p)/4;return b>M&&b>I?b<.01?(n=0,a=.707106781,r=.707106781):(n=Math.sqrt(b),a=w/n,r=A/n):M>I?M<.01?(n=.707106781,a=0,r=.707106781):(a=Math.sqrt(M),n=w/a,r=R/a):I<.01?(n=.707106781,a=.707106781,r=0):(r=Math.sqrt(I),n=A/r,a=R/r),this.set(n,a,r,t),this}let E=Math.sqrt((p-g)*(p-g)+(f-v)*(f-v)+(d-c)*(d-c));return Math.abs(E)<.001&&(E=1),this.x=(p-g)/E,this.y=(f-v)/E,this.z=(d-c)/E,this.w=Math.acos((u+m+h-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class _d extends Zi{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Je(0,0,e,t),this.scissorTest=!1,this.viewport=new Je(0,0,e,t);const a={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Zt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new Ft(a,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const s=n.count;for(let o=0;o<s;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let a=0,r=this.textures.length;a<r;a++)this.textures[a].image.width=e,this.textures[a].image.height=t,this.textures[a].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,a=e.textures.length;n<a;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Ac(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class un extends _d{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Cc extends Ft{constructor(e=null,t=1,n=1,a=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:a},this.magFilter=cn,this.minFilter=cn,this.wrapR=hi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class xd extends Ft{constructor(e=null,t=1,n=1,a=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:a},this.magFilter=cn,this.minFilter=cn,this.wrapR=hi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ea{constructor(e=0,t=0,n=0,a=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=a}static slerpFlat(e,t,n,a,r,s,o){let l=n[a+0],u=n[a+1],c=n[a+2],f=n[a+3];const d=r[s+0],m=r[s+1],g=r[s+2],v=r[s+3];if(o===0){e[t+0]=l,e[t+1]=u,e[t+2]=c,e[t+3]=f;return}if(o===1){e[t+0]=d,e[t+1]=m,e[t+2]=g,e[t+3]=v;return}if(f!==v||l!==d||u!==m||c!==g){let p=1-o;const h=l*d+u*m+c*g+f*v,E=h>=0?1:-1,b=1-h*h;if(b>Number.EPSILON){const I=Math.sqrt(b),w=Math.atan2(I,h*E);p=Math.sin(p*w)/I,o=Math.sin(o*w)/I}const M=o*E;if(l=l*p+d*M,u=u*p+m*M,c=c*p+g*M,f=f*p+v*M,p===1-o){const I=1/Math.sqrt(l*l+u*u+c*c+f*f);l*=I,u*=I,c*=I,f*=I}}e[t]=l,e[t+1]=u,e[t+2]=c,e[t+3]=f}static multiplyQuaternionsFlat(e,t,n,a,r,s){const o=n[a],l=n[a+1],u=n[a+2],c=n[a+3],f=r[s],d=r[s+1],m=r[s+2],g=r[s+3];return e[t]=o*g+c*f+l*m-u*d,e[t+1]=l*g+c*d+u*f-o*m,e[t+2]=u*g+c*m+o*d-l*f,e[t+3]=c*g-o*f-l*d-u*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,a){return this._x=e,this._y=t,this._z=n,this._w=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,a=e._y,r=e._z,s=e._order,o=Math.cos,l=Math.sin,u=o(n/2),c=o(a/2),f=o(r/2),d=l(n/2),m=l(a/2),g=l(r/2);switch(s){case"XYZ":this._x=d*c*f+u*m*g,this._y=u*m*f-d*c*g,this._z=u*c*g+d*m*f,this._w=u*c*f-d*m*g;break;case"YXZ":this._x=d*c*f+u*m*g,this._y=u*m*f-d*c*g,this._z=u*c*g-d*m*f,this._w=u*c*f+d*m*g;break;case"ZXY":this._x=d*c*f-u*m*g,this._y=u*m*f+d*c*g,this._z=u*c*g+d*m*f,this._w=u*c*f-d*m*g;break;case"ZYX":this._x=d*c*f-u*m*g,this._y=u*m*f+d*c*g,this._z=u*c*g-d*m*f,this._w=u*c*f+d*m*g;break;case"YZX":this._x=d*c*f+u*m*g,this._y=u*m*f+d*c*g,this._z=u*c*g-d*m*f,this._w=u*c*f-d*m*g;break;case"XZY":this._x=d*c*f-u*m*g,this._y=u*m*f-d*c*g,this._z=u*c*g+d*m*f,this._w=u*c*f+d*m*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+s)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,a=Math.sin(n);return this._x=e.x*a,this._y=e.y*a,this._z=e.z*a,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],a=t[4],r=t[8],s=t[1],o=t[5],l=t[9],u=t[2],c=t[6],f=t[10],d=n+o+f;if(d>0){const m=.5/Math.sqrt(d+1);this._w=.25/m,this._x=(c-l)*m,this._y=(r-u)*m,this._z=(s-a)*m}else if(n>o&&n>f){const m=2*Math.sqrt(1+n-o-f);this._w=(c-l)/m,this._x=.25*m,this._y=(a+s)/m,this._z=(r+u)/m}else if(o>f){const m=2*Math.sqrt(1+o-n-f);this._w=(r-u)/m,this._x=(a+s)/m,this._y=.25*m,this._z=(l+c)/m}else{const m=2*Math.sqrt(1+f-n-o);this._w=(s-a)/m,this._x=(r+u)/m,this._y=(l+c)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Dt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const a=Math.min(1,t/n);return this.slerp(e,a),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,a=e._y,r=e._z,s=e._w,o=t._x,l=t._y,u=t._z,c=t._w;return this._x=n*c+s*o+a*u-r*l,this._y=a*c+s*l+r*o-n*u,this._z=r*c+s*u+n*l-a*o,this._w=s*c-n*o-a*l-r*u,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,a=this._y,r=this._z,s=this._w;let o=s*e._w+n*e._x+a*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=s,this._x=n,this._y=a,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const m=1-t;return this._w=m*s+t*this._w,this._x=m*n+t*this._x,this._y=m*a+t*this._y,this._z=m*r+t*this._z,this.normalize(),this}const u=Math.sqrt(l),c=Math.atan2(u,o),f=Math.sin((1-t)*c)/u,d=Math.sin(t*c)/u;return this._w=s*f+this._w*d,this._x=n*f+this._x*d,this._y=a*f+this._y*d,this._z=r*f+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),a=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(a*Math.sin(e),a*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class P{constructor(e=0,t=0,n=0){P.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Qo.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Qo.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,a=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*a,this.y=r[1]*t+r[4]*n+r[7]*a,this.z=r[2]*t+r[5]*n+r[8]*a,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,a=this.z,r=e.elements,s=1/(r[3]*t+r[7]*n+r[11]*a+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*a+r[12])*s,this.y=(r[1]*t+r[5]*n+r[9]*a+r[13])*s,this.z=(r[2]*t+r[6]*n+r[10]*a+r[14])*s,this}applyQuaternion(e){const t=this.x,n=this.y,a=this.z,r=e.x,s=e.y,o=e.z,l=e.w,u=2*(s*a-o*n),c=2*(o*t-r*a),f=2*(r*n-s*t);return this.x=t+l*u+s*f-o*c,this.y=n+l*c+o*u-r*f,this.z=a+l*f+r*c-s*u,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,a=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*a,this.y=r[1]*t+r[5]*n+r[9]*a,this.z=r[2]*t+r[6]*n+r[10]*a,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,a=e.y,r=e.z,s=t.x,o=t.y,l=t.z;return this.x=a*l-r*o,this.y=r*s-n*l,this.z=n*o-a*s,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Ir.copy(this).projectOnVector(e),this.sub(Ir)}reflect(e){return this.sub(Ir.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Dt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,a=this.z-e.z;return t*t+n*n+a*a}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const a=Math.sin(t)*e;return this.x=a*Math.sin(n),this.y=Math.cos(t)*e,this.z=a*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),a=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=a,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ir=new P,Qo=new Ea;class ba{constructor(e=new P(1/0,1/0,1/0),t=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(tn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(tn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=tn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let s=0,o=r.count;s<o;s++)e.isMesh===!0?e.getVertexPosition(s,tn):tn.fromBufferAttribute(r,s),tn.applyMatrix4(e.matrixWorld),this.expandByPoint(tn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Na.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Na.copy(n.boundingBox)),Na.applyMatrix4(e.matrixWorld),this.union(Na)}const a=e.children;for(let r=0,s=a.length;r<s;r++)this.expandByObject(a[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,tn),tn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ta),Fa.subVectors(this.max,ta),_i.subVectors(e.a,ta),xi.subVectors(e.b,ta),Mi.subVectors(e.c,ta),Bn.subVectors(xi,_i),zn.subVectors(Mi,xi),Qn.subVectors(_i,Mi);let t=[0,-Bn.z,Bn.y,0,-zn.z,zn.y,0,-Qn.z,Qn.y,Bn.z,0,-Bn.x,zn.z,0,-zn.x,Qn.z,0,-Qn.x,-Bn.y,Bn.x,0,-zn.y,zn.x,0,-Qn.y,Qn.x,0];return!Dr(t,_i,xi,Mi,Fa)||(t=[1,0,0,0,1,0,0,0,1],!Dr(t,_i,xi,Mi,Fa))?!1:(Oa.crossVectors(Bn,zn),t=[Oa.x,Oa.y,Oa.z],Dr(t,_i,xi,Mi,Fa))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,tn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(tn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(xn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),xn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),xn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),xn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),xn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),xn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),xn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),xn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(xn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const xn=[new P,new P,new P,new P,new P,new P,new P,new P],tn=new P,Na=new ba,_i=new P,xi=new P,Mi=new P,Bn=new P,zn=new P,Qn=new P,ta=new P,Fa=new P,Oa=new P,ei=new P;function Dr(i,e,t,n,a){for(let r=0,s=i.length-3;r<=s;r+=3){ei.fromArray(i,r);const o=a.x*Math.abs(ei.x)+a.y*Math.abs(ei.y)+a.z*Math.abs(ei.z),l=e.dot(ei),u=t.dot(ei),c=n.dot(ei);if(Math.max(-Math.max(l,u,c),Math.min(l,u,c))>o)return!1}return!0}const Md=new ba,na=new P,Ur=new P;class Ta{constructor(e=new P,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Md.setFromPoints(e).getCenter(n);let a=0;for(let r=0,s=e.length;r<s;r++)a=Math.max(a,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(a),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;na.subVectors(e,this.center);const t=na.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),a=(n-this.radius)*.5;this.center.addScaledVector(na,a/n),this.radius+=a}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ur.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(na.copy(e.center).add(Ur)),this.expandByPoint(na.copy(e.center).sub(Ur))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Mn=new P,Nr=new P,Ba=new P,kn=new P,Fr=new P,za=new P,Or=new P;class wr{constructor(e=new P,t=new P(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Mn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Mn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Mn.copy(this.origin).addScaledVector(this.direction,t),Mn.distanceToSquared(e))}distanceSqToSegment(e,t,n,a){Nr.copy(e).add(t).multiplyScalar(.5),Ba.copy(t).sub(e).normalize(),kn.copy(this.origin).sub(Nr);const r=e.distanceTo(t)*.5,s=-this.direction.dot(Ba),o=kn.dot(this.direction),l=-kn.dot(Ba),u=kn.lengthSq(),c=Math.abs(1-s*s);let f,d,m,g;if(c>0)if(f=s*l-o,d=s*o-l,g=r*c,f>=0)if(d>=-g)if(d<=g){const v=1/c;f*=v,d*=v,m=f*(f+s*d+2*o)+d*(s*f+d+2*l)+u}else d=r,f=Math.max(0,-(s*d+o)),m=-f*f+d*(d+2*l)+u;else d=-r,f=Math.max(0,-(s*d+o)),m=-f*f+d*(d+2*l)+u;else d<=-g?(f=Math.max(0,-(-s*r+o)),d=f>0?-r:Math.min(Math.max(-r,-l),r),m=-f*f+d*(d+2*l)+u):d<=g?(f=0,d=Math.min(Math.max(-r,-l),r),m=d*(d+2*l)+u):(f=Math.max(0,-(s*r+o)),d=f>0?r:Math.min(Math.max(-r,-l),r),m=-f*f+d*(d+2*l)+u);else d=s>0?-r:r,f=Math.max(0,-(s*d+o)),m=-f*f+d*(d+2*l)+u;return n&&n.copy(this.origin).addScaledVector(this.direction,f),a&&a.copy(Nr).addScaledVector(Ba,d),m}intersectSphere(e,t){Mn.subVectors(e.center,this.origin);const n=Mn.dot(this.direction),a=Mn.dot(Mn)-n*n,r=e.radius*e.radius;if(a>r)return null;const s=Math.sqrt(r-a),o=n-s,l=n+s;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,a,r,s,o,l;const u=1/this.direction.x,c=1/this.direction.y,f=1/this.direction.z,d=this.origin;return u>=0?(n=(e.min.x-d.x)*u,a=(e.max.x-d.x)*u):(n=(e.max.x-d.x)*u,a=(e.min.x-d.x)*u),c>=0?(r=(e.min.y-d.y)*c,s=(e.max.y-d.y)*c):(r=(e.max.y-d.y)*c,s=(e.min.y-d.y)*c),n>s||r>a||((r>n||isNaN(n))&&(n=r),(s<a||isNaN(a))&&(a=s),f>=0?(o=(e.min.z-d.z)*f,l=(e.max.z-d.z)*f):(o=(e.max.z-d.z)*f,l=(e.min.z-d.z)*f),n>l||o>a)||((o>n||n!==n)&&(n=o),(l<a||a!==a)&&(a=l),a<0)?null:this.at(n>=0?n:a,t)}intersectsBox(e){return this.intersectBox(e,Mn)!==null}intersectTriangle(e,t,n,a,r){Fr.subVectors(t,e),za.subVectors(n,e),Or.crossVectors(Fr,za);let s=this.direction.dot(Or),o;if(s>0){if(a)return null;o=1}else if(s<0)o=-1,s=-s;else return null;kn.subVectors(this.origin,e);const l=o*this.direction.dot(za.crossVectors(kn,za));if(l<0)return null;const u=o*this.direction.dot(Fr.cross(kn));if(u<0||l+u>s)return null;const c=-o*kn.dot(Or);return c<0?null:this.at(c/s,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class et{constructor(e,t,n,a,r,s,o,l,u,c,f,d,m,g,v,p){et.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,a,r,s,o,l,u,c,f,d,m,g,v,p)}set(e,t,n,a,r,s,o,l,u,c,f,d,m,g,v,p){const h=this.elements;return h[0]=e,h[4]=t,h[8]=n,h[12]=a,h[1]=r,h[5]=s,h[9]=o,h[13]=l,h[2]=u,h[6]=c,h[10]=f,h[14]=d,h[3]=m,h[7]=g,h[11]=v,h[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new et().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,a=1/Si.setFromMatrixColumn(e,0).length(),r=1/Si.setFromMatrixColumn(e,1).length(),s=1/Si.setFromMatrixColumn(e,2).length();return t[0]=n[0]*a,t[1]=n[1]*a,t[2]=n[2]*a,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*s,t[9]=n[9]*s,t[10]=n[10]*s,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,a=e.y,r=e.z,s=Math.cos(n),o=Math.sin(n),l=Math.cos(a),u=Math.sin(a),c=Math.cos(r),f=Math.sin(r);if(e.order==="XYZ"){const d=s*c,m=s*f,g=o*c,v=o*f;t[0]=l*c,t[4]=-l*f,t[8]=u,t[1]=m+g*u,t[5]=d-v*u,t[9]=-o*l,t[2]=v-d*u,t[6]=g+m*u,t[10]=s*l}else if(e.order==="YXZ"){const d=l*c,m=l*f,g=u*c,v=u*f;t[0]=d+v*o,t[4]=g*o-m,t[8]=s*u,t[1]=s*f,t[5]=s*c,t[9]=-o,t[2]=m*o-g,t[6]=v+d*o,t[10]=s*l}else if(e.order==="ZXY"){const d=l*c,m=l*f,g=u*c,v=u*f;t[0]=d-v*o,t[4]=-s*f,t[8]=g+m*o,t[1]=m+g*o,t[5]=s*c,t[9]=v-d*o,t[2]=-s*u,t[6]=o,t[10]=s*l}else if(e.order==="ZYX"){const d=s*c,m=s*f,g=o*c,v=o*f;t[0]=l*c,t[4]=g*u-m,t[8]=d*u+v,t[1]=l*f,t[5]=v*u+d,t[9]=m*u-g,t[2]=-u,t[6]=o*l,t[10]=s*l}else if(e.order==="YZX"){const d=s*l,m=s*u,g=o*l,v=o*u;t[0]=l*c,t[4]=v-d*f,t[8]=g*f+m,t[1]=f,t[5]=s*c,t[9]=-o*c,t[2]=-u*c,t[6]=m*f+g,t[10]=d-v*f}else if(e.order==="XZY"){const d=s*l,m=s*u,g=o*l,v=o*u;t[0]=l*c,t[4]=-f,t[8]=u*c,t[1]=d*f+v,t[5]=s*c,t[9]=m*f-g,t[2]=g*f-m,t[6]=o*c,t[10]=v*f+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Sd,e,yd)}lookAt(e,t,n){const a=this.elements;return Gt.subVectors(e,t),Gt.lengthSq()===0&&(Gt.z=1),Gt.normalize(),Gn.crossVectors(n,Gt),Gn.lengthSq()===0&&(Math.abs(n.z)===1?Gt.x+=1e-4:Gt.z+=1e-4,Gt.normalize(),Gn.crossVectors(n,Gt)),Gn.normalize(),ka.crossVectors(Gt,Gn),a[0]=Gn.x,a[4]=ka.x,a[8]=Gt.x,a[1]=Gn.y,a[5]=ka.y,a[9]=Gt.y,a[2]=Gn.z,a[6]=ka.z,a[10]=Gt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,a=t.elements,r=this.elements,s=n[0],o=n[4],l=n[8],u=n[12],c=n[1],f=n[5],d=n[9],m=n[13],g=n[2],v=n[6],p=n[10],h=n[14],E=n[3],b=n[7],M=n[11],I=n[15],w=a[0],A=a[4],R=a[8],y=a[12],x=a[1],C=a[5],k=a[9],O=a[13],X=a[2],j=a[6],H=a[10],Z=a[14],G=a[3],ne=a[7],re=a[11],ge=a[15];return r[0]=s*w+o*x+l*X+u*G,r[4]=s*A+o*C+l*j+u*ne,r[8]=s*R+o*k+l*H+u*re,r[12]=s*y+o*O+l*Z+u*ge,r[1]=c*w+f*x+d*X+m*G,r[5]=c*A+f*C+d*j+m*ne,r[9]=c*R+f*k+d*H+m*re,r[13]=c*y+f*O+d*Z+m*ge,r[2]=g*w+v*x+p*X+h*G,r[6]=g*A+v*C+p*j+h*ne,r[10]=g*R+v*k+p*H+h*re,r[14]=g*y+v*O+p*Z+h*ge,r[3]=E*w+b*x+M*X+I*G,r[7]=E*A+b*C+M*j+I*ne,r[11]=E*R+b*k+M*H+I*re,r[15]=E*y+b*O+M*Z+I*ge,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],a=e[8],r=e[12],s=e[1],o=e[5],l=e[9],u=e[13],c=e[2],f=e[6],d=e[10],m=e[14],g=e[3],v=e[7],p=e[11],h=e[15];return g*(+r*l*f-a*u*f-r*o*d+n*u*d+a*o*m-n*l*m)+v*(+t*l*m-t*u*d+r*s*d-a*s*m+a*u*c-r*l*c)+p*(+t*u*f-t*o*m-r*s*f+n*s*m+r*o*c-n*u*c)+h*(-a*o*c-t*l*f+t*o*d+a*s*f-n*s*d+n*l*c)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const a=this.elements;return e.isVector3?(a[12]=e.x,a[13]=e.y,a[14]=e.z):(a[12]=e,a[13]=t,a[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],a=e[2],r=e[3],s=e[4],o=e[5],l=e[6],u=e[7],c=e[8],f=e[9],d=e[10],m=e[11],g=e[12],v=e[13],p=e[14],h=e[15],E=f*p*u-v*d*u+v*l*m-o*p*m-f*l*h+o*d*h,b=g*d*u-c*p*u-g*l*m+s*p*m+c*l*h-s*d*h,M=c*v*u-g*f*u+g*o*m-s*v*m-c*o*h+s*f*h,I=g*f*l-c*v*l-g*o*d+s*v*d+c*o*p-s*f*p,w=t*E+n*b+a*M+r*I;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/w;return e[0]=E*A,e[1]=(v*d*r-f*p*r-v*a*m+n*p*m+f*a*h-n*d*h)*A,e[2]=(o*p*r-v*l*r+v*a*u-n*p*u-o*a*h+n*l*h)*A,e[3]=(f*l*r-o*d*r-f*a*u+n*d*u+o*a*m-n*l*m)*A,e[4]=b*A,e[5]=(c*p*r-g*d*r+g*a*m-t*p*m-c*a*h+t*d*h)*A,e[6]=(g*l*r-s*p*r-g*a*u+t*p*u+s*a*h-t*l*h)*A,e[7]=(s*d*r-c*l*r+c*a*u-t*d*u-s*a*m+t*l*m)*A,e[8]=M*A,e[9]=(g*f*r-c*v*r-g*n*m+t*v*m+c*n*h-t*f*h)*A,e[10]=(s*v*r-g*o*r+g*n*u-t*v*u-s*n*h+t*o*h)*A,e[11]=(c*o*r-s*f*r-c*n*u+t*f*u+s*n*m-t*o*m)*A,e[12]=I*A,e[13]=(c*v*a-g*f*a+g*n*d-t*v*d-c*n*p+t*f*p)*A,e[14]=(g*o*a-s*v*a-g*n*l+t*v*l+s*n*p-t*o*p)*A,e[15]=(s*f*a-c*o*a+c*n*l-t*f*l-s*n*d+t*o*d)*A,this}scale(e){const t=this.elements,n=e.x,a=e.y,r=e.z;return t[0]*=n,t[4]*=a,t[8]*=r,t[1]*=n,t[5]*=a,t[9]*=r,t[2]*=n,t[6]*=a,t[10]*=r,t[3]*=n,t[7]*=a,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],a=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,a))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),a=Math.sin(t),r=1-n,s=e.x,o=e.y,l=e.z,u=r*s,c=r*o;return this.set(u*s+n,u*o-a*l,u*l+a*o,0,u*o+a*l,c*o+n,c*l-a*s,0,u*l-a*o,c*l+a*s,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,a,r,s){return this.set(1,n,r,0,e,1,s,0,t,a,1,0,0,0,0,1),this}compose(e,t,n){const a=this.elements,r=t._x,s=t._y,o=t._z,l=t._w,u=r+r,c=s+s,f=o+o,d=r*u,m=r*c,g=r*f,v=s*c,p=s*f,h=o*f,E=l*u,b=l*c,M=l*f,I=n.x,w=n.y,A=n.z;return a[0]=(1-(v+h))*I,a[1]=(m+M)*I,a[2]=(g-b)*I,a[3]=0,a[4]=(m-M)*w,a[5]=(1-(d+h))*w,a[6]=(p+E)*w,a[7]=0,a[8]=(g+b)*A,a[9]=(p-E)*A,a[10]=(1-(d+v))*A,a[11]=0,a[12]=e.x,a[13]=e.y,a[14]=e.z,a[15]=1,this}decompose(e,t,n){const a=this.elements;let r=Si.set(a[0],a[1],a[2]).length();const s=Si.set(a[4],a[5],a[6]).length(),o=Si.set(a[8],a[9],a[10]).length();this.determinant()<0&&(r=-r),e.x=a[12],e.y=a[13],e.z=a[14],nn.copy(this);const u=1/r,c=1/s,f=1/o;return nn.elements[0]*=u,nn.elements[1]*=u,nn.elements[2]*=u,nn.elements[4]*=c,nn.elements[5]*=c,nn.elements[6]*=c,nn.elements[8]*=f,nn.elements[9]*=f,nn.elements[10]*=f,t.setFromRotationMatrix(nn),n.x=r,n.y=s,n.z=o,this}makePerspective(e,t,n,a,r,s,o=Cn){const l=this.elements,u=2*r/(t-e),c=2*r/(n-a),f=(t+e)/(t-e),d=(n+a)/(n-a);let m,g;if(o===Cn)m=-(s+r)/(s-r),g=-2*s*r/(s-r);else if(o===vr)m=-s/(s-r),g=-s*r/(s-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=c,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,a,r,s,o=Cn){const l=this.elements,u=1/(t-e),c=1/(n-a),f=1/(s-r),d=(t+e)*u,m=(n+a)*c;let g,v;if(o===Cn)g=(s+r)*f,v=-2*f;else if(o===vr)g=r*f,v=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*u,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*c,l[9]=0,l[13]=-m,l[2]=0,l[6]=0,l[10]=v,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let a=0;a<16;a++)if(t[a]!==n[a])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Si=new P,nn=new et,Sd=new P(0,0,0),yd=new P(1,1,1),Gn=new P,ka=new P,Gt=new P,el=new et,tl=new Ea;class gn{constructor(e=0,t=0,n=0,a=gn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=a}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,a=this._order){return this._x=e,this._y=t,this._z=n,this._order=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const a=e.elements,r=a[0],s=a[4],o=a[8],l=a[1],u=a[5],c=a[9],f=a[2],d=a[6],m=a[10];switch(t){case"XYZ":this._y=Math.asin(Dt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-c,m),this._z=Math.atan2(-s,r)):(this._x=Math.atan2(d,u),this._z=0);break;case"YXZ":this._x=Math.asin(-Dt(c,-1,1)),Math.abs(c)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(l,u)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(Dt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-f,m),this._z=Math.atan2(-s,u)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Dt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(d,m),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-s,u));break;case"YZX":this._z=Math.asin(Dt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-c,u),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-Dt(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(d,u),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-c,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return el.makeRotationFromQuaternion(e),this.setFromRotationMatrix(el,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return tl.setFromEuler(this),this.setFromQuaternion(tl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}gn.DEFAULT_ORDER="XYZ";class go{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Ed=0;const nl=new P,yi=new Ea,Sn=new et,Ga=new P,ia=new P,bd=new P,Td=new Ea,il=new P(1,0,0),al=new P(0,1,0),rl=new P(0,0,1),sl={type:"added"},wd={type:"removed"},Ei={type:"childadded",child:null},Br={type:"childremoved",child:null};class wt extends Zi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ed++}),this.uuid=Ln(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=wt.DEFAULT_UP.clone();const e=new P,t=new gn,n=new Ea,a=new P(1,1,1);function r(){n.setFromEuler(t,!1)}function s(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(s),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:a},modelViewMatrix:{value:new et},normalMatrix:{value:new Ne}}),this.matrix=new et,this.matrixWorld=new et,this.matrixAutoUpdate=wt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=wt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new go,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return yi.setFromAxisAngle(e,t),this.quaternion.multiply(yi),this}rotateOnWorldAxis(e,t){return yi.setFromAxisAngle(e,t),this.quaternion.premultiply(yi),this}rotateX(e){return this.rotateOnAxis(il,e)}rotateY(e){return this.rotateOnAxis(al,e)}rotateZ(e){return this.rotateOnAxis(rl,e)}translateOnAxis(e,t){return nl.copy(e).applyQuaternion(this.quaternion),this.position.add(nl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(il,e)}translateY(e){return this.translateOnAxis(al,e)}translateZ(e){return this.translateOnAxis(rl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Sn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Ga.copy(e):Ga.set(e,t,n);const a=this.parent;this.updateWorldMatrix(!0,!1),ia.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Sn.lookAt(ia,Ga,this.up):Sn.lookAt(Ga,ia,this.up),this.quaternion.setFromRotationMatrix(Sn),a&&(Sn.extractRotation(a.matrixWorld),yi.setFromRotationMatrix(Sn),this.quaternion.premultiply(yi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(sl),Ei.child=e,this.dispatchEvent(Ei),Ei.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(wd),Br.child=e,this.dispatchEvent(Br),Br.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Sn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Sn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Sn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(sl),Ei.child=e,this.dispatchEvent(Ei),Ei.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,a=this.children.length;n<a;n++){const s=this.children[n].getObjectByProperty(e,t);if(s!==void 0)return s}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const a=this.children;for(let r=0,s=a.length;r<s;r++)a[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ia,e,bd),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ia,Td,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,a=t.length;n<a;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,a=t.length;n<a;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,a=t.length;n<a;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const a=this.children;for(let r=0,s=a.length;r<s;r++)a[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const a={};a.uuid=this.uuid,a.type=this.type,this.name!==""&&(a.name=this.name),this.castShadow===!0&&(a.castShadow=!0),this.receiveShadow===!0&&(a.receiveShadow=!0),this.visible===!1&&(a.visible=!1),this.frustumCulled===!1&&(a.frustumCulled=!1),this.renderOrder!==0&&(a.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(a.userData=this.userData),a.layers=this.layers.mask,a.matrix=this.matrix.toArray(),a.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(a.matrixAutoUpdate=!1),this.isInstancedMesh&&(a.type="InstancedMesh",a.count=this.count,a.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(a.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(a.type="BatchedMesh",a.perObjectFrustumCulled=this.perObjectFrustumCulled,a.sortObjects=this.sortObjects,a.drawRanges=this._drawRanges,a.reservedRanges=this._reservedRanges,a.visibility=this._visibility,a.active=this._active,a.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),a.maxInstanceCount=this._maxInstanceCount,a.maxVertexCount=this._maxVertexCount,a.maxIndexCount=this._maxIndexCount,a.geometryInitialized=this._geometryInitialized,a.geometryCount=this._geometryCount,a.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(a.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(a.boundingSphere={center:a.boundingSphere.center.toArray(),radius:a.boundingSphere.radius}),this.boundingBox!==null&&(a.boundingBox={min:a.boundingBox.min.toArray(),max:a.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?a.background=this.background.toJSON():this.background.isTexture&&(a.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(a.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){a.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let u=0,c=l.length;u<c;u++){const f=l[u];r(e.shapes,f)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(a.bindMode=this.bindMode,a.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),a.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,u=this.material.length;l<u;l++)o.push(r(e.materials,this.material[l]));a.material=o}else a.material=r(e.materials,this.material);if(this.children.length>0){a.children=[];for(let o=0;o<this.children.length;o++)a.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){a.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];a.animations.push(r(e.animations,l))}}if(t){const o=s(e.geometries),l=s(e.materials),u=s(e.textures),c=s(e.images),f=s(e.shapes),d=s(e.skeletons),m=s(e.animations),g=s(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),u.length>0&&(n.textures=u),c.length>0&&(n.images=c),f.length>0&&(n.shapes=f),d.length>0&&(n.skeletons=d),m.length>0&&(n.animations=m),g.length>0&&(n.nodes=g)}return n.object=a,n;function s(o){const l=[];for(const u in o){const c=o[u];delete c.metadata,l.push(c)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const a=e.children[n];this.add(a.clone())}return this}}wt.DEFAULT_UP=new P(0,1,0);wt.DEFAULT_MATRIX_AUTO_UPDATE=!0;wt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const an=new P,yn=new P,zr=new P,En=new P,bi=new P,Ti=new P,ol=new P,kr=new P,Gr=new P,Vr=new P,Hr=new Je,Wr=new Je,Xr=new Je;class Kt{constructor(e=new P,t=new P,n=new P){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,a){a.subVectors(n,t),an.subVectors(e,t),a.cross(an);const r=a.lengthSq();return r>0?a.multiplyScalar(1/Math.sqrt(r)):a.set(0,0,0)}static getBarycoord(e,t,n,a,r){an.subVectors(a,t),yn.subVectors(n,t),zr.subVectors(e,t);const s=an.dot(an),o=an.dot(yn),l=an.dot(zr),u=yn.dot(yn),c=yn.dot(zr),f=s*u-o*o;if(f===0)return r.set(0,0,0),null;const d=1/f,m=(u*l-o*c)*d,g=(s*c-o*l)*d;return r.set(1-m-g,g,m)}static containsPoint(e,t,n,a){return this.getBarycoord(e,t,n,a,En)===null?!1:En.x>=0&&En.y>=0&&En.x+En.y<=1}static getInterpolation(e,t,n,a,r,s,o,l){return this.getBarycoord(e,t,n,a,En)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,En.x),l.addScaledVector(s,En.y),l.addScaledVector(o,En.z),l)}static getInterpolatedAttribute(e,t,n,a,r,s){return Hr.setScalar(0),Wr.setScalar(0),Xr.setScalar(0),Hr.fromBufferAttribute(e,t),Wr.fromBufferAttribute(e,n),Xr.fromBufferAttribute(e,a),s.setScalar(0),s.addScaledVector(Hr,r.x),s.addScaledVector(Wr,r.y),s.addScaledVector(Xr,r.z),s}static isFrontFacing(e,t,n,a){return an.subVectors(n,t),yn.subVectors(e,t),an.cross(yn).dot(a)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,a){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[a]),this}setFromAttributeAndIndices(e,t,n,a){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,a),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return an.subVectors(this.c,this.b),yn.subVectors(this.a,this.b),an.cross(yn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Kt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Kt.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,a,r){return Kt.getInterpolation(e,this.a,this.b,this.c,t,n,a,r)}containsPoint(e){return Kt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Kt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,a=this.b,r=this.c;let s,o;bi.subVectors(a,n),Ti.subVectors(r,n),kr.subVectors(e,n);const l=bi.dot(kr),u=Ti.dot(kr);if(l<=0&&u<=0)return t.copy(n);Gr.subVectors(e,a);const c=bi.dot(Gr),f=Ti.dot(Gr);if(c>=0&&f<=c)return t.copy(a);const d=l*f-c*u;if(d<=0&&l>=0&&c<=0)return s=l/(l-c),t.copy(n).addScaledVector(bi,s);Vr.subVectors(e,r);const m=bi.dot(Vr),g=Ti.dot(Vr);if(g>=0&&m<=g)return t.copy(r);const v=m*u-l*g;if(v<=0&&u>=0&&g<=0)return o=u/(u-g),t.copy(n).addScaledVector(Ti,o);const p=c*g-m*f;if(p<=0&&f-c>=0&&m-g>=0)return ol.subVectors(r,a),o=(f-c)/(f-c+(m-g)),t.copy(a).addScaledVector(ol,o);const h=1/(p+v+d);return s=v*h,o=d*h,t.copy(n).addScaledVector(bi,s).addScaledVector(Ti,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Rc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Vn={h:0,s:0,l:0},Va={h:0,s:0,l:0};function qr(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class de{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const a=e;a&&a.isColor?this.copy(a):typeof a=="number"?this.setHex(a):typeof a=="string"&&this.setStyle(a)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Ht){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,We.toWorkingColorSpace(this,t),this}setRGB(e,t,n,a=We.workingColorSpace){return this.r=e,this.g=t,this.b=n,We.toWorkingColorSpace(this,a),this}setHSL(e,t,n,a=We.workingColorSpace){if(e=mo(e,1),t=Dt(t,0,1),n=Dt(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,s=2*n-r;this.r=qr(s,r,e+1/3),this.g=qr(s,r,e),this.b=qr(s,r,e-1/3)}return We.toWorkingColorSpace(this,a),this}setStyle(e,t=Ht){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let a;if(a=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const s=a[1],o=a[2];switch(s){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(a=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=a[1],s=r.length;if(s===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(s===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Ht){const n=Rc[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=In(e.r),this.g=In(e.g),this.b=In(e.b),this}copyLinearToSRGB(e){return this.r=Bi(e.r),this.g=Bi(e.g),this.b=Bi(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ht){return We.fromWorkingColorSpace(Pt.copy(this),e),Math.round(Dt(Pt.r*255,0,255))*65536+Math.round(Dt(Pt.g*255,0,255))*256+Math.round(Dt(Pt.b*255,0,255))}getHexString(e=Ht){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=We.workingColorSpace){We.fromWorkingColorSpace(Pt.copy(this),t);const n=Pt.r,a=Pt.g,r=Pt.b,s=Math.max(n,a,r),o=Math.min(n,a,r);let l,u;const c=(o+s)/2;if(o===s)l=0,u=0;else{const f=s-o;switch(u=c<=.5?f/(s+o):f/(2-s-o),s){case n:l=(a-r)/f+(a<r?6:0);break;case a:l=(r-n)/f+2;break;case r:l=(n-a)/f+4;break}l/=6}return e.h=l,e.s=u,e.l=c,e}getRGB(e,t=We.workingColorSpace){return We.fromWorkingColorSpace(Pt.copy(this),t),e.r=Pt.r,e.g=Pt.g,e.b=Pt.b,e}getStyle(e=Ht){We.fromWorkingColorSpace(Pt.copy(this),e);const t=Pt.r,n=Pt.g,a=Pt.b;return e!==Ht?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${a.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(a*255)})`}offsetHSL(e,t,n){return this.getHSL(Vn),this.setHSL(Vn.h+e,Vn.s+t,Vn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Vn),e.getHSL(Va);const n=ga(Vn.h,Va.h,t),a=ga(Vn.s,Va.s,t),r=ga(Vn.l,Va.l,t);return this.setHSL(n,a,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,a=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*a,this.g=r[1]*t+r[4]*n+r[7]*a,this.b=r[2]*t+r[5]*n+r[8]*a,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Pt=new de;de.NAMES=Rc;let Ad=0;class Kn extends Zi{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ad++}),this.uuid=Ln(),this.name="",this.blending=Fi,this.side=jn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=_s,this.blendDst=xs,this.blendEquation=ci,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new de(0,0,0),this.blendAlpha=0,this.depthFunc=Gi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Wo,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=gi,this.stencilZFail=gi,this.stencilZPass=gi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const a=this[t];if(a===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}a&&a.isColor?a.set(n):a&&a.isVector3&&n&&n.isVector3?a.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Fi&&(n.blending=this.blending),this.side!==jn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==_s&&(n.blendSrc=this.blendSrc),this.blendDst!==xs&&(n.blendDst=this.blendDst),this.blendEquation!==ci&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Gi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Wo&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==gi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==gi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==gi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function a(r){const s=[];for(const o in r){const l=r[o];delete l.metadata,s.push(l)}return s}if(t){const r=a(e.textures),s=a(e.images);r.length>0&&(n.textures=r),s.length>0&&(n.images=s)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const a=t.length;n=new Array(a);for(let r=0;r!==a;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Dn extends Kn{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new de(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new gn,this.combine=uc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const ht=new P,Ha=new ye;class bt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=io,this.updateRanges=[],this.gpuType=An,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let a=0,r=this.itemSize;a<r;a++)this.array[e+a]=t.array[n+a];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Ha.fromBufferAttribute(this,t),Ha.applyMatrix3(e),this.setXY(t,Ha.x,Ha.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)ht.fromBufferAttribute(this,t),ht.applyMatrix3(e),this.setXYZ(t,ht.x,ht.y,ht.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)ht.fromBufferAttribute(this,t),ht.applyMatrix4(e),this.setXYZ(t,ht.x,ht.y,ht.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)ht.fromBufferAttribute(this,t),ht.applyNormalMatrix(e),this.setXYZ(t,ht.x,ht.y,ht.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)ht.fromBufferAttribute(this,t),ht.transformDirection(e),this.setXYZ(t,ht.x,ht.y,ht.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=on(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Ke(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=on(t,this.array)),t}setX(e,t){return this.normalized&&(t=Ke(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=on(t,this.array)),t}setY(e,t){return this.normalized&&(t=Ke(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=on(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Ke(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=on(t,this.array)),t}setW(e,t){return this.normalized&&(t=Ke(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Ke(t,this.array),n=Ke(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,a){return e*=this.itemSize,this.normalized&&(t=Ke(t,this.array),n=Ke(n,this.array),a=Ke(a,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=a,this}setXYZW(e,t,n,a,r){return e*=this.itemSize,this.normalized&&(t=Ke(t,this.array),n=Ke(n,this.array),a=Ke(a,this.array),r=Ke(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=a,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==io&&(e.usage=this.usage),e}}class Pc extends bt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Lc extends bt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class dt extends bt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Cd=0;const Yt=new et,jr=new wt,wi=new P,Vt=new ba,aa=new ba,St=new P;class vt extends Zi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Cd++}),this.uuid=Ln(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(wc(e)?Lc:Pc)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Ne().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const a=this.attributes.tangent;return a!==void 0&&(a.transformDirection(e),a.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Yt.makeRotationFromQuaternion(e),this.applyMatrix4(Yt),this}rotateX(e){return Yt.makeRotationX(e),this.applyMatrix4(Yt),this}rotateY(e){return Yt.makeRotationY(e),this.applyMatrix4(Yt),this}rotateZ(e){return Yt.makeRotationZ(e),this.applyMatrix4(Yt),this}translate(e,t,n){return Yt.makeTranslation(e,t,n),this.applyMatrix4(Yt),this}scale(e,t,n){return Yt.makeScale(e,t,n),this.applyMatrix4(Yt),this}lookAt(e){return jr.lookAt(e),jr.updateMatrix(),this.applyMatrix4(jr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(wi).negate(),this.translate(wi.x,wi.y,wi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let a=0,r=e.length;a<r;a++){const s=e[a];n.push(s.x,s.y,s.z||0)}this.setAttribute("position",new dt(n,3))}else{for(let n=0,a=t.count;n<a;n++){const r=e[n];t.setXYZ(n,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ba);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,a=t.length;n<a;n++){const r=t[n];Vt.setFromBufferAttribute(r),this.morphTargetsRelative?(St.addVectors(this.boundingBox.min,Vt.min),this.boundingBox.expandByPoint(St),St.addVectors(this.boundingBox.max,Vt.max),this.boundingBox.expandByPoint(St)):(this.boundingBox.expandByPoint(Vt.min),this.boundingBox.expandByPoint(Vt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ta);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(e){const n=this.boundingSphere.center;if(Vt.setFromBufferAttribute(e),t)for(let r=0,s=t.length;r<s;r++){const o=t[r];aa.setFromBufferAttribute(o),this.morphTargetsRelative?(St.addVectors(Vt.min,aa.min),Vt.expandByPoint(St),St.addVectors(Vt.max,aa.max),Vt.expandByPoint(St)):(Vt.expandByPoint(aa.min),Vt.expandByPoint(aa.max))}Vt.getCenter(n);let a=0;for(let r=0,s=e.count;r<s;r++)St.fromBufferAttribute(e,r),a=Math.max(a,n.distanceToSquared(St));if(t)for(let r=0,s=t.length;r<s;r++){const o=t[r],l=this.morphTargetsRelative;for(let u=0,c=o.count;u<c;u++)St.fromBufferAttribute(o,u),l&&(wi.fromBufferAttribute(e,u),St.add(wi)),a=Math.max(a,n.distanceToSquared(St))}this.boundingSphere.radius=Math.sqrt(a),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,a=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new bt(new Float32Array(4*n.count),4));const s=this.getAttribute("tangent"),o=[],l=[];for(let R=0;R<n.count;R++)o[R]=new P,l[R]=new P;const u=new P,c=new P,f=new P,d=new ye,m=new ye,g=new ye,v=new P,p=new P;function h(R,y,x){u.fromBufferAttribute(n,R),c.fromBufferAttribute(n,y),f.fromBufferAttribute(n,x),d.fromBufferAttribute(r,R),m.fromBufferAttribute(r,y),g.fromBufferAttribute(r,x),c.sub(u),f.sub(u),m.sub(d),g.sub(d);const C=1/(m.x*g.y-g.x*m.y);isFinite(C)&&(v.copy(c).multiplyScalar(g.y).addScaledVector(f,-m.y).multiplyScalar(C),p.copy(f).multiplyScalar(m.x).addScaledVector(c,-g.x).multiplyScalar(C),o[R].add(v),o[y].add(v),o[x].add(v),l[R].add(p),l[y].add(p),l[x].add(p))}let E=this.groups;E.length===0&&(E=[{start:0,count:e.count}]);for(let R=0,y=E.length;R<y;++R){const x=E[R],C=x.start,k=x.count;for(let O=C,X=C+k;O<X;O+=3)h(e.getX(O+0),e.getX(O+1),e.getX(O+2))}const b=new P,M=new P,I=new P,w=new P;function A(R){I.fromBufferAttribute(a,R),w.copy(I);const y=o[R];b.copy(y),b.sub(I.multiplyScalar(I.dot(y))).normalize(),M.crossVectors(w,y);const C=M.dot(l[R])<0?-1:1;s.setXYZW(R,b.x,b.y,b.z,C)}for(let R=0,y=E.length;R<y;++R){const x=E[R],C=x.start,k=x.count;for(let O=C,X=C+k;O<X;O+=3)A(e.getX(O+0)),A(e.getX(O+1)),A(e.getX(O+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new bt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,m=n.count;d<m;d++)n.setXYZ(d,0,0,0);const a=new P,r=new P,s=new P,o=new P,l=new P,u=new P,c=new P,f=new P;if(e)for(let d=0,m=e.count;d<m;d+=3){const g=e.getX(d+0),v=e.getX(d+1),p=e.getX(d+2);a.fromBufferAttribute(t,g),r.fromBufferAttribute(t,v),s.fromBufferAttribute(t,p),c.subVectors(s,r),f.subVectors(a,r),c.cross(f),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,v),u.fromBufferAttribute(n,p),o.add(c),l.add(c),u.add(c),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(p,u.x,u.y,u.z)}else for(let d=0,m=t.count;d<m;d+=3)a.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),s.fromBufferAttribute(t,d+2),c.subVectors(s,r),f.subVectors(a,r),c.cross(f),n.setXYZ(d+0,c.x,c.y,c.z),n.setXYZ(d+1,c.x,c.y,c.z),n.setXYZ(d+2,c.x,c.y,c.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)St.fromBufferAttribute(e,t),St.normalize(),e.setXYZ(t,St.x,St.y,St.z)}toNonIndexed(){function e(o,l){const u=o.array,c=o.itemSize,f=o.normalized,d=new u.constructor(l.length*c);let m=0,g=0;for(let v=0,p=l.length;v<p;v++){o.isInterleavedBufferAttribute?m=l[v]*o.data.stride+o.offset:m=l[v]*c;for(let h=0;h<c;h++)d[g++]=u[m++]}return new bt(d,c,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new vt,n=this.index.array,a=this.attributes;for(const o in a){const l=a[o],u=e(l,n);t.setAttribute(o,u)}const r=this.morphAttributes;for(const o in r){const l=[],u=r[o];for(let c=0,f=u.length;c<f;c++){const d=u[c],m=e(d,n);l.push(m)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const s=this.groups;for(let o=0,l=s.length;o<l;o++){const u=s[o];t.addGroup(u.start,u.count,u.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const u in l)l[u]!==void 0&&(e[u]=l[u]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const u=n[l];e.data.attributes[l]=u.toJSON(e.data)}const a={};let r=!1;for(const l in this.morphAttributes){const u=this.morphAttributes[l],c=[];for(let f=0,d=u.length;f<d;f++){const m=u[f];c.push(m.toJSON(e.data))}c.length>0&&(a[l]=c,r=!0)}r&&(e.data.morphAttributes=a,e.data.morphTargetsRelative=this.morphTargetsRelative);const s=this.groups;s.length>0&&(e.data.groups=JSON.parse(JSON.stringify(s)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const a=e.attributes;for(const u in a){const c=a[u];this.setAttribute(u,c.clone(t))}const r=e.morphAttributes;for(const u in r){const c=[],f=r[u];for(let d=0,m=f.length;d<m;d++)c.push(f[d].clone(t));this.morphAttributes[u]=c}this.morphTargetsRelative=e.morphTargetsRelative;const s=e.groups;for(let u=0,c=s.length;u<c;u++){const f=s[u];this.addGroup(f.start,f.count,f.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const ll=new et,ti=new wr,Wa=new Ta,cl=new P,Xa=new P,qa=new P,ja=new P,Yr=new P,Ya=new P,ul=new P,$a=new P;class Be extends wt{constructor(e=new vt,t=new Dn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const a=t[n[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,s=a.length;r<s;r++){const o=a[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,a=n.attributes.position,r=n.morphAttributes.position,s=n.morphTargetsRelative;t.fromBufferAttribute(a,e);const o=this.morphTargetInfluences;if(r&&o){Ya.set(0,0,0);for(let l=0,u=r.length;l<u;l++){const c=o[l],f=r[l];c!==0&&(Yr.fromBufferAttribute(f,e),s?Ya.addScaledVector(Yr,c):Ya.addScaledVector(Yr.sub(t),c))}t.add(Ya)}return t}raycast(e,t){const n=this.geometry,a=this.material,r=this.matrixWorld;a!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Wa.copy(n.boundingSphere),Wa.applyMatrix4(r),ti.copy(e.ray).recast(e.near),!(Wa.containsPoint(ti.origin)===!1&&(ti.intersectSphere(Wa,cl)===null||ti.origin.distanceToSquared(cl)>(e.far-e.near)**2))&&(ll.copy(r).invert(),ti.copy(e.ray).applyMatrix4(ll),!(n.boundingBox!==null&&ti.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ti)))}_computeIntersections(e,t,n){let a;const r=this.geometry,s=this.material,o=r.index,l=r.attributes.position,u=r.attributes.uv,c=r.attributes.uv1,f=r.attributes.normal,d=r.groups,m=r.drawRange;if(o!==null)if(Array.isArray(s))for(let g=0,v=d.length;g<v;g++){const p=d[g],h=s[p.materialIndex],E=Math.max(p.start,m.start),b=Math.min(o.count,Math.min(p.start+p.count,m.start+m.count));for(let M=E,I=b;M<I;M+=3){const w=o.getX(M),A=o.getX(M+1),R=o.getX(M+2);a=Ka(this,h,e,n,u,c,f,w,A,R),a&&(a.faceIndex=Math.floor(M/3),a.face.materialIndex=p.materialIndex,t.push(a))}}else{const g=Math.max(0,m.start),v=Math.min(o.count,m.start+m.count);for(let p=g,h=v;p<h;p+=3){const E=o.getX(p),b=o.getX(p+1),M=o.getX(p+2);a=Ka(this,s,e,n,u,c,f,E,b,M),a&&(a.faceIndex=Math.floor(p/3),t.push(a))}}else if(l!==void 0)if(Array.isArray(s))for(let g=0,v=d.length;g<v;g++){const p=d[g],h=s[p.materialIndex],E=Math.max(p.start,m.start),b=Math.min(l.count,Math.min(p.start+p.count,m.start+m.count));for(let M=E,I=b;M<I;M+=3){const w=M,A=M+1,R=M+2;a=Ka(this,h,e,n,u,c,f,w,A,R),a&&(a.faceIndex=Math.floor(M/3),a.face.materialIndex=p.materialIndex,t.push(a))}}else{const g=Math.max(0,m.start),v=Math.min(l.count,m.start+m.count);for(let p=g,h=v;p<h;p+=3){const E=p,b=p+1,M=p+2;a=Ka(this,s,e,n,u,c,f,E,b,M),a&&(a.faceIndex=Math.floor(p/3),t.push(a))}}}}function Rd(i,e,t,n,a,r,s,o){let l;if(e.side===gt?l=n.intersectTriangle(s,r,a,!0,o):l=n.intersectTriangle(a,r,s,e.side===jn,o),l===null)return null;$a.copy(o),$a.applyMatrix4(i.matrixWorld);const u=t.ray.origin.distanceTo($a);return u<t.near||u>t.far?null:{distance:u,point:$a.clone(),object:i}}function Ka(i,e,t,n,a,r,s,o,l,u){i.getVertexPosition(o,Xa),i.getVertexPosition(l,qa),i.getVertexPosition(u,ja);const c=Rd(i,e,t,n,Xa,qa,ja,ul);if(c){const f=new P;Kt.getBarycoord(ul,Xa,qa,ja,f),a&&(c.uv=Kt.getInterpolatedAttribute(a,o,l,u,f,new ye)),r&&(c.uv1=Kt.getInterpolatedAttribute(r,o,l,u,f,new ye)),s&&(c.normal=Kt.getInterpolatedAttribute(s,o,l,u,f,new P),c.normal.dot(n.direction)>0&&c.normal.multiplyScalar(-1));const d={a:o,b:l,c:u,normal:new P,materialIndex:0};Kt.getNormal(Xa,qa,ja,d.normal),c.face=d,c.barycoord=f}return c}class wa extends vt{constructor(e=1,t=1,n=1,a=1,r=1,s=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:a,heightSegments:r,depthSegments:s};const o=this;a=Math.floor(a),r=Math.floor(r),s=Math.floor(s);const l=[],u=[],c=[],f=[];let d=0,m=0;g("z","y","x",-1,-1,n,t,e,s,r,0),g("z","y","x",1,-1,n,t,-e,s,r,1),g("x","z","y",1,1,e,n,t,a,s,2),g("x","z","y",1,-1,e,n,-t,a,s,3),g("x","y","z",1,-1,e,t,n,a,r,4),g("x","y","z",-1,-1,e,t,-n,a,r,5),this.setIndex(l),this.setAttribute("position",new dt(u,3)),this.setAttribute("normal",new dt(c,3)),this.setAttribute("uv",new dt(f,2));function g(v,p,h,E,b,M,I,w,A,R,y){const x=M/A,C=I/R,k=M/2,O=I/2,X=w/2,j=A+1,H=R+1;let Z=0,G=0;const ne=new P;for(let re=0;re<H;re++){const ge=re*C-O;for(let Ce=0;Ce<j;Ce++){const Ve=Ce*x-k;ne[v]=Ve*E,ne[p]=ge*b,ne[h]=X,u.push(ne.x,ne.y,ne.z),ne[v]=0,ne[p]=0,ne[h]=w>0?1:-1,c.push(ne.x,ne.y,ne.z),f.push(Ce/A),f.push(1-re/R),Z+=1}}for(let re=0;re<R;re++)for(let ge=0;ge<A;ge++){const Ce=d+ge+j*re,Ve=d+ge+j*(re+1),W=d+(ge+1)+j*(re+1),J=d+(ge+1)+j*re;l.push(Ce,Ve,J),l.push(Ve,W,J),G+=6}o.addGroup(m,G,y),m+=G,d+=Z}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new wa(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function qi(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const a=i[t][n];a&&(a.isColor||a.isMatrix3||a.isMatrix4||a.isVector2||a.isVector3||a.isVector4||a.isTexture||a.isQuaternion)?a.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=a.clone():Array.isArray(a)?e[t][n]=a.slice():e[t][n]=a}}return e}function It(i){const e={};for(let t=0;t<i.length;t++){const n=qi(i[t]);for(const a in n)e[a]=n[a]}return e}function Pd(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Ic(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:We.workingColorSpace}const Yn={clone:qi,merge:It};var Ld=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Id=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class it extends Kn{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Ld,this.fragmentShader=Id,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=qi(e.uniforms),this.uniformsGroups=Pd(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const a in this.uniforms){const s=this.uniforms[a].value;s&&s.isTexture?t.uniforms[a]={type:"t",value:s.toJSON(e).uuid}:s&&s.isColor?t.uniforms[a]={type:"c",value:s.getHex()}:s&&s.isVector2?t.uniforms[a]={type:"v2",value:s.toArray()}:s&&s.isVector3?t.uniforms[a]={type:"v3",value:s.toArray()}:s&&s.isVector4?t.uniforms[a]={type:"v4",value:s.toArray()}:s&&s.isMatrix3?t.uniforms[a]={type:"m3",value:s.toArray()}:s&&s.isMatrix4?t.uniforms[a]={type:"m4",value:s.toArray()}:t.uniforms[a]={value:s}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const a in this.extensions)this.extensions[a]===!0&&(n[a]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Dc extends wt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new et,this.projectionMatrix=new et,this.projectionMatrixInverse=new et,this.coordinateSystem=Cn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Hn=new P,dl=new ye,hl=new ye;class Wt extends Dc{constructor(e=50,t=1,n=.1,a=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=a,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=xa*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ma*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return xa*2*Math.atan(Math.tan(ma*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Hn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Hn.x,Hn.y).multiplyScalar(-e/Hn.z),Hn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Hn.x,Hn.y).multiplyScalar(-e/Hn.z)}getViewSize(e,t){return this.getViewBounds(e,dl,hl),t.subVectors(hl,dl)}setViewOffset(e,t,n,a,r,s){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=a,this.view.width=r,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(ma*.5*this.fov)/this.zoom,n=2*t,a=this.aspect*n,r=-.5*a;const s=this.view;if(this.view!==null&&this.view.enabled){const l=s.fullWidth,u=s.fullHeight;r+=s.offsetX*a/l,t-=s.offsetY*n/u,a*=s.width/l,n*=s.height/u}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+a,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Ai=-90,Ci=1;class Dd extends wt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const a=new Wt(Ai,Ci,e,t);a.layers=this.layers,this.add(a);const r=new Wt(Ai,Ci,e,t);r.layers=this.layers,this.add(r);const s=new Wt(Ai,Ci,e,t);s.layers=this.layers,this.add(s);const o=new Wt(Ai,Ci,e,t);o.layers=this.layers,this.add(o);const l=new Wt(Ai,Ci,e,t);l.layers=this.layers,this.add(l);const u=new Wt(Ai,Ci,e,t);u.layers=this.layers,this.add(u)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,a,r,s,o,l]=t;for(const u of t)this.remove(u);if(e===Cn)n.up.set(0,1,0),n.lookAt(1,0,0),a.up.set(0,1,0),a.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),s.up.set(0,0,1),s.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===vr)n.up.set(0,-1,0),n.lookAt(-1,0,0),a.up.set(0,-1,0),a.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),s.up.set(0,0,-1),s.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const u of t)this.add(u),u.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:a}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,s,o,l,u,c]=this.children,f=e.getRenderTarget(),d=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,a),e.render(t,r),e.setRenderTarget(n,1,a),e.render(t,s),e.setRenderTarget(n,2,a),e.render(t,o),e.setRenderTarget(n,3,a),e.render(t,l),e.setRenderTarget(n,4,a),e.render(t,u),n.texture.generateMipmaps=v,e.setRenderTarget(n,5,a),e.render(t,c),e.setRenderTarget(f,d,m),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Uc extends Ft{constructor(e,t,n,a,r,s,o,l,u,c){e=e!==void 0?e:[],t=t!==void 0?t:Vi,super(e,t,n,a,r,s,o,l,u,c),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Ud extends un{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},a=[n,n,n,n,n,n];this.texture=new Uc(a,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Zt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},a=new wa(5,5,5),r=new it({name:"CubemapFromEquirect",uniforms:qi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:gt,blending:Rn});r.uniforms.tEquirect.value=t;const s=new Be(a,r),o=t.minFilter;return t.minFilter===wn&&(t.minFilter=Zt),new Dd(1,10,this).update(e,s),t.minFilter=o,s.geometry.dispose(),s.material.dispose(),this}clear(e,t,n,a){const r=e.getRenderTarget();for(let s=0;s<6;s++)e.setRenderTarget(this,s),e.clear(t,n,a);e.setRenderTarget(r)}}const $r=new P,Nd=new P,Fd=new Ne;class si{constructor(e=new P(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,a){return this.normal.set(e,t,n),this.constant=a,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const a=$r.subVectors(n,t).cross(Nd.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(a,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta($r),a=this.normal.dot(n);if(a===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/a;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Fd.getNormalMatrix(e),a=this.coplanarPoint($r).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-a.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ni=new Ta,Za=new P;class vo{constructor(e=new si,t=new si,n=new si,a=new si,r=new si,s=new si){this.planes=[e,t,n,a,r,s]}set(e,t,n,a,r,s){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(a),o[4].copy(r),o[5].copy(s),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Cn){const n=this.planes,a=e.elements,r=a[0],s=a[1],o=a[2],l=a[3],u=a[4],c=a[5],f=a[6],d=a[7],m=a[8],g=a[9],v=a[10],p=a[11],h=a[12],E=a[13],b=a[14],M=a[15];if(n[0].setComponents(l-r,d-u,p-m,M-h).normalize(),n[1].setComponents(l+r,d+u,p+m,M+h).normalize(),n[2].setComponents(l+s,d+c,p+g,M+E).normalize(),n[3].setComponents(l-s,d-c,p-g,M-E).normalize(),n[4].setComponents(l-o,d-f,p-v,M-b).normalize(),t===Cn)n[5].setComponents(l+o,d+f,p+v,M+b).normalize();else if(t===vr)n[5].setComponents(o,f,v,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ni.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ni.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ni)}intersectsSprite(e){return ni.center.set(0,0,0),ni.radius=.7071067811865476,ni.applyMatrix4(e.matrixWorld),this.intersectsSphere(ni)}intersectsSphere(e){const t=this.planes,n=e.center,a=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<a)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const a=t[n];if(Za.x=a.normal.x>0?e.max.x:e.min.x,Za.y=a.normal.y>0?e.max.y:e.min.y,Za.z=a.normal.z>0?e.max.z:e.min.z,a.distanceToPoint(Za)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Nc(){let i=null,e=!1,t=null,n=null;function a(r,s){t(r,s),n=i.requestAnimationFrame(a)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(a),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function Od(i){const e=new WeakMap;function t(o,l){const u=o.array,c=o.usage,f=u.byteLength,d=i.createBuffer();i.bindBuffer(l,d),i.bufferData(l,u,c),o.onUploadCallback();let m;if(u instanceof Float32Array)m=i.FLOAT;else if(u instanceof Uint16Array)o.isFloat16BufferAttribute?m=i.HALF_FLOAT:m=i.UNSIGNED_SHORT;else if(u instanceof Int16Array)m=i.SHORT;else if(u instanceof Uint32Array)m=i.UNSIGNED_INT;else if(u instanceof Int32Array)m=i.INT;else if(u instanceof Int8Array)m=i.BYTE;else if(u instanceof Uint8Array)m=i.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)m=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:d,type:m,bytesPerElement:u.BYTES_PER_ELEMENT,version:o.version,size:f}}function n(o,l,u){const c=l.array,f=l.updateRanges;if(i.bindBuffer(u,o),f.length===0)i.bufferSubData(u,0,c);else{f.sort((m,g)=>m.start-g.start);let d=0;for(let m=1;m<f.length;m++){const g=f[d],v=f[m];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++d,f[d]=v)}f.length=d+1;for(let m=0,g=f.length;m<g;m++){const v=f[m];i.bufferSubData(u,v.start*c.BYTES_PER_ELEMENT,c,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function a(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function s(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const c=e.get(o);(!c||c.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const u=e.get(o);if(u===void 0)e.set(o,t(o,l));else if(u.version<o.version){if(u.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(u.buffer,o,l),u.version=o.version}}return{get:a,remove:r,update:s}}class Aa extends vt{constructor(e=1,t=1,n=1,a=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:a};const r=e/2,s=t/2,o=Math.floor(n),l=Math.floor(a),u=o+1,c=l+1,f=e/o,d=t/l,m=[],g=[],v=[],p=[];for(let h=0;h<c;h++){const E=h*d-s;for(let b=0;b<u;b++){const M=b*f-r;g.push(M,-E,0),v.push(0,0,1),p.push(b/o),p.push(1-h/l)}}for(let h=0;h<l;h++)for(let E=0;E<o;E++){const b=E+u*h,M=E+u*(h+1),I=E+1+u*(h+1),w=E+1+u*h;m.push(b,M,w),m.push(M,I,w)}this.setIndex(m),this.setAttribute("position",new dt(g,3)),this.setAttribute("normal",new dt(v,3)),this.setAttribute("uv",new dt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Aa(e.width,e.height,e.widthSegments,e.heightSegments)}}var Bd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,zd=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,kd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Gd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Vd=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Hd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Wd=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Xd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,qd=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,jd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Yd=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,$d=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Kd=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Zd=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Jd=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Qd=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,eh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,th=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,nh=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ih=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,ah=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,rh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,sh=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,oh=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,lh=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,ch=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,uh=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,dh=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,hh=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,fh=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,ph="gl_FragColor = linearToOutputTexel( gl_FragColor );",mh=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,gh=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,vh=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,_h=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,xh=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Mh=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Sh=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,yh=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Eh=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,bh=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Th=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,wh=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Ah=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Ch=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Rh=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Ph=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Lh=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Ih=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Dh=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Uh=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Nh=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Fh=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Oh=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Bh=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,zh=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,kh=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Gh=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Vh=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Hh=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Wh=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Xh=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,qh=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,jh=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Yh=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,$h=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Kh=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Zh=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Jh=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Qh=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,ef=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,tf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,nf=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,af=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,rf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,sf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,of=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,lf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,cf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,uf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,df=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,hf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,ff=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,pf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,mf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,gf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,vf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,_f=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,xf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Mf=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Sf=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,yf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Ef=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,bf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Tf=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,wf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Af=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Cf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Rf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Pf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Lf=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,If=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Df=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Uf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Nf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Ff=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Of=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Bf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,zf=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,kf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Gf=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Vf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Hf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Wf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Xf=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,qf=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,jf=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Yf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,$f=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Kf=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Zf=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Jf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Qf=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ep=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,tp=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,np=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,ip=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ap=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,rp=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,sp=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,op=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,lp=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,cp=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,up=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,dp=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,hp=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,fp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,pp=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,mp=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,gp=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,vp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Oe={alphahash_fragment:Bd,alphahash_pars_fragment:zd,alphamap_fragment:kd,alphamap_pars_fragment:Gd,alphatest_fragment:Vd,alphatest_pars_fragment:Hd,aomap_fragment:Wd,aomap_pars_fragment:Xd,batching_pars_vertex:qd,batching_vertex:jd,begin_vertex:Yd,beginnormal_vertex:$d,bsdfs:Kd,iridescence_fragment:Zd,bumpmap_pars_fragment:Jd,clipping_planes_fragment:Qd,clipping_planes_pars_fragment:eh,clipping_planes_pars_vertex:th,clipping_planes_vertex:nh,color_fragment:ih,color_pars_fragment:ah,color_pars_vertex:rh,color_vertex:sh,common:oh,cube_uv_reflection_fragment:lh,defaultnormal_vertex:ch,displacementmap_pars_vertex:uh,displacementmap_vertex:dh,emissivemap_fragment:hh,emissivemap_pars_fragment:fh,colorspace_fragment:ph,colorspace_pars_fragment:mh,envmap_fragment:gh,envmap_common_pars_fragment:vh,envmap_pars_fragment:_h,envmap_pars_vertex:xh,envmap_physical_pars_fragment:Ph,envmap_vertex:Mh,fog_vertex:Sh,fog_pars_vertex:yh,fog_fragment:Eh,fog_pars_fragment:bh,gradientmap_pars_fragment:Th,lightmap_pars_fragment:wh,lights_lambert_fragment:Ah,lights_lambert_pars_fragment:Ch,lights_pars_begin:Rh,lights_toon_fragment:Lh,lights_toon_pars_fragment:Ih,lights_phong_fragment:Dh,lights_phong_pars_fragment:Uh,lights_physical_fragment:Nh,lights_physical_pars_fragment:Fh,lights_fragment_begin:Oh,lights_fragment_maps:Bh,lights_fragment_end:zh,logdepthbuf_fragment:kh,logdepthbuf_pars_fragment:Gh,logdepthbuf_pars_vertex:Vh,logdepthbuf_vertex:Hh,map_fragment:Wh,map_pars_fragment:Xh,map_particle_fragment:qh,map_particle_pars_fragment:jh,metalnessmap_fragment:Yh,metalnessmap_pars_fragment:$h,morphinstance_vertex:Kh,morphcolor_vertex:Zh,morphnormal_vertex:Jh,morphtarget_pars_vertex:Qh,morphtarget_vertex:ef,normal_fragment_begin:tf,normal_fragment_maps:nf,normal_pars_fragment:af,normal_pars_vertex:rf,normal_vertex:sf,normalmap_pars_fragment:of,clearcoat_normal_fragment_begin:lf,clearcoat_normal_fragment_maps:cf,clearcoat_pars_fragment:uf,iridescence_pars_fragment:df,opaque_fragment:hf,packing:ff,premultiplied_alpha_fragment:pf,project_vertex:mf,dithering_fragment:gf,dithering_pars_fragment:vf,roughnessmap_fragment:_f,roughnessmap_pars_fragment:xf,shadowmap_pars_fragment:Mf,shadowmap_pars_vertex:Sf,shadowmap_vertex:yf,shadowmask_pars_fragment:Ef,skinbase_vertex:bf,skinning_pars_vertex:Tf,skinning_vertex:wf,skinnormal_vertex:Af,specularmap_fragment:Cf,specularmap_pars_fragment:Rf,tonemapping_fragment:Pf,tonemapping_pars_fragment:Lf,transmission_fragment:If,transmission_pars_fragment:Df,uv_pars_fragment:Uf,uv_pars_vertex:Nf,uv_vertex:Ff,worldpos_vertex:Of,background_vert:Bf,background_frag:zf,backgroundCube_vert:kf,backgroundCube_frag:Gf,cube_vert:Vf,cube_frag:Hf,depth_vert:Wf,depth_frag:Xf,distanceRGBA_vert:qf,distanceRGBA_frag:jf,equirect_vert:Yf,equirect_frag:$f,linedashed_vert:Kf,linedashed_frag:Zf,meshbasic_vert:Jf,meshbasic_frag:Qf,meshlambert_vert:ep,meshlambert_frag:tp,meshmatcap_vert:np,meshmatcap_frag:ip,meshnormal_vert:ap,meshnormal_frag:rp,meshphong_vert:sp,meshphong_frag:op,meshphysical_vert:lp,meshphysical_frag:cp,meshtoon_vert:up,meshtoon_frag:dp,points_vert:hp,points_frag:fp,shadow_vert:pp,shadow_frag:mp,sprite_vert:gp,sprite_frag:vp},ae={common:{diffuse:{value:new de(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ne},alphaMap:{value:null},alphaMapTransform:{value:new Ne},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ne}},envmap:{envMap:{value:null},envMapRotation:{value:new Ne},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ne}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ne}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ne},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ne},normalScale:{value:new ye(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ne},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ne}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ne}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ne}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new de(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new de(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ne},alphaTest:{value:0},uvTransform:{value:new Ne}},sprite:{diffuse:{value:new de(16777215)},opacity:{value:1},center:{value:new ye(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ne},alphaMap:{value:null},alphaMapTransform:{value:new Ne},alphaTest:{value:0}}},fn={basic:{uniforms:It([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.fog]),vertexShader:Oe.meshbasic_vert,fragmentShader:Oe.meshbasic_frag},lambert:{uniforms:It([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,ae.lights,{emissive:{value:new de(0)}}]),vertexShader:Oe.meshlambert_vert,fragmentShader:Oe.meshlambert_frag},phong:{uniforms:It([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,ae.lights,{emissive:{value:new de(0)},specular:{value:new de(1118481)},shininess:{value:30}}]),vertexShader:Oe.meshphong_vert,fragmentShader:Oe.meshphong_frag},standard:{uniforms:It([ae.common,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.roughnessmap,ae.metalnessmap,ae.fog,ae.lights,{emissive:{value:new de(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Oe.meshphysical_vert,fragmentShader:Oe.meshphysical_frag},toon:{uniforms:It([ae.common,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.gradientmap,ae.fog,ae.lights,{emissive:{value:new de(0)}}]),vertexShader:Oe.meshtoon_vert,fragmentShader:Oe.meshtoon_frag},matcap:{uniforms:It([ae.common,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,{matcap:{value:null}}]),vertexShader:Oe.meshmatcap_vert,fragmentShader:Oe.meshmatcap_frag},points:{uniforms:It([ae.points,ae.fog]),vertexShader:Oe.points_vert,fragmentShader:Oe.points_frag},dashed:{uniforms:It([ae.common,ae.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Oe.linedashed_vert,fragmentShader:Oe.linedashed_frag},depth:{uniforms:It([ae.common,ae.displacementmap]),vertexShader:Oe.depth_vert,fragmentShader:Oe.depth_frag},normal:{uniforms:It([ae.common,ae.bumpmap,ae.normalmap,ae.displacementmap,{opacity:{value:1}}]),vertexShader:Oe.meshnormal_vert,fragmentShader:Oe.meshnormal_frag},sprite:{uniforms:It([ae.sprite,ae.fog]),vertexShader:Oe.sprite_vert,fragmentShader:Oe.sprite_frag},background:{uniforms:{uvTransform:{value:new Ne},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Oe.background_vert,fragmentShader:Oe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ne}},vertexShader:Oe.backgroundCube_vert,fragmentShader:Oe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Oe.cube_vert,fragmentShader:Oe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Oe.equirect_vert,fragmentShader:Oe.equirect_frag},distanceRGBA:{uniforms:It([ae.common,ae.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Oe.distanceRGBA_vert,fragmentShader:Oe.distanceRGBA_frag},shadow:{uniforms:It([ae.lights,ae.fog,{color:{value:new de(0)},opacity:{value:1}}]),vertexShader:Oe.shadow_vert,fragmentShader:Oe.shadow_frag}};fn.physical={uniforms:It([fn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ne},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ne},clearcoatNormalScale:{value:new ye(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ne},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ne},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ne},sheen:{value:0},sheenColor:{value:new de(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ne},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ne},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ne},transmissionSamplerSize:{value:new ye},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ne},attenuationDistance:{value:0},attenuationColor:{value:new de(0)},specularColor:{value:new de(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ne},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ne},anisotropyVector:{value:new ye},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ne}}]),vertexShader:Oe.meshphysical_vert,fragmentShader:Oe.meshphysical_frag};const Ja={r:0,b:0,g:0},ii=new gn,_p=new et;function xp(i,e,t,n,a,r,s){const o=new de(0);let l=r===!0?0:1,u,c,f=null,d=0,m=null;function g(E){let b=E.isScene===!0?E.background:null;return b&&b.isTexture&&(b=(E.backgroundBlurriness>0?t:e).get(b)),b}function v(E){let b=!1;const M=g(E);M===null?h(o,l):M&&M.isColor&&(h(M,1),b=!0);const I=i.xr.getEnvironmentBlendMode();I==="additive"?n.buffers.color.setClear(0,0,0,1,s):I==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,s),(i.autoClear||b)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function p(E,b){const M=g(b);M&&(M.isCubeTexture||M.mapping===br)?(c===void 0&&(c=new Be(new wa(1,1,1),new it({name:"BackgroundCubeMaterial",uniforms:qi(fn.backgroundCube.uniforms),vertexShader:fn.backgroundCube.vertexShader,fragmentShader:fn.backgroundCube.fragmentShader,side:gt,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(I,w,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),a.update(c)),ii.copy(b.backgroundRotation),ii.x*=-1,ii.y*=-1,ii.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(ii.y*=-1,ii.z*=-1),c.material.uniforms.envMap.value=M,c.material.uniforms.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,c.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(_p.makeRotationFromEuler(ii)),c.material.toneMapped=We.getTransfer(M.colorSpace)!==Ze,(f!==M||d!==M.version||m!==i.toneMapping)&&(c.material.needsUpdate=!0,f=M,d=M.version,m=i.toneMapping),c.layers.enableAll(),E.unshift(c,c.geometry,c.material,0,0,null)):M&&M.isTexture&&(u===void 0&&(u=new Be(new Aa(2,2),new it({name:"BackgroundMaterial",uniforms:qi(fn.background.uniforms),vertexShader:fn.background.vertexShader,fragmentShader:fn.background.fragmentShader,side:jn,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),Object.defineProperty(u.material,"map",{get:function(){return this.uniforms.t2D.value}}),a.update(u)),u.material.uniforms.t2D.value=M,u.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,u.material.toneMapped=We.getTransfer(M.colorSpace)!==Ze,M.matrixAutoUpdate===!0&&M.updateMatrix(),u.material.uniforms.uvTransform.value.copy(M.matrix),(f!==M||d!==M.version||m!==i.toneMapping)&&(u.material.needsUpdate=!0,f=M,d=M.version,m=i.toneMapping),u.layers.enableAll(),E.unshift(u,u.geometry,u.material,0,0,null))}function h(E,b){E.getRGB(Ja,Ic(i)),n.buffers.color.setClear(Ja.r,Ja.g,Ja.b,b,s)}return{getClearColor:function(){return o},setClearColor:function(E,b=1){o.set(E),l=b,h(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(E){l=E,h(o,l)},render:v,addToRenderList:p}}function Mp(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},a=d(null);let r=a,s=!1;function o(x,C,k,O,X){let j=!1;const H=f(O,k,C);r!==H&&(r=H,u(r.object)),j=m(x,O,k,X),j&&g(x,O,k,X),X!==null&&e.update(X,i.ELEMENT_ARRAY_BUFFER),(j||s)&&(s=!1,M(x,C,k,O),X!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(X).buffer))}function l(){return i.createVertexArray()}function u(x){return i.bindVertexArray(x)}function c(x){return i.deleteVertexArray(x)}function f(x,C,k){const O=k.wireframe===!0;let X=n[x.id];X===void 0&&(X={},n[x.id]=X);let j=X[C.id];j===void 0&&(j={},X[C.id]=j);let H=j[O];return H===void 0&&(H=d(l()),j[O]=H),H}function d(x){const C=[],k=[],O=[];for(let X=0;X<t;X++)C[X]=0,k[X]=0,O[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:k,attributeDivisors:O,object:x,attributes:{},index:null}}function m(x,C,k,O){const X=r.attributes,j=C.attributes;let H=0;const Z=k.getAttributes();for(const G in Z)if(Z[G].location>=0){const re=X[G];let ge=j[G];if(ge===void 0&&(G==="instanceMatrix"&&x.instanceMatrix&&(ge=x.instanceMatrix),G==="instanceColor"&&x.instanceColor&&(ge=x.instanceColor)),re===void 0||re.attribute!==ge||ge&&re.data!==ge.data)return!0;H++}return r.attributesNum!==H||r.index!==O}function g(x,C,k,O){const X={},j=C.attributes;let H=0;const Z=k.getAttributes();for(const G in Z)if(Z[G].location>=0){let re=j[G];re===void 0&&(G==="instanceMatrix"&&x.instanceMatrix&&(re=x.instanceMatrix),G==="instanceColor"&&x.instanceColor&&(re=x.instanceColor));const ge={};ge.attribute=re,re&&re.data&&(ge.data=re.data),X[G]=ge,H++}r.attributes=X,r.attributesNum=H,r.index=O}function v(){const x=r.newAttributes;for(let C=0,k=x.length;C<k;C++)x[C]=0}function p(x){h(x,0)}function h(x,C){const k=r.newAttributes,O=r.enabledAttributes,X=r.attributeDivisors;k[x]=1,O[x]===0&&(i.enableVertexAttribArray(x),O[x]=1),X[x]!==C&&(i.vertexAttribDivisor(x,C),X[x]=C)}function E(){const x=r.newAttributes,C=r.enabledAttributes;for(let k=0,O=C.length;k<O;k++)C[k]!==x[k]&&(i.disableVertexAttribArray(k),C[k]=0)}function b(x,C,k,O,X,j,H){H===!0?i.vertexAttribIPointer(x,C,k,X,j):i.vertexAttribPointer(x,C,k,O,X,j)}function M(x,C,k,O){v();const X=O.attributes,j=k.getAttributes(),H=C.defaultAttributeValues;for(const Z in j){const G=j[Z];if(G.location>=0){let ne=X[Z];if(ne===void 0&&(Z==="instanceMatrix"&&x.instanceMatrix&&(ne=x.instanceMatrix),Z==="instanceColor"&&x.instanceColor&&(ne=x.instanceColor)),ne!==void 0){const re=ne.normalized,ge=ne.itemSize,Ce=e.get(ne);if(Ce===void 0)continue;const Ve=Ce.buffer,W=Ce.type,J=Ce.bytesPerElement,he=W===i.INT||W===i.UNSIGNED_INT||ne.gpuType===lo;if(ne.isInterleavedBufferAttribute){const Q=ne.data,Te=Q.stride,Ae=ne.offset;if(Q.isInstancedInterleavedBuffer){for(let Ie=0;Ie<G.locationSize;Ie++)h(G.location+Ie,Q.meshPerAttribute);x.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let Ie=0;Ie<G.locationSize;Ie++)p(G.location+Ie);i.bindBuffer(i.ARRAY_BUFFER,Ve);for(let Ie=0;Ie<G.locationSize;Ie++)b(G.location+Ie,ge/G.locationSize,W,re,Te*J,(Ae+ge/G.locationSize*Ie)*J,he)}else{if(ne.isInstancedBufferAttribute){for(let Q=0;Q<G.locationSize;Q++)h(G.location+Q,ne.meshPerAttribute);x.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=ne.meshPerAttribute*ne.count)}else for(let Q=0;Q<G.locationSize;Q++)p(G.location+Q);i.bindBuffer(i.ARRAY_BUFFER,Ve);for(let Q=0;Q<G.locationSize;Q++)b(G.location+Q,ge/G.locationSize,W,re,ge*J,ge/G.locationSize*Q*J,he)}}else if(H!==void 0){const re=H[Z];if(re!==void 0)switch(re.length){case 2:i.vertexAttrib2fv(G.location,re);break;case 3:i.vertexAttrib3fv(G.location,re);break;case 4:i.vertexAttrib4fv(G.location,re);break;default:i.vertexAttrib1fv(G.location,re)}}}}E()}function I(){R();for(const x in n){const C=n[x];for(const k in C){const O=C[k];for(const X in O)c(O[X].object),delete O[X];delete C[k]}delete n[x]}}function w(x){if(n[x.id]===void 0)return;const C=n[x.id];for(const k in C){const O=C[k];for(const X in O)c(O[X].object),delete O[X];delete C[k]}delete n[x.id]}function A(x){for(const C in n){const k=n[C];if(k[x.id]===void 0)continue;const O=k[x.id];for(const X in O)c(O[X].object),delete O[X];delete k[x.id]}}function R(){y(),s=!0,r!==a&&(r=a,u(r.object))}function y(){a.geometry=null,a.program=null,a.wireframe=!1}return{setup:o,reset:R,resetDefaultState:y,dispose:I,releaseStatesOfGeometry:w,releaseStatesOfProgram:A,initAttributes:v,enableAttribute:p,disableUnusedAttributes:E}}function Sp(i,e,t){let n;function a(u){n=u}function r(u,c){i.drawArrays(n,u,c),t.update(c,n,1)}function s(u,c,f){f!==0&&(i.drawArraysInstanced(n,u,c,f),t.update(c,n,f))}function o(u,c,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,u,0,c,0,f);let m=0;for(let g=0;g<f;g++)m+=c[g];t.update(m,n,1)}function l(u,c,f,d){if(f===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let g=0;g<u.length;g++)s(u[g],c[g],d[g]);else{m.multiDrawArraysInstancedWEBGL(n,u,0,c,0,d,0,f);let g=0;for(let v=0;v<f;v++)g+=c[v]*d[v];t.update(g,n,1)}}this.setMode=a,this.render=r,this.renderInstances=s,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function yp(i,e,t,n){let a;function r(){if(a!==void 0)return a;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");a=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else a=0;return a}function s(A){return!(A!==ln&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){const R=A===Pn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==Nn&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==An&&!R)}function l(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let u=t.precision!==void 0?t.precision:"highp";const c=l(u);c!==u&&(console.warn("THREE.WebGLRenderer:",u,"not supported, using",c,"instead."),u=c);const f=t.logarithmicDepthBuffer===!0,d=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),m=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),p=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),h=i.getParameter(i.MAX_VERTEX_ATTRIBS),E=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),b=i.getParameter(i.MAX_VARYING_VECTORS),M=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),I=g>0,w=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:s,textureTypeReadable:o,precision:u,logarithmicDepthBuffer:f,reverseDepthBuffer:d,maxTextures:m,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:p,maxAttributes:h,maxVertexUniforms:E,maxVaryings:b,maxFragmentUniforms:M,vertexTextures:I,maxSamples:w}}function Ep(i){const e=this;let t=null,n=0,a=!1,r=!1;const s=new si,o=new Ne,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,d){const m=f.length!==0||d||n!==0||a;return a=d,n=f.length,m},this.beginShadows=function(){r=!0,c(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,d){t=c(f,d,0)},this.setState=function(f,d,m){const g=f.clippingPlanes,v=f.clipIntersection,p=f.clipShadows,h=i.get(f);if(!a||g===null||g.length===0||r&&!p)r?c(null):u();else{const E=r?0:n,b=E*4;let M=h.clippingState||null;l.value=M,M=c(g,d,b,m);for(let I=0;I!==b;++I)M[I]=t[I];h.clippingState=M,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=E}};function u(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function c(f,d,m,g){const v=f!==null?f.length:0;let p=null;if(v!==0){if(p=l.value,g!==!0||p===null){const h=m+v*4,E=d.matrixWorldInverse;o.getNormalMatrix(E),(p===null||p.length<h)&&(p=new Float32Array(h));for(let b=0,M=m;b!==v;++b,M+=4)s.copy(f[b]).applyMatrix4(E,o),s.normal.toArray(p,M),p[M+3]=s.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,p}}function bp(i){let e=new WeakMap;function t(s,o){return o===As?s.mapping=Vi:o===Cs&&(s.mapping=Hi),s}function n(s){if(s&&s.isTexture){const o=s.mapping;if(o===As||o===Cs)if(e.has(s)){const l=e.get(s).texture;return t(l,s.mapping)}else{const l=s.image;if(l&&l.height>0){const u=new Ud(l.height);return u.fromEquirectangularTexture(i,s),e.set(s,u),s.addEventListener("dispose",a),t(u.texture,s.mapping)}else return null}}return s}function a(s){const o=s.target;o.removeEventListener("dispose",a);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}class Fc extends Dc{constructor(e=-1,t=1,n=1,a=-1,r=.1,s=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=a,this.near=r,this.far=s,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,a,r,s){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=a,this.view.width=r,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,a=(this.top+this.bottom)/2;let r=n-e,s=n+e,o=a+t,l=a-t;if(this.view!==null&&this.view.enabled){const u=(this.right-this.left)/this.view.fullWidth/this.zoom,c=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=u*this.view.offsetX,s=r+u*this.view.width,o-=c*this.view.offsetY,l=o-c*this.view.height}this.projectionMatrix.makeOrthographic(r,s,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Ni=4,fl=[.125,.215,.35,.446,.526,.582],ui=20,Kr=new Fc,pl=new de;let Zr=null,Jr=0,Qr=0,es=!1;const oi=(1+Math.sqrt(5))/2,Ri=1/oi,ml=[new P(-oi,Ri,0),new P(oi,Ri,0),new P(-Ri,0,oi),new P(Ri,0,oi),new P(0,oi,-Ri),new P(0,oi,Ri),new P(-1,1,-1),new P(1,1,-1),new P(-1,1,1),new P(1,1,1)];class gl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,a=100){Zr=this._renderer.getRenderTarget(),Jr=this._renderer.getActiveCubeFace(),Qr=this._renderer.getActiveMipmapLevel(),es=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,a,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=xl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=_l(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Zr,Jr,Qr),this._renderer.xr.enabled=es,e.scissorTest=!1,Qa(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Vi||e.mapping===Hi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Zr=this._renderer.getRenderTarget(),Jr=this._renderer.getActiveCubeFace(),Qr=this._renderer.getActiveMipmapLevel(),es=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Zt,minFilter:Zt,generateMipmaps:!1,type:Pn,format:ln,colorSpace:Ki,depthBuffer:!1},a=vl(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=vl(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Tp(r)),this._blurMaterial=wp(r,e,t)}return a}_compileMaterial(e){const t=new Be(this._lodPlanes[0],e);this._renderer.compile(t,Kr)}_sceneToCubeUV(e,t,n,a){const o=new Wt(90,1,t,n),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],c=this._renderer,f=c.autoClear,d=c.toneMapping;c.getClearColor(pl),c.toneMapping=qn,c.autoClear=!1;const m=new Dn({name:"PMREM.Background",side:gt,depthWrite:!1,depthTest:!1}),g=new Be(new wa,m);let v=!1;const p=e.background;p?p.isColor&&(m.color.copy(p),e.background=null,v=!0):(m.color.copy(pl),v=!0);for(let h=0;h<6;h++){const E=h%3;E===0?(o.up.set(0,l[h],0),o.lookAt(u[h],0,0)):E===1?(o.up.set(0,0,l[h]),o.lookAt(0,u[h],0)):(o.up.set(0,l[h],0),o.lookAt(0,0,u[h]));const b=this._cubeSize;Qa(a,E*b,h>2?b:0,b,b),c.setRenderTarget(a),v&&c.render(g,o),c.render(e,o)}g.geometry.dispose(),g.material.dispose(),c.toneMapping=d,c.autoClear=f,e.background=p}_textureToCubeUV(e,t){const n=this._renderer,a=e.mapping===Vi||e.mapping===Hi;a?(this._cubemapMaterial===null&&(this._cubemapMaterial=xl()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=_l());const r=a?this._cubemapMaterial:this._equirectMaterial,s=new Be(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;const l=this._cubeSize;Qa(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(s,Kr)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const a=this._lodPlanes.length;for(let r=1;r<a;r++){const s=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=ml[(a-r-1)%ml.length];this._blur(e,r-1,r,s,o)}t.autoClear=n}_blur(e,t,n,a,r){const s=this._pingPongRenderTarget;this._halfBlur(e,s,t,n,a,"latitudinal",r),this._halfBlur(s,e,n,n,a,"longitudinal",r)}_halfBlur(e,t,n,a,r,s,o){const l=this._renderer,u=this._blurMaterial;s!=="latitudinal"&&s!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const c=3,f=new Be(this._lodPlanes[a],u),d=u.uniforms,m=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*m):2*Math.PI/(2*ui-1),v=r/g,p=isFinite(r)?1+Math.floor(c*v):ui;p>ui&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${ui}`);const h=[];let E=0;for(let A=0;A<ui;++A){const R=A/v,y=Math.exp(-R*R/2);h.push(y),A===0?E+=y:A<p&&(E+=2*y)}for(let A=0;A<h.length;A++)h[A]=h[A]/E;d.envMap.value=e.texture,d.samples.value=p,d.weights.value=h,d.latitudinal.value=s==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:b}=this;d.dTheta.value=g,d.mipInt.value=b-n;const M=this._sizeLods[a],I=3*M*(a>b-Ni?a-b+Ni:0),w=4*(this._cubeSize-M);Qa(t,I,w,3*M,2*M),l.setRenderTarget(t),l.render(f,Kr)}}function Tp(i){const e=[],t=[],n=[];let a=i;const r=i-Ni+1+fl.length;for(let s=0;s<r;s++){const o=Math.pow(2,a);t.push(o);let l=1/o;s>i-Ni?l=fl[s-i+Ni-1]:s===0&&(l=0),n.push(l);const u=1/(o-2),c=-u,f=1+u,d=[c,c,f,c,f,f,c,c,f,f,c,f],m=6,g=6,v=3,p=2,h=1,E=new Float32Array(v*g*m),b=new Float32Array(p*g*m),M=new Float32Array(h*g*m);for(let w=0;w<m;w++){const A=w%3*2/3-1,R=w>2?0:-1,y=[A,R,0,A+2/3,R,0,A+2/3,R+1,0,A,R,0,A+2/3,R+1,0,A,R+1,0];E.set(y,v*g*w),b.set(d,p*g*w);const x=[w,w,w,w,w,w];M.set(x,h*g*w)}const I=new vt;I.setAttribute("position",new bt(E,v)),I.setAttribute("uv",new bt(b,p)),I.setAttribute("faceIndex",new bt(M,h)),e.push(I),a>Ni&&a--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function vl(i,e,t){const n=new un(i,e,t);return n.texture.mapping=br,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Qa(i,e,t,n,a){i.viewport.set(e,t,n,a),i.scissor.set(e,t,n,a)}function wp(i,e,t){const n=new Float32Array(ui),a=new P(0,1,0);return new it({name:"SphericalGaussianBlur",defines:{n:ui,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:a}},vertexShader:_o(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Rn,depthTest:!1,depthWrite:!1})}function _l(){return new it({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:_o(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Rn,depthTest:!1,depthWrite:!1})}function xl(){return new it({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:_o(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Rn,depthTest:!1,depthWrite:!1})}function _o(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Ap(i){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const l=o.mapping,u=l===As||l===Cs,c=l===Vi||l===Hi;if(u||c){let f=e.get(o);const d=f!==void 0?f.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==d)return t===null&&(t=new gl(i)),f=u?t.fromEquirectangular(o,f):t.fromCubemap(o,f),f.texture.pmremVersion=o.pmremVersion,e.set(o,f),f.texture;if(f!==void 0)return f.texture;{const m=o.image;return u&&m&&m.height>0||c&&m&&a(m)?(t===null&&(t=new gl(i)),f=u?t.fromEquirectangular(o):t.fromCubemap(o),f.texture.pmremVersion=o.pmremVersion,e.set(o,f),o.addEventListener("dispose",r),f.texture):null}}}return o}function a(o){let l=0;const u=6;for(let c=0;c<u;c++)o[c]!==void 0&&l++;return l===u}function r(o){const l=o.target;l.removeEventListener("dispose",r);const u=e.get(l);u!==void 0&&(e.delete(l),u.dispose())}function s(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:s}}function Cp(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let a;switch(n){case"WEBGL_depth_texture":a=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":a=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":a=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":a=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:a=i.getExtension(n)}return e[n]=a,a}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const a=t(n);return a===null&&da("THREE.WebGLRenderer: "+n+" extension not supported."),a}}}function Rp(i,e,t,n){const a={},r=new WeakMap;function s(f){const d=f.target;d.index!==null&&e.remove(d.index);for(const g in d.attributes)e.remove(d.attributes[g]);for(const g in d.morphAttributes){const v=d.morphAttributes[g];for(let p=0,h=v.length;p<h;p++)e.remove(v[p])}d.removeEventListener("dispose",s),delete a[d.id];const m=r.get(d);m&&(e.remove(m),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(f,d){return a[d.id]===!0||(d.addEventListener("dispose",s),a[d.id]=!0,t.memory.geometries++),d}function l(f){const d=f.attributes;for(const g in d)e.update(d[g],i.ARRAY_BUFFER);const m=f.morphAttributes;for(const g in m){const v=m[g];for(let p=0,h=v.length;p<h;p++)e.update(v[p],i.ARRAY_BUFFER)}}function u(f){const d=[],m=f.index,g=f.attributes.position;let v=0;if(m!==null){const E=m.array;v=m.version;for(let b=0,M=E.length;b<M;b+=3){const I=E[b+0],w=E[b+1],A=E[b+2];d.push(I,w,w,A,A,I)}}else if(g!==void 0){const E=g.array;v=g.version;for(let b=0,M=E.length/3-1;b<M;b+=3){const I=b+0,w=b+1,A=b+2;d.push(I,w,w,A,A,I)}}else return;const p=new(wc(d)?Lc:Pc)(d,1);p.version=v;const h=r.get(f);h&&e.remove(h),r.set(f,p)}function c(f){const d=r.get(f);if(d){const m=f.index;m!==null&&d.version<m.version&&u(f)}else u(f);return r.get(f)}return{get:o,update:l,getWireframeAttribute:c}}function Pp(i,e,t){let n;function a(d){n=d}let r,s;function o(d){r=d.type,s=d.bytesPerElement}function l(d,m){i.drawElements(n,m,r,d*s),t.update(m,n,1)}function u(d,m,g){g!==0&&(i.drawElementsInstanced(n,m,r,d*s,g),t.update(m,n,g))}function c(d,m,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,m,0,r,d,0,g);let p=0;for(let h=0;h<g;h++)p+=m[h];t.update(p,n,1)}function f(d,m,g,v){if(g===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let h=0;h<d.length;h++)u(d[h]/s,m[h],v[h]);else{p.multiDrawElementsInstancedWEBGL(n,m,0,r,d,0,v,0,g);let h=0;for(let E=0;E<g;E++)h+=m[E]*v[E];t.update(h,n,1)}}this.setMode=a,this.setIndex=o,this.render=l,this.renderInstances=u,this.renderMultiDraw=c,this.renderMultiDrawInstances=f}function Lp(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,s,o){switch(t.calls++,s){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",s);break}}function a(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:a,update:n}}function Ip(i,e,t){const n=new WeakMap,a=new Je;function r(s,o,l){const u=s.morphTargetInfluences,c=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=c!==void 0?c.length:0;let d=n.get(o);if(d===void 0||d.count!==f){let x=function(){R.dispose(),n.delete(o),o.removeEventListener("dispose",x)};var m=x;d!==void 0&&d.texture.dispose();const g=o.morphAttributes.position!==void 0,v=o.morphAttributes.normal!==void 0,p=o.morphAttributes.color!==void 0,h=o.morphAttributes.position||[],E=o.morphAttributes.normal||[],b=o.morphAttributes.color||[];let M=0;g===!0&&(M=1),v===!0&&(M=2),p===!0&&(M=3);let I=o.attributes.position.count*M,w=1;I>e.maxTextureSize&&(w=Math.ceil(I/e.maxTextureSize),I=e.maxTextureSize);const A=new Float32Array(I*w*4*f),R=new Cc(A,I,w,f);R.type=An,R.needsUpdate=!0;const y=M*4;for(let C=0;C<f;C++){const k=h[C],O=E[C],X=b[C],j=I*w*4*C;for(let H=0;H<k.count;H++){const Z=H*y;g===!0&&(a.fromBufferAttribute(k,H),A[j+Z+0]=a.x,A[j+Z+1]=a.y,A[j+Z+2]=a.z,A[j+Z+3]=0),v===!0&&(a.fromBufferAttribute(O,H),A[j+Z+4]=a.x,A[j+Z+5]=a.y,A[j+Z+6]=a.z,A[j+Z+7]=0),p===!0&&(a.fromBufferAttribute(X,H),A[j+Z+8]=a.x,A[j+Z+9]=a.y,A[j+Z+10]=a.z,A[j+Z+11]=X.itemSize===4?a.w:1)}}d={count:f,texture:R,size:new ye(I,w)},n.set(o,d),o.addEventListener("dispose",x)}if(s.isInstancedMesh===!0&&s.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",s.morphTexture,t);else{let g=0;for(let p=0;p<u.length;p++)g+=u[p];const v=o.morphTargetsRelative?1:1-g;l.getUniforms().setValue(i,"morphTargetBaseInfluence",v),l.getUniforms().setValue(i,"morphTargetInfluences",u)}l.getUniforms().setValue(i,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function Dp(i,e,t,n){let a=new WeakMap;function r(l){const u=n.render.frame,c=l.geometry,f=e.get(l,c);if(a.get(f)!==u&&(e.update(f),a.set(f,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),a.get(l)!==u&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),a.set(l,u))),l.isSkinnedMesh){const d=l.skeleton;a.get(d)!==u&&(d.update(),a.set(d,u))}return f}function s(){a=new WeakMap}function o(l){const u=l.target;u.removeEventListener("dispose",o),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:r,dispose:s}}class Oc extends Ft{constructor(e,t,n,a,r,s,o,l,u,c=Oi){if(c!==Oi&&c!==Xi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&c===Oi&&(n=fi),n===void 0&&c===Xi&&(n=Wi),super(null,a,r,s,o,l,c,n,u),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:cn,this.minFilter=l!==void 0?l:cn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Bc=new Ft,Ml=new Oc(1,1),zc=new Cc,kc=new xd,Gc=new Uc,Sl=[],yl=[],El=new Float32Array(16),bl=new Float32Array(9),Tl=new Float32Array(4);function Ji(i,e,t){const n=i[0];if(n<=0||n>0)return i;const a=e*t;let r=Sl[a];if(r===void 0&&(r=new Float32Array(a),Sl[a]=r),e!==0){n.toArray(r,0);for(let s=1,o=0;s!==e;++s)o+=t,i[s].toArray(r,o)}return r}function xt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Mt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Ar(i,e){let t=yl[e];t===void 0&&(t=new Int32Array(e),yl[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Up(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Np(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(xt(t,e))return;i.uniform2fv(this.addr,e),Mt(t,e)}}function Fp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(xt(t,e))return;i.uniform3fv(this.addr,e),Mt(t,e)}}function Op(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(xt(t,e))return;i.uniform4fv(this.addr,e),Mt(t,e)}}function Bp(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(xt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Mt(t,e)}else{if(xt(t,n))return;Tl.set(n),i.uniformMatrix2fv(this.addr,!1,Tl),Mt(t,n)}}function zp(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(xt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Mt(t,e)}else{if(xt(t,n))return;bl.set(n),i.uniformMatrix3fv(this.addr,!1,bl),Mt(t,n)}}function kp(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(xt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Mt(t,e)}else{if(xt(t,n))return;El.set(n),i.uniformMatrix4fv(this.addr,!1,El),Mt(t,n)}}function Gp(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Vp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(xt(t,e))return;i.uniform2iv(this.addr,e),Mt(t,e)}}function Hp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(xt(t,e))return;i.uniform3iv(this.addr,e),Mt(t,e)}}function Wp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(xt(t,e))return;i.uniform4iv(this.addr,e),Mt(t,e)}}function Xp(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function qp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(xt(t,e))return;i.uniform2uiv(this.addr,e),Mt(t,e)}}function jp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(xt(t,e))return;i.uniform3uiv(this.addr,e),Mt(t,e)}}function Yp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(xt(t,e))return;i.uniform4uiv(this.addr,e),Mt(t,e)}}function $p(i,e,t){const n=this.cache,a=t.allocateTextureUnit();n[0]!==a&&(i.uniform1i(this.addr,a),n[0]=a);let r;this.type===i.SAMPLER_2D_SHADOW?(Ml.compareFunction=bc,r=Ml):r=Bc,t.setTexture2D(e||r,a)}function Kp(i,e,t){const n=this.cache,a=t.allocateTextureUnit();n[0]!==a&&(i.uniform1i(this.addr,a),n[0]=a),t.setTexture3D(e||kc,a)}function Zp(i,e,t){const n=this.cache,a=t.allocateTextureUnit();n[0]!==a&&(i.uniform1i(this.addr,a),n[0]=a),t.setTextureCube(e||Gc,a)}function Jp(i,e,t){const n=this.cache,a=t.allocateTextureUnit();n[0]!==a&&(i.uniform1i(this.addr,a),n[0]=a),t.setTexture2DArray(e||zc,a)}function Qp(i){switch(i){case 5126:return Up;case 35664:return Np;case 35665:return Fp;case 35666:return Op;case 35674:return Bp;case 35675:return zp;case 35676:return kp;case 5124:case 35670:return Gp;case 35667:case 35671:return Vp;case 35668:case 35672:return Hp;case 35669:case 35673:return Wp;case 5125:return Xp;case 36294:return qp;case 36295:return jp;case 36296:return Yp;case 35678:case 36198:case 36298:case 36306:case 35682:return $p;case 35679:case 36299:case 36307:return Kp;case 35680:case 36300:case 36308:case 36293:return Zp;case 36289:case 36303:case 36311:case 36292:return Jp}}function em(i,e){i.uniform1fv(this.addr,e)}function tm(i,e){const t=Ji(e,this.size,2);i.uniform2fv(this.addr,t)}function nm(i,e){const t=Ji(e,this.size,3);i.uniform3fv(this.addr,t)}function im(i,e){const t=Ji(e,this.size,4);i.uniform4fv(this.addr,t)}function am(i,e){const t=Ji(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function rm(i,e){const t=Ji(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function sm(i,e){const t=Ji(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function om(i,e){i.uniform1iv(this.addr,e)}function lm(i,e){i.uniform2iv(this.addr,e)}function cm(i,e){i.uniform3iv(this.addr,e)}function um(i,e){i.uniform4iv(this.addr,e)}function dm(i,e){i.uniform1uiv(this.addr,e)}function hm(i,e){i.uniform2uiv(this.addr,e)}function fm(i,e){i.uniform3uiv(this.addr,e)}function pm(i,e){i.uniform4uiv(this.addr,e)}function mm(i,e,t){const n=this.cache,a=e.length,r=Ar(t,a);xt(n,r)||(i.uniform1iv(this.addr,r),Mt(n,r));for(let s=0;s!==a;++s)t.setTexture2D(e[s]||Bc,r[s])}function gm(i,e,t){const n=this.cache,a=e.length,r=Ar(t,a);xt(n,r)||(i.uniform1iv(this.addr,r),Mt(n,r));for(let s=0;s!==a;++s)t.setTexture3D(e[s]||kc,r[s])}function vm(i,e,t){const n=this.cache,a=e.length,r=Ar(t,a);xt(n,r)||(i.uniform1iv(this.addr,r),Mt(n,r));for(let s=0;s!==a;++s)t.setTextureCube(e[s]||Gc,r[s])}function _m(i,e,t){const n=this.cache,a=e.length,r=Ar(t,a);xt(n,r)||(i.uniform1iv(this.addr,r),Mt(n,r));for(let s=0;s!==a;++s)t.setTexture2DArray(e[s]||zc,r[s])}function xm(i){switch(i){case 5126:return em;case 35664:return tm;case 35665:return nm;case 35666:return im;case 35674:return am;case 35675:return rm;case 35676:return sm;case 5124:case 35670:return om;case 35667:case 35671:return lm;case 35668:case 35672:return cm;case 35669:case 35673:return um;case 5125:return dm;case 36294:return hm;case 36295:return fm;case 36296:return pm;case 35678:case 36198:case 36298:case 36306:case 35682:return mm;case 35679:case 36299:case 36307:return gm;case 35680:case 36300:case 36308:case 36293:return vm;case 36289:case 36303:case 36311:case 36292:return _m}}class Mm{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Qp(t.type)}}class Sm{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=xm(t.type)}}class ym{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const a=this.seq;for(let r=0,s=a.length;r!==s;++r){const o=a[r];o.setValue(e,t[o.id],n)}}}const ts=/(\w+)(\])?(\[|\.)?/g;function wl(i,e){i.seq.push(e),i.map[e.id]=e}function Em(i,e,t){const n=i.name,a=n.length;for(ts.lastIndex=0;;){const r=ts.exec(n),s=ts.lastIndex;let o=r[1];const l=r[2]==="]",u=r[3];if(l&&(o=o|0),u===void 0||u==="["&&s+2===a){wl(t,u===void 0?new Mm(o,i,e):new Sm(o,i,e));break}else{let f=t.map[o];f===void 0&&(f=new ym(o),wl(t,f)),t=f}}}class pr{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const r=e.getActiveUniform(t,a),s=e.getUniformLocation(t,r.name);Em(r,s,this)}}setValue(e,t,n,a){const r=this.map[t];r!==void 0&&r.setValue(e,n,a)}setOptional(e,t,n){const a=t[n];a!==void 0&&this.setValue(e,n,a)}static upload(e,t,n,a){for(let r=0,s=t.length;r!==s;++r){const o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,a)}}static seqWithValue(e,t){const n=[];for(let a=0,r=e.length;a!==r;++a){const s=e[a];s.id in t&&n.push(s)}return n}}function Al(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const bm=37297;let Tm=0;function wm(i,e){const t=i.split(`
`),n=[],a=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let s=a;s<r;s++){const o=s+1;n.push(`${o===e?">":" "} ${o}: ${t[s]}`)}return n.join(`
`)}const Cl=new Ne;function Am(i){We._getMatrix(Cl,We.workingColorSpace,i);const e=`mat3( ${Cl.elements.map(t=>t.toFixed(4))} )`;switch(We.getTransfer(i)){case Tr:return[e,"LinearTransferOETF"];case Ze:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Rl(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),a=i.getShaderInfoLog(e).trim();if(n&&a==="")return"";const r=/ERROR: 0:(\d+)/.exec(a);if(r){const s=parseInt(r[1]);return t.toUpperCase()+`

`+a+`

`+wm(i.getShaderSource(e),s)}else return a}function Cm(i,e){const t=Am(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Rm(i,e){let t;switch(e){case Iu:t="Linear";break;case Du:t="Reinhard";break;case Uu:t="Cineon";break;case dc:t="ACESFilmic";break;case Fu:t="AgX";break;case Ou:t="Neutral";break;case Nu:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const er=new P;function Pm(){We.getLuminanceCoefficients(er);const i=er.x.toFixed(4),e=er.y.toFixed(4),t=er.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Lm(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ha).join(`
`)}function Im(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Dm(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let a=0;a<n;a++){const r=i.getActiveAttrib(e,a),s=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[s]={type:r.type,location:i.getAttribLocation(e,s),locationSize:o}}return t}function ha(i){return i!==""}function Pl(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Ll(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Um=/^[ \t]*#include +<([\w\d./]+)>/gm;function ao(i){return i.replace(Um,Fm)}const Nm=new Map;function Fm(i,e){let t=Oe[e];if(t===void 0){const n=Nm.get(e);if(n!==void 0)t=Oe[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return ao(t)}const Om=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Il(i){return i.replace(Om,Bm)}function Bm(i,e,t,n){let a="";for(let r=parseInt(e);r<parseInt(t);r++)a+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return a}function Dl(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function zm(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===lc?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===cc?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===bn&&(e="SHADOWMAP_TYPE_VSM"),e}function km(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Vi:case Hi:e="ENVMAP_TYPE_CUBE";break;case br:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Gm(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Hi:e="ENVMAP_MODE_REFRACTION";break}return e}function Vm(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case uc:e="ENVMAP_BLENDING_MULTIPLY";break;case Pu:e="ENVMAP_BLENDING_MIX";break;case Lu:e="ENVMAP_BLENDING_ADD";break}return e}function Hm(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function Wm(i,e,t,n){const a=i.getContext(),r=t.defines;let s=t.vertexShader,o=t.fragmentShader;const l=zm(t),u=km(t),c=Gm(t),f=Vm(t),d=Hm(t),m=Lm(t),g=Im(r),v=a.createProgram();let p,h,E=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(ha).join(`
`),p.length>0&&(p+=`
`),h=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(ha).join(`
`),h.length>0&&(h+=`
`)):(p=[Dl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ha).join(`
`),h=[Dl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.envMap?"#define "+c:"",t.envMap?"#define "+f:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==qn?"#define TONE_MAPPING":"",t.toneMapping!==qn?Oe.tonemapping_pars_fragment:"",t.toneMapping!==qn?Rm("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Oe.colorspace_pars_fragment,Cm("linearToOutputTexel",t.outputColorSpace),Pm(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ha).join(`
`)),s=ao(s),s=Pl(s,t),s=Ll(s,t),o=ao(o),o=Pl(o,t),o=Ll(o,t),s=Il(s),o=Il(o),t.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,p=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,h=["#define varying in",t.glslVersion===Xo?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Xo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+h);const b=E+p+s,M=E+h+o,I=Al(a,a.VERTEX_SHADER,b),w=Al(a,a.FRAGMENT_SHADER,M);a.attachShader(v,I),a.attachShader(v,w),t.index0AttributeName!==void 0?a.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&a.bindAttribLocation(v,0,"position"),a.linkProgram(v);function A(C){if(i.debug.checkShaderErrors){const k=a.getProgramInfoLog(v).trim(),O=a.getShaderInfoLog(I).trim(),X=a.getShaderInfoLog(w).trim();let j=!0,H=!0;if(a.getProgramParameter(v,a.LINK_STATUS)===!1)if(j=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(a,v,I,w);else{const Z=Rl(a,I,"vertex"),G=Rl(a,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+a.getError()+" - VALIDATE_STATUS "+a.getProgramParameter(v,a.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+k+`
`+Z+`
`+G)}else k!==""?console.warn("THREE.WebGLProgram: Program Info Log:",k):(O===""||X==="")&&(H=!1);H&&(C.diagnostics={runnable:j,programLog:k,vertexShader:{log:O,prefix:p},fragmentShader:{log:X,prefix:h}})}a.deleteShader(I),a.deleteShader(w),R=new pr(a,v),y=Dm(a,v)}let R;this.getUniforms=function(){return R===void 0&&A(this),R};let y;this.getAttributes=function(){return y===void 0&&A(this),y};let x=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return x===!1&&(x=a.getProgramParameter(v,bm)),x},this.destroy=function(){n.releaseStatesOfProgram(this),a.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Tm++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=I,this.fragmentShader=w,this}let Xm=0;class qm{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,a=this._getShaderStage(t),r=this._getShaderStage(n),s=this._getShaderCacheForMaterial(e);return s.has(a)===!1&&(s.add(a),a.usedTimes++),s.has(r)===!1&&(s.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new jm(e),t.set(e,n)),n}}class jm{constructor(e){this.id=Xm++,this.code=e,this.usedTimes=0}}function Ym(i,e,t,n,a,r,s){const o=new go,l=new qm,u=new Set,c=[],f=a.logarithmicDepthBuffer,d=a.vertexTextures;let m=a.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(y){return u.add(y),y===0?"uv":`uv${y}`}function p(y,x,C,k,O){const X=k.fog,j=O.geometry,H=y.isMeshStandardMaterial?k.environment:null,Z=(y.isMeshStandardMaterial?t:e).get(y.envMap||H),G=Z&&Z.mapping===br?Z.image.height:null,ne=g[y.type];y.precision!==null&&(m=a.getMaxPrecision(y.precision),m!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",m,"instead."));const re=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,ge=re!==void 0?re.length:0;let Ce=0;j.morphAttributes.position!==void 0&&(Ce=1),j.morphAttributes.normal!==void 0&&(Ce=2),j.morphAttributes.color!==void 0&&(Ce=3);let Ve,W,J,he;if(ne){const $e=fn[ne];Ve=$e.vertexShader,W=$e.fragmentShader}else Ve=y.vertexShader,W=y.fragmentShader,l.update(y),J=l.getVertexShaderID(y),he=l.getFragmentShaderID(y);const Q=i.getRenderTarget(),Te=i.state.buffers.depth.getReversed(),Ae=O.isInstancedMesh===!0,Ie=O.isBatchedMesh===!0,Qe=!!y.map,Ge=!!y.matcap,at=!!Z,D=!!y.aoMap,At=!!y.lightMap,ze=!!y.bumpMap,ke=!!y.normalMap,be=!!y.displacementMap,Ye=!!y.emissiveMap,Ee=!!y.metalnessMap,T=!!y.roughnessMap,_=y.anisotropy>0,F=y.clearcoat>0,Y=y.dispersion>0,K=y.iridescence>0,q=y.sheen>0,me=y.transmission>0,ie=_&&!!y.anisotropyMap,oe=F&&!!y.clearcoatMap,ve=F&&!!y.clearcoatNormalMap,ee=F&&!!y.clearcoatRoughnessMap,fe=K&&!!y.iridescenceMap,we=K&&!!y.iridescenceThicknessMap,Re=q&&!!y.sheenColorMap,pe=q&&!!y.sheenRoughnessMap,He=!!y.specularMap,Fe=!!y.specularColorMap,tt=!!y.specularIntensityMap,L=me&&!!y.transmissionMap,se=me&&!!y.thicknessMap,V=!!y.gradientMap,$=!!y.alphaMap,ue=y.alphaTest>0,le=!!y.alphaHash,De=!!y.extensions;let ut=qn;y.toneMapped&&(Q===null||Q.isXRRenderTarget===!0)&&(ut=i.toneMapping);const Ct={shaderID:ne,shaderType:y.type,shaderName:y.name,vertexShader:Ve,fragmentShader:W,defines:y.defines,customVertexShaderID:J,customFragmentShaderID:he,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:m,batching:Ie,batchingColor:Ie&&O._colorsTexture!==null,instancing:Ae,instancingColor:Ae&&O.instanceColor!==null,instancingMorph:Ae&&O.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:Q===null?i.outputColorSpace:Q.isXRRenderTarget===!0?Q.texture.colorSpace:Ki,alphaToCoverage:!!y.alphaToCoverage,map:Qe,matcap:Ge,envMap:at,envMapMode:at&&Z.mapping,envMapCubeUVHeight:G,aoMap:D,lightMap:At,bumpMap:ze,normalMap:ke,displacementMap:d&&be,emissiveMap:Ye,normalMapObjectSpace:ke&&y.normalMapType===Gu,normalMapTangentSpace:ke&&y.normalMapType===Ec,metalnessMap:Ee,roughnessMap:T,anisotropy:_,anisotropyMap:ie,clearcoat:F,clearcoatMap:oe,clearcoatNormalMap:ve,clearcoatRoughnessMap:ee,dispersion:Y,iridescence:K,iridescenceMap:fe,iridescenceThicknessMap:we,sheen:q,sheenColorMap:Re,sheenRoughnessMap:pe,specularMap:He,specularColorMap:Fe,specularIntensityMap:tt,transmission:me,transmissionMap:L,thicknessMap:se,gradientMap:V,opaque:y.transparent===!1&&y.blending===Fi&&y.alphaToCoverage===!1,alphaMap:$,alphaTest:ue,alphaHash:le,combine:y.combine,mapUv:Qe&&v(y.map.channel),aoMapUv:D&&v(y.aoMap.channel),lightMapUv:At&&v(y.lightMap.channel),bumpMapUv:ze&&v(y.bumpMap.channel),normalMapUv:ke&&v(y.normalMap.channel),displacementMapUv:be&&v(y.displacementMap.channel),emissiveMapUv:Ye&&v(y.emissiveMap.channel),metalnessMapUv:Ee&&v(y.metalnessMap.channel),roughnessMapUv:T&&v(y.roughnessMap.channel),anisotropyMapUv:ie&&v(y.anisotropyMap.channel),clearcoatMapUv:oe&&v(y.clearcoatMap.channel),clearcoatNormalMapUv:ve&&v(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ee&&v(y.clearcoatRoughnessMap.channel),iridescenceMapUv:fe&&v(y.iridescenceMap.channel),iridescenceThicknessMapUv:we&&v(y.iridescenceThicknessMap.channel),sheenColorMapUv:Re&&v(y.sheenColorMap.channel),sheenRoughnessMapUv:pe&&v(y.sheenRoughnessMap.channel),specularMapUv:He&&v(y.specularMap.channel),specularColorMapUv:Fe&&v(y.specularColorMap.channel),specularIntensityMapUv:tt&&v(y.specularIntensityMap.channel),transmissionMapUv:L&&v(y.transmissionMap.channel),thicknessMapUv:se&&v(y.thicknessMap.channel),alphaMapUv:$&&v(y.alphaMap.channel),vertexTangents:!!j.attributes.tangent&&(ke||_),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!j.attributes.uv&&(Qe||$),fog:!!X,useFog:y.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:y.flatShading===!0,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:f,reverseDepthBuffer:Te,skinning:O.isSkinnedMesh===!0,morphTargets:j.morphAttributes.position!==void 0,morphNormals:j.morphAttributes.normal!==void 0,morphColors:j.morphAttributes.color!==void 0,morphTargetsCount:ge,morphTextureStride:Ce,numDirLights:x.directional.length,numPointLights:x.point.length,numSpotLights:x.spot.length,numSpotLightMaps:x.spotLightMap.length,numRectAreaLights:x.rectArea.length,numHemiLights:x.hemi.length,numDirLightShadows:x.directionalShadowMap.length,numPointLightShadows:x.pointShadowMap.length,numSpotLightShadows:x.spotShadowMap.length,numSpotLightShadowsWithMaps:x.numSpotLightShadowsWithMaps,numLightProbes:x.numLightProbes,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:y.dithering,shadowMapEnabled:i.shadowMap.enabled&&C.length>0,shadowMapType:i.shadowMap.type,toneMapping:ut,decodeVideoTexture:Qe&&y.map.isVideoTexture===!0&&We.getTransfer(y.map.colorSpace)===Ze,decodeVideoTextureEmissive:Ye&&y.emissiveMap.isVideoTexture===!0&&We.getTransfer(y.emissiveMap.colorSpace)===Ze,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===Ut,flipSided:y.side===gt,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:De&&y.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(De&&y.extensions.multiDraw===!0||Ie)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return Ct.vertexUv1s=u.has(1),Ct.vertexUv2s=u.has(2),Ct.vertexUv3s=u.has(3),u.clear(),Ct}function h(y){const x=[];if(y.shaderID?x.push(y.shaderID):(x.push(y.customVertexShaderID),x.push(y.customFragmentShaderID)),y.defines!==void 0)for(const C in y.defines)x.push(C),x.push(y.defines[C]);return y.isRawShaderMaterial===!1&&(E(x,y),b(x,y),x.push(i.outputColorSpace)),x.push(y.customProgramCacheKey),x.join()}function E(y,x){y.push(x.precision),y.push(x.outputColorSpace),y.push(x.envMapMode),y.push(x.envMapCubeUVHeight),y.push(x.mapUv),y.push(x.alphaMapUv),y.push(x.lightMapUv),y.push(x.aoMapUv),y.push(x.bumpMapUv),y.push(x.normalMapUv),y.push(x.displacementMapUv),y.push(x.emissiveMapUv),y.push(x.metalnessMapUv),y.push(x.roughnessMapUv),y.push(x.anisotropyMapUv),y.push(x.clearcoatMapUv),y.push(x.clearcoatNormalMapUv),y.push(x.clearcoatRoughnessMapUv),y.push(x.iridescenceMapUv),y.push(x.iridescenceThicknessMapUv),y.push(x.sheenColorMapUv),y.push(x.sheenRoughnessMapUv),y.push(x.specularMapUv),y.push(x.specularColorMapUv),y.push(x.specularIntensityMapUv),y.push(x.transmissionMapUv),y.push(x.thicknessMapUv),y.push(x.combine),y.push(x.fogExp2),y.push(x.sizeAttenuation),y.push(x.morphTargetsCount),y.push(x.morphAttributeCount),y.push(x.numDirLights),y.push(x.numPointLights),y.push(x.numSpotLights),y.push(x.numSpotLightMaps),y.push(x.numHemiLights),y.push(x.numRectAreaLights),y.push(x.numDirLightShadows),y.push(x.numPointLightShadows),y.push(x.numSpotLightShadows),y.push(x.numSpotLightShadowsWithMaps),y.push(x.numLightProbes),y.push(x.shadowMapType),y.push(x.toneMapping),y.push(x.numClippingPlanes),y.push(x.numClipIntersection),y.push(x.depthPacking)}function b(y,x){o.disableAll(),x.supportsVertexTextures&&o.enable(0),x.instancing&&o.enable(1),x.instancingColor&&o.enable(2),x.instancingMorph&&o.enable(3),x.matcap&&o.enable(4),x.envMap&&o.enable(5),x.normalMapObjectSpace&&o.enable(6),x.normalMapTangentSpace&&o.enable(7),x.clearcoat&&o.enable(8),x.iridescence&&o.enable(9),x.alphaTest&&o.enable(10),x.vertexColors&&o.enable(11),x.vertexAlphas&&o.enable(12),x.vertexUv1s&&o.enable(13),x.vertexUv2s&&o.enable(14),x.vertexUv3s&&o.enable(15),x.vertexTangents&&o.enable(16),x.anisotropy&&o.enable(17),x.alphaHash&&o.enable(18),x.batching&&o.enable(19),x.dispersion&&o.enable(20),x.batchingColor&&o.enable(21),y.push(o.mask),o.disableAll(),x.fog&&o.enable(0),x.useFog&&o.enable(1),x.flatShading&&o.enable(2),x.logarithmicDepthBuffer&&o.enable(3),x.reverseDepthBuffer&&o.enable(4),x.skinning&&o.enable(5),x.morphTargets&&o.enable(6),x.morphNormals&&o.enable(7),x.morphColors&&o.enable(8),x.premultipliedAlpha&&o.enable(9),x.shadowMapEnabled&&o.enable(10),x.doubleSided&&o.enable(11),x.flipSided&&o.enable(12),x.useDepthPacking&&o.enable(13),x.dithering&&o.enable(14),x.transmission&&o.enable(15),x.sheen&&o.enable(16),x.opaque&&o.enable(17),x.pointsUvs&&o.enable(18),x.decodeVideoTexture&&o.enable(19),x.decodeVideoTextureEmissive&&o.enable(20),x.alphaToCoverage&&o.enable(21),y.push(o.mask)}function M(y){const x=g[y.type];let C;if(x){const k=fn[x];C=Yn.clone(k.uniforms)}else C=y.uniforms;return C}function I(y,x){let C;for(let k=0,O=c.length;k<O;k++){const X=c[k];if(X.cacheKey===x){C=X,++C.usedTimes;break}}return C===void 0&&(C=new Wm(i,x,y,r),c.push(C)),C}function w(y){if(--y.usedTimes===0){const x=c.indexOf(y);c[x]=c[c.length-1],c.pop(),y.destroy()}}function A(y){l.remove(y)}function R(){l.dispose()}return{getParameters:p,getProgramCacheKey:h,getUniforms:M,acquireProgram:I,releaseProgram:w,releaseShaderCache:A,programs:c,dispose:R}}function $m(){let i=new WeakMap;function e(s){return i.has(s)}function t(s){let o=i.get(s);return o===void 0&&(o={},i.set(s,o)),o}function n(s){i.delete(s)}function a(s,o,l){i.get(s)[o]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:a,dispose:r}}function Km(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function Ul(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Nl(){const i=[];let e=0;const t=[],n=[],a=[];function r(){e=0,t.length=0,n.length=0,a.length=0}function s(f,d,m,g,v,p){let h=i[e];return h===void 0?(h={id:f.id,object:f,geometry:d,material:m,groupOrder:g,renderOrder:f.renderOrder,z:v,group:p},i[e]=h):(h.id=f.id,h.object=f,h.geometry=d,h.material=m,h.groupOrder=g,h.renderOrder=f.renderOrder,h.z=v,h.group=p),e++,h}function o(f,d,m,g,v,p){const h=s(f,d,m,g,v,p);m.transmission>0?n.push(h):m.transparent===!0?a.push(h):t.push(h)}function l(f,d,m,g,v,p){const h=s(f,d,m,g,v,p);m.transmission>0?n.unshift(h):m.transparent===!0?a.unshift(h):t.unshift(h)}function u(f,d){t.length>1&&t.sort(f||Km),n.length>1&&n.sort(d||Ul),a.length>1&&a.sort(d||Ul)}function c(){for(let f=e,d=i.length;f<d;f++){const m=i[f];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:n,transparent:a,init:r,push:o,unshift:l,finish:c,sort:u}}function Zm(){let i=new WeakMap;function e(n,a){const r=i.get(n);let s;return r===void 0?(s=new Nl,i.set(n,[s])):a>=r.length?(s=new Nl,r.push(s)):s=r[a],s}function t(){i=new WeakMap}return{get:e,dispose:t}}function Jm(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new P,color:new de};break;case"SpotLight":t={position:new P,direction:new P,color:new de,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new P,color:new de,distance:0,decay:0};break;case"HemisphereLight":t={direction:new P,skyColor:new de,groundColor:new de};break;case"RectAreaLight":t={color:new de,position:new P,halfWidth:new P,halfHeight:new P};break}return i[e.id]=t,t}}}function Qm(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ye};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ye};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ye,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let eg=0;function tg(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function ng(i){const e=new Jm,t=Qm(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)n.probe.push(new P);const a=new P,r=new et,s=new et;function o(u){let c=0,f=0,d=0;for(let y=0;y<9;y++)n.probe[y].set(0,0,0);let m=0,g=0,v=0,p=0,h=0,E=0,b=0,M=0,I=0,w=0,A=0;u.sort(tg);for(let y=0,x=u.length;y<x;y++){const C=u[y],k=C.color,O=C.intensity,X=C.distance,j=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)c+=k.r*O,f+=k.g*O,d+=k.b*O;else if(C.isLightProbe){for(let H=0;H<9;H++)n.probe[H].addScaledVector(C.sh.coefficients[H],O);A++}else if(C.isDirectionalLight){const H=e.get(C);if(H.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const Z=C.shadow,G=t.get(C);G.shadowIntensity=Z.intensity,G.shadowBias=Z.bias,G.shadowNormalBias=Z.normalBias,G.shadowRadius=Z.radius,G.shadowMapSize=Z.mapSize,n.directionalShadow[m]=G,n.directionalShadowMap[m]=j,n.directionalShadowMatrix[m]=C.shadow.matrix,E++}n.directional[m]=H,m++}else if(C.isSpotLight){const H=e.get(C);H.position.setFromMatrixPosition(C.matrixWorld),H.color.copy(k).multiplyScalar(O),H.distance=X,H.coneCos=Math.cos(C.angle),H.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),H.decay=C.decay,n.spot[v]=H;const Z=C.shadow;if(C.map&&(n.spotLightMap[I]=C.map,I++,Z.updateMatrices(C),C.castShadow&&w++),n.spotLightMatrix[v]=Z.matrix,C.castShadow){const G=t.get(C);G.shadowIntensity=Z.intensity,G.shadowBias=Z.bias,G.shadowNormalBias=Z.normalBias,G.shadowRadius=Z.radius,G.shadowMapSize=Z.mapSize,n.spotShadow[v]=G,n.spotShadowMap[v]=j,M++}v++}else if(C.isRectAreaLight){const H=e.get(C);H.color.copy(k).multiplyScalar(O),H.halfWidth.set(C.width*.5,0,0),H.halfHeight.set(0,C.height*.5,0),n.rectArea[p]=H,p++}else if(C.isPointLight){const H=e.get(C);if(H.color.copy(C.color).multiplyScalar(C.intensity),H.distance=C.distance,H.decay=C.decay,C.castShadow){const Z=C.shadow,G=t.get(C);G.shadowIntensity=Z.intensity,G.shadowBias=Z.bias,G.shadowNormalBias=Z.normalBias,G.shadowRadius=Z.radius,G.shadowMapSize=Z.mapSize,G.shadowCameraNear=Z.camera.near,G.shadowCameraFar=Z.camera.far,n.pointShadow[g]=G,n.pointShadowMap[g]=j,n.pointShadowMatrix[g]=C.shadow.matrix,b++}n.point[g]=H,g++}else if(C.isHemisphereLight){const H=e.get(C);H.skyColor.copy(C.color).multiplyScalar(O),H.groundColor.copy(C.groundColor).multiplyScalar(O),n.hemi[h]=H,h++}}p>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ae.LTC_FLOAT_1,n.rectAreaLTC2=ae.LTC_FLOAT_2):(n.rectAreaLTC1=ae.LTC_HALF_1,n.rectAreaLTC2=ae.LTC_HALF_2)),n.ambient[0]=c,n.ambient[1]=f,n.ambient[2]=d;const R=n.hash;(R.directionalLength!==m||R.pointLength!==g||R.spotLength!==v||R.rectAreaLength!==p||R.hemiLength!==h||R.numDirectionalShadows!==E||R.numPointShadows!==b||R.numSpotShadows!==M||R.numSpotMaps!==I||R.numLightProbes!==A)&&(n.directional.length=m,n.spot.length=v,n.rectArea.length=p,n.point.length=g,n.hemi.length=h,n.directionalShadow.length=E,n.directionalShadowMap.length=E,n.pointShadow.length=b,n.pointShadowMap.length=b,n.spotShadow.length=M,n.spotShadowMap.length=M,n.directionalShadowMatrix.length=E,n.pointShadowMatrix.length=b,n.spotLightMatrix.length=M+I-w,n.spotLightMap.length=I,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=A,R.directionalLength=m,R.pointLength=g,R.spotLength=v,R.rectAreaLength=p,R.hemiLength=h,R.numDirectionalShadows=E,R.numPointShadows=b,R.numSpotShadows=M,R.numSpotMaps=I,R.numLightProbes=A,n.version=eg++)}function l(u,c){let f=0,d=0,m=0,g=0,v=0;const p=c.matrixWorldInverse;for(let h=0,E=u.length;h<E;h++){const b=u[h];if(b.isDirectionalLight){const M=n.directional[f];M.direction.setFromMatrixPosition(b.matrixWorld),a.setFromMatrixPosition(b.target.matrixWorld),M.direction.sub(a),M.direction.transformDirection(p),f++}else if(b.isSpotLight){const M=n.spot[m];M.position.setFromMatrixPosition(b.matrixWorld),M.position.applyMatrix4(p),M.direction.setFromMatrixPosition(b.matrixWorld),a.setFromMatrixPosition(b.target.matrixWorld),M.direction.sub(a),M.direction.transformDirection(p),m++}else if(b.isRectAreaLight){const M=n.rectArea[g];M.position.setFromMatrixPosition(b.matrixWorld),M.position.applyMatrix4(p),s.identity(),r.copy(b.matrixWorld),r.premultiply(p),s.extractRotation(r),M.halfWidth.set(b.width*.5,0,0),M.halfHeight.set(0,b.height*.5,0),M.halfWidth.applyMatrix4(s),M.halfHeight.applyMatrix4(s),g++}else if(b.isPointLight){const M=n.point[d];M.position.setFromMatrixPosition(b.matrixWorld),M.position.applyMatrix4(p),d++}else if(b.isHemisphereLight){const M=n.hemi[v];M.direction.setFromMatrixPosition(b.matrixWorld),M.direction.transformDirection(p),v++}}}return{setup:o,setupView:l,state:n}}function Fl(i){const e=new ng(i),t=[],n=[];function a(c){u.camera=c,t.length=0,n.length=0}function r(c){t.push(c)}function s(c){n.push(c)}function o(){e.setup(t)}function l(c){e.setupView(t,c)}const u={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:a,state:u,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:s}}function ig(i){let e=new WeakMap;function t(a,r=0){const s=e.get(a);let o;return s===void 0?(o=new Fl(i),e.set(a,[o])):r>=s.length?(o=new Fl(i),s.push(o)):o=s[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}class ag extends Kn{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=zu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class rg extends Kn{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const sg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,og=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function lg(i,e,t){let n=new vo;const a=new ye,r=new ye,s=new Je,o=new ag({depthPacking:ku}),l=new rg,u={},c=t.maxTextureSize,f={[jn]:gt,[gt]:jn,[Ut]:Ut},d=new it({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ye},radius:{value:4}},vertexShader:sg,fragmentShader:og}),m=d.clone();m.defines.HORIZONTAL_PASS=1;const g=new vt;g.setAttribute("position",new bt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Be(g,d),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=lc;let h=this.type;this.render=function(w,A,R){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||w.length===0)return;const y=i.getRenderTarget(),x=i.getActiveCubeFace(),C=i.getActiveMipmapLevel(),k=i.state;k.setBlending(Rn),k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);const O=h!==bn&&this.type===bn,X=h===bn&&this.type!==bn;for(let j=0,H=w.length;j<H;j++){const Z=w[j],G=Z.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",Z,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;a.copy(G.mapSize);const ne=G.getFrameExtents();if(a.multiply(ne),r.copy(G.mapSize),(a.x>c||a.y>c)&&(a.x>c&&(r.x=Math.floor(c/ne.x),a.x=r.x*ne.x,G.mapSize.x=r.x),a.y>c&&(r.y=Math.floor(c/ne.y),a.y=r.y*ne.y,G.mapSize.y=r.y)),G.map===null||O===!0||X===!0){const ge=this.type!==bn?{minFilter:cn,magFilter:cn}:{};G.map!==null&&G.map.dispose(),G.map=new un(a.x,a.y,ge),G.map.texture.name=Z.name+".shadowMap",G.camera.updateProjectionMatrix()}i.setRenderTarget(G.map),i.clear();const re=G.getViewportCount();for(let ge=0;ge<re;ge++){const Ce=G.getViewport(ge);s.set(r.x*Ce.x,r.y*Ce.y,r.x*Ce.z,r.y*Ce.w),k.viewport(s),G.updateMatrices(Z,ge),n=G.getFrustum(),M(A,R,G.camera,Z,this.type)}G.isPointLightShadow!==!0&&this.type===bn&&E(G,R),G.needsUpdate=!1}h=this.type,p.needsUpdate=!1,i.setRenderTarget(y,x,C)};function E(w,A){const R=e.update(v);d.defines.VSM_SAMPLES!==w.blurSamples&&(d.defines.VSM_SAMPLES=w.blurSamples,m.defines.VSM_SAMPLES=w.blurSamples,d.needsUpdate=!0,m.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new un(a.x,a.y)),d.uniforms.shadow_pass.value=w.map.texture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(A,null,R,d,v,null),m.uniforms.shadow_pass.value=w.mapPass.texture,m.uniforms.resolution.value=w.mapSize,m.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(A,null,R,m,v,null)}function b(w,A,R,y){let x=null;const C=R.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(C!==void 0)x=C;else if(x=R.isPointLight===!0?l:o,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const k=x.uuid,O=A.uuid;let X=u[k];X===void 0&&(X={},u[k]=X);let j=X[O];j===void 0&&(j=x.clone(),X[O]=j,A.addEventListener("dispose",I)),x=j}if(x.visible=A.visible,x.wireframe=A.wireframe,y===bn?x.side=A.shadowSide!==null?A.shadowSide:A.side:x.side=A.shadowSide!==null?A.shadowSide:f[A.side],x.alphaMap=A.alphaMap,x.alphaTest=A.alphaTest,x.map=A.map,x.clipShadows=A.clipShadows,x.clippingPlanes=A.clippingPlanes,x.clipIntersection=A.clipIntersection,x.displacementMap=A.displacementMap,x.displacementScale=A.displacementScale,x.displacementBias=A.displacementBias,x.wireframeLinewidth=A.wireframeLinewidth,x.linewidth=A.linewidth,R.isPointLight===!0&&x.isMeshDistanceMaterial===!0){const k=i.properties.get(x);k.light=R}return x}function M(w,A,R,y,x){if(w.visible===!1)return;if(w.layers.test(A.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&x===bn)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,w.matrixWorld);const O=e.update(w),X=w.material;if(Array.isArray(X)){const j=O.groups;for(let H=0,Z=j.length;H<Z;H++){const G=j[H],ne=X[G.materialIndex];if(ne&&ne.visible){const re=b(w,ne,y,x);w.onBeforeShadow(i,w,A,R,O,re,G),i.renderBufferDirect(R,null,O,re,w,G),w.onAfterShadow(i,w,A,R,O,re,G)}}}else if(X.visible){const j=b(w,X,y,x);w.onBeforeShadow(i,w,A,R,O,j,null),i.renderBufferDirect(R,null,O,j,w,null),w.onAfterShadow(i,w,A,R,O,j,null)}}const k=w.children;for(let O=0,X=k.length;O<X;O++)M(k[O],A,R,y,x)}function I(w){w.target.removeEventListener("dispose",I);for(const R in u){const y=u[R],x=w.target.uuid;x in y&&(y[x].dispose(),delete y[x])}}}const cg={[Ms]:Ss,[ys]:Ts,[Es]:ws,[Gi]:bs,[Ss]:Ms,[Ts]:ys,[ws]:Es,[bs]:Gi};function ug(i,e){function t(){let L=!1;const se=new Je;let V=null;const $=new Je(0,0,0,0);return{setMask:function(ue){V!==ue&&!L&&(i.colorMask(ue,ue,ue,ue),V=ue)},setLocked:function(ue){L=ue},setClear:function(ue,le,De,ut,Ct){Ct===!0&&(ue*=ut,le*=ut,De*=ut),se.set(ue,le,De,ut),$.equals(se)===!1&&(i.clearColor(ue,le,De,ut),$.copy(se))},reset:function(){L=!1,V=null,$.set(-1,0,0,0)}}}function n(){let L=!1,se=!1,V=null,$=null,ue=null;return{setReversed:function(le){if(se!==le){const De=e.get("EXT_clip_control");se?De.clipControlEXT(De.LOWER_LEFT_EXT,De.ZERO_TO_ONE_EXT):De.clipControlEXT(De.LOWER_LEFT_EXT,De.NEGATIVE_ONE_TO_ONE_EXT);const ut=ue;ue=null,this.setClear(ut)}se=le},getReversed:function(){return se},setTest:function(le){le?Q(i.DEPTH_TEST):Te(i.DEPTH_TEST)},setMask:function(le){V!==le&&!L&&(i.depthMask(le),V=le)},setFunc:function(le){if(se&&(le=cg[le]),$!==le){switch(le){case Ms:i.depthFunc(i.NEVER);break;case Ss:i.depthFunc(i.ALWAYS);break;case ys:i.depthFunc(i.LESS);break;case Gi:i.depthFunc(i.LEQUAL);break;case Es:i.depthFunc(i.EQUAL);break;case bs:i.depthFunc(i.GEQUAL);break;case Ts:i.depthFunc(i.GREATER);break;case ws:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}$=le}},setLocked:function(le){L=le},setClear:function(le){ue!==le&&(se&&(le=1-le),i.clearDepth(le),ue=le)},reset:function(){L=!1,V=null,$=null,ue=null,se=!1}}}function a(){let L=!1,se=null,V=null,$=null,ue=null,le=null,De=null,ut=null,Ct=null;return{setTest:function($e){L||($e?Q(i.STENCIL_TEST):Te(i.STENCIL_TEST))},setMask:function($e){se!==$e&&!L&&(i.stencilMask($e),se=$e)},setFunc:function($e,Qt,vn){(V!==$e||$!==Qt||ue!==vn)&&(i.stencilFunc($e,Qt,vn),V=$e,$=Qt,ue=vn)},setOp:function($e,Qt,vn){(le!==$e||De!==Qt||ut!==vn)&&(i.stencilOp($e,Qt,vn),le=$e,De=Qt,ut=vn)},setLocked:function($e){L=$e},setClear:function($e){Ct!==$e&&(i.clearStencil($e),Ct=$e)},reset:function(){L=!1,se=null,V=null,$=null,ue=null,le=null,De=null,ut=null,Ct=null}}}const r=new t,s=new n,o=new a,l=new WeakMap,u=new WeakMap;let c={},f={},d=new WeakMap,m=[],g=null,v=!1,p=null,h=null,E=null,b=null,M=null,I=null,w=null,A=new de(0,0,0),R=0,y=!1,x=null,C=null,k=null,O=null,X=null;const j=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let H=!1,Z=0;const G=i.getParameter(i.VERSION);G.indexOf("WebGL")!==-1?(Z=parseFloat(/^WebGL (\d)/.exec(G)[1]),H=Z>=1):G.indexOf("OpenGL ES")!==-1&&(Z=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),H=Z>=2);let ne=null,re={};const ge=i.getParameter(i.SCISSOR_BOX),Ce=i.getParameter(i.VIEWPORT),Ve=new Je().fromArray(ge),W=new Je().fromArray(Ce);function J(L,se,V,$){const ue=new Uint8Array(4),le=i.createTexture();i.bindTexture(L,le),i.texParameteri(L,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(L,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let De=0;De<V;De++)L===i.TEXTURE_3D||L===i.TEXTURE_2D_ARRAY?i.texImage3D(se,0,i.RGBA,1,1,$,0,i.RGBA,i.UNSIGNED_BYTE,ue):i.texImage2D(se+De,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ue);return le}const he={};he[i.TEXTURE_2D]=J(i.TEXTURE_2D,i.TEXTURE_2D,1),he[i.TEXTURE_CUBE_MAP]=J(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),he[i.TEXTURE_2D_ARRAY]=J(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),he[i.TEXTURE_3D]=J(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),s.setClear(1),o.setClear(0),Q(i.DEPTH_TEST),s.setFunc(Gi),ze(!1),ke(Go),Q(i.CULL_FACE),D(Rn);function Q(L){c[L]!==!0&&(i.enable(L),c[L]=!0)}function Te(L){c[L]!==!1&&(i.disable(L),c[L]=!1)}function Ae(L,se){return f[L]!==se?(i.bindFramebuffer(L,se),f[L]=se,L===i.DRAW_FRAMEBUFFER&&(f[i.FRAMEBUFFER]=se),L===i.FRAMEBUFFER&&(f[i.DRAW_FRAMEBUFFER]=se),!0):!1}function Ie(L,se){let V=m,$=!1;if(L){V=d.get(se),V===void 0&&(V=[],d.set(se,V));const ue=L.textures;if(V.length!==ue.length||V[0]!==i.COLOR_ATTACHMENT0){for(let le=0,De=ue.length;le<De;le++)V[le]=i.COLOR_ATTACHMENT0+le;V.length=ue.length,$=!0}}else V[0]!==i.BACK&&(V[0]=i.BACK,$=!0);$&&i.drawBuffers(V)}function Qe(L){return g!==L?(i.useProgram(L),g=L,!0):!1}const Ge={[ci]:i.FUNC_ADD,[fu]:i.FUNC_SUBTRACT,[pu]:i.FUNC_REVERSE_SUBTRACT};Ge[mu]=i.MIN,Ge[gu]=i.MAX;const at={[vu]:i.ZERO,[_u]:i.ONE,[xu]:i.SRC_COLOR,[_s]:i.SRC_ALPHA,[Tu]:i.SRC_ALPHA_SATURATE,[Eu]:i.DST_COLOR,[Su]:i.DST_ALPHA,[Mu]:i.ONE_MINUS_SRC_COLOR,[xs]:i.ONE_MINUS_SRC_ALPHA,[bu]:i.ONE_MINUS_DST_COLOR,[yu]:i.ONE_MINUS_DST_ALPHA,[wu]:i.CONSTANT_COLOR,[Au]:i.ONE_MINUS_CONSTANT_COLOR,[Cu]:i.CONSTANT_ALPHA,[Ru]:i.ONE_MINUS_CONSTANT_ALPHA};function D(L,se,V,$,ue,le,De,ut,Ct,$e){if(L===Rn){v===!0&&(Te(i.BLEND),v=!1);return}if(v===!1&&(Q(i.BLEND),v=!0),L!==hu){if(L!==p||$e!==y){if((h!==ci||M!==ci)&&(i.blendEquation(i.FUNC_ADD),h=ci,M=ci),$e)switch(L){case Fi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Nt:i.blendFunc(i.ONE,i.ONE);break;case Vo:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Ho:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}else switch(L){case Fi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Nt:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Vo:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Ho:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}E=null,b=null,I=null,w=null,A.set(0,0,0),R=0,p=L,y=$e}return}ue=ue||se,le=le||V,De=De||$,(se!==h||ue!==M)&&(i.blendEquationSeparate(Ge[se],Ge[ue]),h=se,M=ue),(V!==E||$!==b||le!==I||De!==w)&&(i.blendFuncSeparate(at[V],at[$],at[le],at[De]),E=V,b=$,I=le,w=De),(ut.equals(A)===!1||Ct!==R)&&(i.blendColor(ut.r,ut.g,ut.b,Ct),A.copy(ut),R=Ct),p=L,y=!1}function At(L,se){L.side===Ut?Te(i.CULL_FACE):Q(i.CULL_FACE);let V=L.side===gt;se&&(V=!V),ze(V),L.blending===Fi&&L.transparent===!1?D(Rn):D(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),s.setFunc(L.depthFunc),s.setTest(L.depthTest),s.setMask(L.depthWrite),r.setMask(L.colorWrite);const $=L.stencilWrite;o.setTest($),$&&(o.setMask(L.stencilWriteMask),o.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),o.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),Ye(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?Q(i.SAMPLE_ALPHA_TO_COVERAGE):Te(i.SAMPLE_ALPHA_TO_COVERAGE)}function ze(L){x!==L&&(L?i.frontFace(i.CW):i.frontFace(i.CCW),x=L)}function ke(L){L!==uu?(Q(i.CULL_FACE),L!==C&&(L===Go?i.cullFace(i.BACK):L===du?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Te(i.CULL_FACE),C=L}function be(L){L!==k&&(H&&i.lineWidth(L),k=L)}function Ye(L,se,V){L?(Q(i.POLYGON_OFFSET_FILL),(O!==se||X!==V)&&(i.polygonOffset(se,V),O=se,X=V)):Te(i.POLYGON_OFFSET_FILL)}function Ee(L){L?Q(i.SCISSOR_TEST):Te(i.SCISSOR_TEST)}function T(L){L===void 0&&(L=i.TEXTURE0+j-1),ne!==L&&(i.activeTexture(L),ne=L)}function _(L,se,V){V===void 0&&(ne===null?V=i.TEXTURE0+j-1:V=ne);let $=re[V];$===void 0&&($={type:void 0,texture:void 0},re[V]=$),($.type!==L||$.texture!==se)&&(ne!==V&&(i.activeTexture(V),ne=V),i.bindTexture(L,se||he[L]),$.type=L,$.texture=se)}function F(){const L=re[ne];L!==void 0&&L.type!==void 0&&(i.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function Y(){try{i.compressedTexImage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function K(){try{i.compressedTexImage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function q(){try{i.texSubImage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function me(){try{i.texSubImage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ie(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function oe(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ve(){try{i.texStorage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ee(){try{i.texStorage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function fe(){try{i.texImage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function we(){try{i.texImage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Re(L){Ve.equals(L)===!1&&(i.scissor(L.x,L.y,L.z,L.w),Ve.copy(L))}function pe(L){W.equals(L)===!1&&(i.viewport(L.x,L.y,L.z,L.w),W.copy(L))}function He(L,se){let V=u.get(se);V===void 0&&(V=new WeakMap,u.set(se,V));let $=V.get(L);$===void 0&&($=i.getUniformBlockIndex(se,L.name),V.set(L,$))}function Fe(L,se){const $=u.get(se).get(L);l.get(se)!==$&&(i.uniformBlockBinding(se,$,L.__bindingPointIndex),l.set(se,$))}function tt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),s.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),c={},ne=null,re={},f={},d=new WeakMap,m=[],g=null,v=!1,p=null,h=null,E=null,b=null,M=null,I=null,w=null,A=new de(0,0,0),R=0,y=!1,x=null,C=null,k=null,O=null,X=null,Ve.set(0,0,i.canvas.width,i.canvas.height),W.set(0,0,i.canvas.width,i.canvas.height),r.reset(),s.reset(),o.reset()}return{buffers:{color:r,depth:s,stencil:o},enable:Q,disable:Te,bindFramebuffer:Ae,drawBuffers:Ie,useProgram:Qe,setBlending:D,setMaterial:At,setFlipSided:ze,setCullFace:ke,setLineWidth:be,setPolygonOffset:Ye,setScissorTest:Ee,activeTexture:T,bindTexture:_,unbindTexture:F,compressedTexImage2D:Y,compressedTexImage3D:K,texImage2D:fe,texImage3D:we,updateUBOMapping:He,uniformBlockBinding:Fe,texStorage2D:ve,texStorage3D:ee,texSubImage2D:q,texSubImage3D:me,compressedTexSubImage2D:ie,compressedTexSubImage3D:oe,scissor:Re,viewport:pe,reset:tt}}function Ol(i,e,t,n){const a=dg(n);switch(t){case gc:return i*e;case _c:return i*e;case xc:return i*e*2;case Mc:return i*e/a.components*a.byteLength;case ho:return i*e/a.components*a.byteLength;case Sc:return i*e*2/a.components*a.byteLength;case fo:return i*e*2/a.components*a.byteLength;case vc:return i*e*3/a.components*a.byteLength;case ln:return i*e*4/a.components*a.byteLength;case po:return i*e*4/a.components*a.byteLength;case cr:case ur:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case dr:case hr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Is:case Us:return Math.max(i,16)*Math.max(e,8)/4;case Ls:case Ds:return Math.max(i,8)*Math.max(e,8)/2;case Ns:case Fs:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Os:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Bs:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case zs:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case ks:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Gs:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Vs:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Hs:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Ws:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Xs:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case qs:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case js:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Ys:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case $s:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Ks:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Zs:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case fr:case Js:case Qs:return Math.ceil(i/4)*Math.ceil(e/4)*16;case yc:case eo:return Math.ceil(i/4)*Math.ceil(e/4)*8;case to:case no:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function dg(i){switch(i){case Nn:case fc:return{byteLength:1,components:1};case _a:case pc:case Pn:return{byteLength:2,components:1};case co:case uo:return{byteLength:2,components:4};case fi:case lo:case An:return{byteLength:4,components:1};case mc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function hg(i,e,t,n,a,r,s){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),u=new ye,c=new WeakMap;let f;const d=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(T,_){return m?new OffscreenCanvas(T,_):_r("canvas")}function v(T,_,F){let Y=1;const K=Ee(T);if((K.width>F||K.height>F)&&(Y=F/Math.max(K.width,K.height)),Y<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){const q=Math.floor(Y*K.width),me=Math.floor(Y*K.height);f===void 0&&(f=g(q,me));const ie=_?g(q,me):f;return ie.width=q,ie.height=me,ie.getContext("2d").drawImage(T,0,0,q,me),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+q+"x"+me+")."),ie}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),T;return T}function p(T){return T.generateMipmaps}function h(T){i.generateMipmap(T)}function E(T){return T.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?i.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function b(T,_,F,Y,K=!1){if(T!==null){if(i[T]!==void 0)return i[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let q=_;if(_===i.RED&&(F===i.FLOAT&&(q=i.R32F),F===i.HALF_FLOAT&&(q=i.R16F),F===i.UNSIGNED_BYTE&&(q=i.R8)),_===i.RED_INTEGER&&(F===i.UNSIGNED_BYTE&&(q=i.R8UI),F===i.UNSIGNED_SHORT&&(q=i.R16UI),F===i.UNSIGNED_INT&&(q=i.R32UI),F===i.BYTE&&(q=i.R8I),F===i.SHORT&&(q=i.R16I),F===i.INT&&(q=i.R32I)),_===i.RG&&(F===i.FLOAT&&(q=i.RG32F),F===i.HALF_FLOAT&&(q=i.RG16F),F===i.UNSIGNED_BYTE&&(q=i.RG8)),_===i.RG_INTEGER&&(F===i.UNSIGNED_BYTE&&(q=i.RG8UI),F===i.UNSIGNED_SHORT&&(q=i.RG16UI),F===i.UNSIGNED_INT&&(q=i.RG32UI),F===i.BYTE&&(q=i.RG8I),F===i.SHORT&&(q=i.RG16I),F===i.INT&&(q=i.RG32I)),_===i.RGB_INTEGER&&(F===i.UNSIGNED_BYTE&&(q=i.RGB8UI),F===i.UNSIGNED_SHORT&&(q=i.RGB16UI),F===i.UNSIGNED_INT&&(q=i.RGB32UI),F===i.BYTE&&(q=i.RGB8I),F===i.SHORT&&(q=i.RGB16I),F===i.INT&&(q=i.RGB32I)),_===i.RGBA_INTEGER&&(F===i.UNSIGNED_BYTE&&(q=i.RGBA8UI),F===i.UNSIGNED_SHORT&&(q=i.RGBA16UI),F===i.UNSIGNED_INT&&(q=i.RGBA32UI),F===i.BYTE&&(q=i.RGBA8I),F===i.SHORT&&(q=i.RGBA16I),F===i.INT&&(q=i.RGBA32I)),_===i.RGB&&F===i.UNSIGNED_INT_5_9_9_9_REV&&(q=i.RGB9_E5),_===i.RGBA){const me=K?Tr:We.getTransfer(Y);F===i.FLOAT&&(q=i.RGBA32F),F===i.HALF_FLOAT&&(q=i.RGBA16F),F===i.UNSIGNED_BYTE&&(q=me===Ze?i.SRGB8_ALPHA8:i.RGBA8),F===i.UNSIGNED_SHORT_4_4_4_4&&(q=i.RGBA4),F===i.UNSIGNED_SHORT_5_5_5_1&&(q=i.RGB5_A1)}return(q===i.R16F||q===i.R32F||q===i.RG16F||q===i.RG32F||q===i.RGBA16F||q===i.RGBA32F)&&e.get("EXT_color_buffer_float"),q}function M(T,_){let F;return T?_===null||_===fi||_===Wi?F=i.DEPTH24_STENCIL8:_===An?F=i.DEPTH32F_STENCIL8:_===_a&&(F=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===fi||_===Wi?F=i.DEPTH_COMPONENT24:_===An?F=i.DEPTH_COMPONENT32F:_===_a&&(F=i.DEPTH_COMPONENT16),F}function I(T,_){return p(T)===!0||T.isFramebufferTexture&&T.minFilter!==cn&&T.minFilter!==Zt?Math.log2(Math.max(_.width,_.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?_.mipmaps.length:1}function w(T){const _=T.target;_.removeEventListener("dispose",w),R(_),_.isVideoTexture&&c.delete(_)}function A(T){const _=T.target;_.removeEventListener("dispose",A),x(_)}function R(T){const _=n.get(T);if(_.__webglInit===void 0)return;const F=T.source,Y=d.get(F);if(Y){const K=Y[_.__cacheKey];K.usedTimes--,K.usedTimes===0&&y(T),Object.keys(Y).length===0&&d.delete(F)}n.remove(T)}function y(T){const _=n.get(T);i.deleteTexture(_.__webglTexture);const F=T.source,Y=d.get(F);delete Y[_.__cacheKey],s.memory.textures--}function x(T){const _=n.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),n.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(_.__webglFramebuffer[Y]))for(let K=0;K<_.__webglFramebuffer[Y].length;K++)i.deleteFramebuffer(_.__webglFramebuffer[Y][K]);else i.deleteFramebuffer(_.__webglFramebuffer[Y]);_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer[Y])}else{if(Array.isArray(_.__webglFramebuffer))for(let Y=0;Y<_.__webglFramebuffer.length;Y++)i.deleteFramebuffer(_.__webglFramebuffer[Y]);else i.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&i.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let Y=0;Y<_.__webglColorRenderbuffer.length;Y++)_.__webglColorRenderbuffer[Y]&&i.deleteRenderbuffer(_.__webglColorRenderbuffer[Y]);_.__webglDepthRenderbuffer&&i.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const F=T.textures;for(let Y=0,K=F.length;Y<K;Y++){const q=n.get(F[Y]);q.__webglTexture&&(i.deleteTexture(q.__webglTexture),s.memory.textures--),n.remove(F[Y])}n.remove(T)}let C=0;function k(){C=0}function O(){const T=C;return T>=a.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+a.maxTextures),C+=1,T}function X(T){const _=[];return _.push(T.wrapS),_.push(T.wrapT),_.push(T.wrapR||0),_.push(T.magFilter),_.push(T.minFilter),_.push(T.anisotropy),_.push(T.internalFormat),_.push(T.format),_.push(T.type),_.push(T.generateMipmaps),_.push(T.premultiplyAlpha),_.push(T.flipY),_.push(T.unpackAlignment),_.push(T.colorSpace),_.join()}function j(T,_){const F=n.get(T);if(T.isVideoTexture&&be(T),T.isRenderTargetTexture===!1&&T.version>0&&F.__version!==T.version){const Y=T.image;if(Y===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{W(F,T,_);return}}t.bindTexture(i.TEXTURE_2D,F.__webglTexture,i.TEXTURE0+_)}function H(T,_){const F=n.get(T);if(T.version>0&&F.__version!==T.version){W(F,T,_);return}t.bindTexture(i.TEXTURE_2D_ARRAY,F.__webglTexture,i.TEXTURE0+_)}function Z(T,_){const F=n.get(T);if(T.version>0&&F.__version!==T.version){W(F,T,_);return}t.bindTexture(i.TEXTURE_3D,F.__webglTexture,i.TEXTURE0+_)}function G(T,_){const F=n.get(T);if(T.version>0&&F.__version!==T.version){J(F,T,_);return}t.bindTexture(i.TEXTURE_CUBE_MAP,F.__webglTexture,i.TEXTURE0+_)}const ne={[Rs]:i.REPEAT,[hi]:i.CLAMP_TO_EDGE,[Ps]:i.MIRRORED_REPEAT},re={[cn]:i.NEAREST,[Bu]:i.NEAREST_MIPMAP_NEAREST,[Ua]:i.NEAREST_MIPMAP_LINEAR,[Zt]:i.LINEAR,[Rr]:i.LINEAR_MIPMAP_NEAREST,[wn]:i.LINEAR_MIPMAP_LINEAR},ge={[Vu]:i.NEVER,[Yu]:i.ALWAYS,[Hu]:i.LESS,[bc]:i.LEQUAL,[Wu]:i.EQUAL,[ju]:i.GEQUAL,[Xu]:i.GREATER,[qu]:i.NOTEQUAL};function Ce(T,_){if(_.type===An&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===Zt||_.magFilter===Rr||_.magFilter===Ua||_.magFilter===wn||_.minFilter===Zt||_.minFilter===Rr||_.minFilter===Ua||_.minFilter===wn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(T,i.TEXTURE_WRAP_S,ne[_.wrapS]),i.texParameteri(T,i.TEXTURE_WRAP_T,ne[_.wrapT]),(T===i.TEXTURE_3D||T===i.TEXTURE_2D_ARRAY)&&i.texParameteri(T,i.TEXTURE_WRAP_R,ne[_.wrapR]),i.texParameteri(T,i.TEXTURE_MAG_FILTER,re[_.magFilter]),i.texParameteri(T,i.TEXTURE_MIN_FILTER,re[_.minFilter]),_.compareFunction&&(i.texParameteri(T,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(T,i.TEXTURE_COMPARE_FUNC,ge[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===cn||_.minFilter!==Ua&&_.minFilter!==wn||_.type===An&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||n.get(_).__currentAnisotropy){const F=e.get("EXT_texture_filter_anisotropic");i.texParameterf(T,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,a.getMaxAnisotropy())),n.get(_).__currentAnisotropy=_.anisotropy}}}function Ve(T,_){let F=!1;T.__webglInit===void 0&&(T.__webglInit=!0,_.addEventListener("dispose",w));const Y=_.source;let K=d.get(Y);K===void 0&&(K={},d.set(Y,K));const q=X(_);if(q!==T.__cacheKey){K[q]===void 0&&(K[q]={texture:i.createTexture(),usedTimes:0},s.memory.textures++,F=!0),K[q].usedTimes++;const me=K[T.__cacheKey];me!==void 0&&(K[T.__cacheKey].usedTimes--,me.usedTimes===0&&y(_)),T.__cacheKey=q,T.__webglTexture=K[q].texture}return F}function W(T,_,F){let Y=i.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(Y=i.TEXTURE_2D_ARRAY),_.isData3DTexture&&(Y=i.TEXTURE_3D);const K=Ve(T,_),q=_.source;t.bindTexture(Y,T.__webglTexture,i.TEXTURE0+F);const me=n.get(q);if(q.version!==me.__version||K===!0){t.activeTexture(i.TEXTURE0+F);const ie=We.getPrimaries(We.workingColorSpace),oe=_.colorSpace===Xn?null:We.getPrimaries(_.colorSpace),ve=_.colorSpace===Xn||ie===oe?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ve);let ee=v(_.image,!1,a.maxTextureSize);ee=Ye(_,ee);const fe=r.convert(_.format,_.colorSpace),we=r.convert(_.type);let Re=b(_.internalFormat,fe,we,_.colorSpace,_.isVideoTexture);Ce(Y,_);let pe;const He=_.mipmaps,Fe=_.isVideoTexture!==!0,tt=me.__version===void 0||K===!0,L=q.dataReady,se=I(_,ee);if(_.isDepthTexture)Re=M(_.format===Xi,_.type),tt&&(Fe?t.texStorage2D(i.TEXTURE_2D,1,Re,ee.width,ee.height):t.texImage2D(i.TEXTURE_2D,0,Re,ee.width,ee.height,0,fe,we,null));else if(_.isDataTexture)if(He.length>0){Fe&&tt&&t.texStorage2D(i.TEXTURE_2D,se,Re,He[0].width,He[0].height);for(let V=0,$=He.length;V<$;V++)pe=He[V],Fe?L&&t.texSubImage2D(i.TEXTURE_2D,V,0,0,pe.width,pe.height,fe,we,pe.data):t.texImage2D(i.TEXTURE_2D,V,Re,pe.width,pe.height,0,fe,we,pe.data);_.generateMipmaps=!1}else Fe?(tt&&t.texStorage2D(i.TEXTURE_2D,se,Re,ee.width,ee.height),L&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ee.width,ee.height,fe,we,ee.data)):t.texImage2D(i.TEXTURE_2D,0,Re,ee.width,ee.height,0,fe,we,ee.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){Fe&&tt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,se,Re,He[0].width,He[0].height,ee.depth);for(let V=0,$=He.length;V<$;V++)if(pe=He[V],_.format!==ln)if(fe!==null)if(Fe){if(L)if(_.layerUpdates.size>0){const ue=Ol(pe.width,pe.height,_.format,_.type);for(const le of _.layerUpdates){const De=pe.data.subarray(le*ue/pe.data.BYTES_PER_ELEMENT,(le+1)*ue/pe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,V,0,0,le,pe.width,pe.height,1,fe,De)}_.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,V,0,0,0,pe.width,pe.height,ee.depth,fe,pe.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,V,Re,pe.width,pe.height,ee.depth,0,pe.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Fe?L&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,V,0,0,0,pe.width,pe.height,ee.depth,fe,we,pe.data):t.texImage3D(i.TEXTURE_2D_ARRAY,V,Re,pe.width,pe.height,ee.depth,0,fe,we,pe.data)}else{Fe&&tt&&t.texStorage2D(i.TEXTURE_2D,se,Re,He[0].width,He[0].height);for(let V=0,$=He.length;V<$;V++)pe=He[V],_.format!==ln?fe!==null?Fe?L&&t.compressedTexSubImage2D(i.TEXTURE_2D,V,0,0,pe.width,pe.height,fe,pe.data):t.compressedTexImage2D(i.TEXTURE_2D,V,Re,pe.width,pe.height,0,pe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Fe?L&&t.texSubImage2D(i.TEXTURE_2D,V,0,0,pe.width,pe.height,fe,we,pe.data):t.texImage2D(i.TEXTURE_2D,V,Re,pe.width,pe.height,0,fe,we,pe.data)}else if(_.isDataArrayTexture)if(Fe){if(tt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,se,Re,ee.width,ee.height,ee.depth),L)if(_.layerUpdates.size>0){const V=Ol(ee.width,ee.height,_.format,_.type);for(const $ of _.layerUpdates){const ue=ee.data.subarray($*V/ee.data.BYTES_PER_ELEMENT,($+1)*V/ee.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,$,ee.width,ee.height,1,fe,we,ue)}_.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ee.width,ee.height,ee.depth,fe,we,ee.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Re,ee.width,ee.height,ee.depth,0,fe,we,ee.data);else if(_.isData3DTexture)Fe?(tt&&t.texStorage3D(i.TEXTURE_3D,se,Re,ee.width,ee.height,ee.depth),L&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ee.width,ee.height,ee.depth,fe,we,ee.data)):t.texImage3D(i.TEXTURE_3D,0,Re,ee.width,ee.height,ee.depth,0,fe,we,ee.data);else if(_.isFramebufferTexture){if(tt)if(Fe)t.texStorage2D(i.TEXTURE_2D,se,Re,ee.width,ee.height);else{let V=ee.width,$=ee.height;for(let ue=0;ue<se;ue++)t.texImage2D(i.TEXTURE_2D,ue,Re,V,$,0,fe,we,null),V>>=1,$>>=1}}else if(He.length>0){if(Fe&&tt){const V=Ee(He[0]);t.texStorage2D(i.TEXTURE_2D,se,Re,V.width,V.height)}for(let V=0,$=He.length;V<$;V++)pe=He[V],Fe?L&&t.texSubImage2D(i.TEXTURE_2D,V,0,0,fe,we,pe):t.texImage2D(i.TEXTURE_2D,V,Re,fe,we,pe);_.generateMipmaps=!1}else if(Fe){if(tt){const V=Ee(ee);t.texStorage2D(i.TEXTURE_2D,se,Re,V.width,V.height)}L&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,fe,we,ee)}else t.texImage2D(i.TEXTURE_2D,0,Re,fe,we,ee);p(_)&&h(Y),me.__version=q.version,_.onUpdate&&_.onUpdate(_)}T.__version=_.version}function J(T,_,F){if(_.image.length!==6)return;const Y=Ve(T,_),K=_.source;t.bindTexture(i.TEXTURE_CUBE_MAP,T.__webglTexture,i.TEXTURE0+F);const q=n.get(K);if(K.version!==q.__version||Y===!0){t.activeTexture(i.TEXTURE0+F);const me=We.getPrimaries(We.workingColorSpace),ie=_.colorSpace===Xn?null:We.getPrimaries(_.colorSpace),oe=_.colorSpace===Xn||me===ie?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,oe);const ve=_.isCompressedTexture||_.image[0].isCompressedTexture,ee=_.image[0]&&_.image[0].isDataTexture,fe=[];for(let $=0;$<6;$++)!ve&&!ee?fe[$]=v(_.image[$],!0,a.maxCubemapSize):fe[$]=ee?_.image[$].image:_.image[$],fe[$]=Ye(_,fe[$]);const we=fe[0],Re=r.convert(_.format,_.colorSpace),pe=r.convert(_.type),He=b(_.internalFormat,Re,pe,_.colorSpace),Fe=_.isVideoTexture!==!0,tt=q.__version===void 0||Y===!0,L=K.dataReady;let se=I(_,we);Ce(i.TEXTURE_CUBE_MAP,_);let V;if(ve){Fe&&tt&&t.texStorage2D(i.TEXTURE_CUBE_MAP,se,He,we.width,we.height);for(let $=0;$<6;$++){V=fe[$].mipmaps;for(let ue=0;ue<V.length;ue++){const le=V[ue];_.format!==ln?Re!==null?Fe?L&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,ue,0,0,le.width,le.height,Re,le.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,ue,He,le.width,le.height,0,le.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Fe?L&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,ue,0,0,le.width,le.height,Re,pe,le.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,ue,He,le.width,le.height,0,Re,pe,le.data)}}}else{if(V=_.mipmaps,Fe&&tt){V.length>0&&se++;const $=Ee(fe[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,se,He,$.width,$.height)}for(let $=0;$<6;$++)if(ee){Fe?L&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,fe[$].width,fe[$].height,Re,pe,fe[$].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,He,fe[$].width,fe[$].height,0,Re,pe,fe[$].data);for(let ue=0;ue<V.length;ue++){const De=V[ue].image[$].image;Fe?L&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,ue+1,0,0,De.width,De.height,Re,pe,De.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,ue+1,He,De.width,De.height,0,Re,pe,De.data)}}else{Fe?L&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,Re,pe,fe[$]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,He,Re,pe,fe[$]);for(let ue=0;ue<V.length;ue++){const le=V[ue];Fe?L&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,ue+1,0,0,Re,pe,le.image[$]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,ue+1,He,Re,pe,le.image[$])}}}p(_)&&h(i.TEXTURE_CUBE_MAP),q.__version=K.version,_.onUpdate&&_.onUpdate(_)}T.__version=_.version}function he(T,_,F,Y,K,q){const me=r.convert(F.format,F.colorSpace),ie=r.convert(F.type),oe=b(F.internalFormat,me,ie,F.colorSpace),ve=n.get(_),ee=n.get(F);if(ee.__renderTarget=_,!ve.__hasExternalTextures){const fe=Math.max(1,_.width>>q),we=Math.max(1,_.height>>q);K===i.TEXTURE_3D||K===i.TEXTURE_2D_ARRAY?t.texImage3D(K,q,oe,fe,we,_.depth,0,me,ie,null):t.texImage2D(K,q,oe,fe,we,0,me,ie,null)}t.bindFramebuffer(i.FRAMEBUFFER,T),ke(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Y,K,ee.__webglTexture,0,ze(_)):(K===i.TEXTURE_2D||K>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Y,K,ee.__webglTexture,q),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Q(T,_,F){if(i.bindRenderbuffer(i.RENDERBUFFER,T),_.depthBuffer){const Y=_.depthTexture,K=Y&&Y.isDepthTexture?Y.type:null,q=M(_.stencilBuffer,K),me=_.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ie=ze(_);ke(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ie,q,_.width,_.height):F?i.renderbufferStorageMultisample(i.RENDERBUFFER,ie,q,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,q,_.width,_.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,me,i.RENDERBUFFER,T)}else{const Y=_.textures;for(let K=0;K<Y.length;K++){const q=Y[K],me=r.convert(q.format,q.colorSpace),ie=r.convert(q.type),oe=b(q.internalFormat,me,ie,q.colorSpace),ve=ze(_);F&&ke(_)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,ve,oe,_.width,_.height):ke(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ve,oe,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,oe,_.width,_.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Te(T,_){if(_&&_.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,T),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Y=n.get(_.depthTexture);Y.__renderTarget=_,(!Y.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),j(_.depthTexture,0);const K=Y.__webglTexture,q=ze(_);if(_.depthTexture.format===Oi)ke(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,K,0,q):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,K,0);else if(_.depthTexture.format===Xi)ke(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,K,0,q):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,K,0);else throw new Error("Unknown depthTexture format")}function Ae(T){const _=n.get(T),F=T.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==T.depthTexture){const Y=T.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),Y){const K=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,Y.removeEventListener("dispose",K)};Y.addEventListener("dispose",K),_.__depthDisposeCallback=K}_.__boundDepthTexture=Y}if(T.depthTexture&&!_.__autoAllocateDepthBuffer){if(F)throw new Error("target.depthTexture not supported in Cube render targets");Te(_.__webglFramebuffer,T)}else if(F){_.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[Y]),_.__webglDepthbuffer[Y]===void 0)_.__webglDepthbuffer[Y]=i.createRenderbuffer(),Q(_.__webglDepthbuffer[Y],T,!1);else{const K=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,q=_.__webglDepthbuffer[Y];i.bindRenderbuffer(i.RENDERBUFFER,q),i.framebufferRenderbuffer(i.FRAMEBUFFER,K,i.RENDERBUFFER,q)}}else if(t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=i.createRenderbuffer(),Q(_.__webglDepthbuffer,T,!1);else{const Y=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,K=_.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,K),i.framebufferRenderbuffer(i.FRAMEBUFFER,Y,i.RENDERBUFFER,K)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ie(T,_,F){const Y=n.get(T);_!==void 0&&he(Y.__webglFramebuffer,T,T.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),F!==void 0&&Ae(T)}function Qe(T){const _=T.texture,F=n.get(T),Y=n.get(_);T.addEventListener("dispose",A);const K=T.textures,q=T.isWebGLCubeRenderTarget===!0,me=K.length>1;if(me||(Y.__webglTexture===void 0&&(Y.__webglTexture=i.createTexture()),Y.__version=_.version,s.memory.textures++),q){F.__webglFramebuffer=[];for(let ie=0;ie<6;ie++)if(_.mipmaps&&_.mipmaps.length>0){F.__webglFramebuffer[ie]=[];for(let oe=0;oe<_.mipmaps.length;oe++)F.__webglFramebuffer[ie][oe]=i.createFramebuffer()}else F.__webglFramebuffer[ie]=i.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){F.__webglFramebuffer=[];for(let ie=0;ie<_.mipmaps.length;ie++)F.__webglFramebuffer[ie]=i.createFramebuffer()}else F.__webglFramebuffer=i.createFramebuffer();if(me)for(let ie=0,oe=K.length;ie<oe;ie++){const ve=n.get(K[ie]);ve.__webglTexture===void 0&&(ve.__webglTexture=i.createTexture(),s.memory.textures++)}if(T.samples>0&&ke(T)===!1){F.__webglMultisampledFramebuffer=i.createFramebuffer(),F.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let ie=0;ie<K.length;ie++){const oe=K[ie];F.__webglColorRenderbuffer[ie]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,F.__webglColorRenderbuffer[ie]);const ve=r.convert(oe.format,oe.colorSpace),ee=r.convert(oe.type),fe=b(oe.internalFormat,ve,ee,oe.colorSpace,T.isXRRenderTarget===!0),we=ze(T);i.renderbufferStorageMultisample(i.RENDERBUFFER,we,fe,T.width,T.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ie,i.RENDERBUFFER,F.__webglColorRenderbuffer[ie])}i.bindRenderbuffer(i.RENDERBUFFER,null),T.depthBuffer&&(F.__webglDepthRenderbuffer=i.createRenderbuffer(),Q(F.__webglDepthRenderbuffer,T,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(q){t.bindTexture(i.TEXTURE_CUBE_MAP,Y.__webglTexture),Ce(i.TEXTURE_CUBE_MAP,_);for(let ie=0;ie<6;ie++)if(_.mipmaps&&_.mipmaps.length>0)for(let oe=0;oe<_.mipmaps.length;oe++)he(F.__webglFramebuffer[ie][oe],T,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,oe);else he(F.__webglFramebuffer[ie],T,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0);p(_)&&h(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(me){for(let ie=0,oe=K.length;ie<oe;ie++){const ve=K[ie],ee=n.get(ve);t.bindTexture(i.TEXTURE_2D,ee.__webglTexture),Ce(i.TEXTURE_2D,ve),he(F.__webglFramebuffer,T,ve,i.COLOR_ATTACHMENT0+ie,i.TEXTURE_2D,0),p(ve)&&h(i.TEXTURE_2D)}t.unbindTexture()}else{let ie=i.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(ie=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ie,Y.__webglTexture),Ce(ie,_),_.mipmaps&&_.mipmaps.length>0)for(let oe=0;oe<_.mipmaps.length;oe++)he(F.__webglFramebuffer[oe],T,_,i.COLOR_ATTACHMENT0,ie,oe);else he(F.__webglFramebuffer,T,_,i.COLOR_ATTACHMENT0,ie,0);p(_)&&h(ie),t.unbindTexture()}T.depthBuffer&&Ae(T)}function Ge(T){const _=T.textures;for(let F=0,Y=_.length;F<Y;F++){const K=_[F];if(p(K)){const q=E(T),me=n.get(K).__webglTexture;t.bindTexture(q,me),h(q),t.unbindTexture()}}}const at=[],D=[];function At(T){if(T.samples>0){if(ke(T)===!1){const _=T.textures,F=T.width,Y=T.height;let K=i.COLOR_BUFFER_BIT;const q=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,me=n.get(T),ie=_.length>1;if(ie)for(let oe=0;oe<_.length;oe++)t.bindFramebuffer(i.FRAMEBUFFER,me.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+oe,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,me.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+oe,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,me.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,me.__webglFramebuffer);for(let oe=0;oe<_.length;oe++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(K|=i.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(K|=i.STENCIL_BUFFER_BIT)),ie){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,me.__webglColorRenderbuffer[oe]);const ve=n.get(_[oe]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,ve,0)}i.blitFramebuffer(0,0,F,Y,0,0,F,Y,K,i.NEAREST),l===!0&&(at.length=0,D.length=0,at.push(i.COLOR_ATTACHMENT0+oe),T.depthBuffer&&T.resolveDepthBuffer===!1&&(at.push(q),D.push(q),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,D)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,at))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ie)for(let oe=0;oe<_.length;oe++){t.bindFramebuffer(i.FRAMEBUFFER,me.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+oe,i.RENDERBUFFER,me.__webglColorRenderbuffer[oe]);const ve=n.get(_[oe]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,me.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+oe,i.TEXTURE_2D,ve,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,me.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&l){const _=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[_])}}}function ze(T){return Math.min(a.maxSamples,T.samples)}function ke(T){const _=n.get(T);return T.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function be(T){const _=s.render.frame;c.get(T)!==_&&(c.set(T,_),T.update())}function Ye(T,_){const F=T.colorSpace,Y=T.format,K=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||F!==Ki&&F!==Xn&&(We.getTransfer(F)===Ze?(Y!==ln||K!==Nn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",F)),_}function Ee(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(u.width=T.naturalWidth||T.width,u.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(u.width=T.displayWidth,u.height=T.displayHeight):(u.width=T.width,u.height=T.height),u}this.allocateTextureUnit=O,this.resetTextureUnits=k,this.setTexture2D=j,this.setTexture2DArray=H,this.setTexture3D=Z,this.setTextureCube=G,this.rebindTextures=Ie,this.setupRenderTarget=Qe,this.updateRenderTargetMipmap=Ge,this.updateMultisampleRenderTarget=At,this.setupDepthRenderbuffer=Ae,this.setupFrameBufferTexture=he,this.useMultisampledRTT=ke}function fg(i,e){function t(n,a=Xn){let r;const s=We.getTransfer(a);if(n===Nn)return i.UNSIGNED_BYTE;if(n===co)return i.UNSIGNED_SHORT_4_4_4_4;if(n===uo)return i.UNSIGNED_SHORT_5_5_5_1;if(n===mc)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===fc)return i.BYTE;if(n===pc)return i.SHORT;if(n===_a)return i.UNSIGNED_SHORT;if(n===lo)return i.INT;if(n===fi)return i.UNSIGNED_INT;if(n===An)return i.FLOAT;if(n===Pn)return i.HALF_FLOAT;if(n===gc)return i.ALPHA;if(n===vc)return i.RGB;if(n===ln)return i.RGBA;if(n===_c)return i.LUMINANCE;if(n===xc)return i.LUMINANCE_ALPHA;if(n===Oi)return i.DEPTH_COMPONENT;if(n===Xi)return i.DEPTH_STENCIL;if(n===Mc)return i.RED;if(n===ho)return i.RED_INTEGER;if(n===Sc)return i.RG;if(n===fo)return i.RG_INTEGER;if(n===po)return i.RGBA_INTEGER;if(n===cr||n===ur||n===dr||n===hr)if(s===Ze)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===cr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ur)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===dr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===hr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===cr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ur)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===dr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===hr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Ls||n===Is||n===Ds||n===Us)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Ls)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Is)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Ds)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Us)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ns||n===Fs||n===Os)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Ns||n===Fs)return s===Ze?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Os)return s===Ze?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Bs||n===zs||n===ks||n===Gs||n===Vs||n===Hs||n===Ws||n===Xs||n===qs||n===js||n===Ys||n===$s||n===Ks||n===Zs)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Bs)return s===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===zs)return s===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===ks)return s===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Gs)return s===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Vs)return s===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Hs)return s===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ws)return s===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Xs)return s===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===qs)return s===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===js)return s===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ys)return s===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===$s)return s===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Ks)return s===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Zs)return s===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===fr||n===Js||n===Qs)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===fr)return s===Ze?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Js)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Qs)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===yc||n===eo||n===to||n===no)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===fr)return r.COMPRESSED_RED_RGTC1_EXT;if(n===eo)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===to)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===no)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Wi?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}class pg extends Wt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class mt extends wt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const mg={type:"move"};class ns{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new mt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new mt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new mt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let a=null,r=null,s=null;const o=this._targetRay,l=this._grip,u=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(u&&e.hand){s=!0;for(const v of e.hand.values()){const p=t.getJointPose(v,n),h=this._getHandJoint(u,v);p!==null&&(h.matrix.fromArray(p.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,h.jointRadius=p.radius),h.visible=p!==null}const c=u.joints["index-finger-tip"],f=u.joints["thumb-tip"],d=c.position.distanceTo(f.position),m=.02,g=.005;u.inputState.pinching&&d>m+g?(u.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!u.inputState.pinching&&d<=m-g&&(u.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(a=t.getPose(e.targetRaySpace,n),a===null&&r!==null&&(a=r),a!==null&&(o.matrix.fromArray(a.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,a.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(a.linearVelocity)):o.hasLinearVelocity=!1,a.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(a.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(mg)))}return o!==null&&(o.visible=a!==null),l!==null&&(l.visible=r!==null),u!==null&&(u.visible=s!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new mt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const gg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,vg=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class _g{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const a=new Ft,r=e.properties.get(a);r.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=a}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new it({vertexShader:gg,fragmentShader:vg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Be(new Aa(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class xg extends Zi{constructor(e,t){super();const n=this;let a=null,r=1,s=null,o="local-floor",l=1,u=null,c=null,f=null,d=null,m=null,g=null;const v=new _g,p=t.getContextAttributes();let h=null,E=null;const b=[],M=[],I=new ye;let w=null;const A=new Wt;A.viewport=new Je;const R=new Wt;R.viewport=new Je;const y=[A,R],x=new pg;let C=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(W){let J=b[W];return J===void 0&&(J=new ns,b[W]=J),J.getTargetRaySpace()},this.getControllerGrip=function(W){let J=b[W];return J===void 0&&(J=new ns,b[W]=J),J.getGripSpace()},this.getHand=function(W){let J=b[W];return J===void 0&&(J=new ns,b[W]=J),J.getHandSpace()};function O(W){const J=M.indexOf(W.inputSource);if(J===-1)return;const he=b[J];he!==void 0&&(he.update(W.inputSource,W.frame,u||s),he.dispatchEvent({type:W.type,data:W.inputSource}))}function X(){a.removeEventListener("select",O),a.removeEventListener("selectstart",O),a.removeEventListener("selectend",O),a.removeEventListener("squeeze",O),a.removeEventListener("squeezestart",O),a.removeEventListener("squeezeend",O),a.removeEventListener("end",X),a.removeEventListener("inputsourceschange",j);for(let W=0;W<b.length;W++){const J=M[W];J!==null&&(M[W]=null,b[W].disconnect(J))}C=null,k=null,v.reset(),e.setRenderTarget(h),m=null,d=null,f=null,a=null,E=null,Ve.stop(),n.isPresenting=!1,e.setPixelRatio(w),e.setSize(I.width,I.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(W){r=W,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(W){o=W,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return u||s},this.setReferenceSpace=function(W){u=W},this.getBaseLayer=function(){return d!==null?d:m},this.getBinding=function(){return f},this.getFrame=function(){return g},this.getSession=function(){return a},this.setSession=async function(W){if(a=W,a!==null){if(h=e.getRenderTarget(),a.addEventListener("select",O),a.addEventListener("selectstart",O),a.addEventListener("selectend",O),a.addEventListener("squeeze",O),a.addEventListener("squeezestart",O),a.addEventListener("squeezeend",O),a.addEventListener("end",X),a.addEventListener("inputsourceschange",j),p.xrCompatible!==!0&&await t.makeXRCompatible(),w=e.getPixelRatio(),e.getSize(I),a.renderState.layers===void 0){const J={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(a,t,J),a.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),E=new un(m.framebufferWidth,m.framebufferHeight,{format:ln,type:Nn,colorSpace:e.outputColorSpace,stencilBuffer:p.stencil})}else{let J=null,he=null,Q=null;p.depth&&(Q=p.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,J=p.stencil?Xi:Oi,he=p.stencil?Wi:fi);const Te={colorFormat:t.RGBA8,depthFormat:Q,scaleFactor:r};f=new XRWebGLBinding(a,t),d=f.createProjectionLayer(Te),a.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),E=new un(d.textureWidth,d.textureHeight,{format:ln,type:Nn,depthTexture:new Oc(d.textureWidth,d.textureHeight,he,void 0,void 0,void 0,void 0,void 0,void 0,J),stencilBuffer:p.stencil,colorSpace:e.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}E.isXRRenderTarget=!0,this.setFoveation(l),u=null,s=await a.requestReferenceSpace(o),Ve.setContext(a),Ve.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(a!==null)return a.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function j(W){for(let J=0;J<W.removed.length;J++){const he=W.removed[J],Q=M.indexOf(he);Q>=0&&(M[Q]=null,b[Q].disconnect(he))}for(let J=0;J<W.added.length;J++){const he=W.added[J];let Q=M.indexOf(he);if(Q===-1){for(let Ae=0;Ae<b.length;Ae++)if(Ae>=M.length){M.push(he),Q=Ae;break}else if(M[Ae]===null){M[Ae]=he,Q=Ae;break}if(Q===-1)break}const Te=b[Q];Te&&Te.connect(he)}}const H=new P,Z=new P;function G(W,J,he){H.setFromMatrixPosition(J.matrixWorld),Z.setFromMatrixPosition(he.matrixWorld);const Q=H.distanceTo(Z),Te=J.projectionMatrix.elements,Ae=he.projectionMatrix.elements,Ie=Te[14]/(Te[10]-1),Qe=Te[14]/(Te[10]+1),Ge=(Te[9]+1)/Te[5],at=(Te[9]-1)/Te[5],D=(Te[8]-1)/Te[0],At=(Ae[8]+1)/Ae[0],ze=Ie*D,ke=Ie*At,be=Q/(-D+At),Ye=be*-D;if(J.matrixWorld.decompose(W.position,W.quaternion,W.scale),W.translateX(Ye),W.translateZ(be),W.matrixWorld.compose(W.position,W.quaternion,W.scale),W.matrixWorldInverse.copy(W.matrixWorld).invert(),Te[10]===-1)W.projectionMatrix.copy(J.projectionMatrix),W.projectionMatrixInverse.copy(J.projectionMatrixInverse);else{const Ee=Ie+be,T=Qe+be,_=ze-Ye,F=ke+(Q-Ye),Y=Ge*Qe/T*Ee,K=at*Qe/T*Ee;W.projectionMatrix.makePerspective(_,F,Y,K,Ee,T),W.projectionMatrixInverse.copy(W.projectionMatrix).invert()}}function ne(W,J){J===null?W.matrixWorld.copy(W.matrix):W.matrixWorld.multiplyMatrices(J.matrixWorld,W.matrix),W.matrixWorldInverse.copy(W.matrixWorld).invert()}this.updateCamera=function(W){if(a===null)return;let J=W.near,he=W.far;v.texture!==null&&(v.depthNear>0&&(J=v.depthNear),v.depthFar>0&&(he=v.depthFar)),x.near=R.near=A.near=J,x.far=R.far=A.far=he,(C!==x.near||k!==x.far)&&(a.updateRenderState({depthNear:x.near,depthFar:x.far}),C=x.near,k=x.far),A.layers.mask=W.layers.mask|2,R.layers.mask=W.layers.mask|4,x.layers.mask=A.layers.mask|R.layers.mask;const Q=W.parent,Te=x.cameras;ne(x,Q);for(let Ae=0;Ae<Te.length;Ae++)ne(Te[Ae],Q);Te.length===2?G(x,A,R):x.projectionMatrix.copy(A.projectionMatrix),re(W,x,Q)};function re(W,J,he){he===null?W.matrix.copy(J.matrixWorld):(W.matrix.copy(he.matrixWorld),W.matrix.invert(),W.matrix.multiply(J.matrixWorld)),W.matrix.decompose(W.position,W.quaternion,W.scale),W.updateMatrixWorld(!0),W.projectionMatrix.copy(J.projectionMatrix),W.projectionMatrixInverse.copy(J.projectionMatrixInverse),W.isPerspectiveCamera&&(W.fov=xa*2*Math.atan(1/W.projectionMatrix.elements[5]),W.zoom=1)}this.getCamera=function(){return x},this.getFoveation=function(){if(!(d===null&&m===null))return l},this.setFoveation=function(W){l=W,d!==null&&(d.fixedFoveation=W),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=W)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(x)};let ge=null;function Ce(W,J){if(c=J.getViewerPose(u||s),g=J,c!==null){const he=c.views;m!==null&&(e.setRenderTargetFramebuffer(E,m.framebuffer),e.setRenderTarget(E));let Q=!1;he.length!==x.cameras.length&&(x.cameras.length=0,Q=!0);for(let Ae=0;Ae<he.length;Ae++){const Ie=he[Ae];let Qe=null;if(m!==null)Qe=m.getViewport(Ie);else{const at=f.getViewSubImage(d,Ie);Qe=at.viewport,Ae===0&&(e.setRenderTargetTextures(E,at.colorTexture,d.ignoreDepthValues?void 0:at.depthStencilTexture),e.setRenderTarget(E))}let Ge=y[Ae];Ge===void 0&&(Ge=new Wt,Ge.layers.enable(Ae),Ge.viewport=new Je,y[Ae]=Ge),Ge.matrix.fromArray(Ie.transform.matrix),Ge.matrix.decompose(Ge.position,Ge.quaternion,Ge.scale),Ge.projectionMatrix.fromArray(Ie.projectionMatrix),Ge.projectionMatrixInverse.copy(Ge.projectionMatrix).invert(),Ge.viewport.set(Qe.x,Qe.y,Qe.width,Qe.height),Ae===0&&(x.matrix.copy(Ge.matrix),x.matrix.decompose(x.position,x.quaternion,x.scale)),Q===!0&&x.cameras.push(Ge)}const Te=a.enabledFeatures;if(Te&&Te.includes("depth-sensing")){const Ae=f.getDepthInformation(he[0]);Ae&&Ae.isValid&&Ae.texture&&v.init(e,Ae,a.renderState)}}for(let he=0;he<b.length;he++){const Q=M[he],Te=b[he];Q!==null&&Te!==void 0&&Te.update(Q,J,u||s)}ge&&ge(W,J),J.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:J}),g=null}const Ve=new Nc;Ve.setAnimationLoop(Ce),this.setAnimationLoop=function(W){ge=W},this.dispose=function(){}}}const ai=new gn,Mg=new et;function Sg(i,e){function t(p,h){p.matrixAutoUpdate===!0&&p.updateMatrix(),h.value.copy(p.matrix)}function n(p,h){h.color.getRGB(p.fogColor.value,Ic(i)),h.isFog?(p.fogNear.value=h.near,p.fogFar.value=h.far):h.isFogExp2&&(p.fogDensity.value=h.density)}function a(p,h,E,b,M){h.isMeshBasicMaterial||h.isMeshLambertMaterial?r(p,h):h.isMeshToonMaterial?(r(p,h),f(p,h)):h.isMeshPhongMaterial?(r(p,h),c(p,h)):h.isMeshStandardMaterial?(r(p,h),d(p,h),h.isMeshPhysicalMaterial&&m(p,h,M)):h.isMeshMatcapMaterial?(r(p,h),g(p,h)):h.isMeshDepthMaterial?r(p,h):h.isMeshDistanceMaterial?(r(p,h),v(p,h)):h.isMeshNormalMaterial?r(p,h):h.isLineBasicMaterial?(s(p,h),h.isLineDashedMaterial&&o(p,h)):h.isPointsMaterial?l(p,h,E,b):h.isSpriteMaterial?u(p,h):h.isShadowMaterial?(p.color.value.copy(h.color),p.opacity.value=h.opacity):h.isShaderMaterial&&(h.uniformsNeedUpdate=!1)}function r(p,h){p.opacity.value=h.opacity,h.color&&p.diffuse.value.copy(h.color),h.emissive&&p.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity),h.map&&(p.map.value=h.map,t(h.map,p.mapTransform)),h.alphaMap&&(p.alphaMap.value=h.alphaMap,t(h.alphaMap,p.alphaMapTransform)),h.bumpMap&&(p.bumpMap.value=h.bumpMap,t(h.bumpMap,p.bumpMapTransform),p.bumpScale.value=h.bumpScale,h.side===gt&&(p.bumpScale.value*=-1)),h.normalMap&&(p.normalMap.value=h.normalMap,t(h.normalMap,p.normalMapTransform),p.normalScale.value.copy(h.normalScale),h.side===gt&&p.normalScale.value.negate()),h.displacementMap&&(p.displacementMap.value=h.displacementMap,t(h.displacementMap,p.displacementMapTransform),p.displacementScale.value=h.displacementScale,p.displacementBias.value=h.displacementBias),h.emissiveMap&&(p.emissiveMap.value=h.emissiveMap,t(h.emissiveMap,p.emissiveMapTransform)),h.specularMap&&(p.specularMap.value=h.specularMap,t(h.specularMap,p.specularMapTransform)),h.alphaTest>0&&(p.alphaTest.value=h.alphaTest);const E=e.get(h),b=E.envMap,M=E.envMapRotation;b&&(p.envMap.value=b,ai.copy(M),ai.x*=-1,ai.y*=-1,ai.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(ai.y*=-1,ai.z*=-1),p.envMapRotation.value.setFromMatrix4(Mg.makeRotationFromEuler(ai)),p.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=h.reflectivity,p.ior.value=h.ior,p.refractionRatio.value=h.refractionRatio),h.lightMap&&(p.lightMap.value=h.lightMap,p.lightMapIntensity.value=h.lightMapIntensity,t(h.lightMap,p.lightMapTransform)),h.aoMap&&(p.aoMap.value=h.aoMap,p.aoMapIntensity.value=h.aoMapIntensity,t(h.aoMap,p.aoMapTransform))}function s(p,h){p.diffuse.value.copy(h.color),p.opacity.value=h.opacity,h.map&&(p.map.value=h.map,t(h.map,p.mapTransform))}function o(p,h){p.dashSize.value=h.dashSize,p.totalSize.value=h.dashSize+h.gapSize,p.scale.value=h.scale}function l(p,h,E,b){p.diffuse.value.copy(h.color),p.opacity.value=h.opacity,p.size.value=h.size*E,p.scale.value=b*.5,h.map&&(p.map.value=h.map,t(h.map,p.uvTransform)),h.alphaMap&&(p.alphaMap.value=h.alphaMap,t(h.alphaMap,p.alphaMapTransform)),h.alphaTest>0&&(p.alphaTest.value=h.alphaTest)}function u(p,h){p.diffuse.value.copy(h.color),p.opacity.value=h.opacity,p.rotation.value=h.rotation,h.map&&(p.map.value=h.map,t(h.map,p.mapTransform)),h.alphaMap&&(p.alphaMap.value=h.alphaMap,t(h.alphaMap,p.alphaMapTransform)),h.alphaTest>0&&(p.alphaTest.value=h.alphaTest)}function c(p,h){p.specular.value.copy(h.specular),p.shininess.value=Math.max(h.shininess,1e-4)}function f(p,h){h.gradientMap&&(p.gradientMap.value=h.gradientMap)}function d(p,h){p.metalness.value=h.metalness,h.metalnessMap&&(p.metalnessMap.value=h.metalnessMap,t(h.metalnessMap,p.metalnessMapTransform)),p.roughness.value=h.roughness,h.roughnessMap&&(p.roughnessMap.value=h.roughnessMap,t(h.roughnessMap,p.roughnessMapTransform)),h.envMap&&(p.envMapIntensity.value=h.envMapIntensity)}function m(p,h,E){p.ior.value=h.ior,h.sheen>0&&(p.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),p.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(p.sheenColorMap.value=h.sheenColorMap,t(h.sheenColorMap,p.sheenColorMapTransform)),h.sheenRoughnessMap&&(p.sheenRoughnessMap.value=h.sheenRoughnessMap,t(h.sheenRoughnessMap,p.sheenRoughnessMapTransform))),h.clearcoat>0&&(p.clearcoat.value=h.clearcoat,p.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(p.clearcoatMap.value=h.clearcoatMap,t(h.clearcoatMap,p.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,t(h.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(p.clearcoatNormalMap.value=h.clearcoatNormalMap,t(h.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===gt&&p.clearcoatNormalScale.value.negate())),h.dispersion>0&&(p.dispersion.value=h.dispersion),h.iridescence>0&&(p.iridescence.value=h.iridescence,p.iridescenceIOR.value=h.iridescenceIOR,p.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(p.iridescenceMap.value=h.iridescenceMap,t(h.iridescenceMap,p.iridescenceMapTransform)),h.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=h.iridescenceThicknessMap,t(h.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),h.transmission>0&&(p.transmission.value=h.transmission,p.transmissionSamplerMap.value=E.texture,p.transmissionSamplerSize.value.set(E.width,E.height),h.transmissionMap&&(p.transmissionMap.value=h.transmissionMap,t(h.transmissionMap,p.transmissionMapTransform)),p.thickness.value=h.thickness,h.thicknessMap&&(p.thicknessMap.value=h.thicknessMap,t(h.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=h.attenuationDistance,p.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(p.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(p.anisotropyMap.value=h.anisotropyMap,t(h.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=h.specularIntensity,p.specularColor.value.copy(h.specularColor),h.specularColorMap&&(p.specularColorMap.value=h.specularColorMap,t(h.specularColorMap,p.specularColorMapTransform)),h.specularIntensityMap&&(p.specularIntensityMap.value=h.specularIntensityMap,t(h.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,h){h.matcap&&(p.matcap.value=h.matcap)}function v(p,h){const E=e.get(h).light;p.referencePosition.value.setFromMatrixPosition(E.matrixWorld),p.nearDistance.value=E.shadow.camera.near,p.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:a}}function yg(i,e,t,n){let a={},r={},s=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(E,b){const M=b.program;n.uniformBlockBinding(E,M)}function u(E,b){let M=a[E.id];M===void 0&&(g(E),M=c(E),a[E.id]=M,E.addEventListener("dispose",p));const I=b.program;n.updateUBOMapping(E,I);const w=e.render.frame;r[E.id]!==w&&(d(E),r[E.id]=w)}function c(E){const b=f();E.__bindingPointIndex=b;const M=i.createBuffer(),I=E.__size,w=E.usage;return i.bindBuffer(i.UNIFORM_BUFFER,M),i.bufferData(i.UNIFORM_BUFFER,I,w),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,b,M),M}function f(){for(let E=0;E<o;E++)if(s.indexOf(E)===-1)return s.push(E),E;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(E){const b=a[E.id],M=E.uniforms,I=E.__cache;i.bindBuffer(i.UNIFORM_BUFFER,b);for(let w=0,A=M.length;w<A;w++){const R=Array.isArray(M[w])?M[w]:[M[w]];for(let y=0,x=R.length;y<x;y++){const C=R[y];if(m(C,w,y,I)===!0){const k=C.__offset,O=Array.isArray(C.value)?C.value:[C.value];let X=0;for(let j=0;j<O.length;j++){const H=O[j],Z=v(H);typeof H=="number"||typeof H=="boolean"?(C.__data[0]=H,i.bufferSubData(i.UNIFORM_BUFFER,k+X,C.__data)):H.isMatrix3?(C.__data[0]=H.elements[0],C.__data[1]=H.elements[1],C.__data[2]=H.elements[2],C.__data[3]=0,C.__data[4]=H.elements[3],C.__data[5]=H.elements[4],C.__data[6]=H.elements[5],C.__data[7]=0,C.__data[8]=H.elements[6],C.__data[9]=H.elements[7],C.__data[10]=H.elements[8],C.__data[11]=0):(H.toArray(C.__data,X),X+=Z.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,k,C.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function m(E,b,M,I){const w=E.value,A=b+"_"+M;if(I[A]===void 0)return typeof w=="number"||typeof w=="boolean"?I[A]=w:I[A]=w.clone(),!0;{const R=I[A];if(typeof w=="number"||typeof w=="boolean"){if(R!==w)return I[A]=w,!0}else if(R.equals(w)===!1)return R.copy(w),!0}return!1}function g(E){const b=E.uniforms;let M=0;const I=16;for(let A=0,R=b.length;A<R;A++){const y=Array.isArray(b[A])?b[A]:[b[A]];for(let x=0,C=y.length;x<C;x++){const k=y[x],O=Array.isArray(k.value)?k.value:[k.value];for(let X=0,j=O.length;X<j;X++){const H=O[X],Z=v(H),G=M%I,ne=G%Z.boundary,re=G+ne;M+=ne,re!==0&&I-re<Z.storage&&(M+=I-re),k.__data=new Float32Array(Z.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=M,M+=Z.storage}}}const w=M%I;return w>0&&(M+=I-w),E.__size=M,E.__cache={},this}function v(E){const b={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(b.boundary=4,b.storage=4):E.isVector2?(b.boundary=8,b.storage=8):E.isVector3||E.isColor?(b.boundary=16,b.storage=12):E.isVector4?(b.boundary=16,b.storage=16):E.isMatrix3?(b.boundary=48,b.storage=48):E.isMatrix4?(b.boundary=64,b.storage=64):E.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",E),b}function p(E){const b=E.target;b.removeEventListener("dispose",p);const M=s.indexOf(b.__bindingPointIndex);s.splice(M,1),i.deleteBuffer(a[b.id]),delete a[b.id],delete r[b.id]}function h(){for(const E in a)i.deleteBuffer(a[E]);s=[],a={},r={}}return{bind:l,update:u,dispose:h}}class Eg{constructor(e={}){const{canvas:t=dd(),context:n=null,depth:a=!0,stencil:r=!1,alpha:s=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:u=!1,powerPreference:c="default",failIfMajorPerformanceCaveat:f=!1,reverseDepthBuffer:d=!1}=e;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=s;const g=new Uint32Array(4),v=new Int32Array(4);let p=null,h=null;const E=[],b=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ht,this.toneMapping=qn,this.toneMappingExposure=1;const M=this;let I=!1,w=0,A=0,R=null,y=-1,x=null;const C=new Je,k=new Je;let O=null;const X=new de(0);let j=0,H=t.width,Z=t.height,G=1,ne=null,re=null;const ge=new Je(0,0,H,Z),Ce=new Je(0,0,H,Z);let Ve=!1;const W=new vo;let J=!1,he=!1;const Q=new et,Te=new et,Ae=new P,Ie=new Je,Qe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ge=!1;function at(){return R===null?G:1}let D=n;function At(S,U){return t.getContext(S,U)}try{const S={alpha:!0,depth:a,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:u,powerPreference:c,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${oo}`),t.addEventListener("webglcontextlost",$,!1),t.addEventListener("webglcontextrestored",ue,!1),t.addEventListener("webglcontextcreationerror",le,!1),D===null){const U="webgl2";if(D=At(U,S),D===null)throw At(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(S){throw console.error("THREE.WebGLRenderer: "+S.message),S}let ze,ke,be,Ye,Ee,T,_,F,Y,K,q,me,ie,oe,ve,ee,fe,we,Re,pe,He,Fe,tt,L;function se(){ze=new Cp(D),ze.init(),Fe=new fg(D,ze),ke=new yp(D,ze,e,Fe),be=new ug(D,ze),ke.reverseDepthBuffer&&d&&be.buffers.depth.setReversed(!0),Ye=new Lp(D),Ee=new $m,T=new hg(D,ze,be,Ee,ke,Fe,Ye),_=new bp(M),F=new Ap(M),Y=new Od(D),tt=new Mp(D,Y),K=new Rp(D,Y,Ye,tt),q=new Dp(D,K,Y,Ye),Re=new Ip(D,ke,T),ee=new Ep(Ee),me=new Ym(M,_,F,ze,ke,tt,ee),ie=new Sg(M,Ee),oe=new Zm,ve=new ig(ze),we=new xp(M,_,F,be,q,m,l),fe=new lg(M,q,ke),L=new yg(D,Ye,ke,be),pe=new Sp(D,ze,Ye),He=new Pp(D,ze,Ye),Ye.programs=me.programs,M.capabilities=ke,M.extensions=ze,M.properties=Ee,M.renderLists=oe,M.shadowMap=fe,M.state=be,M.info=Ye}se();const V=new xg(M,D);this.xr=V,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const S=ze.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=ze.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(S){S!==void 0&&(G=S,this.setSize(H,Z,!1))},this.getSize=function(S){return S.set(H,Z)},this.setSize=function(S,U,B=!0){if(V.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}H=S,Z=U,t.width=Math.floor(S*G),t.height=Math.floor(U*G),B===!0&&(t.style.width=S+"px",t.style.height=U+"px"),this.setViewport(0,0,S,U)},this.getDrawingBufferSize=function(S){return S.set(H*G,Z*G).floor()},this.setDrawingBufferSize=function(S,U,B){H=S,Z=U,G=B,t.width=Math.floor(S*B),t.height=Math.floor(U*B),this.setViewport(0,0,S,U)},this.getCurrentViewport=function(S){return S.copy(C)},this.getViewport=function(S){return S.copy(ge)},this.setViewport=function(S,U,B,z){S.isVector4?ge.set(S.x,S.y,S.z,S.w):ge.set(S,U,B,z),be.viewport(C.copy(ge).multiplyScalar(G).round())},this.getScissor=function(S){return S.copy(Ce)},this.setScissor=function(S,U,B,z){S.isVector4?Ce.set(S.x,S.y,S.z,S.w):Ce.set(S,U,B,z),be.scissor(k.copy(Ce).multiplyScalar(G).round())},this.getScissorTest=function(){return Ve},this.setScissorTest=function(S){be.setScissorTest(Ve=S)},this.setOpaqueSort=function(S){ne=S},this.setTransparentSort=function(S){re=S},this.getClearColor=function(S){return S.copy(we.getClearColor())},this.setClearColor=function(){we.setClearColor.apply(we,arguments)},this.getClearAlpha=function(){return we.getClearAlpha()},this.setClearAlpha=function(){we.setClearAlpha.apply(we,arguments)},this.clear=function(S=!0,U=!0,B=!0){let z=0;if(S){let N=!1;if(R!==null){const te=R.texture.format;N=te===po||te===fo||te===ho}if(N){const te=R.texture.type,ce=te===Nn||te===fi||te===_a||te===Wi||te===co||te===uo,_e=we.getClearColor(),xe=we.getClearAlpha(),Pe=_e.r,Ue=_e.g,Me=_e.b;ce?(g[0]=Pe,g[1]=Ue,g[2]=Me,g[3]=xe,D.clearBufferuiv(D.COLOR,0,g)):(v[0]=Pe,v[1]=Ue,v[2]=Me,v[3]=xe,D.clearBufferiv(D.COLOR,0,v))}else z|=D.COLOR_BUFFER_BIT}U&&(z|=D.DEPTH_BUFFER_BIT),B&&(z|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),D.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",$,!1),t.removeEventListener("webglcontextrestored",ue,!1),t.removeEventListener("webglcontextcreationerror",le,!1),oe.dispose(),ve.dispose(),Ee.dispose(),_.dispose(),F.dispose(),q.dispose(),tt.dispose(),L.dispose(),me.dispose(),V.dispose(),V.removeEventListener("sessionstart",Do),V.removeEventListener("sessionend",Uo),Jn.stop()};function $(S){S.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),I=!0}function ue(){console.log("THREE.WebGLRenderer: Context Restored."),I=!1;const S=Ye.autoReset,U=fe.enabled,B=fe.autoUpdate,z=fe.needsUpdate,N=fe.type;se(),Ye.autoReset=S,fe.enabled=U,fe.autoUpdate=B,fe.needsUpdate=z,fe.type=N}function le(S){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function De(S){const U=S.target;U.removeEventListener("dispose",De),ut(U)}function ut(S){Ct(S),Ee.remove(S)}function Ct(S){const U=Ee.get(S).programs;U!==void 0&&(U.forEach(function(B){me.releaseProgram(B)}),S.isShaderMaterial&&me.releaseShaderCache(S))}this.renderBufferDirect=function(S,U,B,z,N,te){U===null&&(U=Qe);const ce=N.isMesh&&N.matrixWorld.determinant()<0,_e=ou(S,U,B,z,N);be.setMaterial(z,ce);let xe=B.index,Pe=1;if(z.wireframe===!0){if(xe=K.getWireframeAttribute(B),xe===void 0)return;Pe=2}const Ue=B.drawRange,Me=B.attributes.position;let Xe=Ue.start*Pe,nt=(Ue.start+Ue.count)*Pe;te!==null&&(Xe=Math.max(Xe,te.start*Pe),nt=Math.min(nt,(te.start+te.count)*Pe)),xe!==null?(Xe=Math.max(Xe,0),nt=Math.min(nt,xe.count)):Me!=null&&(Xe=Math.max(Xe,0),nt=Math.min(nt,Me.count));const rt=nt-Xe;if(rt<0||rt===1/0)return;tt.setup(N,z,_e,B,xe);let Ot,qe=pe;if(xe!==null&&(Ot=Y.get(xe),qe=He,qe.setIndex(Ot)),N.isMesh)z.wireframe===!0?(be.setLineWidth(z.wireframeLinewidth*at()),qe.setMode(D.LINES)):qe.setMode(D.TRIANGLES);else if(N.isLine){let Se=z.linewidth;Se===void 0&&(Se=1),be.setLineWidth(Se*at()),N.isLineSegments?qe.setMode(D.LINES):N.isLineLoop?qe.setMode(D.LINE_LOOP):qe.setMode(D.LINE_STRIP)}else N.isPoints?qe.setMode(D.POINTS):N.isSprite&&qe.setMode(D.TRIANGLES);if(N.isBatchedMesh)if(N._multiDrawInstances!==null)qe.renderMultiDrawInstances(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount,N._multiDrawInstances);else if(ze.get("WEBGL_multi_draw"))qe.renderMultiDraw(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount);else{const Se=N._multiDrawStarts,_n=N._multiDrawCounts,je=N._multiDrawCount,en=xe?Y.get(xe).bytesPerElement:1,mi=Ee.get(z).currentProgram.getUniforms();for(let kt=0;kt<je;kt++)mi.setValue(D,"_gl_DrawID",kt),qe.render(Se[kt]/en,_n[kt])}else if(N.isInstancedMesh)qe.renderInstances(Xe,rt,N.count);else if(B.isInstancedBufferGeometry){const Se=B._maxInstanceCount!==void 0?B._maxInstanceCount:1/0,_n=Math.min(B.instanceCount,Se);qe.renderInstances(Xe,rt,_n)}else qe.render(Xe,rt)};function $e(S,U,B){S.transparent===!0&&S.side===Ut&&S.forceSinglePass===!1?(S.side=gt,S.needsUpdate=!0,Da(S,U,B),S.side=jn,S.needsUpdate=!0,Da(S,U,B),S.side=Ut):Da(S,U,B)}this.compile=function(S,U,B=null){B===null&&(B=S),h=ve.get(B),h.init(U),b.push(h),B.traverseVisible(function(N){N.isLight&&N.layers.test(U.layers)&&(h.pushLight(N),N.castShadow&&h.pushShadow(N))}),S!==B&&S.traverseVisible(function(N){N.isLight&&N.layers.test(U.layers)&&(h.pushLight(N),N.castShadow&&h.pushShadow(N))}),h.setupLights();const z=new Set;return S.traverse(function(N){if(!(N.isMesh||N.isPoints||N.isLine||N.isSprite))return;const te=N.material;if(te)if(Array.isArray(te))for(let ce=0;ce<te.length;ce++){const _e=te[ce];$e(_e,B,N),z.add(_e)}else $e(te,B,N),z.add(te)}),b.pop(),h=null,z},this.compileAsync=function(S,U,B=null){const z=this.compile(S,U,B);return new Promise(N=>{function te(){if(z.forEach(function(ce){Ee.get(ce).currentProgram.isReady()&&z.delete(ce)}),z.size===0){N(S);return}setTimeout(te,10)}ze.get("KHR_parallel_shader_compile")!==null?te():setTimeout(te,10)})};let Qt=null;function vn(S){Qt&&Qt(S)}function Do(){Jn.stop()}function Uo(){Jn.start()}const Jn=new Nc;Jn.setAnimationLoop(vn),typeof self<"u"&&Jn.setContext(self),this.setAnimationLoop=function(S){Qt=S,V.setAnimationLoop(S),S===null?Jn.stop():Jn.start()},V.addEventListener("sessionstart",Do),V.addEventListener("sessionend",Uo),this.render=function(S,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),V.enabled===!0&&V.isPresenting===!0&&(V.cameraAutoUpdate===!0&&V.updateCamera(U),U=V.getCamera()),S.isScene===!0&&S.onBeforeRender(M,S,U,R),h=ve.get(S,b.length),h.init(U),b.push(h),Te.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),W.setFromProjectionMatrix(Te),he=this.localClippingEnabled,J=ee.init(this.clippingPlanes,he),p=oe.get(S,E.length),p.init(),E.push(p),V.enabled===!0&&V.isPresenting===!0){const te=M.xr.getDepthSensingMesh();te!==null&&Cr(te,U,-1/0,M.sortObjects)}Cr(S,U,0,M.sortObjects),p.finish(),M.sortObjects===!0&&p.sort(ne,re),Ge=V.enabled===!1||V.isPresenting===!1||V.hasDepthSensing()===!1,Ge&&we.addToRenderList(p,S),this.info.render.frame++,J===!0&&ee.beginShadows();const B=h.state.shadowsArray;fe.render(B,S,U),J===!0&&ee.endShadows(),this.info.autoReset===!0&&this.info.reset();const z=p.opaque,N=p.transmissive;if(h.setupLights(),U.isArrayCamera){const te=U.cameras;if(N.length>0)for(let ce=0,_e=te.length;ce<_e;ce++){const xe=te[ce];Fo(z,N,S,xe)}Ge&&we.render(S);for(let ce=0,_e=te.length;ce<_e;ce++){const xe=te[ce];No(p,S,xe,xe.viewport)}}else N.length>0&&Fo(z,N,S,U),Ge&&we.render(S),No(p,S,U);R!==null&&(T.updateMultisampleRenderTarget(R),T.updateRenderTargetMipmap(R)),S.isScene===!0&&S.onAfterRender(M,S,U),tt.resetDefaultState(),y=-1,x=null,b.pop(),b.length>0?(h=b[b.length-1],J===!0&&ee.setGlobalState(M.clippingPlanes,h.state.camera)):h=null,E.pop(),E.length>0?p=E[E.length-1]:p=null};function Cr(S,U,B,z){if(S.visible===!1)return;if(S.layers.test(U.layers)){if(S.isGroup)B=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(U);else if(S.isLight)h.pushLight(S),S.castShadow&&h.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||W.intersectsSprite(S)){z&&Ie.setFromMatrixPosition(S.matrixWorld).applyMatrix4(Te);const ce=q.update(S),_e=S.material;_e.visible&&p.push(S,ce,_e,B,Ie.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||W.intersectsObject(S))){const ce=q.update(S),_e=S.material;if(z&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),Ie.copy(S.boundingSphere.center)):(ce.boundingSphere===null&&ce.computeBoundingSphere(),Ie.copy(ce.boundingSphere.center)),Ie.applyMatrix4(S.matrixWorld).applyMatrix4(Te)),Array.isArray(_e)){const xe=ce.groups;for(let Pe=0,Ue=xe.length;Pe<Ue;Pe++){const Me=xe[Pe],Xe=_e[Me.materialIndex];Xe&&Xe.visible&&p.push(S,ce,Xe,B,Ie.z,Me)}}else _e.visible&&p.push(S,ce,_e,B,Ie.z,null)}}const te=S.children;for(let ce=0,_e=te.length;ce<_e;ce++)Cr(te[ce],U,B,z)}function No(S,U,B,z){const N=S.opaque,te=S.transmissive,ce=S.transparent;h.setupLightsView(B),J===!0&&ee.setGlobalState(M.clippingPlanes,B),z&&be.viewport(C.copy(z)),N.length>0&&Ia(N,U,B),te.length>0&&Ia(te,U,B),ce.length>0&&Ia(ce,U,B),be.buffers.depth.setTest(!0),be.buffers.depth.setMask(!0),be.buffers.color.setMask(!0),be.setPolygonOffset(!1)}function Fo(S,U,B,z){if((B.isScene===!0?B.overrideMaterial:null)!==null)return;h.state.transmissionRenderTarget[z.id]===void 0&&(h.state.transmissionRenderTarget[z.id]=new un(1,1,{generateMipmaps:!0,type:ze.has("EXT_color_buffer_half_float")||ze.has("EXT_color_buffer_float")?Pn:Nn,minFilter:wn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:We.workingColorSpace}));const te=h.state.transmissionRenderTarget[z.id],ce=z.viewport||C;te.setSize(ce.z,ce.w);const _e=M.getRenderTarget();M.setRenderTarget(te),M.getClearColor(X),j=M.getClearAlpha(),j<1&&M.setClearColor(16777215,.5),M.clear(),Ge&&we.render(B);const xe=M.toneMapping;M.toneMapping=qn;const Pe=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),h.setupLightsView(z),J===!0&&ee.setGlobalState(M.clippingPlanes,z),Ia(S,B,z),T.updateMultisampleRenderTarget(te),T.updateRenderTargetMipmap(te),ze.has("WEBGL_multisampled_render_to_texture")===!1){let Ue=!1;for(let Me=0,Xe=U.length;Me<Xe;Me++){const nt=U[Me],rt=nt.object,Ot=nt.geometry,qe=nt.material,Se=nt.group;if(qe.side===Ut&&rt.layers.test(z.layers)){const _n=qe.side;qe.side=gt,qe.needsUpdate=!0,Oo(rt,B,z,Ot,qe,Se),qe.side=_n,qe.needsUpdate=!0,Ue=!0}}Ue===!0&&(T.updateMultisampleRenderTarget(te),T.updateRenderTargetMipmap(te))}M.setRenderTarget(_e),M.setClearColor(X,j),Pe!==void 0&&(z.viewport=Pe),M.toneMapping=xe}function Ia(S,U,B){const z=U.isScene===!0?U.overrideMaterial:null;for(let N=0,te=S.length;N<te;N++){const ce=S[N],_e=ce.object,xe=ce.geometry,Pe=z===null?ce.material:z,Ue=ce.group;_e.layers.test(B.layers)&&Oo(_e,U,B,xe,Pe,Ue)}}function Oo(S,U,B,z,N,te){S.onBeforeRender(M,U,B,z,N,te),S.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),N.onBeforeRender(M,U,B,z,S,te),N.transparent===!0&&N.side===Ut&&N.forceSinglePass===!1?(N.side=gt,N.needsUpdate=!0,M.renderBufferDirect(B,U,z,N,S,te),N.side=jn,N.needsUpdate=!0,M.renderBufferDirect(B,U,z,N,S,te),N.side=Ut):M.renderBufferDirect(B,U,z,N,S,te),S.onAfterRender(M,U,B,z,N,te)}function Da(S,U,B){U.isScene!==!0&&(U=Qe);const z=Ee.get(S),N=h.state.lights,te=h.state.shadowsArray,ce=N.state.version,_e=me.getParameters(S,N.state,te,U,B),xe=me.getProgramCacheKey(_e);let Pe=z.programs;z.environment=S.isMeshStandardMaterial?U.environment:null,z.fog=U.fog,z.envMap=(S.isMeshStandardMaterial?F:_).get(S.envMap||z.environment),z.envMapRotation=z.environment!==null&&S.envMap===null?U.environmentRotation:S.envMapRotation,Pe===void 0&&(S.addEventListener("dispose",De),Pe=new Map,z.programs=Pe);let Ue=Pe.get(xe);if(Ue!==void 0){if(z.currentProgram===Ue&&z.lightsStateVersion===ce)return zo(S,_e),Ue}else _e.uniforms=me.getUniforms(S),S.onBeforeCompile(_e,M),Ue=me.acquireProgram(_e,xe),Pe.set(xe,Ue),z.uniforms=_e.uniforms;const Me=z.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Me.clippingPlanes=ee.uniform),zo(S,_e),z.needsLights=cu(S),z.lightsStateVersion=ce,z.needsLights&&(Me.ambientLightColor.value=N.state.ambient,Me.lightProbe.value=N.state.probe,Me.directionalLights.value=N.state.directional,Me.directionalLightShadows.value=N.state.directionalShadow,Me.spotLights.value=N.state.spot,Me.spotLightShadows.value=N.state.spotShadow,Me.rectAreaLights.value=N.state.rectArea,Me.ltc_1.value=N.state.rectAreaLTC1,Me.ltc_2.value=N.state.rectAreaLTC2,Me.pointLights.value=N.state.point,Me.pointLightShadows.value=N.state.pointShadow,Me.hemisphereLights.value=N.state.hemi,Me.directionalShadowMap.value=N.state.directionalShadowMap,Me.directionalShadowMatrix.value=N.state.directionalShadowMatrix,Me.spotShadowMap.value=N.state.spotShadowMap,Me.spotLightMatrix.value=N.state.spotLightMatrix,Me.spotLightMap.value=N.state.spotLightMap,Me.pointShadowMap.value=N.state.pointShadowMap,Me.pointShadowMatrix.value=N.state.pointShadowMatrix),z.currentProgram=Ue,z.uniformsList=null,Ue}function Bo(S){if(S.uniformsList===null){const U=S.currentProgram.getUniforms();S.uniformsList=pr.seqWithValue(U.seq,S.uniforms)}return S.uniformsList}function zo(S,U){const B=Ee.get(S);B.outputColorSpace=U.outputColorSpace,B.batching=U.batching,B.batchingColor=U.batchingColor,B.instancing=U.instancing,B.instancingColor=U.instancingColor,B.instancingMorph=U.instancingMorph,B.skinning=U.skinning,B.morphTargets=U.morphTargets,B.morphNormals=U.morphNormals,B.morphColors=U.morphColors,B.morphTargetsCount=U.morphTargetsCount,B.numClippingPlanes=U.numClippingPlanes,B.numIntersection=U.numClipIntersection,B.vertexAlphas=U.vertexAlphas,B.vertexTangents=U.vertexTangents,B.toneMapping=U.toneMapping}function ou(S,U,B,z,N){U.isScene!==!0&&(U=Qe),T.resetTextureUnits();const te=U.fog,ce=z.isMeshStandardMaterial?U.environment:null,_e=R===null?M.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:Ki,xe=(z.isMeshStandardMaterial?F:_).get(z.envMap||ce),Pe=z.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,Ue=!!B.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),Me=!!B.morphAttributes.position,Xe=!!B.morphAttributes.normal,nt=!!B.morphAttributes.color;let rt=qn;z.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(rt=M.toneMapping);const Ot=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,qe=Ot!==void 0?Ot.length:0,Se=Ee.get(z),_n=h.state.lights;if(J===!0&&(he===!0||S!==x)){const jt=S===x&&z.id===y;ee.setState(z,S,jt)}let je=!1;z.version===Se.__version?(Se.needsLights&&Se.lightsStateVersion!==_n.state.version||Se.outputColorSpace!==_e||N.isBatchedMesh&&Se.batching===!1||!N.isBatchedMesh&&Se.batching===!0||N.isBatchedMesh&&Se.batchingColor===!0&&N.colorTexture===null||N.isBatchedMesh&&Se.batchingColor===!1&&N.colorTexture!==null||N.isInstancedMesh&&Se.instancing===!1||!N.isInstancedMesh&&Se.instancing===!0||N.isSkinnedMesh&&Se.skinning===!1||!N.isSkinnedMesh&&Se.skinning===!0||N.isInstancedMesh&&Se.instancingColor===!0&&N.instanceColor===null||N.isInstancedMesh&&Se.instancingColor===!1&&N.instanceColor!==null||N.isInstancedMesh&&Se.instancingMorph===!0&&N.morphTexture===null||N.isInstancedMesh&&Se.instancingMorph===!1&&N.morphTexture!==null||Se.envMap!==xe||z.fog===!0&&Se.fog!==te||Se.numClippingPlanes!==void 0&&(Se.numClippingPlanes!==ee.numPlanes||Se.numIntersection!==ee.numIntersection)||Se.vertexAlphas!==Pe||Se.vertexTangents!==Ue||Se.morphTargets!==Me||Se.morphNormals!==Xe||Se.morphColors!==nt||Se.toneMapping!==rt||Se.morphTargetsCount!==qe)&&(je=!0):(je=!0,Se.__version=z.version);let en=Se.currentProgram;je===!0&&(en=Da(z,U,N));let mi=!1,kt=!1,Qi=!1;const st=en.getUniforms(),dn=Se.uniforms;if(be.useProgram(en.program)&&(mi=!0,kt=!0,Qi=!0),z.id!==y&&(y=z.id,kt=!0),mi||x!==S){be.buffers.depth.getReversed()?(Q.copy(S.projectionMatrix),fd(Q),pd(Q),st.setValue(D,"projectionMatrix",Q)):st.setValue(D,"projectionMatrix",S.projectionMatrix),st.setValue(D,"viewMatrix",S.matrixWorldInverse);const Fn=st.map.cameraPosition;Fn!==void 0&&Fn.setValue(D,Ae.setFromMatrixPosition(S.matrixWorld)),ke.logarithmicDepthBuffer&&st.setValue(D,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&st.setValue(D,"isOrthographic",S.isOrthographicCamera===!0),x!==S&&(x=S,kt=!0,Qi=!0)}if(N.isSkinnedMesh){st.setOptional(D,N,"bindMatrix"),st.setOptional(D,N,"bindMatrixInverse");const jt=N.skeleton;jt&&(jt.boneTexture===null&&jt.computeBoneTexture(),st.setValue(D,"boneTexture",jt.boneTexture,T))}N.isBatchedMesh&&(st.setOptional(D,N,"batchingTexture"),st.setValue(D,"batchingTexture",N._matricesTexture,T),st.setOptional(D,N,"batchingIdTexture"),st.setValue(D,"batchingIdTexture",N._indirectTexture,T),st.setOptional(D,N,"batchingColorTexture"),N._colorsTexture!==null&&st.setValue(D,"batchingColorTexture",N._colorsTexture,T));const ea=B.morphAttributes;if((ea.position!==void 0||ea.normal!==void 0||ea.color!==void 0)&&Re.update(N,B,en),(kt||Se.receiveShadow!==N.receiveShadow)&&(Se.receiveShadow=N.receiveShadow,st.setValue(D,"receiveShadow",N.receiveShadow)),z.isMeshGouraudMaterial&&z.envMap!==null&&(dn.envMap.value=xe,dn.flipEnvMap.value=xe.isCubeTexture&&xe.isRenderTargetTexture===!1?-1:1),z.isMeshStandardMaterial&&z.envMap===null&&U.environment!==null&&(dn.envMapIntensity.value=U.environmentIntensity),kt&&(st.setValue(D,"toneMappingExposure",M.toneMappingExposure),Se.needsLights&&lu(dn,Qi),te&&z.fog===!0&&ie.refreshFogUniforms(dn,te),ie.refreshMaterialUniforms(dn,z,G,Z,h.state.transmissionRenderTarget[S.id]),pr.upload(D,Bo(Se),dn,T)),z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(pr.upload(D,Bo(Se),dn,T),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&st.setValue(D,"center",N.center),st.setValue(D,"modelViewMatrix",N.modelViewMatrix),st.setValue(D,"normalMatrix",N.normalMatrix),st.setValue(D,"modelMatrix",N.matrixWorld),z.isShaderMaterial||z.isRawShaderMaterial){const jt=z.uniformsGroups;for(let Fn=0,On=jt.length;Fn<On;Fn++){const ko=jt[Fn];L.update(ko,en),L.bind(ko,en)}}return en}function lu(S,U){S.ambientLightColor.needsUpdate=U,S.lightProbe.needsUpdate=U,S.directionalLights.needsUpdate=U,S.directionalLightShadows.needsUpdate=U,S.pointLights.needsUpdate=U,S.pointLightShadows.needsUpdate=U,S.spotLights.needsUpdate=U,S.spotLightShadows.needsUpdate=U,S.rectAreaLights.needsUpdate=U,S.hemisphereLights.needsUpdate=U}function cu(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(S,U,B){Ee.get(S.texture).__webglTexture=U,Ee.get(S.depthTexture).__webglTexture=B;const z=Ee.get(S);z.__hasExternalTextures=!0,z.__autoAllocateDepthBuffer=B===void 0,z.__autoAllocateDepthBuffer||ze.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),z.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(S,U){const B=Ee.get(S);B.__webglFramebuffer=U,B.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(S,U=0,B=0){R=S,w=U,A=B;let z=!0,N=null,te=!1,ce=!1;if(S){const xe=Ee.get(S);if(xe.__useDefaultFramebuffer!==void 0)be.bindFramebuffer(D.FRAMEBUFFER,null),z=!1;else if(xe.__webglFramebuffer===void 0)T.setupRenderTarget(S);else if(xe.__hasExternalTextures)T.rebindTextures(S,Ee.get(S.texture).__webglTexture,Ee.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){const Me=S.depthTexture;if(xe.__boundDepthTexture!==Me){if(Me!==null&&Ee.has(Me)&&(S.width!==Me.image.width||S.height!==Me.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");T.setupDepthRenderbuffer(S)}}const Pe=S.texture;(Pe.isData3DTexture||Pe.isDataArrayTexture||Pe.isCompressedArrayTexture)&&(ce=!0);const Ue=Ee.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Ue[U])?N=Ue[U][B]:N=Ue[U],te=!0):S.samples>0&&T.useMultisampledRTT(S)===!1?N=Ee.get(S).__webglMultisampledFramebuffer:Array.isArray(Ue)?N=Ue[B]:N=Ue,C.copy(S.viewport),k.copy(S.scissor),O=S.scissorTest}else C.copy(ge).multiplyScalar(G).floor(),k.copy(Ce).multiplyScalar(G).floor(),O=Ve;if(be.bindFramebuffer(D.FRAMEBUFFER,N)&&z&&be.drawBuffers(S,N),be.viewport(C),be.scissor(k),be.setScissorTest(O),te){const xe=Ee.get(S.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+U,xe.__webglTexture,B)}else if(ce){const xe=Ee.get(S.texture),Pe=U||0;D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,xe.__webglTexture,B||0,Pe)}y=-1},this.readRenderTargetPixels=function(S,U,B,z,N,te,ce){if(!(S&&S.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let _e=Ee.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&ce!==void 0&&(_e=_e[ce]),_e){be.bindFramebuffer(D.FRAMEBUFFER,_e);try{const xe=S.texture,Pe=xe.format,Ue=xe.type;if(!ke.textureFormatReadable(Pe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ke.textureTypeReadable(Ue)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=S.width-z&&B>=0&&B<=S.height-N&&D.readPixels(U,B,z,N,Fe.convert(Pe),Fe.convert(Ue),te)}finally{const xe=R!==null?Ee.get(R).__webglFramebuffer:null;be.bindFramebuffer(D.FRAMEBUFFER,xe)}}},this.readRenderTargetPixelsAsync=async function(S,U,B,z,N,te,ce){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let _e=Ee.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&ce!==void 0&&(_e=_e[ce]),_e){const xe=S.texture,Pe=xe.format,Ue=xe.type;if(!ke.textureFormatReadable(Pe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ke.textureTypeReadable(Ue))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(U>=0&&U<=S.width-z&&B>=0&&B<=S.height-N){be.bindFramebuffer(D.FRAMEBUFFER,_e);const Me=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,Me),D.bufferData(D.PIXEL_PACK_BUFFER,te.byteLength,D.STREAM_READ),D.readPixels(U,B,z,N,Fe.convert(Pe),Fe.convert(Ue),0);const Xe=R!==null?Ee.get(R).__webglFramebuffer:null;be.bindFramebuffer(D.FRAMEBUFFER,Xe);const nt=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await hd(D,nt,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,Me),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,te),D.deleteBuffer(Me),D.deleteSync(nt),te}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(S,U=null,B=0){S.isTexture!==!0&&(da("WebGLRenderer: copyFramebufferToTexture function signature has changed."),U=arguments[0]||null,S=arguments[1]);const z=Math.pow(2,-B),N=Math.floor(S.image.width*z),te=Math.floor(S.image.height*z),ce=U!==null?U.x:0,_e=U!==null?U.y:0;T.setTexture2D(S,0),D.copyTexSubImage2D(D.TEXTURE_2D,B,0,0,ce,_e,N,te),be.unbindTexture()},this.copyTextureToTexture=function(S,U,B=null,z=null,N=0){S.isTexture!==!0&&(da("WebGLRenderer: copyTextureToTexture function signature has changed."),z=arguments[0]||null,S=arguments[1],U=arguments[2],N=arguments[3]||0,B=null);let te,ce,_e,xe,Pe,Ue,Me,Xe,nt;const rt=S.isCompressedTexture?S.mipmaps[N]:S.image;B!==null?(te=B.max.x-B.min.x,ce=B.max.y-B.min.y,_e=B.isBox3?B.max.z-B.min.z:1,xe=B.min.x,Pe=B.min.y,Ue=B.isBox3?B.min.z:0):(te=rt.width,ce=rt.height,_e=rt.depth||1,xe=0,Pe=0,Ue=0),z!==null?(Me=z.x,Xe=z.y,nt=z.z):(Me=0,Xe=0,nt=0);const Ot=Fe.convert(U.format),qe=Fe.convert(U.type);let Se;U.isData3DTexture?(T.setTexture3D(U,0),Se=D.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(T.setTexture2DArray(U,0),Se=D.TEXTURE_2D_ARRAY):(T.setTexture2D(U,0),Se=D.TEXTURE_2D),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,U.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,U.unpackAlignment);const _n=D.getParameter(D.UNPACK_ROW_LENGTH),je=D.getParameter(D.UNPACK_IMAGE_HEIGHT),en=D.getParameter(D.UNPACK_SKIP_PIXELS),mi=D.getParameter(D.UNPACK_SKIP_ROWS),kt=D.getParameter(D.UNPACK_SKIP_IMAGES);D.pixelStorei(D.UNPACK_ROW_LENGTH,rt.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,rt.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,xe),D.pixelStorei(D.UNPACK_SKIP_ROWS,Pe),D.pixelStorei(D.UNPACK_SKIP_IMAGES,Ue);const Qi=S.isDataArrayTexture||S.isData3DTexture,st=U.isDataArrayTexture||U.isData3DTexture;if(S.isRenderTargetTexture||S.isDepthTexture){const dn=Ee.get(S),ea=Ee.get(U),jt=Ee.get(dn.__renderTarget),Fn=Ee.get(ea.__renderTarget);be.bindFramebuffer(D.READ_FRAMEBUFFER,jt.__webglFramebuffer),be.bindFramebuffer(D.DRAW_FRAMEBUFFER,Fn.__webglFramebuffer);for(let On=0;On<_e;On++)Qi&&D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Ee.get(S).__webglTexture,N,Ue+On),S.isDepthTexture?(st&&D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Ee.get(U).__webglTexture,N,nt+On),D.blitFramebuffer(xe,Pe,te,ce,Me,Xe,te,ce,D.DEPTH_BUFFER_BIT,D.NEAREST)):st?D.copyTexSubImage3D(Se,N,Me,Xe,nt+On,xe,Pe,te,ce):D.copyTexSubImage2D(Se,N,Me,Xe,nt+On,xe,Pe,te,ce);be.bindFramebuffer(D.READ_FRAMEBUFFER,null),be.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else st?S.isDataTexture||S.isData3DTexture?D.texSubImage3D(Se,N,Me,Xe,nt,te,ce,_e,Ot,qe,rt.data):U.isCompressedArrayTexture?D.compressedTexSubImage3D(Se,N,Me,Xe,nt,te,ce,_e,Ot,rt.data):D.texSubImage3D(Se,N,Me,Xe,nt,te,ce,_e,Ot,qe,rt):S.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,N,Me,Xe,te,ce,Ot,qe,rt.data):S.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,N,Me,Xe,rt.width,rt.height,Ot,rt.data):D.texSubImage2D(D.TEXTURE_2D,N,Me,Xe,te,ce,Ot,qe,rt);D.pixelStorei(D.UNPACK_ROW_LENGTH,_n),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,je),D.pixelStorei(D.UNPACK_SKIP_PIXELS,en),D.pixelStorei(D.UNPACK_SKIP_ROWS,mi),D.pixelStorei(D.UNPACK_SKIP_IMAGES,kt),N===0&&U.generateMipmaps&&D.generateMipmap(Se),be.unbindTexture()},this.copyTextureToTexture3D=function(S,U,B=null,z=null,N=0){return S.isTexture!==!0&&(da("WebGLRenderer: copyTextureToTexture3D function signature has changed."),B=arguments[0]||null,z=arguments[1]||null,S=arguments[2],U=arguments[3],N=arguments[4]||0),da('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(S,U,B,z,N)},this.initRenderTarget=function(S){Ee.get(S).__webglFramebuffer===void 0&&T.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?T.setTextureCube(S,0):S.isData3DTexture?T.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?T.setTexture2DArray(S,0):T.setTexture2D(S,0),be.unbindTexture()},this.resetState=function(){w=0,A=0,R=null,be.reset(),tt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Cn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=We._getDrawingBufferColorSpace(e),t.unpackColorSpace=We._getUnpackColorSpace()}}class xo{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new de(e),this.density=t}clone(){return new xo(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class bg extends wt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new gn,this.environmentIntensity=1,this.environmentRotation=new gn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Tg{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=io,this.updateRanges=[],this.version=0,this.uuid=Ln()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let a=0,r=this.stride;a<r;a++)this.array[e+a]=t.array[n+a];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ln()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ln()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Lt=new P;class xr{constructor(e,t,n,a=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=a}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Lt.fromBufferAttribute(this,t),Lt.applyMatrix4(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Lt.fromBufferAttribute(this,t),Lt.applyNormalMatrix(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Lt.fromBufferAttribute(this,t),Lt.transformDirection(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=on(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Ke(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Ke(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Ke(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Ke(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Ke(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=on(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=on(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=on(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=on(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ke(t,this.array),n=Ke(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,a){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ke(t,this.array),n=Ke(n,this.array),a=Ke(a,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=a,this}setXYZW(e,t,n,a,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ke(t,this.array),n=Ke(n,this.array),a=Ke(a,this.array),r=Ke(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=a,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const a=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[a+r])}return new bt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new xr(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const a=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[a+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Ma extends Kn{static get type(){return"SpriteMaterial"}constructor(e){super(),this.isSpriteMaterial=!0,this.color=new de(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Pi;const ra=new P,Li=new P,Ii=new P,Di=new ye,sa=new ye,Vc=new et,tr=new P,oa=new P,nr=new P,Bl=new ye,is=new ye,zl=new ye;class Mr extends wt{constructor(e=new Ma){if(super(),this.isSprite=!0,this.type="Sprite",Pi===void 0){Pi=new vt;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Tg(t,5);Pi.setIndex([0,1,2,0,2,3]),Pi.setAttribute("position",new xr(n,3,0,!1)),Pi.setAttribute("uv",new xr(n,2,3,!1))}this.geometry=Pi,this.material=e,this.center=new ye(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Li.setFromMatrixScale(this.matrixWorld),Vc.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Ii.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Li.multiplyScalar(-Ii.z);const n=this.material.rotation;let a,r;n!==0&&(r=Math.cos(n),a=Math.sin(n));const s=this.center;ir(tr.set(-.5,-.5,0),Ii,s,Li,a,r),ir(oa.set(.5,-.5,0),Ii,s,Li,a,r),ir(nr.set(.5,.5,0),Ii,s,Li,a,r),Bl.set(0,0),is.set(1,0),zl.set(1,1);let o=e.ray.intersectTriangle(tr,oa,nr,!1,ra);if(o===null&&(ir(oa.set(-.5,.5,0),Ii,s,Li,a,r),is.set(0,1),o=e.ray.intersectTriangle(tr,nr,oa,!1,ra),o===null))return;const l=e.ray.origin.distanceTo(ra);l<e.near||l>e.far||t.push({distance:l,point:ra.clone(),uv:Kt.getInterpolation(ra,tr,oa,nr,Bl,is,zl,new ye),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function ir(i,e,t,n,a,r){Di.subVectors(i,t).addScalar(.5).multiply(n),a!==void 0?(sa.x=r*Di.x-a*Di.y,sa.y=a*Di.x+r*Di.y):sa.copy(Di),i.copy(e),i.x+=sa.x,i.y+=sa.y,i.applyMatrix4(Vc)}class Mo extends Kn{static get type(){return"LineBasicMaterial"}constructor(e){super(),this.isLineBasicMaterial=!0,this.color=new de(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Sr=new P,yr=new P,kl=new et,la=new wr,ar=new Ta,as=new P,Gl=new P;class Hc extends wt{constructor(e=new vt,t=new Mo){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let a=1,r=t.count;a<r;a++)Sr.fromBufferAttribute(t,a-1),yr.fromBufferAttribute(t,a),n[a]=n[a-1],n[a]+=Sr.distanceTo(yr);e.setAttribute("lineDistance",new dt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,a=this.matrixWorld,r=e.params.Line.threshold,s=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ar.copy(n.boundingSphere),ar.applyMatrix4(a),ar.radius+=r,e.ray.intersectsSphere(ar)===!1)return;kl.copy(a).invert(),la.copy(e.ray).applyMatrix4(kl);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,u=this.isLineSegments?2:1,c=n.index,d=n.attributes.position;if(c!==null){const m=Math.max(0,s.start),g=Math.min(c.count,s.start+s.count);for(let v=m,p=g-1;v<p;v+=u){const h=c.getX(v),E=c.getX(v+1),b=rr(this,e,la,l,h,E);b&&t.push(b)}if(this.isLineLoop){const v=c.getX(g-1),p=c.getX(m),h=rr(this,e,la,l,v,p);h&&t.push(h)}}else{const m=Math.max(0,s.start),g=Math.min(d.count,s.start+s.count);for(let v=m,p=g-1;v<p;v+=u){const h=rr(this,e,la,l,v,v+1);h&&t.push(h)}if(this.isLineLoop){const v=rr(this,e,la,l,g-1,m);v&&t.push(v)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const a=t[n[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,s=a.length;r<s;r++){const o=a[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function rr(i,e,t,n,a,r){const s=i.geometry.attributes.position;if(Sr.fromBufferAttribute(s,a),yr.fromBufferAttribute(s,r),t.distanceSqToSegment(Sr,yr,as,Gl)>n)return;as.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(as);if(!(l<e.near||l>e.far))return{distance:l,point:Gl.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}class So extends Kn{static get type(){return"PointsMaterial"}constructor(e){super(),this.isPointsMaterial=!0,this.color=new de(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Vl=new et,ro=new wr,sr=new Ta,or=new P;class yo extends wt{constructor(e=new vt,t=new So){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,a=this.matrixWorld,r=e.params.Points.threshold,s=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),sr.copy(n.boundingSphere),sr.applyMatrix4(a),sr.radius+=r,e.ray.intersectsSphere(sr)===!1)return;Vl.copy(a).invert(),ro.copy(e.ray).applyMatrix4(Vl);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,u=n.index,f=n.attributes.position;if(u!==null){const d=Math.max(0,s.start),m=Math.min(u.count,s.start+s.count);for(let g=d,v=m;g<v;g++){const p=u.getX(g);or.fromBufferAttribute(f,p),Hl(or,p,l,a,e,t,this)}}else{const d=Math.max(0,s.start),m=Math.min(f.count,s.start+s.count);for(let g=d,v=m;g<v;g++)or.fromBufferAttribute(f,g),Hl(or,g,l,a,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const a=t[n[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,s=a.length;r<s;r++){const o=a[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Hl(i,e,t,n,a,r,s){const o=ro.distanceSqToPoint(i);if(o<t){const l=new P;ro.closestPointToPoint(i,l),l.applyMatrix4(n);const u=a.ray.origin.distanceTo(l);if(u<a.near||u>a.far)return;r.push({distance:u,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:s})}}class Zn extends Ft{constructor(e,t,n,a,r,s,o,l,u){super(e,t,n,a,r,s,o,l,u),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Eo extends vt{constructor(e=1,t=32,n=0,a=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:a},t=Math.max(3,t);const r=[],s=[],o=[],l=[],u=new P,c=new ye;s.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let f=0,d=3;f<=t;f++,d+=3){const m=n+f/t*a;u.x=e*Math.cos(m),u.y=e*Math.sin(m),s.push(u.x,u.y,u.z),o.push(0,0,1),c.x=(s[d]/e+1)/2,c.y=(s[d+1]/e+1)/2,l.push(c.x,c.y)}for(let f=1;f<=t;f++)r.push(f,f+1,0);this.setIndex(r),this.setAttribute("position",new dt(s,3)),this.setAttribute("normal",new dt(o,3)),this.setAttribute("uv",new dt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Eo(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Ca extends vt{constructor(e=1,t=1,n=1,a=32,r=1,s=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:a,heightSegments:r,openEnded:s,thetaStart:o,thetaLength:l};const u=this;a=Math.floor(a),r=Math.floor(r);const c=[],f=[],d=[],m=[];let g=0;const v=[],p=n/2;let h=0;E(),s===!1&&(e>0&&b(!0),t>0&&b(!1)),this.setIndex(c),this.setAttribute("position",new dt(f,3)),this.setAttribute("normal",new dt(d,3)),this.setAttribute("uv",new dt(m,2));function E(){const M=new P,I=new P;let w=0;const A=(t-e)/n;for(let R=0;R<=r;R++){const y=[],x=R/r,C=x*(t-e)+e;for(let k=0;k<=a;k++){const O=k/a,X=O*l+o,j=Math.sin(X),H=Math.cos(X);I.x=C*j,I.y=-x*n+p,I.z=C*H,f.push(I.x,I.y,I.z),M.set(j,A,H).normalize(),d.push(M.x,M.y,M.z),m.push(O,1-x),y.push(g++)}v.push(y)}for(let R=0;R<a;R++)for(let y=0;y<r;y++){const x=v[y][R],C=v[y+1][R],k=v[y+1][R+1],O=v[y][R+1];(e>0||y!==0)&&(c.push(x,C,O),w+=3),(t>0||y!==r-1)&&(c.push(C,k,O),w+=3)}u.addGroup(h,w,0),h+=w}function b(M){const I=g,w=new ye,A=new P;let R=0;const y=M===!0?e:t,x=M===!0?1:-1;for(let k=1;k<=a;k++)f.push(0,p*x,0),d.push(0,x,0),m.push(.5,.5),g++;const C=g;for(let k=0;k<=a;k++){const X=k/a*l+o,j=Math.cos(X),H=Math.sin(X);A.x=y*H,A.y=p*x,A.z=y*j,f.push(A.x,A.y,A.z),d.push(0,x,0),w.x=j*.5+.5,w.y=H*.5*x+.5,m.push(w.x,w.y),g++}for(let k=0;k<a;k++){const O=I+k,X=C+k;M===!0?c.push(X,X+1,O):c.push(X+1,X,O),R+=3}u.addGroup(h,R,M===!0?1:2),h+=R}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ca(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class bo extends Ca{constructor(e=1,t=1,n=32,a=1,r=!1,s=0,o=Math.PI*2){super(0,e,t,n,a,r,s,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:a,openEnded:r,thetaStart:s,thetaLength:o}}static fromJSON(e){return new bo(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Sa extends vt{constructor(e=.5,t=1,n=32,a=1,r=0,s=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:a,thetaStart:r,thetaLength:s},n=Math.max(3,n),a=Math.max(1,a);const o=[],l=[],u=[],c=[];let f=e;const d=(t-e)/a,m=new P,g=new ye;for(let v=0;v<=a;v++){for(let p=0;p<=n;p++){const h=r+p/n*s;m.x=f*Math.cos(h),m.y=f*Math.sin(h),l.push(m.x,m.y,m.z),u.push(0,0,1),g.x=(m.x/t+1)/2,g.y=(m.y/t+1)/2,c.push(g.x,g.y)}f+=d}for(let v=0;v<a;v++){const p=v*(n+1);for(let h=0;h<n;h++){const E=h+p,b=E,M=E+n+1,I=E+n+2,w=E+1;o.push(b,M,w),o.push(M,I,w)}}this.setIndex(o),this.setAttribute("position",new dt(l,3)),this.setAttribute("normal",new dt(u,3)),this.setAttribute("uv",new dt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Sa(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class ct extends vt{constructor(e=1,t=32,n=16,a=0,r=Math.PI*2,s=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:a,phiLength:r,thetaStart:s,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(s+o,Math.PI);let u=0;const c=[],f=new P,d=new P,m=[],g=[],v=[],p=[];for(let h=0;h<=n;h++){const E=[],b=h/n;let M=0;h===0&&s===0?M=.5/t:h===n&&l===Math.PI&&(M=-.5/t);for(let I=0;I<=t;I++){const w=I/t;f.x=-e*Math.cos(a+w*r)*Math.sin(s+b*o),f.y=e*Math.cos(s+b*o),f.z=e*Math.sin(a+w*r)*Math.sin(s+b*o),g.push(f.x,f.y,f.z),d.copy(f).normalize(),v.push(d.x,d.y,d.z),p.push(w+M,1-b),E.push(u++)}c.push(E)}for(let h=0;h<n;h++)for(let E=0;E<t;E++){const b=c[h][E+1],M=c[h][E],I=c[h+1][E],w=c[h+1][E+1];(h!==0||s>0)&&m.push(b,M,w),(h!==n-1||l<Math.PI)&&m.push(M,I,w)}this.setIndex(m),this.setAttribute("position",new dt(g,3)),this.setAttribute("normal",new dt(v,3)),this.setAttribute("uv",new dt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ct(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class $t extends Kn{static get type(){return"MeshStandardMaterial"}constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new de(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new de(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ec,this.normalScale=new ye(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new gn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Wc extends wt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new de(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}const rs=new et,Wl=new P,Xl=new P;class wg{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ye(512,512),this.map=null,this.mapPass=null,this.matrix=new et,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new vo,this._frameExtents=new ye(1,1),this._viewportCount=1,this._viewports=[new Je(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Wl.setFromMatrixPosition(e.matrixWorld),t.position.copy(Wl),Xl.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Xl),t.updateMatrixWorld(),rs.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(rs),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(rs)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const ql=new et,ca=new P,ss=new P;class Ag extends wg{constructor(){super(new Wt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ye(4,2),this._viewportCount=6,this._viewports=[new Je(2,1,1,1),new Je(0,1,1,1),new Je(3,1,1,1),new Je(1,1,1,1),new Je(3,0,1,1),new Je(1,0,1,1)],this._cubeDirections=[new P(1,0,0),new P(-1,0,0),new P(0,0,1),new P(0,0,-1),new P(0,1,0),new P(0,-1,0)],this._cubeUps=[new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,0,1),new P(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,a=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),ca.setFromMatrixPosition(e.matrixWorld),n.position.copy(ca),ss.copy(n.position),ss.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(ss),n.updateMatrixWorld(),a.makeTranslation(-ca.x,-ca.y,-ca.z),ql.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ql)}}class Cg extends Wc{constructor(e,t,n=0,a=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=a,this.shadow=new Ag}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Rg extends Wc{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class Xc{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=jl(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=jl();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function jl(){return performance.now()}const Yl=new et;class Pg{constructor(e,t,n=0,a=1/0){this.ray=new wr(e,t),this.near=n,this.far=a,this.camera=null,this.layers=new go,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Yl.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Yl),this}intersectObject(e,t=!0,n=[]){return so(e,this,n,t),n.sort($l),n}intersectObjects(e,t=!0,n=[]){for(let a=0,r=e.length;a<r;a++)so(e[a],this,n,t);return n.sort($l),n}}function $l(i,e){return i.distance-e.distance}function so(i,e,t,n){let a=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(a=!1),a===!0&&n===!0){const r=i.children;for(let s=0,o=r.length;s<o;s++)so(r[s],e,t,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:oo}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=oo);const qc={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class Ra{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const Lg=new Fc(-1,1,1,-1,0,1);class Ig extends vt{constructor(){super(),this.setAttribute("position",new dt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new dt([0,2,0,0,2,0],2))}}const Dg=new Ig;class jc{constructor(e){this._mesh=new Be(Dg,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Lg)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class Yc extends Ra{constructor(e,t){super(),this.textureID=t!==void 0?t:"tDiffuse",e instanceof it?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Yn.clone(e.uniforms),this.material=new it({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new jc(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class Kl extends Ra{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){const a=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let s,o;this.inverse?(s=0,o=1):(s=1,o=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(a.REPLACE,a.REPLACE,a.REPLACE),r.buffers.stencil.setFunc(a.ALWAYS,s,4294967295),r.buffers.stencil.setClear(o),r.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(a.EQUAL,1,4294967295),r.buffers.stencil.setOp(a.KEEP,a.KEEP,a.KEEP),r.buffers.stencil.setLocked(!0)}}class Ug extends Ra{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class Ng{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const n=e.getSize(new ye);this._width=n.width,this._height=n.height,t=new un(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Pn}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Yc(qc),this.copyPass.material.blending=Rn,this.clock=new Xc}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let n=!1;for(let a=0,r=this.passes.length;a<r;a++){const s=this.passes[a];if(s.enabled!==!1){if(s.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(a),s.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),s.needsSwap){if(n){const o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}Kl!==void 0&&(s instanceof Kl?n=!0:s instanceof Ug&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new ye);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const n=this._width*this._pixelRatio,a=this._height*this._pixelRatio;this.renderTarget1.setSize(n,a),this.renderTarget2.setSize(n,a);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,a)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class Fg extends Ra{constructor(e,t,n=null,a=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=a,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new de}render(e,t,n){const a=e.autoClear;e.autoClear=!1;let r,s;this.overrideMaterial!==null&&(s=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=s),e.autoClear=a}}const Og={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new de(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class ji extends Ra{constructor(e,t,n,a){super(),this.strength=t!==void 0?t:1,this.radius=n,this.threshold=a,this.resolution=e!==void 0?new ye(e.x,e.y):new ye(256,256),this.clearColor=new de(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),s=Math.round(this.resolution.y/2);this.renderTargetBright=new un(r,s,{type:Pn}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let f=0;f<this.nMips;f++){const d=new un(r,s,{type:Pn});d.texture.name="UnrealBloomPass.h"+f,d.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(d);const m=new un(r,s,{type:Pn});m.texture.name="UnrealBloomPass.v"+f,m.texture.generateMipmaps=!1,this.renderTargetsVertical.push(m),r=Math.round(r/2),s=Math.round(s/2)}const o=Og;this.highPassUniforms=Yn.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=a,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new it({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];const l=[3,5,7,9,11];r=Math.round(this.resolution.x/2),s=Math.round(this.resolution.y/2);for(let f=0;f<this.nMips;f++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(l[f])),this.separableBlurMaterials[f].uniforms.invSize.value=new ye(1/r,1/s),r=Math.round(r/2),s=Math.round(s/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const u=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=u,this.bloomTintColors=[new P(1,1,1),new P(1,1,1),new P(1,1,1),new P(1,1,1),new P(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const c=qc;this.copyUniforms=Yn.clone(c.uniforms),this.blendMaterial=new it({uniforms:this.copyUniforms,vertexShader:c.vertexShader,fragmentShader:c.fragmentShader,blending:Nt,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new de,this.oldClearAlpha=1,this.basic=new Dn,this.fsQuad=new jc(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),a=Math.round(t/2);this.renderTargetBright.setSize(n,a);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,a),this.renderTargetsVertical[r].setSize(n,a),this.separableBlurMaterials[r].uniforms.invSize.value=new ye(1/n,1/a),n=Math.round(n/2),a=Math.round(a/2)}render(e,t,n,a,r){e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();const s=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),r&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=n.texture,e.setRenderTarget(null),e.clear(),this.fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this.fsQuad.render(e);let o=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this.fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[l].uniforms.direction.value=ji.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this.fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=ji.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this.fsQuad.render(e),o=this.renderTargetsVertical[l];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(n),this.fsQuad.render(e)),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=s}getSeperableBlurMaterial(e){const t=[];for(let n=0;n<e;n++)t.push(.39894*Math.exp(-.5*n*n/(e*e))/e);return new it({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new ye(.5,.5)},direction:{value:new ye(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}getCompositeMaterial(e){return new it({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}}ji.BlurDirectionX=new ye(1,0);ji.BlurDirectionY=new ye(0,1);const Bg=.5*(Math.sqrt(3)-1),ua=(3-Math.sqrt(3))/6,zg=1/3,hn=1/6,kg=(Math.sqrt(5)-1)/4,Tt=(5-Math.sqrt(5))/20,yt=new Float32Array([1,1,0,-1,1,0,1,-1,0,-1,-1,0,1,0,1,-1,0,1,1,0,-1,-1,0,-1,0,1,1,0,-1,1,0,1,-1,0,-1,-1]),ft=new Float32Array([0,1,1,1,0,1,1,-1,0,1,-1,1,0,1,-1,-1,0,-1,1,1,0,-1,1,-1,0,-1,-1,1,0,-1,-1,-1,1,0,1,1,1,0,1,-1,1,0,-1,1,1,0,-1,-1,-1,0,1,1,-1,0,1,-1,-1,0,-1,1,-1,0,-1,-1,1,1,0,1,1,1,0,-1,1,-1,0,1,1,-1,0,-1,-1,1,0,1,-1,1,0,-1,-1,-1,0,1,-1,-1,0,-1,1,1,1,0,1,1,-1,0,1,-1,1,0,1,-1,-1,0,-1,1,1,0,-1,1,-1,0,-1,-1,1,0,-1,-1,-1,0]);class Gg{constructor(e=Math.random){const t=typeof e=="function"?e:Hg(e);this.p=Vg(t),this.perm=new Uint8Array(512),this.permMod12=new Uint8Array(512);for(let n=0;n<512;n++)this.perm[n]=this.p[n&255],this.permMod12[n]=this.perm[n]%12}noise2D(e,t){const n=this.permMod12,a=this.perm;let r=0,s=0,o=0;const l=(e+t)*Bg,u=Math.floor(e+l),c=Math.floor(t+l),f=(u+c)*ua,d=u-f,m=c-f,g=e-d,v=t-m;let p,h;g>v?(p=1,h=0):(p=0,h=1);const E=g-p+ua,b=v-h+ua,M=g-1+2*ua,I=v-1+2*ua,w=u&255,A=c&255;let R=.5-g*g-v*v;if(R>=0){const C=n[w+a[A]]*3;R*=R,r=R*R*(yt[C]*g+yt[C+1]*v)}let y=.5-E*E-b*b;if(y>=0){const C=n[w+p+a[A+h]]*3;y*=y,s=y*y*(yt[C]*E+yt[C+1]*b)}let x=.5-M*M-I*I;if(x>=0){const C=n[w+1+a[A+1]]*3;x*=x,o=x*x*(yt[C]*M+yt[C+1]*I)}return 70*(r+s+o)}noise3D(e,t,n){const a=this.permMod12,r=this.perm;let s,o,l,u;const c=(e+t+n)*zg,f=Math.floor(e+c),d=Math.floor(t+c),m=Math.floor(n+c),g=(f+d+m)*hn,v=f-g,p=d-g,h=m-g,E=e-v,b=t-p,M=n-h;let I,w,A,R,y,x;E>=b?b>=M?(I=1,w=0,A=0,R=1,y=1,x=0):E>=M?(I=1,w=0,A=0,R=1,y=0,x=1):(I=0,w=0,A=1,R=1,y=0,x=1):b<M?(I=0,w=0,A=1,R=0,y=1,x=1):E<M?(I=0,w=1,A=0,R=0,y=1,x=1):(I=0,w=1,A=0,R=1,y=1,x=0);const C=E-I+hn,k=b-w+hn,O=M-A+hn,X=E-R+2*hn,j=b-y+2*hn,H=M-x+2*hn,Z=E-1+3*hn,G=b-1+3*hn,ne=M-1+3*hn,re=f&255,ge=d&255,Ce=m&255;let Ve=.6-E*E-b*b-M*M;if(Ve<0)s=0;else{const Q=a[re+r[ge+r[Ce]]]*3;Ve*=Ve,s=Ve*Ve*(yt[Q]*E+yt[Q+1]*b+yt[Q+2]*M)}let W=.6-C*C-k*k-O*O;if(W<0)o=0;else{const Q=a[re+I+r[ge+w+r[Ce+A]]]*3;W*=W,o=W*W*(yt[Q]*C+yt[Q+1]*k+yt[Q+2]*O)}let J=.6-X*X-j*j-H*H;if(J<0)l=0;else{const Q=a[re+R+r[ge+y+r[Ce+x]]]*3;J*=J,l=J*J*(yt[Q]*X+yt[Q+1]*j+yt[Q+2]*H)}let he=.6-Z*Z-G*G-ne*ne;if(he<0)u=0;else{const Q=a[re+1+r[ge+1+r[Ce+1]]]*3;he*=he,u=he*he*(yt[Q]*Z+yt[Q+1]*G+yt[Q+2]*ne)}return 32*(s+o+l+u)}noise4D(e,t,n,a){const r=this.perm;let s,o,l,u,c;const f=(e+t+n+a)*kg,d=Math.floor(e+f),m=Math.floor(t+f),g=Math.floor(n+f),v=Math.floor(a+f),p=(d+m+g+v)*Tt,h=d-p,E=m-p,b=g-p,M=v-p,I=e-h,w=t-E,A=n-b,R=a-M;let y=0,x=0,C=0,k=0;I>w?y++:x++,I>A?y++:C++,I>R?y++:k++,w>A?x++:C++,w>R?x++:k++,A>R?C++:k++;const O=y>=3?1:0,X=x>=3?1:0,j=C>=3?1:0,H=k>=3?1:0,Z=y>=2?1:0,G=x>=2?1:0,ne=C>=2?1:0,re=k>=2?1:0,ge=y>=1?1:0,Ce=x>=1?1:0,Ve=C>=1?1:0,W=k>=1?1:0,J=I-O+Tt,he=w-X+Tt,Q=A-j+Tt,Te=R-H+Tt,Ae=I-Z+2*Tt,Ie=w-G+2*Tt,Qe=A-ne+2*Tt,Ge=R-re+2*Tt,at=I-ge+3*Tt,D=w-Ce+3*Tt,At=A-Ve+3*Tt,ze=R-W+3*Tt,ke=I-1+4*Tt,be=w-1+4*Tt,Ye=A-1+4*Tt,Ee=R-1+4*Tt,T=d&255,_=m&255,F=g&255,Y=v&255;let K=.6-I*I-w*w-A*A-R*R;if(K<0)s=0;else{const ve=r[T+r[_+r[F+r[Y]]]]%32*4;K*=K,s=K*K*(ft[ve]*I+ft[ve+1]*w+ft[ve+2]*A+ft[ve+3]*R)}let q=.6-J*J-he*he-Q*Q-Te*Te;if(q<0)o=0;else{const ve=r[T+O+r[_+X+r[F+j+r[Y+H]]]]%32*4;q*=q,o=q*q*(ft[ve]*J+ft[ve+1]*he+ft[ve+2]*Q+ft[ve+3]*Te)}let me=.6-Ae*Ae-Ie*Ie-Qe*Qe-Ge*Ge;if(me<0)l=0;else{const ve=r[T+Z+r[_+G+r[F+ne+r[Y+re]]]]%32*4;me*=me,l=me*me*(ft[ve]*Ae+ft[ve+1]*Ie+ft[ve+2]*Qe+ft[ve+3]*Ge)}let ie=.6-at*at-D*D-At*At-ze*ze;if(ie<0)u=0;else{const ve=r[T+ge+r[_+Ce+r[F+Ve+r[Y+W]]]]%32*4;ie*=ie,u=ie*ie*(ft[ve]*at+ft[ve+1]*D+ft[ve+2]*At+ft[ve+3]*ze)}let oe=.6-ke*ke-be*be-Ye*Ye-Ee*Ee;if(oe<0)c=0;else{const ve=r[T+1+r[_+1+r[F+1+r[Y+1]]]]%32*4;oe*=oe,c=oe*oe*(ft[ve]*ke+ft[ve+1]*be+ft[ve+2]*Ye+ft[ve+3]*Ee)}return 27*(s+o+l+u+c)}}function Vg(i){const e=new Uint8Array(256);for(let t=0;t<256;t++)e[t]=t;for(let t=0;t<255;t++){const n=t+~~(i()*(256-t)),a=e[t];e[t]=e[n],e[n]=a}return e}function Hg(i){let e=0,t=0,n=0,a=1;const r=Wg();return e=r(" "),t=r(" "),n=r(" "),e-=r(i),e<0&&(e+=1),t-=r(i),t<0&&(t+=1),n-=r(i),n<0&&(n+=1),function(){const s=2091639*e+a*23283064365386963e-26;return e=t,t=n,n=s-(a=s|0)}}function Wg(){let i=4022871197;return function(e){e=e.toString();for(let t=0;t<e.length;t++){i+=e.charCodeAt(t);let n=.02519603282416938*i;i=n>>>0,n-=i,n*=i,i=n>>>0,n-=i,i+=n*4294967296}return(i>>>0)*23283064365386963e-26}}const zi=[{id:"sol",name:"El Sol",type:"Estrella enana amarilla (G2V)",radius:4.8,dist:0,speed:0,color:16755200,desc:"El Sol es una estrella de tipo espectral G2V que alberga el 99.86% de la masa del Sistema Solar. En su núcleo, la fusión nuclear convierte hidrógeno en helio a 15 millones de grados.",descLevels:{primaria:"¡El Sol es una bola gigante de fuego y luz! Es tan grande que dentro cabrían un millón de Tierras. Nos da calor y hace posible la vida en nuestro planeta.",secundaria:"El Sol es una estrella enana amarilla compuesta de hidrógeno y helio. En su núcleo ocurre la fusión nuclear, generando una energía inmensa que viaja 8 minutos hasta llegar a la Tierra.",avanzado:"Estrella de secuencia principal G2V en equilibrio hidrostático. Su núcleo opera mediante la cadena protón-protón a 15 MK, generando un flujo radiativo y convectivo con ciclos magnéticos de 11 años."},scaleComp:{ref:"Tierra",sizeStr:"109x diámetro terrestre",massStr:"333,000x masa terrestre"},facts:["Temperatura superficial de unos 5,500 °C, núcleo a 15,000,000 °C.","Consume 600 millones de toneladas de hidrógeno por segundo.","La luz solar tarda aproximadamente 8 minutos y 20 segundos en llegar a la Tierra."],fun:"¿Sabías que el Sol es tan grande que dentro de él cabrían un millón de planetas Tierra?"},{id:"mercurio",name:"Mercurio",type:"Planeta rocoso",radius:.65,dist:11,speed:4.15,color:10197915,desc:"El planeta más cercano al Sol y el más pequeño del Sistema Solar. Al carecer de una atmósfera significativa, experimenta las variaciones térmicas más extremas del sistema.",descLevels:{primaria:"Mercurio es el planeta más cercano al Sol. Es un mundo rocoso lleno de cráteres, ¡como nuestra Luna! De día hace un calor abrasador y de noche un frío helado.",secundaria:"Por su cercanía al Sol y su delgada exosfera, Mercurio sufre un rango térmico salvaje: desde 430 °C al mediodía hasta -180 °C en su noche.",avanzado:"Cuerpo altamente denso con un núcleo de hierro masivo que ocupa el 85% de su radio. Presenta una resonancia espín-órbita 3:2 única debida a fuerzas de marea solares."},scaleComp:{ref:"Tierra",sizeStr:"0.38x diámetro terrestre",massStr:"0.055x masa terrestre"},facts:["Temperaturas extremas: de 430 °C de día a -180 °C de noche.","Un año dura 88 días terrestres, pero su día dura 59 días.","Posee un núcleo metálico que ocupa el 85% del planeta."],fun:"En Mercurio tu cumpleaños sería cada 3 meses, pero un solo día dura casi dos meses enteros."},{id:"venus",name:"Venus",type:"Planeta rocoso",radius:1.15,dist:16,speed:1.62,color:15253872,desc:"El planeta más cálido del Sistema Solar debido a un efecto invernadero descontrolado. Su densa atmósfera de dióxido de carbono atrapa el calor de forma extrema.",descLevels:{primaria:"Venus es el planeta más caliente de todos. Está cubierto por nubes amarillas que atrapan el calor como una manta gigante. ¡Brilla muchísimo en el cielo al amanecer!",secundaria:"Aunque Mercurio está más cerca del Sol, Venus es más caliente (465 °C) por su atmósfera de CO2 que causa un efecto invernadero desbocado. Gira al revés que la Tierra.",avanzado:"Atmósfera hiperdensa de CO2 con presión superficial de 92 bar y nubes de ácido sulfúrico. Su rotación retrógrada ultralenta indica posibles colisiones masivas en el eón Hádico."},scaleComp:{ref:"Tierra",sizeStr:"0.95x diámetro terrestre",massStr:"0.81x masa terrestre"},facts:["Presión atmosférica 92 veces superior a la de la Tierra.","Lluvia permanente de ácido sulfúrico en sus capas altas.","Su rotación es retrógrada: el Sol sale por el oeste."],fun:"¡Un día en Venus dura más que su año! Gira tan despacio sobre sí mismo que tarda 243 días terrestres en dar una vuelta."},{id:"tierra",name:"La Tierra",type:"Planeta rocoso habitado",radius:1.35,dist:23,speed:1,color:3900150,desc:"Nuestro hogar: el único cuerpo celeste conocido que alberga vida. Su atmósfera rica en nitrógeno y oxígeno, junto a océanos de agua líquida, lo hacen único.",descLevels:{primaria:"¡Nuestro planeta azul! Es el único lugar donde sabemos que hay vida. Tiene agua dulce, océanos profundos, bosques y una atmósfera que nos permite respirar.",secundaria:"La Tierra posee un campo magnético protector generado por su núcleo de hierro líquido, agua en los tres estados de la materia y placas tectónicas activas.",avanzado:"Planeta terrestre con biosfera autorregulada, campo geomagnético dipolar y tectónica de placas. La inclinación axial de 23.4° genera ciclos estacionales estables y clima moderado."},scaleComp:{ref:"Tierra",sizeStr:"1.0x (Estándar de referencia)",massStr:"1.0x (5.972 × 10^24 kg)"},facts:["El 71% de su superficie está cubierta por océanos de agua líquida.","Su escudo magnético nos protege de la radiación solar letal.","Posee una Luna proporcionalmente masiva que estabiliza su eje."],fun:"Aunque sentimos que estamos quietos, ¡la Tierra viaja por el espacio a 107,000 km/h alrededor del Sol!"},{id:"marte",name:"Marte",type:"Planeta rocoso",radius:.85,dist:31,speed:.53,color:15680580,desc:'El "Planeta Rojo", cuyo color se debe al óxido de hierro en su superficie. Alberga el volcán más alto y el cañón más profundo de todo el Sistema Solar.',descLevels:{primaria:"Le dicen el Planeta Rojo porque su tierra es de color óxido. Tiene el volcán más gigante que existe, el Monte Olimpo, ¡tres veces más alto que el Everest!",secundaria:"Marte tuvo ríos y lagos en el pasado distante. Hoy es un desierto helado con casquetes polares de agua y CO2 congelado y un periodo orbital de 687 días.",avanzado:"Presenta geomorfología fluvial fósil y dicotomía hemisférica crustal. El Monte Olimpo (21.9 km) y Valles Marineris evidencian una pluma mantélica duradera sin tectónica móvil."},scaleComp:{ref:"Tierra",sizeStr:"0.53x diámetro terrestre",massStr:"0.11x masa terrestre"},facts:["Monte Olimpo: 21.9 km de altura, casi el triple del Everest.","Valles Marineris: un cañón de 4,000 km de largo y 7 km de profundidad.","Tiene dos lunas de forma irregular: Fobos y Deimos."],fun:"En Marte los atardeceres no son naranjas ni rojos: el polvo de su atmósfera hace que el cielo se vea azul brillante al ponerse el Sol."},{id:"jupiter",name:"Júpiter",type:"Gigante gaseoso",radius:2.9,dist:45,speed:.084,color:16096779,desc:"El coloso del Sistema Solar: un gigante de hidrógeno y helio con más masa que todos los demás planetas juntos. Su Gran Mancha Roja es una tormenta anticiclónica.",descLevels:{primaria:"¡Es el rey de los planetas! Es una bola enorme de gas con rayas de colores y una Gran Mancha Roja que es en realidad un huracán más grande que toda la Tierra.",secundaria:"Júpiter es un gigante gaseoso que actúa como un escudo gravitacional para el Sistema Solar interior, desviando cometas y asteroides con su inmensa masa.",avanzado:"Gigante joviano compuesto en un 90% por hidrógeno. Su interior alberga hidrógeno metálico degenerado que impulsa un campo magnético 20,000 veces mayor que el terrestre."},scaleComp:{ref:"Tierra",sizeStr:"11.2x diámetro terrestre",massStr:"318x masa terrestre"},facts:["Su masa es 2.5 veces la de todos los demás planetas combinados.","La Gran Mancha Roja es una tormenta con vientos de 430 km/h activa hace siglos.","Posee más de 90 satélites, incluidos los 4 mundos galileanos."],fun:"¡Tiene el día más corto del Sistema Solar! A pesar de su tamaño gigantesco, da una vuelta sobre sí mismo en solo 9 horas y 55 minutos."},{id:"saturno",name:"Saturno",type:"Gigante gaseoso con anillos",radius:2.3,dist:61,speed:.034,color:16638023,desc:"Famoso por su espectacular sistema de anillos hechos de hielo, roca y polvo cósmico. Es un gigante gaseoso con una densidad menor que la del agua.",descLevels:{primaria:"¡El planeta de los anillos mágicos! Sus anillos brillan porque están hechos de miles de millones de trozos de hielo y espejos de roca flotando a su alrededor.",secundaria:"Saturno posee un sistema de anillos de 282,000 km de diámetro pero con un grosor de apenas 10 a 100 metros. Tiene más de 140 lunas confirmadas.",avanzado:"El planeta con menor densidad media (0.687 g/cm³). Sus anillos principales (A, B, C) mantienen su estructura gracias al confinamiento resonante de lunas pastoras."},scaleComp:{ref:"Tierra",sizeStr:"9.45x diámetro terrestre",massStr:"95.2x masa terrestre"},facts:["Sus anillos miden 282,000 km de ancho pero solo ~10 metros de grosor.","Es el único planeta cuya densidad es menor que la del agua (flotaría).","Su luna Titán tiene océanos y lluvias de metano líquido."],fun:"Si pudieras encontrar una piscina gigante y lanzaras a Saturno dentro, ¡el planeta flotaría como una pelota de playa!"},{id:"urano",name:"Urano",type:"Gigante de hielo",radius:1.7,dist:76,speed:.012,color:2282478,desc:'Un gigante de hielo teñido de cian por el metano atmosférico. Rota "de lado" con una inclinación axial de 98°, posiblemente debido a un cataclismo en su formación.',descLevels:{primaria:"¡El planeta helado que gira acostado! Es de color celeste turquesa muy bonito y rueda por el espacio como si fuera una canica gigante.",secundaria:"Urano tiene una inclinación axial extrema de 98°, lo que provoca que sus polos pasen 42 años en luz solar continua seguidos de 42 años de oscuridad completa.",avanzado:"Gigante de hielo con manto de fluidos supercríticos (agua, amoníaco, metano). Su eje de rotación tumbado es probablemente resultado de una colisión con un protoplaneta."},scaleComp:{ref:"Tierra",sizeStr:"4.0x diámetro terrestre",massStr:"14.5x masa terrestre"},facts:["Inclinación axial de 98°: gira casi paralelo a su plano orbital.","Tiene la temperatura atmosférica más baja medida: -224 °C.","Sus estaciones duran 21 años terrestres cada una."],fun:"Por estar girando de lado, en el polo norte de Urano el Sol no se pone durante 42 años seguidos... ¡y luego es de noche durante otros 42 años!"},{id:"neptuno",name:"Neptuno",type:"Gigante de hielo",radius:1.65,dist:91,speed:.006,color:2450411,desc:"El planeta más distante del Sol. Un mundo helado y azul donde soplan los vientos más supersónicos de todo el Sistema Solar, superando los 2,100 km/h.",descLevels:{primaria:"Es el planeta más lejano, de un azul intenso y profundo. Allí hay tormentas de viento increíbles, mucho más fuertes que el tornado más rápido de la Tierra.",secundaria:"Neptuno fue el primer planeta descubierto mediante cálculos matemáticos antes de ser visto con un telescopio. Tarda 165 años en dar una vuelta al Sol.",avanzado:"Presenta vientos zonales retrógrados que alcanzan 600 m/s impulsados por calor interno residual. Su luna Tritón orbita de forma retrógrada (objeto capturado del cinturón de Kuiper)."},scaleComp:{ref:"Tierra",sizeStr:"3.88x diámetro terrestre",massStr:"17.1x masa terrestre"},facts:["Vientos supersónicos récord que superan los 2,100 km/h.","Fue descubierto matemáticamente en 1846 por variaciones en la órbita de Urano.","Su luna Tritón tiene géiseres que expulsan nitrógeno líquido al espacio."],fun:"¡En Neptuno llueven diamantes! La increíble presión atmosférica comprime el carbono cristalizándolo en diamantes que caen hacia su núcleo."}],rn=[{id:"agujero",name:'Agujero Negro Relativista ("Gargantua")',type:"Singularidad Gravitacional Supermasiva",pos:[0,-2,-26],teff:25e3,spectralClass:"Accretion X-Ray / UV Continuum",keplerianVelocity:"0.45c - 0.72c (ISCO)",density:"Singularidad + Disco (10^-8 g/cm³)",relativityParams:{mass:1,accretionRate:1.2,inclination:.15,dopplerStrength:1.35,lensingEnabled:1,showGeodesicGrid:0},desc:"Un agujero negro relativista modelado con precisión astrofísica. Su inmenso campo gravitatorio curva el espacio-tiempo, doblando la trayectoria de la luz en un Anillo de Einstein y acelerando su disco de acreción hasta temperaturas de rayos X con efecto Doppler relativista (beaming).",descLevels:{primaria:"¡Es el objeto con más fuerza de atracción del universo! Su gravedad es tan poderosa que ni siquiera la luz puede escapar. A su alrededor hay un disco de gas caliente brillando.",secundaria:"Un agujero negro curva el espacio-tiempo a su alrededor. Vemos la parte trasera de su disco por encima y por debajo debido al efecto de lente gravitacional de Einstein.",avanzado:"Métrica de Kerr-Schild hipermasiva con disco de acreción ópticamente delgado. Muestra asimetría de brillo por beaming relativista (efecto Doppler amplificado) y anillo fotónico al borde de la última órbita estable (ISCO)."},scaleComp:{ref:"Sol",sizeStr:"Diámetro de Horizonte: ~1 AU (150 M km)",massStr:"4.3 millones de masas solares"},facts:["Lente gravitacional de Einstein: la luz del disco trasero se curva por encima y por debajo del horizonte.","Efecto Doppler Relativista (Beaming): el lado que gira hacia nosotros resplandece en blanco-cian brillante; el que se aleja se atenúa en tonos rojos y ámbar.","Chorros relativistas de materia eyectada a lo largo del eje magnético a casi la velocidad de la luz."],fun:"Si pudieras mirar este agujero negro de frente, ¡estarías viendo su parte trasera y delantera al mismo tiempo gracias a que la luz viaja en círculos!"},{id:"pulsar",name:"Púlsar de Neutrones Magnetizado",type:"Estrella de Neutrones en Rotación Ultrarrápida",pos:[110,35,-125],teff:1e6,spectralClass:"Magnetar Synchrotron Beams",keplerianVelocity:"0.2c (Haz sincrotrón dipolar)",density:"10^14 g/cm³ (Fluido nuclear degenerado)",desc:"El núcleo colapsado remanente de una supernova masiva. Con apenas 20 km de diámetro y una densidad equivalente a mil millones de toneladas por centímetro cúbico, gira a 30 revoluciones por segundo emitiendo haces de radiación sincrotrón como un faro cósmico.",descLevels:{primaria:"¡Es como el faro más rápido del espacio! Es una pequeña bola superdensa que gira rapidísimo lanzando rayos láser cósmicos por sus polos.",secundaria:"Cuando una estrella supermasiva estalla en supernova, su núcleo puede colapsar en una estrella de neutrones. Gira tan rápido por la conservación del momento angular.",avanzado:"Estrella de neutrones altamente magnetizada (campo 10^12 Gauss) emitiendo radiación sincrotrón por aceleración de partículas en su magnetosfera con un periodo de 33 ms."},scaleComp:{ref:"Tierra",sizeStr:"20 km (Tamaño de una ciudad)",massStr:"1.4x a 2.1x masas solares"},facts:["Densidad nuclear extrema: una sola cucharadita pesaría el equivalente al Everest (mil millones de toneladas).","Rotación vertiginosa: gira a 30 revoluciones por segundo (1,800 RPM).","Chorros electromagnéticos de radiación sincrotrón pulsados en intervalos atómicos exactos."],fun:"¡Gira más rápido que el motor de un coche de Fórmula 1 a máxima velocidad y pesa más que todo nuestro Sol en el tamaño de una ciudad!"},{id:"nebulosa",name:'Nebulosa de Emisión H-alpha ("Pilares")',type:"Nube Interestelar de Ionización y Vivero Estelar",pos:[-115,-28,-130],teff:8e3,spectralClass:"SHO Narrowband (H-alpha / OIII / SII)",keplerianVelocity:"25 km/s (Turbulencia interestelar)",density:"100 - 1000 part./cm³ (Nube molecular)",desc:"Una vasta catedral de gas ionizado y polvo interestelar a miles de años luz. Modelada con paletas de astrofotografía (H-alpha en rojo carmín, [OIII] en cian luminoso y [SII] en ámbar dorado), alberga un cúmulo de jóvenes estrellas supergigantes O y B que esculpen la nube con sus vientos ultravioleta.",descLevels:{primaria:"¡Es una fábrica de estrellas bebé en el cielo! Son nubes gigantescas de gas de colores rosa, celeste y oro donde nacen nuevos soles.",secundaria:"Las nebulosas de emisión brillan porque la radiación ultravioleta de estrellas calientes excita los átomos de hidrógeno y oxígeno del gas circundante.",avanzado:"Región HII de fotoionización ionizada por estrellas jóvenes OB. La emisión espectral sigue la paleta de Hubble (SHO) diferenciando gradientes de densidad, ionización e hidrocarburos policíclicos aromáticos."},scaleComp:{ref:"Sol",sizeStr:"~30 a 50 años luz de envergadura",massStr:"Miles de masas solares en gas y polvo"},facts:["Espectroscopía astrofotográfica: rojo por emisión de Hidrógeno-alfa, cian por Oxígeno-III ionizado.","Cúmulo estelar joven en el corazón: estrellas azules supermasivas que viven apenas pocos millones de años.","Pilares de creación donde la gravedad comprime gas molecular para encender nuevas estrellas."],fun:"¡Esta nube es tan enorme que un rayo de luz tardaría 40 años en cruzar de un extremo a otro a 300,000 km por segundo!"},{id:"galaxia",name:"Galaxia Espiral Barrada (Tipo SBbc)",type:"Isla Universal de 100 Mil Millones de Soles",pos:[-45,68,-195],teff:5800,spectralClass:"SBbc (Disco de Población I + Bulbo de Población II)",keplerianVelocity:"220 km/s (Velocidad en el radio óptico)",density:"0.1 átomo/cm³ (Media del disco interestelar)",desc:"Una estructura galáctica majestuosa con un núcleo bulbo amarillo de estrellas viejas (Población II) y brazos espirales azules colmados de estrellas calientes (Población I) y corredores oscuros de polvo molecular absorbiendo la luz estelar de fondo.",descLevels:{primaria:"¡Una gigantesca espiral formada por cien mil millones de estrellas! Nuestra propia Vía Láctea es una galaxia hermana muy parecida a esta.",secundaria:"Las galaxias espirales tienen un centro amarillento lleno de estrellas antiguas y brazos azules donde nacen soles nuevos en espirales de ondas de densidad.",avanzado:"Morfología espiral con ondas de densidad en co-rotación. Presenta gradiente de metalicidad y color (Población I en disco delgado y II en bulbo), con pistas oscuras de extinción por polvo frío."},scaleComp:{ref:"Sol",sizeStr:"100,000 años luz de diámetro",massStr:"100,000 millones de masas solares"},facts:["Brazos espirales azules: regiones de activa formación estelar con supergigantes masivas.","Bulbo central amarillo: población estelar de edad madura densamente agrupada en torno al núcleo.","Bandas oscuras interestelares: polvo frío de silicatos y grafito que bloquea y dispersa la luz óptica."],fun:"¡Si contaras una estrella de esta galaxia cada segundo, tardarías más de 3,000 años sin dormir en terminarlas todas!"},{id:"gigante",name:"Gigante Roja en Fase Asintótica",type:"Estrella Evolucionada en Expansión Masiva",pos:[85,-45,-160],teff:3100,spectralClass:"M8III (Rama Gigante Asintótica AGB)",keplerianVelocity:"15 km/s (Velocidad terminal de viento estelar)",density:"10^-7 g/cm³ (Envoltura convectiva ultrararefacta)",desc:"Una estrella evolutivamente anciana que ha agotado su hidrógeno central y quema helio en sus capas externas. Su superficie ha crecido hasta alcanzar 250 veces el diámetro del Sol, mostrando células de convección gigantescas, pulsaciones térmicas y un viento estelar supermasivo.",descLevels:{primaria:"¡Una estrella anciana que se hincha como un globo rojo gigante! Dentro de 5 mil millones de años nuestro Sol se convertirá en una estrella así.",secundaria:"Cuando una estrella de masa media agota su hidrógeno, su núcleo se contrae y su corteza se expande enormemente y se enfría, adquiriendo color rojo.",avanzado:"Fase de rama gigante asintótica (AGB). Exhibe inestabilidad pulsacional con supergranulación convectiva macroscópica y alta pérdida de masa por presión de radiación sobre granos de polvo."},scaleComp:{ref:"Sol",sizeStr:"250x diámetro solar (Absorbería órbita de la Tierra)",massStr:"1.2x masa solar en rápida eyección"},facts:["Diámetro colosal: si estuviera en lugar del Sol, engulliría a Mercurio, Venus y la Tierra.","Células de convección masivas: cada burbuja brillante en su superficie es tan grande como Júpiter.","Vientos estelares densos que enriquecen el espacio interestelar con carbono, oxígeno y nitrógeno."],fun:"¡Cada mancha o burbuja de calor que ves bullendo en la superficie de esta estrella es más grande que todo el planeta Júpiter!"},{id:"enana",name:"Enana Blanca Degenerada con Disco",type:"Remanente Estelar de Alta Densidad con Anillo de Escombros",pos:[-80,20,-110],teff:25e3,spectralClass:"DA2 Degenerate White Dwarf",keplerianVelocity:"50 km/s (Disco de escombros circunestelar)",density:"10^6 g/cm³ (Degeneración de Fermi electrónica)",desc:"El núcleo de carbono-oxígeno expuesto tras la expulsión de una nebulosa planetaria. Sostenida únicamente por la presión de degeneración de electrones, esta brasa cósmica caliente está rodeada por un anillo de escombros de asteroides y planetas rocosos destruidos por fuerzas de marea.",descLevels:{primaria:"¡Es el corazón brillante que queda cuando una estrella como el Sol envejece! Tiene el tamaño de la Tierra, pero pesa tanto como el Sol entero.",secundaria:"Las enanas blancas no realizan fusión nuclear; brillan por su calor residual latente durante miles de millones de años hasta enfriarse.",avanzado:"Remanente estelar sostenido contra el colapso gravitatorio por presión de degeneración electrónica de Fermi. Su anillo circumestelar proviene de la disrupción planetaria por el límite de Roche."},scaleComp:{ref:"Tierra",sizeStr:"1.0x tamaño (diámetro terrestre)",massStr:"330,000x masa (densidad extrema)"},facts:["Sin fusión nuclear propia: su altísima luminosidad ultravioleta proviene de su calor térmico residual.","Límite de Chandrasekhar: la masa máxima de una enana blanca es 1.44 masas solares antes de colapsar o explotar.","Su anillo circumestelar contiene minerales silicatos de exoplanetas rocosos destruidos por mareas gravitacionales."],fun:"¡Una cuchara de materia tomada del corazón de esta pequeña estrella blanca pesaría en la Tierra tanto como un autobús escolar entero!"},{id:"protoplanetario",name:"Disco Protoplanetario Herbig-Haro (HH-24)",type:"Estrella T-Tauri Joven con Chorro Bipolar Colimado",pos:[-65,-48,-155],teff:4200,spectralClass:"K7Vp (T-Tauri) + Shock HII Jets",keplerianVelocity:"35 km/s (Disco interior) - 5 km/s (Borde externo)",density:"10^10 part./cm³ (Plano medio del disco de acreción)",desc:'Una estrella recién nacida envuelta en un disco circunestelar de polvo y gas que gira bajo las leyes de Kepler. En las ranuras o "gaps" del disco, protoplanetas emergentes despejan sus órbitas, mientras que los campos magnéticos coliman y expulsan materia en chorros supersónicos bipolares.',descLevels:{primaria:"¡Así nació nuestro Sistema Solar hace 4,600 millones de años! Un disco de polvo gira alrededor de un bebé de sol mientras las rocas se juntan para formar planetas.",secundaria:"Los discos protoplanetarios muestran anillos oscuros donde planetas en formación están limpiando su órbita por gravedad, lanzando chorros de gas por los polos de la estrella.",avanzado:"Sistema Herbig-Haro accionado por acreción magnetocentrífuga. El perfil del disco obedece la rotación kepleriana (T² ∝ a³), con brechas dinámicas abiertas por resonancias planetarias de Lindblad."},scaleComp:{ref:"Sol",sizeStr:"Diámetro de Disco: ~200 AU (30,000 millones km)",massStr:"1.1x masa solar (Estrella + Disco)"},facts:["Brechas Keplerianas: los surcos vacíos en el disco revelan planetas jóvenes en formación.","Chorros colimados HH: eyecciones bipolares que superan los 250 km/s colisionando con el medio interestelar.","El telescopio ALMA ha cartografiado estos discos en milimétrico con resolución sin precedentes."],fun:"¡En este disco de polvo cósmico se están construyendo futuros planetas como la Tierra, Marte o Júpiter ahora mismo!"},{id:"binario",name:"Sistema Binario de Contacto (Lóbulo de Roche L1)",type:"Binaria Semi-Desprendida con Transferencia de Masa",pos:[130,-25,-180],teff:12500,spectralClass:"B8V + K2III (Accretion Stream L1)",keplerianVelocity:"310 km/s (Órbita sincrónica mutua)",density:"Plasma de Acreción L1 (10^-9 g/cm³)",desc:"Un par de estrellas orbitando tan estrechamente que la estrella gigante llena su Lóbulo de Roche. A través del Punto de Lagrange interno (L1), una corriente de plasma ardiente fluye hacia la estrella azul principal, formando un disco de acreción circunestelar en su entorno.",descLevels:{primaria:"¡Dos soles bailando muy juntos! Uno de ellos se ha hecho tan grande que le está pasando su fuego y materia al otro como una cascada cósmica.",secundaria:"Cuando una estrella en un sistema doble envejece y se expande más allá de su lóbulo de gravedad (Roche), su masa es atraída por su compañera a través del punto L1.",avanzado:"Binaria interactuante semi-desprendida en transferencia de masa térmica conservativa. El flujo de plasma en el punto de Lagrange L1 genera un impacto de frente de choque (hot spot) al colisionar con el disco de la primaria."},scaleComp:{ref:"Sol",sizeStr:"Separación orbital: ~0.1 AU (15 millones de km)",massStr:"3.5x masa solar combinada"},facts:["Lóbulo de Roche: el límite gravitacional máximo que una estrella puede ocupar en un sistema binario.","Punto de Lagrange L1: punto de equilibrio gravitacional por donde se transfiere el plasma entre ambas estrellas.","Órbita ultracorta: completan una vuelta mutua en solo pocas horas a cientos de kilómetros por segundo."],fun:"¡Estas dos estrellas están tan unidas que una vuelta completa a su alrededor dura menos de un día terrestre!"}],$n=[{id:"ursamajor",name:"Osa Mayor (Ursa Major)",type:"Constelación & Guía de Navegación",pos:[-220,240,-320],color:8490232,stars:[{name:"Dubhe",p:[-200,260,-310],mag:1.8},{name:"Merak",p:[-225,230,-325],mag:2.3},{name:"Phecda",p:[-240,215,-340],mag:2.4},{name:"Megrez",p:[-215,235,-335],mag:3.3},{name:"Alioth",p:[-190,245,-350],mag:1.7},{name:"Mizar",p:[-170,255,-365],mag:2},{name:"Alkaid",p:[-145,260,-385],mag:1.8}],lines:[[0,1],[1,2],[2,3],[3,0],[3,4],[4,5],[5,6]],desc:'La Osa Mayor contiene "El Carro", una de las figuras celestes más reconocibles. Sus estrellas Merak y Dubhe actúan como punteros celestes directos hacia Polaris.',descLevels:{primaria:"¡El famoso Carro o Cazo del cielo norte! Si trazas una línea imaginaria entre sus dos estrellas delanteras, llegarás directo a la Estrella Polar.",secundaria:"Cinco de las siete estrellas del Carro pertenecen a una misma asociación estelar en movimiento, nacidas juntas de una misma nube interestelar hace 300 millones de años.",avanzado:"Asterismo de referencia en astrometría. Las misiones de exploración profunda como las sondas Voyager y New Horizons emplean rastreadores estelares (Star Trackers) calibrados con estas posiciones."},scaleComp:{ref:"Esfera Celeste",sizeStr:"128 grados cuadrados en el cielo norte",massStr:"Cúmulo estelar de la Osa Mayor a 80 años luz"},facts:["Merak y Dubhe señalan con precisión matemática la posición del Norte geográfico celeste.","Alberga en su campo profunda la Galaxia de Bode (M81) y el Cigarro (M82).","El telescopio espacial Hubble apuntó a una zona vacía de la Osa Mayor en 1995 para revelar miles de galaxias (Hubble Deep Field)."],fun:"¡En la antigüedad los marineros, comerciantes y pioneros usaban este carro celestial como brújula natural para cruzar océanos sin perderse!"},{id:"ursaminor",name:"Osa Menor (Polaris)",type:"Constelación & Eje Celeste Norte",pos:[0,390,-210],color:9684477,stars:[{name:"Polaris (Estrella Polar)",p:[0,405,-200],mag:1.9},{name:"Kochab",p:[-15,375,-220],mag:2},{name:"Pherkad",p:[15,365,-230],mag:3},{name:"Yildun",p:[5,390,-215],mag:4.3}],lines:[[0,3],[3,1],[1,2]],desc:"Su estrella principal, Polaris, está situada casi exactamente en la proyección del eje de rotación de la Tierra en el cielo del norte, por lo que parece permanecer inmóvil toda la noche.",descLevels:{primaria:"¡La Estrella Polar es la brújula del cielo! Mírala por la noche y siempre te indicará hacia dónde queda el Norte.",secundaria:"Polaris es en realidad un sistema triple de estrellas y una supergigante amarilla palpitante (cefeida) que dista unos 433 años luz de nosotros.",avanzado:"Debido a la precesión de los equinoccios (ciclo de 25,772 años), Polaris es temporalmente nuestra estrella polar; en el año 14000, Vega ocupará su lugar."},scaleComp:{ref:"Polaris vs Sol",sizeStr:"37x diámetro solar (Polaris Aa)",massStr:"5.4x masa solar (Supergigante F7Ib)"},facts:["Punto estelar de orientación para navegantes terrestres, aéreos y astronáuticos.","Su luminosidad es unas 2,500 veces superior al brillo de nuestro Sol.","Las cámaras de navegación de la NASA en órbita terrestre verifican actitud con Polaris."],fun:"¡Aunque parece fija, la Tierra se tambalea lentamente como una peonza y dentro de miles de años tendremos otra estrella polar!"},{id:"ori",name:"Orión (El Cazador)",type:"Constelación & Vivero Estelar",pos:[260,40,-350],color:3718648,stars:[{name:"Betelgeuse",p:[240,75,-340],mag:.5},{name:"Rigel",p:[280,10,-360],mag:.1},{name:"Bellatrix",p:[275,70,-345],mag:1.6},{name:"Saiph",p:[245,15,-355],mag:2},{name:"Alnitak",p:[255,42,-350],mag:1.7},{name:"Alnilam",p:[260,42,-350],mag:1.7},{name:"Mintaka",p:[265,42,-350],mag:2.2}],lines:[[0,4],[2,6],[4,5],[5,6],[4,3],[6,1],[0,2],[1,3]],desc:"Una de las constelaciones más emblemáticas y visibles desde ambos hemisferios. En su espada alberga la Nebulosa de Orión (M42), una cuna de formación estelar analizada en detalle por los telescopios Hubble y James Webb.",descLevels:{primaria:"¡El gran cazador celeste con su cinturón de tres estrellas! En su hombro brilla Betelgeuse de color naranja y en su pie brilla Rigel azul.",secundaria:"Betelgeuse es una supergigante roja a punto de estallar en supernova. En el centro de Orión se encuentra M42, la fábrica de estrellas más cercana a la Tierra.",avanzado:"La Nebulosa de Orión (M42) a 1,344 años luz es un laboratorio astrofísico prioritario. El telescopio James Webb ha relevado discos protoplanetarios y enanas marrones en su centro (cúmulo del Trapecio)."},scaleComp:{ref:"Betelgeuse vs Sol",sizeStr:"~764x diámetro solar",massStr:"16.5x masa solar"},facts:["El Cinturón de Orión (Alnitak, Alnilam, Mintaka) guía hacia Sirio y Aldebarán.","El Telescopio Espacial James Webb descubrió en M42 más de 500 candidatos a planetas vagabundos (JUMBOs).","Betelgeuse es tan grande que si se ubicara en el lugar del Sol, llegaría hasta el cinturón de asteroides."],fun:"¡Cuando Betelgeuse explote como supernova, brillará en nuestro cielo de día durante meses con el brillo de la Luna llena!"},{id:"cassiopeia",name:"Casiopea (La Reina W)",type:"Constelación & Remanente de Supernova",pos:[180,310,-260],color:11032055,stars:[{name:"Schedar",p:[165,320,-250],mag:2.2},{name:"Caph",p:[150,300,-260],mag:2.3},{name:"Gamma Cas",p:[185,330,-255],mag:2.1},{name:"Ruchbah",p:[200,310,-265],mag:2.7},{name:"Segin",p:[215,295,-270],mag:3.3}],lines:[[1,0],[0,2],[2,3],[3,4]],desc:'Reconocible por su inconfundible forma en "W" o "M" en el cielo del hemisferio norte. En su interior se encuentra Cassiopeia A, el remanente de una colosal supernova observada en el siglo XVII.',descLevels:{primaria:"¡Se parece a una letra W gigante dibujada con estrellas! Está justo en el lado opuesto a la Osa Mayor respecto a la Estrella Polar.",secundaria:"Alberga a Cassiopeia A, la fuente de ondas de radio y rayos X más potente del cielo más allá de nuestro Sistema Solar, producto de una explosión estelar masiva.",avanzado:"El remanente Cassiopeia A fue la primera imagen oficial capturada por el observatorio de rayos X Chandra de la NASA en 1999 y re-estudiada por el James Webb en infrarrojo medio."},scaleComp:{ref:"Cassiopeia A",sizeStr:"10 años luz de diámetro en expansión",massStr:"Proyectada a 4,000 - 6,000 km/s"},facts:["Su estrella central Gamma Cassiopeiae es un rotador rápido que emite anillos de gas.","Cassiopeia A reveló cómo las supernovas sintetizan y dispersan hierro y oxígeno en el cosmos.","Visible todo el año desde hemisferio norte por ser una constelación circumpolar."],fun:"¡La luz de la explosión estelar de Cassiopeia A viajó durante 11,000 años antes de llegar a la Tierra hace apenas 300 años!"},{id:"cygnus",name:"Cisne (La Cruz del Norte & Cygnus X-1)",type:"Constelación & Primer Agujero Negro Confirmado",pos:[-280,280,-210],color:6333946,stars:[{name:"Deneb",p:[-295,305,-200],mag:1.25},{name:"Albireo",p:[-260,255,-225],mag:3},{name:"Sadr",p:[-280,280,-210],mag:2.2},{name:"Gienah",p:[-305,275,-215],mag:2.5},{name:"Delta Cygni",p:[-265,295,-205],mag:2.9}],lines:[[0,2],[2,1],[3,2],[2,4]],desc:"El majestuoso Cisne volando a lo largo de la Vía Láctea. Contiene la estrella supergigante blanca Deneb y el sistema Cygnus X-1, el primer agujero negro estelar descubierto y confirmado en la historia de la exploración espacial.",descLevels:{primaria:"¡Una cruz gigante que vuela en el cielo de verano! Su estrella más brillante es Deneb, que forma parte del Triángulo de Verano.",secundaria:"En esta constelación se descubrió Cygnus X-1: un agujero negro que devora gas de una estrella compañera supergigante azul emitiendo intensos rayos X.",avanzado:"Cygnus X-1 (a 7,200 años luz) alberga un agujero negro de 21 masas solares en órbita cerrada (5.6 días) con HDE 226868, verificado por satélites Uhuru y telescopios espaciales de rayos X."},scaleComp:{ref:"Deneb vs Sol",sizeStr:"~203x diámetro solar",massStr:"19x masa solar (Supergigante A2Ia)"},facts:["Deneb es una de las estrellas más luminosas conocidas (brilla 200,000 veces más que el Sol).","Cygnus X-1 fue el objeto de una famosa apuesta entre Stephen Hawking y Kip Thorne en 1975.","Albireo es un sistema binario visual de contraste oro y azul zafiro."],fun:"¡Stephen Hawking apostó que Cygnus X-1 no era un agujero negro y tuvo que pagar su apuesta en 1990 cuando las misiones espaciales confirmaron que sí lo era!"},{id:"crux",name:"Cruz del Sur (Crux Australis)",type:"Constelación & Guía del Sur",pos:[-150,-320,-290],color:16007006,stars:[{name:"Acrux",p:[-150,-340,-285],mag:.77},{name:"Mimosa",p:[-135,-315,-295],mag:1.25},{name:"Gacrux",p:[-150,-300,-290],mag:1.64},{name:"Imai",p:[-165,-320,-290],mag:2.8}],lines:[[0,2],[1,3]],desc:"La constelación más pequeña pero una de las más emblemáticas del cielo austral. Sus estrellas guían el eje hacia el polo sur celeste y marcan la famosa nebulosa oscura del Saco de Carbón.",descLevels:{primaria:"¡La cruz brillante del hemisferio sur! Aparece en las banderas de países como Brasil, Australia y Nueva Zelanda.",secundaria:"El eje mayor entre Gacrux y Acrux apunta hacia el polo sur celeste. Junto a ella descansa el Saco de Carbón, una nube oscura interestelar.",avanzado:"Acrux es un sistema estelar múltiple con supergigantes calientes tipo B. Constituye un hito de calibración para misiones astronómicas australes y telescopios en el desierto de Atacama."},scaleComp:{ref:"Acrux A vs Sol",sizeStr:"7.8x diámetro solar",massStr:"18x masa solar"},facts:["Constelación más compacta de las 88 reconocidas por la Unión Astronómica Internacional.","Su estrella superior Gacrux es una gigante roja situada a solo 88 años luz.","Símbolo histórico de navegación interoceánica para navegantes del Pacífico y Atlántico Sur."],fun:"¡Aunque es la más diminuta de todas las constelaciones, es tan famosa que aparece en la bandera de cinco naciones del mundo!"},{id:"scorpius",name:"Escorpión (Scorpius & Antares)",type:"Constelación & Supergigante Roja",pos:[300,-200,-280],color:16347926,stars:[{name:"Antares",p:[290,-185,-275],mag:.96},{name:"Graffias",p:[275,-165,-290],mag:2.6},{name:"Dschubba",p:[280,-175,-285],mag:2.3},{name:"Sargas",p:[315,-225,-275],mag:1.8},{name:"Shaula",p:[325,-240,-270],mag:1.6},{name:"Lesath",p:[325,-245,-272],mag:2.7}],lines:[[1,2],[2,0],[0,3],[3,4],[4,5]],desc:"El impresionante Escorpión del cielo veraniego, dominado en su corazón por Antares, una supergigante roja hipermasiva de color rubí.",descLevels:{primaria:"¡Tiene forma de escorpión real con una cola en gancho y un corazón rojo brillante llamado Antares!",secundaria:'Antares significa "el rival de Marte" por su intenso color rojo. Es una estrella que está al final de su vida expulsando vientos estelares masivos.',avanzado:"Antares (a 550 años luz) es una supergigante M1.5Iab que alberga un sistema binario con Antares B. Su atmósfera extendida ha sido cartografiada por interferometría infrarroja de alta resolución."},scaleComp:{ref:"Antares vs Sol",sizeStr:"~680x diámetro solar (Engulliría a Marte)",massStr:"12x masa solar"},facts:['En la cola del escorpión brillan las estrellas Shaula y Lesath ("El aguijón").',"Antares es una de las pocas estrellas cuya superficie y vientos han sido fotografiados en detalle.","Rica región en cúmulos globulares como M4 y M80 explorados por telescopios espaciales."],fun:"¡Si pusieras a Antares en el centro de nuestro Sistema Solar, nos comería a nosotros, a Marte y al cinturón de asteroides!"},{id:"centaurus",name:"Centauro (Próxima Centauri)",type:"Constelación & Vecino Estelar Más Cercano",pos:[-260,-220,-310],color:3462041,stars:[{name:"Alfa Centauri A/B",p:[-250,-235,-300],mag:-.27},{name:"Próxima Centauri",p:[-245,-240,-295],mag:11},{name:"Hadar (Beta Centauri)",p:[-270,-225,-315],mag:.61},{name:"Menkent",p:[-280,-205,-320],mag:2.06}],lines:[[0,2],[2,3],[0,1]],desc:"El Centauro austral alberga a Alfa Centauri y Próxima Centauri (a solo 4.24 años luz), el sistema estelar más cercano a la Tierra y objetivo primordial de las futuras misiones de exploración interestelar.",descLevels:{primaria:"¡En esta constelación vive nuestra estrella vecina más cercana! Se llama Próxima Centauri y está justo al lado de nuestro Sistema Solar.",secundaria:"Alfa Centauri es un sistema triple. Alrededor de la pequeña enana roja Próxima Centauri orbita Próxima b, un exoplaneta rocoso en la zona habitable.",avanzado:"Próxima Centauri y su exoplaneta Próxima b (descubierto en 2016 por ESO) son el objetivo de la iniciativa de sondas láser ultraligeras Breakthrough Starshot para viajar a 0.2c."},scaleComp:{ref:"Próxima Centauri vs Sol",sizeStr:"0.15x diámetro solar",massStr:"0.12x masa solar (Enana roja M5.5Ve)"},facts:["Próxima Centauri está a 4.24 años luz (~40 billones de kilómetros).","Contiene el cúmulo globular Omega Centauri, conteniendo diez millones de estrellas.","El planeta Próxima b tiene una masa similar a la Tierra y recibe agua líquida potencial."],fun:"¡Con un cohete actual tardaríamos unos 70,000 años en llegar a Próxima Centauri, pero con velas láser interestelares podríamos llegar en solo 20 años!"},{id:"pegasus",name:"Pegaso (El Gran Cuadrado & 51 Pegasi)",type:"Constelación & Primer Exoplaneta Solar",pos:[320,190,-250],color:14870768,stars:[{name:"Markab",p:[305,175,-245],mag:2.49},{name:"Scheat",p:[310,215,-255],mag:2.44},{name:"Algenib",p:[335,180,-240],mag:2.84},{name:"Alpheratz",p:[335,210,-250],mag:2.07}],lines:[[0,1],[1,3],[3,2],[2,0]],desc:'Famosa por su "Gran Cuadrado" de cuatro estrellas prominentes. En esta constelación se descubrió en 1995 el planeta 51 Pegasi b ("Dimidio"), marcando el nacimiento de la búsqueda espacial de exoplanetas.',descLevels:{primaria:"¡El caballo alado mitológico con un gran cuadrado brillante en su cuerpo! Aquí los astrónomos descubrieron el primer planeta fuera de nuestro sistema solar.",secundaria:'51 Pegasi b fue el primer exoplaneta descubierto alrededor de una estrella como el Sol. Es un "Júpiter caliente" que orbita su estrella en solo 4 días.',avanzado:"El descubrimiento de 51 Pegasi b por Michel Mayor y Didier Queloz (Premio Nobel 2019) impulsó misiones espaciales como Kepler, TESS y James Webb para espectroscopía exoplanetaria."},scaleComp:{ref:"51 Pegasi b",sizeStr:"1.9x radio de Júpiter",massStr:"0.47x masa de Júpiter (Júpiter caliente)"},facts:["El Gran Cuadrado de Pegaso sirve para localizar la Galaxia de Andrómeda (M31).","Su estrella Scheat es una gigante roja variable a 196 años luz.","Las misiones de exploración TESS y Kepler han hallado más de 5,500 exoplanetas gracias al camino abierto aquí."],fun:"¡En 51 Pegasi b hace tanto calor (más de 1,000 °C) que el hierro se evapora y llueve hierro fundido en su atmósfera!"},{id:"canismajor",name:"Can Mayor (Sirio)",type:"Constelación & La Estrella Más Brillante",pos:[190,-160,-370],color:16707722,stars:[{name:"Sirio (Sirius A/B)",p:[180,-145,-360],mag:-1.46},{name:"Mirzam",p:[170,-170,-375],mag:1.98},{name:"Wezen",p:[205,-175,-375],mag:1.83},{name:"Adhara",p:[195,-195,-370],mag:1.5}],lines:[[0,1],[0,2],[2,3]],desc:"El Can Mayor acompaña a Orión en la bóveda celeste. Su joya suprema es Sirio, la estrella más brillante de todo el cielo nocturno y hogar de Sirio B, la primera enana blanca estudiada por la astrofísica.",descLevels:{primaria:"¡Sirio es la estrella más brillante de todo el cielo nocturno! Brilla con destellos blancos y azules brillantes como un diamante.",secundaria:"A solo 8.6 años luz, Sirio es un sistema binario. Sirio A es una estrella blanca caliente, y su compañera Sirio B es un pequeño núcleo comprimido de una estrella muerta.",avanzado:"Sirio B fue confirmada por Walter Adams en 1915 como enana blanca degenerada, validando experimentalmente el desplazamiento al rojo gravitacional predicho por Einstein."},scaleComp:{ref:"Sirio A vs Sol",sizeStr:"1.71x diámetro solar",massStr:"2.06x masa solar (25x más luminosa)"},facts:["Magnitud visual de -1.46, solo superada en brillo aparente por el Sol, la Luna y planetas como Venus o Júpiter.","Su enana blanca Sirio B tiene la masa del Sol en el tamaño del planeta Tierra.","El telescopio espacial Hubble ha fotografiado el sistema orbital binario A/B en alta resolución."],fun:"¡Los antiguos egipcios basaron su calendario en la primera aparición de Sirio antes del amanecer, porque anunciaba la crecida anual del río Nilo!"},{id:"taurus",name:"Tauro (Aldebarán & Las Pléyades)",type:"Constelación & Cúmulo de Las Pléyades",pos:[350,110,-260],color:16638023,stars:[{name:"Aldebarán",p:[340,95,-250],mag:.85},{name:"Elnath",p:[365,135,-265],mag:1.65},{name:"Las Pléyades (M45)",p:[355,125,-255],mag:1.6},{name:"Híades",p:[335,105,-252],mag:3}],lines:[[0,1],[0,2],[0,3]],desc:"Una de las constelaciones del zodiaco astronómico del cielo de invierno. Destaca el ojo naranja del toro (Aldebarán) y el cúmulo abierto de Las Pléyades (Las Siete Hermanas), y el remanente de la Nebulosa del Cangrejo (M1).",descLevels:{primaria:"¡El toro celeste que guarda a Las Pléyades, el racimo de estrellas bebé más bonito del cielo nocturno!",secundaria:"Las Pléyades (M45) son un cúmulo estelar joven compuesto por estrellas azules muy calientes rodeadas de nubes de polvo interestelar que reflejan su luz azulada.",avanzado:"Tauro contiene la Nebulosa del Cangrejo (M1), remanente de la supernova SN 1054 con el Púlsar del Cangrejo en su interior, calibrador fundamental en astrofísica de rayos gamma y satélites espaciales."},scaleComp:{ref:"Aldebarán vs Sol",sizeStr:"44x diámetro solar",massStr:"1.16x masa solar (Gigante naranja K5III)"},facts:["Las Pléyades se encuentran a 444 años luz y son visibles a simple vista como 6 o 7 estrellas.",'En la mitología de Japón, el cúmulo de Las Pléyades se conoce con el nombre de "Subaru".',"El Púlsar del Cangrejo gira 30 veces por segundo y fue estudiado a fondo por el observatorio Fermi de la NASA."],fun:"¡La marca de coches Subaru lleva en su logotipo las seis estrellas principales del cúmulo de Las Pléyades de Tauro!"},{id:"leo",name:"León (Régulo & La Hoz)",type:"Constelación & Estrella Ultrarrápida",pos:[-340,90,-280],color:16569165,stars:[{name:"Régulo (Regulus)",p:[-325,75,-270],mag:1.36},{name:"Algieba",p:[-340,95,-280],mag:2.08},{name:"Denebola",p:[-360,105,-290],mag:2.14},{name:"Zosma",p:[-350,115,-285],mag:2.56},{name:"Rasalas",p:[-335,110,-275],mag:3.8}],lines:[[0,1],[1,4],[1,3],[3,2],[0,3]],desc:'El majestuoso León celeste, reconocible por la "Hoz" o signo de interrogación invertido en su cabeza. Su estrella principal, Régulo, gira a una velocidad tan vertiginosa que es notablemente ovalada.',descLevels:{primaria:"¡Tiene forma de un león acostado! Su estrella más brillante está en su corazón y se llama Régulo, el pequeño rey.",secundaria:"Régulo rota sobre sí misma en solo 15.9 horas (el Sol tarda 27 días), provocando que su ecuador sobresalga y su forma sea un huevo achatado.",avanzado:"La forma achatada y la distribución de temperatura por gravedad de Régulo fueron medidas directamente mediante interferometría espacial (CHARA Array)."},scaleComp:{ref:"Régulo A vs Sol",sizeStr:"3.09x diámetro ecuatorial vs 2.4x polar",massStr:"3.8x masa solar"},facts:["Rotación extrema a 317 km/s (el 86% de la velocidad límite en la que la estrella se rompería por fuerza centrífuga).","Contiene el Triángulo de Leo de galaxias (M65, M66 y NGC 3628) fotografiadas por telescopios espaciales.","Es el origen radiante de la lluvia de meteoros de las Leónidas cada mes de noviembre."],fun:"¡Régulo gira tan rápido que si acelerara solo un 14% más, saldría volando en pedazos al espacio!"}],$c={estrellas:{title:"El Ciclo de Vida de las Estrellas",desc:"Un viaje a través de las etapas evolutivas estelares: desde el nacimiento en discos protoplanetarios y el esplendor en secuencia principal hasta sus destinos relativistas.",steps:[{id:"protoplanetario",title:"1. Disco Protoplanetario — Nacimiento Planetario en Gaps Keplerianos",type:"deep"},{id:"sol",title:"2. El Sol — Secuencia Principal",type:"planet"},{id:"gigante",title:"3. Gigante Roja — La Expansión Final",type:"deep"},{id:"enana",title:"4. Enana Blanca — El Núcleo Degenerado",type:"deep"},{id:"pulsar",title:"5. Púlsar de Neutrones — El Faro Cósmico",type:"deep"},{id:"agujero",title:"6. Agujero Negro — La Singularidad Relativista",type:"deep"}]},sistemas_multiples:{title:"Sistemas Estelares Múltiples y Acretantes",desc:"Descubre cómo interactúan gravitacionalmente los sistemas binarios, discos protoplanetarios y singularidades celestes.",steps:[{id:"protoplanetario",title:"1. Disco Protoplanetario — Nacimiento Planetario en Gaps Keplerianos",type:"deep"},{id:"binario",title:"2. Binaria de Contacto — Transferencia de Masa por el Lóbulo de Roche",type:"deep"},{id:"agujero",title:"3. Gargantua y Estrella S2 — Precesión Relativista de Periastro",type:"deep"}]},constelaciones:{title:"Cielo Estrellado & Exploración Espacial",desc:"Recorre las principales constelaciones celestes, mitología y sus vínculos con los hitos de la exploración espacial.",steps:[{id:"ursamajor",title:"1. Osa Mayor — La Gran Guía Celeste",type:"constelacion"},{id:"ursaminor",title:"2. Osa Menor — Polaris y la Navegación Astronáutica",type:"constelacion"},{id:"ori",title:"3. Orión — Viveros Estelares y el Telescopio Webb",type:"constelacion"},{id:"cygnus",title:"4. Cisne — Cygnus X-1 y el Primer Agujero Negro Confirmado",type:"constelacion"},{id:"centaurus",title:"5. Centauro — Próxima Centauri y la Exploración Interestelar",type:"constelacion"},{id:"pegasus",title:"6. Pegaso — 51 Pegasi b y la Revolución Exoplanetaria",type:"constelacion"}]},relativista:{title:"Astrofísica Relativista: Agujeros Negros de Kerr & Púlsares",desc:"Explora la física extrema del espacio-tiempo, el efecto Doppler relativista en discos de acreción y los chorros de sincrotrón.",steps:[{id:"agujero",title:"1. Agujero Negro de Kerr — Doppler Beaming & Lentes Gravitacionales",type:"deep"},{id:"pulsar",title:"2. Púlsar Magnetizado — Haces de Sincrotrón a 30 Hz",type:"deep"},{id:"enana",title:"3. Enana Blanca — Presión de Degeneración de Fermi",type:"deep"},{id:"cygnus",title:"4. Cygnus X-1 — Evidencia Observacional de Rayos X",type:"constelacion"}]},oceanos:{title:"Mundos Océano y Habitalidad en el Sistema Solar",desc:"Explora los planetas clave y gigantes que protegen y sostienen la hidrosfera en el Sistema Solar.",steps:[{id:"tierra",title:"1. La Tierra — El Planeta Azul",type:"planet"},{id:"marte",title:"2. Marte — Océanos del Pasado",type:"planet"},{id:"jupiter",title:"3. Júpiter y sus Lunas Heladas (Europa & Ganimedes)",type:"planet"},{id:"saturno",title:"4. Saturno y Encélado",type:"planet"},{id:"neptuno",title:"5. Neptuno — El Gigante de Hielo",type:"planet"}]},gigantes:{title:"Los Colosos del Sistema Solar",desc:"Recorre los gigantes gaseosos y helados que dominan gravitacionalmente nuestro vecindario estelar.",steps:[{id:"jupiter",title:"1. Júpiter — El Rey de los Planetas",type:"planet"},{id:"saturno",title:"2. Saturno — La Joya de los Anillos",type:"planet"},{id:"urano",title:"3. Urano — El Gigante Inclinado",type:"planet"},{id:"neptuno",title:"4. Neptuno — Tormentas Supersónicas",type:"planet"}]}},Xg=[{q:"¿Qué planeta tiene un día que dura más que su propio año?",opts:["Venus","Mercurio","Marte","Júpiter"],ans:0,exp:"Venus gira tan despacio sobre su propio eje (243 días terrestres) que su día dura más que el tiempo que tarda en orbitar alrededor del Sol (225 días)."},{q:"¿Por qué brilla en blanco-cyan intenso un lado del disco del Agujero Negro Relativista de Kerr y el lado opuesto se enrojece?",opts:["Por el efecto Doppler relativista (Beaming) al acercarse el plasma orbital a velocidades cercanas a la de la luz","Porque el Sol lo ilumina únicamente desde la izquierda","Por la atracción magnética de un púlsar cercano","Porque el lado rojo está cubierto por nubes de polvo frío exclusivamente"],ans:0,exp:"En un agujero negro de Kerr en rotación, el haz relativista (Doppler beaming) hace que el gas que gira hacia el observador a velocidades próximas a c aumente drásticamente su brillo y frecuencia (azul/blanco), mientras que el lado que se aleja sufre desplazamiento al rojo."},{q:"¿Qué constelación alberga a Cygnus X-1, el primer agujero negro de masa estelar confirmado en la historia de la exploración espacial?",opts:["Cisne (Cygnus)","Orión","Osa Mayor","Escorpión"],ans:0,exp:"En la constelación del Cisne se descubrió Cygnus X-1 en 1964 mediante observatorios de rayos X en cohetes suborbitales y satélites espaciales, confirmando la existencia real de los agujeros negros."},{q:"¿Por qué la Estrella Polar (Polaris) en la Osa Menor es tan importante para la navegación espacial y marítima?",opts:["Porque está situada casi exactamente en la línea del eje de rotación norte de la Tierra y parece fija en el cielo","Porque es la estrella más brillante de todo el universo conocido","Porque es el único cuerpo celeste que cambia de color cada hora","Porque está dentro de nuestro propio Sistema Solar"],ans:0,exp:"Al alinearse con el eje norte terrestre, Polaris no parece girar durante la noche, sirviendo como brújula confiable tanto para navegantes como para los sensores estelares de naves espaciales."},{q:"¿Cuál es el sistema estelar más cercano a nuestro Sistema Solar a solo 4.24 años luz de distancia?",opts:["Próxima Centauri (en la constelación del Centauro)","Betelgeuse (en Orión)","Sirio (en el Can Mayor)","Deneb (en el Cisne)"],ans:0,exp:"Próxima Centauri es una enana roja ubicada a solo 4.24 años luz en la constelación del Centauro y alberga el planeta habitado candidato Próxima b, objetivo de futuras sondas interestelares."},{q:"¿Cuál es el planeta con la velocidad de viento más alta del Sistema Solar (hasta 2,100 km/h)?",opts:["Neptuno","Júpiter","Saturno","Urano"],ans:0,exp:"A pesar de estar a gran distancia del Sol, Neptuno posee los vientos más violentos y supersónicos medidos en el Sistema Solar, superando los 2,100 km/h."},{q:"¿Por qué flotaría Saturno si existiera una piscina con suficiente agua para contenerlo?",opts:["Porque su densidad media es menor que la del agua","Porque sus anillos le sirven de flotador","Porque no tiene gravedad propia","Porque está hecho de hielo puramente"],ans:0,exp:"Saturno es el planeta menos denso del Sistema Solar (0.687 g/cm³), por lo que es inferior a la densidad del agua (1.0 g/cm³)."},{q:"¿Por qué la parte interna de un disco protoplanetario gira a mucha mayor velocidad que su borde exterior?",opts:["Por la Tercera Ley de Kepler (T² ∝ a³), donde la gravedad central exige mayores velocidades en órbitas más cercanas","Porque los vientos del viento solar empujan la periferia frenándola","Porque el polvo del exterior es más pesado que el del interior","Por la repulsión magnética de los planetas gigantes exclusivamente"],ans:0,exp:"Según la mecánica orbital kepleriana, la velocidad orbital varía inversamente con la raíz cuadrada de la distancia (v ∝ r^-1/2). Por ello, el disco interno gira muy rápido mientras que la periferia avanza despacio."},{q:"¿Qué es el Lóbulo de Roche en un sistema binario de estrellas?",opts:["El volumen de espacio alrededor de una estrella donde el material está ligado gravitacionalmente a ella","Una nube interestelar en forma de lóbulo que bloquea los rayos X","El anillo brillante que rodea a un agujero negro","El centro magnético de un púlsar"],ans:0,exp:"El Lóbulo de Roche define la región gravitacional propia de cada estrella en un sistema binario. Si una estrella se expande más allá de ese límite, transfiere materia a su compañera a través del punto de Lagrange L1."}];function qg(i,e,t,n=!1){const a=new Sa(i,e,128);a.rotateX(Math.PI/2);const r=new it({uniforms:{uColor:{value:new de(t)},uInnerRadius:{value:i},uOuterRadius:{value:e},uPlanetRadius:{value:i*.55},uSunDir:{value:new P(1,0,0).normalize()},uIsUranus:{value:n?1:0}},vertexShader:`
      varying vec3 vWorldPos;
      varying float vRadius;
      
      void main() {
        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        vWorldPos = worldPos.xyz;
        vRadius = length(position.xz);
        gl_Position = projectionMatrix * viewMatrix * worldPos;
      }
    `,fragmentShader:`
      uniform vec3 uColor;
      uniform float uInnerRadius;
      uniform float uOuterRadius;
      uniform float uPlanetRadius;
      uniform vec3 uSunDir;
      uniform float uIsUranus;
      
      varying vec3 vWorldPos;
      varying float vRadius;
      
      void main() {
        float normR = (vRadius - uInnerRadius) / (uOuterRadius - uInnerRadius);
        
        // 1. Particle density profile & ring divisions
        float alpha = 0.85;
        vec3 ringColor = uColor;
        
        if (uIsUranus > 0.5) {
          // Uranus: narrow, dark, distinct ring bands
          float band = sin(normR * 65.0) * 0.5 + 0.5;
          alpha = pow(band, 3.0) * 0.55 + 0.1;
          ringColor *= 0.8;
        } else {
          // Saturn: C ring (inner, faint), B ring (bright), Cassini Division (gap), A ring (outer)
          if (normR < 0.22) {
            // Crepe C Ring
            alpha = 0.32 * smoothstep(0.0, 0.1, normR);
            ringColor *= 0.75;
          } else if (normR < 0.62) {
            // B Ring (brightest and densest)
            float ripple = sin(normR * 140.0) * 0.06;
            alpha = 0.95 + ripple;
            ringColor *= 1.1;
          } else if (normR < 0.69) {
            // Cassini Division (dark gap)
            alpha = 0.08;
            ringColor *= 0.3;
          } else {
            // A Ring (outer, medium brightness with Encke gap)
            float encke = 1.0 - smoothstep(0.88, 0.90, normR) * (1.0 - smoothstep(0.90, 0.92, normR)) * 0.8;
            alpha = 0.72 * encke;
          }
        }
        
        // 2. Planet Shadow Occlusion on Ring (Real-time ray/sphere shadow intersection)
        // Check if ray from vWorldPos toward Sun intersects planet sphere at origin
        vec3 P = vWorldPos;
        vec3 D = normalize(uSunDir);
        float t = -dot(P, D);
        float shadowFactor = 1.0;
        if (t > 0.0) {
          vec3 closestPoint = P + t * D;
          float distToOrigin = length(closestPoint);
          if (distToOrigin < uPlanetRadius) {
            // Smooth penumbra edge transition
            shadowFactor = smoothstep(uPlanetRadius * 0.82, uPlanetRadius, distToOrigin) * 0.18 + 0.05;
          }
        }
        
        // Edge fade at inner and outer boundaries
        float edgeFade = smoothstep(0.0, 0.04, normR) * (1.0 - smoothstep(0.96, 1.0, normR));
        alpha *= edgeFade;
        
        vec3 finalColor = ringColor * shadowFactor;
        gl_FragColor = vec4(finalColor, alpha);
      }
    `,side:Ut,transparent:!0,depthWrite:!1}),s=new Be(a,r);return s.rotation.x=.4,s.rotation.y=.15,s.userData.ringShaderMat=r,s}function ri(i,e,t=1,n=3.2){const a=new ct(i*1.035,64,64),r=new it({uniforms:{uColor:{value:new de(e)},uIntensity:{value:t},uPower:{value:n},uViewPosition:{value:new P}},vertexShader:`
      varying vec3 vNormal;
      varying vec3 vWorldPosition;
      
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        vWorldPosition = worldPos.xyz;
        gl_Position = projectionMatrix * viewMatrix * worldPos;
      }
    `,fragmentShader:`
      uniform vec3 uColor;
      uniform float uIntensity;
      uniform float uPower;
      uniform vec3 uViewPosition;
      
      varying vec3 vNormal;
      varying vec3 vWorldPosition;
      
      void main() {
        // Compute view vector from camera to atmosphere vertex
        vec3 viewDir = normalize(uViewPosition - vWorldPosition);
        
        // Rayleigh & Fresnel Limb Scattering
        float rim = 1.0 - max(0.0, dot(vNormal, viewDir));
        float scatter = pow(rim, uPower) * uIntensity;
        
        // Soft sunset/airglow tinting at grazing angles
        vec3 glowColor = uColor + vec3(scatter * 0.25, scatter * 0.1, 0.0);
        
        gl_FragColor = vec4(glowColor, scatter * 0.92);
      }
    `,side:gt,blending:Nt,transparent:!0,depthWrite:!1}),s=new Be(a,r);return s.userData.atmosphereMat=r,s}function Zl(i){const t=document.createElement("canvas");t.width=t.height=512;const n=t.getContext("2d"),a=512/2,r=n.createRadialGradient(a,a,0,a,a,a),s=new de(i);r.addColorStop(0,`rgba(${s.r*255},${s.g*255},${s.b*255},1.0)`),r.addColorStop(.2,`rgba(${s.r*255},${s.g*255},${s.b*255},0.65)`),r.addColorStop(.5,`rgba(${s.r*255},${s.g*255},${s.b*255},0.22)`),r.addColorStop(.85,`rgba(${s.r*255},${s.g*255},${s.b*255},0.04)`),r.addColorStop(1,"rgba(0,0,0,0)"),n.fillStyle=r,n.fillRect(0,0,512,512);const o=new Zn(t);return o.minFilter=wn,o.magFilter=Zt,o}function jg(){const e=document.createElement("canvas");e.width=e.height=256;const t=e.getContext("2d"),n=256/2,a=t.createRadialGradient(n,n,0,n,n,n);a.addColorStop(0,"rgba(255,255,255,1.0)"),a.addColorStop(.3,"rgba(255,255,255,0.7)"),a.addColorStop(.65,"rgba(255,255,255,0.18)"),a.addColorStop(1,"rgba(255,255,255,0.0)"),t.fillStyle=a,t.fillRect(0,0,256,256);const r=new Zn(e);return r.minFilter=wn,r.magFilter=Zt,r}const To=jg();function Wn(i,e={}){const{bands:t=!1,bandSoft:n=!1,blotches:a=!0,craters:r=!1,poles:s=!1,poleSize:o=.16,spot:l=null}=e,u=512,c=256,f=document.createElement("canvas");f.width=u,f.height=c;const d=f.getContext("2d"),m=new de(i);if(d.fillStyle=m.getStyle(),d.fillRect(0,0,u,c),t){const v=n?14:20;for(let p=0;p<v;p++){const h=c/v*p,E=m.clone().offsetHSL(0,(Math.random()-.5)*.03,(Math.random()-.5)*(n?.08:.16));if(d.fillStyle=`rgba(${E.r*255|0},${E.g*255|0},${E.b*255|0},${n?.28+Math.random()*.22:.4+Math.random()*.35})`,d.fillRect(0,h,u,c/v+3),!n)for(let b=0;b<3;b++)d.fillStyle=`rgba(255,255,255,${.03+Math.random()*.05})`,d.beginPath(),d.ellipse(Math.random()*u,h+c/v/2,30+Math.random()*60,c/v*.4,0,0,Math.PI*2),d.fill()}}if(a&&!r)for(let v=0;v<50;v++){const p=m.clone().offsetHSL(0,(Math.random()-.5)*.1,(Math.random()-.5)*.18);d.fillStyle=`rgba(${p.r*255|0},${p.g*255|0},${p.b*255|0},${.12+Math.random()*.22})`;const h=10+Math.random()*40,E=h*(.5+Math.random()*.5);d.beginPath(),d.ellipse(Math.random()*u,Math.random()*c,h,E,Math.random()*Math.PI,0,Math.PI*2),d.fill()}if(r){for(let v=0;v<70;v++){const p=m.clone().offsetHSL(0,0,(Math.random()-.5)*.1);d.fillStyle=`rgba(${p.r*255|0},${p.g*255|0},${p.b*255|0},${.1+Math.random()*.15})`;const h=8+Math.random()*30,E=h*(.6+Math.random()*.4);d.beginPath(),d.ellipse(Math.random()*u,Math.random()*c,h,E,Math.random()*Math.PI,0,Math.PI*2),d.fill()}for(let v=0;v<55;v++){const p=Math.random()*u,h=Math.random()*c,E=3+Math.random()*16,b=m.clone().offsetHSL(0,0,-.22),M=m.clone().offsetHSL(0,0,.2);d.beginPath(),d.arc(p,h,E,0,Math.PI*2),d.fillStyle=`rgba(${b.r*255|0},${b.g*255|0},${b.b*255|0},0.5)`,d.fill(),d.beginPath(),d.arc(p,h,E*1.18,0,Math.PI*2),d.strokeStyle=`rgba(${M.r*255|0},${M.g*255|0},${M.b*255|0},0.35)`,d.lineWidth=Math.max(1,E*.22),d.stroke()}}if(l){const v=new de(l.color||11879711),p=(l.x||l.u||.64)*u,h=(l.y||l.v||.58)*c,E=l.rx||(l.r?l.r*c:26),b=l.ry||E*.58,M=d.createRadialGradient(p,h,2,p,h,E);M.addColorStop(0,`rgba(${v.r*255|0},${v.g*255|0},${v.b*255|0},0.85)`),M.addColorStop(.7,`rgba(${v.r*255|0},${v.g*255|0},${v.b*255|0},0.45)`),M.addColorStop(1,`rgba(${v.r*255|0},${v.g*255|0},${v.b*255|0},0)`),d.fillStyle=M,d.beginPath(),d.ellipse(p,h,E,b,-.2,0,Math.PI*2),d.fill()}if(s){const v=c*o,p=d.createLinearGradient(0,0,0,v*1.6);p.addColorStop(0,"rgba(255,255,255,0.95)"),p.addColorStop(1,"rgba(255,255,255,0)"),d.fillStyle=p,d.fillRect(0,0,u,v*1.6);const h=d.createLinearGradient(0,c-v*1.6,0,c);h.addColorStop(0,"rgba(255,255,255,0)"),h.addColorStop(1,"rgba(255,255,255,0.95)"),d.fillStyle=h,d.fillRect(0,c-v*1.6,u,v*1.6)}const g=new Zn(f);return g.needsUpdate=!0,g}function Yg(){const t=document.createElement("canvas");t.width=512,t.height=256;const n=t.getContext("2d"),a=new de(16764766);n.fillStyle=a.getStyle(),n.fillRect(0,0,512,256);for(let s=0;s<260;s++){const o=a.clone().offsetHSL((Math.random()-.5)*.02,0,(Math.random()-.5)*.22);n.fillStyle=`rgba(${o.r*255|0},${o.g*255|0},${o.b*255|0},${.25+Math.random()*.35})`;const l=4+Math.random()*10;n.beginPath(),n.arc(Math.random()*512,Math.random()*256,l,0,Math.PI*2),n.fill()}for(let s=0;s<18;s++){n.fillStyle=`rgba(255,255,255,${.08+Math.random()*.12})`;const o=20+Math.random()*60,l=o*.3;n.beginPath(),n.ellipse(Math.random()*512,Math.random()*256,o,l,Math.random()*Math.PI,0,Math.PI*2),n.fill()}for(let s=0;s<6;s++){const o=a.clone().offsetHSL(0,.1,-.32);n.fillStyle=`rgba(${o.r*255|0},${o.g*255|0},${o.b*255|0},0.55)`;const l=6+Math.random()*10;n.beginPath(),n.arc(Math.random()*512,Math.random()*256,l,0,Math.PI*2),n.fill()}const r=new Zn(t);return r.needsUpdate=!0,r}function $g(){const t=document.createElement("canvas");t.width=1024,t.height=512;const n=t.getContext("2d"),a=n.createLinearGradient(0,0,0,512);a.addColorStop(0,"#1a3d7a"),a.addColorStop(.5,"#1c5fc9"),a.addColorStop(1,"#1a3d7a"),n.fillStyle=a,n.fillRect(0,0,1024,512);const r=["rgba(58,110,60,0.92)","rgba(96,133,63,0.88)","rgba(150,124,80,0.85)","rgba(120,150,90,0.8)"];for(let c=0;c<22;c++){n.fillStyle=r[c%r.length];const f=16+Math.random()*46,d=f*(.35+Math.random()*.5);n.beginPath(),n.ellipse(Math.random()*1024,30+Math.random()*452,f,d,Math.random()*Math.PI,0,Math.PI*2),n.fill()}for(let c=0;c<14;c++){n.fillStyle="rgba(150,110,70,0.4)";const f=6+Math.random()*16,d=f*.5;n.beginPath(),n.ellipse(Math.random()*1024,30+Math.random()*452,f,d,Math.random()*Math.PI,0,Math.PI*2),n.fill()}const s=512*.14,o=n.createLinearGradient(0,0,0,s*1.5);o.addColorStop(0,"rgba(255,255,255,0.97)"),o.addColorStop(1,"rgba(255,255,255,0)"),n.fillStyle=o,n.fillRect(0,0,1024,s*1.5);const l=n.createLinearGradient(0,512-s*1.5,0,512);l.addColorStop(0,"rgba(255,255,255,0)"),l.addColorStop(1,"rgba(255,255,255,0.97)"),n.fillStyle=l,n.fillRect(0,512-s*1.5,1024,s*1.5);const u=new Zn(t);return u.needsUpdate=!0,u}function Kg(){const t=document.createElement("canvas");t.width=1024,t.height=512;const n=t.getContext("2d");n.clearRect(0,0,1024,512),n.fillStyle="rgba(255,255,255,0.4)";for(let r=0;r<100;r++){const s=Math.random()*1024,o=Math.random()*512,l=15+Math.random()*50;n.beginPath(),n.arc(s,o,l,0,Math.PI*2),n.fill()}const a=new Zn(t);return a.needsUpdate=!0,a}function Zg(i){const t=window.innerWidth<768?12e3:35e3,n=new vt,a=new Float32Array(t*3),r=new Float32Array(t*3),s=new Float32Array(t),o=[{color:new de(10203391),weight:.005,temp:4e4},{color:new de(12307711),weight:.015,temp:18e3},{color:new de(16316927),weight:.05,temp:9e3},{color:new de(16774376),weight:.13,temp:6800},{color:new de(16771759),weight:.2,temp:5800},{color:new de(16765601),weight:.25,temp:4300},{color:new de(16756342),weight:.35,temp:3100}],l=[];let u=0;o.forEach(d=>{u+=d.weight,l.push(u)});for(let d=0;d<t;d++){const m=Math.random()*Math.PI*2;let g;if(Math.random()<.6){const w=(Math.random()+Math.random()+Math.random())/3;g=Math.PI/2+(w-.5)*.65}else g=Math.acos(2*Math.random()-1);const v=Math.random();let p;v<.18?p=280+Math.random()*240:v<.65?p=520+Math.random()*580:p=1100+Math.random()*1100,a[d*3]=p*Math.sin(g)*Math.cos(m),a[d*3+1]=p*Math.cos(g),a[d*3+2]=p*Math.sin(g)*Math.sin(m);const h=Math.random()*u;let E=0;for(let w=0;w<l.length;w++)if(h<=l[w]){E=w;break}const b=o[E].color,M=.035;r[d*3]=Math.min(1,Math.max(0,b.r+(Math.random()-.5)*M)),r[d*3+1]=Math.min(1,Math.max(0,b.g+(Math.random()-.5)*M)),r[d*3+2]=Math.min(1,Math.max(0,b.b+(Math.random()-.5)*M));const I=Math.pow(Math.random(),2.8);s[d]=(.18+I*(E<2?3.2:1.7))*(p<500?1.4:p<1100?1:.65)}n.setAttribute("position",new bt(a,3)),n.setAttribute("color",new bt(r,3)),n.setAttribute("aSize",new bt(s,1));const c=new it({uniforms:{uDot:{value:To},uTime:{value:0}},vertexShader:`
      attribute float aSize;
      uniform float uTime;
      varying vec3 vColor;
      varying float vTwinkle;
      void main() {
        vColor = color;
        float phase = fract(sin(dot(position.xy, vec2(12.9898, 78.233))) * 43758.5453);
        float twinkle = 0.70 + 0.30 * sin(uTime * (1.1 + phase * 3.8) + phase * 6.2831);
        vTwinkle = twinkle;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = aSize * twinkle * (320.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,fragmentShader:`
      uniform sampler2D uDot;
      varying vec3 vColor;
      varying float vTwinkle;
      void main() {
        vec4 texel = texture2D(uDot, gl_PointCoord);
        // Subtle chromatic scintillation (atmospheric dispersion simulation)
        float chromatic = vTwinkle * 0.08;
        vec3 tintedColor = vColor + vec3(chromatic, -chromatic * 0.5, -chromatic);
        gl_FragColor = vec4(tintedColor * texel.rgb * vTwinkle, texel.a * smoothstep(0.0, 0.40, vTwinkle));
      }
    `,vertexColors:!0,transparent:!0,depthWrite:!1,blending:Nt}),f=new yo(n,c);return i.add(f),f}function Jg(i,e){const t=document.createElement("canvas");t.width=512,t.height=128;const n=t.getContext("2d");n.font="bold 36px Outfit, Arial, sans-serif",n.textAlign="center",n.textBaseline="middle",n.shadowColor="#000000",n.shadowBlur=12,n.fillStyle="#ffffff",n.fillText(i,256,64);const a=new Zn(t),r=new Ma({map:a,transparent:!0,opacity:.9,depthWrite:!1}),s=new Mr(r);return s.scale.set(75,19,1),s}function Qg(i,e){const t=new mt;return i.add(t),typeof $n<"u"&&$n.forEach(n=>{const a=new mt;t.add(a);const r=[],s=[],o=[];n.stars&&n.stars.length&&n.stars.forEach((d,m)=>{const g=Math.max(.8,3.2-Math.max(-1.5,d.mag)*.45),v=new ct(g,16,16),p=new Dn({color:n.color||16777215}),h=new Be(v,p);if(h.position.set(...d.p),h.userData.baseScale=1,a.add(h),r.push(h),d.mag<=2.2){const E=new Aa(g*4.5,g*4.5),b=new Dn({map:To,color:n.color||16777215,transparent:!0,opacity:.75,blending:Nt,depthWrite:!1}),M=new Be(E,b);M.position.copy(h.position),M.userData.baseScale=1,M.onBeforeRender=(I,w,A)=>{M.quaternion.copy(A.quaternion)},a.add(M),s.push(M)}}),n.lines&&n.lines.length&&n.stars&&n.lines.forEach(d=>{const m=n.stars[d[0]]?.p,g=n.stars[d[1]]?.p;if(m&&g){const v=[new P(...m),new P(...g)],p=new vt().setFromPoints(v),h=new Mo({color:n.color||8490232,transparent:!0,opacity:.05,linewidth:1,blending:Nt}),E=new Hc(p,h);a.add(E),o.push(h)}});const l=Jg(n.name,n.color||16777215);l.position.set(n.pos[0],n.pos[1]+28,n.pos[2]),l.visible=!1,a.add(l);const u=new ct(2.5,16,16),c=new Dn({color:n.color||16777215,transparent:!0,opacity:.01}),f=new Be(u,c);f.position.set(...n.pos),a.add(f),e[n.id]={mesh:f,data:n,group:a,lineMaterials:o,starMeshes:r,haloMeshes:s,labelSprite:l,type:"constelacion"}}),t}function Kc(i,e){typeof $n>"u"||$n.forEach(t=>{const n=t.id===e,a=i[t.id];a&&(a.lineMaterials&&a.lineMaterials.forEach(r=>{r.opacity=n?1:.05,r.color.setHex(n?16436245:t.color||8490232),r.linewidth=n?3:1}),a.starMeshes&&a.starMeshes.forEach(r=>{const s=r.userData.baseScale||1,o=n?1.6:1;r.scale.set(s*o,s*o,s*o)}),a.haloMeshes&&a.haloMeshes.forEach(r=>{const s=r.userData.baseScale||1,o=n?2.4:1;r.scale.set(s*o,s*o,s*o),r.material.opacity=n?.98:.25}),a.labelSprite&&(a.labelSprite.visible=n,a.labelSprite.material.opacity=n?1:0))})}function e0(i){const e=new mt;e.name="earth_horizon_system",i.add(e);const t=new Eo(1200,64);t.rotateX(-Math.PI/2);const n=new Dn({color:198415,side:Ut}),a=new Be(t,n);a.position.set(0,-25,0),e.add(a);const r=new Ca(750,750,80,64,1,!0),s=new it({transparent:!0,side:gt,depthWrite:!1,blending:Nt,uniforms:{},vertexShader:`
      varying vec3 vPos;
      void main() {
        vPos = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,fragmentShader:`
      varying vec3 vPos;
      void main() {
        float h = clamp((vPos.y + 40.0) / 80.0, 0.0, 1.0);
        float alpha = pow(1.0 - h, 2.5) * 0.70;
        vec3 horizonColor = mix(vec3(0.04, 0.32, 0.65), vec3(0.01, 0.07, 0.18), h);
        gl_FragColor = vec4(horizonColor, alpha);
      }
    `}),o=new Be(r,s);o.position.set(0,-10,0),e.add(o),[{text:"N · NORTE (Hacia Polaris)",pos:[0,-12,-700],color:"#00f0ff"},{text:"S · SUR (Cruz del Sur)",pos:[0,-12,700],color:"#ff9e00"},{text:"E · ESTE (Levante)",pos:[700,-12,0],color:"#ffd700"},{text:"O · OESTE (Poniente)",pos:[-700,-12,0],color:"#ff4757"}].forEach(d=>{const m=document.createElement("canvas");m.width=512,m.height=128;const g=m.getContext("2d");g.font="bold 36px Outfit, JetBrains Mono, sans-serif",g.textAlign="center",g.textBaseline="middle",g.fillStyle=d.color,g.shadowColor="#000000",g.shadowBlur=12,g.fillText(d.text,256,64);const v=new Zn(m),p=new Ma({map:v,transparent:!0,opacity:.95,depthWrite:!1}),h=new Mr(p);h.position.set(...d.pos),h.scale.set(120,30,1),e.add(h)});const u=new ct(690,24,12),c=new Dn({color:1981023,wireframe:!0,transparent:!0,opacity:.12,side:gt}),f=new Be(u,c);return e.add(f),e.visible=!1,e}function t0(i,e){const t=new mt,n=new mt;i.add(t),i.add(n);const a=new ct(4.8,64,64),r=new it({uniforms:{uTime:{value:0},uMap:{value:Yg()}},vertexShader:`
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vPos;
      void main() {
        vUv = uv;
        vNormal = normalize(normalMatrix * normal);
        vPos = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,fragmentShader:`
      uniform float uTime;
      uniform sampler2D uMap;
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vPos;
      void main() {
        vec3 base = texture2D(uMap, vUv).rgb;
        float pulse = sin(vPos.x * 2.0 + uTime * 3.0) * cos(vPos.y * 2.0 - uTime * 2.0) * 0.15;
        float limb = pow(1.0 - abs(vNormal.z), 0.85);
        vec3 col = base + vec3(pulse * 0.4, pulse * 0.2, 0.0);
        col += vec3(0.5, 0.2, 0.0) * limb;
        gl_FragColor = vec4(col * 1.5, 1.0);
      }
    `}),s=new Be(a,r);t.add(s),e.sol={mesh:s,data:zi[0],mat:r};const o=new it({uniforms:{c:{value:.22},p:{value:3.4},glowColor:{value:new de(16755200)},viewVector:{value:new P}},vertexShader:`
      uniform vec3 viewVector;
      uniform float c;
      uniform float p;
      varying float intensity;
      void main() {
        vec3 vNormal = normalize(normalMatrix * normal);
        vec3 vNormel = normalize(normalMatrix * viewVector);
        intensity = pow(c - dot(vNormal, vNormel), p);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,fragmentShader:`
      uniform vec3 glowColor;
      varying float intensity;
      void main() {
        vec3 glow = glowColor * intensity;
        gl_FragColor = vec4(glow, intensity * 0.85);
      }
    `,side:gt,blending:Nt,transparent:!0,depthWrite:!1}),l=new Be(new ct(5.8,64,64),o);s.add(l),s.userData.coronaMat=o,[[6,.95],[9,.55],[13,.3],[18,.15]].forEach(([u,c])=>{const f=new Mr(new Ma({map:Zl(16765286),transparent:!0,blending:Nt,opacity:c}));f.scale.set(4.8*u,4.8*u,1),s.add(f)});for(let u=0;u<6;u++){const c=new Ma({map:Zl(16733440),transparent:!0,blending:Nt,opacity:.6}),f=new Mr(c),d=u/6*Math.PI*2;f.position.set(Math.cos(d)*5.2,(Math.random()-.5)*3,Math.sin(d)*5.2),f.scale.set(7,7,1),s.add(f)}for(let u=1;u<zi.length;u++){const c=zi[u],f=[];for(let w=0;w<=128;w++){const A=w/128*Math.PI*2;f.push(new P(Math.cos(A)*c.dist,0,Math.sin(A)*c.dist))}const d=new vt().setFromPoints(f),m=new Mo({color:3359061,transparent:!0,opacity:.4}),g=new Hc(d,m);n.add(g);let v;c.id==="tierra"?v=$g():c.id==="mercurio"?v=Wn(c.color,{craters:!0}):c.id==="venus"?v=Wn(c.color,{bands:!0,bandSoft:!0}):c.id==="marte"?v=Wn(c.color,{craters:!0,poles:!0}):c.id==="jupiter"?v=Wn(c.color,{bands:!0,bandSoft:!1,spot:c.spot||{u:.65,v:.68,r:.08,h:.04,s:.9,l:.45}}):c.id==="saturno"?v=Wn(c.color,{bands:!0,bandSoft:!0}):c.id==="urano"?v=Wn(c.color,{bands:!0,bandSoft:!0}):c.id==="neptuno"?v=Wn(c.color,{bands:!0,bandSoft:!1}):v=Wn(c.color,{bands:!!c.bands,bandSoft:!!c.bandSoft,craters:!!c.craters,poles:!!c.poles});const p=new ct(c.radius,64,64),h=new $t({map:v,roughness:c.id==="tierra"?.8:.92,metalness:.05}),E=new Be(p,h);E.position.set(c.dist,0,0),E.castShadow=!0,E.receiveShadow=!0;const b=new mt;if(b.add(E),t.add(b),c.id==="tierra"){const w=new ct(c.radius*1.015,64,64),A=new $t({map:Kg(),transparent:!0,opacity:.85,roughness:.9,depthWrite:!1}),R=new Be(w,A);R.castShadow=!0,R.receiveShadow=!0,E.add(R),E.userData.cloudMesh=R}if(c.id==="tierra"?E.add(ri(c.radius,3718648,1.25,3)):c.id==="venus"?E.add(ri(c.radius,16638023,1.45,2.8)):c.id==="marte"?E.add(ri(c.radius,16281969,1.1,3.2)):c.id==="jupiter"?E.add(ri(c.radius,16498468,1.15,3.4)):c.id==="saturno"?E.add(ri(c.radius,16638023,1.1,3.5)):c.id==="urano"?E.add(ri(c.radius,2282478,1.2,3.2)):c.id==="neptuno"&&E.add(ri(c.radius,3900150,1.2,3.2)),c.id==="saturno"||c.id==="urano"){const w=c.radius*1.35,A=c.radius*(c.id==="saturno"?2.5:1.95),R=qg(w,A,c.color,c.id==="urano");R.receiveShadow=!0,R.castShadow=!0,E.add(R)}const M=[];c.id==="tierra"?M.push({name:"Luna",r:.35,d:2.8,s:2.5,col:13421772}):c.id==="marte"?(M.push({name:"Fobos",r:.15,d:1.6,s:3.8,col:10066329}),M.push({name:"Deimos",r:.12,d:2.3,s:2.1,col:8947848})):c.id==="jupiter"?(M.push({name:"Ío",r:.38,d:3.8,s:3.2,col:15381256}),M.push({name:"Europa",r:.32,d:4.8,s:2.4,col:9684477}),M.push({name:"Ganimedes",r:.45,d:6,s:1.8,col:11051678}),M.push({name:"Calisto",r:.4,d:7.2,s:1.2,col:7893356})):c.id==="saturno"?(M.push({name:"Titán",r:.42,d:6.5,s:1.9,col:16638023}),M.push({name:"Encélado",r:.22,d:4.2,s:2.8,col:16777215})):c.id==="neptuno"&&M.push({name:"Tritón",r:.35,d:4,s:2.2,col:12248829});const I=[];M.forEach(w=>{const A=new ct(w.r,24,24),R=new $t({color:w.col,roughness:.9,metalness:.05}),y=new Be(A,R);y.position.set(w.d,0,0),y.castShadow=!0,y.receiveShadow=!0,E.add(y),I.push({mesh:y,data:w})}),e[c.id]={mesh:E,data:c,pivot:b,moonMeshes:I}}return function(){const f=new vt,d=new Float32Array(1400*3),m=new Float32Array(1400*3),g=new de(11181190);for(let p=0;p<1400;p++){const h=32+Math.random()*5.5,E=Math.random()*Math.PI*2;d[p*3]=Math.cos(E)*h,d[p*3+1]=(Math.random()-.5)*1.3,d[p*3+2]=Math.sin(E)*h;const b=g.clone().offsetHSL(0,0,(Math.random()-.5)*.25);m[p*3]=b.r,m[p*3+1]=b.g,m[p*3+2]=b.b}f.setAttribute("position",new bt(d,3)),f.setAttribute("color",new bt(m,3));const v=new So({size:.3,vertexColors:!0,map:To,transparent:!0,depthWrite:!1});t.add(new yo(f,v))}(),{sunMesh:s,planetsGroup:t,orbitsGroup:n}}const os={uniforms:{uTime:{value:0},uCameraPos:{value:new P},uMass:{value:1},uAccretionRate:{value:1},uInclination:{value:0},uDopplerStrength:{value:1.35},uLensingEnabled:{value:1},uShowGeodesicGrid:{value:0},uResolution:{value:new ye(window.innerWidth,window.innerHeight)}},vertexShader:`
    varying vec3 vWorldPosition;
    varying vec2 vUv;
    
    void main() {
      vUv = uv;
      vec4 worldPos = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPos.xyz;
      gl_Position = projectionMatrix * viewMatrix * worldPos;
    }
  `,fragmentShader:`
    precision highp float;

    varying vec3 vWorldPosition;
    varying vec2 vUv;

    uniform float uTime;
    uniform vec3 uCameraPos;
    uniform float uMass;
    uniform float uAccretionRate;
    uniform float uInclination;
    uniform float uDopplerStrength;
    uniform float uLensingEnabled;
    uniform float uShowGeodesicGrid;
    uniform vec2 uResolution;

    #define MAX_STEPS 90
    #define STEP_SIZE 0.14
    #define PI 3.14159265359

    // Función hash 3D para turbulencia MHD en el disco de acreción
    float hash(vec3 p) {
      p = fract(p * 0.3183099 + 0.1);
      p *= 17.0;
      return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
    }

    float noise(vec3 x) {
      vec3 i = floor(x);
      vec3 f = fract(x);
      f = f * f * (3.0 - 2.0 * f);
      return mix(
        mix(mix(hash(i + vec3(0,0,0)), hash(i + vec3(1,0,0)), f.x),
            mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
        mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
            mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y),
        f.z);
    }

    float fbm(vec3 p) {
      float f = 0.0;
      float amp = 0.5;
      for (int i = 0; i < 4; i++) {
        f += amp * noise(p);
        p *= 2.1;
        amp *= 0.48;
      }
      return f;
    }

    // Rotación 2D en torno al eje Y para inclinación
    vec3 rotateX(vec3 p, float a) {
      float s = sin(a), c = cos(a);
      return vec3(p.x, c * p.y - s * p.z, s * p.y + c * p.z);
    }

    // Malla espacio-tiempo de Schwarzschild (Inspección Geodésica HUD)
    vec3 computeSpacetimeGrid(vec3 pos, float rs) {
      float r = length(pos);
      // Curvatura del potencial gravitacional V(r) ~ -rs / r
      float warp = rs / max(r, 0.4);
      float gridX = abs(fract(pos.x * 1.5) - 0.5);
      float gridZ = abs(fract(pos.z * 1.5) - 0.5);
      float line = smoothstep(0.04, 0.0, min(gridX, gridZ));
      vec3 gridColor = vec3(0.0, 0.95, 1.0) * line * warp * 0.85;
      return gridColor;
    }

    void main() {
      // Vector del rayo desde la cámara hasta la esfera envolvente
      vec3 rayOrigin = uCameraPos;
      vec3 rayDir = normalize(vWorldPosition - uCameraPos);

      // Parámetros físicos del agujero negro
      float rs = 2.0 * max(uMass, 0.2); // Radio de Schwarzschild (horizonte de sucesos)
      float rISCO = 3.0 * rs;           // Última órbita circular estable (ISCO)
      float rPhoton = 1.5 * rs;         // Esfera de fotones (Einstein ring)
      float rOut = 14.0 * rs;           // Límite exterior del disco de acreción

      vec3 pos = rayOrigin;
      vec3 dir = rayDir;

      vec4 accumColor = vec4(0.0);
      float totalGlow = 0.0;
      float photonRingIntensity = 0.0;
      vec3 gridOverlay = vec3(0.0);

      // Paso de Raymarching con curvatura geodésica relativista
      for (int i = 0; i < MAX_STEPS; i++) {
        float r = length(pos);

        // 1. Absorción en el Horizonte de Sucesos (r <= rs)
        if (r <= rs * 1.01) {
          // Sombra oscura absoluta dentro de Schwarzschild
          break;
        }

        // 2. Curvatura Gravitacional (Gravitational Lensing d^2x/dλ^2 ~ -G M / r^3)
        if (uLensingEnabled > 0.5) {
          vec3 gravForce = -normalize(pos) * (rs * 0.38 / (r * r));
          dir = normalize(dir + gravForce * STEP_SIZE);
        }

        // 3. Anillo de Fotones Einsteiniana (r ~ 1.5 rs)
        float photonDist = abs(r - rPhoton);
        if (photonDist < rs * 0.45) {
          float pr = pow(smoothstep(rs * 0.45, 0.0, photonDist), 3.0);
          photonRingIntensity += pr * 0.18;
        }

        // 4. Intersección con el Disco de Acreción y Relatividad Doppler
        // Evaluamos cerca del plano ecuatorial y dentro de [rISCO, rOut]
        if (abs(pos.y) < 1.2 && r >= rISCO * 0.9 && r <= rOut) {
          // Ángulo orbital para rotación diferencial kepleriana v(r) ~ r^(-1/2)
          float keplerSpeed = 2.8 * max(uAccretionRate, 0.5) / sqrt(max(r, 0.5));
          float angle = atan(pos.z, pos.x) + uTime * keplerSpeed * 0.4;

          vec3 diskCoords = vec3(cos(angle) * r, pos.y * 3.0, sin(angle) * r);
          float density = fbm(diskCoords * 0.65 - vec3(0.0, uTime * 0.5, 0.0));

          // Perfil radial del disco: más denso y caliente cerca de ISCO
          float radialFade = smoothstep(rISCO * 0.9, rISCO * 1.3, r) * (1.0 - smoothstep(rOut * 0.7, rOut, r));
          float alpha = smoothstep(0.32, 0.85, density) * radialFade * uAccretionRate;

          if (alpha > 0.01) {
            // Cálculo del Efecto Doppler Relativista (Beaming D^3 Liouville Invariant - Shakura-Sunyaev GRRT)
            vec3 tangentVel = normalize(vec3(-pos.z, 0.0, pos.x));
            float dopplerFactor = 1.0;
            if (uDopplerStrength > 0.01) {
              float vRel = min(0.72, 0.90 * sqrt(rs / r)); // Velocidad kepleriana ecuatorial Kerr
              float betaDot = dot(dir, tangentVel) * vRel * uDopplerStrength;
              // Factor de Beaming de Einstein-Doppler: D = 1 / [gamma * (1 - beta * cos(theta))]
              float gamma = 1.0 / sqrt(max(0.04, 1.0 - vRel * vRel));
              float D = clamp(1.0 / (gamma * (1.0 - betaDot)), 0.18, 3.8);
              // Invarianza de Liouville D^3 para intensidad bolométrica de radiación GRRT
              dopplerFactor = pow(D, 3.0);
            }

            // Perfil de Temperatura Shakura–Sunyaev: T(r) ~ r^(-3/4) * (1 - sqrt(rISCO/r))^(1/4)
            float ssTemp = pow(max(0.01, rISCO / r), 0.75) * pow(max(0.0, 1.0 - sqrt(rISCO / r)), 0.25);
            vec3 hotColor  = vec3(0.92, 0.97, 1.00);    // Plasma ultracaliente blueshifteado (60,000 K)
            vec3 midColor  = vec3(1.00, 0.55, 0.10);    // Disco de acreción térmico (10,000 K)
            vec3 coolColor = vec3(0.60, 0.08, 0.02);    // Halo exterior desplazado al rojo (3,000 K)

            float tempFactor = clamp(ssTemp * 3.5, 0.0, 1.0);
            vec3 baseEmission = mix(coolColor, midColor, pow(tempFactor, 0.7));
            baseEmission = mix(baseEmission, hotColor, pow(tempFactor, 2.2));

            // Aplicar Doppler Beaming al color y brillo
            vec3 beamedColor = baseEmission * dopplerFactor;

            accumColor.rgb += beamedColor * alpha * (1.0 - accumColor.a) * 0.55;
            accumColor.a += alpha * (1.0 - accumColor.a) * 0.45;
          }
        }

        // 5. Modo Inspección Científica: Malla espacio-tiempo
        if (uShowGeodesicGrid > 0.5 && abs(pos.y) < 0.25 && r > rs) {
          gridOverlay += computeSpacetimeGrid(pos, rs) * (1.0 - accumColor.a) * 0.15;
        }

        if (accumColor.a >= 0.97) break;
        pos += dir * STEP_SIZE;
      }

      // Adición del Anillo de Fotones Einsteiniano en color oro/blanco puro
      vec3 photonRingColor = vec3(1.0, 0.88, 0.55) * photonRingIntensity * uAccretionRate;
      vec3 finalColor = accumColor.rgb + photonRingColor + gridOverlay;

      // Halo gravitacional atmosférico de Einstein
      float halo = pow(clamp(1.0 - length(vUv - 0.5) * 1.3, 0.0, 1.0), 3.5);
      finalColor += vec3(0.4, 0.65, 1.0) * halo * 0.15 * uAccretionRate;

      gl_FragColor = vec4(finalColor, max(accumColor.a, min(1.0, photonRingIntensity * 0.8 + length(gridOverlay))));
    }
  `};function n0(i={}){const e=new mt;e.name="gargantua_system";const t=i.radius||35,n=new ct(t,48,48),a=new it({vertexShader:os.vertexShader,fragmentShader:os.fragmentShader,uniforms:Yn.clone(os.uniforms),side:gt,transparent:!0,depthWrite:!1});i.mass!==void 0&&(a.uniforms.uMass.value=i.mass),i.accretionRate!==void 0&&(a.uniforms.uAccretionRate.value=i.accretionRate),i.dopplerStrength!==void 0&&(a.uniforms.uDopplerStrength.value=i.dopplerStrength);const r=new Be(n,a);r.name="gargantua_raymarch_mesh",e.add(r);const s=new ct(.8,32,32),o=new $t({color:8961023,emissive:4491519,emissiveIntensity:2.2,roughness:.1}),l=new Be(s,o);return l.name="s2_hypervelocity_star",e.add(l),e.userData={shaderMat:a,s2Star:l,orbitAngle:0,update:(u,c,f=1,d)=>{a.uniforms.uTime&&(a.uniforms.uTime.value=c),d&&a.uniforms.uCameraPos&&a.uniforms.uCameraPos.value.copy(d);const m=c*.65*f,g=14.5/(1+.58*Math.cos(m));l.position.x=g*Math.cos(m),l.position.z=g*Math.sin(m)*.65,l.position.y=Math.sin(m*2)*1.2}},e}const ls={uniforms:{uTime:{value:0},uColorBase:{value:new de(662590)},uColorBeam:{value:new de(61695)},uColorHotspot:{value:new de(16774634)}},vertexShader:`
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec2 vUv;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vPosition = position;
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,fragmentShader:`
    precision highp float;
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec2 vUv;
    uniform float uTime;
    uniform vec3 uColorBase;
    uniform vec3 uColorBeam;
    uniform vec3 uColorHotspot;

    void main() {
      // Hotspots polares magnéticos del púlsar en polos y
      float polarDist = abs(vPosition.y);
      float polarGlow = pow(smoothstep(0.5, 1.0, polarDist), 4.0);
      
      // Pulso electromagnético sincrotrón rotacional
      float pulse = abs(sin(vPosition.x * 6.0 + uTime * 12.0) * cos(vPosition.z * 6.0 - uTime * 8.0));
      
      vec3 color = mix(uColorBase, uColorBeam, pulse * 0.45);
      color = mix(color, uColorHotspot, polarGlow);

      // Efecto Fresnel cuántico en atmósfera hiperdensa
      float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 3.0);
      color += uColorBeam * fresnel * 1.4;

      gl_FragColor = vec4(color, 1.0);
    }
  `},cs={uniforms:{uTime:{value:0},uColor:{value:new de(61695)}},vertexShader:`
    varying vec3 vPosition;
    varying vec2 vUv;
    void main() {
      vPosition = position;
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,fragmentShader:`
    precision highp float;
    varying vec3 vPosition;
    varying vec2 vUv;
    uniform float uTime;
    uniform vec3 uColor;

    void main() {
      float radialFade = pow(1.0 - vUv.y, 2.0);
      float centerBeam = pow(sin(vUv.x * 3.14159265), 1.5);
      float plasmaFlicker = 0.85 + 0.15 * sin(uTime * 25.0 - vUv.y * 12.0);
      
      float alpha = radialFade * centerBeam * plasmaFlicker * 0.75;
      vec3 glow = uColor + vec3(0.4, 0.7, 1.0) * pow(centerBeam, 4.0);

      gl_FragColor = vec4(glow, alpha);
    }
  `};function i0(i={}){const e=new mt;e.name="pulsar_system";const t=new ct(1.8,64,64),n=new it({vertexShader:ls.vertexShader,fragmentShader:ls.fragmentShader,uniforms:Yn.clone(ls.uniforms)}),a=new Be(t,n);a.name="neutron_star_core",e.add(a);const r=new bo(2.4,18,32,1,!0);r.translate(0,9,0);const s=new it({vertexShader:cs.vertexShader,fragmentShader:cs.fragmentShader,uniforms:Yn.clone(cs.uniforms),transparent:!0,side:Ut,depthWrite:!1,blending:Nt}),o=new Be(r,s);o.name="north_synchrotron_beam",e.add(o);const l=r.clone();l.rotateX(Math.PI);const u=new Be(l,s);u.name="south_synchrotron_beam",e.add(u);const c=new mt;return c.add(o),c.add(u),c.rotation.z=.42,e.add(c),e.userData={surfaceMat:n,coneMat:s,magneticGroup:c,update:(f,d,m=1)=>{n.uniforms.uTime.value=d,s.uniforms.uTime.value=d,a.rotation.y+=f*6*m,c.rotation.y+=f*6*m}},e}const us={uniforms:{uTime:{value:0},uCameraPos:{value:new P},uColorHAlpha:{value:new de(16724770)},uColorOIII:{value:new de(58879)},uColorSII:{value:new de(11145472)},uDensityScale:{value:1}},vertexShader:`
    varying vec3 vWorldPosition;
    varying vec2 vUv;
    void main() {
      vUv = uv;
      vec4 worldPos = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPos.xyz;
      gl_Position = projectionMatrix * viewMatrix * worldPos;
    }
  `,fragmentShader:`
    precision highp float;
    varying vec3 vWorldPosition;
    varying vec2 vUv;

    uniform float uTime;
    uniform vec3 uCameraPos;
    uniform vec3 uColorHAlpha;
    uniform vec3 uColorOIII;
    uniform vec3 uColorSII;
    uniform float uDensityScale;

    #define MAX_STEPS 60
    #define STEP_SIZE 0.45

    float hash(vec3 p) {
      p = fract(p * 0.3183099 + 0.1);
      p *= 17.0;
      return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
    }

    float noise(vec3 x) {
      vec3 i = floor(x);
      vec3 f = fract(x);
      f = f * f * (3.0 - 2.0 * f);
      return mix(
        mix(mix(hash(i + vec3(0,0,0)), hash(i + vec3(1,0,0)), f.x),
            mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
        mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
            mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y),
        f.z);
    }

    float fbm(vec3 p) {
      float f = 0.0;
      float amp = 0.5;
      for (int i = 0; i < 4; i++) {
        f += amp * noise(p);
        p *= 2.03;
        amp *= 0.49;
      }
      return f;
    }

    void main() {
      vec3 rayOrigin = uCameraPos;
      vec3 rayDir = normalize(vWorldPosition - uCameraPos);
      vec3 pos = rayOrigin;
      vec3 dir = rayDir;

      vec4 accum = vec4(0.0);

      for (int i = 0; i < MAX_STEPS; i++) {
        float r = length(pos);
        if (r > 20.0) {
          pos += dir * STEP_SIZE;
          continue;
        }

        // Densidad turbulenta 3D
        vec3 samplePos = pos * 0.18 + vec3(0.0, uTime * 0.03, uTime * 0.02);
        float n = fbm(samplePos);
        
        // Carriles de polvo molecular oscuro de Barnard (absorción)
        float darkLane = smoothstep(0.45, 0.62, fbm(samplePos * 1.8 + vec3(1.5, -uTime * 0.01, 0.0)));

        float d = smoothstep(0.3, 0.8, n) * (1.0 - darkLane * 0.85) * uDensityScale;
        
        if (d > 0.01) {
          // Asignación espectral Hubble SHO según gradiente y densidad
          float o3Weight = smoothstep(0.3, 0.55, n);
          float haWeight = smoothstep(0.5, 0.75, n);
          float siiWeight = 1.0 - haWeight;

          vec3 shoColor = uColorOIII * o3Weight + uColorHAlpha * haWeight + uColorSII * siiWeight * 0.6;
          
          accum.rgb += shoColor * d * (1.0 - accum.a) * 0.75;
          accum.a += d * (1.0 - accum.a) * 0.5;
        }

        if (accum.a >= 0.96) break;
        pos += dir * STEP_SIZE;
      }

      // Suavizado del borde esférico del volumen
      float edgeFade = smoothstep(22.0, 16.0, length(vWorldPosition));
      gl_FragColor = vec4(accum.rgb, accum.a * edgeFade);
    }
  `};function a0(i={}){const e=new mt;e.name="nebula_system";const t=i.radius||22,n=new ct(t,32,32),a=new it({vertexShader:us.vertexShader,fragmentShader:us.fragmentShader,uniforms:Yn.clone(us.uniforms),side:gt,transparent:!0,depthWrite:!1,blending:Nt}),r=new Be(n,a);return r.name="nebula_raymarch_mesh",e.add(r),e.userData={material:a,update:(s,o,l=1,u)=>{a.uniforms.uTime.value=o,u&&a.uniforms.uCameraPos&&a.uniforms.uCameraPos.value.copy(u),e.rotation.y+=s*.02*l}},e}function r0(i,e){const t=new mt;t.name="deep_space_group",i.add(t);{const n=rn.find(a=>a.id==="agujero");if(n){const a=n0(n.relativityParams||{});a.position.set(...n.pos),t.add(a),e[n.id]={mesh:a,data:n,shaderMat:a.userData.shaderMat,s2Star:a.userData.s2Star,mat:a.userData.shaderMat,isRelativisticBlackHole:!0}}}{const n=rn.find(a=>a.id==="pulsar");if(n){const a=i0();a.position.set(...n.pos),t.add(a),e[n.id]={mesh:a,data:n,surfaceMat:a.userData.surfaceMat,coneMat:a.userData.coneMat,mat:a.userData.surfaceMat}}}{const n=rn.find(a=>a.id==="nebulosa");if(n){const a=a0();a.position.set(...n.pos),t.add(a),e[n.id]={mesh:a,data:n,mat:a.userData.material}}}{const n=rn.find(a=>a.id==="gigante");if(n){const a=new ct(14,64,64),r=new it({uniforms:{uTime:{value:0},uColorDark:{value:new de(9109504)},uColorBright:{value:new de(16729344)}},vertexShader:`
          varying vec3 vNormal;
          varying vec3 vPos;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            vPos = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,fragmentShader:`
          uniform float uTime;
          uniform vec3 uColorDark;
          uniform vec3 uColorBright;
          varying vec3 vNormal;
          varying vec3 vPos;
          void main() {
            float conv = sin(vPos.x * 0.4 + uTime) * cos(vPos.y * 0.4 + uTime * 0.8) * sin(vPos.z * 0.4) * 0.5 + 0.5;
            float limb = pow(1.0 - abs(vNormal.z), 1.8);
            vec3 col = mix(uColorDark, uColorBright, conv);
            col += vec3(1.0, 0.3, 0.0) * limb * 0.8;
            gl_FragColor = vec4(col * 1.6, 1.0);
          }
        `}),s=new Be(a,r);s.position.set(...n.pos),t.add(s),e[n.id]={mesh:s,data:n,mat:r}}}{const n=rn.find(a=>a.id==="supernova");if(n){const a=new mt;a.position.set(...n.pos);const r=new ct(2.5,32,32),s=new Dn({color:16777215}),o=new Be(r,s);a.add(o);const l=new ct(16,64,64),u=new it({uniforms:{uTime:{value:0},uColor1:{value:new de(65535)},uColor2:{value:new de(16711765)}},vertexShader:`
          varying vec3 vNormal;
          varying vec3 vPos;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            vPos = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,fragmentShader:`
          uniform float uTime;
          uniform vec3 uColor1;
          uniform vec3 uColor2;
          varying vec3 vNormal;
          varying vec3 vPos;
          void main() {
            float shock = sin(length(vPos) * 2.0 - uTime * 6.0) * 0.5 + 0.5;
            float rim = 1.0 - abs(vNormal.z);
            vec3 col = mix(uColor1, uColor2, shock);
            gl_FragColor = vec4(col * 2.0, pow(rim, 1.5) * 0.85);
          }
        `,transparent:!0,blending:Nt,side:Ut,depthWrite:!1}),c=new Be(l,u);a.add(c),t.add(a),e[n.id]={mesh:a,data:n,mat:u,snCore:o,snShell:c}}}{const n=rn.find(a=>a.id==="enana");if(n){const a=new mt;a.position.set(...n.pos);const r=new ct(1.4,48,48),s=new $t({color:15661311,emissive:10079487,emissiveIntensity:2.5,roughness:.05}),o=new Be(r,s);a.add(o);const l=new Sa(3,8.5,64),u=new $t({color:11189196,emissive:2241348,emissiveIntensity:.5,side:Ut,transparent:!0,opacity:.75}),c=new Be(l,u);c.rotation.x=Math.PI/2-.2,a.add(c),t.add(a),e[n.id]={mesh:a,data:n,wdMesh:o,ringMesh:c}}}{const n=rn.find(a=>a.id==="protoplanetario");if(n){const a=new mt;a.position.set(...n.pos);const r=new ct(3.2,32,32),s=new $t({color:16755268,emissive:16737792,emissiveIntensity:1.8}),o=new Be(r,s);a.add(o);const l=new Sa(4.5,18,128),u=new $t({color:13404245,emissive:4465169,side:Ut,roughness:.9,transparent:!0,opacity:.88}),c=new Be(l,u);c.rotation.x=Math.PI/2-.3,a.add(c),t.add(a),e[n.id]={mesh:a,data:n,star:o,disk:c}}}{const n=rn.find(a=>a.id==="binario");if(n){const a=new mt;a.position.set(...n.pos);const r=new ct(4,48,48),s=new $t({color:6732799,emissive:1140479,emissiveIntensity:2}),o=new Be(r,s);o.position.x=-4.2,a.add(o);const l=new ct(2.8,48,48),u=new $t({color:16759620,emissive:16733440,emissiveIntensity:1.6}),c=new Be(l,u);c.position.x=3.8,a.add(c);const f=new Ca(.8,.4,4,16),d=new $t({color:16772829,emissive:16755268,emissiveIntensity:1.5,transparent:!0,opacity:.85}),m=new Be(f,d);m.rotation.z=Math.PI/2,a.add(m),t.add(a),e[n.id]={mesh:a,data:n,star1:o,star2:c,bridge:m}}}{const n=rn.find(a=>a.id==="galaxia");if(n){const a=new mt;a.position.set(...n.pos);const r=new ct(4,32,32),s=new $t({color:16772829,emissive:16764040,emissiveIntensity:2.2}),o=new Be(r,s);a.add(o);const l=8e3,u=new Float32Array(l*3),c=new Float32Array(l*3);for(let g=0;g<l;g++){const v=g%2,p=3+Math.pow(Math.random(),1.5)*22,h=p*.45+v*Math.PI+(Math.random()-.5)*.4;u[g*3]=Math.cos(h)*p,u[g*3+1]=(Math.random()-.5)*(1.5-p*.04),u[g*3+2]=Math.sin(h)*p;const b=p<10?new de(16768426):new de(8965375);c[g*3]=b.r,c[g*3+1]=b.g,c[g*3+2]=b.b}const f=new vt;f.setAttribute("position",new bt(u,3)),f.setAttribute("color",new bt(c,3));const d=new So({size:.35,vertexColors:!0,transparent:!0,opacity:.85,blending:Nt}),m=new yo(f,d);a.add(m),t.add(a),e[n.id]={mesh:a,data:n,galaxyStars:m,core:o}}}return t}class s0{constructor(){this.ctx=null,this.enabled=!1,this.droneOsc1=null,this.droneOsc2=null,this.droneFilter=null,this.droneGain=null,this.lfo=null,this.currentMode="solar"}init(){if(this.ctx)return;const e=window.AudioContext||window.webkitAudioContext;if(!e)return;this.ctx=new e,this.droneGain=this.ctx.createGain(),this.droneGain.gain.setValueAtTime(1e-4,this.ctx.currentTime),this.droneGain.connect(this.ctx.destination),this.droneFilter=this.ctx.createBiquadFilter(),this.droneFilter.type="lowpass",this.droneFilter.frequency.setValueAtTime(240,this.ctx.currentTime),this.droneFilter.Q.setValueAtTime(4.5,this.ctx.currentTime),this.droneFilter.connect(this.droneGain),this.droneOsc1=this.ctx.createOscillator(),this.droneOsc1.type="sine",this.droneOsc1.frequency.setValueAtTime(55,this.ctx.currentTime),this.droneOsc1.connect(this.droneFilter),this.droneOsc1.start(),this.droneOsc2=this.ctx.createOscillator(),this.droneOsc2.type="triangle",this.droneOsc2.frequency.setValueAtTime(82.41,this.ctx.currentTime),this.droneOsc2.connect(this.droneFilter),this.droneOsc2.start(),this.lfo=this.ctx.createOscillator(),this.lfo.type="sine",this.lfo.frequency.setValueAtTime(.08,this.ctx.currentTime);const t=this.ctx.createGain();t.gain.setValueAtTime(80,this.ctx.currentTime),this.lfo.connect(t),t.connect(this.droneFilter.frequency),this.lfo.start()}toggle(){if(this.init(),!this.ctx)return!1;this.ctx.state==="suspended"&&this.ctx.resume(),this.enabled=!this.enabled;const e=this.ctx.currentTime;return this.enabled?(this.droneGain.gain.cancelScheduledValues(e),this.droneGain.gain.linearRampToValueAtTime(.18,e+1.2),this.playClickFeedback(880,.08)):(this.droneGain.gain.cancelScheduledValues(e),this.droneGain.gain.linearRampToValueAtTime(1e-4,e+.6)),this.enabled}setMode(e,t=null){if(!this.ctx||!this.enabled)return;this.currentMode=e;const n=this.ctx.currentTime;e==="solar"?t==="sol"?(this.droneOsc1.frequency.exponentialRampToValueAtTime(65.41,n+1),this.droneOsc2.frequency.exponentialRampToValueAtTime(98,n+1),this.droneFilter.frequency.linearRampToValueAtTime(420,n+1)):(this.droneOsc1.frequency.exponentialRampToValueAtTime(55,n+1),this.droneOsc2.frequency.exponentialRampToValueAtTime(82.41,n+1),this.droneFilter.frequency.linearRampToValueAtTime(240,n+1)):e==="deep"?t==="agujero"?(this.droneOsc1.frequency.exponentialRampToValueAtTime(41.2,n+1),this.droneOsc2.frequency.exponentialRampToValueAtTime(61.74,n+1),this.droneFilter.frequency.linearRampToValueAtTime(320,n+1)):(this.droneOsc1.frequency.exponentialRampToValueAtTime(48,n+1),this.droneOsc2.frequency.exponentialRampToValueAtTime(72,n+1),this.droneFilter.frequency.linearRampToValueAtTime(180,n+1)):e==="constelaciones"&&(this.droneOsc1.frequency.exponentialRampToValueAtTime(110,n+1),this.droneOsc2.frequency.exponentialRampToValueAtTime(164.81,n+1),this.droneFilter.frequency.linearRampToValueAtTime(380,n+1))}playClickFeedback(e=660,t=.06){if(!this.ctx||!this.enabled)return;const n=this.ctx.currentTime,a=this.ctx.createOscillator(),r=this.ctx.createGain();a.type="sine",a.frequency.setValueAtTime(e,n),a.frequency.exponentialRampToValueAtTime(e*1.5,n+t),r.gain.setValueAtTime(.12,n),r.gain.exponentialRampToValueAtTime(.001,n+t),a.connect(r),r.connect(this.ctx.destination),a.start(n),a.stop(n+t)}}const Yi=new s0,Er=new Gg(101),ya=document.getElementById("c"),qt=new Eg({canvas:ya,antialias:!0,alpha:!1,powerPreference:"high-performance"}),wo=window.innerWidth||ya.clientWidth||800,Zc=window.innerHeight||ya.clientHeight||600;qt.setPixelRatio(Math.min(window.devicePixelRatio||2,wo<768?2:3));qt.setSize(wo,Zc);qt.toneMapping=dc;qt.toneMappingExposure=1.15;qt.outputColorSpace=Ht;qt.shadowMap.enabled=!0;qt.shadowMap.type=cc;const zt=new bg;zt.background=new de(132104);zt.fog=new xo(132104,15e-5);const Bt=new Wt(50,wo/Zc,.5,45e3),Un=new Cg(16775917,3.2,4500,.85);Un.position.set(0,0,0);Un.castShadow=!0;Un.shadow.mapSize.width=2048;Un.shadow.mapSize.height=2048;Un.shadow.bias=-1e-4;zt.add(Un);const o0=new Rg(2764896,.35);zt.add(o0);Zg(zt);const Le={target:new P(0,0,0),radius:145,theta:.9,phi:1.15,targetRadius:145,targetTheta:.9,targetPhi:1.15,minRadius:6,maxRadius:350,dragging:!1,lastX:0,lastY:0,cameraDriftMode:!1,driftPhase:0,driftSpeed:35e-5,earthSkyView:!1,orbitTrackingId:null,lookFromEarthAt(i){const e=i.clone().sub(new P(0,-10,0)).normalize();this.targetPhi=Math.acos(Tc.clamp(e.y,-1,1)),this.targetTheta=Math.atan2(e.x,e.z)},init(){this.update(),window.addEventListener("pointerdown",e=>{e.target.closest("header")||e.target.closest(".info-panel")||e.target.closest(".bottom-bar")||e.target.closest(".modal-overlay")||e.target.closest(".tour-bar")||e.target.closest(".floating-controls")||(this.dragging=!0,this.lastX=e.clientX,this.lastY=e.clientY)}),window.addEventListener("pointermove",e=>{if(!this.dragging)return;const t=e.clientX-this.lastX,n=e.clientY-this.lastY;this.lastX=e.clientX,this.lastY=e.clientY,this.targetTheta-=t*.0055,this.targetPhi=Math.max(.08,Math.min(Math.PI-.08,this.targetPhi-n*.0055))}),window.addEventListener("pointerup",()=>this.dragging=!1),window.addEventListener("wheel",e=>{e.target.closest(".info-panel")||e.target.closest(".modal-overlay")||(this.targetRadius=Math.max(this.minRadius,Math.min(this.maxRadius,this.targetRadius+e.deltaY*.08)))},{passive:!0});let i=0;window.addEventListener("touchstart",e=>{e.touches.length===2&&(i=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY))},{passive:!0}),window.addEventListener("touchmove",e=>{if(e.touches.length===2){const t=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY),n=(i-t)*.45;i=t,this.targetRadius=Math.max(this.minRadius,Math.min(this.maxRadius,this.targetRadius+n))}},{passive:!0})},update(){if(this.theta+=(this.targetTheta-this.theta)*.12,this.phi+=(this.targetPhi-this.phi)*.12,this.radius+=(this.targetRadius-this.radius)*.12,this.cameraDriftMode&&!this.dragging){this.driftPhase+=.006;const n=Er.noise2D(this.driftPhase*.4,0),a=Er.noise2D(0,this.driftPhase*.3);this.targetTheta+=n*this.driftSpeed*1.2,this.targetPhi=Math.max(.1,Math.min(Math.PI-.1,this.targetPhi+a*this.driftSpeed*.6))}if(this.orbitTrackingId&&ot[this.orbitTrackingId]){const n=ot[this.orbitTrackingId],a=new P;n.mesh.getWorldPosition(a),this.target.lerp(a,.12)}if(this.earthSkyView){const a=0+500*Math.sin(this.phi)*Math.sin(this.theta),r=-10+500*Math.cos(this.phi),s=0+500*Math.sin(this.phi)*Math.cos(this.theta);Bt.position.set(0,-10,0),Bt.lookAt(a,r,s);return}const i=this.target.x+this.radius*Math.sin(this.phi)*Math.sin(this.theta),e=this.target.y+this.radius*Math.cos(this.phi),t=this.target.z+this.radius*Math.sin(this.phi)*Math.cos(this.theta);Bt.position.set(i,e,t),Bt.lookAt(this.target)}};Le.init();const ot={},{planetsGroup:mr,orbitsGroup:ds}=t0(zt,ot),ki=r0(zt,ot);ki.visible=!1;const li=Qg(zt,ot);li.visible=!1;const sn=e0(zt);sn.visible=!1;let lt=new Ng(qt),Ao=null;lt.addPass(new Fg(zt,Bt));const l0={uniforms:{tDiffuse:{value:null},uBHScreen:{value:new ye(.5,.5)},uStrength:{value:0},uAspect:{value:window.innerWidth/window.innerHeight}},vertexShader:`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,fragmentShader:`
    uniform sampler2D tDiffuse;
    uniform vec2 uBHScreen;
    uniform float uStrength;
    uniform float uAspect;
    varying vec2 vUv;
    void main() {
      vec2 d = vUv - uBHScreen;
      d.x *= uAspect;
      float dist = length(d);
      float falloff = 1.0 / (dist * dist * 55.0 + 0.4);
      vec2 dir = dist > 0.0001 ? d / dist : vec2(0.0);
      vec2 offset = dir * falloff * uStrength * 0.05;
      vec2 uv2 = clamp(vUv - offset, 0.001, 0.999);
      gl_FragColor = texture2D(tDiffuse, uv2);
    }
  `};Ao=new Yc(l0);lt.addPass(Ao);lt.lensingPass=Ao;const Jc=new ji(new ye(window.innerWidth,window.innerHeight),.65,.4,.85);lt.addPass(Jc);lt.bloomPass=Jc;let hs=0,fs=performance.now(),lr="high";function c0(){hs++;const i=performance.now();if(i-fs>=3e3){const e=hs/((i-fs)/1e3);hs=0,fs=i,e<24&&lr==="high"?(lr="medium",qt.setPixelRatio(Math.min(window.devicePixelRatio||1,1.5)),lt&&lt.bloomPass&&lt.bloomPass.resolution.set(window.innerWidth*.5,window.innerHeight*.5)):e<18&&lr==="medium"&&(lr="low",qt.setPixelRatio(1),lt&&lt.bloomPass&&(lt.bloomPass.strength=.4),lt.lensingPass&&(lt.lensingPass.enabled=!1))}}let ps=null;const u0=5e3;function Qc(){document.body.classList.remove("ui-hidden"),ps&&clearTimeout(ps),ps=setTimeout(()=>{!document.getElementById("infoPanel").classList.contains("show")&&!document.getElementById("tourBar").classList.contains("show")&&!document.getElementById("modalOverlay").classList.contains("show")&&document.body.classList.add("ui-hidden")},u0)}["mousemove","mousedown","touchstart","keydown","wheel"].forEach(i=>{window.addEventListener(i,Qc,{passive:!0})});Qc();let pt="solar",Et=1,eu="primaria",Xt=null,Co=null,pi=0,gr=!0,va=null;const d0=9e4;function Ro(){gr&&(va&&clearTimeout(va),va=setTimeout(()=>{h0()},d0))}function h0(){_t("🏛️ Modo Museo: Reiniciando para el próximo explorador...",4e3),mn("solar"),Pa(),au(),Lo(),Jt("sol"),Et=1,La(1),Le.targetRadius=145,Le.targetTheta=.9,Le.targetPhi=1.15,Le.target.set(0,0,0)}function f0(){Le.cameraDriftMode=!Le.cameraDriftMode;const i=document.getElementById("btnDriftTop");i&&i.classList.toggle("active-drift",Le.cameraDriftMode),_t(Le.cameraDriftMode?"🛸 Deriva Telescópica ACTIVADA (JWST/Hubble Micro-drift)":"🎯 Deriva Telescópica DESACTIVADA",3e3)}function p0(){gr=!gr;const i=document.getElementById("kioskBadge"),e=document.getElementById("btnKiosk");gr?(i.classList.remove("inactive"),i.innerHTML="🏛️ Modo Museo: ACTIVO",e.classList.add("active-kiosk"),_t("🏛️ Modo Kiosco de Museo activado (Auto-reset tras 90s)",3e3),Ro()):(i.classList.add("inactive"),i.innerHTML="🏛️ Modo Museo: INACTIVO",e.classList.remove("active-kiosk"),va&&clearTimeout(va),_t("Modo Kiosco desactivado",2500))}["mousemove","mousedown","touchstart","keydown","click"].forEach(i=>{window.addEventListener(i,Ro,{passive:!0})});Ro();function mn(i){pt=i,Yi.setMode(pt,null),Le.orbitTrackingId=null;const e=document.getElementById("btnRideOrbit");e&&(e.classList.remove("active-ride"),e.innerHTML="🚀 SEGUIR ÓRBITA EN VIVO"),document.getElementById("btnSolar").classList.toggle("active",pt==="solar"),document.getElementById("btnDeep").classList.toggle("active",pt==="deep");const t=document.getElementById("btnConstelaciones");if(t&&t.classList.toggle("active",pt==="constelaciones"),pt==="solar"){mr.visible=!0,ds.visible=!0,ki.visible=!1,typeof li<"u"&&(li.visible=!1),typeof sn<"u"&&(sn.visible=!1),Le.earthSkyView=!1;const n=document.getElementById("btnEarthViewToggle");n&&(n.style.display="none"),Un.castShadow=!0,Le.target.set(0,0,0),Le.targetRadius=145,tu()}else if(pt==="deep"){mr.visible=!1,ds.visible=!1,ki.visible=!0,typeof li<"u"&&(li.visible=!1),typeof sn<"u"&&(sn.visible=!1),Le.earthSkyView=!1;const n=document.getElementById("btnEarthViewToggle");n&&(n.style.display="none"),Un.castShadow=!1,Le.target.set(0,-2,-26),Le.targetRadius=160,m0()}else if(pt==="constelaciones"){mr.visible=!1,ds.visible=!1,ki.visible=!1,typeof li<"u"&&(li.visible=!0),typeof sn<"u"&&(sn.visible=!0),Le.earthSkyView=!0;const n=document.getElementById("btnEarthViewToggle");n&&(n.style.display="inline-block",n.innerHTML="🌍 VISTA DESDE TIERRA (ACTIVO)",n.style.background="rgba(0, 240, 255, 0.15)"),Kc(ot,null),Le.lookFromEarthAt(new P(0,60,-280)),Un.castShadow=!1,Le.target.set(0,0,0),Le.targetRadius=290,g0()}Pa()}const $i=document.getElementById("planetChips");function tu(){$i.innerHTML="",zi.forEach(i=>{const e=document.createElement("button");e.className="planet-chip",e.innerHTML=`<span style="color:#${i.color.toString(16).padStart(6,"0")}">●</span> ${i.name}`,e.onclick=()=>Jt(i.id),$i.appendChild(e)})}function m0(){$i.innerHTML="",rn.forEach(i=>{const e=document.createElement("button");e.className="planet-chip",e.innerHTML=`✦ ${i.name.split(" ")[0]}`,e.onclick=()=>Jt(i.id),$i.appendChild(e)})}function g0(){$i.innerHTML="",typeof $n<"u"&&$n.forEach(i=>{const e=document.createElement("button");e.className="planet-chip",e.innerHTML=`✨ ${i.name.split(" ")[0]}`,e.onclick=()=>Jt(i.id),$i.appendChild(e)})}tu();const fa=new Set;function Jt(i){const e=ot[i];if(!e)return;Xt=e.data,zi.some(a=>a.id===i)&&pt!=="solar"&&mn("solar"),rn.some(a=>a.id===i)&&pt!=="deep"&&mn("deep"),typeof $n<"u"&&$n.some(a=>a.id===i)&&pt!=="constelaciones"&&mn("constelaciones");const t=new P;e.mesh.getWorldPosition(t),Le.target.copy(t),pt==="solar"?Le.targetRadius=e.data.id==="sol"?18:e.data.radius*6.5:pt==="constelaciones"?(Kc(ot,i),Le.earthSkyView?Le.lookFromEarthAt(t):Le.targetRadius=310):Le.targetRadius=e.data.id==="agujero"?24:e.data.id==="nebulosa"?42:28,nu(Xt),document.getElementById("infoPanel").classList.add("show"),Yi.setMode(pt,i),Yi.playClickFeedback(520,.05),Le.orbitTrackingId=null;const n=document.getElementById("btnRideOrbit");n&&(n.classList.remove("active-ride"),n.innerHTML="🚀 SEGUIR ÓRBITA EN VIVO",n.style.display=pt==="solar"&&i!=="sol"?"flex":"none"),fa.add(i),E0()}function Po(i){eu=i,document.querySelectorAll(".edu-tab").forEach(e=>e.classList.remove("active")),document.getElementById(`tab${i.charAt(0).toUpperCase()+i.slice(1)}`).classList.add("active"),Xt&&nu(Xt)}function nu(i){document.getElementById("infoType").textContent=i.type,document.getElementById("infoTitle").textContent=i.name;const e=i.descLevels&&i.descLevels[eu]||i.desc;document.getElementById("infoDesc").textContent=e;const t=document.getElementById("scaleComparator");i.scaleComp?(t.style.display="flex",document.getElementById("scaleRefBadge").textContent=`Ref: ${i.scaleComp.ref}`,document.getElementById("scaleSizeText").textContent=i.scaleComp.sizeStr,document.getElementById("scaleMassText").textContent=i.scaleComp.massStr):t.style.display="none";const n=document.getElementById("nasaTelemetryHud");n&&(i.teff||i.spectralClass||i.mass||i.keplerianVelocity)?(n.style.display="block",document.getElementById("telemClass").textContent=i.spectralClass||"N/A",document.getElementById("telemTeff").textContent=i.teff?`${i.teff} K`:"N/A",document.getElementById("telemMass").textContent=i.mass||"N/A",document.getElementById("telemLuminosity").textContent=i.luminosity||"N/A",document.getElementById("telemVelocity").textContent=i.keplerianVelocity||"N/A",document.getElementById("telemDensity").textContent=i.density||"N/A"):n&&(n.style.display="none");const a=document.getElementById("relativityControls");a&&(i.id==="agujero"?(a.style.display="block",v0()):a.style.display="none");const r=document.getElementById("infoFacts");r.innerHTML="",(i.facts||[]).forEach(s=>{const o=document.createElement("li");o.textContent=s,r.appendChild(o)}),document.getElementById("infoFun").textContent=i.fun||""}function Pa(){document.getElementById("infoPanel").classList.remove("show"),Le.orbitTrackingId=null;const i=document.getElementById("btnRideOrbit");i&&(i.classList.remove("active-ride"),i.innerHTML="🚀 SEGUIR ÓRBITA EN VIVO")}function v0(i){const e=ot.agujero;if(!e||!e.shaderMat)return;const t=document.getElementById("sliderMass"),n=document.getElementById("valMass"),a=document.getElementById("sliderAccretion"),r=document.getElementById("valAccretion"),s=document.getElementById("sliderInclination"),o=document.getElementById("valInclination"),l=document.getElementById("sliderDoppler"),u=document.getElementById("valDoppler"),c=document.getElementById("btnGeodesicGrid");if(t&&n&&(t.value=e.shaderMat.uniforms.uMass?e.shaderMat.uniforms.uMass.value:1,n.textContent=`${parseFloat(t.value).toFixed(2)} M_☉`,t.oninput=f=>{const d=parseFloat(f.target.value);n.textContent=`${d.toFixed(2)} M_☉`,e.shaderMat.uniforms.uMass&&(e.shaderMat.uniforms.uMass.value=d)}),a&&r&&(a.value=e.shaderMat.uniforms.uAccretionRate?e.shaderMat.uniforms.uAccretionRate.value:1.2,r.textContent=parseFloat(a.value).toFixed(2),a.oninput=f=>{const d=parseFloat(f.target.value);r.textContent=d.toFixed(2),e.shaderMat.uniforms.uAccretionRate&&(e.shaderMat.uniforms.uAccretionRate.value=d)}),s&&o&&(s.value=e.shaderMat.uniforms.uInclination?e.shaderMat.uniforms.uInclination.value:.15,o.textContent=`${parseFloat(s.value).toFixed(2)} rad`,s.oninput=f=>{const d=parseFloat(f.target.value);o.textContent=`${d.toFixed(2)} rad`,e.shaderMat.uniforms.uInclination&&(e.shaderMat.uniforms.uInclination.value=d)}),l&&u&&(l.value=e.shaderMat.uniforms.uDopplerStrength?e.shaderMat.uniforms.uDopplerStrength.value:1.35,u.textContent=`${parseFloat(l.value).toFixed(2)}x`,l.oninput=f=>{const d=parseFloat(f.target.value);u.textContent=`${d.toFixed(2)}x`,e.shaderMat.uniforms.uDopplerStrength&&(e.shaderMat.uniforms.uDopplerStrength.value=d)}),c){let f=e.shaderMat.uniforms.uShowGeodesicGrid?e.shaderMat.uniforms.uShowGeodesicGrid.value>.5:!1;c.textContent=f?"ACTIVA (ON)":"INACTIVA",f?c.classList.add("active"):c.classList.remove("active"),c.onclick=()=>{f=!f,e.shaderMat.uniforms.uShowGeodesicGrid&&(e.shaderMat.uniforms.uShowGeodesicGrid.value=f?1:0),c.textContent=f?"ACTIVA (ON)":"INACTIVA",f?c.classList.add("active"):c.classList.remove("active")}}}{const i=document.getElementById("infoPanel");let e=0,t=0,n=!1;i.addEventListener("touchstart",a=>{const r=a.touches[0];(a.target.closest(".drawer-handle")||i.scrollTop<=0)&&(e=r.clientY,t=e,n=!0)},{passive:!0}),i.addEventListener("touchmove",a=>{if(!n)return;t=a.touches[0].clientY;const r=t-e;r>0&&(i.style.transform=`translateY(${r}px)`,i.style.transition="none")},{passive:!0}),i.addEventListener("touchend",()=>{if(!n)return;n=!1;const a=t-e;i.style.transition="",i.style.transform="",a>80&&Pa()})}function _0(){const i=document.getElementById("modalOverlay"),e=document.getElementById("modalContent");e.innerHTML=`
    <h2 class="modal-title">🚀 Tours Didácticos para Docentes</h2>
    <p class="modal-subtitle">Selecciona una ruta escolar curada para explorar el cosmos paso a paso:</p>
    <div class="tour-card" onclick="startTour('estrellas')">
      <div>
        <div class="tour-card-title">✦ El Ciclo de Vida de las Estrellas</div>
        <div class="tour-card-desc">5 etapas: Nacimiento, Gigante Roja, Enana Blanca, Púlsar y Agujero Negro.</div>
      </div>
      <span style="font-size:20px">➔</span>
    </div>
    <div class="tour-card" onclick="startTour('oceanos')">
      <div>
        <div class="tour-card-title">✦ Mundos Océano y Habitabilidad</div>
        <div class="tour-card-desc">5 etapas: Tierra, Marte y lunas heladas del Sistema Solar.</div>
      </div>
      <span style="font-size:20px">➔</span>
    </div>
    <div class="tour-card" onclick="startTour('gigantes')">
      <div>
        <div class="tour-card-title">✦ Los Colosos del Sistema Solar</div>
        <div class="tour-card-desc">4 etapas: Júpiter, Saturno, Urano y Neptuno.</div>
      </div>
      <span style="font-size:20px">➔</span>
    </div>
    <div style="text-align:right; margin-top:20px">
      <button class="btn-hud" onclick="closeModal()">Cerrar</button>
    </div>
  `,i.classList.add("show")}function iu(){const i=$c[Co];if(!i)return;const e=i.steps[pi];document.getElementById("tourStepBadge").textContent=`${i.title} — Paso ${pi+1} de ${i.steps.length}`,document.getElementById("tourStepTitle").textContent=e.title,Jt(e.id)}function x0(){const i=$c[Co];i&&(pi<i.steps.length-1?(pi++,iu()):(_t("🎉 ¡Has completado el tour didáctico con éxito!",4e3),Lo()))}function M0(){pi>0&&(pi--,iu())}function Lo(){Co=null,pi=0,document.getElementById("btnTours").classList.remove("active-tour"),document.getElementById("tourBar").classList.remove("show")}const Jl=Xg;function S0(){const i=Jl[Math.floor(Math.random()*Jl.length)],e=document.getElementById("modalOverlay"),t=document.getElementById("modalContent");let n="";i.opts.forEach((a,r)=>{n+=`<div class="tour-card" onclick="checkQuizAnswer(${r}, ${i.ans}, '${i.exp.replace(/'/g,"\\'")}')">
      <span class="tour-card-title">${a}</span>
    </div>`}),t.innerHTML=`
    <h2 class="modal-title">🧠 Desafío Astrofísico</h2>
    <p class="modal-subtitle">${i.q}</p>
    ${n}
    <div id="quizResult" style="margin-top:16px; font-weight:700"></div>
    <div style="text-align:right; margin-top:20px">
      <button class="btn-hud" onclick="closeModal()">Cerrar</button>
    </div>
  `,e.classList.add("show")}function y0(i,e,t){const n=document.getElementById("quizResult");i===e?(n.style.color="#34d399",n.innerHTML=`¡CORRECTO! 🌟 <br><span style="font-size:13px; font-weight:400; color:#e2e8f0">${t}</span>`,_t("🏆 ¡Reto superado! Has ganado la insignia Explorador Sabio",4e3),document.getElementById("badgeQuiz").classList.add("unlocked")):(n.style.color="#ef4444",n.innerHTML="Incorrecto. Intenta otra opción.")}function au(){document.getElementById("modalOverlay").classList.remove("show")}window.checkQuizAnswer=y0;window.closeModal=au;function E0(){if(fa.size>=4){const i=document.getElementById("badgePlanets");i.classList.contains("unlocked")||(i.classList.add("unlocked"),_t("🌟 ¡Logro desbloqueado! Navegante Planetario",3500))}if(fa.has("agujero")&&fa.has("pulsar")&&fa.has("nebulosa")){const i=document.getElementById("badgeDeep");i.classList.contains("unlocked")||(i.classList.add("unlocked"),_t("🚀 ¡Logro desbloqueado! Explorador del Espacio Profundo",3500))}}let ms=null;function _t(i,e=3e3){const t=document.getElementById("toast");t.textContent=i,t.classList.add("show"),ms&&clearTimeout(ms),ms=setTimeout(()=>t.classList.remove("show"),e)}const Ql=new Pg,gs=new ye;let pa=null;window.addEventListener("pointerdown",i=>{i.target.closest("header")||i.target.closest(".info-panel")||i.target.closest(".bottom-bar")||i.target.closest(".modal-overlay")||i.target.closest(".tour-bar")||i.target.closest(".floating-controls")||(pa={x:i.clientX,y:i.clientY})});window.addEventListener("pointerup",i=>{if(!pa)return;const e=i.clientX-pa.x,t=i.clientY-pa.y,n=Math.sqrt(e*e+t*t);if(pa=null,n>6||i.target.closest("header")||i.target.closest(".info-panel")||i.target.closest(".bottom-bar")||i.target.closest(".modal-overlay")||i.target.closest(".tour-bar")||i.target.closest(".floating-controls"))return;gs.x=i.clientX/window.innerWidth*2-1,gs.y=-(i.clientY/window.innerHeight)*2+1,Ql.setFromCamera(gs,Bt);const a=Object.values(ot).map(s=>s.mesh),r=Ql.intersectObjects(a,!0);if(r.length>0){let s=r[0].object;for(;s.parent&&s.parent!==zt&&s.parent!==mr&&s.parent!==ki&&!s.parent.isGroup;)s=s.parent;const o=Object.entries(ot).find(([l,u])=>u.mesh===s||u.mesh.children.includes(s));o&&Jt(o[0])}});document.getElementById("btnSolar").onclick=()=>mn("solar");document.getElementById("btnDeep").onclick=()=>mn("deep");const ec=document.getElementById("btnConstelaciones");ec&&(ec.onclick=()=>mn("constelaciones"));const Ui=document.getElementById("btnEarthViewToggle");Ui&&(Ui.onclick=()=>{Le.earthSkyView=!Le.earthSkyView,Le.earthSkyView?(typeof sn<"u"&&(sn.visible=!0),Ui.innerHTML="🌍 VISTA DESDE TIERRA (ACTIVO)",Ui.style.background="rgba(0, 240, 255, 0.15)",Xt&&ot[Xt.id]&&ot[Xt.id].type==="constelacion"?Le.lookFromEarthAt(new P(...Xt.pos)):Le.lookFromEarthAt(new P(0,60,-280)),_t("🌍 Vista Observatorio: Cielo Estrellado desde la Tierra",2500)):(typeof sn<"u"&&(sn.visible=!1),Ui.innerHTML="🛰️ VISTA BÓVEDA ORBITAL",Ui.style.background="rgba(255, 255, 255, 0.08)",Le.targetRadius=310,_t("🛰️ Vista Orbital 3D de la Bóveda Celeste",2500))});const tc=document.getElementById("btnDriftTop");tc&&(tc.onclick=f0);document.getElementById("btnKiosk").onclick=p0;document.getElementById("btnTours").onclick=_0;document.getElementById("btnQuiz").onclick=S0;const di=document.getElementById("btnAudioToggle");di&&(di.onclick=()=>{const i=Yi.toggle();di.innerHTML=i?"🔊 SONIDO ON":"🔇 SONIDO OFF",di.style.background=i?"rgba(0, 240, 255, 0.25)":"",di.style.borderColor=i?"#00f0ff":"",_t(i?"🔊 Audio Cósmico Procedural Activado":"🔇 Audio Cósmico Silenciado",2500)});const nc=document.getElementById("btnHotkeysHelp"),pn=document.getElementById("hotkeysOverlay"),ic=document.getElementById("closeHotkeysBtn");nc&&pn&&(nc.onclick=()=>{pn.classList.add("show"),Yi.playClickFeedback(780,.05)});ic&&pn&&(ic.onclick=()=>pn.classList.remove("show"));pn&&pn.addEventListener("click",i=>{i.target===pn&&pn.classList.remove("show")});const Tn=document.getElementById("btnRideOrbit");Tn&&(Tn.onclick=()=>{!Xt||!ot[Xt.id]||(Le.orbitTrackingId===Xt.id?(Le.orbitTrackingId=null,Tn.classList.remove("active-ride"),Tn.innerHTML="🚀 SEGUIR ÓRBITA EN VIVO",_t("🛸 Cámara de Seguimiento Orbital Desactivada",2e3)):(Le.orbitTrackingId=Xt.id,Tn.classList.add("active-ride"),Tn.innerHTML="🎯 SIGUIENDO ÓRBITA EN VIVO",_t(`🚀 Viajando en órbita con ${Xt.name}`,3e3),Yi.playClickFeedback(880,.08)))});window.addEventListener("keydown",i=>{if(i.target.tagName==="INPUT"||i.target.tagName==="TEXTAREA")return;const e=i.key.toLowerCase();if(e==="1")mn("solar"),Jt("sol"),_t("☀ Modo Sistema Solar activado",2e3);else if(e==="2")mn("deep"),Jt("agujero"),_t("🌌 Modo Universo Profundo & Agujero Negro",2e3);else if(e==="3")mn("constelaciones"),Jt("osa_mayor"),_t("✨ Modo Bóveda Celeste & Constelaciones",2e3);else if(e==="e"){const t=document.getElementById("btnEarthViewToggle");t&&pt==="constelaciones"&&t.click()}else if(e==="g")typeof toggleGrid=="function"&&(toggleGrid(),_t("🕸️ Alternada Malla Geodésica Espacio-Tiempo",2e3));else if(e==="m")di&&di.click();else if(e===" "||i.code==="Space"){i.preventDefault();const t=document.getElementById("btnSpeed0"),n=document.getElementById("btnSpeed1");speedMultiplier===0?n&&n.click():t&&t.click()}else e==="escape"&&(Pa(),su(),pn&&pn.classList.remove("show"),Le.orbitTrackingId=null,Tn&&(Tn.classList.remove("active-ride"),Tn.innerHTML="🚀 SEGUIR ÓRBITA EN VIVO"))});function ru(){const i=document.getElementById("grrtOverlay"),e=document.getElementById("grrtIframe");e&&i&&(e.src="./simulador-grrt/index.html",i.classList.add("show"),_t("⚛️ Motor Raytracing Binet (GRRT) Iniciado",3e3))}function su(){const i=document.getElementById("grrtOverlay"),e=document.getElementById("grrtIframe");i&&i.classList.remove("show"),e&&(e.src="")}const ac=document.getElementById("btnGrrt");ac&&(ac.onclick=ru);const rc=document.getElementById("btnOpenGrrtPanel");rc&&(rc.onclick=ru);const sc=document.getElementById("btnCloseGrrt");sc&&(sc.onclick=su);document.getElementById("closeInfoBtn").onclick=Pa;document.getElementById("tourPrevBtn").onclick=M0;document.getElementById("tourNextBtn").onclick=x0;document.getElementById("tourExitBtn").onclick=Lo;document.getElementById("tabPrimaria").onclick=()=>Po("primaria");document.getElementById("tabSecundaria").onclick=()=>Po("secundaria");document.getElementById("tabAvanzado").onclick=()=>Po("avanzado");document.getElementById("btnResetCam").onclick=()=>{Jt(pt==="solar"?"sol":pt==="constelaciones"?"osa_mayor":"agujero"),_t("🎯 Vista centrada",2e3)};function La(i){Et=i,document.querySelectorAll(".speedbtn").forEach(e=>e.classList.remove("active")),i===0?document.getElementById("btnSpeed0").classList.add("active"):i===1?document.getElementById("btnSpeed1").classList.add("active"):i===2?document.getElementById("btnSpeed2").classList.add("active"):i===5&&document.getElementById("btnSpeed5").classList.add("active")}document.getElementById("btnSpeed0").onclick=()=>La(0);document.getElementById("btnSpeed1").onclick=()=>La(1);document.getElementById("btnSpeed2").onclick=()=>La(2);document.getElementById("btnSpeed5").onclick=()=>La(5);const oc=new Xc;function Io(){window._cosmicRafId=requestAnimationFrame(Io);const i=oc.getDelta(),e=oc.getElapsedTime();c0(),zi.forEach((d,m)=>{const g=ot[d.id];if(g)if(m>0){const v=d.dist>0?1/Math.sqrt(d.dist/11):1;g.pivot&&(g.pivot.rotation.y+=i*.12*v*Et),g.mesh.rotation.y+=i*.4*Et,g.mesh.userData.cloudMesh&&(g.mesh.userData.cloudMesh.rotation.y+=i*.48*Et),g.moonMeshes&&g.moonMeshes.forEach(p=>{const h=e*.5*p.data.s*Et;p.mesh.position.x=Math.cos(h)*p.data.d,p.mesh.position.z=Math.sin(h)*p.data.d})}else g.mesh.rotation.y+=i*.08*Et});const t=ot.pulsar;t&&(t.surfaceMat?.uniforms?.uTime&&(t.surfaceMat.uniforms.uTime.value=e),t.coneMat?.uniforms?.uTime&&(t.coneMat.uniforms.uTime.value=e),t.mesh&&(t.mesh.rotation.y+=i*3.5*Et));const n=ot.agujero;if(n){if(n.shaderMat?.uniforms&&(n.shaderMat.uniforms.uTime.value=e,n.shaderMat.uniforms.uCameraPos.value.copy(Bt.position),n.shaderMat.uniforms.uResolution.value.set(window.innerWidth,window.innerHeight)),n.s2Star){const d=e*.65*Et,m=4.8/(1+.58*Math.cos(d));n.s2Star.position.x=m*Math.cos(d),n.s2Star.position.z=m*Math.sin(d)*.6,n.s2Star.position.y=Math.sin(d*2)*.45}n.mesh&&(n.mesh.rotation.y+=i*.08*Et)}if(lt&&lt.lensingPass){const d=lt.lensingPass;let m=0;if(n&&n.mesh&&ki.visible){const g=n.mesh.getWorldPosition(new P),v=g.clone().project(Bt);if(!isNaN(v.x)&&v.z<1){d.uniforms.uBHScreen.value.set((v.x+1)/2,(v.y+1)/2);const p=Bt.position.distanceTo(g);m=Math.abs(v.x)<1.3&&Math.abs(v.y)<1.3?Tc.clamp(1-p/260,.15,1):0}}d.uniforms.uStrength.value+=(m-d.uniforms.uStrength.value)*.08}const a=ot.gigante;a&&a.mat&&a.mat.uniforms?.uTime&&(a.mat.uniforms.uTime.value=e,a.mesh.rotation.y+=i*.12*Et);const r=ot.enana;r&&r.mat&&r.mat.uniforms?.uTime&&(r.mat.uniforms.uTime.value=e,r.mesh.rotation.y+=i*.8*Et);const s=ot.nebulosa;s&&(s.mat?.uniforms?.uTime&&(s.mat.uniforms.uTime.value=e),s.mat?.uniforms?.uCameraPos&&s.mat.uniforms.uCameraPos.value.copy(Bt.position),s.mesh&&(s.mesh.rotation.y+=i*.015*Et));const o=ot.galaxia;o&&o.galaxyStars&&(o.galaxyStars.rotation.y+=i*.04*Et);const l=ot.protoplanetario;l&&(l.diskMat?.uniforms?.uTime&&(l.diskMat.uniforms.uTime.value=e),l.jetMat?.uniforms?.uTime&&(l.jetMat.uniforms.uTime.value=e),l.protoDisk&&(l.protoDisk.rotation.z-=i*.35*Et),l.mesh&&(l.mesh.rotation.y+=i*.05*Et));const u=ot.binario;u&&(u.streamMat?.uniforms?.uTime&&(u.streamMat.uniforms.uTime.value=e),u.mesh&&(u.mesh.rotation.y+=i*.45*Et),u.accDisk&&(u.accDisk.rotation.z-=i*.8*Et));const c=ot.sol;c&&c.mesh&&(c.mat&&c.mat.uniforms?.uTime&&(c.mat.uniforms.uTime.value=e),c.mesh.userData.coronaMat?.uniforms?.viewVector&&c.mesh.userData.coronaMat.uniforms.viewVector.value.subVectors(Bt.position,c.mesh.position)),zt.children&&zt.children.forEach(d=>{d.isPoints&&d.material?.uniforms?.uTime&&(d.material.uniforms.uTime.value=e)}),document.body.classList.contains("ui-hidden")&&(Le.targetTheta+=Er.noise2D(e*.08,1.5)*15e-5,Le.targetPhi+=Er.noise2D(1.5,e*.06)*8e-5);const f=document.getElementById("scaleBarLabel");if(f)if(pt==="solar"){const m=Le.radius*.02;m<.5?f.textContent=Math.round(m*1496e5)+" km":f.textContent=m.toFixed(1)+" UA"}else if(pt==="deep"){const m=Le.radius*.8;m>1e3?f.textContent=(m/1e3).toFixed(1)+" kly":f.textContent=Math.round(m)+" al"}else f.textContent=Math.round(Le.radius*.35)+" grados";Le.update(),lt?lt.render():qt.render(zt,Bt)}window.addEventListener("resize",()=>{const i=window.innerWidth||ya.clientWidth||1,e=window.innerHeight||ya.clientHeight||1;Bt.aspect=i/e,Bt.updateProjectionMatrix(),qt.setPixelRatio(Math.min(window.devicePixelRatio||2,i<768?2:3)),qt.setSize(i,e),lt&&(lt.setSize(i,e),lt.bloomPass&&lt.bloomPass.resolution.set(i,e),lt.lensingPass&&(lt.lensingPass.uniforms.uAspect.value=i/e))});function vs(){const i=document.getElementById("loading");i&&!i.dataset.removed&&(i.dataset.removed="true",i.style.opacity="0",setTimeout(()=>i.remove(),750))}document.readyState==="complete"||document.readyState==="interactive"?setTimeout(vs,600):(window.addEventListener("load",()=>setTimeout(vs,600)),document.addEventListener("DOMContentLoaded",()=>setTimeout(vs,600)));window._cosmicRafId&&cancelAnimationFrame(window._cosmicRafId);window._cosmicAnimate=Io;Io();
//# sourceMappingURL=index-nmsDREOT.js.map
