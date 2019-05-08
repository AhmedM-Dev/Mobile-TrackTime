package com.tracktimewithoutredux;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.wheelpicker.WheelPickerPackage;
import com.zyu.ReactNativeWheelPickerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.horcrux.svg.SvgPackage;
import com.swmansion.reanimated.ReanimatedPackage;
import com.imagepicker.ImagePickerPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.bluroverly.SajjadBlurOverlayPackage;
import com.cardio.RNCardIOPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new WheelPickerPackage(),
            new ReactNativeWheelPickerPackage(),
            new VectorIconsPackage(),
            new SvgPackage(),
            new ReanimatedPackage(),
            new ImagePickerPackage(),
            new RNGestureHandlerPackage(),
            new SajjadBlurOverlayPackage(),
            new RNCardIOPackage()
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
  }
}
