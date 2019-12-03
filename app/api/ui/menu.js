module.exports = [
  {
    key: 'home',
    name: 'Directory',
    link: '/app/directory',
    icon: 'ios-folder-outline',
    child: [
      {
        key: 'landing_page',
        name: 'Landing Page',
        title: true,
      },
      {
        key: 'corporate',
        name: 'Corporate',
        link: '/',
        badge: 'Hot'
      },
      {
        key: 'creative',
        name: 'Creative',
        link: '/landing-creative'
      },
      {
        key: 'dashboard',
        name: 'Dashboard',
        title: true,
      },
      {
        key: 'personal',
        name: 'Personal',
        link: '/app'
      },
      {
        key: 'crm',
        name: 'CRM',
        link: '/app/crm-dashboard'
      },
      {
        key: 'crypto',
        name: 'Cryptocurrency',
        link: '/app/crypto-dashboard'
      },
    ]
  },
  {
    key: 'widgets',
    name: 'Customer',
    icon: 'ios-people-outline',
    child: [
      {
        key: 'infographics_wdiget',
        name: 'Infographics',
        link: '/app/widgets/infographics'
      },
      {
        key: 'status_widget',
        name: 'Status',
        link: '/app/widgets/status'
      },
      {
        key: 'mini_apps_widget',
        name: 'Mini Apps',
        link: '/app/widgets/mini-apps'
      },
      {
        key: 'analytics_widget',
        name: 'Analytics',
        link: '/app/widgets/analytics'
      },
      {
        key: 'info_updates_widget',
        name: 'Info & Updates',
        link: '/app/widgets/info-updates'
      }
    ]
  },
  {
    key: 'layouts',
    name: 'Appointment',
    icon: 'ios-calendar-outline',
    child: [
      {
        key: 'grid',
        name: 'Grid',
        link: '/app/layouts/grid'
      },
      {
        key: 'application_layout',
        name: 'App Layout',
        link: '/app/layouts/app-layout'
      },
      {
        key: 'responsive',
        name: 'Responsive',
        link: '/app/layouts/responsive'
      }
    ]
  },
  {
    key: 'tables',
    name: 'Invoice',
    icon: 'ios-create-outline',
    child: [
      {
        key: 'common_table',
        name: 'Common Table',
        title: true,
      },
      {
        key: 'basic_table',
        name: 'Basic',
        link: '/app/tables/basic-table'
      },
      {
        key: 'data_table',
        name: 'Data Tables',
        link: '/app/tables/data-table'
      },
      {
        key: 'table_playground',
        name: 'Table Playgound',
        link: '/app/tables/table-playground'
      },
      {
        key: 'redux_table',
        name: 'Redux Table',
        title: true,
      },
      {
        key: 'editable_cell',
        name: 'Table Edit',
        link: '/app/tables/editable-cell'
      },
      {
        key: 'tree_table',
        name: 'Tree Table',
        link: '/app/tables/tree-table'
      },
    ]
  },
  {
    key: 'forms',
    name: 'Legal Directory',
    icon: 'ios-archive-outline',
    child: [
      {
        key: 'buttons_collections',
        name: 'Button Collections',
        title: true,
      },
      {
        key: 'buttons',
        name: 'Buttons',
        link: '/app/forms/buttons'
      },
      {
        key: 'toggle_button',
        name: 'Toggle Button',
        link: '/app/forms/toggle-button'
      },
      {
        key: 'dial_button',
        name: 'Dial Button',
        link: '/app/forms/dial-button'
      },
      {
        key: 'text_input',
        name: 'Text Input',
        title: true,
      },
      {
        key: 'textfields',
        name: 'Textfields',
        link: '/app/forms/textfields'
      },
      {
        key: 'autocomplete',
        name: 'Autocomplete & Tag',
        link: '/app/forms/autocomplete'
      },
      {
        key: 'datetimepicker',
        name: 'Date Time Picker',
        link: '/app/forms/date-time-picker'
      },
      {
        key: 'reduxform',
        name: 'Redux Form',
        link: '/app/forms/reduxform'
      },
      {
        key: 'selection',
        name: 'Selection',
        title: true,
      },
      {
        key: 'checkbox_radio',
        name: 'Checkbox & Radio',
        link: '/app/forms/checkbox-radio'
      },
      {
        key: 'switches',
        name: 'Switches',
        link: '/app/forms/switches'
      },
      {
        key: 'selectbox',
        name: 'Select',
        link: '/app/forms/selectbox'
      },
      {
        key: 'advanced_input',
        name: 'Advanced Input',
        title: true,
      },
      {
        key: 'slider',
        name: 'Slider Range',
        link: '/app/forms/slider-range'
      },
      {
        key: 'upload',
        name: 'Upload',
        link: '/app/forms/upload'
      },
      {
        key: 'ratting',
        name: 'Ratting',
        link: '/app/forms/ratting'
      },
      {
        key: 'texteditor',
        name: 'WYSIWYG Editor',
        link: '/app/forms/wysiwyg-editor'
      },
    ]
  },

];
