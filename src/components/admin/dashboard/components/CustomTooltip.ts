interface DataItem {
  month: string;
  date: string;
  [key: string]: string | number;
}

export interface CustomTooltipProps {
  active?: boolean;
  payload?: { payload: DataItem }[];
}
