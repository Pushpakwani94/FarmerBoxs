import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, StatusBar } from 'react-native';

export default function App() {
  const [activeTab, setActiveTab] = useState<'Home' | 'Hotels' | 'Earnings' | 'NewOrder'>('Home');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0b7537" />
      
      {/* App Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>FarmerBox Joiner</Text>
        <Text style={styles.headerSubtitle}>Kharadi Zone • Rahul Patil</Text>
      </View>

      {/* Main Body Content */}
      <ScrollView style={styles.content}>
        {activeTab === 'Home' && (
          <View style={styles.cardGroup}>
            <View style={styles.metricCard}>
              <Text style={styles.cardLabel}>Hotels Onboarded</Text>
              <Text style={styles.cardValue}>28</Text>
              <Text style={styles.cardSub}>↑ +4 this month</Text>
            </View>

            <View style={[styles.metricCard, { backgroundColor: '#e0f2fe' }]}>
              <Text style={styles.cardLabel}>Weekly Commission Earned</Text>
              <Text style={[styles.cardValue, { color: '#0369a1' }]}>₹4,200</Text>
              <Text style={styles.cardSub}>42 orders delivered</Text>
            </View>

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent Hotel Deliveries</Text>
            </View>

            <View style={styles.listItem}>
              <Text style={styles.itemTitle}>Hotel Spice Villa</Text>
              <Text style={styles.itemSub}>Order #FB1001 • ₹2,500</Text>
              <Text style={styles.badgeSuccess}>Commission +₹100</Text>
            </View>

            <View style={styles.listItem}>
              <Text style={styles.itemTitle}>Hotel Maharaja</Text>
              <Text style={styles.itemSub}>Order #FB1004 • ₹2,100</Text>
              <Text style={styles.badgePending}>Delivery Pending</Text>
            </View>
          </View>
        )}

        {activeTab === 'Hotels' && (
          <View style={styles.cardGroup}>
            <Text style={styles.sectionTitle}>My Onboarded Hotels</Text>
            <View style={styles.listItem}>
              <Text style={styles.itemTitle}>1. Hotel Spice Villa</Text>
              <Text style={styles.itemSub}>Contact: Rajesh Sharma • 142 Orders</Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.itemTitle}>2. Hotel Maharaja</Text>
              <Text style={styles.itemSub}>Contact: Mahesh Deshmukh • 115 Orders</Text>
            </View>
          </View>
        )}

        {activeTab === 'Earnings' && (
          <View style={styles.cardGroup}>
            <Text style={styles.sectionTitle}>Commission Breakdown (₹100/Order)</Text>
            <View style={styles.metricCard}>
              <Text style={styles.cardLabel}>Total Lifetime Earnings</Text>
              <Text style={styles.cardValue}>₹42,000</Text>
              <Text style={styles.cardSub}>420 completed orders</Text>
            </View>
          </View>
        )}

        {activeTab === 'NewOrder' && (
          <View style={styles.cardGroup}>
            <Text style={styles.sectionTitle}>Place Order for Hotel</Text>
            <Text style={{ color: '#64748b', fontSize: 13 }}>Select hotel and vegetable crates to instantly dispatch fresh veggies from farm to hotel kitchen.</Text>
          </View>
        )}
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('Home')}>
          <Text style={[styles.navText, activeTab === 'Home' && styles.activeNavText]}>Dashboard</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('Hotels')}>
          <Text style={[styles.navText, activeTab === 'Hotels' && styles.activeNavText]}>My Hotels</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('Earnings')}>
          <Text style={[styles.navText, activeTab === 'Earnings' && styles.activeNavText]}>Earnings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('NewOrder')}>
          <Text style={[styles.navText, activeTab === 'NewOrder' && styles.activeNavText]}>+ New Order</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    backgroundColor: '#0b7537',
    padding: 16,
    paddingTop: 20,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: '#dcfce7',
    fontSize: 12,
    marginTop: 2,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  cardGroup: {
    gap: 12,
  },
  metricCard: {
    backgroundColor: '#dcfce7',
    padding: 16,
    borderRadius: 12,
  },
  cardLabel: {
    fontSize: 12,
    color: '#166534',
    fontWeight: '600',
  },
  cardValue: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#14532d',
    marginVertical: 4,
  },
  cardSub: {
    fontSize: 11,
    color: '#15803d',
  },
  sectionHeader: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  listItem: {
    backgroundColor: '#ffffff',
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 8,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  itemSub: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  badgeSuccess: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#15803d',
    marginTop: 4,
  },
  badgePending: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#b45309',
    marginTop: 4,
  },
  navBar: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingVertical: 12,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
  },
  activeNavText: {
    color: '#0b7537',
    fontWeight: 'bold',
  },
});
