/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Content is served through a Google Apps Script Web App bound to each Sheet
 * (see GOOGLE_SETUP.md) rather than the Sheet's public CSV export. That keeps
 * the underlying spreadsheet fully private — the script runs as its owner and
 * only the JSON it explicitly returns is ever exposed to visitors.
 */

import { useEffect, useState } from 'react';

function normalizeRecord(raw: Record<string, unknown>): Record<string, string> {
  const record: Record<string, string> = {};
  for (const [key, value] of Object.entries(raw)) {
    record[key.trim().toLowerCase()] = value === null || value === undefined ? '' : String(value);
  }
  return record;
}

export async function fetchContentRecords(endpointUrl: string): Promise<Record<string, string>[]> {
  const res = await fetch(endpointUrl);
  if (!res.ok) {
    throw new Error(`Failed to load content (${res.status})`);
  }
  const json = await res.json();
  if (!Array.isArray(json)) {
    throw new Error('Unexpected response shape from content endpoint');
  }
  return json.map(normalizeRecord);
}

export type SheetDataState<T> = {
  data: T[];
  loading: boolean;
  error: string | null;
  /** true when no endpoint URL was configured (env var missing) rather than a fetch failure */
  unconfigured: boolean;
};

/**
 * Fetches and maps a Google Sheet's rows (via its Apps Script Web App endpoint) into typed records.
 * Pass an empty/undefined endpointUrl to get the `unconfigured` flag instead of attempting a fetch.
 */
export function useGoogleSheet<T>(
  endpointUrl: string | undefined,
  mapRecord: (record: Record<string, string>, index: number) => T | null
): SheetDataState<T> {
  const [state, setState] = useState<SheetDataState<T>>({
    data: [],
    loading: !!endpointUrl,
    error: null,
    unconfigured: !endpointUrl,
  });

  useEffect(() => {
    if (!endpointUrl) {
      setState({ data: [], loading: false, error: null, unconfigured: true });
      return;
    }

    let cancelled = false;
    setState((prev) => ({ ...prev, loading: true, error: null, unconfigured: false }));

    fetchContentRecords(endpointUrl)
      .then((records) => {
        if (cancelled) return;
        const mapped = records
          .map((record, index) => mapRecord(record, index))
          .filter((item): item is T => item !== null);
        setState({ data: mapped, loading: false, error: null, unconfigured: false });
      })
      .catch((err) => {
        if (cancelled) return;
        setState({ data: [], loading: false, error: err instanceof Error ? err.message : 'Failed to load content', unconfigured: false });
      });

    return () => {
      cancelled = true;
    };
  }, [endpointUrl]);

  return state;
}
