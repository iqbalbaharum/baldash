<template>
  <div>
    <sk-import-online-leads-dialog />
    <sk-add-user-dialog />
    <sk-edit-user-dialog />
    <sk-delete-dialog />
    <sk-add-branch-dialog />
    <sk-edit-branch-dialog />
    <sk-import-itemlist-dialog />
    <sk-assign-leads-to-branch-dialog />
    <sk-view-user-dialog />
    <sk-view-branch-dialog />
  </div>
</template>

<script>
import skImportOnlineLeadsDialog from './SkImportOnlineLeadsDialog'
import skImportItemlistDialog from './SkImportItemlistDialog'
import skAddUserDialog from './SkAddUserDialog'
import skEditUserDialog from './SkEditUserDialog'
import skDeleteDialog from './SkDeleteDialog'
import skAddBranchDialog from './SkAddBranchDialog'
import skEditBranchDialog from './SkEditBranchDialog'
import skAssignLeadsToBranchDialog from './SkAssignLeadsToBranchDialog'
import skViewUserDialog from './SkViewUserDialog'
import skViewBranchDialog from './SkViewBranchDialog'

export default {

  components: {
    skImportOnlineLeadsDialog,
    skAddUserDialog,
    skEditUserDialog,
    skDeleteDialog,
    skAddBranchDialog,
    skImportItemlistDialog,
    skEditBranchDialog,
    skAssignLeadsToBranchDialog,
    skViewUserDialog,
    skViewBranchDialog,
  },
  data() {
    return {

    }
  },
}
</script>
