<template>
  <div>
    <sk-import-online-leads-dialog />
    <sk-add-user-dialog />
    <sk-edit-user-dialog />
    <sk-delete-dialog />
    <sk-add-branch-dialog />
    <sk-edit-branch-dialog />
    <sk-add-lead-dialog />
    <sk-import-itemlist-dialog />
    <sk-assign-leads-to-branch-dialog />
    <sk-assign-lead-to-sc-dialog />
    <sk-assign-user-role />
    <sk-open-kujiale-dialog />
    <sk-disqualified-o-l-dialog />
    <sk-disqualify-q-l-dialog />
    <sk-assign-scope />
    <sk-branch-RR-dialog />
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
import skAddLeadDialog from './SkAddLeadDialog'
import skAssignLeadsToBranchDialog from './SkAssignLeadsToBranchDialog'
import skAssignUserRole from './SkAssignUserRole'
import SkOpenKujialeDialog from './SkOpenKujialeDialog'
import skDisqualifiedOLDialog from './SkDisqualifiedOLDialog'
import skDisqualifyQLDialog from './SkDisqualifyQLDialog'
import skAssignLeadToScDialog from './SkAssignLeadToSCDialog'
import skAssignScope from './SkAssignScope'
import skBranchRRDialog from './SkBranchRRDialog'

export default {

  components: {
    skImportOnlineLeadsDialog,
    skAddUserDialog,
    skEditUserDialog,
    skDeleteDialog,
    skAddBranchDialog,
    skImportItemlistDialog,
    skEditBranchDialog,
    skAddLeadDialog,
    skAssignLeadsToBranchDialog,
    skAssignUserRole,
    SkOpenKujialeDialog,
    skDisqualifiedOLDialog,
    skDisqualifyQLDialog,
    skAssignLeadToScDialog,
    skAssignScope,
    skBranchRRDialog
  },
  data() {
    return {

    }
  },
}
</script>
