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
    <sk-disqualified-q-l-dialog />
    <sk-assign-scope />
    <sk-branch-RR-dialog />
    <sk-requalify-q-l-dialog />
    <sk-add-drawing-number-dialog />
    <sk-assign-lead-to-design />
    <change-status />
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
import skDisqualifiedQLDialog from './SkDisqualifiedQLDialog'
import skRequalifyQLDialog from './SkRequalifyQLDialog'
import skAssignLeadToScDialog from './SkAssignLeadToSCDialog'
import skAssignScope from './SkAssignScope'
import skBranchRRDialog from './SkBranchRRDialog'
import skAddDrawingNumberDialog from './SkAddDrawingNumberDialog'
import skAssignLeadToDesign from './SkAssignLeadToDesign'
import changeStatus from './ChangeStatus'

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
    skDisqualifiedQLDialog,
    skAssignLeadToScDialog,
    skAssignScope,
    skBranchRRDialog,
    skRequalifyQLDialog,
    skAddDrawingNumberDialog,
    skAssignLeadToDesign,
    changeStatus
  },
  data() {
    return {

    }
  },
}
</script>
