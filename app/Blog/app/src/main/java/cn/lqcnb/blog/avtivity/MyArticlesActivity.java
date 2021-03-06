package cn.lqcnb.blog.avtivity;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ListView;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.TypeReference;
import com.zhy.http.okhttp.OkHttpUtils;
import com.zhy.http.okhttp.callback.StringCallback;

import java.io.Serializable;
import java.util.List;

import cn.lqcnb.blog.R;
import cn.lqcnb.blog.adapter.ArticleAdapt;
import cn.lqcnb.blog.entity.Article;
import cn.lqcnb.blog.utils.Constants;
import okhttp3.Call;

public class MyArticlesActivity extends AppCompatActivity {
    private static final String TAG = "MyArticlesActivity";
    private ListView lv_data;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_my_articles);
        lv_data=findViewById(R.id.lv_data);
        getDataFromNet();

    }
    private void getDataFromNet() {
//        Intent intent = getIntent();
//        String id = intent.getStringExtra("id");
        OkHttpUtils.get().url(Constants.getArticles).build().execute(new StringCallback() {
            @Override
            public void onError(Call call, Exception e) {
                Log.d(TAG, "文章数据网络请求失败，失败原因：" + e.getMessage());
            }

            @Override
            public void onResponse(String response) {
                List<Article> articles = JSONArray.parseObject(response, new TypeReference<List<Article>>() {
                });
                Log.d(TAG, "onResponse->articles: " + articles.toString());
                lv_data.setAdapter(new ArticleAdapt(MyArticlesActivity.this, articles));
                lv_data.setOnItemClickListener(new AdapterView.OnItemClickListener() {
                    @Override
                    public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                        Intent intent = new Intent(MyArticlesActivity.this, DetailActivity.class);
                        intent.putExtra("data", (Serializable) articles.get(position));
                        startActivity(intent);
                    }
                });
            }
        });
    }
}
