import { ConfirmButton } from '../../../_components/confirm-button';
import { AppShell } from '../../../_components/shell';

export default function OrganizationInvitePage() {
  return (
    <AppShell title="Invite member" description="Invite teammates to your organization">
      <form>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required />
        <button type="submit">Send invite</button>
      </form>
      <ConfirmButton label="Delete invitation (placeholder)" confirmMessage="Delete this pending invitation?" />
    </AppShell>
  );
}
