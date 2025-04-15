import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';
import type { DairyRecord, RecordType } from './types';

const STORAGE_KEY = 'records';

export const useRecordsManager = () => {
  const [records, setRecords] = useState<RecordType[]>([]);

  useEffect(() => {
    const loadRecords = async () => {
      try {
        const storedData = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedData) {
          setRecords(JSON.parse(storedData));
        }
      } catch (e) {
        throw new Error(`ストレージの読み込みエラー:${e}`);
      }
    };
    loadRecords();
  }, []);

  const saveRecords = useCallback(async (newRecords: RecordType[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newRecords));
      setRecords(newRecords);
    } catch (e) {
      throw new Error(`データの保存に失敗しました:${e}`);
    }
  }, []);

  const getByDate = useCallback(
    (date: Date, id: number): DairyRecord | undefined => {
      const targetRecord = records.find(record => record.id === id);
      return targetRecord?.records?.find(record => record.date === date);
    },
    [records],
  );

  const getAllTitles = useCallback(() => {
    return records.map(({ title, id }) => ({ title, id }));
  }, [records]);

  const getById = useCallback(
    (id: number): RecordType | undefined => {
      return records.find(record => record.id === id);
    },
    [records],
  );

  const createRecord = useCallback(
    (id: number, newRecord: DairyRecord) => {
      const updatedRecords = records.map(data =>
        data.id === id ? { ...data, records: [...(data.records || []), newRecord] } : data,
      );
      saveRecords(updatedRecords);
    },
    [records, saveRecords],
  );

  const createTitle = useCallback(
    (title: string) => {
      const newId = records.length > 0 ? records[records.length - 1].id + 1 : 1;
      const newRecord: RecordType = { title, id: newId };
      saveRecords([...records, newRecord]);
    },
    [records, saveRecords],
  );

  const editRecord = useCallback(
    (id: number, newRecord: DairyRecord) => {
      const updatedRecords = records.map(record =>
        record.id === id
          ? {
              ...record,
              records: record.records?.map(r => (r.date === newRecord.date ? newRecord : r)) || [],
            }
          : record,
      );
      saveRecords(updatedRecords);
    },
    [records, saveRecords],
  );

  const switchDefault = useCallback(async (id: number) => {
    try {
      await AsyncStorage.setItem('defaultTitleId', JSON.stringify(id));
    } catch (e) {
      throw new Error(`デフォルトタイトルの保存に失敗しました:${e}`);
    }
  }, []);

  return {
    records,
    getByDate,
    getAllTitles,
    getById,
    createRecord,
    createTitle,
    editRecord,
    switchDefault,
  };
};
