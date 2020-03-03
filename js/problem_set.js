const oj_id = get_urlQuery( 'oj' );
let page = get_urlQuery( 'page' );
if( page == null )
	page = 1;
function jump_to( oj_metadata, global_page ) {
	if( global_page > 0 && global_page <= oj_metadata.page )
		window.location.href=
			`${work_addr}/problem-set/?oj=${oj_id}&page=${global_page}`;
	else {
		mdui.snackbar({ message: 'Invaild page' });
		mdui.prompt( 'Page', `Jump To (Max: ${oj_metadata.page})`,
		function(val){ jump_to( oj_metadata, val) }, function(){},
		{ confirmOnEnter: true } );
	}
}
function process_pages( oj_metadata ) {
	if( oj_metadata.page == page )
		$$( '.next-page' ).css( 'display', 'none' );
	if( page == 1 )
		$$( '.last-page' ).css( 'display', 'none' );
	page = page - 1 + 1;
	$$( '.next-page' ).attr( 'href',
		`${work_addr}/problem-set/?oj=${oj_id}&page=${page + 1 }` );
	$$( '.last-page' ).attr( 'href',
		`${work_addr}/problem-set/?oj=${oj_id}&page=${page + 1 }` );
	$$( '.jump-page' ).on( 'click', function(e) {
		mdui.prompt( 'Page', `Jump To (Max: ${oj_metadata.page} )`,
		function(val){ jump_to( oj_metadata, val) }, function(){},
		{ confirmOnEnter: true } );
	});
}
function process_title(data) {
	$$( '#header-sub' ).text( data.name );
	$$( '#number-show' ).text( data.problem );
	document.title = `${data.name} - Oi Archive`;
	$$( '#show-page').text( `Page: ${page}` );
}
function gen_list( oj_metadata ) {
	$$.ajax({
		method: 'GET',
		dataType: 'json',
		url: api_addr + '/problem-list/' + oj_id + '/' + page,
		success(data) {
			let problem_list = $$( '#problem-list-body' );
			data.forEach( function( item ) {
				let tr_html =
				`<tr> \
					<td> ${item.pid} </td> \
					<td> \
						<a href="${work_addr}/problem?oj=${oj_id}&pid=${item.pid}"> \
							${item.title} \
						</a> \
					</td> \
				</tr>`;
				problem_list.append( tr_html )
			});
			problem_list.mutation();
		},
		error() {
			mdui.snackbar({ message: 'Error' });
		}
	});
}
function problem_set_init() {
	$$.ajax({
		method: 'GET',
		dataType: 'json',
		url: `${api_addr}/problem-set/${oj_id}/metadata`,
		success(data) {
			process_title(data);
			process_pages(data);
			gen_list( data );
		},
		error() {
			mdui.snackbar({ message: 'Error' });
		}
	});
}
