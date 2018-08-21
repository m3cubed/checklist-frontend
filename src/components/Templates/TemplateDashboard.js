import React from "react";
import { withStyles } from "@material-ui/core/styles";
//Components
import TemplateBaseSideDrawer from "./TemplateBaseSideDrawer";
import TemplateDrawer from "./TemplateDrawer";
import TemplateHome from "./DisplayTypes/TemplateHome";
import TemplateList from "./DisplayTypes/TemplateList";

const styles = theme => ({
	root: {
		flexgrow: 1,
		zIndex: 1,
		overflow: "hidden",
		position: "relative",
		display: "flex"
	},
	content: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.default,
		padding: theme.spacing.unit * 3,
		minWidth: 0
	}
});

function handleSelection(selection) {
	switch (selection) {
		case "home": {
			return <TemplateHome />;
		}
		case "list": {
			return <TemplateList />;
		}
		default:
			return null;
	}
}

const TemplateDisplay = props => {
	return <React.Fragment>{props.children}</React.Fragment>;
};

const TemplateDashboard = props => {
	const { classes } = props;
	const { selection } = props.match.params;

	return (
		<div className={classes.root}>
			<TemplateBaseSideDrawer>
				<TemplateDrawer />
			</TemplateBaseSideDrawer>
			<main className={classes.content}>
				<TemplateDisplay>{handleSelection(selection)}</TemplateDisplay>
			</main>
		</div>
	);
};

export default withStyles(styles)(TemplateDashboard);
