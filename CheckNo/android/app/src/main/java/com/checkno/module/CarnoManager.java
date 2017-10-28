package com.checkno.module;

import android.app.Activity;
import android.app.ActivityManager;
import android.content.Context;
import android.content.res.Resources;
import android.widget.Toast;

import com.checkno.MainApplication;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.uimanager.IllegalViewOperationException;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.Reader;
import java.io.Writer;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by wu-chao on 2017/10/24.
 * 创建原生模块
 */

public class CarnoManager extends ReactContextBaseJavaModule {
    public CarnoManager(ReactApplicationContext reactContext){
        super(reactContext);
    }

    @Override
    public String getName() {
        return "Carmgr";
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        return constants;
    }

    @ReactMethod //无返回值
    public void getPackageName(){
        String name=getReactApplicationContext().getPackageName();
        Toast.makeText(getReactApplicationContext(),name,Toast.LENGTH_LONG).show();
    }

    @ReactMethod
    public void saveCar(String name,String carno,String phoneno,Callback callback){
        String data=name+","+carno+","+phoneno;

        try {
            File dataFile=MainApplication.dataFile;
            Writer writer=new OutputStreamWriter( new FileOutputStream(dataFile,true) );
            BufferedWriter bw=new BufferedWriter(writer);
            bw.write(data);
            bw.newLine();
            bw.flush();
            bw.close();

        } catch (IOException e) {
            e.printStackTrace();
        }
        callback.invoke("数据添加成功！");
    }

    @ReactMethod
    public void dataList(Callback callback){
        //SQLiteDatabase


        File dataFile=MainApplication.dataFile;
        try {
            Reader reader=new FileReader(dataFile);
            BufferedReader br=new BufferedReader(reader);
            List<Map> list=new ArrayList<>();
            JSONObject obj=null;
            String data;
            JSONArray jsonArray=new JSONArray();
            while( (data=br.readLine())!=null ){
                obj=new JSONObject();

                String[] dataArray=data.split(",");
                obj.put("name",dataArray[0]);
                obj.put("carno",dataArray[1]);
                obj.put("phoneno",dataArray[2]);

                jsonArray.put(obj);
            }
            //System.out.println(list.toString());
            callback.invoke(jsonArray.toString());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
