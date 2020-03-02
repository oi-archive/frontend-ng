var $$ = mdui.JQ;
var api_addr = "https://m1.oi-archive.org:8002";
var work_addr = "/";

// Unit Function
function get_urlQuery(name) {
	let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	let r = window.location.search.substr(1).match(reg);
	if (r != null) {
		return unescape(r[2]);
	};
	return null;
}

function gen_oj_list( id ) {
	$$.ajax({
		method: 'GET',
		dataType: 'json',
		url: api_addr + '/problem-set-list',
		success: function(data) {
			data.forEach( function( item ) {
				console.log(item);
				$$(id).append(
					"<a class=\"mdui-btn mdui-btn-block " +
					"mdui-ripple problemset-link\" " +
					"href=\"" + work_addr + "/problem-set/?oj=" +
					item.Id + "\">" + item.Name + "</a>" );
			});
		}
	});
}
