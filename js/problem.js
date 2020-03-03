const oj_id = get_urlQuery( 'oj' );
const problem_id = get_urlQuery( 'pid' );
function init_subtitle( selector ) {
	$$.ajax({
		method: 'GET',
		dataType: 'json',
		url: `${api_addr}/problem-set/${oj_id}/metadata`,
		success(data){
			const title_text = `${data.name} ${problem_id}`;
			$$(selector).text(title_text);
		}
	});
}
function insert_problem(container, problem) {
	let more_text = `Memory: ${problem.memory} MB Time: ${problem.time} ms`;
	if( problem.judge != '' )
		more_text = `Judge type: ${problem.judge} ${more_text}`;

	document.title = `${problem.title} - Oi Archive`;
	container.find( '#problem-name' ).text( problem.title );
	container.find( '#problem-content' ).html( problem.description );
	container.find( '#problem-details' ).text( more_text );
}
function process_example(container) {
	container.find('pre').each(( i, selector ) => {
		selector = $$(selector);
		let text = selector.text();
		// const guid = $$.guid(text);
		while( text.charAt( text.length - 1 ) === '\n' )
			text = text.substring( 0, text.length - 1 );
		selector.text(text)
		// $$(selector).after( `<div id="${guid}" class="mdui-typo"></div>` );
		// $$(`#${guid}`).append(selector);
	});
}
function process_table(container) {
	container.find('table').addClass('mdui-table');
	const td_selector = container.find('td');
	td_selector.css('border', '0');
	td_selector.css( 'border-bottom', '1px solid rgba(0,0,0,.12)' );
}
function request_problem(selector) {
	const body = $$(selector);
	const container = body.find( '#problem-content');
	$$.ajax({
		method: 'GET',
		url: `${api_addr}/problem/${oj_id}/${problem_id}`,
		dataType: 'json',
		success(data) {
			$$( '#ori_button' ).attr( 'href', data.url );
			$$( '#back' ).attr( 'href', `${work_addr}/problem-set?oj=${oj_id}` );
			insert_problem(body, data);
			process_example(container);
			process_table(container);
			$$( '#problem-content' ).mutation();
			MathJax.startup.defaultReady();
		}
	});
}
