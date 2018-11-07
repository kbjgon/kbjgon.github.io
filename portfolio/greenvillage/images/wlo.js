/**
 *  Nethru Script Module
 *  Copyright 2008 nethru, All Rights Reserved.
 **/
          
var _n_sid = "07010100000";		/* custid */
var _n_ls = "http://weblog.choroki.com/wlo/Logging";		/* logging server */
var _n_uls = "http://weblog.choroki.com/wlo/UserLogging";	/* user logging server */
var _n_uid = "";			/* uid */
var _n_first_pcid = false;

/* https logging */
if ( document.location.protocol == "https:" ) {
	_n_ls = "https://weblog.choroki.com/wlo/Logging";
	_n_uls = "https://weblog.choroki.com/wlo/UserLogging";
}

/* Browser Information */
function n_getBI()
{
	var str = "";
	var dt = document;

	var strScreenSize = "";

	var ws = window.screen;
	if ( ws != null && ws != "undefined" ) {
		strScreenSize = screen.width+"x"+screen.height;
	}
	str +="n_ss=" + strScreenSize + "; ";

	var cs = "-";
	var nv = navigator;

	if ( nv.language ) {  
		cs = nv.language.toLowerCase();
	} 
	else if ( nv.userLanguage ) {
		cs = nv.userLanguage.toLowerCase();
	}
	/*
	if ( dt.characterSet ) {
		cs = dt.characterSet;
	}
	else if ( dt.charset ) {
		cs = dt.charset;
	}
	*/
	str +="n_cs=" + cs + "; ";

	return str;
}

function n_getCV(offset,escapeFlag)
{
	var dc = document.cookie;
	var endstr = dc.indexOf (";", offset);
	
	if (endstr == -1) endstr = dc.length;

	if ( escapeFlag )
		return unescape(dc.substring(offset, endstr));
	else
		return dc.substring(offset, endstr);
}

function n_GetCookie(name,escapeFlag)
{
	var dc = document.cookie;
	var arg = name + "=";
	var alen = arg.length;
	var clen = dc.length;
	var i = 0;

	while (i < clen) 
	{
		var j = i + alen;
		
		if (dc.substring(i, j) == arg) {
			return n_getCV (j,escapeFlag);
		}

		i = dc.indexOf(" ", i) + 1;
		
		if (i == 0)
			break;
	}

	return null;
}

function n_SetCookie(name, value)
{
	var argv = n_SetCookie.arguments;
	var argc = n_SetCookie.arguments.length;
	var expires = (2 < argc) ? argv[2] : null;
	var path = (3 < argc) ? argv[3] : null;
	var domain = (4 < argc) ? argv[4] : null;
	var secure = (5 < argc) ? argv[5] : false;

	document.cookie = 
		name + "=" + escape (value)
		+ ((expires == null) ? "" : ("; expires="+expires.toGMTString()))
		+ ((path == null) ? "" : ("; path=" + path))
		+ ((domain == null) ? "" : ("; domain=" + domain))
		+ ((secure == true) ? "; secure" : "");
}

function n_GuessPersistentCookie()
{
	if ( document.cookie == null || document.cookie == "" )
		return true;
	
	return false;
}

function n_makePersistentCookie(name,length,path,domain)
{
	var today = new Date();
	var expiredDate = new Date(2020,1,1);
	var cookie;
	var value;

/*
	if ( n_GuessPersistentCookie() )
		return 1;
*/

	cookie = n_GetCookie(name,true);
	
	if ( cookie ) {
		_n_first_pcid = false;
		return cookie;
	}
	_n_first_pcid = true;

	var values = new Array();

	for ( i=0; i < length ; i++ ) {
		values[i] = "" + Math.random();
	}

	value = today.getTime();

	for ( i=0; i < length ; i++ ) {
		value += values[i].charAt(2);
	}

	n_SetCookie(name,value,expiredDate,path,domain);

	return value;
}

function n_encodeStr(s)
{
	if (typeof(encodeURI) == 'function')
		return encodeURI(s);
	else
		return escape(s);
}

