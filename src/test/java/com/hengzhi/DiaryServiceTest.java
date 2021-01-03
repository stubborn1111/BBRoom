//package com.hengzhi;
//
//import com.hengzhi.dao.DiaryMapper;
//import com.hengzhi.entity.Diary;
//import com.hengzhi.service.DiaryService;
//
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.springframework.context.ApplicationContext;
//import org.springframework.context.support.ClassPathXmlApplicationContext;
//import org.springframework.test.context.ContextConfiguration;
//import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
//
//import java.util.List;
//import java.util.Map;
//
//@ContextConfiguration(locations = {"classpath:applicationContext.xml"})
////RunWith的value属性指定以spring test的SpringJUnit4ClassRunner作为启动类
////如果不指定启动类，默认启用的junit中的默认启动类
//@RunWith(value = SpringJUnit4ClassRunner.class)
//public class DiaryServiceTest {
//    @Test
//    public void addDiaryTest() {
//        ApplicationContext ac = new ClassPathXmlApplicationContext("classpath:applicationContext.xml");
//        DiaryService diaryService = (DiaryService) ac.getBean("diaryServiceImpl");
//        Diary diary = new Diary();
//        diary.setUserId(1);
//        diary.setInfo("ssssss");
//        diaryService.addDiary(diary);
//    }
//
//    @Test
//    public void findExactDiaryByUserIdTest() {
//        ApplicationContext ac = new ClassPathXmlApplicationContext("classpath:applicationContext.xml");
//        DiaryService diaryService = (DiaryService) ac.getBean("diaryServiceImpl");
//        List<Diary> list = diaryService.findExactDiaryByUserId(1, 2020, 12);
//        System.out.println(list.toString());
//    }
//
//    @Test
//    public void findDiaryByUserId(){
//        ApplicationContext ac = new ClassPathXmlApplicationContext("classpath:applicationContext.xml");
//        DiaryService diaryService = (DiaryService) ac.getBean("diaryServiceImpl");
//        Map map = diaryService.findDiaryByUserId(23);
//        System.out.println(map.toString());
//    }
//    @Test
//    public void findDiary() {
//        ApplicationContext ac = new ClassPathXmlApplicationContext("classpath:applicationContext.xml");
//        DiaryService diaryService = (DiaryService) ac.getBean("diaryServiceImpl");
//
////        Map list=diaryService.findDiaryByUserId(23);
////        System.out.println(list);
//       List list1=diaryService.findDiary(23);
//        System.out.println(list1);
//    }
//
//    @Test
//    public void findDiaryByUser(){
//        ApplicationContext ac = new ClassPathXmlApplicationContext("classpath:applicationContext.xml");
//        DiaryMapper diaryMapper = (DiaryMapper) ac.getBean("diaryMapper");
//        List<Diary> diaryByUserId = diaryMapper.findDiaryByUserId(23);
//        System.out.println(diaryByUserId);
//
//    }
//}
