import { describe, expect, it } from 'vitest';

import { getWelcomeMessage, starterName } from '../src';

describe('starter exports', () => {
  it('exposes the starter name and welcome message', () => {
    expect(starterName).toBe('micro-saas-starter-kit');
    expect(getWelcomeMessage()).toBe('Micro-SaaS Starter Kit is ready.');
  });
});