function n_paramEncodeStr(s)
{
	s=s.split("&").join("|");
	s=s.split("?").join(" ");
	s=s.split("/").join("|");

	return n_encodeStr(s);
}

function n_getDomain()
{
	var _host   = document.domain;
	var so = _host.split('.');
	var dm  = so[so.length-2] + '.' + so[so.length-1];

	return (so[so.length-1].length == 2) ? so[so.length-3] + '.' + dm : dm;
}

function n_getCookieStr() 
{
	var pcid = "";
	var binfo = n_getBI();
	var domain = "";

	if ( (typeof _n_domain)!="undefined" && _n_domain != "" ) {
		domain = _n_domain;
	}
	else {
		domain = n_getDomain();
	}

	pcid = n_makePersistentCookie("PCID",10,"/",domain);

	if ( pcid != null && pcid != "" ) {
		var cookies = "";

		if ( _n_first_pcid == false )
			cookies += "PCID" + "=" + pcid + "; ";

		if ( (typeof _n_uid_cookie)!="undefined" && _n_uid_cookie != "" ) {
			_n_uid = n_GetCookie(_n_uid_cookie,true);	
			if ( _n_uid != null && _n_uid != "" ) {
				cookies += _n_uid_cookie + "=" + _n_uid + "; ";
			}
		}

		return cookies + binfo;
	}
	else {
		return document.cookie + binfo;
	}
}

function n_userattr_logging()
{
	var uid_attr1 = "";
	var uid_attr2 = "";
	var uid_attr3 = "";
	var uid_attr4 = "";
	var uid_attr5 = "";
	var uid_attr6 = "";
	var uid_attr7 = "";
	var	uid_url = "";

	if ( _n_uid == null || _n_uid == "" )
		return;

	if ( (typeof _n_uid_attr1)!="undefined" && _n_uid_attr1 != "" ) uid_attr1 = _n_uid_attr1;
	if ( (typeof _n_uid_attr2)!="undefined" && _n_uid_attr2 != "" ) uid_attr2 = _n_uid_attr2;
	if ( (typeof _n_uid_attr3)!="undefined" && _n_uid_attr3 != "" ) uid_attr3 = _n_uid_attr3;
	if ( (typeof _n_uid_attr4)!="undefined" && _n_uid_attr4 != "" ) uid_attr4 = _n_uid_attr4;
	if ( (typeof _n_uid_attr5)!="undefined" && _n_uid_attr5 != "" ) uid_attr5 = _n_uid_attr5;
	if ( (typeof _n_uid_attr6)!="undefined" && _n_uid_attr6 != "" ) uid_attr6 = _n_uid_attr6;
	if ( (typeof _n_uid_attr7)!="undefined" && _n_uid_attr7 != "" ) uid_attr7 = _n_uid_attr7;
	if ( uid_attr1!="" || uid_attr2!="" || uid_attr3!="" || uid_attr4!="" || uid_attr5!="" || uid_attr6!="" || uid_attr7!="" ) {
		uid_url = _n_uls +
					"?ver=1.0.0" +
					"|sid=" + n_encodeStr(_n_sid) +
					"|u=" + n_encodeStr(_n_uid) +
					"|a1=" + n_encodeStr(uid_attr1) +
					"|a2=" + n_encodeStr(uid_attr2) +
					"|a3=" + n_encodeStr(uid_attr3) +
					"|a4=" + n_encodeStr(uid_attr4) +
					"|a5=" + n_encodeStr(uid_attr5) +
					"|a6=" + n_encodeStr(uid_attr6) +
					"|a7=" + n_encodeStr(uid_attr7) +
					"|dv=" + Math.random();

		var _n_image = new Image();
		_n_image.src = uid_url;
	}
}

function n_Logging_M() {

	if ( (typeof _n_m1)!="undefined" && _n_m1 ) return true;
	if ( (typeof _n_m2)!="undefined" && _n_m2 ) return true;
	if ( (typeof _n_m3)!="undefined" && _n_m3 ) return true;
	if ( (typeof _n_m4)!="undefined" && _n_m4 ) return true;
	if ( (typeof _n_m5)!="undefined" && _n_m5 ) return true;
	if ( (typeof _n_m6)!="undefined" && _n_m6 ) return true;
	if ( (typeof _n_m7)!="undefined" && _n_m7 ) return true;

	return false;
}

