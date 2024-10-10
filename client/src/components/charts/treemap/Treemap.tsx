import { useMemo } from "react";
import { Tree } from "./dataTypes";
import * as d3 from "d3";

type TreemapProps = {
  width: number;
  height: number;
  data: Tree;
};

export const Treemap = ({ width, height, data }: TreemapProps) => {
  const hierarchy = useMemo(() => {
    return d3.hierarchy(data).sum((d) => d.value);
  }, [data]);

  const root = useMemo(() => {
    const treeGenerator = d3.treemap<Tree>().size([width, height]).padding(4);
    return treeGenerator(hierarchy);
  }, [hierarchy, width, height]);

  const allShapes = root.leaves().map((leaf, index) => {
    return (
      <g key={"leaf-" + index}>
        <rect
          x={leaf.x0}
          y={leaf.y0}
          width={leaf.x1 - leaf.x0}
          height={leaf.y1 - leaf.y0}
          stroke="transparent"
          fill={leaf.data.color}
          className={"opacity-80 hover:opacity-100"}
        />
        <text
          x={leaf.x0 + 5}
          y={leaf.y0 + 5}
          fontSize={12}
          textAnchor="start"
          alignmentBaseline="hanging"
          fill="white"
          className="font-bold"
        >
          {leaf.data.name}
        </text>
        <text
          x={leaf.x0 + 5}
          y={leaf.y0 + 20}
          fontSize={12}
          textAnchor="start"
          alignmentBaseline="hanging"
          fill="white"
          className="font-light"
        >
          {leaf.data.value}%
        </text>
      </g>
    );
  });

  return (
    <div>
      <svg width={width} height={height}>
        {allShapes}
      </svg>
    </div>
  );
};
