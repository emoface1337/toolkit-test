import { combine, createEvent, createStore } from 'effector';
import { useUnit } from 'effector-react';

export const setAccessToken = createEvent<string | null>();
export const setProcessing = createEvent<boolean>();
export const setLoading = createEvent<boolean>();

export const $accessToken = createStore<string | null>(null);
export const $isProcessing = createStore<boolean>(false);
export const $isLoading = createStore<boolean>(true);

export const $isAuthenticated = $accessToken.map((token) => !!token);

export const $githubOAuthState = combine({
  accessToken: $accessToken,
  isAuthenticated: $isAuthenticated,
  isLoading: $isLoading,
  isProcessing: $isProcessing
});

$accessToken.on(setAccessToken, (_, token) => token);
$isProcessing.on(setProcessing, (_, state) => state);
$isLoading.on(setLoading, (_, state) => state);

export const useGithubOAuthStore = () => {
  return {
    ...useUnit($githubOAuthState),
    setAccessToken: useUnit(setAccessToken),
    setProcessing: useUnit(setProcessing),
    setLoading: useUnit(setLoading),
  };
};