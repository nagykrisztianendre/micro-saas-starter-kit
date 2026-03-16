export { adminModule } from './admin';
export { authModule } from './auth';
export { billingModule } from './billing';
export { dashboardModule } from './dashboard';

import { adminModule } from './admin';
import { authModule } from './auth';
import { billingModule } from './billing';
import { dashboardModule } from './dashboard';

export const modules = [authModule, billingModule, dashboardModule, adminModule] as const;

export type RegisteredModule = (typeof modules)[number];
