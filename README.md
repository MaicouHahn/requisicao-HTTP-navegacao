# FilmesApp – Aula 5 (React Navigation + API REST + React Native Paper)

## Passo a passo

1. Criar e abrir o projeto
   ```
   npx create-expo-app FilmesApp --template blank
   cd FilmesApp
   code .
   ```

2. Instalar o React Navigation + native stack
   ```
   npm install @react-navigation/native
   npx expo install react-native-screens react-native-safe-area-context
   npm install @react-navigation/native-stack
   ```

3. Instalar o React Native Paper
   ```
   npm install react-native-paper
   ```

4. Substituir o `App.js` do projeto pelo `App.js` deste exemplo.

5. Rodar o app
   ```
   npx expo start
   ```
   Abra no emulador (tecla `a`) ou no celular pelo Expo Go. Use `r` para recarregar.

## Como funciona

- **HomeScreen** (tela principal): busca os filmes com `fetch` na API
  `https://www.omdbapi.com/?s=spider%20man&apikey=1cd66749`, usando `useState`
  e `useEffect`, e mostra a lista em uma `FlatList` com `Card` do Paper.
  Enquanto carrega, aparece um `ActivityIndicator`.
- Ao tocar em um filme, `navigation.navigate("Details", { movie: item })` abre a
  tela de detalhes passando o filme como parâmetro.
- **DetailsScreen**: lê o filme em `route.params` e mostra pôster, título, ano,
  tipo e ID do IMDb. O botão chama `navigation.goBack()`.
- O `PaperProvider` envolve o app para os componentes do Paper funcionarem.
