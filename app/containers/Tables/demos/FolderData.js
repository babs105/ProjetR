export const anchorTable = [
  {
    name: 'id',
    label: 'Id',
    type: 'static',
    initialValue: '',
    hidden: true
  }, {
    name: 'folderNumber',
    label: 'Folder Number',
    type: 'number',
    initialValue: 0,
    width: 'auto',
    hidden: false
  }, {
    name: 'lawyerNumber',
    label: 'Lawyer Number',
    type: 'number',
    initialValue: 0,
    width: 'auto',
    hidden: false
  }, {
  }, {
    name: 'directoryNumber',
    label: 'Directory Number',
    type: 'number',
    initialValue: 0,
    width: 'auto',
    hidden: false
  }, {
    name: 'date',
    label: 'Date',
    type: 'date',
    initialValue: new Date(),
    width: 'auto',
    hidden: false
  }, {
    name: 'mode',
    label: 'Mode',
    type: 'text',
    initialValue: '',
    width: 'auto',
    hidden: false
  }, {
    name: 'name',
    label: 'Name',
    type: 'text',
    initialValue: '',
    width: 'auto',
    hidden: false
  }, {
    name: 'favorites',
    label: 'Favorite',
    type: 'toggle',
    initialValue: true,
    width: '100',
    hidden: false
  }, {
  }, {
    name: 'important',
    label: 'Important',
    type: 'toggle',
    initialValue: true,
    width: 'auto',
    hidden: false
  }, {
    name: 'edited',
    label: '',
    type: 'static',
    initialValue: '',
    hidden: true
  }, {
    name: 'action',
    label: 'Action',
    type: 'static',
    initialValue: '',
    hidden: false
  },
];

export const dataApi = [
  {
    id: '1',
    n: 'Just write',
    name: 'mail@dandelion.com',
    customer: 'option2',
    folder: 'option1',
    date: false,
    textarea: 'Lorem ipsum dolor sit amet',
    edited: false,
  },
];