function n_Logging_P() {

	if ( (typeof _n_p1)!="undefined" && _n_p1 ) return true;
	if ( (typeof _n_p2)!="undefined" && _n_p2 ) return true;
	if ( (typeof _n_p3)!="undefined" && _n_p3 ) return true;
	if ( (typeof _n_p4)!="undefined" && _n_p4 ) return true;
	if ( (typeof _n_p5)!="undefined" && _n_p5 ) return true;
	if ( (typeof _n_p6)!="undefined" && _n_p6 ) return true;
	if ( (typeof _n_p7)!="undefined" && _n_p7 ) return true;

	return false;
}

function n_click_logging(url)
{
	if ( _n_sid == "07010100000" )
		return;

	var argc = n_click_logging.arguments.length;
	var argv = n_click_logging.arguments;
	
	var _n_request = url;
	var _n_referrer = (1 < argc) ? argv[1] : document.referrer;
	var c1 = (2 < argc) ? argv[2] : null;
	var _n_cookie = n_getCookieStr();
	var _n_agent = navigator.userAgent;
	
	var _n_target_url = _n_ls +
						"?ver=1.0.0" +
						"|sid=" + n_encodeStr(_n_sid) +
						"|r=" + n_encodeStr(_n_request) +
						"|rf=" + n_encodeStr(_n_referrer) +
						"|c=" + n_encodeStr(_n_cookie) +
						"|a=" + n_encodeStr(_n_agent) +
						"|dv=" + Math.random();

	if ( c1 != null ) {
		_n_target_url += "|_n_p1=" + c1;
	}

	var _n_image = new Image();
	_n_image.src = _n_target_url;
}

