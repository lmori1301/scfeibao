import { Injectable } from '@nestjs/common';
import { MENU_FLAT_ROWS, MenuFlatRow } from './menu-tree.definition';

export type MenuTreeNodeDto = MenuFlatRow & {
  level: number
  children?: MenuTreeNodeDto[]
}

@Injectable()
export class MenuTreeService {
  /** 嵌套树（el-tree / 树形表格） */
  getNestedTree(): MenuTreeNodeDto[] {
    const flat = MENU_FLAT_ROWS;
    const build = (parentId: string | null, level: number): MenuTreeNodeDto[] =>
      flat
        .filter((r) => (r.parentId ?? null) === (parentId ?? null))
        .sort((a, b) => a.sort - b.sort)
        .map((r) => {
          const children = build(r.id, level + 1);
          const node: MenuTreeNodeDto = {
            ...r,
            level,
            ...(children.length ? { children } : {}),
          };
          return node;
        });
    return build(null, 0);
  }

  /** 平面列表（含 level，便于树形表格或导出） */
  getFlatWithLevel(): Array<MenuFlatRow & { level: number }> {
    const out: Array<MenuFlatRow & { level: number }> = [];
    const walk = (nodes: MenuTreeNodeDto[]) => {
      for (const n of nodes) {
        const { children, ...rest } = n;
        out.push(rest);
        if (children?.length) walk(children);
      }
    };
    walk(this.getNestedTree());
    return out;
  }
}
