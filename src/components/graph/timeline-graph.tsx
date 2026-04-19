import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import * as d3 from "d3";

export type TimelineEvent = {
  label: string;
  refIds?: string[];
};

export type TimelineYearColumn = {
  year: string;
  color: string;
  events: TimelineEvent[];
};

type TimelineGraphProps = {
  title: string;
  columns: TimelineYearColumn[];
  renderEventFooter?: (args: {
    column: TimelineYearColumn;
    event: TimelineEvent;
    eventIndex: number;
  }) => ReactNode;
};

function wrapSvgText(
  text: d3.Selection<SVGTextElement, unknown, null, undefined>,
  width: number,
  lineHeightEm = 1.2
) {
  text.each(function () {
    const node = d3.select(this);
    const words = (node.text() ?? "").split(/\s+/).filter(Boolean);
    const x = Number(node.attr("x"));
    const y = Number(node.attr("y"));

    node.text("");

    let line: string[] = [];
    let lineNumber = 0;
    let tspan = node
      .append("tspan")
      .attr("x", x)
      .attr("y", y)
      .attr("dy", `${lineNumber * lineHeightEm}em`);

    for (const word of words) {
      line.push(word);
      tspan.text(line.join(" "));
      const tspanNode = tspan.node();
      if (tspanNode && tspanNode.getComputedTextLength() > width && line.length > 1) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        lineNumber += 1;
        tspan = node
          .append("tspan")
          .attr("x", x)
          .attr("y", y)
          .attr("dy", `${lineNumber * lineHeightEm}em`)
          .text(word);
      }
    }
  });
}

