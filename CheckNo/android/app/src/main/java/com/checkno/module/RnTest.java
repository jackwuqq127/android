package com.checkno.module;

import android.widget.Toast;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.uimanager.IllegalViewOperationException;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by wu-chao on 2017/10/24.
 * 创建原生模块
 */

public class RnTest extends ReactContextBaseJavaModule {
    public RnTest(ReactApplicationContext reactContext){
        super(reactContext);
    }

    @Override
    public String getName() {
        return "ToastExample";
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        //constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
        //constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
        return constants;
    }

    @ReactMethod //无返回值
    public void getPackageName(){
        System.out.println("android 被调用了！");
        String name=getReactApplicationContext().getPackageName();
        Toast.makeText(getReactApplicationContext(),name,Toast.LENGTH_LONG).show();
    }

    @ReactMethod
    public void tryCallBack(String carNo,Callback errorCallback,Callback successCallback){
        try{
            // 成功时回调
            successCallback.invoke("你输入的车牌号是："+carNo);
        }catch(Exception e){
            // 失败时回调
            errorCallback.invoke(e.getMessage());
        }
    }
}
