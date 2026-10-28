import {
  MarvelItem,
  MarvelOrderConfig,
  getMarvelOrderItems,
  PHASE_DISPLAY_NAMES,
  DisplayLayoutType
} from '../data/marvelData';

const STORAGE_KEY_CONFIG = 'phanteress_marvel_config_v1';
const STORAGE_KEY_ITEMS = 'phanteress_marvel_items_v1';
const STORAGE_KEY_WATCHED = 'phanteress_marvel_watched_v1';
const STORAGE_KEY_SKIPPED = 'phanteress_marvel_skipped_v1';
const STORAGE_KEY_FAVORITES = 'phanteress_marvel_favorites_v1';
const STORAGE_KEY_SETUP_DONE = 'phanteress_marvel_setup_done_v1';

export const DEFAULT_CONFIG: MarvelOrderConfig = {
  franchise: 'marvel',
  property: 'mcu',
  addCameos: false,
  order: 'story',
  layout: 'byphase',
  generatedAt: new Date().toISOString(),
};

export const getStoredOrderConfig = (): MarvelOrderConfig => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CONFIG);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn('Error reading stored marvel config', e);
  }
  return DEFAULT_CONFIG;
};

export const saveOrderConfig = (config: MarvelOrderConfig) => {
  try {
    localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(config));
  } catch (e) {
    console.warn('Error saving marvel config', e);
  }
};

export const getStoredOrderItems = (): MarvelItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ITEMS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn('Error reading stored marvel items', e);
  }
  return getMarvelOrderItems(DEFAULT_CONFIG);
};

export const saveOrderItems = (items: MarvelItem[]) => {
  try {
    localStorage.setItem(STORAGE_KEY_ITEMS, JSON.stringify(items));
  } catch (e) {
    console.warn('Error saving marvel items', e);
  }
};

export const getStoredWatchedIds = (): string[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_WATCHED);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
};

export const saveStoredWatchedIds = (ids: string[]) => {
  try {
    localStorage.setItem(STORAGE_KEY_WATCHED, JSON.stringify(ids));
  } catch {}
};

export const getStoredSkippedIds = (): string[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SKIPPED);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
};

export const saveStoredSkippedIds = (ids: string[]) => {
  try {
    localStorage.setItem(STORAGE_KEY_SKIPPED, JSON.stringify(ids));
  } catch {}
};

export const getStoredFavoriteIds = (): string[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_FAVORITES);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
};

export const saveStoredFavoriteIds = (ids: string[]) => {
  try {
    localStorage.setItem(STORAGE_KEY_FAVORITES, JSON.stringify(ids));
  } catch {}
};

export const isOrderSetupDone = (): boolean => {
  try {
    return localStorage.getItem(STORAGE_KEY_SETUP_DONE) === 'true';
  } catch {}
  return false;
};

export const setOrderSetupDone = (done: boolean) => {
  try {
    localStorage.setItem(STORAGE_KEY_SETUP_DONE, done ? 'true' : 'false');
  } catch {}
};

export { PHASE_DISPLAY_NAMES };
