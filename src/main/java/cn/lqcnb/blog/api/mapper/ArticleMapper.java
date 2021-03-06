package cn.lqcnb.blog.api.mapper;

import cn.lqcnb.blog.api.entity.Article;
import org.apache.ibatis.annotations.Select;
import tk.mybatis.mapper.common.Mapper;

import java.util.List;
import java.util.Map;

public interface ArticleMapper extends Mapper<Article> {
    public List<Map> getArticlesByMid(Integer mid);
    public List<Map> getArticles();
    public Map getArticleById(Integer id);
    public List<Map> getArticlesByTitle(String title);
    @Select("select * from article ORDER BY RAND() LIMIT #{limit}")
    public List<Article> getRandArticle(int limit);
}