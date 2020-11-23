<template>
  <div>
    <sk-import-online-leads-dialog />
    <sk-add-user-dialog />
    <sk-edit-user-dialog />
    <sk-delete-dialog />
    <sk-add-branch-dialog />
    <sk-edit-branch-dialog />
    <sk-import-itemlist-dialog />
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

export default {

  components: {
    skImportOnlineLeadsDialog,
    skAddUserDialog,
    skEditUserDialog,
    skDeleteDialog,
    skAddBranchDialog,
    skImportItemlistDialog,
    skEditBranchDialog,
  },
  data() {
    return {

    }
  },
}
</script>
