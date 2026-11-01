import { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  PaperProvider,
  Card,
  Text,
  Button,
  ActivityIndicator,
} from "react-native-paper";

// Tela principal: busca os filmes na API e mostra a lista
function HomeScreen({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getMovies = async () => {
    try {
      const response = await fetch(
        "https://www.omdbapi.com/?s=spider%20man&apikey=1cd66749"
      );
      const json = await response.json();
      setData(json.Search);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.imdbID}
          renderItem={({ item }) => (
            <Card
              style={{ margin: 8 }}
              onPress={() => navigation.navigate("Details", { movie: item })}
            >
              <Card.Title title={item.Title} subtitle={"Ano: " + item.Year} />
            </Card>
          )}
        />
      )}
    </View>
  );
}

// Tela de detalhes: recebe o filme escolhido pelos params da rota
function DetailsScreen({ route, navigation }) {
  const { movie } = route.params;

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Card>
        {movie.Poster !== "N/A" && <Card.Cover source={{ uri: movie.Poster }} />}
        <Card.Content style={{ marginTop: 12 }}>
          <Text variant="titleLarge">{movie.Title}</Text>
          <Text variant="bodyMedium">Ano: {movie.Year}</Text>
          <Text variant="bodyMedium">Tipo: {movie.Type}</Text>
          <Text variant="bodyMedium">IMDb: {movie.imdbID}</Text>
        </Card.Content>
        <Card.Actions>
          <Button mode="contained" onPress={() => navigation.goBack()}>
            Voltar para home
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: "Filmes" }}
          />
          <Stack.Screen
            name="Details"
            component={DetailsScreen}
            options={{ title: "Detalhes" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
