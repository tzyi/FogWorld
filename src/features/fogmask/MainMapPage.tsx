/**
 * MainMapPage Component
 * 主地圖頁面 - 整合 Google Map、迷霧遮罩與探索功能
 */

import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { colors, spacing } from '../../../theme';
import { FogMask } from '../components/FogMask';
import { ExploreButton } from '../components/ExploreButton';
import { Statistics } from '../components/Statistics';
import { useFogMask } from '../hooks/useFogMask';
import { useTrackRecorder } from '../hooks/useTrackRecorder';
import { useErrorHandler } from '../hooks/useErrorHandler';
import { useFogMaskStore } from '../store';
import { ExploreStatus, MapRegion } from '../types';

const INITIAL_REGION: MapRegion = {
  latitude: 25.033,
  longitude: 121.5654,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

/**
 * MainMapPage 元件
 * 主地圖頁面，顯示 Google Map、迷霧遮罩、探索按鈕
 */
export const MainMapPage: React.FC = () => {
  const mapRef = useRef<MapView>(null);
  const [loading, setLoading] = useState(false);

  const {
    exploreStatus,
    setExploreStatus,
    currentLocation,
    mapRegion,
    setMapRegion,
    error,
    clearError,
  } = useFogMaskStore();

  const { startLocationTracking, stopLocationTracking } = useFogMask({
    gridRows: 50,
    gridCols: 50,
    updateInterval: 5000,
  });

  // 軌跡記錄 Hook
  useTrackRecorder({
    recordInterval: 5000,
    minDistance: 10,
  });

  // 錯誤處理 Hook
  useErrorHandler({
    autoShowAlert: true,
  });

  /**
   * 處理探索按鈕點擊
   */
  const handleExplorePress = async () => {
    if (exploreStatus === ExploreStatus.EXPLORING) {
      // 停止探索
      stopLocationTracking();
      setExploreStatus(ExploreStatus.IDLE);
    } else {
      // 開始探索
      setLoading(true);
      const success = await startLocationTracking();
      setLoading(false);

      if (success) {
        setExploreStatus(ExploreStatus.EXPLORING);
      }
    }
  };

  /**
   * 當前位置變化時，地圖跟隨移動
   */
  useEffect(() => {
    if (currentLocation && mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        1000
      );（由 useErrorHandler 處理，這裡保留作為備用）
   */
  useEffect(() => {
    // 錯誤已由 useErrorHandler 處理   {
          text: '確定',
          onPress: () => clearError(),
        },
      ]);
    }
  }, [error, clearError]);

  /**
   * 計算地圖邊界
   */
  const mapBounds = mapRegion
    ? {
        northeast: {
          latitude: mapRegion.latitude + mapRegion.latitudeDelta / 2,
          longitude: mapRegion.longitude + mapRegion.longitudeDelta / 2,
        },
        southwest: {
          latitude: mapRegion.latitude - mapRegion.latitudeDelta / 2,
          longitude: mapRegion.longitude - mapRegion.longitudeDelta / 2,
        },
      }
    : {
        northeast: {
          latitude: INITIAL_REGION.latitude + INITIAL_REGION.latitudeDelta / 2,
          longitude: INITIAL_REGION.longitude + INITIAL_REGION.longitudeDelta / 2,
        },
        southwest: {
          latitude: INITIAL_REGION.latitude - INITIAL_REGION.latitudeDelta / 2,
          longitude: INITIAL_REGION.longitude - INITIAL_REGION.longitudeDelta / 2,
        },
      };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={INITIAL_REGION}
        onRegionChangeComplete={(region) => setMapRegion(region)}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
      >
        {/* 迷霧遮罩 */}
        <FogMask bounds={mapBounds} />

        {/* 當前位置標記 */}
        {currentLocation && (
          <Marker
            coordinate={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
            }}
            title="當前位置"
          />
        )}
      </MapView>

      {/* 探索按鈕 */}
      <View style={styles.buttonContainer}>
        <ExploreButton onPress={handleExplorePress} loading={loading} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

      {/* 統計資訊 */}
      <View style={styles.statsContainer}>
        <Statistics bounds={mapBounds} />
      </View>
    backgroundColor: colors.dark.background,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: spacing.xxl,
    alignSelf: 'center',
  },
});
  statsContainer: {
    position: 'absolute',
    top: spacing.xxl,
    left: 0,
    right: 0,
  },
