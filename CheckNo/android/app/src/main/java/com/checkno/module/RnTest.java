package com.checkno.module;

import android.widget.Toast;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

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
        return "TestAndroid";
    }

    @ReactMethod
    public void getPackageName(){
        String name=getReactApplicationContext().getPackageName();
        Toast.makeText(getReactApplicationContext(),name,Toast.LENGTH_LONG).show();
    }
}
