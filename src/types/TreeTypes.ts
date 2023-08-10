interface TreeBranchNested {
  id: number | string,
  parent_id: number | string,
  title?: string,
  children?: TreeBranchNested[]
}

export type { TreeBranchNested }
