import React from "react";
import { connect } from "react-redux";
//Components
import HWImportStudents from "./HWImportStudents";
import { toggleShowImport } from "../../../../../actions/PageStates/page_hwCheckCourse";

const HWImportMain = props => {
	const toggleImport = type => () => {
		props.dispatch(toggleShowImport(type));
	};

	return (
		<React.Fragment>
			<HWImportStudents
				open={props.page_hwCheckCourse.imports.students}
				toggle={toggleImport}
				courseID={props.courseID}
			/>
		</React.Fragment>
	);
};

function mapStateToProps({ page_hwCheckCourse }) {
	return {
		page_hwCheckCourse,
	};
}

export default connect(mapStateToProps)(HWImportMain);
