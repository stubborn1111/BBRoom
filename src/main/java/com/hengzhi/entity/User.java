package com.hengzhi.entity;
public class User {
    //用户id
    private int userId;

    //用户名
    private String username;

    //用户密码
    private String password;

    //用户邮箱
    private String email;

    //用户权限，默认user(普通用户)，admin是管理员
    private String perms;

    //用户性别
    private String sex;

    //用户职业
    private String profession;

    //用户密码输错次数
    private int number;

    //用户是否需要重设密码，需要(YES)则不能登录，验证身份重设密码方可登录
    private String whetherChange;

    private String headImageUrl;

    public String getHeadImageUrl() {
        return headImageUrl;
    }

    public void setHeadImageUrl(String headImageUrl) {
        this.headImageUrl = headImageUrl;
    }

    //盐，加密使用
    private String salt;

    public User() {
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getSex() {
        return sex;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPerms() {
        return perms;
    }

    public void setPerms(String perms) {
        this.perms = perms;
    }

    public String getProfession() {
        return profession;
    }

    public void setProfession(String profession) {
        this.profession = profession;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public String getWhetherChange() {
        return whetherChange;
    }

    public void setWhetherChange(String whetherChange) {
        this.whetherChange = whetherChange;
    }

    public String getSalt() {
        return salt;
    }

    public void setSalt(String salt) {
        this.salt = salt;
    }

    @Override
    public String toString() {
        return "User{" +
                "userId=" + userId +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", email='" + email + '\'' +
                ", perms='" + perms + '\'' +
                ", sex='" + sex + '\'' +
                ", profession='" + profession + '\'' +
                ", number=" + number +
                ", whetherChange='" + whetherChange + '\'' +
                ", headImageUrl='" + headImageUrl + '\'' +
                ", salt='" + salt + '\'' +
                '}';
    }
}
