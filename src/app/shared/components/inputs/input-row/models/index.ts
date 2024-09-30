
export interface InputRowSubText {
  key: string;
  value: string | number;
}

export interface InputRowLabelData {
  label: string;
  id?: string;
}

export interface InputRowData {
  labelData?: InputRowLabelData;
  subTextList?: InputRowSubText[];
}
