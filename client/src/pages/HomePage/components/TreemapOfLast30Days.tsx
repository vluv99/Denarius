import { Treemap } from "../../../components/charts/treemap/Treemap";
import {
  // testData,
  Tree,
  TreeLeaf,
} from "../../../components/charts/treemap/dataTypes";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { Transaction } from "../../../models/Transaction";
import { Category } from "../../../models/CategoryModel";
import { isDateIn30Days } from "../../../utils/utils";

export function TreemapOfLast30Days({
  transactions,
  categories,
}: {
  transactions: Transaction[];
  categories: Category[];
}) {
  const data: Tree = {
    type: "node",
    name: "boss",
    value: 0,
    children: [],
  };

  data.children = [...setLeaves(categories, transactions)];

  useEffect(() => {
    data.children = [];
    data.children = [...setLeaves(categories, transactions)];
  }, [transactions]);

  return (
    <Box id={"treemap-container"} sx={{ minHeight: 200 }}>
      <AutoResizingTreemap
        data={data}
        containerID={"treemap-container"}
        padding={10}
      />
    </Box>
  );
}

function setLeaves(
  categories: Category[],
  transactions: Transaction[],
): Tree[] {
  const filtered = transactions
    .filter((t) => isDateIn30Days(t.date) && t.amount < 0)
    .sort((a, b) => a.category.localeCompare(b.category));

  const tree: Tree[] = [];
  categories.map((cat) => {
    const catCount = filtered.filter((t) => t.category === cat.id);
    if (catCount.length > 0) {
      const leaf: TreeLeaf = {
        type: "leaf",
        name: cat.name,
        value: catCount.length,
        color: "",
      };
      tree.push(leaf);
    }
  });
  return tree;
}

function AutoResizingTreemap({
  data,
  containerID,
  padding,
}: {
  data: Tree;
  containerID: string;
  padding: number;
}) {
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((event) => {
      // Depending on the layout, you may need to swap inlineSize with blockSize
      // https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserverEntry/contentBoxSize
      setWidth(event[0].contentBoxSize[0].inlineSize);
      setHeight(event[0].contentBoxSize[0].blockSize);
    });

    resizeObserver.observe(document.getElementById(containerID)!);
  });

  return (
    <Treemap data={data} width={width - padding} height={height - padding} />
  );
}
