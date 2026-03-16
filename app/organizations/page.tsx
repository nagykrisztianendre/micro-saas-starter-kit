import { AppShell } from '../_components/shell';

export default function OrganizationsPage() {
  return (
    <AppShell title="Organizations" description="Create and manage organizations">
      <p className="empty">No organizations yet. Create your first organization to invite collaborators.</p>
    </AppShell>
  );
}
