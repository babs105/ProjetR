import React from 'react';
import PropTypes from 'prop-types';
import Form from './tableParts/Form';
import MainFolderTableForm from './tableParts/MainFolderTableForm';
import FloatingPanel from '../Panel/FloatingPanel';

class CrudFolderTableForm extends React.Component {
  sendValues = (values) => {
    const { submit, branch } = this.props;
    setTimeout(() => {
      submit(values, branch);
    }, 500);
  }

  render() {
    const {
      title,
      dataTable,
      openForm,
      closeForm,
      removeRow,
      addNew,
      editRow,
      anchor,
      children,
      branch,
      initValues
    } = this.props;

    return (
      <div>
        <FloatingPanel openForm={openForm} branch={branch} closeForm={closeForm}>
          <Form onSubmit={this.sendValues} initialValues={initValues} branch={branch}>
            {children}
          </Form>
        </FloatingPanel>
        <MainFolderTableForm
          title={title}
          addNew={addNew}
          items={dataTable}
          removeRow={removeRow}
          editRow={editRow}
          anchor={anchor}
          branch={branch}
        />
      </div>
    );
  }
}

CrudFolderTableForm.propTypes = {
  title: PropTypes.string.isRequired,
  anchor: PropTypes.array.isRequired,
  dataTable: PropTypes.object.isRequired,
  submit: PropTypes.func.isRequired,
  addNew: PropTypes.func.isRequired,
  openForm: PropTypes.bool.isRequired,
  closeForm: PropTypes.func.isRequired,
  removeRow: PropTypes.func.isRequired,
  editRow: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  initValues: PropTypes.object.isRequired,
  branch: PropTypes.string.isRequired,
};

export default CrudFolderTableForm;
