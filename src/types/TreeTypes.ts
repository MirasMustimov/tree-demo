interface TreeBranchNested {
  id: number,
  parent_id: number,
  title?: string,
  children?: TreeBranchNested[]
}

export type { TreeBranchNested }
