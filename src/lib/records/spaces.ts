import type { DocRecord, DocSpace } from "@/lib/records/doc-types";
import { aiSupportGroupSpace } from "@/lib/records/spaces/ai-support-group";
import { salesSpace } from "@/lib/records/spaces/sales";

export const DOC_SPACES: DocSpace[] = [aiSupportGroupSpace, salesSpace];

export const DOC_RECORDS: Record<string, DocRecord> = Object.fromEntries(
  DOC_SPACES.flatMap((space) => space.docs.map((doc) => [doc.id, doc]))
);

export const DOC_RECORD_LIST = Object.values(DOC_RECORDS);

export function getSpaceById(spaceId: string) {
  return DOC_SPACES.find((space) => space.id === spaceId);
}

export function getDocRecord(spaceId: string | undefined, docId: string | undefined) {
  if (!docId) return undefined;

  if (spaceId) {
    return getSpaceById(spaceId)?.docs.find((doc) => doc.id === docId);
  }

  return DOC_RECORDS[docId];
}

export function getDefaultSpace() {
  return aiSupportGroupSpace;
}
