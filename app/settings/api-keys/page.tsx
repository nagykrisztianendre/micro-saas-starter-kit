import { ConfirmButton } from '../../_components/confirm-button';
import { AppShell } from '../../_components/shell';
import { readSearchParam, type PageSearchParams } from '../../_components/search-params';

export default async function ApiKeysPage({ searchParams }: { searchParams: PageSearchParams }) {
  const successMessage = await readSearchParam(searchParams, 'success');
  return (
    <AppShell title="API keys" description="Create and revoke machine credentials" notice={successMessage}>
      <p className="empty">No API keys yet.</p>
      <form>
        <label htmlFor="name">Key name</label>
        <input id="name" name="name" required placeholder="CI integration" />
        <button type="submit">Create API key (placeholder)</button>
      </form>
      <ConfirmButton label="Revoke key (placeholder)" confirmMessage="Revoke this API key? This cannot be undone." />
    </AppShell>
  );
}
