package com.hengzhi.controller;


import com.hengzhi.entity.Diary;
import com.hengzhi.service.DiaryService;
import com.alibaba.fastjson.JSONObject;
import org.apache.shiro.authz.annotation.Logical;
import org.apache.shiro.authz.annotation.RequiresRoles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Map;

@Controller
@ResponseBody
@RequestMapping("/diary")
public class DiaryController {

    @Autowired
    private DiaryService diaryService;

    @RequiresRoles(value={"user","admin"},logical= Logical.OR)
    @RequestMapping("/selectDiary")
    public Diary selectDiary(@RequestBody JSONObject jsonObject) {
        int diaryId = jsonObject.getInteger("diaryId");
        Diary diary = diaryService.selectDiary(diaryId);
        return diary;
    }

    @RequiresRoles(value={"user","admin"},logical=Logical.OR)
    @RequestMapping("/deleteDiary")
    public int deleteDiary(@RequestBody JSONObject jsonObject) {
        int diaryId = jsonObject.getInteger("diaryId");
        diaryService.deleteDiary(diaryId);
        return 1;
    }

    @RequiresRoles(value={"user","admin"},logical=Logical.OR)
    @RequestMapping("/findDiaryByUserId")
    @ResponseBody
    public Map findDiaryByUserId(@RequestBody JSONObject jsonObject) {
        Integer userId = jsonObject.getInteger("userId");
        Map map = diaryService.findDiaryByUserId(userId);
        return map;
    }

    @RequiresRoles(value={"user","admin"},logical=Logical.OR)
    @RequestMapping("/findExactDiaryByUserId")
    @ResponseBody
    public List<Diary> findExactDiaryByUserId(@RequestBody JSONObject jsonObject) {
        Integer year = jsonObject.getInteger("year");
        Integer month = jsonObject.getInteger("month");
        Integer userId = jsonObject.getInteger("userId");
        return diaryService.findExactDiaryByUserId(userId, year, month);
    }

    @RequiresRoles(value={"user","admin"},logical=Logical.OR)
    @RequestMapping("/addDiary")
    @ResponseBody
    public void addDiary(@RequestBody Diary diary) {
        System.out.println(diary.toString());
        diaryService.addDiary(diary);
    }

    @RequiresRoles(value={"user","admin"},logical=Logical.OR)
    @RequestMapping("/allYear")
    @ResponseBody
    public List<String> allYear(@RequestBody JSONObject jsonObject) {
        Integer userId = jsonObject.getInteger("userId");
        List list = diaryService.allYear(userId);
        return list;
    }

}
