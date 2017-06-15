# geo
Geolocation with react native react-native.

## enableHighAccuracy
Had to change boolean highAccuracy = true; in LocationModule.java
```java
private static LocationOptions fromReactMap(ReadableMap map) {
      // precision might be dropped on timeout (double -> int conversion), but that's OK
      long timeout =
          map.hasKey("timeout") ? (long) map.getDouble("timeout") : Long.MAX_VALUE;
      double maximumAge =
          map.hasKey("maximumAge") ? map.getDouble("maximumAge") : Double.POSITIVE_INFINITY;
      boolean highAccuracy = true;
          // map.hasKey("enableHighAccuracy") && map.getBoolean("enableHighAccuracy");
      float distanceFilter = map.hasKey("distanceFilter") ?
        (float) map.getDouble("distanceFilter") :
        RCT_DEFAULT_LOCATION_ACCURACY;

      return new LocationOptions(timeout, maximumAge, highAccuracy, distanceFilter);
    }
  }
```

# shots
![](https://github.com/clint-gitahi/geo/blob/master/imgs/Screenshot_20170615-175719.png)
