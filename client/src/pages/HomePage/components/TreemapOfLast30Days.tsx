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
import { useTranslation } from "react-i18next";
import { TFunction } from "i18next";

export function TreemapOfLast30Days({
  transactions,
  categories,
}: {
  transactions: Transaction[];
  categories: Category[];
}) {
  const { t } = useTranslation();

  const data: Tree = {
    type: "node",
    name: "origin",
    value: 0,
    color: "",
    children: [],
  };

  data.children = [...setLeaves(categories, transactions, t)];

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
  t: TFunction,
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
        name: t(`database.category.${cat.name}`),
        value: Math.round((catCount.length / filtered.length) * 100),
        color: cat.color,
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
