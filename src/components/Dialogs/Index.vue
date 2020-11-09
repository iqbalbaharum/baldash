<template>
  <div>
    <sk-import-online-leads-dialog />
    <sk-add-user-dialog />
    <sk-delete-user-dialog />
    <sk-add-branch-dialog />
  </div>
</template>

<script>
import skImportOnlineLeadsDialog from './SkImportOnlineLeadsDialog'
import skAddUserDialog from './SkAddUserDialog'
import skDeleteUserDialog from './SkDeleteUserDialog'
import skAddBranchDialog from './SkAddBranchDialog'

export default {

  components: {
    skImportOnlineLeadsDialog,
    skAddUserDialog,
    skDeleteUserDialog,
    skAddBranchDialog
  },
  data() {
    return {

    }
  },
}
</script>
