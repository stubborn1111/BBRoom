package com.hengzhi.common;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class CrossOriginFilter implements Filter {

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
//        filterChain.doFilter(servletRequest, servletResponse);
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;
        //允许跨域的域名，*号为允许所有,存在被 DDoS攻击的可能。
        response.setHeader("Access-Control-Allow-Origin", request.getHeader("Origin"));

        //表明服务器支持的所有头信息字段
        response.setHeader("Access-Control-Allow-Headers",
                "Origin," +
                        "Access-Control-Request-Headers," +
                        "Access-Control-Allow-Headers," +
                        "DNT," +
                        "X-Requested-With," +
                        "X-Mx-ReqToken," +
                        "Keep-Alive," +
                        "User-Agent," +
                        "X-Requested-With," +
                        "If-Modified-Since," +
                        "Cache-Control," +
                        "Content-Type," +
                        "Accept," +
                        "Connection," +
                        "Cookie," +
                        "X-XSRF-TOKEN," +
                        "X-CSRF-TOKEN," +
                        "Authorization,"+
                        "token"
        );

        //如果需要把Cookie发到服务端，需要指定Access-Control-Allow-Credentials字段为true;
        response.setHeader("Access-Control-Allow-Credentials", "true");

        //首部字段 Access-Control-Allow-Methods 表明服务器允许客户端使用 POST, GET 和 OPTIONS 方法发起请求。
        //该字段与 HTTP/1.1 Allow: response header 类似，但仅限于在需要访问控制的场景中使用。
        response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");

        //表明该响应的有效时间为 86400 秒，也就是 24 小时。在有效时间内，浏览器无须为同一请求再次发起预检请求。
        //请注意，浏览器自身维护了一个最大有效时间，如果该首部字段的值超过了最大有效时间，将不会生效。
        response.setHeader("Access-Control-Max-Age", "86400");

        // IE8 引入XDomainRequest跨站数据获取功能,也就是说为了兼容IE
        response.setHeader("XDomainRequestAllowed", "1");

        //暴露Token
        response.setHeader("Access-Control-Expose-Headers","token");
//        response.setHeader("Access-Control-Allow-Headers", "Content-Type,XFILENAME,XFILECATEGORY,XFILESIZE");

        //filter chain
        filterChain.doFilter(servletRequest, servletResponse);
        return;
    }

    @Override
    public void destroy() {

    }
}