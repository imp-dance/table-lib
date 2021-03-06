declare namespace StylesLessNamespace {
  export interface IStylesLess {
    asc: string;
    caption: string;
    cell: string;
    clickable: string;
    desc: string;
    ellipsis: string;
    fullWidth: string;
    headerHover: string;
    table: string;
    tableWrapper: string;
    tbody: string;
    th: string;
    thead: string;
    tr: string;
  }
}

declare const StylesLessModule: StylesLessNamespace.IStylesLess & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: StylesLessNamespace.IStylesLess;
};

export = StylesLessModule;
