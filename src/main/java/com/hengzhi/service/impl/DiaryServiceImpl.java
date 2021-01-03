package com.hengzhi.service.impl;

import com.hengzhi.entity.Diary;
import com.hengzhi.dao.DiaryMapper;
import com.hengzhi.service.DiaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@Transactional
public class DiaryServiceImpl implements DiaryService {

    @Autowired
    private DiaryMapper diaryMapper;

    @Override
    public Diary selectDiary(int diaryId) {
        Diary diary = diaryMapper.selectDiary(diaryId);
        return diary;
    }

    @Override
    public void deleteDiary(int diaryId) {
        diaryMapper.deleteDiary(diaryId);
    }

    @Override
    public void deleteUser(int userId) {
        diaryMapper.deleteUser(userId);
    }


    /**
     * 返回当年所有月份的日记
     *
     * @param userId
     * @return
     */
    @Override
    public Map findDiaryByUserId(Integer userId) {
        List<Diary> list = new ArrayList<Diary>();
        list = diaryMapper.findDiaryByUserId(userId);
        Calendar cal = Calendar.getInstance();
        int year = cal.get(Calendar.YEAR);
        System.out.println(year);
        Map map = new HashMap();
        for (int j = 1; j <= 12; j++) {
            List<Diary> list1 = new ArrayList<>();
            String a = String.format("%02d", j).replace(" ","0");
            System.out.println(a);
            for (int i = 0; i < list.size(); i++) {
                if (String.valueOf(year).equals(list.get(i).getTime().substring(0, 4))) {
                    String b = list.get(i).getTime().substring(5, 7);
                    if (b.equals(a)) {
                        list1.add(list.get(i));
                    }
                }
            }
            map.put("month" + j, list1);
        }
        return map;
    }

    /**
     * 根据年月，用户id获取日记
     *
     * @param userId
     * @param year
     * @param month
     * @return
     */
    @Override
    public List<Diary> findExactDiaryByUserId(int userId, int year, int month) {
        List<Diary> list = new ArrayList<Diary>();
        list = diaryMapper.findDiaryByUserId(userId);
        System.out.println(list.toString());
        List<Diary> list1 = new ArrayList<Diary>();
        for (int i = 0; i < list.size(); i++) {
            String a = list.get(i).getTime().substring(0, 4);
            String b = list.get(i).getTime().substring(5, 7);
            System.out.println("a"+a);
            System.out.println("b"+b);
            System.out.println(b);
            System.out.println(String.valueOf(year));
            System.out.println(String.format("%2d", month).replace(" ","0"));
            if (String.valueOf(year).equals(a) && String.format("%2d", month).replace(" ","0").equals(b)) {
                list1.add(list.get(i));
            }
        }
        System.out.println("list1"+list1.toString());
        return list1;
    }

    @Override
    public List<Diary> findDiary(Integer userId) {
        List<Diary> list = new ArrayList<Diary>();
        list = diaryMapper.findDiaryByUserId(userId);
        System.out.println(list);
        return list;
    }



    @Override
    public void addDiary(Diary diary) {
        diaryMapper.addDiary(diary);
    }

    @Override
    public List<String> allYear(Integer userId) {
        List<String> list = diaryMapper.selectTime(userId);
        list = diaryMapper.selectTime(userId);
        List<String> list1 = new ArrayList<>();
        for (int i = 0; i < list.size(); i++) {
            String a = list.get(i).substring(0, 4);
            if (i == 0) {
                list1.add(a);
                continue;
            }
            int flag = 0;
            for (int j = 0; j < list1.size(); j++) {
                if (list1.get(j).equals(a)) {
                    flag++;
                }
            }
            if (flag == 0) list1.add(a);
        }
        return list1;
    }

}
