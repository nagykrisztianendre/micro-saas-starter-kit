export type PageSearchParams = Promise<Record<string, string | string[] | undefined>>;

export async function readSearchParam(
  searchParams: PageSearchParams | undefined,
  key: string,
): Promise<string | undefined> {
  const resolved = searchParams ? await searchParams : undefined;
  const value = resolved?.[key];
  return Array.isArray(value) ? value[0] : value;
}
