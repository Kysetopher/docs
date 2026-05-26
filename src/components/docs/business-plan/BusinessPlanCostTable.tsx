import type { ReactNode } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { BusinessPlanCostRow } from "./types";

type BusinessPlanCostTableProps = {
  rows: BusinessPlanCostRow[];
  totals?: {
    label: string;
    notes?: ReactNode;
    estimate: ReactNode;
  };
};

export function BusinessPlanCostTable({ rows, totals }: BusinessPlanCostTableProps) {
  return (
    <Table className="border">
      <TableHeader>
        <TableRow>
          <TableHead>Category</TableHead>
          <TableHead>Notes</TableHead>
          <TableHead className="text-right">Est. Yearly Cost</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={String(row.category)}>
            <TableCell className="font-medium">{row.category}</TableCell>
            <TableCell>{row.notes}</TableCell>
            <TableCell className="text-right">{row.estimate}</TableCell>
          </TableRow>
        ))}
        {totals ? (
          <TableRow className="border-t font-semibold">
            <TableCell>{totals.label}</TableCell>
            <TableCell>{totals.notes ?? null}</TableCell>
            <TableCell className="text-right">{totals.estimate}</TableCell>
          </TableRow>
        ) : null}
      </TableBody>
    </Table>
  );
}

export default BusinessPlanCostTable;
