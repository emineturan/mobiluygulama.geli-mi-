import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  KeyboardAvoidingView, 
  Platform,
  ActivityIndicator,
  Keyboard 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { toast } from 'sonner-native';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

// Track conversation history for context
interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Merhaba! Edebiyat dünyasında size nasıl yardımcı olabilirim?',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  // Keep track of conversation history for context
  const [conversationHistory, setConversationHistory] = useState<ConversationMessage[]>([
    {
      role: 'assistant',
      content: 'Merhaba! Edebiyat dünyasında size nasıl yardımcı olabilirim?'
    }
  ]);

  const generateMessageId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };

  const sendMessage = async () => {
    if (!inputText.trim()) return;
    
    const userMessage: Message = {
      id: generateMessageId(),
      text: inputText.trim(),
      isUser: true,
      timestamp: new Date(),
    };
    
    // Add user message to the UI
    setMessages(prev => [...prev, userMessage]);
    
    // Update conversation history
    const updatedHistory = [
      ...conversationHistory,
      { role: 'user', content: inputText.trim() }
    ];
    setConversationHistory(updatedHistory);
    
    setInputText('');
    setIsLoading(true);
    Keyboard.dismiss();
    
    try {
      console.log('Sending request to API with payload:', JSON.stringify({
        messages: updatedHistory.map(msg => ({
          role: msg.role,
          content: msg.content
        }))
      }));
      
      // Make API request
      const response = await fetch('http://localhost:4111/api/agents/booksAgent/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: updatedHistory.map(msg => ({
            role: msg.role,
            content: msg.content
          })),
        }),
      });
      
      console.log('API response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.log('API error details:', errorText);
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const data = await response.json();
      console.log('API response data:', data);
      
      if (!data || typeof data.text !== 'string') {
        console.error('Invalid API response format:', data);
        throw new Error('Geçersiz API yanıtı: text alanı bulunamadı');
      }
      
      // Add bot response to messages
      const botMessage: Message = {
        id: generateMessageId(),
        text: data.text,
        isUser: false,
        timestamp: new Date(),
      };
      
      // Update UI messages
      setMessages(prev => [...prev, botMessage]);
      
      // Update conversation history with assistant response
      setConversationHistory([
        ...updatedHistory,
        { role: 'assistant', content: data.text }
      ]);
      
    } catch (error) {
      console.error('Error communicating with API:', error);
      toast.error('API bağlantısında hata: ' + (error instanceof Error ? error.message : 'Bilinmeyen hata'));
      
      // Use a more helpful error message
      const errorMessage: Message = {
        id: generateMessageId(),
        text: 'Üzgünüm, API sunucusuna bağlanırken bir sorun oluştu. Sunucunun çalıştığından emin olun ve tekrar deneyin.',
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Scroll to bottom when messages update
  useEffect(() => {
    if (flatListRef.current && messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const renderMessageItem = ({ item }: { item: Message }) => (
    <View style={[
      styles.messageBubble, 
      item.isUser ? styles.userBubble : styles.botBubble
    ]}>
      <Text style={[
        styles.messageText,
        item.isUser ? styles.userText : styles.botText
      ]}>{item.text}</Text>
      <Text style={[
        styles.timestamp,
        item.isUser ? styles.userTimestamp : styles.botTimestamp
      ]}>{formatTime(item.timestamp)}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Edebiyat Asistanı</Text>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardAvoid}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessageItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.messagesList}
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Mesajınızı yazın..."
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxLength={500}
          />
          <TouchableOpacity 
            style={[styles.sendButton, !inputText.trim() && styles.disabledButton]} 
            onPress={sendMessage}
            disabled={!inputText.trim() || isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Feather name="send" size={20} color="#fff" />
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
  keyboardAvoid: {
    flex: 1,
  },
  messagesList: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 10,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 14,
    borderRadius: 18,
    marginBottom: 12,
  },
  userBubble: {
    backgroundColor: '#6C63FF',
    alignSelf: 'flex-end',
    borderTopRightRadius: 4,
  },
  botBubble: {
    backgroundColor: '#FFF',
    alignSelf: 'flex-start',
    borderTopLeftRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userText: {
    color: '#FFF',
  },
  botText: {
    color: '#333',
  },
  timestamp: {
    fontSize: 11,
    marginTop: 5,
    alignSelf: 'flex-end',
  },
  userTimestamp: {
    color: 'rgba(255,255,255,0.7)',
  },
  botTimestamp: {
    color: '#999',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#EFEFEF',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    minHeight: 44,
    maxHeight: 100,
    backgroundColor: '#F0F2F5',
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    color: '#333',
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#6C63FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  disabledButton: {
    backgroundColor: '#A9A9A9',
  },
});