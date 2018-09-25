import { combineReducers } from "redux";
import templates from "./templates";
import authUser from "./authUser";
import courses from "./courses";
import questions from "./questions";
import users from "./users";
import sentToList from "./sendToList";
import polls from "./polls";
import pollsQuestions from "./pollsQuestions";
import students from "./students";
import questionEdits from "./questionEdits";
import navbar from "./navbar";
import pollResponse from "./pollResponse";
import responses from "./responses";
import loading from "./loading";
import courseCollaborations from "./courseCollaborations";
import { homeworkCheck } from "./HomeworkCheck";
import { pageStates } from "./PageStates";

export default combineReducers({
	authUser,
	templates,
	questions,
	courses,
	users,
	sentToList,
	polls,
	pollsQuestions,
	students,
	questionEdits,
	navbar,
	pollResponse,
	responses,
	loading,
	...homeworkCheck,
	...pageStates,
	courseCollaborations,
});
