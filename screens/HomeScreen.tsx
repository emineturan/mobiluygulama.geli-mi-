import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';

export default function HomeScreen() {
  const [quote, setQuote] = useState({
    text: "Kitaplar, rüzgârın savuramayacağı, hırsızın çalamayacağı, güvenli bir hazinedir.",
    author: "- Cervantes"
  });
  
  // Sample data for featured content
  const featuredAuthors = [
    { id: 1, name: "Virginia Woolf", image: "https://api.a0.dev/assets/image?text=Virginia+Woolf+portrait&aspect=1:1" },
    { id: 2, name: "Gabriel Garcia Marquez", image: "https://api.a0.dev/assets/image?text=Gabriel+Garcia+Marquez+portrait&aspect=1:1" },
    { id: 3, name: "Orhan Pamuk", image: "https://api.a0.dev/assets/image?text=Orhan+Pamuk+portrait&aspect=1:1" },
    { id: 4, name: "Fyodor Dostoyevski", image: "https://api.a0.dev/assets/image?text=Fyodor+Dostoyevski+portrait&aspect=1:1" },
  ];
  
  const featuredBooks = [
    { id: 1, title: "İnce Memed", author: "Yaşar Kemal", image: "https://api.a0.dev/assets/image?text=İnce+Memed+book+cover&aspect=2:3" },
    { id: 2, title: "Beyaz Geceler", author: "Dostoyevski", image: "https://api.a0.dev/assets/image?text=Beyaz+Geceler+book+cover&aspect=2:3" },
    { id: 3, title: "Yüzyıllık Yalnızlık", author: "G.G. Marquez", image: "https://api.a0.dev/assets/image?text=Yüzyıllık+Yalnızlık+book+cover&aspect=2:3" },
    { id: 4, title: "Tutunamayanlar", author: "Oğuz Atay", image: "https://api.a0.dev/assets/image?text=Tutunamayanlar+book+cover&aspect=2:3" },
  ];
  
  const featuredPoets = [
    { id: 1, name: "Nazım Hikmet", image: "https://api.a0.dev/assets/image?text=Nazım+Hikmet+portrait&aspect=1:1" },
    { id: 2, name: "Cemal Süreya", image: "https://api.a0.dev/assets/image?text=Cemal+Süreya+portrait&aspect=1:1" },
    { id: 3, name: "Atilla İlhan", image: "https://api.a0.dev/assets/image?text=Atilla+İlhan+portrait&aspect=1:1" },
    { id: 4, name: "Turgut Uyar", image: "https://api.a0.dev/assets/image?text=Turgut+Uyar+portrait&aspect=1:1" },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="dark" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Merhaba,</Text>
            <Text style={styles.title}>Edebiyat Dünyası</Text>
          </View>
          <TouchableOpacity style={styles.searchButton}>
            <Feather name="search" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Quote of the day */}
        <ImageBackground
          source={{ uri: "https://api.a0.dev/assets/image?text=Literary+background+with+books&aspect=16:9" }}
          style={styles.quoteContainer}
          imageStyle={styles.quoteBackground}>
          <View style={styles.quoteOverlay}>
            <Text style={styles.quoteTitle}>Günün Sözü</Text>
            <Text style={styles.quoteText}>{quote.text}</Text>
            <Text style={styles.quoteAuthor}>{quote.author}</Text>
          </View>
        </ImageBackground>

        {/* Featured Authors */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Ayın Yazarları</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Tümünü Gör</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalList}>
            {featuredAuthors.map(author => (
              <TouchableOpacity key={author.id} style={styles.authorCard}>
                <Image source={{ uri: author.image }} style={styles.authorImage} />
                <Text style={styles.authorName}>{author.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Featured Books */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Ayın En İyi Eserleri</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Tümünü Gör</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalList}>
            {featuredBooks.map(book => (
              <TouchableOpacity key={book.id} style={styles.bookCard}>
                <Image source={{ uri: book.image }} style={styles.bookImage} />
                <Text style={styles.bookTitle} numberOfLines={1}>{book.title}</Text>
                <Text style={styles.bookAuthor} numberOfLines={1}>{book.author}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Featured Poets */}
        <View style={[styles.section, styles.lastSection]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Ayın Şairleri</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Tümünü Gör</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalList}>
            {featuredPoets.map(poet => (
              <TouchableOpacity key={poet.id} style={styles.authorCard}>
                <Image source={{ uri: poet.image }} style={styles.authorImage} />
                <Text style={styles.authorName}>{poet.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
  },
  greeting: {
    fontSize: 16,
    color: '#666',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
  },
  searchButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  quoteContainer: {
    marginHorizontal: 20,
    height: 180,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
  },
  quoteBackground: {
    borderRadius: 16,
  },
  quoteOverlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
    height: '100%',
    justifyContent: 'center',
  },
  quoteTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  quoteText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 26,
    marginBottom: 10,
  },
  quoteAuthor: {
    color: '#fff',
    fontSize: 14,
    fontStyle: 'italic',
    alignSelf: 'flex-end',
  },
  section: {
    marginBottom: 24,
  },
  lastSection: {
    marginBottom: 100, // Extra padding at the bottom for tab navigation
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
  },
  seeAllText: {
    fontSize: 14,
    color: '#6C63FF',
    fontWeight: '500',
  },
  horizontalList: {
    paddingLeft: 20,
  },
  authorCard: {
    marginRight: 15,
    width: 100,
    alignItems: 'center',
  },
  authorImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
  },
  authorName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
    width: '100%',
  },
  bookCard: {
    marginRight: 15,
    width: 120,
  },
  bookImage: {
    width: 120,
    height: 180,
    borderRadius: 8,
    marginBottom: 8,
  },
  bookTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  bookAuthor: {
    fontSize: 12,
    color: '#666',
  },
});