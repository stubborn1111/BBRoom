package com.hengzhi.common.shiro;


import com.hengzhi.entity.User;
import com.hengzhi.service.UserService;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.util.ByteSource;
import org.apache.shiro.util.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.ObjectUtils;

import java.util.List;

public class UserRealm extends AuthorizingRealm {

    @Autowired
    private UserService userService;

    //授权————编程式、注解式、标签式
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection) {
        //获取身份信息
        String principal = (String) principalCollection.getPrimaryPrincipal();
        User user = userService.findByEmail(principal);
        //授权角色信息
        if(user.getPerms()!=null){
            SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();
            info.addRole(user.getPerms());
            return info;
        }
        return null;
    }

    //认证
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
        System.out.println("=============");
        String principal = (String) token.getPrincipal();
        User user = userService.findByEmail(principal);
        System.out.println("user:"+user.toString());
        if (!ObjectUtils.isEmpty(user)) {
            return new SimpleAuthenticationInfo(user.getEmail(), user.getPassword(), ByteSource.Util.bytes(user.getSalt()), this.getName());
        }
        return null;
    }
}
