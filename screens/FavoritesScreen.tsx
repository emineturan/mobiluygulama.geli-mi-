import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface Book {
  id: string;
  title: string;
  author: string;
  image: string;
  isFavorite: boolean;
}

interface Author {
  id: string;
  name: string;
  image: string;
  description: string;
  isFavorite: boolean;
}

export default function FavoritesScreen() {
  const [activeTab, setActiveTab] = useState<'books' | 'authors'>('books');

  // Sample data for favorite books
  const [favoriteBooks, setFavoriteBooks] = useState<Book[]>([
    { 
      id: '1', 
      title: 'Beyaz Geceler', 
      author: 'Fyodor Dostoyevski', 
      image: 'https://api.a0.dev/assets/image?text=Beyaz+Geceler+book+cover&aspect=2:3',
      isFavorite: true 
    },
    { 
      id: '2', 
      title: 'Sefiller', 
      author: 'Victor Hugo', 
      image: 'https://api.a0.dev/assets/image?text=Sefiller+book+cover&aspect=2:3',
      isFavorite: true 
    },
    { 
      id: '3', 
      title: 'Suç ve Ceza', 
      author: 'Fyodor Dostoyevski', 
      image: 'https://api.a0.dev/assets/image?text=Suç+ve+Ceza+book+cover&aspect=2:3',
      isFavorite: true 
    },
    { 
      id: '4', 
      title: 'Simyacı', 
      author: 'Paulo Coelho', 
      image: 'https://api.a0.dev/assets/image?text=Simyacı+book+cover&aspect=2:3',
      isFavorite: true 
    },
  ]);

  // Sample data for favorite authors
  const [favoriteAuthors, setFavoriteAuthors] = useState<Author[]>([
    {
      id: '1',
      name: 'Fyodor Dostoyevski',
      image: 'https://api.a0.dev/assets/image?text=Fyodor+Dostoyevski+portrait&aspect=1:1',
      description: 'Rus edebiyatının öncü isimlerinden, dünya edebiyatında psikolojik romanın kurucusu sayılan yazar.',
      isFavorite: true
    },
    {
      id: '2',
      name: 'Sabahattin Ali',
      image: 'https://api.a0.dev/assets/image?text=Sabahattin+Ali+portrait&aspect=1:1',
      description: 'Türk hikâye, roman ve şiir yazarı. En tanınmış eserleri arasında Kürk Mantolu Madonna ve İçimizdeki Şeytan bulunur.',
      isFavorite: true
    },
    {
      id: '3',
      name: 'Gabriel Garcia Marquez',
      image: 'https://api.a0.dev/assets/image?text=Gabriel+Garcia+Marquez+portrait&aspect=1:1',
      description: 'Kolombiyalı romancı, kısa öykü yazarı, senarist ve gazeteci. Büyülü gerçekçilik akımının öncü isimlerinden biridir.',
      isFavorite: true
    },
  ]);

  const toggleBookFavorite = (id: string) => {
    setFavoriteBooks(prevBooks => 
      prevBooks.map(book => 
        book.id === id ? { ...book, isFavorite: !book.isFavorite } : book
      ).filter(book => book.isFavorite)
    );
  };

  const toggleAuthorFavorite = (id: string) => {
    setFavoriteAuthors(prevAuthors => 
      prevAuthors.map(author => 
        author.id === id ? { ...author, isFavorite: !author.isFavorite } : author
      ).filter(author => author.isFavorite)
    );
  };

  const renderBookItem = ({ item }: { item: Book }) => (
    <View style={styles.bookItem}>
      <Image source={{ uri: item.image }} style={styles.bookCover} />
      <View style={styles.bookInfo}>
        <Text style={styles.bookTitle} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.bookAuthor} numberOfLines={1}>{item.author}</Text>
      </View>
      <TouchableOpacity 
        style={styles.favoriteButton} 
        onPress={() => toggleBookFavorite(item.id)}
      >
        <Feather name="heart" size={22} color="#FF3B30" />
      </TouchableOpacity>
    </View>
  );

  const renderAuthorItem = ({ item }: { item: Author }) => (
    <View style={styles.authorItem}>
      <Image source={{ uri: item.image }} style={styles.authorImage} />
      <View style={styles.authorInfo}>
        <Text style={styles.authorName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.authorDescription} numberOfLines={2}>{item.description}</Text>
      </View>
      <TouchableOpacity 
        style={styles.favoriteButton} 
        onPress={() => toggleAuthorFavorite(item.id)}
      >
        <Feather name="heart" size={22} color="#FF3B30" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Favorilerim</Text>
      </View>
      
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'books' && styles.activeTab]}
          onPress={() => setActiveTab('books')}
        >
          <Text style={[styles.tabText, activeTab === 'books' && styles.activeTabText]}>Kitaplar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'authors' && styles.activeTab]}
          onPress={() => setActiveTab('authors')}
        >
          <Text style={[styles.tabText, activeTab === 'authors' && styles.activeTabText]}>Yazarlar</Text>
        </TouchableOpacity>
      </View>
      
      {activeTab === 'books' ? (
        favoriteBooks.length > 0 ? (
          <FlatList
            data={favoriteBooks}
            renderItem={renderBookItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContent}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Feather name="book" size={60} color="#CCCCCC" />
            <Text style={styles.emptyText}>Favori kitap bulunamadı</Text>
            <Text style={styles.emptySubText}>
              Kitapları favorilere eklemek için kitap detaylarındaki kalp ikonuna dokunun
            </Text>
          </View>
        )
      ) : (
        favoriteAuthors.length > 0 ? (
          <FlatList
            data={favoriteAuthors}
            renderItem={renderAuthorItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContent}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Feather name="user" size={60} color="#CCCCCC" />
            <Text style={styles.emptyText}>Favori yazar bulunamadı</Text>
            <Text style={styles.emptySubText}>
              Yazarları favorilere eklemek için yazar detaylarındaki kalp ikonuna dokunun
            </Text>
          </View>
        )
      )}
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
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 14,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#6C63FF',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#999',
  },
  activeTabText: {
    color: '#6C63FF',
  },
  listContent: {
    padding: 16,
  },
  bookItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 12,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  bookCover: {
    width: 60,
    height: 90,
    borderRadius: 6,
  },
  bookInfo: {
    flex: 1,
    paddingHorizontal: 12,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  bookAuthor: {
    fontSize: 14,
    color: '#666',
  },
  favoriteButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  authorItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 12,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  authorImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  authorInfo: {
    flex: 1,
    paddingHorizontal: 12,
  },
  authorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  authorDescription: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 20,
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    lineHeight: 20,
  },
});