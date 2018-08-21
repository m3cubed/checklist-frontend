import React, { Component } from "react";
import { connect } from "react-redux";
import { filterCourses } from "../../api";

//Redux
import { handleAddCourse } from "../../actions/courses";
import ReactModal from "react-modal";

ReactModal.setAppElement("#root");

class CourseCreator extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showModal: false,
			addCourseDetails: {
				courseTitle: "",
				courseCode: ""
			}
		};
		this.handleModal.bind(this);
		this.handleInput.bind(this);
	}

	handleModal = () => {
		this.setState({
			showModal: !this.state.showModal
		});
	};

	handleInput = e => {
		this.setState({
			...this.state,
			addCourseDetails: {
				...this.state.addCourseDetails,
				[e.target.name]: e.target.value
			}
		});
	};

	render() {
		const { dispatch } = this.props;
		return (
			<div>
				<hr />
				<ReactModal
					isOpen={this.state.showModal}
					onRequestClose={this.handleModal}
					style={{
						content: { width: "20%", height: "20%", margin: "0px auto" }
					}}
				>
					<form>
						<input type="text" name="courseTitle" onChange={this.handleInput} />
						Class Title
						<input type="text" name="courseCode" onChange={this.handleInput} />
						Class Code (optional)
						<div
							className="course-add-modal-save&submit-btn"
							style={{ marginTop: 10 }}
						>
							<button
								type="submit"
								onClick={e => {
									e.preventDefault();

									const newCourse = {
										...this.state.addCourseDetails,
										creatorID: this.props.authUser.id,
										creator: `${this.props.authUser.userLastName}, ${
											this.props.authUser.userFirstName
										}`
									};

									dispatch(handleAddCourse(newCourse));
									this.handleModal();
								}}
							>
								Save and Submit
							</button>
							<button onClick={this.handleModal}>Cancel</button>
						</div>
					</form>
				</ReactModal>
				<button onClick={this.handleModal}>Add a class </button>
			</div>
		);
	}
}

function mapStateToProps({ courses, authUser }) {
	if (authUser.courseIDs) {
		const userCourses = filterCourses(courses, authUser.courseIDs);

		return {
			authUser,
			templateCodes: Object.keys(userCourses).map(
				course => userCourses[course].courseCode
			)
		};
	}
	return { authUser };
}

export default connect(mapStateToProps)(CourseCreator);
