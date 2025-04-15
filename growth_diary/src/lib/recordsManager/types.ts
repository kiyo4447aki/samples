type Steps = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

type DairyRecord = {
  date: Date;
  efforts: Steps;
  growth: Steps;
  diary: string;
};

type RecordType = {
  title: string;
  id: number;
  records?: DairyRecord[];
};

export { DairyRecord, RecordType };
