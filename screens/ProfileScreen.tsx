import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity,
  ScrollView,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function ProfileScreen() {
  const profileData = {
    name: 'Emine Turan',
    email: 'emine.turan@gmail.com',
    bio: 'Edebiyat ve şiir tutkunu. Kitaplar arasında kaybolmayı seven bir okur.',
    image: 'https://api.a0.dev/assets/image?text=Emine+Turan+profile+portrait&aspect=1:1',
    readingStats: {
      booksRead: 127,
      currentlyReading: 3,
      favoriteGenres: ['Roman', 'Şiir', 'Biyografi']
    },
    preferences: {
      theme: 'Açık',
      language: 'Türkçe',
      notifications: true
    }
  };

  const renderStat = (icon: string, label: string, value: string | number) => (
    <View style={styles.statItem}>
      <View style={styles.statIcon}>
        <Feather name={icon as any} size={18} color="#6C63FF" />
      </View>
      <View>
        <Text style={styles.statLabel}>{label}</Text>
        <Text style={styles.statValue}>{value}</Text>
      </View>
    </View>
  );

  const renderMenuItem = (icon: string, title: string, subtitle: string = '') => (
    <TouchableOpacity style={styles.menuItem}>
      <View style={styles.menuIcon}>
        <Feather name={icon as any} size={20} color="#6C63FF" />
      </View>
      <View style={styles.menuContent}>
        <Text style={styles.menuTitle}>{title}</Text>
        {subtitle ? <Text style={styles.menuSubtitle}>{subtitle}</Text> : null}
      </View>
      <Feather name="chevron-right" size={20} color="#999" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profil</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Feather name="settings" size={20} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Image source={{ uri: profileData.image }} style={styles.profileImage} />
          <Text style={styles.profileName}>{profileData.name}</Text>
          <Text style={styles.profileEmail}>{profileData.email}</Text>
          <Text style={styles.profileBio}>{profileData.bio}</Text>
          
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Profili Düzenle</Text>
          </TouchableOpacity>
        </View>

        {/* Stats Section */}
        <View style={styles.statsContainer}>
          <View style={styles.statsHeader}>
            <Text style={styles.sectionTitle}>Okuma İstatistikleri</Text>
          </View>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <MaterialCommunityIcons name="book-open-page-variant" size={28} color="#6C63FF" />
              <Text style={styles.statCardValue}>{profileData.readingStats.booksRead}</Text>
              <Text style={styles.statCardLabel}>Okunan Kitap</Text>
            </View>
            <View style={styles.statCard}>
              <MaterialCommunityIcons name="book-open-variant" size={28} color="#FF9500" />
              <Text style={styles.statCardValue}>{profileData.readingStats.currentlyReading}</Text>
              <Text style={styles.statCardLabel}>Şu an Okunan</Text>
            </View>
            <View style={styles.statCard}>
              <MaterialCommunityIcons name="bookmark-multiple" size={28} color="#34C759" />
              <Text style={styles.statCardValue}>{profileData.readingStats.favoriteGenres.length}</Text>
              <Text style={styles.statCardLabel}>Favori Türler</Text>
            </View>
          </View>
        </View>

        {/* Favorite Genres */}
        <View style={styles.genresContainer}>
          <View style={styles.statsHeader}>
            <Text style={styles.sectionTitle}>Favori Türlerim</Text>
          </View>
          <View style={styles.genresList}>
            {profileData.readingStats.favoriteGenres.map((genre, index) => (
              <View key={index} style={styles.genreTag}>
                <Text style={styles.genreText}>{genre}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Account Menu */}
        <View style={styles.menuContainer}>
          <View style={styles.statsHeader}>
            <Text style={styles.sectionTitle}>Hesap</Text>
          </View>
          
          {renderMenuItem('user', 'Hesap Bilgileri', 'Kişisel bilgilerinizi düzenleyin')}
          {renderMenuItem('bell', 'Bildirimler', profileData.preferences.notifications ? 'Açık' : 'Kapalı')}
          {renderMenuItem('moon', 'Görünüm', profileData.preferences.theme)}
          {renderMenuItem('globe', 'Dil', profileData.preferences.language)}
          {renderMenuItem('help-circle', 'Yardım ve Destek')}
          {renderMenuItem('info', 'Hakkında')}
        </View>

        <TouchableOpacity style={styles.logoutButton}>
          <Feather name="log-out" size={18} color="#FF3B30" />
          <Text style={styles.logoutText}>Çıkış Yap</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  settingsButton: {
    position: 'absolute',
    right: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  profileBio: {
    fontSize: 14,
    color: '#444',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  editButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: '#F0F2F5',
    borderRadius: 20,
  },
  editButtonText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '500',
  },
  statsContainer: {
    backgroundColor: '#fff',
    marginTop: 12,
    paddingBottom: 16,
  },
  statsHeader: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F2F5',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
  },
  statCard: {
    alignItems: 'center',
    padding: 12,
    width: width / 3 - 24,
  },
  statCardValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 6,
  },
  statCardLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  statIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#F0F2F5',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  genresContainer: {
    backgroundColor: '#fff',
    marginTop: 12,
    paddingBottom: 16,
  },
  genresList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  genreTag: {
    backgroundColor: '#EFF1FE',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  genreText: {
    color: '#6C63FF',
    fontSize: 14,
    fontWeight: '500',
  },
  menuContainer: {
    backgroundColor: '#fff',
    marginTop: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F2F5',
  },
  menuIcon: {
    width: 36,
    height: 36,
    backgroundColor: '#F0F2F5',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  menuSubtitle: {
    fontSize: 13,
    color: '#999',
    marginTop: 2,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    marginHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#FEF2F2',
    borderRadius: 8,
  },
  logoutText: {
    color: '#FF3B30',
    fontWeight: '600',
    marginLeft: 8,
    fontSize: 16,
  },
});