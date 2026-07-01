import { Navigate, useParams } from "react-router-dom";
import DocumentationPage from "@/components/docs/DocumentationPage";
import { getDocBanner } from "@/lib/records/doc-banners";
import { getDefaultSpace, getDocRecord, getSpaceById } from "@/lib/records/spaces";

export function DocRecordPage() {
  const { spaceId, docId } = useParams<{ spaceId: string; docId: string }>();
  const defaultSpace = getDefaultSpace();
  const resolvedDocId = docId ?? spaceId;
  const doc = getDocRecord(spaceId, resolvedDocId);
  const resolvedSpace = spaceId ? getSpaceById(spaceId) : defaultSpace;

  if (!doc || !resolvedSpace) {
    return <Navigate to="/" replace />;
  }

  return (
    <DocumentationPage
      header={doc.header}
      banner={getDocBanner(doc.id) ?? null}
      sections={doc.sections}
      backHref={resolvedSpace.href}
      backLabel={`${resolvedSpace.title} Space`}
    />
  );
}
