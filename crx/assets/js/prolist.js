var data = {
	"options": {
		"cols": "2"
	},
	"content": [{
		"title": "理财专区",
		'list': [{
			'pt': '天地典当-重庆垫江房产',
			'jd': '70',
			'ze': 40,
			'lv': 15.5,
			'type': '每月付息，到期还本',
			'pid': 't001',
			'ly': 30
		}, {
			'pt': '天地典当-重庆垫江房产',
			'jd': '70',
			'ze': 40,
			'lv': 15.5,
			'type': '每月付息，到期还本',
			'pid': 't001',
			'ly': 30
		}, {
			'pt': '天地典当-重庆垫江房产',
			'jd': '70',
			'ze': 40,
			'lv': 15.5,
			'type': '每月付息，到期还本',
			'pid': 't001',
			'ly': 30
		}, {
			'pt': '天地典当-重庆垫江房产',
			'jd': '70',
			'ze': 40,
			'lv': 15.5,
			'type': '每月付息，到期还本',
			'pid': 't001',
			'ly': 30
		}, {
			'pt': '天地典当-重庆垫江房产',
			'jd': '70',
			'ze': 40,
			'lv': 15.5,
			'type': '每月付息，到期还本',
			'pid': 't001',
			'ly': 30
		}]
	}, {
		"title": "投资专区",
		'list': [{
			'pt': '天地典当-重庆垫江房产',
			'jd': '70',
			'ze': 40,
			'lv': 15.5,
			'type': '每月付息，到期还本',
			'pid': 't001',
			'ly': 30
		}, {
			'pt': '天地典当-重庆垫江房产',
			'jd': '70',
			'ze': 40,
			'lv': 15.5,
			'type': '每月付息，到期还本',
			'pid': 't001',
			'ly': 30
		}, {
			'pt': '天地典当-重庆垫江房产',
			'jd': '70',
			'ze': 40,
			'lv': 15.5,
			'type': '每月付息，到期还本',
			'pid': 't001',
			'ly': 30
		}, {
			'pt': '天地典当-重庆垫江房产',
			'jd': '70',
			'ze': 40,
			'lv': 15.5,
			'type': '每月付息，到期还本',
			'pid': 't001',
			'ly': 30
		}, {
			'pt': '天地典当-重庆垫江房产',
			'jd': '70',
			'ze': 40,
			'lv': 15.5,
			'type': '每月付息，到期还本',
			'pid': 't001',
			'ly': 30
		}]
	}],
	"theme": "d2"
}

function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}

function setHash(t) {
	window.location.hash = t;
};

function getHash() {
	return window.location.hash.replace("#", "")
}

function SetData(act, callback) {
	if (act == 2) {
		data.content[1].active = "1";
	} else {
		data.content[0].active = "1";
	}
	var tmpl = $('#pro-template');
	var source = tmpl.text();
	var template = Handlebars.compile(source);
	var html = template(data);
	tmpl.before(html);
	if (typeof(callback)==='function') {
		callback();
	}
}
$(function() {
	var act = getQueryString('type');
	SetData(act, function() {
		var IScroll = $.AMUI.iScroll;
		var myScroll = new IScroll('.grid',{
			click:true
		});
	})
});