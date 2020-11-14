<template>
  <div>
    <sk-import-online-leads-dialog />
    <sk-add-user-dialog />
    <sk-delete-dialog />
    <sk-add-branch-dialog />
    <sk-import-itemlist-dialog />
  </div>
</template>

<script>
import skImportOnlineLeadsDialog from './SkImportOnlineLeadsDialog'
import skImportItemlistDialog from './SkImportItemlistDialog'
import skAddUserDialog from './SkAddUserDialog'
import skDeleteDialog from './SkDeleteDialog'
import skAddBranchDialog from './SkAddBranchDialog'

export default {

  components: {
    skImportOnlineLeadsDialog,
    skAddUserDialog,
    skDeleteDialog,
    skAddBranchDialog,
    skImportItemlistDialog,
  },
  data() {
    return {

    }
  },
}
</script>
