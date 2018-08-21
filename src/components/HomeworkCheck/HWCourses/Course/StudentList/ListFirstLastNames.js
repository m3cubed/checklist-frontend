import React from "react";
import { withStyles } from "@material-ui/core/styles";
//Acessories
import { Grid as VGrid } from "react-virtualized";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
	topLeft: {
		flexGrow: 1,
		border: "1px solid #e0e0e0",
		borderRight: "none",
		borderLeft: "none"
	},
	topRight: {
		flexGrow: 1,
		border: "1px solid #e0e0e0",
		borderRight: "none",
		borderLeft: "none"
	}
});

let gridList = [["First", "Last"]];

const ListFirstLastNames = props => {
	const { height, width } = props;

	function _renderHeaderCell({ columnIndex, key, rowIndex, style }) {
		return (
			<Grid
				container
				className={
					columnIndex === 1 ? props.classes.topRight : props.classes.topLeft
				}
				style={style}
				key={key}
				justify="center"
				alignItems="center"
			>
				<Typography variant="body1">
					{gridList[rowIndex][columnIndex]}
				</Typography>
			</Grid>
		);
	}

	return (
		<VGrid
			cellRenderer={_renderHeaderCell}
			columnCount={gridList[0].length}
			columnWidth={width / 2}
			rowCount={1}
			rowHeight={height}
			height={height}
			width={width}
			overscanColumnCount={2}
			overscanRowCount={2}
		/>
	);
};

export default withStyles(styles)(ListFirstLastNames);
