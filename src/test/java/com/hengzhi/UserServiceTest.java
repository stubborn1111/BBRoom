//package com.hengzhi;
//
//import com.hengzhi.controller.UserController;
//import com.hengzhi.dao.UserMapper;
//import com.hengzhi.entity.User;
//import com.hengzhi.service.UserService;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.ApplicationContext;
//import org.springframework.context.support.ClassPathXmlApplicationContext;
//import org.springframework.test.context.ContextConfiguration;
//import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
//
//@ContextConfiguration(locations = {"classpath:applicationContext.xml"})
////RunWith的value属性指定以spring test的SpringJUnit4ClassRunner作为启动类
////如果不指定启动类，默认启用的junit中的默认启动类
//@RunWith(value = SpringJUnit4ClassRunner.class)
//public class UserServiceTest {
//    @Test
//    public void loginTest(){
//        ApplicationContext ac = new ClassPathXmlApplicationContext("classpath:applicationContext.xml");
//        UserController userController = (UserController) ac.getBean("userController");
//        String email = "2380886380@qq.com";
//        String password = "a12345";
//        userController.login(email,password);
//    }
//
//    @Test
//    public void registerTest(){
//        ApplicationContext ac = new ClassPathXmlApplicationContext("classpath:applicationContext.xml");
//        UserService userService = (UserService) ac.getBean("userServiceImpl");
//
//        String email = "2222@qq.com";
//        String password = "123";
//        User user = new User();
//        user.setEmail(email);
//        user.setPassword(password);
//        userService.register(user);
//    }
//
//    @Test
//    public void userUpdate(){
//        ApplicationContext ac = new ClassPathXmlApplicationContext("classpath:applicationContext.xml");
//        UserService userService = (UserService) ac.getBean("userServiceImpl");
//        User user = new User();
//        user.setUserId(1);
//        user.setUsername("2222");
//        userService.userUpdate(user);
//    }
//
//    @Test
//    public void updatePassword(){
//        ApplicationContext ac = new ClassPathXmlApplicationContext("classpath:applicationContext.xml");
//        UserService userService = (UserService) ac.getBean("userServiceImpl");
//        int userId = 6;
//        String password = "222";
//        String newPassword = "111";
//        userService.updatePassword(userId,password,newPassword);
//    }
//
//    @Test
//    public void register(){
//        ApplicationContext ac = new ClassPathXmlApplicationContext("classpath:applicationContext.xml");
//        UserService userService = (UserService) ac.getBean("userServiceImpl");
//        User user =new User();
//        user.setEmail("222@qq.com");
//        user.setPassword("222");
//        userService.register(user);
//    }
//    @Test
//    public void mail(){
//
////         UserController userController=new UserController();
////         userController.sendMail("3245078024@qq.com");
//
//    }
//
//    @Autowired
//    UserMapper userMapper;
//    @Test
//    public void checkmail(){
//        User g = userMapper.findUserByEmail("g");
//        System.out.println("g = " + g);
//
//    }
//
//}
