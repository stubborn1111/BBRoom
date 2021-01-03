package com.hengzhi.service.impl;

import com.hengzhi.common.SaltUtils;
import com.hengzhi.common.shiro.ShiroConfig;
import com.hengzhi.dao.UserMapper;
import com.hengzhi.entity.Diary;
import com.hengzhi.entity.PageInfo;
import com.hengzhi.entity.User;
import com.hengzhi.service.UserService;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.mgt.SecurityManager;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.crypto.hash.Md5Hash;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class UserServiceImpl implements UserService {
    //注入UserMapper接口
    @Autowired
    private UserMapper userMapper;

    /**
     * 登陆
     *
     * @param email
     * @param password
     * @return
     */
    @Override
    public Map login(String email, String password) {
        Map map = new HashMap<>();
        //判断用户是否存在
        User user = userMapper.findUserByEmail(email);
        String code = "0";//用户不存在
        if (user == null) {
            //用户不存在
            map.put("code", code);
            return map;
        } else {
            //用户需要修改密码
            if (user.getWhetherChange() == "YES") {
                code = "1";//用户需要修改密码
                map.put("code", code);
                return map;
            } else {
                User user1 = userMapper.findUserByEmail(email);
                code = "2";//其他
                map.put("code", code);
                return map;
            }
        }
    }

    /**
     * 注册
     *
     * @param user
     * @return
     */
    @Override
    public String register(User user) {
        String code = "0";//用户已存在
        System.out.println(user.toString());
        System.out.println(user.getEmail());
        User user1 = userMapper.findUserByEmail(user.getEmail());
        System.out.println(user1);
        if (user1 == null) {
            //1.生成随机盐
            String salt = SaltUtils.getSalt(8);
            //2.将随机盐保存到数据库
            user.setSalt(salt);
            //3.明文密码进行md5+salt+hash散列
            Md5Hash md5Hash = new Md5Hash(user.getPassword(), salt, 1024);
            user.setPassword(md5Hash.toHex());
            System.out.println(user.toString());
            //用户不存在，成功注册
            userMapper.insertUser(user);
            code = "1";//用户不存在，成功注册
            return code;
        } else {
            //用户已存在
            return code;
        }
    }

    @Override
    public User findByEmail(String email) {
        return userMapper.findUserByEmail(email);
    }

    /**
     * 修改密码
     *
     * @param userId
     * @param password
     * @param newPassword
     * @return
     */
    @Override
    public String updatePassword(int userId, String password, String newPassword) {
        String code;
        User user = userMapper.findUserByUserId(userId);
        System.out.println(user.getSalt());
        System.out.println(user.getPassword().toString());
        Md5Hash md5Hash = new Md5Hash(password, user.getSalt(), 1024);
        System.out.println("+++++" + md5Hash.toHex());
        if (user.getPassword().equals(md5Hash.toHex())) {
            Md5Hash md5Hash1 = new Md5Hash(newPassword, user.getSalt(), 1024);
            userMapper.updatePassword(userId, md5Hash1.toHex());
            userMapper.setZero(userId);
            code = "1";//修改成功
            System.out.println(code);
            return code;
        } else {
            code = "0";//原密码输入错误，修改失败
            System.out.println(code);
            return code;
        }
    }
//找回密码
    public String findPassword(String newPassword, String email) {
        String code;
        User user = userMapper.findUserByEmail(email);
        System.out.println(user.toString());
        System.out.println(user.getSalt());

        System.out.println(user.getPassword().toString());
        Md5Hash md5Hash1 = new Md5Hash(newPassword, user.getSalt(), 1024);
        userMapper.updatePassword(user.getUserId(), md5Hash1.toHex());
        userMapper.setZero(user.getUserId());
        code = "success";
        System.out.println(code);
        return code;
    }

    /**
     * 修改个人信息
     *
     * @param user
     * @return
     */
    @Override
    public User userUpdate(User user) {
        userMapper.userUpdate(user);
        User user1 = userMapper.findUserByUserId(user.getUserId());
        return user1;
    }
    /**
     * 邮箱是否存在
     * @param email
     * @return
     */
    public User emailExist(String email){
        return userMapper.findUserByEmail(email);
    }
    //管理员

    @Override
    public PageInfo<User> findUser(Integer currentPage, String vagueName) {
        PageInfo<User> pageInfo = new PageInfo<>();
        //每一列的数量
        pageInfo.setSize(5);

        //num为查询数据库得到的总行数
        int num = userMapper.getTotalCount(vagueName);
        pageInfo.setTotalCount(num);

        //pages为总页数
        int pages = (int) Math.ceil(num / 5.0);
        pageInfo.setTotalPage(pages);

        if(pages==0){
            PageInfo<User> pageInfo1 = null;
            return  pageInfo1;
        } else{
            if (currentPage < 1) {
                pageInfo.setCurrentPage(1);
            } else if (currentPage > pages) {
                pageInfo.setCurrentPage(pages);
            } else {
                pageInfo.setCurrentPage(currentPage);
            }

            int start = (pageInfo.getCurrentPage() - 1) * 5;
            List<User> userList = userMapper.findUser(start, vagueName);
            pageInfo.setList(userList);
            return pageInfo;
        }
    }

    @Override
    public PageInfo<User> findAll(Integer currentPage) {
        PageInfo<User> pageInfo = new PageInfo<>();
        //每一列的数量
        pageInfo.setSize(5);

        //num为查询数据库得到的总行数
        int num = userMapper.getTotalCount1();
        pageInfo.setTotalCount(num);

        //pages为总页数
        int pages = (int) Math.ceil(num / 5.0);
        pageInfo.setTotalPage(pages);

        if (currentPage < 1) {
            pageInfo.setCurrentPage(1);
        } else if (currentPage > pages) {
            pageInfo.setCurrentPage(pages);
        } else {
            pageInfo.setCurrentPage(currentPage);
        }

        int start = (pageInfo.getCurrentPage() - 1) * 5;
        List<User> userList = userMapper.findAll(start);
        pageInfo.setList(userList);
        return pageInfo;
    }

    @Override
    public void updatePerms(User user) {
        userMapper.updatePerms(user);
    }

    @Override
    public User findUserById(int userId) {
        User user = userMapper.findUserById(userId);
        return user;
    }

    @Override
    public void deleteUser(int userId) {
        userMapper.deleteUser(userId);
    }

    @Override
    public User findUserByUserId(int userId) {
        return userMapper.findUserByUserId(userId);
    }
    @Override
    public void  whetherChange(int userId){userMapper.whetherChange(userId);}

}