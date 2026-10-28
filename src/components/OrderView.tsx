import React, { useState, useEffect } from 'react';
import {
  MarvelOrderConfig,
  MarvelItem,
  getMarvelOrderItems
} from '../data/marvelData';
import {
  getStoredOrderConfig,
  getStoredOrderItems,
  getStoredWatchedIds,
  getStoredSkippedIds,
  getStoredFavoriteIds,
  isOrderSetupDone,
  saveOrderConfig,
  saveOrderItems,
  setOrderSetupDone
} from '../services/marvelOrderService';
import { OrderWizard } from './OrderWizard';
import { OrderTimeline } from './OrderTimeline';
import { searchMulti } from '../services/tmdb';
import { TMDBItem } from '../types/tmdb';

interface OrderViewProps {
  onSelectTMDBItem?: (item: TMDBItem) => void;
  onNavigateToProgress?: () => void;
}

export const OrderView: React.FC<OrderViewProps> = ({
  onSelectTMDBItem,
  onNavigateToProgress
}) => {
  const [config, setConfig] = useState<MarvelOrderConfig>(getStoredOrderConfig);
  const [items, setItems] = useState<MarvelItem[]>(getStoredOrderItems);
  const [watchedIds, setWatchedIds] = useState<string[]>(getStoredWatchedIds);
  const [skippedIds, setSkippedIds] = useState<string[]>(getStoredSkippedIds);
  const [favoriteIds, setFavoriteIds] = useState<string[]>(getStoredFavoriteIds);
  const [setupDone, setSetupDone] = useState<boolean>(isOrderSetupDone);
  const [isEditingSetup, setIsEditingSetup] = useState<boolean>(false);

  // Synchronize on load
  useEffect(() => {
    const isDone = isOrderSetupDone();
    setSetupDone(isDone);
    if (isDone) {
      setItems(getStoredOrderItems());
    }
  }, []);

  // Handle completion from the 6-step wizard
  const handleWizardComplete = (newConfig: MarvelOrderConfig, newItems: MarvelItem[]) => {
    setConfig(newConfig);
    setItems(newItems);
    setSetupDone(true);
    setIsEditingSetup(false);
  };

  // Click on a title in the timeline to load and show TMDB details
  const handleSelectTitle = async (title: string, year?: number) => {
    if (!onSelectTMDBItem) return;
    try {
      const results = await searchMulti(title);
      if (results && results.length > 0) {
        // Try finding matching year or best match
        let best = results[0];
        if (year) {
          const yearMatch = results.find((r) => {
            const date = r.release_date || r.first_air_date;
            return date && date.startsWith(year.toString());
          });
          if (yearMatch) best = yearMatch;
        }
        onSelectTMDBItem(best);
      }
    } catch (e) {
      console.warn('TMDB search error for order title:', e);
    }
  };

  // If user hasn't set up yet OR clicked "Adjust Order"
  if (!setupDone || isEditingSetup) {
    return (
      <div className="min-h-screen pb-20">
        <OrderWizard
          initialConfig={config}
          hasExistingOrder={setupDone}
          onComplete={handleWizardComplete}
          onCancel={() => {
            if (setupDone) {
              setIsEditingSetup(false);
            } else if (onNavigateToProgress) {
              onNavigateToProgress();
            } else {
              // Default to generating initial MCU items
              const defaultItems = getMarvelOrderItems(config);
              saveOrderItems(defaultItems);
              setOrderSetupDone(true);
              setSetupDone(true);
            }
          }}
        />
      </div>
    );
  }

  // Active Timeline Screen
  return (
    <div className="min-h-screen pb-20">
      <OrderTimeline
        config={config}
        items={items}
        watchedIds={watchedIds}
        skippedIds={skippedIds}
        favoriteIds={favoriteIds}
        onUpdateItems={setItems}
        onUpdateWatched={setWatchedIds}
        onUpdateSkipped={setSkippedIds}
        onUpdateFavorites={setFavoriteIds}
        onUpdateConfig={setConfig}
        onOpenWizard={() => setIsEditingSetup(true)}
        onSelectTitle={handleSelectTitle}
      />
    </div>
  );
};
