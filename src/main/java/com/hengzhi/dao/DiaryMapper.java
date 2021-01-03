package com.hengzhi.dao;

import com.hengzhi.entity.Diary;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface DiaryMapper {

    //显示具体的日记
    public Diary selectDiary(int diaryId);

    //删除日记
    public void deleteDiary(int diaryId);

    //    删除某人的所有日记
    public void deleteUser(int userId);

    List<Diary> findDiaryByUserId(Integer userId);
    void addDiary(Diary diary);

    List<String> selectTime(Integer userId);

}
