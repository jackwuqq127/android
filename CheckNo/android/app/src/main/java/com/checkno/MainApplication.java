package com.checkno;

import android.app.Application;
import android.content.Context;
import android.os.Environment;

import com.checkno.module.RegPackage;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import org.pgsqlite.SQLitePluginPackage;

import java.io.File;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import static com.checkno.MainApplication.dataFile;

public class MainApplication extends Application implements ReactApplication {
  public static Context context;
  public static File dataFile;

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new RegPackage(),
          new SQLitePluginPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);

    //Sdcard
    File sdcardDir= Environment.getExternalStorageDirectory();
    File checkNoDir=new File(sdcardDir,"CheckNo");
    try {
      if(!checkNoDir.exists()){
        checkNoDir.mkdirs();
      }

      File dataFile=new File(checkNoDir,"data.db");
      if(!dataFile.exists()){
        dataFile.createNewFile();
      }
      this.dataFile=dataFile;
    } catch (IOException e) {
      e.printStackTrace();
    }
  }
}
