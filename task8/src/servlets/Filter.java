package servlets;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

public class Filter implements javax.servlet.Filter {
    @Override
    public void init(FilterConfig filterConfig){
    }
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException{
        long start=System.currentTimeMillis();
        chain.doFilter(request,response);
        long end=System.currentTimeMillis();
        HttpServletRequest httpRequest=(HttpServletRequest) request;
        String path=httpRequest.getRequestURL().toString();
        String method=httpRequest.getMethod();
        System.out.println(method+" "+path+" "+(end-start)+"ms");
    }
    @Override
    public void destroy(){
    }
}