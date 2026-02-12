import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Download, Edit2, FileText, CheckCircle2 } from 'lucide-react-native';

const SyncPage: React.FC = () => {
  const currentFileName = "Snapshot-20231202T224657+1300.gpx";

  const handleRename = () => {
    console.log('重新命名');
  };

  const handleDownload = () => {
    console.log('下載到本機');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>儲存紀錄</Text>
      </View>

      <ScrollView 
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.centerContent}>
          <View style={styles.iconWrapper}>
            <View style={styles.iconCircle}>
              <FileText size={36} color="#3B82F6" />
            </View>
          </View>
          
          <View style={styles.fileInfo}>
            <Text style={styles.fileLabel}>目前紀錄檔名</Text>
            <Text style={styles.fileName}>
              {currentFileName}
            </Text>
            <TouchableOpacity 
              style={styles.renameButton}
              onPress={handleRename}
              activeOpacity={0.8}
            >
              <Edit2 size={14} color="#60A5FA" />
              <Text style={styles.renameText}>重新命名</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.actionSection}>
          <TouchableOpacity 
            style={styles.downloadButton}
            onPress={handleDownload}
            activeOpacity={0.95}
          >
            <Download size={20} color="#000000" />
            <Text style={styles.downloadText}>下載到本機</Text>
          </TouchableOpacity>
          
          <View style={styles.syncStatus}>
            <CheckCircle2 size={14} color="#10B981" />
            <Text style={styles.syncText}>已與雲端同步</Text>
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
    backgroundColor: '#111111',
    borderBottomWidth: 1,
    borderBottomColor: '#1F2937',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  centerContent: {
    alignItems: 'center',
    marginBottom: 48,
  },
  iconWrapper: {
    marginBottom: 24,
  },
  iconCircle: {
    width: 80,
    height: 80,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderRadius: 40,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fileInfo: {
    alignItems: 'center',
  },
  fileLabel: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 8,
  },
  fileName: {
    fontSize: 14,
    color: '#FFFFFF',
    fontFamily: 'monospace',
    textAlign: 'center',
    maxWidth: 280,
    marginBottom: 8,
  },
  renameButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 8,
  },
  renameText: {
    fontSize: 14,
    color: '#60A5FA',
  },
  actionSection: {
    width: '100%',
  },
  downloadButton: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  downloadText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  syncStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 16,
  },
  syncText: {
    fontSize: 12,
    color: '#6B7280',
  },
});

export default SyncPage;

