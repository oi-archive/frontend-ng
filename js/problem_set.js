const OJ_Name = get_urlQuery( 'oj' );
let Page = get_urlQuery( 'page' );
if( Page == null )
	Page = 1;

function Turn_To( OJ_metadata, goal_page ) {
	if( goal_page > 0 && goal_page <= OJ_metadata.page )
		window.location.href=
			`${work_addr}/problem-set/?oj=${OJ_Name}&page=${goal_page}`;
	else {
		mdui.snackbar({ message: 'Invaild page' });
		mdui.prompt( 'Page', `Jump To (Max: ${OJ_metadata.page})`,
		(val) => { Turn_To( OJ_metadata, val ) }, () => {},
		{ confirmOnEnter: true } );
	}
}

async function Init_PageTurn( LastPage_Container, NextPage_Container, Turn_btn ) {
	let OJ_metadata;
	try {
		OJ_metadata = await Query_OJMetadata( OJ_Name );
	}
	catch(e) {
		mdui.snackbar( { message: e } ); 
		return ; 
	}

	if( OJ_metadata.page == Page )
		$$( NextPage_Container ).css( 'display', 'none' );
	if( Page == 1 )
		$$( LastPage_Container ).css( 'display', 'none' );
	Page = Page - 1 + 1;
	$$( NextPage_Container ).attr( 'href',
		`${work_addr}/problem-set/?oj=${OJ_Name}&page=${Page + 1}` );
	$$( LastPage_Container ).attr( 'href',
		`${work_addr}/problem-set/?oj=${OJ_Name}&page=${Page - 1}` );
	$$( Turn_btn ).on( 'click', function(e) {
		mdui.prompt( 'Page', `Jump To (Max: ${OJ_metadata.page} )`,
		(val) => { Turn_To( OJ_metadata, val) }, function(){},
		{ confirmOnEnter: true } );
	});
}

async function Gen_OJTitle( OJName_Container, ProblemNumber_Container, Page_Container ) {
	let OJ_metadata;
	try {
		OJ_metadata = await Query_OJMetadata( OJ_Name );
	}
	catch(e) {
		mdui.snackbar( { message: e } ); 
		return ; 
	}

	document.title = `${OJ_metadata.name} - Oi Archive`;
	$$(OJName_Container).text( OJ_metadata.name );
	$$(ProblemNumber_Container).text( OJ_metadata.problem );
	$$(Page_Container).text( `Page: ${Page}` );
}

async function Gen_ProblemList( OJ_Name, page, ProblemList_Container ) {
	let ProblemList_Data;
	try {
		ProblemList_Data = await Query_ProblemList( OJ_Name, page );
	}
	catch(e) {
		mdui.snackbar( { message: e } ); 
		return ; 
	}

	let  = $$( '#problem-list-body' );
	ProblemList_Data.forEach( function( problem_unit ) {
		let ProblemUnit_html =
			`<tr> \
					<td> ${problem_unit.pid} </td> \
					<td> \
						<a href="${work_addr}/problem?oj=${OJ_Name}&pid=${problem_unit.pid}"> \
							${problem_unit.title} \
						</a> \
					</td> \
				</tr>`;
		$$(ProblemList_Container).append( ProblemUnit_html )
	});
	$$(ProblemList_Container).mutation();
}