export function TimelineGraph({ title, columns, renderEventFooter }: TimelineGraphProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const observer = new ResizeObserver((entries) => {
      const nextWidth = Math.floor(entries[0]?.contentRect.width ?? 0);
      setWidth(nextWidth);
    });

    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  const height = useMemo(() => {
    const maxEvents = Math.max(...columns.map((column) => column.events.length), 1);
    return 220 + maxEvents * 92;
  }, [columns]);

  const overlayLayout = useMemo(() => {
    const margin = { top: 24, right: 28, bottom: 28, left: 28 };
    const eventStartY = 168;
    const cardH = 82;
    const cardGap = 10;
    const byYear = new Map<string, number>();

    if (width < 600) {
      return { eventStartY, cardH, cardGap, eventBoxW: 0, byYear };
    }

    const columnBand = d3
      .scaleBand<string>()
      .domain(columns.map((column) => column.year))
      .range([margin.left, width - margin.right])
      .paddingInner(0.06);

    const eventBoxW = Math.max(Math.min(columnBand.bandwidth() * 0.92, 220), 130);
    columns.forEach((column) => {
      const bandStart = columnBand(column.year);
      if (bandStart === undefined) return;
      byYear.set(column.year, bandStart + columnBand.bandwidth() / 2);
    });

    return { eventStartY, cardH, cardGap, eventBoxW, byYear };
  }, [columns, width]);

  useEffect(() => {
    if (!svgRef.current || width < 600) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const margin = { top: 24, right: 28, bottom: 28, left: 28 };
    const axisY = 112;
    const yearBoxY = 38;
    const yearBoxH = 44;
    const eventStartY = 168;
    const cardH = 82;
    const cardGap = 10;
    const maxEvents = Math.max(...columns.map((column) => column.events.length), 1);
    const bottomY = eventStartY + maxEvents * (cardH + cardGap) - cardGap + 20;

    svg.attr("viewBox", `0 0 ${width} ${height}`).attr("width", "100%").attr("height", height);

    const defs = svg.append("defs");
    defs
      .append("marker")
      .attr("id", "timeline-arrow-right")
      .attr("viewBox", "0 0 10 10")
      .attr("refX", 9)
      .attr("refY", 5)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M 0 0 L 10 5 L 0 10 z")
      .attr("fill", "rgba(255,255,255,0.9)");

    defs
      .append("marker")
      .attr("id", "timeline-arrow-down")
      .attr("viewBox", "0 0 10 10")
      .attr("refX", 5)
      .attr("refY", 9)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M 0 0 L 10 0 L 5 10 z")
      .attr("fill", "rgba(255,255,255,0.7)");

    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", 20)
      .attr("text-anchor", "middle")
      .attr("fill", "rgba(255,255,255,0.92)")
      .style("font-size", "14px")
      .style("font-weight", 600)
      .text(title);

    svg
      .append("line")
      .attr("x1", margin.left)
      .attr("x2", width - margin.right)
      .attr("y1", axisY)
      .attr("y2", axisY)
      .attr("stroke", "rgba(255,255,255,0.9)")
      .attr("stroke-width", 2.2)
      .attr("marker-end", "url(#timeline-arrow-right)");

    const columnBand = d3
      .scaleBand<string>()
      .domain(columns.map((column) => column.year))
      .range([margin.left, width - margin.right])
      .paddingInner(0.06);

    const yearBoxW = Math.max(Math.min(columnBand.bandwidth() * 0.92, 220), 130);
    const eventBoxW = Math.max(Math.min(columnBand.bandwidth() * 0.92, 220), 130);

    const graph = svg.append("g");

    columns.forEach((column) => {
      const bandStart = columnBand(column.year);
      if (bandStart === undefined) return;
      const centerX = bandStart + columnBand.bandwidth() / 2;

      graph
        .append("line")
        .attr("x1", centerX)
        .attr("x2", centerX)
        .attr("y1", yearBoxY + yearBoxH + 4)
        .attr("y2", bottomY)
        .attr("stroke", "rgba(255,255,255,0.55)")
        .attr("stroke-width", 1.5)
        .attr("stroke-dasharray", "3,3")
        .attr("marker-end", "url(#timeline-arrow-down)");

      graph
        .append("rect")
        .attr("x", centerX - yearBoxW / 2)
        .attr("y", yearBoxY)
        .attr("rx", 2)
        .attr("ry", 2)
        .attr("width", yearBoxW)
        .attr("height", yearBoxH)
        .attr("fill", column.color)
        .attr("stroke", "rgba(255,255,255,0.45)")
        .attr("stroke-width", 1);

      graph
        .append("text")
        .attr("x", centerX)
        .attr("y", yearBoxY + yearBoxH / 2 + 4)
        .attr("text-anchor", "middle")
        .attr("fill", "rgba(255,255,255,0.92)")
        .style("font-size", "12px")
        .style("font-weight", 700)
        .text(column.year);

      column.events.forEach((event, eventIndex) => {
        const eventLabel = event.label;
        const y = eventStartY + eventIndex * (cardH + cardGap);
        const rectX = centerX - eventBoxW / 2;

        graph
          .append("rect")
          .attr("x", rectX)
          .attr("y", y)
          .attr("rx", 2)
          .attr("ry", 2)
          .attr("width", eventBoxW)
          .attr("height", cardH)
          .attr("fill", column.color)
          .attr("stroke", "rgba(255,255,255,0.5)")
          .attr("stroke-width", 1);

        const text = graph
          .append("text")
          .attr("x", centerX)
          .attr("y", y + 20)
          .attr("text-anchor", "middle")
          .attr("fill", "rgba(255,255,255,0.95)")
          .style("font-size", "11px")
          .style("font-weight", 600)
          .text(eventLabel);

        wrapSvgText(text, eventBoxW - 18, 1.15);
      });
    });
  }, [columns, height, title, width]);

  return (
    <div ref={hostRef} className="w-full overflow-x-auto">
      <div className="relative min-w-[760px]">
        <svg ref={svgRef} className="block w-full min-w-[760px]" role="img" aria-label={title} />
        {width >= 600 && renderEventFooter ? (
          <div className="pointer-events-none absolute inset-0">
            {columns.flatMap((column) => {
              const centerX = overlayLayout.byYear.get(column.year);
              if (centerX === undefined) return [];
              return column.events.map((event, eventIndex) => {
                const y = overlayLayout.eventStartY + eventIndex * (overlayLayout.cardH + overlayLayout.cardGap);
                const left = centerX - overlayLayout.eventBoxW / 2 + 8;
                const top = y + overlayLayout.cardH - 24;
                return (
                  <div
                    key={`${column.year}-${event.label}-footer`}
                    className="pointer-events-auto absolute"
                    style={{ left, top }}
                  >
                    {renderEventFooter({ column, event, eventIndex })}
                  </div>
                );
              });
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default TimelineGraph;
