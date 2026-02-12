import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Upload, ChevronRight } from 'lucide-react-native';

const SettingsPage: React.FC = () => {
  const handleImportGPX = () => {
    Alert.alert(
      '匯入 GPX 檔案',
      '正在開啟檔案瀏覽器...\n請選擇您的 GPX 檔案進行匯入。',
      [{ text: '確定' }]
    );
  };

  const handlePrivacyPolicy = () => {
    Alert.alert('隱私權政策', '隱私權政策內容', [{ text: '確定' }]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>設定</Text>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>資料管理</Text>
          <TouchableOpacity 
            style={styles.settingCard}
            onPress={handleImportGPX}
            activeOpacity={0.8}
          >
            <View style={styles.settingContent}>
              <View style={styles.iconCircle}>
                <Upload size={20} color="#60A5FA" />
              </View>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>匯入 GPX 檔案</Text>
                <Text style={styles.settingDescription}>
                  將外部軌跡資料匯入您的探索地圖
                </Text>
              </View>
            </View>
            <ChevronRight size={18} color="#4B5563" />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>關於</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>版本</Text>
              <Text style={styles.infoValue}>1.0.0 (Expo Go)</Text>
            </View>
            <View style={styles.divider} />
            <TouchableOpacity 
              style={styles.infoRow}
              onPress={handlePrivacyPolicy}
              activeOpacity={0.8}
            >
              <Text style={styles.infoLabel}>隱私權政策</Text>
              <Text style={styles.linkText}>查看</Text>
            </TouchableOpacity>
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
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1F2937',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 16,
  },
  settingCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingInfo: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#E5E7EB',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 12,
    color: '#6B7280',
  },
  infoCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    overflow: 'hidden',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#1F2937',
  },
  infoLabel: {
    fontSize: 16,
    color: '#D1D5DB',
  },
  infoValue: {
    fontSize: 14,
    color: '#6B7280',
  },
  linkText: {
    fontSize: 14,
    color: '#60A5FA',
  },
});

export default SettingsPage;

