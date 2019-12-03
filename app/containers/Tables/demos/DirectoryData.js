
export const anchorTable = [
  {
    name: 'id',
    label: 'Id',
    type: 'static',
    hidden: true
  }, {
    name: 'directoryNumber',
    label: 'N°',
    type: 'number',
    initialValue: 0,
    width: 'auto',
    hidden: false
  }, {
    name: 'name',
    label: 'Directory name',
    type: 'text',
    initialValue: 'dfuyfyt',
    width: 'auto',
    hidden: false
  }, {
    name: 'customerNumber',
    label: 'Customer',
    type: 'number',
    initialValue: 0,
    width: 'auto',
    hidden: false
  }, {
    name: 'date',
    label: 'Creation date',
    type: 'date',
    initialValue: new Date(),
    width: 'auto',
    hidden: false
  }, {
    name: 'edited',
    label: '',
    initialValue: '',
    hidden: true
  }, {
    name: 'action',
    label: 'Action',
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
