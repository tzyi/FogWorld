import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, PermissionsAndroid, Platform } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { LocateFixed } from 'lucide-react-native';
import Geolocation from 'react-native-geolocation-service';

const Dashboard: React.FC = () => {
  const [isExploring, setIsExploring] = useState(false);
  // region 狀態化
  const [region, setRegion] = useState<Region>({
    latitude: 25.033,
    longitude: 121.5654,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });
  // loading 與錯誤狀態
  const [locating, setLocating] = useState(false);
  const [locateError, setLocateError] = useState<string | null>(null);

  // 權限請求
  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const handleLocate = async () => {
    setLocating(true);
    setLocateError(null);
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      Alert.alert('定位失敗', '未取得定位權限', [{ text: '確定' }]);
      setLocating(false);
      return;
    }
    Geolocation.getCurrentPosition(
      (pos) => {
        setRegion((prev) => ({
          ...prev,
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        }));
        setLocating(false);
      },
      (err) => {
        Alert.alert('定位失敗', '定位失敗，請確認權限已開啟', [{ text: '確定' }]);
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 }
    );
  };

  return (
    <View style={styles.container}>
      {/* 地圖背景 */}
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}
      />

      {/* 迷霧遮罩效果 */}
      <View style={styles.fogOverlay} pointerEvents="none" />

      {/* T008: 定位按鈕 */}
      <View style={styles.locateButtonContainer} pointerEvents="box-none">
        <TouchableOpacity
          onPress={handleLocate}
          style={styles.locateButton}
          activeOpacity={0.95}
          disabled={locating}
        >
          {locating ? (
            <Text style={{ color: '#60A5FA', fontSize: 16 }}>...</Text>
          ) : (
            <LocateFixed size={24} color="#60A5FA" />
          )}
        </TouchableOpacity>
        {locateError && (
          <Text style={{ color: '#EF4444', fontSize: 12, marginTop: 4 }}>{locateError}</Text>
        )}
      </View>

      {/* T007: 使用者位置藍點 */}
      <View style={styles.userLocationDot} pointerEvents="box-none">
        <View style={styles.blueDot} />
      </View>

      {/* T009 & T010: 底部狀態欄 */}
      <View style={styles.statsOverlay} pointerEvents="box-none">
        <View style={styles.statsCard}>
          {/* 統計資訊網格 */}
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>目前等級</Text>
              <Text style={styles.statValue}>等級 1</Text>
            </View>
            <View style={[styles.statItem, styles.statItemRight]}>
              <Text style={[styles.statLabel, styles.textRight]}>探索比例</Text>
              <Text style={[styles.statValuePercent, styles.textRight]}>
                0.00001234%
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>今日里程</Text>
              <Text style={styles.statValueSmall}>0.00 km</Text>
            </View>
            <View style={[styles.statItem, styles.statItemRight]}>
              <Text style={[styles.statLabel, styles.textRight]}>累積里程</Text>
              <Text style={[styles.statValueSmall, styles.textRight]}>12.45 km</Text>
            </View>
          </View>

          {/* T010: 開始/停止探索按鈕 */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => setIsExploring(!isExploring)}
              style={[
                styles.exploreButton,
                isExploring ? styles.exploreButtonActive : styles.exploreButtonInactive,
              ]}
              activeOpacity={0.95}
            >
              <View
                style={[
                  styles.buttonDot,
                  isExploring ? styles.buttonDotActive : styles.buttonDotInactive,
                ]}
              />
              <Text
                style={[
                  styles.buttonText,
                  isExploring ? styles.buttonTextActive : styles.buttonTextInactive,
                ]}
              >
                {isExploring ? '停止探索' : '開始探索'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e293b',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  // 迷霧遮罩效果（T007）
  fogOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
  },
  // T008: 定位按鈕
  locateButtonContainer: {
    position: 'absolute',
    bottom: 205,
    right: 16,
    zIndex: 20,
  },
  locateButton: {
    width: 48,
    height: 48,
    backgroundColor: 'rgba(26, 26, 26, 0.9)',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#374151',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  // T007: 使用者位置藍點
  userLocationDot: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -8,
    marginTop: -8,
    zIndex: 10,
  },
  blueDot: {
    width: 16,
    height: 16,
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
  },
  // T009: 底部狀態欄
  statsOverlay: {
    position: 'absolute',
    bottom: 6,
    left: 6,
    right: 6,
    zIndex: 10,
  },
  statsCard: {
    backgroundColor: 'rgba(26, 26, 26, 0.95)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#374151',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  statItem: {
    width: '48%',
  },
  statItemRight: {
    alignItems: 'flex-end',
  },
  statLabel: {
    fontSize: 10,
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  statValuePercent: {
    fontSize: 18,
    fontWeight: '500',
    color: '#60A5FA',
    fontFamily: 'monospace',
  },
  statValueSmall: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  textRight: {
    textAlign: 'right',
  },
  // T010: 開始探索按鈕
  buttonContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  exploreButton: {
    width: '100%',
    paddingVertical: 10,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 2
  },
  exploreButtonInactive: {
    backgroundColor: '#DC2626',
    shadowColor: '#DC2626',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    // elevation: 5,
  },
  exploreButtonActive: {
    backgroundColor: 'rgba(220, 38, 38, 0.2)',
    borderWidth: 2,
    borderColor: '#EF4444',
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    // elevation: 3,
  },
  buttonDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  buttonDotInactive: {
    backgroundColor: '#FFFFFF',
  },
  buttonDotActive: {
    backgroundColor: '#EF4444',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonTextInactive: {
    color: '#FFFFFF',
  },
  buttonTextActive: {
    color: '#EF4444',
  },
});

export default Dashboard;
