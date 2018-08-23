import React from "react";
import { connect } from "react-redux";
//Components
import HWImportStudents from "./HWImportStudents";
import { toggleShowImport } from "../../../../../actions/PageStates/hwCheckCourse";

const HWImportMain = props => {
	const toggleImport = type => () => {
		props.dispatch(toggleShowImport(type));
	};

	return (
		<React.Fragment>
			<HWImportStudents
				open={props.hwCheckCourse.imports.students}
				toggle={toggleImport}
				courseID={props.courseID}
			/>
		</React.Fragment>
	);
};

function mapStateToProps({ hwCheckCourse }) {
	return {
		hwCheckCourse
	};
}

export default connect(mapStateToProps)(HWImportMain);
