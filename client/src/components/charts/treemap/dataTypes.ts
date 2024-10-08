export type TreeNode = {
  type: "node";
  value: number;
  name: string;
  color: string;
  children: Tree[];
};
export type TreeLeaf = {
  type: "leaf";
  name: string;
  value: number;
  color: string;
};

export type Tree = TreeNode | TreeLeaf;

export const testData: Tree = {
  type: "node",
  name: "boss",
  value: 0,
  color: "",
  children: [
    { type: "leaf", name: "Mark", value: 90, color: "#e0702b" },
    { type: "leaf", name: "Robert", value: 12, color: "#6689c6" },
    { type: "leaf", name: "Emily", value: 34, color: "#89a850" },
    { type: "leaf", name: "Marion", value: 53, color: "#e85252" },
    { type: "leaf", name: "Nicolas", value: 98, color: "#9a6fb0" },
    { type: "leaf", name: "Malki", value: 22, color: "#a53253" },
    { type: "leaf", name: "Djé", value: 12, color: "#7f7f7f" },
    { type: "leaf", name: "Mélanie", value: 45, color: "#2b6ae0" },
    { type: "leaf", name: "Einstein", value: 76, color: "#b65d37" },
    { type: "leaf", name: "Amba", value: 50, color: "#499a65" },
  ],
};
