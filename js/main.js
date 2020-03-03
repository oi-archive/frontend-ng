const $$ = mdui.JQ;
const api_addr = "https://m1.oi-archive.org:8002";
const work_addr = "/";

// Unit Function
function get_urlQuery(name) {
	let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	let r = window.location.search.substr(1).match(reg);
	if (r != null) {
		return unescape(r[2]);
	};
	return null;
}

/**
 * 在 selector 末尾插入 OJ List
 * @param selector {String|JQ|Node|Function}
 */
function insert_oj_list( selector ) {
	$$.ajax({
		method: 'GET',
		dataType: 'json',
		url: `${api_addr}/problem-set-list`,
		success(data){
			data.forEach((item) => {
				const oj_btn = `<a class=\"mdui-btn mdui-btn-block mdui-ripple problemset-link\" href=\"${work_addr}/problem-set/?oj=${item.Id}\">${item.Name}</a>`;
				$$(selector).append(oj_btn);
			});
		}
	});
}
