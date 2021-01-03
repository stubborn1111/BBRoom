package com.hengzhi.dao;
import com.hengzhi.entity.User;
import io.swagger.models.auth.In;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Repository
public interface UserMapper {
    //增加用户
    void insertUser(User user);
//    将次数置0
    void setZero(int userId);
    //用户邮箱是否存在
    User findUserByEmail(String email);

    //根据id查找用户
    User findUserByUserId(int userId);

    //修改密码
    void updatePassword(@Param("userId") int userId, @Param("newPassword") String newPassword);

    //修改个人信息
    void userUpdate(User user);

    //管理员界面
    //用户模糊搜索+分页
    public List<User> findUser(@Param("start") Integer start, @Param("vagueName") String vagueName);
    //获得数量
    public int getTotalCount(@Param("vagueName") String vagueName);

    //信息展示
    //用户所有分页
    public List<User> findAll(@Param("start") Integer start);
    //获得数量
    public int getTotalCount1();

    //修改用户权限
    public void updatePerms(User user);
    public User findUserById(int userId);

    //删除用户
    public void deleteUser(int userId);
    void whetherChange(int userId);
}