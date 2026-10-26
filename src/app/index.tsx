
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import axios from 'axios';

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export default function HomeScreen() {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function buscarPublicacao() {
      try {
        const response = await axios.get<Post>(
          'https://jsonplaceholder.typicode.com/posts/1'
        );

        setPost(response.data);
      } catch (err) {
        setError(
          'Não foi possível carregar a publicação. Verifique sua conexão e tente novamente.'
        );
      } finally {
        setLoading(false);
      }
    }

    buscarPublicacao();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#312E81" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Consumo de API</Text>
        <Text style={styles.headerSubtitle}>
          React Native + Axios
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Publicação</Text>

        {loading ? (
          <View style={styles.center}>
            <ActivityIndicator size="large" color="#4F46E5" />
            <Text style={styles.loadingText}>
              Carregando publicação...
            </Text>
          </View>
        ) : error ? (
          <View style={styles.card}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : post ? (
          <View style={styles.card}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                POST #{post.id}
              </Text>
            </View>

            <Text style={styles.label}>Título</Text>
            <Text style={styles.postTitle}>{post.title}</Text>

            <View style={styles.divider} />

            <Text style={styles.label}>Conteúdo</Text>
            <Text style={styles.body}>{post.body}</Text>

            <Text style={styles.footer}>
              Usuário: {post.userId}
            </Text>
          </View>
        ) : null}
      </ScrollView>

      <View style={styles.bottom}>
        <Text style={styles.bottomText}>
          Dados fornecidos pela JSONPlaceholder API
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    backgroundColor: '#312E81',
    padding: 24,
    paddingTop: 32,
    paddingBottom: 28,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: '#DDD6FE',
    fontSize: 14,
    marginTop: 6,
  },
  content: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 28,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  loadingText: {
    marginTop: 14,
    color: '#4B5563',
    fontSize: 15,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 22,
    borderRadius: 16,
    elevation: 3,
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#E0E7FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 22,
  },
  badgeText: {
    color: '#3730A3',
    fontSize: 12,
    fontWeight: 'bold',
  },
  label: {
    color: '#6B7280',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
  },
  postTitle: {
    color: '#111827',
    fontSize: 21,
    fontWeight: 'bold',
    lineHeight: 29,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 20,
  },
  body: {
    color: '#4B5563',
    fontSize: 16,
    lineHeight: 25,
  },
  errorText: {
    color: '#DC2626',
    fontSize: 15,
    lineHeight: 23,
  },
  footer: {
    marginTop: 24,
    color: '#9CA3AF',
    fontSize: 12,
  },
  bottom: {
    padding: 16,
    alignItems: 'center',
  },
  bottomText: {
    color: '#9CA3AF',
    fontSize: 12,
    textAlign: 'center',
  },
});
