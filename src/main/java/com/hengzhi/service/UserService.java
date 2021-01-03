package com.hengzhi.service;

import com.hengzhi.entity.Diary;
import com.hengzhi.entity.PageInfo;
import com.hengzhi.entity.User;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface UserService {
    //登陆
    Map login(String username, String password);

    //注册
    String register(User user);

    User findByEmail(String email);

    //    找回密码
    String findPassword(@Param("email") String email, @Param("newPassword") String newPassword);

    //修改密码
    String updatePassword(@Param("userId") int userId, @Param("password") String password, @Param("newPassword") String newPassword);

    //修改个人信息
    User userUpdate(User user);
    //邮箱是否存在
    public User emailExist(String email);

    //管理员操作
    //用户分页
    public PageInfo<User> findUser(Integer currentPage, String vagueName);

    //信息展示
    //用户所有分页
    public PageInfo<User> findAll(@Param("start") Integer start);

    //修改用户权限
    public void updatePerms(User user);

    public User findUserById(int userId);

    //删除用户
    public void deleteUser(int userId);

    User findUserByUserId(int userId);
    public void  whetherChange(int userId);
}
