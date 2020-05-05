const OJ_Name = get_urlQuery( 'oj' );
const Problem_id = get_urlQuery( 'pid' );

async function Gen_Subtitle( Subtitle_Container ) {
	let OJ_Metadata;
	try {
		OJ_Metadata = await Query_OJMetadata( OJ_Name );
	}
	catch(e) {
		mdui.snackbar( { message: e } );
		return ;
	}

	const Subtitle_html = `${OJ_Metadata.name} | ${Problem_id}`;
	$$(Subtitle_Container).text(Subtitle_html);
}

function Gen_ProblemContent( ProblemContent_Container, Problem_Data) {
	document.title = `${Problem_Data.title} - Oi Archive`;

	let more_text = `Memory: ${Problem_Data.memory} MB Time: ${Problem_Data.time} ms`;
	if( Problem_Data.judge != '' )
		more_text = `Judge type: ${Problem_Data.judge} ${more_text}`;
	$$( ProblemContent_Container ).find( '#problem-name' ).text( Problem_Data.title );
	$$( ProblemContent_Container ).find( '#problem-content' ).html( Problem_Data.description );
	$$( ProblemContent_Container ).find( '#problem-details' ).text( more_text );
}

function Init_Example( ProblemContent_Container ) {
	ProblemContent_Container.find('pre').each( ( i, Exmaple_Container ) => {
		let Example_text = $$(Exmaple_Container).text();
		while( Example_text.charAt( Example_text.length - 1 ) === '\n' )
			Example_text = Example_text.substring( 0, Example_text.length - 1 );

		$$(Exmaple_Container).text( Example_text );
	});
}

function Init_Table( ProblemContent_Container ) {
	$$(ProblemContent_Container).find('table').addClass('mdui-table');
	const Table_Container = $$(ProblemContent_Container).find('td');
	Table_Container.css('border', '0');
	Table_Container.css( 'border-bottom', '1px solid rgba(0,0,0,.12)' );
}

function Init_btn( Problem_Data ) {
	$$( '#ori_button' ).attr( 'href', Problem_Data.url );
	$$( '#back' ).attr( 'href', `${work_addr}/problem-set/index.html?oj=${OJ_Name}` );
}

async function Gen_Problem( ProblemCard ) {
	const Container = $$(ProblemCard);
	const ProblemContent_Container = Container.find( '#problem-content');
	let Problem_Data;
	try {
		Problem_Data = await Query_Problem( OJ_Name, Problem_id );
	}
	catch(e) {
		mdui.snackbar( { message: e } ); 
		return ;
	}

	Gen_ProblemContent( Container, Problem_Data );
	Init_btn( Problem_Data );
	Init_Table( Container );
	Init_Example( Container );
}
