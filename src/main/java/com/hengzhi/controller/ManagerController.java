package com.hengzhi.controller;

import com.hengzhi.entity.PageInfo;
import com.hengzhi.entity.User;
import com.hengzhi.service.UserService;
import com.alibaba.fastjson.JSONObject;
import org.apache.shiro.authz.annotation.RequiresRoles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.support.JstlUtils;

@Controller
@ResponseBody
@RequestMapping("/manage")
public class ManagerController {

    @Autowired
    private UserService userService;


    //模糊搜索后分页
    @RequiresRoles(value={"admin"})
    @RequestMapping("/findUser")
    public PageInfo findUser(@RequestBody JSONObject jsonObject){
        PageInfo<User> pageInfo = userService.findUser(jsonObject.getInteger("currentPage"),jsonObject.getString("vagueName"));
        return pageInfo;
    }

    //信息展示
    @RequiresRoles(value={"admin"})
    @RequestMapping("/findAllUser")
    public PageInfo findAllUser(@RequestBody JSONObject jsonObject){
        PageInfo<User> pageInfo = userService.findAll(jsonObject.getInteger("currentPage"));
        return pageInfo;
    }

    //修改权限
    @RequiresRoles(value={"admin"})
    @RequestMapping("/updatePerms")
    public int updateProfession(@RequestBody JSONObject jsonObject){
        int userId = jsonObject.getInteger("userId");
        User user = userService.findUserById(userId);
        String pro = user.getPerms();
        if(pro.equals("user")){
            user.setPerms("admin");
            userService.updatePerms(user);
        }else {
            user.setPerms("user");
            userService.updatePerms(user);
        }
        return 1;
    }

    //删除用户
    @RequiresRoles(value={"admin"})
    @RequestMapping("/deleteUser")
    public int deleteUser(@RequestBody JSONObject jsonObject){
        int userId = jsonObject.getInteger("userId");
        userService.deleteUser(userId);
        return 1;
    }

    //用户信息展示
    @RequiresRoles(value={"admin"})
    @RequestMapping("/findUserById")
    public User findUserById(@RequestBody JSONObject jsonObject){
        int userId = jsonObject.getInteger("userId");
        User user = userService.findUserById(userId);
        return user;
    }
}
