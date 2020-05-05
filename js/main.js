const $$ = mdui.JQ;

// Unit Function
function get_urlQuery(name) {
	let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	let r = window.location.search.substr(1).match(reg);
	if (r != null) {
		return unescape(r[2]);
	};
	return null;
}

function Query_OJList() {
	return new Promise( ( resovle, reject ) => {
		$$.ajax({
			method: 'GET',
			dataType: 'json',
			url: `${api_addr}/problem-set-list`,
			success(data) { resovle(data) },
			error() { reject( 'Error in quering OJList.' ) }
		});
	});
}

function Query_OJMetadata( OJ_Name ) {
	return new Promise( ( resovle, reject ) => {
		$$.ajax({
			method: 'GET',
			dataType: 'json',
			url: `${api_addr}/problem-set/${OJ_Name}/metadata`,
			success(data) { resovle(data) },
			error() { reject( 'Error in quering problem metadata.' ) }
		});
	});
}

function Query_ProblemList( OJ_Name, page ) {
	return new Promise( ( resovle, reject ) => {
		$$.ajax({
			method: 'GET',
			dataType: 'json',
			url: `${api_addr}/problem-list/${OJ_Name}/${page}`,
			success(data) { resovle(data) },
			error() { reject( 'Error in quering problem list.' ) }
		});
	});
}

function Query_Problem( OJ_Name, Problem_id ) {
	return new Promise( ( resovle, reject ) => {
		$$.ajax({
			method: 'GET',
			url: `${api_addr}/problem/${OJ_Name}/${Problem_id}`,
			dataType: 'json',
			success(data) { resovle(data) },
			error() { reject( 'Error in quering problem.' ) }
		});
	});
}

/**
 * 在 selector 末尾插入 OJ List
 * @param selector {String|JQ|Node|Function}
 */
async function Gen_OJList( selector ) {
	let OJ_List;
	try {
		OJ_List = await Query_OJList();
	} 
	catch(e) {
		mdui.snackbar( { message: e } ); 
		return ; 
	}

	OJ_List.forEach((OJ_Unit) => {
		const OJ_btn = `<a class=\"mdui-btn mdui-btn-block mdui-ripple problemset-link\" href=\"${work_addr}/problem-set/index.html?oj=${OJ_Unit.Id}\">${OJ_Unit.Name}</a>`;
		$$(selector).append( OJ_btn );
	});
}
