import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Globe, MapPin, Compass, Navigation2, Activity, Zap, Wind } from 'lucide-react-native';

interface ContinentStat {
  name: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
  progress: number;
  area: number;
}

const Statistics: React.FC = () => {
  const stats: ContinentStat[] = [
    { name: '亞洲', icon: Globe, progress: 0.00001245, area: 12.4 },
    { name: '歐洲', icon: Compass, progress: 0.00000512, area: 5.2 },
    { name: '北美洲', icon: MapPin, progress: 0, area: 0 },
    { name: '南美洲', icon: Navigation2, progress: 0, area: 0 },
    { name: '非洲', icon: Activity, progress: 0, area: 0 },
    { name: '大洋洲', icon: Zap, progress: 0, area: 0 },
    { name: '南極洲', icon: Wind, progress: 0, area: 0 },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>個人統計數據</Text>
      </View>
      
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <View key={item.name} style={styles.statCard}>
              <View style={styles.iconContainer}>
                <Icon size={20} color="#9CA3AF" />
              </View>
              <View style={styles.statContent}>
                <View style={styles.statHeader}>
                  <Text style={styles.continentName}>{item.name}</Text>
                  <Text style={styles.percentage}>
                    {item.progress.toFixed(8)}%
                  </Text>
                </View>
                <View style={styles.progressBarContainer}>
                  <View 
                    style={[
                      styles.progressBar, 
                      { width: `${Math.max(item.progress * 10000, 2)}%` }
                    ]} 
                  />
                </View>
                <View style={styles.areaInfo}>
                  <Text style={styles.areaLabel}>已探索面積</Text>
                  <Text style={styles.areaValue}>{item.area.toLocaleString()} 平方公里</Text>
                </View>
              </View>
            </View>
          );
        })}

        <View style={styles.footer}>
          <View style={styles.footerCard}>
            <Text style={styles.footerText}>
              繼續探索，解鎖更多地塊！
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    paddingTop: 48,
    paddingBottom: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  statCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 24,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#111111',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statContent: {
    flex: 1,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 4,
  },
  continentName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#E5E7EB',
  },
  percentage: {
    fontSize: 11,
    fontFamily: 'monospace',
    color: '#60A5FA',
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: '#111111',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#3B82F6',
    borderRadius: 3,
  },
  areaInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  areaLabel: {
    fontSize: 10,
    color: '#6B7280',
  },
  areaValue: {
    fontSize: 10,
    color: '#D1D5DB',
  },
  footer: {
    paddingTop: 32,
    paddingBottom: 16,
  },
  footerCard: {
    backgroundColor: 'rgba(37, 99, 235, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.2)',
    borderRadius: 12,
    padding: 16,
  },
  footerText: {
    fontSize: 12,
    color: '#60A5FA',
    textAlign: 'center',
  },
});

export default Statistics;

