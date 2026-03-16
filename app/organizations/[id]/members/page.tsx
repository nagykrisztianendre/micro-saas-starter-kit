import { ConfirmButton } from '../../../_components/confirm-button';
import { AppShell } from '../../../_components/shell';

export default function OrganizationMembersPage() {
  return (
    <AppShell title="Organization members" description="Manage member roles and access">
      <p className="empty">No members found.</p>
      <ConfirmButton label="Remove member (placeholder)" confirmMessage="Remove this member from the organization?" />
    </AppShell>
  );
}
