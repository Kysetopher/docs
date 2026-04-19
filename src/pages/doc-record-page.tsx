import { Navigate, useParams } from "react-router-dom";
import DocumentationPage from "@/components/docs/DocumentationPage";
import { DOC_RECORDS } from "@/lib/records/docs-records";

export function DocRecordPage() {
  const { docId } = useParams<{ docId: string }>();
  const doc = docId ? DOC_RECORDS[docId] : undefined;

  if (!doc) {
    return <Navigate to="/docs" replace />;
  }

  return <DocumentationPage header={doc.header} sections={doc.sections} />;
}
