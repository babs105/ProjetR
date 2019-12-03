import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';
import MUIDataTable from 'mui-datatables';
import CustomToolbarSelect from './CustomToolbarSelected';
const styles = theme => ({
  table: {
    '& > div': {
      overflow: 'auto'
    },
    '& table': {
      minWidth: 500,
      [theme.breakpoints.down('md')]: {
        '& td': {
          height: 40
        }
      }
    }
  }
});
/*
  It uses npm mui-datatables. It's easy to use, you just describe columns and data collection.
  Checkout full documentation here :
  https://github.com/gregnb/mui-datatables/blob/master/README.md
*/
class DocumentTable extends React.Component {
  state = {
    columns: [
      {
        name: 'docNumber',
        label: 'Number',
        options: {
          filter: false
        }
      },
      {
        name: 'name',
        label: 'Name',
        options: {
          filter: true,
        }
      },
      {
        name: 'folderNumber',
        label: 'FolderName',
        options: {
          filter: true,
        }
      },
      {
        name: 'type',
        label: 'Type',
        options: {
          filter: true,
        }
      },
      {
        name: 'important',
        label: 'Status',
        options: {
          filter: true,
          customBodyRender: (value) => {
            if (value === 'true') {
              return (<Chip label="Important" color="secondary" />);
            }
            if (value === 'false') {
              return (<Chip label="Non Important" color="primary" />);
            }
            return (<Chip label="Unknown" />);
          }
        }
      },
    ],
  }

  render() {
    const { columns } = this.state;
    const {
      classes, dataTable, onDelete, onSubmit
    } = this.props;
    const data = dataTable.toJS();
    const options = {
      filterType: 'dropdown',
      responsive: 'stacked',
      print: true,
      download: true,
      search: true,
      filter: true,
      sort: true,
      sortFilterList: true,
      rowHover: true,
      rowsPerPage: 10,
      page: 1,
      customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
        <CustomToolbarSelect
          selectedRows={selectedRows}
          displayData={displayData}
          setSelectedRows={setSelectedRows}
          onDelete={onDelete}
          onUpdate={onSubmit}
        />
      ),
    };
    return (
      <div className={classes.table}>
        <MUIDataTable
          title="Document list"
          data={data}
          columns={columns}
          options={options}
        />
      </div>
    );
  }
}

DocumentTable.propTypes = {
  classes: PropTypes.object.isRequired,
  dataTable: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default withStyles(styles)(DocumentTable);
