var _MRSLog=[];var _csCTL={wURL:'',wName:String(window.name),wValue:'',wHash:function(){var aHash=String(window.location.hash);if(aHash!=_csCTL.wValue){	_csCTL.wValue=aHash;var n=aHash.lastIndexOf("_");if(String(aHash.substr(n)).indexOf("_0.")!=-1){AM_Start.Msg(aHash);}else{ 	_csCTL.Proc(aHash.substr(n+1)); 	} } },Proc:function(gUrl){var aw=String(_csCTL.wValue);var n=aw.lastIndexOf("_");var cMid = document.getElementById('MRS_SCRIPT');
if(typeof(cMid.onreadystatechange)!="undefined"){cMid.onreadystatechange =function(){AM_Start.Load();AM_Start.Msg(_csCTL.wValue);};	}else{cMid.onload =function(){	setTimeout(function(){AM_Start.Load(); 	AM_Start.Msg(_csCTL.wValue); },500);	};	};	cMid.src=((location.protocol=="https:")?"https://":"http://")+_csCTL.wURL +gUrl;}, run:function(){var ref=String(document.referrer); 
if((_csCTL.wName.indexOf('MRS:')!=-1)||(String(ref).indexOf('MRS=')!=-1)){var cS=document.createElement('script');var cH=document.getElementsByTagName("head")[0];cS.async = true; cS.type = 'text/javascript';cS.charset="utf-8";cS.id="MRS_SCRIPT";cH.appendChild(cS);if(String(this.wName).indexOf('MRS:')==-1){this.wName=String(ref.substring(ref.indexOf('MRS=')+4,ref.length)).replace("|","?");}this.wURL=String(this.wName).replace("MRS:",""); window.setInterval(_csCTL.wHash,100);}}};
var  AceClick_ASP=(function(){var _u={gd:AMRS_GD,gc:AMRS_GC,pt:8080,sv:20131205,url:document.URL,ref:document.referrer,rtd:(new Date()).getTime(),mrs:(window.name!='MRS'?1:0)};var _s={Lp:'a.tagName=="IMG"||a.tagName=="B" || a.tagName=="I" || a.tagName== "U" || a.tagName== "FONT" || a.tagName=="STRONG" || a.tagName=="I" || a.tagName=="A" || a.tagName=="AREA" || a.tagName=="SPAN" ',bk:'bookmark',tt:'title',l:'load',c:'click',f:'function',j:'javascript:',u:'undefined',n:'number'};
var _br={uf:(parseInt(String(navigator.userAgent.match(/Firefox\/\d+/)).replace("Firefox/",""))),ud:'undefined',d:document,w:window,dc:document.compatMode,cm:(typeof(this.dc) != 'undefined' && this.dc != 'BackCompat')?1:0,ds:document.documentElement,st:function(){return(typeof(_br.w.pageYOffset)!= _br.ud?_br.w.pageYOffset:(_br.cm!=1)?_br.ds.scrollTop:_br.d.body.scrollTop)},sl:function(){return(typeof(_br.w.pageXOffset)!= _br.ud?_br.w.pageXOffset:(_br.cm!=1)?_br.ds.scrollLeft:_br.d.body.scrollLeft)},sh:function(){return((_br.cm!=1)?_br.ds.scrollHeight:_br.d.body.scrollHeight)},sw:function(){return((_br.cm!=1)?_br.ds.scrollWidth:_br.d.body.scrollWidth)},ww:function(){var w=(typeof(_br.w.innerWidth)!= _br.ud?_br.w.innerWidth:(_br.cm!=1)?_br.ds.clientWidth :_br.d.body.clientWidth);if(w==0){w=(_br.cm!=1)?_br.ds.offsetWidth :_br.d.body.offsetWidth; } return w;},wh:function(){var h=(typeof(_br.w.innerHeight)!= _br.ud?_br.w.innerHeight:(_br.cm!=1)?_br.ds.clientHeight:_br.d.body.clientHeight);if(h==0){h=(_br.cm!=1)?_br.ds.offsetHeight :_br.d.body.offsetHeight; } return h;}};
var _b=function(){var tO;this.buf=new Array();this.size=150;this.len=0;this.events;this.vt=0; this.add=function(v){var at=0;tO=this;var am = new Array();if(v!=""){	am = v.split('|');	if((am[0]!="0" )&& (am.length!=1) && (tO.vt!=am[0])){		at=(am[0]-this.vt);if(tO.buf.length<tO.size){	tO.buf.push(new Array(v));}else{	tO.events(tO.buf);	tO.buf=[];tO.buf.push(new Array(v));}this.vt=am[0];tO.len=tO.buf.length;}}};this.cls=function(){tO=this;tO.buf=[];};this.toStr=function(){var ag="";tO=this;for(var vv in tO.buf){ ag+=tO.buf[vv]+"\n";}return ag;};this.toObj=function(){tO=this;if(tO.length!=0){return tO.buf;}else{ return 'undefined';};}};var _f={sNum:function(){ return (((1+Math.random())*0x10000)|0).toString(16).substring(1);},FCV:function() {return (_f.sNum()+ "0-"+ (new Date().getTime())+"-"+_f.sNum()+_f.sNum()+_f.sNum()+_f.sNum());},isVer:(isNaN(_br.uf)!=false?0:_br.uf),nm:function(st){ var v = String(st); var r='';for (var i=0; i<v.length; i++) {
if(!isNaN(v.charAt(i))){r+=v.charAt(i);};} return (r!=''?r:v);},cs:function(n,v,e,p){var ex = new Date();var es='0'; if(e!=0){ex.setTime(ex.getTime() + eval(e));es=ex.toGMTString();} var s=n+_u.gc+"="+escape(v)+((e!=0)?";expires="+es:"")+((p)?";path="+p:"")+";"; document.cookie=s; },cg:function(v){var aq='';var s=v+_u.gc;	var ss=0;	var se=0;var dc=document.cookie; if(dc.length>0){ss=dc.lastIndexOf(s+ "=");if(ss!=-1){	ss=ss + s.length+1;se=dc.indexOf(";",ss);if(se==-1){se=dc.length;};aq=unescape(dc.substring(ss,se));	return aq; }; }return _t.d; },pt:function(){var c=String(Math.random()*1000000000).replace(".",""); var t=Math.floor(new Date().getTime() / 1000); var sr=t+''+c.substr(0,3); return sr;},
ra:function(a){var ce=g=s='';var ret="";var an=0; try{s=eval(a);ret=s;	if(a=='_amt'){ret=s.toString().replace(/[^0-9.]/g, "");};if(a=='_ll'){ret=s;};if(a=='_id'){if(s.length>1){ret='member';}else{ret='';}};if(a=='_ag' ){if((s=="") || s==0 || s >=150 ){ret="0";}};if(a=='_gd'){if((s=="") || ((s!="man") && (s!="woman"))){ret= "unknown";}};}catch(_e){ret='';}; return ret;},idv:function(a){var s='';var st=""; var ret="";	try{s=String(eval(a));ret=s;	if(a=='mr_ag' ){if((s=="") || s==0 || s >=150 ){ret="0";}	};if(a=='mr_id'){if((s=="") || (s!="member") ){ret= "";};};if(a=='mr_gd'){if((s=="") || ((s!="man") && (s!="woman"))){ret= "unknown";};};	if(a=='mr_acq'){	 if((s=="") || s==0 || s >=11 ){ret="0";}};if(a=='mr_buy'){	if((s=="") || (s == 0 )){ret= "0";};	}; }catch(_e){ret='';if(a=='mr_ag'){ret=_f.ra('_ag');};if(a=='mr_id'){ret=_f.ra('_id');};if(a=='mr_gd'){ret=_f.ra('_gd');};if(a=='mr_buy'){ret=(_f.ra('_ll')!=''?_f.ra('_amt'):'0');};};
if(a=="mr_id"){st="&mbkey";}else{st=a.replace('mr_','&');}	return st+"="+ret;},sn:(typeof(screen)!=undefined)&&(typeof(screen.width)=='number')?screen.width+'*'+screen.height:'0*0',ts:function(){return (((new Date()).getTime())-_u.rtd);},e:function(s,t){return s.indexOf(t);},tt:function(o){var r;r=o.getAttribute(_s.tt);if(typeof r !='object'){if(r.length!=0){return r;}; };return '';}, ul:function(s,p){var r=String(s),t='';if(p==0){ t=r.toUpperCase();}else{t=r.toLowerCase();};return t;},pn:function(o){var a;a=o;if(_f.ul(a.tagName,0)=='A' || _f.ul(a.tagName,0)=='AREA'){return a;}else if(_f.ul(a.tagName,0)=='BODY'){return 0;}else{return _f.pn(a.parentNode);}  },jr:function(sr){var r='';var ar='';r=sr.substr(_f.e(sr,'{'),sr.length);r=r.replace('{','');r=r.replace('}','');return r;},cr:function(s,e,r){var str=s+"";var ret="";for(i = 0; i < str.length; i++){var c = str.charCodeAt(i);
var ch=String.fromCharCode(c);if(eval(e)){ret+=''+ch.replace(ch,r);	}else{ret+=''+ch;}} return ret;},cm:(document.compatMode!='CSS1Compat'?1:0),d:document,ae:function(c,f,r){var wd;if(r!=undefined||r!=null){wd=r;}else{wd=document;} if(wd.addEventListener){ wd.addEventListener(c,f,true);}else if(wd.attachEvent){ wd.attachEvent("on"+c,f);}},wt:function(millis){var date = new Date();	var curDate = null;	do {curDate = new Date();}	while(curDate-date < millis){};	return true;},hr:function(u,t){	var r=String(u).replace(/http:\/\/|https:\/\//gi, "");	var v=1024;	var s=r.length;	if(s>v){if(t=='u'){r='URLblockade:'+s;}else{r=r.substring(0,v);}}; return r;},h:(location.protocol=="https:")?"https://"+_u.gd+':843/?':"http://"+_u.gd+':'+_u.pt+'/?',r:function(s,t){if(_f.e(s,t)>0){ return s.substring(0,_f.e(s,t));}return s;},ev:function(o,e,v){_f.ae(e,function ecall(){return AceClick_ASP.ace_input(o,e,v);},o);},
up:function(u){var r='',c=0,a=''+u; c=_f.e(a,'?'); if(c!=-1){ r=a.substr(c+1,a.length); return r;} return '';},vr:function(o){var sit=Array();var r=new Array(),b='',a=0,c=0;sit=o.sort();for(var i = 0;i<sit.length;i++){var am=sit[i].split('@');if(am[1]==b){a++;	b=am[1];	r[i]=sit[i]+"@"+a+"*";	continue;	}	a=0; b=am[1];	r[i]=sit[i]+"@"+a+"*"; }	return escape(r.join(''));}};var _c ={isInt:function(s){return !isNaN( parseInt( s ) );},ihx:function(v){if(_c.isInt(v)==true){var str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ*",vl="",cr="";	var nm=Math.floor(Math.abs(v)), r=0,ri = str.length; if(v.indexOf('-')!=-1){cr='';}else{cr='-';} for (var i=0;i<ri;i++) {r=(nm%ri);vl+=str.charAt(r);nm=((nm-r)/ri); if (nm==0) break;} 	return cr+''+vl; }else{return '@'+v;}},iso:function(v){var r=new Array(),b='',a=0,c=0,am=v.split('.');for(var i = 0;i<am.length-1;i++){if(am[i]==b && _c.isInt(b)==true){a++;r[c]=_c.ihx(b)+""+a+".";continue; 	};
a=0;b=am[i];c++;r[c]=_c.ihx(b) +".";};	return  escape(r.join(''));	},icp:function(v,p){var val=v,ret=p,res='',vac=new Array();vac= String(val[0]).split('|'); for(var i =0;i<val.length;i++){var tmp1=val[i];var tmp2=val[i+1];var no1=String(tmp1).split('|');var no2=String(tmp2).split('|'); for(var c = 0;c<vac.length;c++){ var vl=((no1[c] - no2[c])); if(_c.isInt(vl)==true){ vac[c]+="."+((no1[c] - no2[c]));	}else{vac[c]+="." +no2[c];}}} res+='';	for(var t=0;t<vac.length-1;t++){ if(vac[t]!=''){res+="&"+ret+(t+1)+"="+_c.iso(vac[t]);}}return res;}};var _t={i:100,ms:0,id:0,events:0,e:true,st:new Date(),Timer:function(){var nws=new Date(); _t.ms = nws.getTime() - _t.st.getTime(); if(_t.events){_t.events(_t.ms);}}, Start:function(){ if(_t.e){_t.id = setInterval(function(){_t.Timer(); },_t.i);}}, Stop:function(){_t.e=false;if(_t.id!=0){clearInterval(_t.id);_t.id=0;}}}; var _k={ff:"",adkey:"",e:function(s,t){var rs =eval("try{"+s+".document."+t+";}catch(_e){'';};"); return rs;},
f:function(){var r='';var flen = 0; try{flen=top.frames.length;}catch(_e){flen=0;};if((flen!=0) &&(typeof(top)=='object')){ r=_k.e('top','URL'); if(r !=document.URL ){return 1;};}; return 0;},fr:function(s){ return (typeof(FD_ref)=='string'&&FD_ref != '')?FD_ref:s;}, get:function(){var _rf=_ul=_prl=_ad='';var frm=_k.f();if(frm!=0){_prl=_k.e('top','URL');if(_prl==''){	_prl=_k.e('parent','URL');};_prl=_f.hr(_f.r(_prl,'#'),'u');_rf=_u.ref;if(_rf==''){_rf=_k.e('parent','URL');};_rf=_f.hr(_f.r(_rf,'#'),'r');if(_rf==_prl){ _rf=_k.e('top','referrer');if(_rf=='' ){ _rf=_s.bk;}; if(_f.e(document.cookie,'ACASP_CK='+escape(_rf)) > -1 ){ _rf = _prl;	}else{ _ad=_f.up(_prl);document.cookie='ACASP_CK='+escape(_rf)+';path=/;';}}	_rf=_k.fr(_rf); _ul=_f.r(_u.url,'#');return {url:_f.hr(_ul,'u'),referrer:_rf,ad:_ad}; }else{	_rf=_f.r(_u.ref,'#');_ul=_f.r(_u.url,'#'); _rf=_k.fr(_rf); 	_rf=(_rf!='')?_rf:_s.bk;	 _ad=_f.up(_ul); return {url:_f.hr(_ul,'u'),referrer:_f.hr(_rf,'r'),ad:_ad};}}};
var _Main={pg:_k.get(),mb:new _b(),tb:new _b(),ts:0,tid:0,bt:0,x:0,y:0,b:0,k:0,w:0,h:0,st:0,sl:0,sw:0,sh:0,it:0,ic:0,ik:0,se:0,pt:0,pi:0,ct:0,rc:0,mvt:0,mlx:0,mly:0,ctp:'',et:'',ut:0, jsinfo:function(){var rm=_Main; rm.w=_br.ww();rm.h=_br.wh();rm.st=_br.st();rm.sl=_br.wh();rm.sw=_br.sw();rm.sh=_br.sh();}, jsWmProc:function(e){if(!e){e=event;} var m = document.all ? e.srcElement : e.target; var bt=  e.button; var o=_Main; o.x=(e.clientX>=0 && !isNaN(e.clientX))?Math.round(e.clientX+_br.sl()):0; o.y=(e.clientY>=0 && !isNaN(e.clientY))?Math.round(e.clientY+_br.st()):0; switch(e.type){ case "mousemove": if(o.et==e.type){	o.sh=_br.sh(); o.sw=_br.sw(); o.b=0;o.se=1;}	break; case "mousedown": if(m.tagName!='HTML'){ o.sh=_br.sh();  o.sw=_br.sw(); o.b=(typeof(e.which)!='undefined'?(e.which==1?1:e.which==2?4:e.which==3?2:1):e.button);o.se=1; } break; case "resize": o.x=_br.ww(); o.y=_br.wh(); o.sh=_br.sh();  o.sw=_br.sw();
o.b=8; o.se=1; break; case "scroll": o.x=_br.sl(); o.y=_br.st(); o.sh=_br.sh(); o.sw=_br.sw(); o.b=7; o.se=1; break;} o.et=e.type;},ev:function(){  var it=document.getElementsByTagName('INPUT'); var st=document.getElementsByTagName('SELECT');var tt=document.getElementsByTagName('TEXTAREA'); var rAi=Array(),rSi=Array(),rTi=Array();var ct=0;for (var s=0;s<it.length;s++){var obj=it[s]; var ot=String(obj.type).toLowerCase(); if((ot!='submit') && (ot!='reset') && (ot!='image') && (ot!='hidden') ){if(obj.name!=''){rAi[ct]='n@'+obj.name+'@'+(ct+1); ct++; }else if(obj.id!=''){ rAi[ct]='i@'+obj.id+'@'+(ct+1); ct++;} if(obj.name!='' || obj.id!='' ){if(ot=='radio' || ot=='checkbox'){ _f.ev(obj,'click',ct);	}else if(ot=='file'){ _f.ev(obj,'change',ct); }else if(ot=='text' || ot=='password'){	if(obj.getAttribute('readonly')=="" || obj.getAttribute('readonly')==null){_f.ev(obj,'keyup',ct);_f.ev(obj,'change',ct);}}}}} ct=0; 
for(var s=0;s<st.length;s++){ var obj=st[s];var ot=String(obj.type).toLowerCase();if(obj.name!=''){rSi[ct]='n@'+obj.name+'@'+(ct+1); ct++; }else if(obj.id!=''){rSi[ct]='i@'+obj.id+'@'+(ct+1);ct++;} if(obj.name!='' || obj.id!='' ){  _f.ev(obj,'change',ct);}; } ct=0; for(var s=0;s<tt.length;s++){ var obj=tt[s]; if(obj.getAttribute('readonly')=="" || obj.getAttribute('readonly')==null){var ot=String(obj.type).toLowerCase(); if(obj.name!=''){rTi[ct]='n@'+obj.name+'@'+(ct+1);ct++;}else if(obj.id!=''){rTi[ct]='i@'+obj.id+'@'+(ct+1);ct++;} if(obj.name!='' || obj.id!='' ){ _f.ev(obj,'keyup',ct);_f.ev(obj,'change',ct);}; } }	 return '&etc='+escape(_f.vr(rAi))+'&sm='+escape(_f.vr(rSi))+'&ta='+escape(_f.vr(rTi));},jsTimer:function(s){var vt=0; var o=_Main; if(o.se==1){ if(o.b==0){  vt=(s-o.mvt); o.mvt=s;} if( o.b==7){ vt = _br.wh();}_Main.mb.add(_t.ms +'|'+ o.x +'|' + o.y +'|' + o.sw +'|' + o.sh +'|' + o.b +'|'+ vt+'|'  + o.it + "|" + o.ic + "|" + o.ik +"|");
o.ic=0; o.it=0; o.b=0;   o.ik=0;o.se=0;}},jsFormProc:function(e,t,a){var o=_Main; if((e.type=='text'&& t=='keyup') || (e.type=='password'&& t=='keyup')||e.type=='file' ){ o.ik=10; o.it=a; o.ic=e.value.length; o.se=1; }else if(e.type=='textarea' && t=='keyup'){ o.ik=30; o.it=a; o.ic=e.value.length; o.se=1; }else if(e.type=='select-one'||e.type=='select-multiple'){o.ik=20; o.it=a; o.ic=e.selectedIndex; o.se=1; }else if(e.type=='radio'||e.type=='checkbox'){ o.ik=10; o.it=a; o.ic=(e.checked!=true)?0:1; o.se=1;} if((String(e.name).length != 0)&& (t=='change'||t=='click') ){	o.ct=_f.ts();o.ctp='FORM';	_Main.jsSend('ceuid','/'+e.name +'/'+a,e.type);}}, jsLinkProc:function(e){ var o=_Main; var ok='';var m = document.all ? event.srcElement : e.target; var a=m;var ar='',tf=0,obj=m,tt=''; o.ct= _f.ts(); if(eval(_s.Lp)){try{if((_f.ul(a.tagName,0)=='IMG') && (typeof a.onclick == _s.f)){ tf=1; ar = String(a.onclick); }else if(eval(_s.Lp)){ obj=_f.pn(a); 
if(typeof obj.onclick==_s.f){ tf=1;ar = String(obj.onclick); }else if(typeof obj!=_s.n){ tf=0;ar = String(obj.href); };} if(ar.length!=0){ tt=(tf!=0)?"onclick":"href"; ar=_f.cr(ar,'c==10||c==32||c==34||c==39|c==35',''); if(_f.e(ar,'void(') == -1 && _f.e(ar,'void0') == -1){if(tf==1){ar=_f.jr(ar); if(ar==''){ok='';};	if(_f.e(ar,_s.j)==-1){ok=_s.j + ar;}else{ok=ar;}; }else{ok=ar;}; }else{ ok=_s.j + 'void('+_f.nm(ar)+')';};}; }catch(_e){ ok='';};if(ok.length != 0){o.ctp='LINK';	_Main.jsSend('ceuid',ok,tt);} }},jsUnload:function(e){ var si=''; if(!e){e=event;} if(e.type!="mouseout"){_t.Stop();}; si=_c.icp(_Main.mb.toObj(),"ar");_Main.mb.cls(); if(si!=""){ if(_f.isVer>=18){ var wn=window.setTimeout(function(){ _Main.jsSend('cruid',si);},1); _Main.ut=window.setTimeout(function(){if(_Main.ut!=0){ _Main.jsSend('cruid',si); }},1); }else{ _Main.jsSend('cruid',si);} _f.wt(10); }},jsFsize:function(){ var a=_Main.ev(); if(a.indexOf("&etc=&sm=&ta=") == -1){
var r=String(a).replace(/\&etc\=|\&sm\=|\&ta\=/gi, ""); if(r.length<=500){	return 150;	}else{ return 10;}	} return 150;},jsOnload:function(e){ var o=_Main; var fs=o.jsFsize(); if (!e) var e = window.event; o.ct= _f.ts(); o.mlx=(e.clientX>=0 && !isNaN(e.clientX))?(e.clientX):0; o.mly=(e.clientY>=0 && !isNaN(e.clientY))?(e.clientY):0; o.mvt=_f.ts(); o.jsRecord(fs,100);},jsInit:function(){if((String(_u.ref).indexOf('MRS=')!= -1) && (String(_u.ref).indexOf('.amz')!= -1)){document.onkeydown = function(){if( (event.ctrlKey == true && (event.keyCode == 78 || event.keyCode == 82))   || (event.keyCode == 116)) {event.keyCode = 0;  event.cancelBubble = true;   event.returnValue = false; }};_csCTL.run();}else{var cr=_f.cg('APID');var fcv=_f.cg('AFCV');if(fcv==undefined){var nFcv=_f.FCV(); _f.cs('AFCV',nFcv, 86400 * 30 * 12,'/'); _Main.FCV=nFcv; }else{ _Main.FCV=fcv;} if(cr==undefined){_Main.pi=1; _f.cs('APID','1',0,'/'); 
}else{ _Main.pi=parseInt(cr)+1;_f.cs('APID',_Main.pi,0,'/');} _Main.ts=_f.pt(); _Main.jsSend('csuid','',0); _f.ae('load',this.jsOnload,window);_f.ae('mousedown',this.jsLinkProc);}}, jsRecord:function(b,t){ if(b!=0&&b!='undefined'){_Main.mb.size=b;_Main.mb.events=_Main.jsBuff;} if(t!=0&&t!='undefined'){_t.i=t;_t.events=_Main.jsTimer;_t.Start();} _f.ae('mousemove',this.jsWmProc);_f.ae('mousedown',this.jsWmProc); _f.ae('scroll',this.jsWmProc,window);_f.ae('resize',this.jsWmProc,window); if(_f.isVer>=18){  _f.ae('mouseout',function(evt){ var mX = Math.round (evt.clientX); var mY = Math.round (evt.clientY); if(String(mY).indexOf("-") !=-1 || String(mX).indexOf("-") !=-1 || (mX >= _br.ww() ) || (mY >= _br.wh() )){ _Main.jsUnload(evt); } },window);} _f.ae('beforeunload',this.jsUnload,window); }, jsSend:function(es,si,sx){ var oj=_Main; var sall=_f.h+es+'='+_u.gc+'&pts='+oj.ts+'&pi='+oj.pi+'&rtd='+_t.ms ; var slog=''; switch(es){ case 'csuid':slog=sall+'&sv='+_u.sv+'&FCV='+  _Main.FCV +'&url='+escape(oj.pg.url)+'&ref='+escape(oj.pg.referrer)
+'&ad_key='+escape(oj.pg.ad)+_f.idv('mr_buy')+_f.idv('mr_acq')+_f.idv('mr_ag')+_f.idv('mr_gd')+_f.idv('mr_id')+'&dim='+_f.sn+'&ww='+_br.ww()+'&wh='+_br.wh()+'&sw='+_br.sw()+'&sh='+_br.sh(); break; case 'cruid': if(oj.ts!=oj.pt){ oj.pt=oj.ts; oj.rc=1; slog=sall+"&url="+escape(document.location.hostname +"/")+'&rcnt='+oj.rc+si+'&mlx='+oj.mlx+'&mly='+oj.mly+oj.ev(); oj.mb.size=150; }else{ oj.rc++; slog=sall+"&url="+escape(document.location.hostname +"/")+'&rcnt='+oj.rc+si;} break; case 'ceuid': slog=sall +'&url='+escape(oj.pg.url)+'&clink='+escape(_f.hr(si,'r')) +'&cname='+escape(sx)+'&ctype='+oj.ctp;	break; } var S= new Image(0,0); S.onload = function () { return true;}; S.src=slog +'&rnd='+Math.random(); if(typeof(Array.prototype.push)!='undefined'){ _MRSLog.push(S); } if(_Main.ut!=0){clearTimeout(_Main.ut);};}, jsBuff:function(s){ var si=_c.icp(s,"ar"); _Main.mb.cls(); _Main.jsSend('cruid',si,0);}};_Main.jsInit(); return {run:function(b,c){_Main.jsRecord(b,c);}
,ace_input:function(sts,tp,a){_Main.jsFormProc(sts,tp,a);},ace_click:function(a,b){_Main.ct=_f.ts();	if((_f.e(_f.ul(a,0),'.SWF') > -1) && (_f.e(a,'/')!=0) && (b!='')){_Main.ctp='FLASH';_Main.jsSend('ceuid',"/"+a+b,"embed") }; }}})();function AceClick_Flash(file,menu){if((typeof file!='number') && (file!='') && (typeof menu!='number') && (menu!='')){AceClick_ASP.ace_click(file,menu);}};