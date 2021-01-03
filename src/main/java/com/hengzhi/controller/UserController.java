package com.hengzhi.controller;

import com.alibaba.fastjson.JSONObject;
import com.hengzhi.common.shiro.ShiroConfig;
import com.hengzhi.entity.Diary;
import com.hengzhi.entity.User;
import com.hengzhi.service.DiaryService;
import com.hengzhi.service.UserService;
import org.apache.log4j.Logger;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.annotation.Logical;
import org.apache.shiro.authz.annotation.RequiresRoles;
import org.apache.shiro.crypto.hash.Md5Hash;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;
import java.util.*;
import static com.hengzhi.common.SendMail.sendEmail;

@Controller
@RequestMapping("/user")
public class UserController {
    private static final Logger logger = Logger.getLogger(UserController.class);

    //注入userService
    @Autowired
    private UserService userService;
    @Autowired
    private DiaryService diaryService;


    @RequestMapping(value = "/login", method = RequestMethod.POST)
    @ResponseBody
    public Map login(@RequestBody JSONObject jsonObject) {
        String email = jsonObject.getString("email");
        String password = jsonObject.getString("password");
        Map map = userService.login(email, password);
        String code = (String) map.get("code");
        if (code == "2") {
            User user = userService.findByEmail(email);
//            ShiroConfig.securityManager();
            //获取主体对象
            Subject subject = SecurityUtils.getSubject();
            UsernamePasswordToken token = new UsernamePasswordToken(email, password);
            System.out.println("token:" + token);
            try {
                subject.login(token);
                Session session = subject.getSession();
                session.setAttribute("user", user);
                int number=user.getNumber();
                if(number>=5){
//                    用户需要修改密码
                    code="1";
                    user.setWhetherChange("YES");
                    userService.whetherChange(user.getUserId());
                    session.setAttribute("user",user);
                    map.put("code", code);
                    return map;
                }
                else {
                    //用户密码正确，成功登陆
                    code = "3";//用户密码正确，成功登陆
                    map.put("code", code);
                    return map;
                }
            } catch (UnknownAccountException e) {
                e.printStackTrace();
                System.out.println("用户名错误");
            } catch (IncorrectCredentialsException e) {
                e.printStackTrace();
                code = "4";//用户密码错误
                //number+1
                user.setNumber(user.getNumber() + 1);
                User user1 = new User();
                user1.setUserId(user.getUserId());
                user1.setNumber(user.getNumber());
                userService.userUpdate(user1);
                int number = user.getNumber();
                User user2 = new User();
                user2.setNumber(number + 1);
                userService.userUpdate(user2);
                map.put("code", code);
                return map;
            }
        }
        logger.info("/userController/login:" + map);
        return map;
    }

//    /**
//     * 注册
//     * @param jsonObject
//     * @return
//     */
//    @RequestMapping(value = "/register", method = RequestMethod.POST)
//    @ResponseBody
//    public String register(@RequestBody JSONObject jsonObject,HttpSession session) {
//        String password=jsonObject.getString("password");
//        User user=new User();
//        user.setPassword(password);
//        String email= (String) session.getAttribute("email");
//        user.setEmail(email);
//        System.out.println("zhuce");
//        System.out.println(user.toString());
//        String code = userService.register(user);
//        logger.info("/userController/register:" + user.getEmail() + code);
//        return code;
//    }
    /**
     * 注册
     * @param user
     * @return
     */
    @RequestMapping(value = "/register", method = RequestMethod.POST)
    @ResponseBody
    public String register(@RequestBody User user) {
        System.out.println("zhuce");
        System.out.println(user.toString());
        String code = userService.register(user);
        logger.info("/userController/register:" + user.getEmail() + code);
        return code;
    }
    /**
     * 邮箱是否存在
     * @param jsonObject
     * @return
     */
   @RequestMapping(value ="/emailExist",method = RequestMethod.POST)
   @ResponseBody
   public HashMap<String,String> emailExist(@RequestBody JSONObject jsonObject){
       String email=jsonObject.getString("email");
       HashMap<String,String> map=new HashMap<>();
       User user = userService.findByEmail(email);
       System.out.println(user);
       if (user != null) {
           map.put("exist", "yes");
       } else map.put("exist", "no");
       return map;
   }
    /**
     * 发送邮件
     * @param jsonObject
     * @param session
     * @return
     */
    @RequestMapping(value = "/sendMail", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, String> sendMail(@RequestBody JSONObject jsonObject, HttpSession session) {
        String email=jsonObject.getString("email");
        HashMap<String, String> map = new HashMap<String, String>();
        int a[] = {0, 0, 0, 0};
        for (int i = 0; i < 4; i++) {
            a[i] = (int) (1 + Math.random() * 10);
        }
        int emailCode = a[0] * 1000 + a[1] * 100 + a[2] * 10 + a[3];
        System.out.println(emailCode);
        User user = userService.findByEmail(email);
        if (user != null) {
            map.put("emailExist", "yes");
        } else map.put("emailExist", "no");
        int res = sendEmail(new String[]{email},//这里可以发送至任何邮箱
                "BBRoom",
                "<p><b>您好，欢迎来到BBRoom！</b></p>您的验证码是：" + emailCode,
                "text/html;charset=utf-8");
        System.out.println("\n发送结果:" + res);
        session.setAttribute("emailCode", emailCode);
        session.setAttribute("email", email);
        return map;
    }

    /**
     * 验证邮件
     * @param jsonObject
     * @param session
     * @return
     */
    @RequestMapping(value = "/checkMail", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, String> checkMail(@RequestBody JSONObject jsonObject, HttpSession session) {
        String email=jsonObject.getString("email");
        Integer emailCode=jsonObject.getInteger("emailCode");
        HashMap<String, String> map = new HashMap<String, String>();
        Integer code = (Integer) session.getAttribute("emailCode");
        String email1 = (String) session.getAttribute("email");
        System.out.println(code + email1);
        if (code != null && email1 != null) {
            if (code.equals(emailCode) && email.equals(email1)) {
                map.put("flag", "yes");
            } else map.put("flag", "no");
        } else map.put("flag", "no");
//        map.put("session",session.getAttribute("emailCode").toString());
        return map;
    }

    /**
     * 修改密码
     * @param jsonObject
     * @return
     */
    @RequiresRoles(value={"user","admin"},logical= Logical.OR)
    @RequestMapping("/updatePassword")
    @ResponseBody
    public String updatePassword(@RequestBody JSONObject jsonObject) {
        Integer userId = jsonObject.getInteger("userId");
        String password = jsonObject.getString("password");
        String newPassword = jsonObject.getString("newPassword");
        return userService.updatePassword(userId, password, newPassword);
    }

    /**
     * 找回密码
     * @param jsonObject
     * @param session
     * @return
     */
    @RequestMapping(value = "/findPassword", method = RequestMethod.POST)
    @ResponseBody
    public String findPassword(@RequestBody JSONObject jsonObject, HttpSession session) {
        String newPassword=jsonObject.getString("newPassword");
        String email = (String) session.getAttribute("email");
        System.out.println(email);
        return userService.findPassword(newPassword,email);
    }

    /**
     * 退出登陆
     * @return
     */
    @RequiresRoles(value={"user","admin"},logical=Logical.OR)
    @RequestMapping("/logout")
    @ResponseBody
    public void logout() {
        Subject subject = SecurityUtils.getSubject();
        subject.logout();
    }


    /**
     * 注销账户
     * @return
     */
    @RequiresRoles(value={"user"})
    @RequestMapping("/deleteUser")
    @ResponseBody
    public String deleteUser() {
        //获取主体对象
        Subject subject = SecurityUtils.getSubject();
        Session session = subject.getSession();
        User user = (User) session.getAttribute("user");
        if (user!= null) {
            System.out.println(user.getUserId());
            int userId=user.getUserId();
            Integer userId1 = userId;
            System.out.println(userId1);
            List<Diary> list = new ArrayList<>();
            list = diaryService.findDiary(userId1);
            System.out.println(list);
            if(list!=null)  diaryService.deleteUser(user.getUserId());
            userService.deleteUser(user.getUserId());
            return "success";
        } else return "error";
    }

    /**
     * 修改个人信息
     *
     * @param user
     * @return
     */
    @RequiresRoles(value={"user","admin"},logical=Logical.OR)
    @RequestMapping("/userUpdate")
    @ResponseBody
    public User userUpdate(@RequestBody User user) {
        User user1 = userService.userUpdate(user);
        Subject subject = SecurityUtils.getSubject();
        Session session = subject.getSession();
        session.setAttribute("user", user1);
        user1.setSalt(null);
        user1.setPassword(null);
        user1.setNumber(0);
        user1.setWhetherChange(null);
        return user1;
    }

    /**
     * 上传修改头像
     * @param headImage
     * @param request
     * @return
     */
    @RequiresRoles(value={"user","admin"},logical=Logical.OR)
    @RequestMapping("/changeheadImage")
    @ResponseBody
    public String updateHeadImage(@RequestParam(value = "headImage", required = false) MultipartFile headImage, HttpServletRequest request) {
        System.out.println("changeHeadImage3");
//        ShiroConfig.securityManager();
        Subject subject = SecurityUtils.getSubject();
        Session session = subject.getSession();
        User user = (User) session.getAttribute("user");
        User user1 = new User();
        user1.setUserId(user.getUserId());
        System.out.println("头像：" + user);
        String flag = "0";
        System.out.println(headImage);
        if (!headImage.isEmpty()) {
            String filePath = request.getServletContext().getRealPath("/headImage");
            String originalFilename = headImage.getOriginalFilename();
            System.out.println(originalFilename);
            // UUID随机重命名
            String newFileName = (UUID.randomUUID() + originalFilename
                    .substring(originalFilename.indexOf("."))).replace("-", "");
//            String newFileName=UUID.randomUUID()+"_"+originalFilename;
            System.out.println(newFileName);
            // 新文件
            File file = new File(filePath, newFileName);
            // 将文件写入磁盘
            try {
                if (!file.exists()) {
                    file.mkdirs();
                }
                headImage.transferTo(file);
                // 将图片名字写入数据库
                user1.setHeadImageUrl(newFileName);
                userService.userUpdate(user1);

            } catch (IllegalStateException | IOException e) {
                e.printStackTrace();
            }
            user.setHeadImageUrl(newFileName);
            session.setAttribute("user", user);
            flag = newFileName;
            System.out.println(newFileName);
            return flag;
        } else {
            System.out.println("文件为空");
            // 返回上传页面
            return flag;
        }
    }

    /**
     * 登录信息的传值
     * @return
     */
    @RequestMapping("/userStatusCheck")
    @ResponseBody
    public User userStatusCheck() {
//        ShiroConfig.securityManager();
        Subject subject = SecurityUtils.getSubject();
        Session session = subject.getSession();
        User user = new User();
        user = (User) session.getAttribute("user");
        System.out.println("登录信息的传值" + user);
        if (user != null) {
            User user1 = new User();
            user1 = user;
            user1.setPassword(null);
            user1.setSalt(null);
            return user;
        } else return new User();
    }
}
