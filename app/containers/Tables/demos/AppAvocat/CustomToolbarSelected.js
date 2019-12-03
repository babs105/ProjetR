import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';

const defaultToolbarStyles = {
  iconButton: {
  },
  deleteIcon: {
    color: '#000'
  }
};

class CustomToolbarSelect extends React.Component {
  handleClickDelete = () => {
    this.props.onDelete(this.props.selectedRows, this.props.displayData);
  };

  handleClickUpdate = () => {
    this.props.onUpdate(this.props.selectedRows, this.props.displayData);
  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <TableCell padding="none">
          <Tooltip title="delete icon">
            <IconButton className={classes.iconButton} onClick={this.handleClickDelete}>
              <DeleteIcon className={classes.deleteIcon} />
            </IconButton>
          </Tooltip>
          <Tooltip title="edit icon">
            <IconButton className={classes.iconButton} onClick={this.handleClickUpdate}>
              <EditIcon className={classes.editIcon} />
            </IconButton>
          </Tooltip>
        </TableCell>
      </React.Fragment>
    );
  }
}

export default withStyles(defaultToolbarStyles, { name: 'CustomToolbarSelect' })(CustomToolbarSelect);
