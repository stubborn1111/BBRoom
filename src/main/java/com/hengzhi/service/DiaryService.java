package com.hengzhi.service;

import com.hengzhi.entity.Diary;

import java.util.List;
import java.util.Map;

public interface DiaryService {

    //显示具体的日记
    public Diary selectDiary(int diaryId);

    //删除日记
    public void deleteDiary(int diaryId);
    //    删除某人的所有日记
    public void deleteUser(int userId);

    Map findDiaryByUserId(Integer userId);
    public List<Diary> findExactDiaryByUserId(int userId, int year, int month);
     List findDiary(Integer userId);
    void addDiary(Diary diary);

    //用户所有有日记的年份
    List<String> allYear(Integer userId);

}
