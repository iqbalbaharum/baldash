<template>
  <div>
    <sk-import-online-leads-dialog />
    <sk-add-user-dialog />
    <sk-delete-dialog />
    <sk-add-branch-dialog />
  </div>
</template>

<script>
import skImportOnlineLeadsDialog from './SkImportOnlineLeadsDialog'
import skAddUserDialog from './SkAddUserDialog'
import skDeleteDialog from './skDeleteDialog'
import skAddBranchDialog from './SkAddBranchDialog'

export default {

  components: {
    skImportOnlineLeadsDialog,
    skAddUserDialog,
    skDeleteDialog,
    skAddBranchDialog
  },
  data() {
    return {

    }
  },
}
</script>