function n_logging() {

	if ( _n_sid == "07010100000" )
		return;
	
	var _n_request = document.location.href;
	var _n_referrer = document.referrer;
	var _n_cookie = n_getCookieStr();
	var _n_agent = navigator.userAgent;
	var _n_title = document.title.toString();
	
	var _n_target_url = _n_ls +
						"?ver=1.0.0" +
						"|sid=" + n_encodeStr(_n_sid) +
						"|r=" + n_encodeStr(_n_request) +
						"|rf=" + n_encodeStr(_n_referrer) +
						"|c=" + n_encodeStr(_n_cookie) +
						"|a=" + n_encodeStr(_n_agent) +
						"|dv=" + Math.random();

	if ( (typeof _n_show_title)!="undefined" && _n_show_title )
		_n_target_url += "|t=" + n_paramEncodeStr(_n_title);

	if ( n_Logging_M() ) {
		var nm1 = ""; var nm2 = ""; var nm3 = ""; var nm4 = ""; var nm5 = ""; var nm6 = ""; var nm7 = "";

		if ( (typeof _n_m1)!="undefined" && _n_m1 ) nm1 = n_paramEncodeStr(_n_m1);
		if ( (typeof _n_m2)!="undefined" && _n_m2 ) nm2 = n_paramEncodeStr(_n_m2);
		if ( (typeof _n_m3)!="undefined" && _n_m3 ) nm3 = n_paramEncodeStr(_n_m3);
		if ( (typeof _n_m4)!="undefined" && _n_m4 ) nm4 = n_paramEncodeStr(_n_m4);
		if ( (typeof _n_m5)!="undefined" && _n_m5 ) nm5 = n_paramEncodeStr(_n_m5);
		if ( (typeof _n_m6)!="undefined" && _n_m6 ) nm6 = n_paramEncodeStr(_n_m6);
		if ( (typeof _n_m7)!="undefined" && _n_m7 ) nm7 = n_paramEncodeStr(_n_m7);

		_n_target_url += "|_n_m1=" + nm1;
		_n_target_url += "|_n_m2=" + nm2;
		_n_target_url += "|_n_m3=" + nm3;
		_n_target_url += "|_n_m4=" + nm4;
		_n_target_url += "|_n_m5=" + nm5;
		_n_target_url += "|_n_m6=" + nm6;
		_n_target_url += "|_n_m7=" + nm7;
	}

	if ( n_Logging_P() ) {
		var np1 = ""; var np2 = ""; var np3 = ""; var np4 = ""; var np5 = ""; var np6 = ""; var np7 = ""; 

		if ( (typeof _n_p1)!="undefined" && _n_p1 ) np1 = n_paramEncodeStr(_n_p1);
		if ( (typeof _n_p2)!="undefined" && _n_p2 ) np2 = n_paramEncodeStr(_n_p2);
		if ( (typeof _n_p3)!="undefined" && _n_p3 ) np3 = n_paramEncodeStr(_n_p3);
		if ( (typeof _n_p4)!="undefined" && _n_p4 ) np4 = n_paramEncodeStr(_n_p4);
		if ( (typeof _n_p5)!="undefined" && _n_p5 ) np5 = n_paramEncodeStr(_n_p5);
		if ( (typeof _n_p6)!="undefined" && _n_p6 ) np6 = n_paramEncodeStr(_n_p6);
		if ( (typeof _n_p7)!="undefined" && _n_p7 ) np7 = n_paramEncodeStr(_n_p7);

		 _n_target_url += "|_n_p1=" + np1;
		 _n_target_url += "|_n_p2=" + np2;
		 _n_target_url += "|_n_p3=" + np3;
		 _n_target_url += "|_n_p4=" + np4;
		 _n_target_url += "|_n_p5=" + np5;
		 _n_target_url += "|_n_p6=" + np6;
		 _n_target_url += "|_n_p7=" + np7;
	}

	var info_cookie = "";
	if ( (typeof _n_info1_cookie)!="undefined" && _n_info1_cookie != "" ) {
		info_cookie = n_GetCookie(_n_info1_cookie,false);	
		if ( info_cookie != null && info_cookie != "" ) {
			_n_target_url += "|" + _n_info1_cookie + "=" + n_encodeStr(info_cookie);
		}
	}
	if ( (typeof _n_info2_cookie)!="undefined" && _n_info2_cookie != "" ) {
		info_cookie = n_GetCookie(_n_info2_cookie,false);	
		if ( info_cookie != null && info_cookie != "" ) {
			_n_target_url += "|" + _n_info2_cookie + "=" + n_encodeStr(info_cookie);
		}
	}
	if ( (typeof _n_info3_cookie)!="undefined" && _n_info3_cookie != "" ) {
		info_cookie = n_GetCookie(_n_info3_cookie,false);	
		if ( info_cookie != null && info_cookie != "" ) {
			_n_target_url += "|" + _n_info3_cookie + "=" + n_encodeStr(info_cookie);
		}
	}
	if ( (typeof _n_info4_cookie)!="undefined" && _n_info4_cookie != "" ) {
		info_cookie = n_GetCookie(_n_info4_cookie,false);	
		if ( info_cookie != null && info_cookie != "" ) {
			_n_target_url += "|" + _n_info4_cookie + "=" + n_encodeStr(info_cookie);
		}
	}
	if ( (typeof _n_info5_cookie)!="undefined" && _n_info5_cookie != "" ) {
		info_cookie = n_GetCookie(_n_info5_cookie,false);	
		if ( info_cookie != null && info_cookie != "" ) {
			_n_target_url += "|" + _n_info5_cookie + "=" + n_encodeStr(info_cookie);
		}
	}
	if ( (typeof _n_info6_cookie)!="undefined" && _n_info6_cookie != "" ) {
		info_cookie = n_GetCookie(_n_info6_cookie,false);	
		if ( info_cookie != null && info_cookie != "" ) {
			_n_target_url += "|" + _n_info6_cookie + "=" + n_encodeStr(info_cookie);
		}
	}
	if ( (typeof _n_info7_cookie)!="undefined" && _n_info7_cookie != "" ) {
		info_cookie = n_GetCookie(_n_info7_cookie,false);	
		if ( info_cookie != null && info_cookie != "" ) {
			_n_target_url += "|" + _n_info7_cookie + "=" + n_encodeStr(info_cookie);
		}
	}

	var _n_image = new Image();
	_n_image.src = _n_target_url;

	n_userattr_logging();
}
