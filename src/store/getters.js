const getters = {
  token: state => state.user.token,
  roles: state => state.user.roles,
  permissions: state => state.user.permissions,
  // dialog
  activeModal: state => state.modal.open.length > 0 ? state.modal.open[0] : null,
  allOpen: state => state.modal.open,
  //
  menus: state => state.app.menus,
  datatabs: state => state.app.datatabs,
  activeDataTab: state => state.app.activeDataTab,
  tableSelection: state => state.app.tableSelection,
  activeMenu: state => state.app.activeMenu,
}

export default getters
