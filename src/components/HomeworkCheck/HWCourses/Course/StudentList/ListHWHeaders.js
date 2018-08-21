import React from "react";
import { Grid as VGrid } from "react-virtualized";
import Typography from "@material-ui/core/Typography";

let gridList = [["First", "Last"]];

function _renderHeaderCell({ columnIndex, key, rowIndex, style }) {
	return (
		<div style={style} key={key}>
			<Typography variant="subheading">
				{gridList[rowIndex][columnIndex]}
			</Typography>
		</div>
	);
}

const ListFirstLastNames = props => {
	const { height, width } = props;
	return (
		<VGrid
			style={{ overflow: "hidden" }}
			cellRenderer={this._renderHWHeaderCell}
			columnCount={this.state.homeworks[0].length}
			columnWidth={120}
			rowCount={1}
			rowHeight={30}
			height={height}
			width={width}
			overscanColumnCount={2}
			overscanRowCount={2}
			onScroll={onScroll}
			scrollLeft={scrollLeft}
		/>
	);
};

export default ListFirstLastNames;
