import React, { Component } from "react";
import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import update from "immutability-helper";
import "react-virtualized/styles.css"; // only needs to be imported once
import scrollbarSize from "dom-helpers/util/scrollbarSize";
import debounce from "lodash/debounce";
//Accessories
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { Grid as VGrid, ScrollSync, AutoSizer } from "react-virtualized";
//Icons
import AddIcon from "@material-ui/icons/Add";
//Components
import ListFirstLastNames from "./ListFirstLastNames";
import ListHWMenu from "../Menus/ListHWMenu";
import ListStatusMenu from "../Menus/ListStatusMenu";
import {
	updateStudentStatus,
	handleUpdateColumn,
	saveAllStatus,
} from "../../../../../actions/HomeworkCheck/studentHWStatus";
import ListStudentMenu from "../Menus/ListStudentMenu";
import { handleUpdateHWStudent } from "../../../../../actions/HomeworkCheck/hwStudents";

const styles = theme => ({
	root: {
		flexGrow: 1,
		width: "100%",
		height: "100%",
	},
	studentColContainer: {
		overflow: "hidden hidden !important",
	},
	hwHeaderContainer: {
		overflow: "hidden hidden !important",
	},
	topRow: {
		flexGrow: 1,
		border: "1px solid #e0e0e0",
		borderRight: "none",
		borderLeft: "none",
	},
	studentColLeft: {
		flexGrow: 1,
		border: "1px solid #e0e0e0",
		borderRight: "none",
		borderLeft: "none",
		borderTop: "none",
	},
	studentCol: {
		flexGrow: 1,
		border: "1px solid #e0e0e0",
		borderLeft: "none",
		borderTop: "none",
	},
	studentBody: {
		flexGrow: 1,
		border: "1px solid #e0e0e0",
		borderRight: "none",
		borderLeft: "none",
		borderTop: "none",
	},
	containerPaper: {
		flexGrow: 1,
		position: "relative",
	},
	statusContainer: {
		height: 30,
		border: "1px solid transparent",
		borderRadius: 5,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	editInput: {
		textAlign: "center",
	},
});

function _createState(props) {
	const { homeworks, hwStudents } = props;
	const hwKeys = Object.keys(homeworks);
	const hwTitles = hwKeys.reduce((acc, cv) => {
		acc.push([
			homeworks[cv].homeworkTitle,
			homeworks[cv].submitDate,
			homeworks[cv].id,
		]);
		return acc;
	}, []);

	const state = {
		homeworks: [hwTitles],
		students: [],
	};

	state.homeworksColLength = Object.keys(state.homeworks[0]).length;

	Object.keys(hwStudents).map(cv => {
		state.students.push([
			hwStudents[cv].firstName,
			hwStudents[cv].lastName,
			hwStudents[cv].id,
		]);
	});

	state.students.sort((a, b) => {
		let A = a[1].toUpperCase();
		let B = b[1].toUpperCase();

		if (A < B) {
			return -1;
		}
		if (A > B) {
			return 1;
		}

		// names must be equal
		return 0;
	});

	state.studentsRowLength = Object.keys(state.students).length;

	return state;
}

function _dateConvertor(date) {
	const month = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	date = date.split("-");
	date.shift();
	date[0] = month[Number(date[0]) - 1];
	date[1] = Number(date[1]);
	return date.join(" ");
}

const debounceStatus = debounce((courseID, dispatch) =>
	dispatch(saveAllStatus(courseID), 1500),
);

class HWCourseStudentsList extends Component {
	static getDerivedStateFromProps(nextProps, state) {
		if (nextProps) {
			return {
				..._createState(nextProps),
			};
		} else {
			return { ...state };
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (
			prevProps.studentHWStatus !== this.props.studentHWStatus &&
			this._setStudentBodyRef
		) {
			debounceStatus(this.props.courseID, this.props.dispatch);
			this._setStudentBodyRef.current.recomputeGridSize();
		}
		if (
			prevProps.homeworks !== this.props.homeworks &&
			this._setHWHeaderRef.current
		) {
			this._setHWHeaderRef.current.recomputeGridSize();
			this._setStudentBodyRef.current.recomputeGridSize();
		}
		if (prevProps.unitID !== this.props.unitID && this._setStudentBodyRef) {
			this._setStudentBodyRef.current.recomputeGridSize();
		}
		if (
			prevProps.hwStudents !== this.props.hwStudents &&
			this._setStudentBodyRef
		) {
			this._setStudentColRef.current.recomputeGridSize();
			this._setStudentBodyRef.current.recomputeGridSize();
		}
		if (prevState.studentEdit !== this.state.studentEdit) {
			this._setStudentColRef.current.recomputeGridSize();
		}
	}

	componentWillUnmount() {
		this.props.dispatch(saveAllStatus(this.props.courseID));
	}

	constructor(props) {
		super(props);
		this.state = {
			..._createState(this.props),
			openHWMenu: false,
			openStatusMenu: false,
			openStudentMenu: false,
			anchorEl: null,
			statusAnchorEl: null,
			studentAnchorEl: null,
			target: null,
			targetHW: null,
			targetStudent: null,
			bodyColWidth: 140,
			bodyRowHeight: 50,
			studentEdit: null,
			hwEdit: null,
			tempEdit: "",
		};

		this._setStudentBodyRef = React.createRef();
		this._setHWHeaderRef = React.createRef();
		this._setStudentColRef = React.createRef();

		this.toggleHWMenu = this.toggleHWMenu.bind(this);
		this.toggleStatusMenu = this.toggleStatusMenu.bind(this);
		this.changeStudentStatus = this.changeStudentStatus.bind(this);
		this.changeStudentCol = this.changeStudentCol.bind(this);

		this._renderHWHeaderCell = this._renderHWHeaderCell.bind(this);
		this._renderStudentColumnCell = this._renderStudentColumnCell.bind(this);
		this._renderStudentBodyCell = this._renderStudentBodyCell.bind(this);

		this.handleMouseDownPress = this.handleMouseDownPress.bind(this);
		this.toggleStudentCellClick = this.toggleStudentCellClick.bind(this);
	}

	_renderHWHeaderCell({ columnIndex, key, rowIndex, style }) {
		if (this.state.homeworksColLength === columnIndex) {
			return (
				<Grid
					container
					key={key}
					style={style}
					className={this.props.classes.topRow}
					justify="center"
					alignItems="center"
				>
					<Button
						variant="contained"
						color="primary"
						size="small"
						onClick={this.props.toggleAddHW}
						style={{
							paddingTop: 6,
							paddingBottom: 6,
							paddingLeft: 7,
							paddingRight: 7,
						}}
					>
						<AddIcon />
					</Button>
				</Grid>
			);
		}

		if (this.state.homeworks[rowIndex][columnIndex] === undefined) {
			return (
				<div key={key} style={style} className={this.props.classes.topRow} />
			);
		} else {
			const homework = this.state.homeworks[rowIndex][columnIndex];
			return (
				<Grid
					container
					key={key}
					spacing={0}
					style={style}
					className={this.props.classes.topRow}
					aria-owns={this.state.anchorEl ? "HW_header_menu" : null}
					onContextMenu={this.toggleHWMenu(homework[2])}
					justify="center"
					alignItems="center"
				>
					<Grid item xs={12} align="center">
						<Typography variant="body1">{homework[0]}</Typography>
					</Grid>
					{homework[1] ? (
						<Grid item xs={12} align="center">
							<Typography variant="caption">
								{_dateConvertor(homework[1])}
							</Typography>
						</Grid>
					) : null}
				</Grid>
			);
		}
	}

	_renderStudentColumnCell({ columnIndex, key, rowIndex, style }) {
		const student = this.state.students[rowIndex];

		if (student === undefined) {
			return (
				<div
					className={
						columnIndex === 0
							? this.props.classes.studentColLeft
							: this.props.classes.studentCol
					}
					key={key}
					style={{
						...style,
						backgroundColor: rowIndex % 2 === 1 ? "#f5f5f5" : "none",
					}}
				/>
			);
		}
		if (
			this.state.studentEdit &&
			student[2] === this.state.studentEdit[0] &&
			columnIndex === this.state.studentEdit[1]
		) {
			return (
				<Grid
					container
					className={
						columnIndex === 0
							? this.props.classes.studentColLeft
							: this.props.classes.studentCol
					}
					key={key}
					style={{
						...style,
						backgroundColor: rowIndex % 2 === 1 ? "#f5f5f5" : "none",
					}}
					justify="center"
					alignItems="center"
				>
					<ClickAwayListener onClickAway={this.handleStudentUpdate}>
						<Input
							fullWidth
							autoFocus
							classes={{ input: this.props.classes.editInput }}
							defaultValue={this.state.studentEdit[2]}
							onChange={this.handleStudentEdit}
						/>
					</ClickAwayListener>
				</Grid>
			);
		}
		return (
			<Grid
				container
				className={
					columnIndex === 0
						? this.props.classes.studentColLeft
						: this.props.classes.studentCol
				}
				key={key}
				style={{
					...style,
					backgroundColor: rowIndex % 2 === 1 ? "#f5f5f5" : "none",
				}}
				justify="center"
				alignItems="center"
				onDoubleClick={this.toggleStudentEdit([
					student[2],
					columnIndex,
					student[columnIndex],
				])}
				onContextMenu={this.toggleStudentMenu(student[2])}
			>
				<Typography variant="subheading">{student[columnIndex]}</Typography>
			</Grid>
		);
	}

	_renderStudentBodyCell({ columnIndex, key, rowIndex, style }) {
		const { students, homeworks } = this.state;
		const { studentHWStatus, hwStatus } = this.props;

		if (
			rowIndex >= this.state.studentsRowLength ||
			columnIndex >= this.state.homeworksColLength
		) {
			return (
				<div
					className={this.props.classes.studentBody}
					key={key}
					style={{
						...style,
						backgroundColor: rowIndex % 2 === 1 ? "#f5f5f5" : "none",
					}}
				/>
			);
		} else {
			const whichHW = homeworks[0][columnIndex][2];
			const whichStudent = students[rowIndex][2];
			const status =
				studentHWStatus[whichHW] === undefined ||
				studentHWStatus[whichHW][whichStudent] === undefined
					? null
					: studentHWStatus[whichHW][whichStudent];

			return (
				<Grid
					container
					className={this.props.classes.studentBody}
					key={key}
					style={{
						...style,
						backgroundColor: rowIndex % 2 === 1 ? "#f5f5f5" : "none",
					}}
					aria-owns={this.state.statusAnchorEl ? "status_body_menu" : null}
					onClick={this.toggleStudentCellClick(whichHW, whichStudent, status)}
					onContextMenu={this.toggleStatusMenu(whichHW, whichStudent)}
					onTouchStart={this.handleMouseDownPress("status", {
						homework: whichHW,
						student: whichStudent,
					})}
					onTouchEnd={this.handleMouseRelease}
					onTouchMove={this.handleMouseRelease}
					justify="center"
					alignItems="center"
				>
					{status === null ? null : (
						<Grid
							item
							xs={9}
							className={this.props.classes.statusContainer}
							style={{
								backgroundColor: hwStatus[status]
									? hwStatus[status].color
									: "inherit",
							}}
							align="center"
						>
							<Typography>{status}</Typography>
						</Grid>
					)}
				</Grid>
			);
		}
	}

	handleStudentEdit = e => {
		const { studentEdit } = this.state;
		studentEdit[2] = e.target.value;
		this.setState({
			studentEdit,
		});
	};

	toggleStudentEdit = target => () => {
		this.setState({
			studentEdit: target,
		});
	};

	handleStudentUpdate = () => {
		const { studentEdit } = this.state;
		const original = this.props.hwStudents[studentEdit[0]];
		try {
			if (
				studentEdit[2] !== original.firstName &&
				studentEdit[2] !== original.lastName
			) {
				let student = { id: studentEdit[0] };

				switch (studentEdit[1]) {
					case 0: {
						student.firstName = studentEdit[2];
						break;
					}
					case 1: {
						student.lastName = studentEdit[2];
						break;
					}
					default:
						null;
				}
				this.props.dispatch(handleUpdateHWStudent(student));
			}
		} catch (err) {
			console.log(err);
		} finally {
			setTimeout(() => {
				this.setState({
					studentEdit: null,
				});
			}, 200);
		}
	};

	toggleHWMenu = homework => e => {
		e.preventDefault();
		this.setState({
			openHWMenu: !this.state.openHWMenu,
			anchorEl: this.state.anchorEl === null ? e.currentTarget : null,
			targetHW: homework || null,
		});
	};

	closeHWMenu = () => {
		this.setState({
			openHWMenu: false,
			anchorEl: null,
			targetHW: null,
		});
	};

	toggleStudentMenu = student => e => {
		e.preventDefault();

		this.setState({
			openStudentMenu: !this.state.openStudentMenu,
			studentAnchorEl:
				this.state.studentAnchorEl === null ? e.currentTarget : null,
			targetStudent: student || null,
		});
	};

	closeStudentMenu = () => {
		this.setState({
			openStudentMenu: false,
			studentAnchorEl: null,
			targetStudent: null,
		});
	};

	toggleStatusMenu = (homework, student) => e => {
		e.preventDefault();
		this.setState({
			openStatusMenu: !this.state.openStatusMenu,
			statusAnchorEl:
				this.state.statusAnchorEl === null ? e.currentTarget : null,
			target: [homework, student] || null,
		});
	};

	toggleStudentCellClick = (homework, student, status) => e => {
		e.preventDefault();
		const target = e.currentTarget;

		if (status === "Incomplete") {
			this.props.dispatch(updateStudentStatus(homework, student, ""));
		} else if (status === "Complete") {
			this.props.dispatch(updateStudentStatus(homework, student, "Incomplete"));
		} else {
			this.props.dispatch(updateStudentStatus(homework, student, "Complete"));
		}
	};

	handleMouseDownPress = (type, criteria) => e => {
		e.preventDefault();
		switch (type) {
			case "status": {
				const target = e.currentTarget;
				const { homework, student } = criteria;
				this.menuPressTimer = setTimeout(
					() =>
						this.setState({
							openStatusMenu: !this.state.openStatusMenu,
							statusAnchorEl:
								this.state.statusAnchorEl === null ? target : null,
							target: [homework, student] || null,
						}),
					250,
				);
				break;
			}
			default:
				return null;
		}
	};

	handleMouseRelease = e => {
		e.preventDefault();
		clearTimeout(this.menuPressTimer);
	};

	changeStudentStatus(status) {
		this.props.dispatch(
			updateStudentStatus(this.state.target[0], this.state.target[1], status),
		);
		this.setState({
			openStatusMenu: !this.state.openStatusMenu,
			statusAnchorEl: null,
			target: null,
		});
	}

	changeStudentCol(status) {
		this.props.dispatch(handleUpdateColumn(this.state.targetHW, status));
		this.setState({
			openHWMenu: !this.state.openHWMenu,
			anchorEl: null,
			targetHW: null,
		});
	}

	_measureLengths = state => {
		return {
			studentRowLength: Object.keys(state.students.length),
			homeworksColLength: Object.keys(state.homeworks),
		};
	};

	render() {
		const { classes } = this.props;

		return (
			<div className={classes.root}>
				{this.state.openStudentMenu ? (
					<ListStudentMenu
						open={this.state.openStudentMenu}
						toggle={this.closeStudentMenu}
						anchorEl={this.state.studentAnchorEl}
						target={this.state.targetStudent}
					/>
				) : null}

				{this.state.openHWMenu ? (
					<ListHWMenu
						open={this.state.openHWMenu}
						toggle={this.closeHWMenu}
						anchorEl={this.state.anchorEl}
						change={this.changeStudentCol}
						target={this.state.targetHW}
					/>
				) : null}

				{this.state.openStatusMenu ? (
					<ListStatusMenu
						open={this.state.openStatusMenu}
						toggle={this.toggleStatusMenu}
						anchorEl={this.state.statusAnchorEl}
						change={this.changeStudentStatus}
					/>
				) : null}

				<AutoSizer>
					{({ height, width }) => (
						<ScrollSync>
							{({
								clientHeight,
								clientWidth,
								onScroll,
								scrollHeight,
								scrollLeft,
								scrollTop,
								scrollWidth,
							}) => (
								<Grid
									container
									spacing={0}
									style={{ width: width, height: height }}
								>
									<Grid item xs={5} md={2}>
										<Paper
											style={{
												height: 40,
												zIndex: 3,
												boxShadow: "none",
												borderRadius: 0,
											}}
										>
											<AutoSizer>
												{({ height, width }) => (
													<ListFirstLastNames height={height} width={width} />
												)}
											</AutoSizer>
										</Paper>
									</Grid>
									<Grid item xs={7} md={10}>
										<Paper
											style={{
												height: 40,
												zIndex: 3,
												boxShadow: "none",
												borderRadius: "none",
											}}
										>
											<AutoSizer>
												{({ height, width }) => (
													<VGrid
														ref={this._setHWHeaderRef}
														className={classes.hwHeaderContainer}
														cellRenderer={this._renderHWHeaderCell}
														columnCount={Math.max(
															this.state.homeworks[0].length,
															Math.ceil(width / this.state.bodyColWidth),
														)}
														columnWidth={this.state.bodyColWidth}
														rowCount={1}
														rowHeight={height}
														height={height}
														width={width - scrollbarSize()}
														overscanColumnCount={7}
														overscanRowCount={7}
														scrollLeft={scrollLeft}
														containerStyle={{
															pointerEvents: "auto",
															overflow: "hidden hidden",
														}}
													/>
												)}
											</AutoSizer>
										</Paper>
									</Grid>
									<Grid item xs={5} md={2}>
										<Paper
											style={{
												height: height - scrollbarSize(),
												zIndex: 2,
												borderRadius: 0,
												boxShadow:
													"5px 0px 5px -5px rgba(0, 0, 0, 0.2),10px 0px 20px -3px rgba(0, 0, 0, 0.14)",
											}}
										>
											<AutoSizer>
												{({ height, width }) => (
													<VGrid
														ref={this._setStudentColRef}
														className={classes.studentColContainer}
														cellRenderer={this._renderStudentColumnCell}
														columnCount={2}
														columnWidth={width / 2}
														rowCount={Math.max(
															this.state.students.length,
															Math.ceil(height / this.state.bodyRowHeight),
														)}
														rowHeight={this.state.bodyRowHeight}
														height={height - scrollbarSize()}
														width={width}
														overscanColumnCount={7}
														overscanRowCount={7}
														scrollTop={scrollTop}
														containerStyle={{
															pointerEvents: "auto",
															overflow: "hidden hidden",
														}}
													/>
												)}
											</AutoSizer>
										</Paper>
									</Grid>
									<Grid item xs={7} md={10}>
										<div style={{ height: height }}>
											<AutoSizer>
												{({ height, width }) => (
													<VGrid
														ref={this._setStudentBodyRef}
														cellRenderer={this._renderStudentBodyCell}
														columnCount={Math.max(
															this.state.homeworks[0].length,
															Math.ceil(width / this.state.bodyColWidth),
														)}
														columnWidth={this.state.bodyColWidth}
														rowCount={Math.max(
															this.state.students.length,
															Math.ceil(height / this.state.bodyRowHeight),
														)}
														rowHeight={this.state.bodyRowHeight}
														height={height}
														width={width}
														overscanColumnCount={7}
														overscanRowCount={7}
														onScroll={onScroll}
														scrollTop={scrollTop}
														containerStyle={{ pointerEvents: "auto" }}
													/>
												)}
											</AutoSizer>
										</div>
									</Grid>
								</Grid>
							)}
						</ScrollSync>
					)}
				</AutoSizer>
			</div>
		);
	}
}

function mapStateToProps(
	{ hwStudents, homeworks, hwStatus, studentHWStatus },
	{ unitID },
) {
	Object.keys(homeworks).forEach(item => {
		if (homeworks[item].unitID !== unitID) {
			homeworks = update(homeworks, {
				$unset: [item],
			});
		}
	});

	return {
		hwStudents,
		homeworks,
		hwStatus,
		studentHWStatus,
	};
}

export default compose(
	withStyles(styles),
	connect(mapStateToProps),
)(HWCourseStudentsList);
