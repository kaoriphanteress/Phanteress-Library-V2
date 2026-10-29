// Auto-generated Marvel watch order properties & title catalog

export interface MarvelItem {
  id: string;
  title: string;
  year: number;
  tag: string;
  mediaType: 'movie' | 'tv' | 'short';
  phase: string;
  hero: string;
  runtime: string;
  tmdbId?: number;
}

export type FranchiseType = 'marvel' | 'dc' | 'wizarding' | 'starwars';
export type PropertySelection = 'doomsday' | 'mcu' | 'all';
export type WatchOrderType = 'release' | 'story' | 'phanteress';
export type DisplayLayoutType = 'byphase' | 'onelonglist';

export interface MarvelOrderConfig {
  franchise: FranchiseType;
  property: PropertySelection;
  addCameos: boolean;
  order: WatchOrderType;
  layout: DisplayLayoutType;
  generatedAt: string;
}

export const PHASE_DISPLAY_NAMES: Record<string, string> = {
  "Phase 1": "Phase 1: Avengers Assembled",
  "Phase 2": "Phase 2: Heroes Divided & Cosmic Expansion",
  "Phase 3": "Phase 3: The Infinity Saga Climax",
  "Phase 4": "Phase 4: The Multiverse Unleashed",
  "Phase 5": "Phase 5: Secret Wars Genesis",
  "Phase 6": "Phase 6: The Road to Doomsday",
  "Road to Doomsday": "Road to Doomsday (Key Events)",
  "1. Early Live-Action Era (1944\u20131998)": "Era 1: Early Live-Action & Golden Animation (1944\u20131998)",
  "2. Turn of the Century Era (1999\u20132007)": "Era 2: Turn of the Century & Blockbusters (1999\u20132007)",
  "3. MCU Phase 1 & Avengers Expansion (2008\u20132012)": "Era 3: MCU Phase 1 & Avengers Expansion (2008\u20132012)",
  "4. MCU Phase 2 & Mid-2010s Expansion (2013\u20132015)": "Era 4: MCU Phase 2 & Mid-2010s Expansion (2013\u20132015)",
  "5. MCU Phase 3 & Late-2010s Expansion (2016\u20132019)": "Era 5: MCU Phase 3 & Late-2010s Expansion (2016\u20132019)",
  "6. MCU Phase 4 & New Avengers Era (2020\u20132022)": "Era 6: MCU Phase 4 & Multiverse Era (2020\u20132022)",
  "7. MCU Phase 5 & Recent Releases (2023\u20132025)": "Era 7: MCU Phase 5 & Recent Releases (2023\u20132025)",
  "8. MCU Phase 6 & Upcoming Horizons (2026\u20132028 and Beyond)": "Era 8: MCU Phase 6 & Horizons (2026\u20132028+)",
  "Multiverse Cameos": "Multiverse Cameo Blockbusters"
};

export const DOOMSDAY_ITEMS: MarvelItem[] = [
  {
    "id": "x_men_2000",
    "title": "X-Men",
    "year": 2000,
    "tag": "2000",
    "mediaType": "movie",
    "phase": "Road to Doomsday",
    "hero": "X-Men",
    "runtime": "104m"
  },
  {
    "id": "x2_x_men_united_2003",
    "title": "X2: X-Men United",
    "year": 2003,
    "tag": "2003",
    "mediaType": "movie",
    "phase": "Road to Doomsday",
    "hero": "X-Men",
    "runtime": "104m"
  },
  {
    "id": "captain_america_the_first_avenger_2011",
    "title": "Captain America: The First Avenger",
    "year": 2011,
    "tag": "2011",
    "mediaType": "movie",
    "phase": "Road to Doomsday",
    "hero": "Captain America",
    "runtime": "124m"
  },
  {
    "id": "the_avengers_2012",
    "title": "The Avengers",
    "year": 2012,
    "tag": "2012",
    "mediaType": "movie",
    "phase": "Road to Doomsday",
    "hero": "The Avengers",
    "runtime": "143m"
  },
  {
    "id": "avengers_infinity_war_2018",
    "title": "Avengers: Infinity War",
    "year": 2018,
    "tag": "2018",
    "mediaType": "movie",
    "phase": "Road to Doomsday",
    "hero": "The Avengers",
    "runtime": "149m"
  },
  {
    "id": "avengers_endgame_2019",
    "title": "Avengers: Endgame",
    "year": 2019,
    "tag": "2019",
    "mediaType": "movie",
    "phase": "Road to Doomsday",
    "hero": "The Avengers",
    "runtime": "181m"
  },
  {
    "id": "loki_2024",
    "title": "Loki",
    "year": 2024,
    "tag": "Seasons 1\u20132",
    "mediaType": "tv",
    "phase": "Road to Doomsday",
    "hero": "Loki",
    "runtime": "Series"
  },
  {
    "id": "shang_chi_and_the_legend_of_the_ten_rings_2021",
    "title": "Shang-Chi and the Legend of the Ten Rings",
    "year": 2021,
    "tag": "2021",
    "mediaType": "movie",
    "phase": "Road to Doomsday",
    "hero": "Shang-Chi",
    "runtime": "132m"
  },
  {
    "id": "spider_man_no_way_home_2021",
    "title": "Spider-Man: No Way Home",
    "year": 2021,
    "tag": "2021",
    "mediaType": "movie",
    "phase": "Road to Doomsday",
    "hero": "Spider-Man",
    "runtime": "148m"
  },
  {
    "id": "black_panther_wakanda_forever_2022",
    "title": "Black Panther: Wakanda Forever",
    "year": 2022,
    "tag": "2022",
    "mediaType": "movie",
    "phase": "Road to Doomsday",
    "hero": "Black Panther",
    "runtime": "161m"
  },
  {
    "id": "doctor_strange_in_the_multiverse_of_madness_2022",
    "title": "Doctor Strange in the Multiverse of Madness",
    "year": 2022,
    "tag": "2022",
    "mediaType": "movie",
    "phase": "Road to Doomsday",
    "hero": "Doctor Strange",
    "runtime": "126m"
  },
  {
    "id": "deadpool_wolverine_2024",
    "title": "Deadpool & Wolverine",
    "year": 2024,
    "tag": "2024",
    "mediaType": "movie",
    "phase": "Road to Doomsday",
    "hero": "Deadpool & Wolverine",
    "runtime": "128m"
  },
  {
    "id": "captain_america_brave_new_world_2025",
    "title": "Captain America: Brave New World",
    "year": 2025,
    "tag": "2025",
    "mediaType": "movie",
    "phase": "Road to Doomsday",
    "hero": "Captain America",
    "runtime": "120m"
  },
  {
    "id": "thunderbolts_2025",
    "title": "Thunderbolts*",
    "year": 2025,
    "tag": "2025",
    "mediaType": "movie",
    "phase": "Road to Doomsday",
    "hero": "Thunderbolts",
    "runtime": "120m"
  },
  {
    "id": "the_fantastic_four_first_steps_2025",
    "title": "The Fantastic Four: First Steps",
    "year": 2025,
    "tag": "2025",
    "mediaType": "movie",
    "phase": "Road to Doomsday",
    "hero": "Fantastic Four",
    "runtime": "120m"
  }
];

export const MCU_RELEASE_ITEMS: MarvelItem[] = [
  {
    "id": "iron_man_2008",
    "title": "Iron Man",
    "year": 2008,
    "tag": "Film, May 2008",
    "mediaType": "movie",
    "phase": "Phase 1",
    "hero": "Iron Man",
    "runtime": "126m"
  },
  {
    "id": "the_incredible_hulk_2008",
    "title": "The Incredible Hulk",
    "year": 2008,
    "tag": "Film, June 2008",
    "mediaType": "movie",
    "phase": "Phase 1",
    "hero": "Hulk",
    "runtime": "120m"
  },
  {
    "id": "iron_man_2_2010",
    "title": "Iron Man 2",
    "year": 2010,
    "tag": "Film, May 2010",
    "mediaType": "movie",
    "phase": "Phase 1",
    "hero": "Iron Man",
    "runtime": "126m"
  },
  {
    "id": "thor_2011",
    "title": "Thor",
    "year": 2011,
    "tag": "Film, May 2011",
    "mediaType": "movie",
    "phase": "Phase 1",
    "hero": "Thor",
    "runtime": "120m"
  },
  {
    "id": "captain_america_the_first_avenger_2011",
    "title": "Captain America: The First Avenger",
    "year": 2011,
    "tag": "Film, July 2011",
    "mediaType": "movie",
    "phase": "Phase 1",
    "hero": "Captain America",
    "runtime": "124m"
  },
  {
    "id": "marvel_one_shot_the_consultant_2011",
    "title": "Marvel One-Shot: The Consultant",
    "year": 2011,
    "tag": "Short Film, Sept 2011",
    "mediaType": "short",
    "phase": "Phase 1",
    "hero": "Marvel Universe",
    "runtime": "15m"
  },
  {
    "id": "marvel_one_shot_a_funny_thing_happened_on_the_way_to_thor_s_hammer_2011",
    "title": "Marvel One-Shot: A Funny Thing Happened on the Way to Thor's Hammer",
    "year": 2011,
    "tag": "Short Film, Oct 2011",
    "mediaType": "short",
    "phase": "Phase 1",
    "hero": "Thor",
    "runtime": "15m"
  },
  {
    "id": "the_avengers_2012",
    "title": "The Avengers",
    "year": 2012,
    "tag": "Film, May 2012",
    "mediaType": "movie",
    "phase": "Phase 1",
    "hero": "The Avengers",
    "runtime": "143m"
  },
  {
    "id": "marvel_one_shot_item_47_2012",
    "title": "Marvel One-Shot: Item 47",
    "year": 2012,
    "tag": "Short Film, Sept 2012",
    "mediaType": "short",
    "phase": "Phase 1",
    "hero": "Marvel Universe",
    "runtime": "15m"
  },
  {
    "id": "iron_man_3_2013",
    "title": "Iron Man 3",
    "year": 2013,
    "tag": "Film, May 2013",
    "mediaType": "movie",
    "phase": "Phase 2",
    "hero": "Iron Man",
    "runtime": "126m"
  },
  {
    "id": "marvel_one_shot_agent_carter_2013",
    "title": "Marvel One-Shot: Agent Carter",
    "year": 2013,
    "tag": "Short Film, Sept 2013",
    "mediaType": "short",
    "phase": "Phase 2",
    "hero": "Agent Carter",
    "runtime": "15m"
  },
  {
    "id": "agents_of_s_h_i_e_l_d_season_1_2013",
    "title": "Agents of S.H.I.E.L.D. Season 1",
    "year": 2013,
    "tag": "TV, Sept 2013",
    "mediaType": "tv",
    "phase": "Phase 2",
    "hero": "Marvel Universe",
    "runtime": "Series"
  },
  {
    "id": "thor_the_dark_world_2013",
    "title": "Thor: The Dark World",
    "year": 2013,
    "tag": "Film, Nov 2013",
    "mediaType": "movie",
    "phase": "Phase 2",
    "hero": "Thor",
    "runtime": "120m"
  },
  {
    "id": "marvel_one_shot_all_hail_the_king_2014",
    "title": "Marvel One-Shot: All Hail the King",
    "year": 2014,
    "tag": "Short Film, Feb 2014",
    "mediaType": "short",
    "phase": "Phase 2",
    "hero": "Marvel Universe",
    "runtime": "15m"
  },
  {
    "id": "captain_america_the_winter_soldier_2014",
    "title": "Captain America: The Winter Soldier",
    "year": 2014,
    "tag": "Film, April 2014",
    "mediaType": "movie",
    "phase": "Phase 2",
    "hero": "Captain America",
    "runtime": "120m"
  },
  {
    "id": "guardians_of_the_galaxy_2014",
    "title": "Guardians of the Galaxy",
    "year": 2014,
    "tag": "Film, Aug 2014",
    "mediaType": "movie",
    "phase": "Phase 2",
    "hero": "Guardians",
    "runtime": "120m"
  },
  {
    "id": "agents_of_s_h_i_e_l_d_season_2_2014",
    "title": "Agents of S.H.I.E.L.D. Season 2",
    "year": 2014,
    "tag": "TV, Sept 2014",
    "mediaType": "tv",
    "phase": "Phase 2",
    "hero": "Marvel Universe",
    "runtime": "Series"
  },
  {
    "id": "agent_carter_season_1_2015",
    "title": "Agent Carter Season 1",
    "year": 2015,
    "tag": "TV, Jan 2015",
    "mediaType": "tv",
    "phase": "Phase 2",
    "hero": "Agent Carter",
    "runtime": "Series"
  },
  {
    "id": "daredevil_season_1_2015",
    "title": "Daredevil Season 1",
    "year": 2015,
    "tag": "TV, April 2015",
    "mediaType": "tv",
    "phase": "Phase 2",
    "hero": "Daredevil",
    "runtime": "Series"
  },
  {
    "id": "avengers_age_of_ultron_2015",
    "title": "Avengers: Age of Ultron",
    "year": 2015,
    "tag": "Film, May 2015",
    "mediaType": "movie",
    "phase": "Phase 2",
    "hero": "The Avengers",
    "runtime": "120m"
  },
  {
    "id": "ant_man_2015",
    "title": "Ant-Man",
    "year": 2015,
    "tag": "Film, July 2015",
    "mediaType": "movie",
    "phase": "Phase 2",
    "hero": "Ant-Man",
    "runtime": "120m"
  },
  {
    "id": "agents_of_s_h_i_e_l_d_season_3_2015",
    "title": "Agents of S.H.I.E.L.D. Season 3",
    "year": 2015,
    "tag": "TV, Sept 2015",
    "mediaType": "tv",
    "phase": "Phase 3",
    "hero": "Marvel Universe",
    "runtime": "Series"
  },
  {
    "id": "jessica_jones_season_1_2015",
    "title": "Jessica Jones Season 1",
    "year": 2015,
    "tag": "TV, Nov 2015",
    "mediaType": "tv",
    "phase": "Phase 3",
    "hero": "Jessica Jones",
    "runtime": "Series"
  },
  {
    "id": "agent_carter_season_2_2016",
    "title": "Agent Carter Season 2",
    "year": 2016,
    "tag": "TV, Jan 2016",
    "mediaType": "tv",
    "phase": "Phase 3",
    "hero": "Agent Carter",
    "runtime": "Series"
  },
  {
    "id": "daredevil_season_2_2016",
    "title": "Daredevil Season 2",
    "year": 2016,
    "tag": "TV, March 2016",
    "mediaType": "tv",
    "phase": "Phase 3",
    "hero": "Daredevil",
    "runtime": "Series"
  },
  {
    "id": "captain_america_civil_war_2016",
    "title": "Captain America: Civil War",
    "year": 2016,
    "tag": "Film, May 2016",
    "mediaType": "movie",
    "phase": "Phase 3",
    "hero": "Captain America",
    "runtime": "147m"
  },
  {
    "id": "marvel_one_shot_team_thor_2016",
    "title": "Marvel One-Shot: Team Thor",
    "year": 2016,
    "tag": "Short Film, Aug 2016",
    "mediaType": "short",
    "phase": "Phase 3",
    "hero": "Thor",
    "runtime": "15m"
  },
  {
    "id": "agents_of_s_h_i_e_l_d_season_4_2016",
    "title": "Agents of S.H.I.E.L.D. Season 4",
    "year": 2016,
    "tag": "TV, Sept 2016",
    "mediaType": "tv",
    "phase": "Phase 3",
    "hero": "Marvel Universe",
    "runtime": "Series"
  },
  {
    "id": "luke_cage_season_1_2016",
    "title": "Luke Cage Season 1",
    "year": 2016,
    "tag": "TV, Sept 2016",
    "mediaType": "tv",
    "phase": "Phase 3",
    "hero": "Luke Cage",
    "runtime": "Series"
  },
  {
    "id": "doctor_strange_2016",
    "title": "Doctor Strange",
    "year": 2016,
    "tag": "Film, Nov 2016",
    "mediaType": "movie",
    "phase": "Phase 3",
    "hero": "Doctor Strange",
    "runtime": "120m"
  },
  {
    "id": "marvel_one_shot_team_thor_part_2_2017",
    "title": "Marvel One-Shot: Team Thor: Part 2",
    "year": 2017,
    "tag": "Short Film, Feb 2017",
    "mediaType": "short",
    "phase": "Phase 3",
    "hero": "Thor",
    "runtime": "15m"
  },
  {
    "id": "iron_fist_season_1_2017",
    "title": "Iron Fist Season 1",
    "year": 2017,
    "tag": "TV, March 2017",
    "mediaType": "tv",
    "phase": "Phase 3",
    "hero": "Iron Fist",
    "runtime": "Series"
  },
  {
    "id": "guardians_of_the_galaxy_vol_2_2017",
    "title": "Guardians of the Galaxy Vol. 2",
    "year": 2017,
    "tag": "Film, May 2017",
    "mediaType": "movie",
    "phase": "Phase 3",
    "hero": "Guardians",
    "runtime": "120m"
  },
  {
    "id": "spider_man_homecoming_2017",
    "title": "Spider-Man: Homecoming",
    "year": 2017,
    "tag": "Film, July 2017",
    "mediaType": "movie",
    "phase": "Phase 3",
    "hero": "Spider-Man",
    "runtime": "120m"
  },
  {
    "id": "the_defenders_season_1_2017",
    "title": "The Defenders Season 1",
    "year": 2017,
    "tag": "TV, Aug 2017",
    "mediaType": "tv",
    "phase": "Phase 3",
    "hero": "The Defenders",
    "runtime": "Series"
  },
  {
    "id": "inhumans_season_1_2017",
    "title": "Inhumans Season 1",
    "year": 2017,
    "tag": "TV, Sept 2017",
    "mediaType": "tv",
    "phase": "Phase 3",
    "hero": "Marvel Universe",
    "runtime": "Series"
  },
  {
    "id": "thor_ragnarok_2017",
    "title": "Thor: Ragnarok",
    "year": 2017,
    "tag": "Film, Nov 2017",
    "mediaType": "movie",
    "phase": "Phase 3",
    "hero": "Thor",
    "runtime": "120m"
  },
  {
    "id": "the_punisher_season_1_2017",
    "title": "The Punisher Season 1",
    "year": 2017,
    "tag": "TV, Nov 2017",
    "mediaType": "tv",
    "phase": "Phase 3",
    "hero": "The Punisher",
    "runtime": "Series"
  },
  {
    "id": "runaways_season_1_2017",
    "title": "Runaways Season 1",
    "year": 2017,
    "tag": "TV, Nov 2017",
    "mediaType": "tv",
    "phase": "Phase 3",
    "hero": "Runaways",
    "runtime": "Series"
  },
  {
    "id": "agents_of_s_h_i_e_l_d_season_5_2017",
    "title": "Agents of S.H.I.E.L.D. Season 5",
    "year": 2017,
    "tag": "TV, Dec 2017",
    "mediaType": "tv",
    "phase": "Phase 3",
    "hero": "Marvel Universe",
    "runtime": "Series"
  },
  {
    "id": "marvel_one_shot_team_darryl_2018",
    "title": "Marvel One-Shot: Team Darryl",
    "year": 2018,
    "tag": "Short Film, Feb 2018",
    "mediaType": "short",
    "phase": "Phase 3",
    "hero": "Marvel Universe",
    "runtime": "15m"
  },
  {
    "id": "black_panther_2018",
    "title": "Black Panther",
    "year": 2018,
    "tag": "Film, Feb 2018",
    "mediaType": "movie",
    "phase": "Phase 3",
    "hero": "Black Panther",
    "runtime": "120m"
  },
  {
    "id": "jessica_jones_season_2_2018",
    "title": "Jessica Jones Season 2",
    "year": 2018,
    "tag": "TV, March 2018",
    "mediaType": "tv",
    "phase": "Phase 3",
    "hero": "Jessica Jones",
    "runtime": "Series"
  },
  {
    "id": "avengers_infinity_war_2018",
    "title": "Avengers: Infinity War",
    "year": 2018,
    "tag": "Film, April 2018",
    "mediaType": "movie",
    "phase": "Phase 3",
    "hero": "The Avengers",
    "runtime": "149m"
  },
  {
    "id": "cloak_dagger_season_1_2018",
    "title": "Cloak & Dagger Season 1",
    "year": 2018,
    "tag": "TV, June 2018",
    "mediaType": "tv",
    "phase": "Phase 3",
    "hero": "Cloak & Dagger",
    "runtime": "Series"
  },
  {
    "id": "luke_cage_season_2_2018",
    "title": "Luke Cage Season 2",
    "year": 2018,
    "tag": "TV, June 2018",
    "mediaType": "tv",
    "phase": "Phase 3",
    "hero": "Luke Cage",
    "runtime": "Series"
  },
  {
    "id": "ant_man_and_the_wasp_2018",
    "title": "Ant-Man and the Wasp",
    "year": 2018,
    "tag": "Film, July 2018",
    "mediaType": "movie",
    "phase": "Phase 3",
    "hero": "Ant-Man",
    "runtime": "120m"
  },
  {
    "id": "iron_fist_season_2_2018",
    "title": "Iron Fist Season 2",
    "year": 2018,
    "tag": "TV, Sept 2018",
    "mediaType": "tv",
    "phase": "Phase 3",
    "hero": "Iron Fist",
    "runtime": "Series"
  },
  {
    "id": "daredevil_season_3_2018",
    "title": "Daredevil Season 3",
    "year": 2018,
    "tag": "TV, Oct 2018",
    "mediaType": "tv",
    "phase": "Phase 3",
    "hero": "Daredevil",
    "runtime": "Series"
  },
  {
    "id": "runaways_season_2_2018",
    "title": "Runaways Season 2",
    "year": 2018,
    "tag": "TV, Dec 2018",
    "mediaType": "tv",
    "phase": "Phase 3",
    "hero": "Runaways",
    "runtime": "Series"
  },
  {
    "id": "the_punisher_season_2_2019",
    "title": "The Punisher Season 2",
    "year": 2019,
    "tag": "TV, Jan 2019",
    "mediaType": "tv",
    "phase": "Phase 3",
    "hero": "The Punisher",
    "runtime": "Series"
  },
  {
    "id": "captain_marvel_2019",
    "title": "Captain Marvel",
    "year": 2019,
    "tag": "Film, March 2019",
    "mediaType": "movie",
    "phase": "Phase 3",
    "hero": "Captain Marvel",
    "runtime": "120m"
  },
  {
    "id": "cloak_dagger_season_2_2019",
    "title": "Cloak & Dagger Season 2",
    "year": 2019,
    "tag": "TV, April 2019",
    "mediaType": "tv",
    "phase": "Phase 3",
    "hero": "Cloak & Dagger",
    "runtime": "Series"
  },
  {
    "id": "avengers_endgame_2019",
    "title": "Avengers: Endgame",
    "year": 2019,
    "tag": "Film, April 2019",
    "mediaType": "movie",
    "phase": "Phase 3",
    "hero": "The Avengers",
    "runtime": "181m"
  },
  {
    "id": "agents_of_s_h_i_e_l_d_season_6_2019",
    "title": "Agents of S.H.I.E.L.D. Season 6",
    "year": 2019,
    "tag": "TV, May 2019",
    "mediaType": "tv",
    "phase": "Phase 3",
    "hero": "Marvel Universe",
    "runtime": "Series"
  },
  {
    "id": "jessica_jones_season_3_2019",
    "title": "Jessica Jones Season 3",
    "year": 2019,
    "tag": "TV, June 2019",
    "mediaType": "tv",
    "phase": "Phase 3",
    "hero": "Jessica Jones",
    "runtime": "Series"
  },
  {
    "id": "spider_man_far_from_home_2019",
    "title": "Spider-Man: Far From Home",
    "year": 2019,
    "tag": "Film, July 2019",
    "mediaType": "movie",
    "phase": "Phase 3",
    "hero": "Spider-Man",
    "runtime": "120m"
  },
  {
    "id": "runaways_season_3_2019",
    "title": "Runaways Season 3",
    "year": 2019,
    "tag": "TV, Dec 2019",
    "mediaType": "tv",
    "phase": "Phase 3",
    "hero": "Runaways",
    "runtime": "Series"
  },
  {
    "id": "agents_of_s_h_i_e_l_d_season_7_2020",
    "title": "Agents of S.H.I.E.L.D. Season 7",
    "year": 2020,
    "tag": "TV, May 2020",
    "mediaType": "tv",
    "phase": "Phase 3",
    "hero": "Marvel Universe",
    "runtime": "Series"
  },
  {
    "id": "helstrom_season_1_2020",
    "title": "Helstrom Season 1",
    "year": 2020,
    "tag": "TV, Oct 2020",
    "mediaType": "tv",
    "phase": "Phase 3",
    "hero": "Marvel Universe",
    "runtime": "Series"
  },
  {
    "id": "wandavision_2021",
    "title": "WandaVision",
    "year": 2021,
    "tag": "Disney+ Series, Jan 2021",
    "mediaType": "tv",
    "phase": "Phase 4",
    "hero": "Wanda & Vision",
    "runtime": "Series"
  },
  {
    "id": "the_falcon_and_the_winter_soldier_2021",
    "title": "The Falcon and the Winter Soldier",
    "year": 2021,
    "tag": "Disney+ Series, March 2021",
    "mediaType": "tv",
    "phase": "Phase 4",
    "hero": "Falcon & Bucky",
    "runtime": "Series"
  },
  {
    "id": "loki_season_1_2021",
    "title": "Loki Season 1",
    "year": 2021,
    "tag": "Disney+ Series, June 2021",
    "mediaType": "tv",
    "phase": "Phase 4",
    "hero": "Loki",
    "runtime": "Series"
  },
  {
    "id": "black_widow_2021",
    "title": "Black Widow",
    "year": 2021,
    "tag": "Film, July 2021",
    "mediaType": "movie",
    "phase": "Phase 4",
    "hero": "Black Widow",
    "runtime": "120m"
  },
  {
    "id": "what_if_season_1_2021",
    "title": "What If...? Season 1",
    "year": 2021,
    "tag": "Animated Series, Aug 2021",
    "mediaType": "tv",
    "phase": "Phase 4",
    "hero": "Multiverse",
    "runtime": "Series"
  },
  {
    "id": "shang_chi_and_the_legend_of_the_ten_rings_2021",
    "title": "Shang-Chi and the Legend of the Ten Rings",
    "year": 2021,
    "tag": "Film, Sept 2021",
    "mediaType": "movie",
    "phase": "Phase 4",
    "hero": "Shang-Chi",
    "runtime": "132m"
  },
  {
    "id": "eternals_2021",
    "title": "Eternals",
    "year": 2021,
    "tag": "Film, Nov 2021",
    "mediaType": "movie",
    "phase": "Phase 4",
    "hero": "Eternals",
    "runtime": "120m"
  },
  {
    "id": "hawkeye_2021",
    "title": "Hawkeye",
    "year": 2021,
    "tag": "Disney+ Series, Nov 2021",
    "mediaType": "tv",
    "phase": "Phase 4",
    "hero": "Hawkeye",
    "runtime": "Series"
  },
  {
    "id": "spider_man_no_way_home_2021",
    "title": "Spider-Man: No Way Home",
    "year": 2021,
    "tag": "Film, Dec 2021",
    "mediaType": "movie",
    "phase": "Phase 4",
    "hero": "Spider-Man",
    "runtime": "148m"
  },
  {
    "id": "moon_knight_2022",
    "title": "Moon Knight",
    "year": 2022,
    "tag": "Disney+ Series, March 2022",
    "mediaType": "tv",
    "phase": "Phase 4",
    "hero": "Moon Knight",
    "runtime": "Series"
  },
  {
    "id": "doctor_strange_in_the_multiverse_of_madness_2022",
    "title": "Doctor Strange in the Multiverse of Madness",
    "year": 2022,
    "tag": "Film, May 2022",
    "mediaType": "movie",
    "phase": "Phase 4",
    "hero": "Doctor Strange",
    "runtime": "126m"
  },
  {
    "id": "ms_marvel_2022",
    "title": "Ms. Marvel",
    "year": 2022,
    "tag": "Disney+ Series, June 2022",
    "mediaType": "tv",
    "phase": "Phase 4",
    "hero": "Ms. Marvel",
    "runtime": "Series"
  },
  {
    "id": "thor_love_and_thunder_2022",
    "title": "Thor: Love and Thunder",
    "year": 2022,
    "tag": "Film, July 2022",
    "mediaType": "movie",
    "phase": "Phase 4",
    "hero": "Thor",
    "runtime": "120m"
  },
  {
    "id": "i_am_groot_season_1_2022",
    "title": "I Am Groot Season 1",
    "year": 2022,
    "tag": "Animated Shorts, Aug 2022",
    "mediaType": "tv",
    "phase": "Phase 4",
    "hero": "Groot",
    "runtime": "Series"
  },
  {
    "id": "she_hulk_attorney_at_law_2022",
    "title": "She-Hulk: Attorney at Law",
    "year": 2022,
    "tag": "Disney+ Series, Aug 2022",
    "mediaType": "tv",
    "phase": "Phase 4",
    "hero": "Hulk",
    "runtime": "Series"
  },
  {
    "id": "werewolf_by_night_2022",
    "title": "Werewolf by Night",
    "year": 2022,
    "tag": "Special Presentation, Oct 2022",
    "mediaType": "movie",
    "phase": "Phase 4",
    "hero": "Marvel Universe",
    "runtime": "120m"
  },
  {
    "id": "black_panther_wakanda_forever_2022",
    "title": "Black Panther: Wakanda Forever",
    "year": 2022,
    "tag": "Film, Nov 2022",
    "mediaType": "movie",
    "phase": "Phase 4",
    "hero": "Black Panther",
    "runtime": "161m"
  },
  {
    "id": "the_guardians_of_the_galaxy_holiday_special_2022",
    "title": "The Guardians of the Galaxy Holiday Special",
    "year": 2022,
    "tag": "Special, Nov 2022",
    "mediaType": "movie",
    "phase": "Phase 4",
    "hero": "Guardians",
    "runtime": "120m"
  },
  {
    "id": "ant_man_and_the_wasp_quantumania_2023",
    "title": "Ant-Man and the Wasp: Quantumania",
    "year": 2023,
    "tag": "Film, Feb 2023",
    "mediaType": "movie",
    "phase": "Phase 5",
    "hero": "Ant-Man",
    "runtime": "120m"
  },
  {
    "id": "guardians_of_the_galaxy_vol_3_2023",
    "title": "Guardians of the Galaxy Vol. 3",
    "year": 2023,
    "tag": "Film, May 2023",
    "mediaType": "movie",
    "phase": "Phase 5",
    "hero": "Guardians",
    "runtime": "120m"
  },
  {
    "id": "secret_invasion_2023",
    "title": "Secret Invasion",
    "year": 2023,
    "tag": "Disney+ Series, June 2023",
    "mediaType": "tv",
    "phase": "Phase 5",
    "hero": "Nick Fury",
    "runtime": "Series"
  },
  {
    "id": "i_am_groot_season_2_2023",
    "title": "I Am Groot Season 2",
    "year": 2023,
    "tag": "Animated Shorts, Sept 2023",
    "mediaType": "tv",
    "phase": "Phase 5",
    "hero": "Groot",
    "runtime": "Series"
  },
  {
    "id": "loki_season_2_2023",
    "title": "Loki Season 2",
    "year": 2023,
    "tag": "Disney+ Series, Oct 2023",
    "mediaType": "tv",
    "phase": "Phase 5",
    "hero": "Loki",
    "runtime": "Series"
  },
  {
    "id": "the_marvels_2023",
    "title": "The Marvels",
    "year": 2023,
    "tag": "Film, Nov 2023",
    "mediaType": "movie",
    "phase": "Phase 5",
    "hero": "Captain Marvel",
    "runtime": "120m"
  },
  {
    "id": "what_if_season_2_2023",
    "title": "What If...? Season 2",
    "year": 2023,
    "tag": "Animated Series, Dec 2023",
    "mediaType": "tv",
    "phase": "Phase 5",
    "hero": "Multiverse",
    "runtime": "Series"
  },
  {
    "id": "echo_2024",
    "title": "Echo",
    "year": 2024,
    "tag": "Disney+ Series, Jan 2024",
    "mediaType": "tv",
    "phase": "Phase 5",
    "hero": "Echo",
    "runtime": "Series"
  },
  {
    "id": "deadpool_wolverine_2024",
    "title": "Deadpool & Wolverine",
    "year": 2024,
    "tag": "Film, July 2024",
    "mediaType": "movie",
    "phase": "Phase 5",
    "hero": "Deadpool & Wolverine",
    "runtime": "128m"
  },
  {
    "id": "agatha_all_along_2024",
    "title": "Agatha All Along",
    "year": 2024,
    "tag": "Disney+ Series, Sept 2024",
    "mediaType": "tv",
    "phase": "Phase 5",
    "hero": "Agatha Harkness",
    "runtime": "Series"
  },
  {
    "id": "what_if_season_3_2024",
    "title": "What If...? Season 3",
    "year": 2024,
    "tag": "Animated Series, Dec 2024",
    "mediaType": "tv",
    "phase": "Phase 5",
    "hero": "Multiverse",
    "runtime": "Series"
  },
  {
    "id": "your_friendly_neighborhood_spider_man_season_1_2024",
    "title": "Your Friendly Neighborhood Spider-Man Season 1",
    "year": 2024,
    "tag": "Animated Series, Nov 2024",
    "mediaType": "tv",
    "phase": "Phase 5",
    "hero": "Spider-Man",
    "runtime": "Series"
  },
  {
    "id": "captain_america_brave_new_world_2025",
    "title": "Captain America: Brave New World",
    "year": 2025,
    "tag": "Film, Feb 2025",
    "mediaType": "movie",
    "phase": "Phase 5",
    "hero": "Captain America",
    "runtime": "120m"
  },
  {
    "id": "daredevil_born_again_season_1_2025",
    "title": "Daredevil: Born Again Season 1",
    "year": 2025,
    "tag": "Disney+ Series, March 2025",
    "mediaType": "tv",
    "phase": "Phase 5",
    "hero": "Daredevil",
    "runtime": "Series"
  },
  {
    "id": "thunderbolts_2025",
    "title": "Thunderbolts*",
    "year": 2025,
    "tag": "Film, May 2025",
    "mediaType": "movie",
    "phase": "Phase 5",
    "hero": "Thunderbolts",
    "runtime": "120m"
  },
  {
    "id": "ironheart_2025",
    "title": "Ironheart",
    "year": 2025,
    "tag": "Disney+ Series, June 2025",
    "mediaType": "tv",
    "phase": "Phase 5",
    "hero": "Marvel Universe",
    "runtime": "Series"
  },
  {
    "id": "eyes_of_wakanda_2025",
    "title": "Eyes of Wakanda",
    "year": 2025,
    "tag": "Animated Series, Aug 2025",
    "mediaType": "tv",
    "phase": "Phase 5",
    "hero": "Marvel Universe",
    "runtime": "Series"
  },
  {
    "id": "marvel_zombies_2025",
    "title": "Marvel Zombies",
    "year": 2025,
    "tag": "Animated Series, Oct 2025",
    "mediaType": "tv",
    "phase": "Phase 5",
    "hero": "Marvel Universe",
    "runtime": "Series"
  },
  {
    "id": "the_fantastic_four_first_steps_2025",
    "title": "The Fantastic Four: First Steps",
    "year": 2025,
    "tag": "Film, July 2025",
    "mediaType": "movie",
    "phase": "Phase 6",
    "hero": "Fantastic Four",
    "runtime": "120m"
  },
  {
    "id": "wonder_man_2026",
    "title": "Wonder Man",
    "year": 2026,
    "tag": "Disney+ Series, Jan 2026",
    "mediaType": "tv",
    "phase": "Phase 6",
    "hero": "Marvel Universe",
    "runtime": "Series"
  },
  {
    "id": "daredevil_born_again_season_2_2026",
    "title": "Daredevil: Born Again Season 2",
    "year": 2026,
    "tag": "Disney+ Series, March 2026",
    "mediaType": "tv",
    "phase": "Phase 6",
    "hero": "Daredevil",
    "runtime": "Series"
  },
  {
    "id": "the_punisher_one_last_kill_2026",
    "title": "The Punisher: One Last Kill",
    "year": 2026,
    "tag": "Special Presentation, May 2026",
    "mediaType": "movie",
    "phase": "Phase 6",
    "hero": "The Punisher",
    "runtime": "120m"
  },
  {
    "id": "spider_man_brand_new_day_2026",
    "title": "Spider-Man: Brand New Day",
    "year": 2026,
    "tag": "Film, July 2026",
    "mediaType": "movie",
    "phase": "Phase 6",
    "hero": "Spider-Man",
    "runtime": "120m"
  },
  {
    "id": "visionquest_2026",
    "title": "VisionQuest",
    "year": 2026,
    "tag": "Disney+ Series, Oct 2026",
    "mediaType": "tv",
    "phase": "Phase 6",
    "hero": "Vision",
    "runtime": "8 Episodes"
  },
  {
    "id": "avengers_doomsday_2026",
    "title": "Avengers: Doomsday",
    "year": 2026,
    "tag": "Film, Dec 2026",
    "mediaType": "movie",
    "phase": "Phase 6",
    "hero": "The Avengers",
    "runtime": "120m"
  },
  {
    "id": "your_friendly_neighborhood_spider_man_season_2_2027",
    "title": "Your Friendly Neighborhood Spider-Man Season 2",
    "year": 2027,
    "tag": "Animated Series, Jan 2027",
    "mediaType": "tv",
    "phase": "Phase 6",
    "hero": "Spider-Man",
    "runtime": "Series"
  },
  {
    "id": "daredevil_born_again_season_3_2027",
    "title": "Daredevil: Born Again Season 3",
    "year": 2027,
    "tag": "Disney+ Series, March 2027",
    "mediaType": "tv",
    "phase": "Phase 6",
    "hero": "Daredevil",
    "runtime": "Series"
  },
  {
    "id": "x_men_97_season_3_2027",
    "title": "X-Men '97 Season 3",
    "year": 2027,
    "tag": "Animated Series, Fall 2027",
    "mediaType": "tv",
    "phase": "Phase 6",
    "hero": "X-Men",
    "runtime": "Series"
  },
  {
    "id": "marvel_zombies_specials_2027",
    "title": "Marvel Zombies Specials",
    "year": 2027,
    "tag": "Animated Specials, Halloween 2027\u20132029",
    "mediaType": "movie",
    "phase": "Phase 6",
    "hero": "Marvel Universe",
    "runtime": "120m"
  },
  {
    "id": "avengers_secret_wars_2027",
    "title": "Avengers: Secret Wars",
    "year": 2027,
    "tag": "Film, Dec 2027",
    "mediaType": "movie",
    "phase": "Phase 6",
    "hero": "The Avengers",
    "runtime": "120m"
  },
  {
    "id": "untitled_x_men_movie_2028",
    "title": "Untitled X-Men Movie",
    "year": 2028,
    "tag": "Film, May 2028",
    "mediaType": "movie",
    "phase": "Phase 6",
    "hero": "X-Men",
    "runtime": "104m"
  },
  {
    "id": "ghost_rider_2028",
    "title": "Ghost Rider",
    "year": 2028,
    "tag": "Film, July 2028",
    "mediaType": "movie",
    "phase": "Phase 6",
    "hero": "Ghost Rider",
    "runtime": "120m"
  },
  {
    "id": "black_panther_3_2028",
    "title": "Black Panther 3",
    "year": 2028,
    "tag": "Film, Dec 2028",
    "mediaType": "movie",
    "phase": "Phase 6",
    "hero": "Black Panther",
    "runtime": "120m"
  },
  {
    "id": "zodiac_2028",
    "title": "Zodiac",
    "year": 2028,
    "tag": "Disney+ Series, 2028",
    "mediaType": "tv",
    "phase": "Phase 6",
    "hero": "Marvel Universe",
    "runtime": "Series"
  },
  {
    "id": "armor_wars_2024",
    "title": "Armor Wars",
    "year": 2024,
    "tag": "Film, TBA",
    "mediaType": "movie",
    "phase": "Phase 6",
    "hero": "Marvel Universe",
    "runtime": "120m"
  },
  {
    "id": "blade_2024",
    "title": "Blade",
    "year": 2024,
    "tag": "Film, TBA",
    "mediaType": "movie",
    "phase": "Phase 6",
    "hero": "Blade",
    "runtime": "120m"
  },
  {
    "id": "nova_2024",
    "title": "Nova",
    "year": 2024,
    "tag": "Film, TBA",
    "mediaType": "movie",
    "phase": "Phase 6",
    "hero": "Marvel Universe",
    "runtime": "120m"
  },
  {
    "id": "shang_chi_2_2024",
    "title": "Shang-Chi 2",
    "year": 2024,
    "tag": "Film, TBA",
    "mediaType": "movie",
    "phase": "Phase 6",
    "hero": "Shang-Chi",
    "runtime": "132m"
  },
  {
    "id": "star_lord_project_2024",
    "title": "Star-Lord Project",
    "year": 2024,
    "tag": "Disney+ Series, TBA",
    "mediaType": "tv",
    "phase": "Phase 6",
    "hero": "Marvel Universe",
    "runtime": "Series"
  },
  {
    "id": "untitled_wakanda_okoye_series_2024",
    "title": "Untitled Wakanda / Okoye Series",
    "year": 2024,
    "tag": "Disney+ Series, TBA",
    "mediaType": "tv",
    "phase": "Phase 6",
    "hero": "Marvel Universe",
    "runtime": "Series"
  }
];

export const MCU_STORY_ITEMS: MarvelItem[] = [
  {
    "id": "captain_america_the_first_avenger_2011",
    "title": "Captain America: The First Avenger",
    "year": 2011,
    "tag": "Film, July 2011",
    "mediaType": "movie",
    "phase": "Phase 1",
    "hero": "Captain America",
    "runtime": "124m"
  },
  {
    "id": "iron_man_2008",
    "title": "Iron Man",
    "year": 2008,
    "tag": "Film, May 2008",
    "mediaType": "movie",
    "phase": "Phase 1",
    "hero": "Iron Man",
    "runtime": "126m"
  },
  {
    "id": "iron_man_2_2010",
    "title": "Iron Man 2",
    "year": 2010,
    "tag": "Film, May 2010",
    "mediaType": "movie",
    "phase": "Phase 1",
    "hero": "Iron Man",
    "runtime": "126m"
  },
  {
    "id": "the_incredible_hulk_2008",
    "title": "The Incredible Hulk",
    "year": 2008,
    "tag": "Film, June 2008",
    "mediaType": "movie",
    "phase": "Phase 1",
    "hero": "Hulk",
    "runtime": "120m"
  },
  {
    "id": "marvel_one_shot_the_consultant_2011",
    "title": "Marvel One-Shot: The Consultant",
    "year": 2011,
    "tag": "Short Film, Sept 2011",
    "mediaType": "short",
    "phase": "Phase 1",
    "hero": "Marvel Universe",
    "runtime": "15m"
  },
  {
    "id": "thor_2011",
    "title": "Thor",
    "year": 2011,
    "tag": "Film, May 2011",
    "mediaType": "movie",
    "phase": "Phase 1",
    "hero": "Thor",
    "runtime": "120m"
  },
  {
    "id": "marvel_one_shot_a_funny_thing_happened_on_the_way_to_thor_s_hammer_2011",
    "title": "Marvel One-Shot: A Funny Thing Happened on the Way to Thor's Hammer",
    "year": 2011,
    "tag": "Short Film, Oct 2011",
    "mediaType": "short",
    "phase": "Phase 1",
    "hero": "Thor",
    "runtime": "15m"
  },
  {
    "id": "the_avengers_2012",
    "title": "The Avengers",
    "year": 2012,
    "tag": "Film, May 2012",
    "mediaType": "movie",
    "phase": "Phase 1",
    "hero": "The Avengers",
    "runtime": "143m"
  },
  {
    "id": "marvel_one_shot_item_47_2012",
    "title": "Marvel One-Shot: Item 47",
    "year": 2012,
    "tag": "Short Film, Sept 2012",
    "mediaType": "short",
    "phase": "Phase 1",
    "hero": "Marvel Universe",
    "runtime": "15m"
  },
  {
    "id": "iron_man_3_2013",
    "title": "Iron Man 3",
    "year": 2013,
    "tag": "Film, May 2013",
    "mediaType": "movie",
    "phase": "Phase 2",
    "hero": "Iron Man",
    "runtime": "126m"
  },
  {
    "id": "marvel_one_shot_all_hail_the_king_2014",
    "title": "Marvel One-Shot: All Hail the King",
    "year": 2014,
    "tag": "Short Film, Feb 2014",
    "mediaType": "short",
    "phase": "Phase 2",
    "hero": "Marvel Universe",
    "runtime": "15m"
  },
  {
    "id": "marvel_one_shot_agent_carter_2013",
    "title": "Marvel One-Shot: Agent Carter",
    "year": 2013,
    "tag": "Short Film, Sept 2013",
    "mediaType": "short",
    "phase": "Phase 2",
    "hero": "Agent Carter",
    "runtime": "15m"
  },
  {
    "id": "agents_of_s_h_i_e_l_d_season_1_2013",
    "title": "Agents of S.H.I.E.L.D. Season 1",
    "year": 2013,
    "tag": "TV, Sept 2013",
    "mediaType": "tv",
    "phase": "Phase 2",
    "hero": "Marvel Universe",
    "runtime": "Series"
  },
  {
    "id": "thor_the_dark_world_2013",
    "title": "Thor: The Dark World",
    "year": 2013,
    "tag": "Film, Nov 2013",
    "mediaType": "movie",
    "phase": "Phase 2",
    "hero": "Thor",
    "runtime": "120m"
  },
  {
    "id": "captain_america_the_winter_soldier_2014",
    "title": "Captain America: The Winter Soldier",
    "year": 2014,
    "tag": "Film, April 2014",
    "mediaType": "movie",
    "phase": "Phase 2",
    "hero": "Captain America",
    "runtime": "120m"
  },
  {
    "id": "guardians_of_the_galaxy_2014",
    "title": "Guardians of the Galaxy",
    "year": 2014,
    "tag": "Film, Aug 2014",
    "mediaType": "movie",
    "phase": "Phase 2",
    "hero": "Guardians",
    "runtime": "120m"
  },
  {
    "id": "i_am_groot_season_1_2022",
    "title": "I Am Groot Season 1",
    "year": 2022,
    "tag": "Animated Shorts, Aug 2022",
    "mediaType": "tv",
    "phase": "Phase 2",
    "hero": "Groot",
    "runtime": "Series"
  },
  {
    "id": "guardians_of_the_galaxy_vol_2_2017",
    "title": "Guardians of the Galaxy Vol. 2",
    "year": 2017,
    "tag": "Film, May 2017",
    "mediaType": "movie",
    "phase": "Phase 2",
    "hero": "Guardians",
    "runtime": "120m"
  },
  {
    "id": "i_am_groot_season_2_2023",
    "title": "I Am Groot Season 2",
    "year": 2023,
    "tag": "Animated Shorts, Sept 2023",
    "mediaType": "tv",
    "phase": "Phase 2",
    "hero": "Groot",
    "runtime": "Series"
  },
  {
    "id": "agents_of_s_h_i_e_l_d_season_2_2014",
    "title": "Agents of S.H.I.E.L.D. Season 2",
    "year": 2014,
    "tag": "TV, Sept 2014",
    "mediaType": "tv",
    "phase": "Phase 2",
    "hero": "Marvel Universe",
    "runtime": "Series"
  },
  {
    "id": "agent_carter_season_1_2015",
    "title": "Agent Carter Season 1",
    "year": 2015,
    "tag": "TV, Jan 2015",
    "mediaType": "tv",
    "phase": "Phase 2",
    "hero": "Agent Carter",
    "runtime": "Series"
  },
  {
    "id": "daredevil_season_1_2015",
    "title": "Daredevil Season 1",
    "year": 2015,
    "tag": "TV, April 2015",
    "mediaType": "tv",
    "phase": "Phase 2",
    "hero": "Daredevil",
    "runtime": "Series"
  },
  {
    "id": "avengers_age_of_ultron_2015",
    "title": "Avengers: Age of Ultron",
    "year": 2015,
    "tag": "Film, May 2015",
    "mediaType": "movie",
    "phase": "Phase 2",
    "hero": "The Avengers",
    "runtime": "120m"
  },
  {
    "id": "ant_man_2015",
    "title": "Ant-Man",
    "year": 2015,
    "tag": "Film, July 2015",
    "mediaType": "movie",
    "phase": "Phase 2",
    "hero": "Ant-Man",
    "runtime": "120m"
  },
  {
    "id": "agent_carter_season_2_2016",
    "title": "Agent Carter Season 2",
    "year": 2016,
    "tag": "TV, Jan 2016",
    "mediaType": "tv",
    "phase": "Phase 3",
    "hero": "Agent Carter",
    "runtime": "Series"
  },
  {
    "id": "jessica_jones_season_1_2015",
    "title": "Jessica Jones Season 1",
    "year": 2015,
    "tag": "TV, Nov 2015",
    "mediaType": "tv",
    "phase": "Phase 3",
    "hero": "Jessica Jones",
    "runtime": "Series"
  },
  {
    "id": "daredevil_season_2_2016",
    "title": "Daredevil Season 2",
    "year": 2016,
    "tag": "TV, March 2016",
    "mediaType": "tv",
    "phase": "Phase 3",
    "hero": "Daredevil",
    "runtime": "Series"
  },
  {
    "id": "agents_of_s_h_i_e_l_d_season_3_2015",
    "title": "Agents of S.H.I.E.L.D. Season 3",
    "year": 2015,
    "tag": "TV, Sept 2015",
    "mediaType": "tv",
    "phase": "Phase 3",
    "hero": "Marvel Universe",
    "runtime": "Series"
  },
  {
    "id": "captain_america_civil_war_2016",
    "title": "Captain America: Civil War",
    "year": 2016,
    "tag": "Film, May 2016",
    "mediaType": "movie",
    "phase": "Phase 3",
    "hero": "Captain America",
    "runtime": "147m"
  },
  {
    "id": "black_widow_2021",
    "title": "Black Widow",
    "year": 2021,
    "tag": "Film, July 2021",
    "mediaType": "movie",
    "phase": "Phase 3",
    "hero": "Black Widow",
    "runtime": "120m"
  },
  {
    "id": "black_panther_2018",
    "title": "Black Panther",
    "year": 2018,
    "tag": "Film, Feb 2018",
    "mediaType": "movie",
    "phase": "Phase 3",
    "hero": "Black Panther",
    "runtime": "120m"
  },
  {
    "id": "spider_man_homecoming_2017",
    "title": "Spider-Man: Homecoming",
    "year": 2017,
    "tag": "Film, July 2017",
    "mediaType": "movie",
    "phase": "Phase 3",
    "hero": "Spider-Man",
    "runtime": "120m"
  },
  {
    "id": "luke_cage_season_1_2016",
    "title": "Luke Cage Season 1",
    "year": 2016,
    "tag": "TV, Sept 2016",
    "mediaType": "tv",
    "phase": "Phase 3",
    "hero": "Luke Cage",
    "runtime": "Series"
  },
  {
    "id": "doctor_strange_2016",
    "title": "Doctor Strange",
    "year": 2016,
    "tag": "Film, Nov 2016",
    "mediaType": "movie",
    "phase": "Phase 3",
    "hero": "Doctor Strange",
    "runtime": "120m"
  },
  {
    "id": "agents_of_s_h_i_e_l_d_season_4_2016",
    "title": "Agents of S.H.I.E.L.D. Season 4",
    "year": 2016,
    "tag": "TV, Sept 2016",
    "mediaType": "tv",
    "phase": "Phase 3",
    "hero": "Marvel Universe",
    "runtime": "Series"
  },
  {
    "id": "iron_fist_season_1_2017",
    "title": "Iron Fist Season 1",
    "year": 2017,
    "tag": "TV, March 2017",
    "mediaType": "tv",
    "phase": "Phase 3",
    "hero": "Iron Fist",
    "runtime": "Series"
  },
  {
    "id": "the_defenders_season_1_2017",
    "title": "The Defenders Season 1",
    "year": 2017,
    "tag": "TV, Aug 2017",
    "mediaType": "tv",
    "phase": "Phase 3",
    "hero": "The Defenders",
    "runtime": "Series"
  },
  {
    "id": "the_punisher_season_1_2017",
    "title": "The Punisher Season 1",
    "year": 2017,
    "tag": "TV, Nov 2017",
    "mediaType": "tv",
    "phase": "Phase 3",
    "hero": "The Punisher",
    "runtime": "Series"
  },
  {
    "id": "inhumans_season_1_2017",
    "title": "Inhumans Season 1",
    "year": 2017,
    "tag": "TV, Sept 2017",
    "mediaType": "tv",
    "phase": "Phase 3",
    "hero": "Marvel Universe",
    "runtime": "Series"
  },
  {
    "id": "runaways_season_1_2017",
    "title": "Runaways Season 1",
    "year": 2017,
    "tag": "TV, Nov 2017",
    "mediaType": "tv",
    "phase": "Phase 3",
    "hero": "Runaways",
    "runtime": "Series"
  },
  {
    "id": "cloak_dagger_season_1_2018",
    "title": "Cloak & Dagger Season 1",
    "year": 2018,
    "tag": "TV, June 2018",
    "mediaType": "tv",
    "phase": "Phase 3",
    "hero": "Cloak & Dagger",
    "runtime": "Series"
  },
  {
    "id": "jessica_jones_season_2_2018",
    "title": "Jessica Jones Season 2",
    "year": 2018,
    "tag": "TV, March 2018",
    "mediaType": "tv",
    "phase": "Phase 3",
    "hero": "Jessica Jones",
    "runtime": "Series"
  },
  {
    "id": "luke_cage_season_2_2018",
    "title": "Luke Cage Season 2",
    "year": 2018,
    "tag": "TV, June 2018",
    "mediaType": "tv",
    "phase": "Phase 3",
    "hero": "Luke Cage",
    "runtime": "Series"
  },
  {
    "id": "iron_fist_season_2_2018",
    "title": "Iron Fist Season 2",
    "year": 2018,
    "tag": "TV, Sept 2018",
    "mediaType": "tv",
    "phase": "Phase 3",
    "hero": "Iron Fist",
    "runtime": "Series"
  },
  {
    "id": "daredevil_season_3_2018",
    "title": "Daredevil Season 3",
    "year": 2018,
    "tag": "TV, Oct 2018",
    "mediaType": "tv",
    "phase": "Phase 3",
    "hero": "Daredevil",
    "runtime": "Series"
  },
  {
    "id": "runaways_season_2_2018",
    "title": "Runaways Season 2",
    "year": 2018,
    "tag": "TV, Dec 2018",
    "mediaType": "tv",
    "phase": "Phase 3",
    "hero": "Runaways",
    "runtime": "Series"
  },
  {
    "id": "the_punisher_season_2_2019",
    "title": "The Punisher Season 2",
    "year": 2019,
    "tag": "TV, Jan 2019",
    "mediaType": "tv",
    "phase": "Phase 3",
    "hero": "The Punisher",
    "runtime": "Series"
  },
  {
    "id": "cloak_dagger_season_2_2019",
    "title": "Cloak & Dagger Season 2",
    "year": 2019,
    "tag": "TV, April 2019",
    "mediaType": "tv",
    "phase": "Phase 3",
    "hero": "Cloak & Dagger",
    "runtime": "Series"
  },
  {
    "id": "jessica_jones_season_3_2019",
    "title": "Jessica Jones Season 3",
    "year": 2019,
    "tag": "TV, June 2019",
    "mediaType": "tv",
    "phase": "Phase 3",
    "hero": "Jessica Jones",
    "runtime": "Series"
  },
  {
    "id": "runaways_season_3_2019",
    "title": "Runaways Season 3",
    "year": 2019,
    "tag": "TV, Dec 2019",
    "mediaType": "tv",
    "phase": "Phase 3",
    "hero": "Runaways",
    "runtime": "Series"
  },
  {
    "id": "agents_of_s_h_i_e_l_d_season_5_2017",
    "title": "Agents of S.H.I.E.L.D. Season 5",
    "year": 2017,
    "tag": "TV, Dec 2017",
    "mediaType": "tv",
    "phase": "Phase 3",
    "hero": "Marvel Universe",
    "runtime": "Series"
  },
  {
    "id": "helstrom_season_1_2020",
    "title": "Helstrom Season 1",
    "year": 2020,
    "tag": "TV, Oct 2020",
    "mediaType": "tv",
    "phase": "Phase 3",
    "hero": "Marvel Universe",
    "runtime": "Series"
  },
  {
    "id": "thor_ragnarok_2017",
    "title": "Thor: Ragnarok",
    "year": 2017,
    "tag": "Film, Nov 2017",
    "mediaType": "movie",
    "phase": "Phase 3",
    "hero": "Thor",
    "runtime": "120m"
  },
  {
    "id": "marvel_one_shot_team_thor_2016",
    "title": "Marvel One-Shot: Team Thor",
    "year": 2016,
    "tag": "Short Film, Aug 2016",
    "mediaType": "short",
    "phase": "Phase 3",
    "hero": "Thor",
    "runtime": "15m"
  },
  {
    "id": "marvel_one_shot_team_thor_part_2_2017",
    "title": "Marvel One-Shot: Team Thor: Part 2",
    "year": 2017,
    "tag": "Short Film, Feb 2017",
    "mediaType": "short",
    "phase": "Phase 3",
    "hero": "Thor",
    "runtime": "15m"
  },
  {
    "id": "marvel_one_shot_team_darryl_2018",
    "title": "Marvel One-Shot: Team Darryl",
    "year": 2018,
    "tag": "Short Film, Feb 2018",
    "mediaType": "short",
    "phase": "Phase 3",
    "hero": "Marvel Universe",
    "runtime": "15m"
  },
  {
    "id": "ant_man_and_the_wasp_2018",
    "title": "Ant-Man and the Wasp",
    "year": 2018,
    "tag": "Film, July 2018",
    "mediaType": "movie",
    "phase": "Phase 3",
    "hero": "Ant-Man",
    "runtime": "120m"
  },
  {
    "id": "avengers_infinity_war_2018",
    "title": "Avengers: Infinity War",
    "year": 2018,
    "tag": "Film, April 2018",
    "mediaType": "movie",
    "phase": "Phase 3",
    "hero": "The Avengers",
    "runtime": "149m"
  },
  {
    "id": "avengers_endgame_2019",
    "title": "Avengers: Endgame",
    "year": 2019,
    "tag": "Film, April 2019",
    "mediaType": "movie",
    "phase": "Phase 3",
    "hero": "The Avengers",
    "runtime": "181m"
  },
  {
    "id": "captain_marvel_2019",
    "title": "Captain Marvel",
    "year": 2019,
    "tag": "Film, March 2019",
    "mediaType": "movie",
    "phase": "Phase 3",
    "hero": "Captain Marvel",
    "runtime": "120m"
  },
  {
    "id": "loki_season_1_2021",
    "title": "Loki Season 1",
    "year": 2021,
    "tag": "Disney+ Series, June 2021",
    "mediaType": "tv",
    "phase": "Phase 4",
    "hero": "Loki",
    "runtime": "Series"
  },
  {
    "id": "what_if_season_1_2021",
    "title": "What If...? Season 1",
    "year": 2021,
    "tag": "Animated Series, Aug 2021",
    "mediaType": "tv",
    "phase": "Phase 4",
    "hero": "Multiverse",
    "runtime": "Series"
  },
  {
    "id": "agents_of_s_h_i_e_l_d_season_6_2019",
    "title": "Agents of S.H.I.E.L.D. Season 6",
    "year": 2019,
    "tag": "TV, May 2019",
    "mediaType": "tv",
    "phase": "Phase 4",
    "hero": "Marvel Universe",
    "runtime": "Series"
  },
  {
    "id": "agents_of_s_h_i_e_l_d_season_7_2020",
    "title": "Agents of S.H.I.E.L.D. Season 7",
    "year": 2020,
    "tag": "TV, May 2020",
    "mediaType": "tv",
    "phase": "Phase 4",
    "hero": "Marvel Universe",
    "runtime": "Series"
  },
  {
    "id": "wandavision_2021",
    "title": "WandaVision",
    "year": 2021,
    "tag": "Disney+ Series, Jan 2021",
    "mediaType": "tv",
    "phase": "Phase 4",
    "hero": "Wanda & Vision",
    "runtime": "Series"
  },
  {
    "id": "the_falcon_and_the_winter_soldier_2021",
    "title": "The Falcon and the Winter Soldier",
    "year": 2021,
    "tag": "Disney+ Series, March 2021",
    "mediaType": "tv",
    "phase": "Phase 4",
    "hero": "Falcon & Bucky",
    "runtime": "Series"
  },
  {
    "id": "shang_chi_and_the_legend_of_the_ten_rings_2021",
    "title": "Shang-Chi and the Legend of the Ten Rings",
    "year": 2021,
    "tag": "Film, Sept 2021",
    "mediaType": "movie",
    "phase": "Phase 4",
    "hero": "Shang-Chi",
    "runtime": "132m"
  },
  {
    "id": "eternals_2021",
    "title": "Eternals",
    "year": 2021,
    "tag": "Film, Nov 2021",
    "mediaType": "movie",
    "phase": "Phase 4",
    "hero": "Eternals",
    "runtime": "120m"
  },
  {
    "id": "spider_man_far_from_home_2019",
    "title": "Spider-Man: Far From Home",
    "year": 2019,
    "tag": "Film, July 2019",
    "mediaType": "movie",
    "phase": "Phase 4",
    "hero": "Spider-Man",
    "runtime": "120m"
  },
  {
    "id": "spider_man_no_way_home_2021",
    "title": "Spider-Man: No Way Home",
    "year": 2021,
    "tag": "Film, Dec 2021",
    "mediaType": "movie",
    "phase": "Phase 4",
    "hero": "Spider-Man",
    "runtime": "148m"
  },
  {
    "id": "doctor_strange_in_the_multiverse_of_madness_2022",
    "title": "Doctor Strange in the Multiverse of Madness",
    "year": 2022,
    "tag": "Film, May 2022",
    "mediaType": "movie",
    "phase": "Phase 4",
    "hero": "Doctor Strange",
    "runtime": "126m"
  },
  {
    "id": "hawkeye_2021",
    "title": "Hawkeye",
    "year": 2021,
    "tag": "Disney+ Series, Nov 2021",
    "mediaType": "tv",
    "phase": "Phase 4",
    "hero": "Hawkeye",
    "runtime": "Series"
  },
  {
    "id": "moon_knight_2022",
    "title": "Moon Knight",
    "year": 2022,
    "tag": "Disney+ Series, March 2022",
    "mediaType": "tv",
    "phase": "Phase 4",
    "hero": "Moon Knight",
    "runtime": "Series"
  },
  {
    "id": "ms_marvel_2022",
    "title": "Ms. Marvel",
    "year": 2022,
    "tag": "Disney+ Series, June 2022",
    "mediaType": "tv",
    "phase": "Phase 4",
    "hero": "Ms. Marvel",
    "runtime": "Series"
  },
  {
    "id": "thor_love_and_thunder_2022",
    "title": "Thor: Love and Thunder",
    "year": 2022,
    "tag": "Film, July 2022",
    "mediaType": "movie",
    "phase": "Phase 4",
    "hero": "Thor",
    "runtime": "120m"
  },
  {
    "id": "she_hulk_attorney_at_law_2022",
    "title": "She-Hulk: Attorney at Law",
    "year": 2022,
    "tag": "Disney+ Series, Aug 2022",
    "mediaType": "tv",
    "phase": "Phase 4",
    "hero": "Hulk",
    "runtime": "Series"
  },
  {
    "id": "werewolf_by_night_2022",
    "title": "Werewolf by Night",
    "year": 2022,
    "tag": "Special Presentation, Oct 2022",
    "mediaType": "movie",
    "phase": "Phase 4",
    "hero": "Marvel Universe",
    "runtime": "120m"
  },
  {
    "id": "black_panther_wakanda_forever_2022",
    "title": "Black Panther: Wakanda Forever",
    "year": 2022,
    "tag": "Film, Nov 2022",
    "mediaType": "movie",
    "phase": "Phase 4",
    "hero": "Black Panther",
    "runtime": "161m"
  },
  {
    "id": "the_guardians_of_the_galaxy_holiday_special_2022",
    "title": "The Guardians of the Galaxy Holiday Special",
    "year": 2022,
    "tag": "Special, Nov 2022",
    "mediaType": "movie",
    "phase": "Phase 4",
    "hero": "Guardians",
    "runtime": "120m"
  },
  {
    "id": "ant_man_and_the_wasp_quantumania_2023",
    "title": "Ant-Man and the Wasp: Quantumania",
    "year": 2023,
    "tag": "Film, Feb 2023",
    "mediaType": "movie",
    "phase": "Phase 5",
    "hero": "Ant-Man",
    "runtime": "120m"
  },
  {
    "id": "guardians_of_the_galaxy_vol_3_2023",
    "title": "Guardians of the Galaxy Vol. 3",
    "year": 2023,
    "tag": "Film, May 2023",
    "mediaType": "movie",
    "phase": "Phase 5",
    "hero": "Guardians",
    "runtime": "120m"
  },
  {
    "id": "secret_invasion_2023",
    "title": "Secret Invasion",
    "year": 2023,
    "tag": "Disney+ Series, June 2023",
    "mediaType": "tv",
    "phase": "Phase 5",
    "hero": "Nick Fury",
    "runtime": "Series"
  },
  {
    "id": "loki_season_2_2023",
    "title": "Loki Season 2",
    "year": 2023,
    "tag": "Disney+ Series, Oct 2023",
    "mediaType": "tv",
    "phase": "Phase 5",
    "hero": "Loki",
    "runtime": "Series"
  },
  {
    "id": "the_marvels_2023",
    "title": "The Marvels",
    "year": 2023,
    "tag": "Film, Nov 2023",
    "mediaType": "movie",
    "phase": "Phase 5",
    "hero": "Captain Marvel",
    "runtime": "120m"
  },
  {
    "id": "what_if_season_2_2023",
    "title": "What If...? Season 2",
    "year": 2023,
    "tag": "Animated Series, Dec 2023",
    "mediaType": "tv",
    "phase": "Phase 5",
    "hero": "Multiverse",
    "runtime": "Series"
  },
  {
    "id": "echo_2024",
    "title": "Echo",
    "year": 2024,
    "tag": "Disney+ Series, Jan 2024",
    "mediaType": "tv",
    "phase": "Phase 5",
    "hero": "Echo",
    "runtime": "Series"
  },
  {
    "id": "deadpool_wolverine_2024",
    "title": "Deadpool & Wolverine",
    "year": 2024,
    "tag": "Film, July 2024",
    "mediaType": "movie",
    "phase": "Phase 5",
    "hero": "Deadpool & Wolverine",
    "runtime": "128m"
  },
  {
    "id": "agatha_all_along_2024",
    "title": "Agatha All Along",
    "year": 2024,
    "tag": "Disney+ Series, Sept 2024",
    "mediaType": "tv",
    "phase": "Phase 5",
    "hero": "Agatha Harkness",
    "runtime": "Series"
  },
  {
    "id": "what_if_season_3_2024",
    "title": "What If...? Season 3",
    "year": 2024,
    "tag": "Animated Series, Dec 2024",
    "mediaType": "tv",
    "phase": "Phase 5",
    "hero": "Multiverse",
    "runtime": "Series"
  },
  {
    "id": "captain_america_brave_new_world_2025",
    "title": "Captain America: Brave New World",
    "year": 2025,
    "tag": "Film, Feb 2025",
    "mediaType": "movie",
    "phase": "Phase 5",
    "hero": "Captain America",
    "runtime": "120m"
  },
  {
    "id": "daredevil_born_again_season_1_2025",
    "title": "Daredevil: Born Again Season 1",
    "year": 2025,
    "tag": "Disney+ Series, March 2025",
    "mediaType": "tv",
    "phase": "Phase 5",
    "hero": "Daredevil",
    "runtime": "Series"
  },
  {
    "id": "thunderbolts_2025",
    "title": "Thunderbolts*",
    "year": 2025,
    "tag": "Film, May 2025",
    "mediaType": "movie",
    "phase": "Phase 5",
    "hero": "Thunderbolts",
    "runtime": "120m"
  },
  {
    "id": "ironheart_2025",
    "title": "Ironheart",
    "year": 2025,
    "tag": "Disney+ Series, June 2025",
    "mediaType": "tv",
    "phase": "Phase 5",
    "hero": "Marvel Universe",
    "runtime": "Series"
  },
  {
    "id": "eyes_of_wakanda_2025",
    "title": "Eyes of Wakanda",
    "year": 2025,
    "tag": "Animated Series, Aug 2025",
    "mediaType": "tv",
    "phase": "Phase 5",
    "hero": "Marvel Universe",
    "runtime": "Series"
  },
  {
    "id": "marvel_zombies_2025",
    "title": "Marvel Zombies",
    "year": 2025,
    "tag": "Animated Series, Oct 2025",
    "mediaType": "tv",
    "phase": "Phase 5",
    "hero": "Marvel Universe",
    "runtime": "Series"
  },
  {
    "id": "your_friendly_neighborhood_spider_man_season_1_2024",
    "title": "Your Friendly Neighborhood Spider-Man Season 1",
    "year": 2024,
    "tag": "Animated Series, Nov 2024",
    "mediaType": "tv",
    "phase": "Phase 5",
    "hero": "Spider-Man",
    "runtime": "Series"
  },
  {
    "id": "the_fantastic_four_first_steps_2025",
    "title": "The Fantastic Four: First Steps",
    "year": 2025,
    "tag": "Film, July 2025",
    "mediaType": "movie",
    "phase": "Phase 6",
    "hero": "Fantastic Four",
    "runtime": "120m"
  },
  {
    "id": "wonder_man_2026",
    "title": "Wonder Man",
    "year": 2026,
    "tag": "Disney+ Series, Jan 2026",
    "mediaType": "tv",
    "phase": "Phase 6",
    "hero": "Marvel Universe",
    "runtime": "Series"
  },
  {
    "id": "daredevil_born_again_season_2_2026",
    "title": "Daredevil: Born Again Season 2",
    "year": 2026,
    "tag": "Disney+ Series, March 2026",
    "mediaType": "tv",
    "phase": "Phase 6",
    "hero": "Daredevil",
    "runtime": "Series"
  },
  {
    "id": "the_punisher_one_last_kill_2026",
    "title": "The Punisher: One Last Kill",
    "year": 2026,
    "tag": "Special Presentation, May 2026",
    "mediaType": "movie",
    "phase": "Phase 6",
    "hero": "The Punisher",
    "runtime": "120m"
  },
  {
    "id": "spider_man_brand_new_day_2026",
    "title": "Spider-Man: Brand New Day",
    "year": 2026,
    "tag": "Film, July 2026",
    "mediaType": "movie",
    "phase": "Phase 6",
    "hero": "Spider-Man",
    "runtime": "120m"
  },
  {
    "id": "visionquest_2026",
    "title": "VisionQuest",
    "year": 2026,
    "tag": "Disney+ Series, Oct 2026",
    "mediaType": "tv",
    "phase": "Phase 6",
    "hero": "Vision",
    "runtime": "8 Episodes"
  },
  {
    "id": "avengers_doomsday_2026",
    "title": "Avengers: Doomsday",
    "year": 2026,
    "tag": "Film, Dec 2026",
    "mediaType": "movie",
    "phase": "Phase 6",
    "hero": "The Avengers",
    "runtime": "120m"
  },
  {
    "id": "your_friendly_neighborhood_spider_man_season_2_2027",
    "title": "Your Friendly Neighborhood Spider-Man Season 2",
    "year": 2027,
    "tag": "Animated Series, Jan 2027",
    "mediaType": "tv",
    "phase": "Phase 6",
    "hero": "Spider-Man",
    "runtime": "Series"
  },
  {
    "id": "daredevil_born_again_season_3_2027",
    "title": "Daredevil: Born Again Season 3",
    "year": 2027,
    "tag": "Disney+ Series, March 2027",
    "mediaType": "tv",
    "phase": "Phase 6",
    "hero": "Daredevil",
    "runtime": "Series"
  },
  {
    "id": "x_men_97_season_3_2027",
    "title": "X-Men '97 Season 3",
    "year": 2027,
    "tag": "Animated Series, Fall 2027",
    "mediaType": "tv",
    "phase": "Phase 6",
    "hero": "X-Men",
    "runtime": "Series"
  },
  {
    "id": "marvel_zombies_specials_2027",
    "title": "Marvel Zombies Specials",
    "year": 2027,
    "tag": "Animated Specials, Halloween 2027\u20132029",
    "mediaType": "movie",
    "phase": "Phase 6",
    "hero": "Marvel Universe",
    "runtime": "120m"
  },
  {
    "id": "avengers_secret_wars_2027",
    "title": "Avengers: Secret Wars",
    "year": 2027,
    "tag": "Film, Dec 2027",
    "mediaType": "movie",
    "phase": "Phase 6",
    "hero": "The Avengers",
    "runtime": "120m"
  },
  {
    "id": "untitled_x_men_movie_2028",
    "title": "Untitled X-Men Movie",
    "year": 2028,
    "tag": "Film, May 2028",
    "mediaType": "movie",
    "phase": "Phase 6",
    "hero": "X-Men",
    "runtime": "104m"
  },
  {
    "id": "ghost_rider_2028",
    "title": "Ghost Rider",
    "year": 2028,
    "tag": "Film, July 2028",
    "mediaType": "movie",
    "phase": "Phase 6",
    "hero": "Ghost Rider",
    "runtime": "120m"
  },
  {
    "id": "black_panther_3_2028",
    "title": "Black Panther 3",
    "year": 2028,
    "tag": "Film, Dec 2028",
    "mediaType": "movie",
    "phase": "Phase 6",
    "hero": "Black Panther",
    "runtime": "120m"
  },
  {
    "id": "zodiac_2028",
    "title": "Zodiac",
    "year": 2028,
    "tag": "Disney+ Series, 2028",
    "mediaType": "tv",
    "phase": "Phase 6",
    "hero": "Marvel Universe",
    "runtime": "Series"
  },
  {
    "id": "armor_wars_2024",
    "title": "Armor Wars",
    "year": 2024,
    "tag": "Film, TBA",
    "mediaType": "movie",
    "phase": "Phase 6",
    "hero": "Marvel Universe",
    "runtime": "120m"
  },
  {
    "id": "blade_2024",
    "title": "Blade",
    "year": 2024,
    "tag": "Film, TBA",
    "mediaType": "movie",
    "phase": "Phase 6",
    "hero": "Blade",
    "runtime": "120m"
  },
  {
    "id": "nova_2024",
    "title": "Nova",
    "year": 2024,
    "tag": "Film, TBA",
    "mediaType": "movie",
    "phase": "Phase 6",
    "hero": "Marvel Universe",
    "runtime": "120m"
  },
  {
    "id": "shang_chi_2_2024",
    "title": "Shang-Chi 2",
    "year": 2024,
    "tag": "Film, TBA",
    "mediaType": "movie",
    "phase": "Phase 6",
    "hero": "Shang-Chi",
    "runtime": "132m"
  },
  {
    "id": "star_lord_project_2024",
    "title": "Star-Lord Project",
    "year": 2024,
    "tag": "Disney+ Series, TBA",
    "mediaType": "tv",
    "phase": "Phase 6",
    "hero": "Marvel Universe",
    "runtime": "Series"
  },
  {
    "id": "untitled_wakanda_okoye_series_2024",
    "title": "Untitled Wakanda / Okoye Series",
    "year": 2024,
    "tag": "Disney+ Series, TBA",
    "mediaType": "tv",
    "phase": "Phase 6",
    "hero": "Marvel Universe",
    "runtime": "Series"
  }
];

export const ALL_MARVEL_RELEASE_ITEMS: MarvelItem[] = [
  {
    "id": "captain_america_1944",
    "title": "Captain America",
    "year": 1944,
    "tag": "15-Part Serial, Feb 1944",
    "mediaType": "tv",
    "phase": "1. Early Live-Action Era (1944\u20131998)",
    "hero": "Captain America",
    "runtime": "Series"
  },
  {
    "id": "spidey_super_stories_1974",
    "title": "Spidey Super Stories",
    "year": 1974,
    "tag": "TV Segments, Nov 1974",
    "mediaType": "tv",
    "phase": "1. Early Live-Action Era (1944\u20131998)",
    "hero": "Spider-Man",
    "runtime": "Series"
  },
  {
    "id": "the_incredible_hulk_1977",
    "title": "The Incredible Hulk",
    "year": 1977,
    "tag": "Pilot Movie 1, March 1977",
    "mediaType": "movie",
    "phase": "1. Early Live-Action Era (1944\u20131998)",
    "hero": "Hulk",
    "runtime": "120m"
  },
  {
    "id": "the_amazing_spider_man_1977",
    "title": "The Amazing Spider-Man",
    "year": 1977,
    "tag": "Pilot Movie, Sept 1977",
    "mediaType": "movie",
    "phase": "1. Early Live-Action Era (1944\u20131998)",
    "hero": "Spider-Man",
    "runtime": "120m"
  },
  {
    "id": "the_incredible_hulk_a_death_in_the_family_1977",
    "title": "The Incredible Hulk: A Death in the Family",
    "year": 1977,
    "tag": "Pilot Movie 2, Nov 1977",
    "mediaType": "movie",
    "phase": "1. Early Live-Action Era (1944\u20131998)",
    "hero": "Hulk",
    "runtime": "120m"
  },
  {
    "id": "the_incredible_hulk_season_1_1978",
    "title": "The Incredible Hulk Season 1",
    "year": 1978,
    "tag": "TV, March 1978",
    "mediaType": "tv",
    "phase": "1. Early Live-Action Era (1944\u20131998)",
    "hero": "Hulk",
    "runtime": "Series"
  },
  {
    "id": "fantastic_four_season_1_1978",
    "title": "Fantastic Four Season 1",
    "year": 1978,
    "tag": "Animated Series, Sept 1978",
    "mediaType": "tv",
    "phase": "1. Early Live-Action Era (1944\u20131998)",
    "hero": "Fantastic Four",
    "runtime": "Series"
  },
  {
    "id": "the_amazing_spider_man_season_1_1978",
    "title": "The Amazing Spider-Man Season 1",
    "year": 1978,
    "tag": "TV, Sept 1978",
    "mediaType": "tv",
    "phase": "1. Early Live-Action Era (1944\u20131998)",
    "hero": "Spider-Man",
    "runtime": "Series"
  },
  {
    "id": "spider_man_1978",
    "title": "Spider-Man",
    "year": 1978,
    "tag": "Japanese Toei TV Series, Season 1, July 1978",
    "mediaType": "tv",
    "phase": "1. Early Live-Action Era (1944\u20131998)",
    "hero": "Spider-Man",
    "runtime": "Series"
  },
  {
    "id": "dr_strange_1978",
    "title": "Dr. Strange",
    "year": 1978,
    "tag": "TV Movie, Sept 1978",
    "mediaType": "tv",
    "phase": "1. Early Live-Action Era (1944\u20131998)",
    "hero": "Doctor Strange",
    "runtime": "Series"
  },
  {
    "id": "the_incredible_hulk_season_2_1978",
    "title": "The Incredible Hulk Season 2",
    "year": 1978,
    "tag": "TV, Sept 1978",
    "mediaType": "tv",
    "phase": "1. Early Live-Action Era (1944\u20131998)",
    "hero": "Hulk",
    "runtime": "Series"
  },
  {
    "id": "captain_america_1979",
    "title": "Captain America",
    "year": 1979,
    "tag": "TV Movie, Jan 1979",
    "mediaType": "tv",
    "phase": "1. Early Live-Action Era (1944\u20131998)",
    "hero": "Captain America",
    "runtime": "Series"
  },
  {
    "id": "captain_america_ii_death_too_soon_1979",
    "title": "Captain America II: Death Too Soon",
    "year": 1979,
    "tag": "TV Movie, Nov 1979",
    "mediaType": "tv",
    "phase": "1. Early Live-Action Era (1944\u20131998)",
    "hero": "Captain America",
    "runtime": "Series"
  },
  {
    "id": "fred_and_barney_meet_the_thing_season_1_1979",
    "title": "Fred and Barney Meet the Thing Season 1",
    "year": 1979,
    "tag": "Animated Series, Sept 1979",
    "mediaType": "tv",
    "phase": "1. Early Live-Action Era (1944\u20131998)",
    "hero": "Marvel Universe",
    "runtime": "Series"
  },
  {
    "id": "spider_woman_season_1_1979",
    "title": "Spider-Woman Season 1",
    "year": 1979,
    "tag": "Animated Series, Sept 1979",
    "mediaType": "tv",
    "phase": "1. Early Live-Action Era (1944\u20131998)",
    "hero": "Marvel Universe",
    "runtime": "Series"
  },
  {
    "id": "the_amazing_spider_man_season_2_1979",
    "title": "The Amazing Spider-Man Season 2",
    "year": 1979,
    "tag": "TV, Sept 1979",
    "mediaType": "tv",
    "phase": "1. Early Live-Action Era (1944\u20131998)",
    "hero": "Spider-Man",
    "runtime": "Series"
  },
  {
    "id": "the_incredible_hulk_season_3_1979",
    "title": "The Incredible Hulk Season 3",
    "year": 1979,
    "tag": "TV, Sept 1979",
    "mediaType": "tv",
    "phase": "1. Early Live-Action Era (1944\u20131998)",
    "hero": "Hulk",
    "runtime": "Series"
  },
  {
    "id": "the_incredible_hulk_season_4_1980",
    "title": "The Incredible Hulk Season 4",
    "year": 1980,
    "tag": "TV, Oct 1980",
    "mediaType": "tv",
    "phase": "1. Early Live-Action Era (1944\u20131998)",
    "hero": "Hulk",
    "runtime": "Series"
  },
  {
    "id": "spider_man_season_1_1981",
    "title": "Spider-Man Season 1",
    "year": 1981,
    "tag": "Animated Series, Sept 1981",
    "mediaType": "tv",
    "phase": "1. Early Live-Action Era (1944\u20131998)",
    "hero": "Spider-Man",
    "runtime": "Series"
  },
  {
    "id": "spider_man_and_his_amazing_friends_season_1_1981",
    "title": "Spider-Man and His Amazing Friends Season 1",
    "year": 1981,
    "tag": "Animated Series, Sept 1981",
    "mediaType": "tv",
    "phase": "1. Early Live-Action Era (1944\u20131998)",
    "hero": "Spider-Man",
    "runtime": "Series"
  },
  {
    "id": "the_incredible_hulk_season_5_1981",
    "title": "The Incredible Hulk Season 5",
    "year": 1981,
    "tag": "TV, Oct 1981",
    "mediaType": "tv",
    "phase": "1. Early Live-Action Era (1944\u20131998)",
    "hero": "Hulk",
    "runtime": "Series"
  },
  {
    "id": "the_incredible_hulk_season_1_1982",
    "title": "The Incredible Hulk Season 1",
    "year": 1982,
    "tag": "Animated Series, Sept 1982",
    "mediaType": "tv",
    "phase": "1. Early Live-Action Era (1944\u20131998)",
    "hero": "Hulk",
    "runtime": "Series"
  },
  {
    "id": "spider_man_and_his_amazing_friends_season_2_1982",
    "title": "Spider-Man and His Amazing Friends Season 2",
    "year": 1982,
    "tag": "Animated Series, Sept 1982",
    "mediaType": "tv",
    "phase": "1. Early Live-Action Era (1944\u20131998)",
    "hero": "Spider-Man",
    "runtime": "Series"
  },
  {
    "id": "spider_man_and_his_amazing_friends_season_3_1983",
    "title": "Spider-Man and His Amazing Friends Season 3",
    "year": 1983,
    "tag": "Animated Series, Sept 1983",
    "mediaType": "tv",
    "phase": "1. Early Live-Action Era (1944\u20131998)",
    "hero": "Spider-Man",
    "runtime": "Series"
  },
  {
    "id": "howard_the_duck_1986",
    "title": "Howard the Duck",
    "year": 1986,
    "tag": "Film, Aug 1986",
    "mediaType": "movie",
    "phase": "1. Early Live-Action Era (1944\u20131998)",
    "hero": "Marvel Universe",
    "runtime": "120m"
  },
  {
    "id": "the_incredible_hulk_returns_1988",
    "title": "The Incredible Hulk Returns",
    "year": 1988,
    "tag": "TV Movie, May 1988",
    "mediaType": "tv",
    "phase": "1. Early Live-Action Era (1944\u20131998)",
    "hero": "Hulk",
    "runtime": "Series"
  },
  {
    "id": "the_punisher_1989",
    "title": "The Punisher",
    "year": 1989,
    "tag": "Film, Oct 1989",
    "mediaType": "movie",
    "phase": "1. Early Live-Action Era (1944\u20131998)",
    "hero": "The Punisher",
    "runtime": "120m"
  },
  {
    "id": "the_trial_of_the_incredible_hulk_1989",
    "title": "The Trial of the Incredible Hulk",
    "year": 1989,
    "tag": "TV Movie, May 1989",
    "mediaType": "tv",
    "phase": "1. Early Live-Action Era (1944\u20131998)",
    "hero": "Hulk",
    "runtime": "Series"
  },
  {
    "id": "x_men_pryde_of_the_x_men_1989",
    "title": "X-Men: Pryde of the X-Men",
    "year": 1989,
    "tag": "TV Pilot, Sept 1989",
    "mediaType": "tv",
    "phase": "1. Early Live-Action Era (1944\u20131998)",
    "hero": "X-Men",
    "runtime": "Series"
  },
  {
    "id": "captain_america_1990",
    "title": "Captain America",
    "year": 1990,
    "tag": "Film, Dec 1990",
    "mediaType": "movie",
    "phase": "1. Early Live-Action Era (1944\u20131998)",
    "hero": "Captain America",
    "runtime": "120m"
  },
  {
    "id": "the_death_of_the_incredible_hulk_1990",
    "title": "The Death of the Incredible Hulk",
    "year": 1990,
    "tag": "TV Movie, Feb 1990",
    "mediaType": "tv",
    "phase": "1. Early Live-Action Era (1944\u20131998)",
    "hero": "Hulk",
    "runtime": "Series"
  },
  {
    "id": "x_men_the_animated_series_season_1_1992",
    "title": "X-Men: The Animated Series Season 1",
    "year": 1992,
    "tag": "Animated Series, Oct 1992",
    "mediaType": "tv",
    "phase": "1. Early Live-Action Era (1944\u20131998)",
    "hero": "X-Men",
    "runtime": "Series"
  },
  {
    "id": "x_men_the_animated_series_season_2_1993",
    "title": "X-Men: The Animated Series Season 2",
    "year": 1993,
    "tag": "Animated Series, Oct 1993",
    "mediaType": "tv",
    "phase": "1. Early Live-Action Era (1944\u20131998)",
    "hero": "X-Men",
    "runtime": "Series"
  },
  {
    "id": "the_fantastic_four_1994",
    "title": "The Fantastic Four",
    "year": 1994,
    "tag": "Unreleased Film, 1994",
    "mediaType": "movie",
    "phase": "1. Early Live-Action Era (1944\u20131998)",
    "hero": "Fantastic Four",
    "runtime": "120m"
  },
  {
    "id": "x_men_the_animated_series_season_3_1994",
    "title": "X-Men: The Animated Series Season 3",
    "year": 1994,
    "tag": "Animated Series, July 1994",
    "mediaType": "tv",
    "phase": "1. Early Live-Action Era (1944\u20131998)",
    "hero": "X-Men",
    "runtime": "Series"
  },
  {
    "id": "iron_man_season_1_1994",
    "title": "Iron Man Season 1",
    "year": 1994,
    "tag": "Animated Series, Sept 1994",
    "mediaType": "tv",
    "phase": "1. Early Live-Action Era (1944\u20131998)",
    "hero": "Iron Man",
    "runtime": "Series"
  },
  {
    "id": "fantastic_four_season_1_1994",
    "title": "Fantastic Four Season 1",
    "year": 1994,
    "tag": "Animated Series, Sept 1994",
    "mediaType": "tv",
    "phase": "1. Early Live-Action Era (1944\u20131998)",
    "hero": "Fantastic Four",
    "runtime": "Series"
  },
  {
    "id": "spider_man_the_animated_series_season_1_1994",
    "title": "Spider-Man: The Animated Series Season 1",
    "year": 1994,
    "tag": "Animated Series, Nov 1994",
    "mediaType": "tv",
    "phase": "1. Early Live-Action Era (1944\u20131998)",
    "hero": "Spider-Man",
    "runtime": "Series"
  },
  {
    "id": "iron_man_season_2_1995",
    "title": "Iron Man Season 2",
    "year": 1995,
    "tag": "Animated Series, Sept 1995",
    "mediaType": "tv",
    "phase": "1. Early Live-Action Era (1944\u20131998)",
    "hero": "Iron Man",
    "runtime": "Series"
  },
  {
    "id": "fantastic_four_season_2_1995",
    "title": "Fantastic Four Season 2",
    "year": 1995,
    "tag": "Animated Series, Sept 1995",
    "mediaType": "tv",
    "phase": "1. Early Live-Action Era (1944\u20131998)",
    "hero": "Fantastic Four",
    "runtime": "Series"
  },
  {
    "id": "x_men_the_animated_series_season_4_1995",
    "title": "X-Men: The Animated Series Season 4",
    "year": 1995,
    "tag": "Animated Series, Sept 1995",
    "mediaType": "tv",
    "phase": "1. Early Live-Action Era (1944\u20131998)",
    "hero": "X-Men",
    "runtime": "Series"
  },
  {
    "id": "spider_man_the_animated_series_season_2_1995",
    "title": "Spider-Man: The Animated Series Season 2",
    "year": 1995,
    "tag": "Animated Series, Sept 1995",
    "mediaType": "tv",
    "phase": "1. Early Live-Action Era (1944\u20131998)",
    "hero": "Spider-Man",
    "runtime": "Series"
  },
  {
    "id": "generation_x_1996",
    "title": "Generation X",
    "year": 1996,
    "tag": "TV Movie, Feb 1996",
    "mediaType": "tv",
    "phase": "1. Early Live-Action Era (1944\u20131998)",
    "hero": "Marvel Universe",
    "runtime": "Series"
  },
  {
    "id": "the_incredible_hulk_season_1_1996",
    "title": "The Incredible Hulk Season 1",
    "year": 1996,
    "tag": "Animated Series, Sept 1996",
    "mediaType": "tv",
    "phase": "1. Early Live-Action Era (1944\u20131998)",
    "hero": "Hulk",
    "runtime": "Series"
  },
  {
    "id": "x_men_the_animated_series_season_5_1996",
    "title": "X-Men: The Animated Series Season 5",
    "year": 1996,
    "tag": "Animated Series, Sept 1996",
    "mediaType": "tv",
    "phase": "1. Early Live-Action Era (1944\u20131998)",
    "hero": "X-Men",
    "runtime": "Series"
  },
  {
    "id": "spider_man_the_animated_series_season_3_1996",
    "title": "Spider-Man: The Animated Series Season 3",
    "year": 1996,
    "tag": "Animated Series, Sept 1996",
    "mediaType": "tv",
    "phase": "1. Early Live-Action Era (1944\u20131998)",
    "hero": "Spider-Man",
    "runtime": "Series"
  },
  {
    "id": "the_incredible_hulk_season_2_1997",
    "title": "The Incredible Hulk Season 2",
    "year": 1997,
    "tag": "Animated Series, Sept 1997",
    "mediaType": "tv",
    "phase": "1. Early Live-Action Era (1944\u20131998)",
    "hero": "Hulk",
    "runtime": "Series"
  },
  {
    "id": "spider_man_the_animated_series_season_4_1997",
    "title": "Spider-Man: The Animated Series Season 4",
    "year": 1997,
    "tag": "Animated Series, Feb 1997",
    "mediaType": "tv",
    "phase": "1. Early Live-Action Era (1944\u20131998)",
    "hero": "Spider-Man",
    "runtime": "Series"
  },
  {
    "id": "spider_man_the_animated_series_season_5_1997",
    "title": "Spider-Man: The Animated Series Season 5",
    "year": 1997,
    "tag": "Animated Series, Sept 1997",
    "mediaType": "tv",
    "phase": "1. Early Live-Action Era (1944\u20131998)",
    "hero": "Spider-Man",
    "runtime": "Series"
  },
  {
    "id": "nick_fury_agent_of_s_h_i_e_l_d_1998",
    "title": "Nick Fury: Agent of S.H.I.E.L.D.",
    "year": 1998,
    "tag": "TV Movie, May 1998",
    "mediaType": "tv",
    "phase": "1. Early Live-Action Era (1944\u20131998)",
    "hero": "Marvel Universe",
    "runtime": "Series"
  },
  {
    "id": "blade_1998",
    "title": "Blade",
    "year": 1998,
    "tag": "Film, Aug 1998",
    "mediaType": "movie",
    "phase": "1. Early Live-Action Era (1944\u20131998)",
    "hero": "Blade",
    "runtime": "120m"
  },
  {
    "id": "silver_surfer_season_1_1998",
    "title": "Silver Surfer Season 1",
    "year": 1998,
    "tag": "Animated Series, Feb 1998",
    "mediaType": "tv",
    "phase": "1. Early Live-Action Era (1944\u20131998)",
    "hero": "Marvel Universe",
    "runtime": "Series"
  },
  {
    "id": "spider_man_unlimited_season_1_1999",
    "title": "Spider-Man Unlimited Season 1",
    "year": 1999,
    "tag": "Animated Series, Sept 1999",
    "mediaType": "tv",
    "phase": "2. Turn of the Century Era (1999\u20132007)",
    "hero": "Spider-Man",
    "runtime": "Series"
  },
  {
    "id": "the_avengers_united_they_stand_season_1_1999",
    "title": "The Avengers: United They Stand Season 1",
    "year": 1999,
    "tag": "Animated Series, Oct 1999",
    "mediaType": "tv",
    "phase": "2. Turn of the Century Era (1999\u20132007)",
    "hero": "The Avengers",
    "runtime": "Series"
  },
  {
    "id": "x_men_2000",
    "title": "X-Men",
    "year": 2000,
    "tag": "Film, July 2000",
    "mediaType": "movie",
    "phase": "2. Turn of the Century Era (1999\u20132007)",
    "hero": "X-Men",
    "runtime": "104m"
  },
  {
    "id": "x_men_evolution_season_1_2000",
    "title": "X-Men: Evolution Season 1",
    "year": 2000,
    "tag": "Animated Series, Nov 2000",
    "mediaType": "tv",
    "phase": "2. Turn of the Century Era (1999\u20132007)",
    "hero": "X-Men",
    "runtime": "Series"
  },
  {
    "id": "mutant_x_season_1_2001",
    "title": "Mutant X Season 1",
    "year": 2001,
    "tag": "TV, Oct 2001",
    "mediaType": "tv",
    "phase": "2. Turn of the Century Era (1999\u20132007)",
    "hero": "Marvel Universe",
    "runtime": "Series"
  },
  {
    "id": "x_men_evolution_season_2_2001",
    "title": "X-Men: Evolution Season 2",
    "year": 2001,
    "tag": "Animated Series, Sept 2001",
    "mediaType": "tv",
    "phase": "2. Turn of the Century Era (1999\u20132007)",
    "hero": "X-Men",
    "runtime": "Series"
  },
  {
    "id": "blade_ii_2002",
    "title": "Blade II",
    "year": 2002,
    "tag": "Film, March 2002",
    "mediaType": "movie",
    "phase": "2. Turn of the Century Era (1999\u20132007)",
    "hero": "Blade",
    "runtime": "120m"
  },
  {
    "id": "spider_man_2002",
    "title": "Spider-Man",
    "year": 2002,
    "tag": "Film, May 2002",
    "mediaType": "movie",
    "phase": "2. Turn of the Century Era (1999\u20132007)",
    "hero": "Spider-Man",
    "runtime": "120m"
  },
  {
    "id": "mutant_x_season_2_2002",
    "title": "Mutant X Season 2",
    "year": 2002,
    "tag": "TV, Oct 2002",
    "mediaType": "tv",
    "phase": "2. Turn of the Century Era (1999\u20132007)",
    "hero": "Marvel Universe",
    "runtime": "Series"
  },
  {
    "id": "x_men_evolution_season_3_2002",
    "title": "X-Men: Evolution Season 3",
    "year": 2002,
    "tag": "Animated Series, Aug 2002",
    "mediaType": "tv",
    "phase": "2. Turn of the Century Era (1999\u20132007)",
    "hero": "X-Men",
    "runtime": "Series"
  },
  {
    "id": "daredevil_2003",
    "title": "Daredevil",
    "year": 2003,
    "tag": "Film, Feb 2003",
    "mediaType": "movie",
    "phase": "2. Turn of the Century Era (1999\u20132007)",
    "hero": "Daredevil",
    "runtime": "120m"
  },
  {
    "id": "x2_x_men_united_2003",
    "title": "X2: X-Men United",
    "year": 2003,
    "tag": "Film, May 2003",
    "mediaType": "movie",
    "phase": "2. Turn of the Century Era (1999\u20132007)",
    "hero": "X-Men",
    "runtime": "104m"
  },
  {
    "id": "hulk_2003",
    "title": "Hulk",
    "year": 2003,
    "tag": "Film, June 2003",
    "mediaType": "movie",
    "phase": "2. Turn of the Century Era (1999\u20132007)",
    "hero": "Hulk",
    "runtime": "120m"
  },
  {
    "id": "mutant_x_season_3_2003",
    "title": "Mutant X Season 3",
    "year": 2003,
    "tag": "TV, Sept 2003",
    "mediaType": "tv",
    "phase": "2. Turn of the Century Era (1999\u20132007)",
    "hero": "Marvel Universe",
    "runtime": "Series"
  },
  {
    "id": "spider_man_the_new_animated_series_season_1_2003",
    "title": "Spider-Man: The New Animated Series Season 1",
    "year": 2003,
    "tag": "Animated Series, July 2003",
    "mediaType": "tv",
    "phase": "2. Turn of the Century Era (1999\u20132007)",
    "hero": "Spider-Man",
    "runtime": "Series"
  },
  {
    "id": "x_men_evolution_season_4_2003",
    "title": "X-Men: Evolution Season 4",
    "year": 2003,
    "tag": "Animated Series, Aug 2003",
    "mediaType": "tv",
    "phase": "2. Turn of the Century Era (1999\u20132007)",
    "hero": "X-Men",
    "runtime": "Series"
  },
  {
    "id": "the_punisher_2004",
    "title": "The Punisher",
    "year": 2004,
    "tag": "Film, April 2004",
    "mediaType": "movie",
    "phase": "2. Turn of the Century Era (1999\u20132007)",
    "hero": "The Punisher",
    "runtime": "120m"
  },
  {
    "id": "spider_man_2_2004",
    "title": "Spider-Man 2",
    "year": 2004,
    "tag": "Film, June 2004",
    "mediaType": "movie",
    "phase": "2. Turn of the Century Era (1999\u20132007)",
    "hero": "Spider-Man",
    "runtime": "120m"
  },
  {
    "id": "blade_trinity_2004",
    "title": "Blade: Trinity",
    "year": 2004,
    "tag": "Film, Dec 2004",
    "mediaType": "movie",
    "phase": "2. Turn of the Century Era (1999\u20132007)",
    "hero": "Blade",
    "runtime": "120m"
  },
  {
    "id": "elektra_2005",
    "title": "Elektra",
    "year": 2005,
    "tag": "Film, Jan 2005",
    "mediaType": "movie",
    "phase": "2. Turn of the Century Era (1999\u20132007)",
    "hero": "Marvel Universe",
    "runtime": "120m"
  },
  {
    "id": "fantastic_four_2005",
    "title": "Fantastic Four",
    "year": 2005,
    "tag": "Film, July 2005",
    "mediaType": "movie",
    "phase": "2. Turn of the Century Era (1999\u20132007)",
    "hero": "Fantastic Four",
    "runtime": "120m"
  },
  {
    "id": "ultimate_avengers_the_movie_2006",
    "title": "Ultimate Avengers: The Movie",
    "year": 2006,
    "tag": "Animated Film, Feb 2006",
    "mediaType": "movie",
    "phase": "2. Turn of the Century Era (1999\u20132007)",
    "hero": "The Avengers",
    "runtime": "120m"
  },
  {
    "id": "blade_the_series_season_1_2006",
    "title": "Blade: The Series Season 1",
    "year": 2006,
    "tag": "TV, June 2006",
    "mediaType": "tv",
    "phase": "2. Turn of the Century Era (1999\u20132007)",
    "hero": "Blade",
    "runtime": "Series"
  },
  {
    "id": "ultimate_avengers_2_rise_of_the_panther_2006",
    "title": "Ultimate Avengers 2: Rise of the Panther",
    "year": 2006,
    "tag": "Animated Film, Aug 2006",
    "mediaType": "movie",
    "phase": "2. Turn of the Century Era (1999\u20132007)",
    "hero": "The Avengers",
    "runtime": "120m"
  },
  {
    "id": "x_men_the_last_stand_2006",
    "title": "X-Men: The Last Stand",
    "year": 2006,
    "tag": "Film, May 2006",
    "mediaType": "movie",
    "phase": "2. Turn of the Century Era (1999\u20132007)",
    "hero": "X-Men",
    "runtime": "104m"
  },
  {
    "id": "fantastic_four_world_s_greatest_heroes_season_1_2006",
    "title": "Fantastic Four: World's Greatest Heroes Season 1",
    "year": 2006,
    "tag": "Animated Series, Sept 2006",
    "mediaType": "tv",
    "phase": "2. Turn of the Century Era (1999\u20132007)",
    "hero": "Fantastic Four",
    "runtime": "Series"
  },
  {
    "id": "the_invincible_iron_man_2007",
    "title": "The Invincible Iron Man",
    "year": 2007,
    "tag": "Animated Film, Jan 2007",
    "mediaType": "movie",
    "phase": "2. Turn of the Century Era (1999\u20132007)",
    "hero": "Iron Man",
    "runtime": "126m"
  },
  {
    "id": "ghost_rider_2007",
    "title": "Ghost Rider",
    "year": 2007,
    "tag": "Film, Feb 2007",
    "mediaType": "movie",
    "phase": "2. Turn of the Century Era (1999\u20132007)",
    "hero": "Ghost Rider",
    "runtime": "120m"
  },
  {
    "id": "spider_man_3_2007",
    "title": "Spider-Man 3",
    "year": 2007,
    "tag": "Film, May 2007",
    "mediaType": "movie",
    "phase": "2. Turn of the Century Era (1999\u20132007)",
    "hero": "Spider-Man",
    "runtime": "120m"
  },
  {
    "id": "fantastic_four_rise_of_the_silver_surfer_2007",
    "title": "Fantastic Four: Rise of the Silver Surfer",
    "year": 2007,
    "tag": "Film, June 2007",
    "mediaType": "movie",
    "phase": "2. Turn of the Century Era (1999\u20132007)",
    "hero": "Fantastic Four",
    "runtime": "120m"
  },
  {
    "id": "doctor_strange_the_sorcerer_supreme_2007",
    "title": "Doctor Strange: The Sorcerer Supreme",
    "year": 2007,
    "tag": "Animated Film, Aug 2007",
    "mediaType": "movie",
    "phase": "2. Turn of the Century Era (1999\u20132007)",
    "hero": "Doctor Strange",
    "runtime": "120m"
  },
  {
    "id": "next_avengers_heroes_of_tomorrow_2008",
    "title": "Next Avengers: Heroes of Tomorrow",
    "year": 2008,
    "tag": "Animated Film, Sept 2008",
    "mediaType": "movie",
    "phase": "3. MCU Phase 1 & Avengers Expansion (2008\u20132012)",
    "hero": "The Avengers",
    "runtime": "120m"
  },
  {
    "id": "punisher_war_zone_2008",
    "title": "Punisher: War Zone",
    "year": 2008,
    "tag": "Film, Dec 2008",
    "mediaType": "movie",
    "phase": "3. MCU Phase 1 & Avengers Expansion (2008\u20132012)",
    "hero": "The Punisher",
    "runtime": "120m"
  },
  {
    "id": "iron_man_2008",
    "title": "Iron Man",
    "year": 2008,
    "tag": "Film, May 2008",
    "mediaType": "movie",
    "phase": "3. MCU Phase 1 & Avengers Expansion (2008\u20132012)",
    "hero": "Iron Man",
    "runtime": "126m"
  },
  {
    "id": "the_incredible_hulk_2008",
    "title": "The Incredible Hulk",
    "year": 2008,
    "tag": "Film, June 2008",
    "mediaType": "movie",
    "phase": "3. MCU Phase 1 & Avengers Expansion (2008\u20132012)",
    "hero": "Hulk",
    "runtime": "120m"
  },
  {
    "id": "the_spectacular_spider_man_season_1_2008",
    "title": "The Spectacular Spider-Man Season 1",
    "year": 2008,
    "tag": "Animated Series, March 2008",
    "mediaType": "tv",
    "phase": "3. MCU Phase 1 & Avengers Expansion (2008\u20132012)",
    "hero": "Spider-Man",
    "runtime": "Series"
  },
  {
    "id": "hulk_vs_2009",
    "title": "Hulk Vs.",
    "year": 2009,
    "tag": "Animated Film, Feb 2009",
    "mediaType": "movie",
    "phase": "3. MCU Phase 1 & Avengers Expansion (2008\u20132012)",
    "hero": "Hulk",
    "runtime": "120m"
  },
  {
    "id": "x_men_origins_wolverine_2009",
    "title": "X-Men Origins: Wolverine",
    "year": 2009,
    "tag": "Film, May 2009",
    "mediaType": "movie",
    "phase": "3. MCU Phase 1 & Avengers Expansion (2008\u20132012)",
    "hero": "X-Men",
    "runtime": "104m"
  },
  {
    "id": "wolverine_and_the_x_men_season_1_2009",
    "title": "Wolverine and the X-Men Season 1",
    "year": 2009,
    "tag": "Animated Series, Jan 2009",
    "mediaType": "tv",
    "phase": "3. MCU Phase 1 & Avengers Expansion (2008\u20132012)",
    "hero": "X-Men",
    "runtime": "Series"
  },
  {
    "id": "iron_man_armored_adventures_season_1_2009",
    "title": "Iron Man: Armored Adventures Season 1",
    "year": 2009,
    "tag": "Animated Series, April 2009",
    "mediaType": "tv",
    "phase": "3. MCU Phase 1 & Avengers Expansion (2008\u20132012)",
    "hero": "Iron Man",
    "runtime": "Series"
  },
  {
    "id": "the_spectacular_spider_man_season_2_2009",
    "title": "The Spectacular Spider-Man Season 2",
    "year": 2009,
    "tag": "Animated Series, June 2009",
    "mediaType": "tv",
    "phase": "3. MCU Phase 1 & Avengers Expansion (2008\u20132012)",
    "hero": "Spider-Man",
    "runtime": "Series"
  },
  {
    "id": "the_super_hero_squad_show_season_1_2009",
    "title": "The Super Hero Squad Show Season 1",
    "year": 2009,
    "tag": "Animated Series, Sept 2009",
    "mediaType": "tv",
    "phase": "3. MCU Phase 1 & Avengers Expansion (2008\u20132012)",
    "hero": "Marvel Universe",
    "runtime": "Series"
  },
  {
    "id": "planet_hulk_2010",
    "title": "Planet Hulk",
    "year": 2010,
    "tag": "Animated Film, Feb 2010",
    "mediaType": "movie",
    "phase": "3. MCU Phase 1 & Avengers Expansion (2008\u20132012)",
    "hero": "Hulk",
    "runtime": "120m"
  },
  {
    "id": "iron_man_2_2010",
    "title": "Iron Man 2",
    "year": 2010,
    "tag": "Film, May 2010",
    "mediaType": "movie",
    "phase": "3. MCU Phase 1 & Avengers Expansion (2008\u20132012)",
    "hero": "Iron Man",
    "runtime": "126m"
  },
  {
    "id": "the_super_hero_squad_show_season_2_2010",
    "title": "The Super Hero Squad Show Season 2",
    "year": 2010,
    "tag": "Animated Series, Oct 2010",
    "mediaType": "tv",
    "phase": "3. MCU Phase 1 & Avengers Expansion (2008\u20132012)",
    "hero": "Marvel Universe",
    "runtime": "Series"
  },
  {
    "id": "the_avengers_earth_s_mightiest_heroes_season_1_2010",
    "title": "The Avengers: Earth's Mightiest Heroes Season 1",
    "year": 2010,
    "tag": "Animated Series, Oct 2010",
    "mediaType": "tv",
    "phase": "3. MCU Phase 1 & Avengers Expansion (2008\u20132012)",
    "hero": "The Avengers",
    "runtime": "Series"
  },
  {
    "id": "marvel_anime_iron_man_season_1_2010",
    "title": "Marvel Anime: Iron Man Season 1",
    "year": 2010,
    "tag": "Animated Series, Oct 2010",
    "mediaType": "tv",
    "phase": "3. MCU Phase 1 & Avengers Expansion (2008\u20132012)",
    "hero": "Iron Man",
    "runtime": "Series"
  },
  {
    "id": "thor_tales_of_asgard_2011",
    "title": "Thor: Tales of Asgard",
    "year": 2011,
    "tag": "Animated Film, May 2011",
    "mediaType": "movie",
    "phase": "3. MCU Phase 1 & Avengers Expansion (2008\u20132012)",
    "hero": "Thor",
    "runtime": "120m"
  },
  {
    "id": "thor_2011",
    "title": "Thor",
    "year": 2011,
    "tag": "Film, May 2011",
    "mediaType": "movie",
    "phase": "3. MCU Phase 1 & Avengers Expansion (2008\u20132012)",
    "hero": "Thor",
    "runtime": "120m"
  },
  {
    "id": "x_men_first_class_2011",
    "title": "X-Men: First Class",
    "year": 2011,
    "tag": "Film, June 2011",
    "mediaType": "movie",
    "phase": "3. MCU Phase 1 & Avengers Expansion (2008\u20132012)",
    "hero": "X-Men",
    "runtime": "104m"
  },
  {
    "id": "captain_america_the_first_avenger_2011",
    "title": "Captain America: The First Avenger",
    "year": 2011,
    "tag": "Film, July 2011",
    "mediaType": "movie",
    "phase": "3. MCU Phase 1 & Avengers Expansion (2008\u20132012)",
    "hero": "Captain America",
    "runtime": "124m"
  },
  {
    "id": "marvel_one_shot_the_consultant_2011",
    "title": "Marvel One-Shot: The Consultant",
    "year": 2011,
    "tag": "Short Film, Sept 2011",
    "mediaType": "short",
    "phase": "3. MCU Phase 1 & Avengers Expansion (2008\u20132012)",
    "hero": "Marvel Universe",
    "runtime": "15m"
  },
  {
    "id": "marvel_one_shot_a_funny_thing_happened_on_the_way_to_thor_s_hammer_2011",
    "title": "Marvel One-Shot: A Funny Thing Happened on the Way to Thor's Hammer",
    "year": 2011,
    "tag": "Short Film, Oct 2011",
    "mediaType": "short",
    "phase": "3. MCU Phase 1 & Avengers Expansion (2008\u20132012)",
    "hero": "Thor",
    "runtime": "15m"
  },
  {
    "id": "ghost_rider_spirit_of_vengeance_2011",
    "title": "Ghost Rider: Spirit of Vengeance",
    "year": 2011,
    "tag": "Film, Feb 2011",
    "mediaType": "movie",
    "phase": "3. MCU Phase 1 & Avengers Expansion (2008\u20132012)",
    "hero": "Ghost Rider",
    "runtime": "120m"
  },
  {
    "id": "marvel_anime_wolverine_season_1_2011",
    "title": "Marvel Anime: Wolverine Season 1",
    "year": 2011,
    "tag": "Animated Series, Jan 2011",
    "mediaType": "tv",
    "phase": "3. MCU Phase 1 & Avengers Expansion (2008\u20132012)",
    "hero": "X-Men",
    "runtime": "Series"
  },
  {
    "id": "marvel_anime_x_men_season_1_2011",
    "title": "Marvel Anime: X-Men Season 1",
    "year": 2011,
    "tag": "Animated Series, July 2011",
    "mediaType": "tv",
    "phase": "3. MCU Phase 1 & Avengers Expansion (2008\u20132012)",
    "hero": "X-Men",
    "runtime": "Series"
  },
  {
    "id": "marvel_anime_blade_season_1_2011",
    "title": "Marvel Anime: Blade Season 1",
    "year": 2011,
    "tag": "Animated Series, July 2011",
    "mediaType": "tv",
    "phase": "3. MCU Phase 1 & Avengers Expansion (2008\u20132012)",
    "hero": "Blade",
    "runtime": "Series"
  },
  {
    "id": "iron_man_armored_adventures_season_2_2011",
    "title": "Iron Man: Armored Adventures Season 2",
    "year": 2011,
    "tag": "Animated Series, July 2011",
    "mediaType": "tv",
    "phase": "3. MCU Phase 1 & Avengers Expansion (2008\u20132012)",
    "hero": "Iron Man",
    "runtime": "Series"
  },
  {
    "id": "the_avengers_earth_s_mightiest_heroes_season_2_2012",
    "title": "The Avengers: Earth's Mightiest Heroes Season 2",
    "year": 2012,
    "tag": "Animated Series, April 2012",
    "mediaType": "tv",
    "phase": "3. MCU Phase 1 & Avengers Expansion (2008\u20132012)",
    "hero": "The Avengers",
    "runtime": "Series"
  },
  {
    "id": "the_avengers_2012",
    "title": "The Avengers",
    "year": 2012,
    "tag": "Film, May 2012",
    "mediaType": "movie",
    "phase": "3. MCU Phase 1 & Avengers Expansion (2008\u20132012)",
    "hero": "The Avengers",
    "runtime": "143m"
  },
  {
    "id": "the_amazing_spider_man_2012",
    "title": "The Amazing Spider-Man",
    "year": 2012,
    "tag": "Film, July 2012",
    "mediaType": "movie",
    "phase": "3. MCU Phase 1 & Avengers Expansion (2008\u20132012)",
    "hero": "Spider-Man",
    "runtime": "120m"
  },
  {
    "id": "marvel_one_shot_item_47_2012",
    "title": "Marvel One-Shot: Item 47",
    "year": 2012,
    "tag": "Short Film, Sept 2012",
    "mediaType": "short",
    "phase": "3. MCU Phase 1 & Avengers Expansion (2008\u20132012)",
    "hero": "Marvel Universe",
    "runtime": "15m"
  },
  {
    "id": "ultimate_spider_man_season_1_2012",
    "title": "Ultimate Spider-Man Season 1",
    "year": 2012,
    "tag": "Animated Series, April 2012",
    "mediaType": "tv",
    "phase": "3. MCU Phase 1 & Avengers Expansion (2008\u20132012)",
    "hero": "Spider-Man",
    "runtime": "Series"
  },
  {
    "id": "iron_man_rise_of_technovore_2013",
    "title": "Iron Man: Rise of Technovore",
    "year": 2013,
    "tag": "Animated Film, April 2013",
    "mediaType": "movie",
    "phase": "4. MCU Phase 2 & Mid-2010s Expansion (2013\u20132015)",
    "hero": "Iron Man",
    "runtime": "126m"
  },
  {
    "id": "iron_man_3_2013",
    "title": "Iron Man 3",
    "year": 2013,
    "tag": "Film, May 2013",
    "mediaType": "movie",
    "phase": "4. MCU Phase 2 & Mid-2010s Expansion (2013\u20132015)",
    "hero": "Iron Man",
    "runtime": "126m"
  },
  {
    "id": "the_wolverine_2013",
    "title": "The Wolverine",
    "year": 2013,
    "tag": "Film, July 2013",
    "mediaType": "movie",
    "phase": "4. MCU Phase 2 & Mid-2010s Expansion (2013\u20132015)",
    "hero": "X-Men",
    "runtime": "120m"
  },
  {
    "id": "iron_man_hulk_heroes_united_2013",
    "title": "Iron Man & Hulk: Heroes United",
    "year": 2013,
    "tag": "Animated Film, Dec 2013",
    "mediaType": "movie",
    "phase": "4. MCU Phase 2 & Mid-2010s Expansion (2013\u20132015)",
    "hero": "Iron Man",
    "runtime": "126m"
  },
  {
    "id": "marvel_one_shot_agent_carter_2013",
    "title": "Marvel One-Shot: Agent Carter",
    "year": 2013,
    "tag": "Short Film, Sept 2013",
    "mediaType": "short",
    "phase": "4. MCU Phase 2 & Mid-2010s Expansion (2013\u20132015)",
    "hero": "Agent Carter",
    "runtime": "15m"
  },
  {
    "id": "agents_of_s_h_i_e_l_d_season_1_2013",
    "title": "Agents of S.H.I.E.L.D. Season 1",
    "year": 2013,
    "tag": "TV, Sept 2013",
    "mediaType": "tv",
    "phase": "4. MCU Phase 2 & Mid-2010s Expansion (2013\u20132015)",
    "hero": "Marvel Universe",
    "runtime": "Series"
  },
  {
    "id": "ultimate_spider_man_season_2_2013",
    "title": "Ultimate Spider-Man Season 2",
    "year": 2013,
    "tag": "Animated Series, Jan 2013",
    "mediaType": "tv",
    "phase": "4. MCU Phase 2 & Mid-2010s Expansion (2013\u20132015)",
    "hero": "Spider-Man",
    "runtime": "Series"
  },
  {
    "id": "avengers_assemble_season_1_2013",
    "title": "Avengers Assemble Season 1",
    "year": 2013,
    "tag": "Animated Series, May 2013",
    "mediaType": "tv",
    "phase": "4. MCU Phase 2 & Mid-2010s Expansion (2013\u20132015)",
    "hero": "The Avengers",
    "runtime": "Series"
  },
  {
    "id": "hulk_and_the_agents_of_s_m_a_s_h_season_1_2013",
    "title": "Hulk and the Agents of S.M.A.S.H. Season 1",
    "year": 2013,
    "tag": "Animated Series, Aug 2013",
    "mediaType": "tv",
    "phase": "4. MCU Phase 2 & Mid-2010s Expansion (2013\u20132015)",
    "hero": "Hulk",
    "runtime": "Series"
  },
  {
    "id": "thor_the_dark_world_2013",
    "title": "Thor: The Dark World",
    "year": 2013,
    "tag": "Film, Nov 2013",
    "mediaType": "movie",
    "phase": "4. MCU Phase 2 & Mid-2010s Expansion (2013\u20132015)",
    "hero": "Thor",
    "runtime": "120m"
  },
  {
    "id": "avengers_confidential_black_widow_punisher_2014",
    "title": "Avengers Confidential: Black Widow & Punisher",
    "year": 2014,
    "tag": "Animated Film, Jan 2014",
    "mediaType": "movie",
    "phase": "4. MCU Phase 2 & Mid-2010s Expansion (2013\u20132015)",
    "hero": "The Avengers",
    "runtime": "120m"
  },
  {
    "id": "captain_america_the_winter_soldier_2014",
    "title": "Captain America: The Winter Soldier",
    "year": 2014,
    "tag": "Film, April 2014",
    "mediaType": "movie",
    "phase": "4. MCU Phase 2 & Mid-2010s Expansion (2013\u20132015)",
    "hero": "Captain America",
    "runtime": "120m"
  },
  {
    "id": "the_amazing_spider_man_2_2014",
    "title": "The Amazing Spider-Man 2",
    "year": 2014,
    "tag": "Film, May 2014",
    "mediaType": "movie",
    "phase": "4. MCU Phase 2 & Mid-2010s Expansion (2013\u20132015)",
    "hero": "Spider-Man",
    "runtime": "120m"
  },
  {
    "id": "x_men_days_of_future_past_2014",
    "title": "X-Men: Days of Future Past",
    "year": 2014,
    "tag": "Film, May 2014",
    "mediaType": "movie",
    "phase": "4. MCU Phase 2 & Mid-2010s Expansion (2013\u20132015)",
    "hero": "X-Men",
    "runtime": "104m"
  },
  {
    "id": "guardians_of_the_galaxy_2014",
    "title": "Guardians of the Galaxy",
    "year": 2014,
    "tag": "Film, Aug 2014",
    "mediaType": "movie",
    "phase": "4. MCU Phase 2 & Mid-2010s Expansion (2013\u20132015)",
    "hero": "Guardians",
    "runtime": "120m"
  },
  {
    "id": "iron_man_captain_america_heroes_united_2014",
    "title": "Iron Man & Captain America: Heroes United",
    "year": 2014,
    "tag": "Animated Film, July 2014",
    "mediaType": "movie",
    "phase": "4. MCU Phase 2 & Mid-2010s Expansion (2013\u20132015)",
    "hero": "Iron Man",
    "runtime": "126m"
  },
  {
    "id": "marvel_one_shot_all_hail_the_king_2014",
    "title": "Marvel One-Shot: All Hail the King",
    "year": 2014,
    "tag": "Short Film, Feb 2014",
    "mediaType": "short",
    "phase": "4. MCU Phase 2 & Mid-2010s Expansion (2013\u20132015)",
    "hero": "Marvel Universe",
    "runtime": "15m"
  },
  {
    "id": "agents_of_s_h_i_e_l_d_season_2_2014",
    "title": "Agents of S.H.I.E.L.D. Season 2",
    "year": 2014,
    "tag": "TV, Sept 2014",
    "mediaType": "tv",
    "phase": "4. MCU Phase 2 & Mid-2010s Expansion (2013\u20132015)",
    "hero": "Marvel Universe",
    "runtime": "Series"
  },
  {
    "id": "ultimate_spider_man_season_3_2014",
    "title": "Ultimate Spider-Man Season 3",
    "year": 2014,
    "tag": "Animated Series, Aug 2014",
    "mediaType": "tv",
    "phase": "4. MCU Phase 2 & Mid-2010s Expansion (2013\u20132015)",
    "hero": "Spider-Man",
    "runtime": "Series"
  },
  {
    "id": "marvel_disk_wars_the_avengers_season_1_2014",
    "title": "Marvel Disk Wars: The Avengers Season 1",
    "year": 2014,
    "tag": "Animated Series, July 2014",
    "mediaType": "tv",
    "phase": "4. MCU Phase 2 & Mid-2010s Expansion (2013\u20132015)",
    "hero": "The Avengers",
    "runtime": "Series"
  },
  {
    "id": "avengers_assemble_season_2_2014",
    "title": "Avengers Assemble Season 2",
    "year": 2014,
    "tag": "Animated Series, Sept 2014",
    "mediaType": "tv",
    "phase": "4. MCU Phase 2 & Mid-2010s Expansion (2013\u20132015)",
    "hero": "The Avengers",
    "runtime": "Series"
  },
  {
    "id": "hulk_and_the_agents_of_s_m_a_s_h_season_2_2014",
    "title": "Hulk and the Agents of S.M.A.S.H. Season 2",
    "year": 2014,
    "tag": "Animated Series, Oct 2014",
    "mediaType": "tv",
    "phase": "4. MCU Phase 2 & Mid-2010s Expansion (2013\u20132015)",
    "hero": "Hulk",
    "runtime": "Series"
  },
  {
    "id": "agent_carter_season_1_2015",
    "title": "Agent Carter Season 1",
    "year": 2015,
    "tag": "TV, Jan 2015",
    "mediaType": "tv",
    "phase": "4. MCU Phase 2 & Mid-2010s Expansion (2013\u20132015)",
    "hero": "Agent Carter",
    "runtime": "Series"
  },
  {
    "id": "daredevil_season_1_2015",
    "title": "Daredevil Season 1",
    "year": 2015,
    "tag": "TV, April 2015",
    "mediaType": "tv",
    "phase": "4. MCU Phase 2 & Mid-2010s Expansion (2013\u20132015)",
    "hero": "Daredevil",
    "runtime": "Series"
  },
  {
    "id": "avengers_age_of_ultron_2015",
    "title": "Avengers: Age of Ultron",
    "year": 2015,
    "tag": "Film, May 2015",
    "mediaType": "movie",
    "phase": "4. MCU Phase 2 & Mid-2010s Expansion (2013\u20132015)",
    "hero": "The Avengers",
    "runtime": "120m"
  },
  {
    "id": "ant_man_2015",
    "title": "Ant-Man",
    "year": 2015,
    "tag": "Film, July 2015",
    "mediaType": "movie",
    "phase": "4. MCU Phase 2 & Mid-2010s Expansion (2013\u20132015)",
    "hero": "Ant-Man",
    "runtime": "120m"
  },
  {
    "id": "fantastic_four_2015",
    "title": "Fantastic Four",
    "year": 2015,
    "tag": "Film, Aug 2015",
    "mediaType": "movie",
    "phase": "4. MCU Phase 2 & Mid-2010s Expansion (2013\u20132015)",
    "hero": "Fantastic Four",
    "runtime": "120m"
  },
  {
    "id": "marvel_super_hero_adventures_frost_fight_2015",
    "title": "Marvel Super Hero Adventures: Frost Fight!",
    "year": 2015,
    "tag": "Animated Film, Nov 2015",
    "mediaType": "movie",
    "phase": "4. MCU Phase 2 & Mid-2010s Expansion (2013\u20132015)",
    "hero": "Marvel Universe",
    "runtime": "120m"
  },
  {
    "id": "agents_of_s_h_i_e_l_d_season_3_2015",
    "title": "Agents of S.H.I.E.L.D. Season 3",
    "year": 2015,
    "tag": "TV, Sept 2015",
    "mediaType": "tv",
    "phase": "4. MCU Phase 2 & Mid-2010s Expansion (2013\u20132015)",
    "hero": "Marvel Universe",
    "runtime": "Series"
  },
  {
    "id": "jessica_jones_season_1_2015",
    "title": "Jessica Jones Season 1",
    "year": 2015,
    "tag": "TV, Nov 2015",
    "mediaType": "tv",
    "phase": "4. MCU Phase 2 & Mid-2010s Expansion (2013\u20132015)",
    "hero": "Jessica Jones",
    "runtime": "Series"
  },
  {
    "id": "guardians_of_the_galaxy_season_1_2015",
    "title": "Guardians of the Galaxy Season 1",
    "year": 2015,
    "tag": "Animated Series, Sept 2015",
    "mediaType": "tv",
    "phase": "4. MCU Phase 2 & Mid-2010s Expansion (2013\u20132015)",
    "hero": "Guardians",
    "runtime": "Series"
  },
  {
    "id": "agent_carter_season_2_2016",
    "title": "Agent Carter Season 2",
    "year": 2016,
    "tag": "TV, Jan 2016",
    "mediaType": "tv",
    "phase": "5. MCU Phase 3 & Late-2010s Expansion (2016\u20132019)",
    "hero": "Agent Carter",
    "runtime": "Series"
  },
  {
    "id": "deadpool_2016",
    "title": "Deadpool",
    "year": 2016,
    "tag": "Film, Feb 2016",
    "mediaType": "movie",
    "phase": "5. MCU Phase 3 & Late-2010s Expansion (2016\u20132019)",
    "hero": "Deadpool & Wolverine",
    "runtime": "120m"
  },
  {
    "id": "daredevil_season_2_2016",
    "title": "Daredevil Season 2",
    "year": 2016,
    "tag": "TV, March 2016",
    "mediaType": "tv",
    "phase": "5. MCU Phase 3 & Late-2010s Expansion (2016\u20132019)",
    "hero": "Daredevil",
    "runtime": "Series"
  },
  {
    "id": "captain_america_civil_war_2016",
    "title": "Captain America: Civil War",
    "year": 2016,
    "tag": "Film, May 2016",
    "mediaType": "movie",
    "phase": "5. MCU Phase 3 & Late-2010s Expansion (2016\u20132019)",
    "hero": "Captain America",
    "runtime": "147m"
  },
  {
    "id": "x_men_apocalypse_2016",
    "title": "X-Men: Apocalypse",
    "year": 2016,
    "tag": "Film, May 2016",
    "mediaType": "movie",
    "phase": "5. MCU Phase 3 & Late-2010s Expansion (2016\u20132019)",
    "hero": "X-Men",
    "runtime": "104m"
  },
  {
    "id": "hulk_where_monsters_dwell_2016",
    "title": "Hulk: Where Monsters Dwell",
    "year": 2016,
    "tag": "Animated Film, Oct 2016",
    "mediaType": "movie",
    "phase": "5. MCU Phase 3 & Late-2010s Expansion (2016\u20132019)",
    "hero": "Hulk",
    "runtime": "120m"
  },
  {
    "id": "marvel_one_shot_team_thor_2016",
    "title": "Marvel One-Shot: Team Thor",
    "year": 2016,
    "tag": "Short Film, Aug 2016",
    "mediaType": "short",
    "phase": "5. MCU Phase 3 & Late-2010s Expansion (2016\u20132019)",
    "hero": "Thor",
    "runtime": "15m"
  },
  {
    "id": "agents_of_s_h_i_e_l_d_season_4_2016",
    "title": "Agents of S.H.I.E.L.D. Season 4",
    "year": 2016,
    "tag": "TV, Sept 2016",
    "mediaType": "tv",
    "phase": "5. MCU Phase 3 & Late-2010s Expansion (2016\u20132019)",
    "hero": "Marvel Universe",
    "runtime": "Series"
  },
  {
    "id": "luke_cage_season_1_2016",
    "title": "Luke Cage Season 1",
    "year": 2016,
    "tag": "TV, Sept 2016",
    "mediaType": "tv",
    "phase": "5. MCU Phase 3 & Late-2010s Expansion (2016\u20132019)",
    "hero": "Luke Cage",
    "runtime": "Series"
  },
  {
    "id": "ultimate_spider_man_season_4_2016",
    "title": "Ultimate Spider-Man Season 4",
    "year": 2016,
    "tag": "Animated Series, Feb 2016",
    "mediaType": "tv",
    "phase": "5. MCU Phase 3 & Late-2010s Expansion (2016\u20132019)",
    "hero": "Spider-Man",
    "runtime": "Series"
  },
  {
    "id": "avengers_assemble_season_3_2016",
    "title": "Avengers Assemble Season 3",
    "year": 2016,
    "tag": "Animated Series, March 2016",
    "mediaType": "tv",
    "phase": "5. MCU Phase 3 & Late-2010s Expansion (2016\u20132019)",
    "hero": "The Avengers",
    "runtime": "Series"
  },
  {
    "id": "doctor_strange_2016",
    "title": "Doctor Strange",
    "year": 2016,
    "tag": "Film, Nov 2016",
    "mediaType": "movie",
    "phase": "5. MCU Phase 3 & Late-2010s Expansion (2016\u20132019)",
    "hero": "Doctor Strange",
    "runtime": "120m"
  },
  {
    "id": "marvel_one_shot_team_thor_part_2_2017",
    "title": "Marvel One-Shot: Team Thor: Part 2",
    "year": 2017,
    "tag": "Short Film, Feb 2017",
    "mediaType": "short",
    "phase": "5. MCU Phase 3 & Late-2010s Expansion (2016\u20132019)",
    "hero": "Thor",
    "runtime": "15m"
  },
  {
    "id": "logan_2017",
    "title": "Logan",
    "year": 2017,
    "tag": "Film, March 2017",
    "mediaType": "movie",
    "phase": "5. MCU Phase 3 & Late-2010s Expansion (2016\u20132019)",
    "hero": "Marvel Universe",
    "runtime": "120m"
  },
  {
    "id": "iron_fist_season_1_2017",
    "title": "Iron Fist Season 1",
    "year": 2017,
    "tag": "TV, March 2017",
    "mediaType": "tv",
    "phase": "5. MCU Phase 3 & Late-2010s Expansion (2016\u20132019)",
    "hero": "Iron Fist",
    "runtime": "Series"
  },
  {
    "id": "guardians_of_the_galaxy_vol_2_2017",
    "title": "Guardians of the Galaxy Vol. 2",
    "year": 2017,
    "tag": "Film, May 2017",
    "mediaType": "movie",
    "phase": "5. MCU Phase 3 & Late-2010s Expansion (2016\u20132019)",
    "hero": "Guardians",
    "runtime": "120m"
  },
  {
    "id": "spider_man_homecoming_2017",
    "title": "Spider-Man: Homecoming",
    "year": 2017,
    "tag": "Film, July 2017",
    "mediaType": "movie",
    "phase": "5. MCU Phase 3 & Late-2010s Expansion (2016\u20132019)",
    "hero": "Spider-Man",
    "runtime": "120m"
  },
  {
    "id": "the_defenders_season_1_2017",
    "title": "The Defenders Season 1",
    "year": 2017,
    "tag": "TV, Aug 2017",
    "mediaType": "tv",
    "phase": "5. MCU Phase 3 & Late-2010s Expansion (2016\u20132019)",
    "hero": "The Defenders",
    "runtime": "Series"
  },
  {
    "id": "inhumans_season_1_2017",
    "title": "Inhumans Season 1",
    "year": 2017,
    "tag": "TV, Sept 2017",
    "mediaType": "tv",
    "phase": "5. MCU Phase 3 & Late-2010s Expansion (2016\u20132019)",
    "hero": "Marvel Universe",
    "runtime": "Series"
  },
  {
    "id": "thor_ragnarok_2017",
    "title": "Thor: Ragnarok",
    "year": 2017,
    "tag": "Film, Nov 2017",
    "mediaType": "movie",
    "phase": "5. MCU Phase 3 & Late-2010s Expansion (2016\u20132019)",
    "hero": "Thor",
    "runtime": "120m"
  },
  {
    "id": "the_punisher_season_1_2017",
    "title": "The Punisher Season 1",
    "year": 2017,
    "tag": "TV, Nov 2017",
    "mediaType": "tv",
    "phase": "5. MCU Phase 3 & Late-2010s Expansion (2016\u20132019)",
    "hero": "The Punisher",
    "runtime": "Series"
  },
  {
    "id": "runaways_season_1_2017",
    "title": "Runaways Season 1",
    "year": 2017,
    "tag": "TV, Nov 2017",
    "mediaType": "tv",
    "phase": "5. MCU Phase 3 & Late-2010s Expansion (2016\u20132019)",
    "hero": "Runaways",
    "runtime": "Series"
  },
  {
    "id": "guardians_of_the_galaxy_season_2_2017",
    "title": "Guardians of the Galaxy Season 2",
    "year": 2017,
    "tag": "Animated Series, March 2017",
    "mediaType": "tv",
    "phase": "5. MCU Phase 3 & Late-2010s Expansion (2016\u20132019)",
    "hero": "Guardians",
    "runtime": "Series"
  },
  {
    "id": "marvel_s_spider_man_season_1_2017",
    "title": "Marvel's Spider-Man Season 1",
    "year": 2017,
    "tag": "Animated Series, Aug 2017",
    "mediaType": "tv",
    "phase": "5. MCU Phase 3 & Late-2010s Expansion (2016\u20132019)",
    "hero": "Spider-Man",
    "runtime": "Series"
  },
  {
    "id": "marvel_future_avengers_season_1_2017",
    "title": "Marvel Future Avengers Season 1",
    "year": 2017,
    "tag": "Animated Series, July 2017",
    "mediaType": "tv",
    "phase": "5. MCU Phase 3 & Late-2010s Expansion (2016\u20132019)",
    "hero": "The Avengers",
    "runtime": "Series"
  },
  {
    "id": "avengers_assemble_season_4_2017",
    "title": "Avengers Assemble Season 4",
    "year": 2017,
    "tag": "Animated Series, June 2017",
    "mediaType": "tv",
    "phase": "5. MCU Phase 3 & Late-2010s Expansion (2016\u20132019)",
    "hero": "The Avengers",
    "runtime": "Series"
  },
  {
    "id": "legion_season_1_2017",
    "title": "Legion Season 1",
    "year": 2017,
    "tag": "TV, Feb 2017",
    "mediaType": "tv",
    "phase": "5. MCU Phase 3 & Late-2010s Expansion (2016\u20132019)",
    "hero": "Marvel Universe",
    "runtime": "Series"
  },
  {
    "id": "the_gifted_season_1_2017",
    "title": "The Gifted Season 1",
    "year": 2017,
    "tag": "TV, Oct 2017",
    "mediaType": "tv",
    "phase": "5. MCU Phase 3 & Late-2010s Expansion (2016\u20132019)",
    "hero": "Marvel Universe",
    "runtime": "Series"
  },
  {
    "id": "agents_of_s_h_i_e_l_d_season_5_2017",
    "title": "Agents of S.H.I.E.L.D. Season 5",
    "year": 2017,
    "tag": "TV, Dec 2017",
    "mediaType": "tv",
    "phase": "5. MCU Phase 3 & Late-2010s Expansion (2016\u20132019)",
    "hero": "Marvel Universe",
    "runtime": "Series"
  },
  {
    "id": "marvel_one_shot_team_darryl_2018",
    "title": "Marvel One-Shot: Team Darryl",
    "year": 2018,
    "tag": "Short Film, Feb 2018",
    "mediaType": "short",
    "phase": "5. MCU Phase 3 & Late-2010s Expansion (2016\u20132019)",
    "hero": "Marvel Universe",
    "runtime": "15m"
  },
  {
    "id": "black_panther_2018",
    "title": "Black Panther",
    "year": 2018,
    "tag": "Film, Feb 2018",
    "mediaType": "movie",
    "phase": "5. MCU Phase 3 & Late-2010s Expansion (2016\u20132019)",
    "hero": "Black Panther",
    "runtime": "120m"
  },
  {
    "id": "jessica_jones_season_2_2018",
    "title": "Jessica Jones Season 2",
    "year": 2018,
    "tag": "TV, March 2018",
    "mediaType": "tv",
    "phase": "5. MCU Phase 3 & Late-2010s Expansion (2016\u20132019)",
    "hero": "Jessica Jones",
    "runtime": "Series"
  },
  {
    "id": "avengers_infinity_war_2018",
    "title": "Avengers: Infinity War",
    "year": 2018,
    "tag": "Film, April 2018",
    "mediaType": "movie",
    "phase": "5. MCU Phase 3 & Late-2010s Expansion (2016\u20132019)",
    "hero": "The Avengers",
    "runtime": "149m"
  },
  {
    "id": "deadpool_2_2018",
    "title": "Deadpool 2",
    "year": 2018,
    "tag": "Film, May 2018",
    "mediaType": "movie",
    "phase": "5. MCU Phase 3 & Late-2010s Expansion (2016\u20132019)",
    "hero": "Deadpool & Wolverine",
    "runtime": "120m"
  },
  {
    "id": "cloak_dagger_season_1_2018",
    "title": "Cloak & Dagger Season 1",
    "year": 2018,
    "tag": "TV, June 2018",
    "mediaType": "tv",
    "phase": "5. MCU Phase 3 & Late-2010s Expansion (2016\u20132019)",
    "hero": "Cloak & Dagger",
    "runtime": "Series"
  },
  {
    "id": "luke_cage_season_2_2018",
    "title": "Luke Cage Season 2",
    "year": 2018,
    "tag": "TV, June 2018",
    "mediaType": "tv",
    "phase": "5. MCU Phase 3 & Late-2010s Expansion (2016\u20132019)",
    "hero": "Luke Cage",
    "runtime": "Series"
  },
  {
    "id": "ant_man_and_the_wasp_2018",
    "title": "Ant-Man and the Wasp",
    "year": 2018,
    "tag": "Film, July 2018",
    "mediaType": "movie",
    "phase": "5. MCU Phase 3 & Late-2010s Expansion (2016\u20132019)",
    "hero": "Ant-Man",
    "runtime": "120m"
  },
  {
    "id": "iron_fist_season_2_2018",
    "title": "Iron Fist Season 2",
    "year": 2018,
    "tag": "TV, Sept 2018",
    "mediaType": "tv",
    "phase": "5. MCU Phase 3 & Late-2010s Expansion (2016\u20132019)",
    "hero": "Iron Fist",
    "runtime": "Series"
  },
  {
    "id": "venom_2018",
    "title": "Venom",
    "year": 2018,
    "tag": "Film, Oct 2018",
    "mediaType": "movie",
    "phase": "5. MCU Phase 3 & Late-2010s Expansion (2016\u20132019)",
    "hero": "Marvel Universe",
    "runtime": "120m"
  },
  {
    "id": "daredevil_season_3_2018",
    "title": "Daredevil Season 3",
    "year": 2018,
    "tag": "TV, Oct 2018",
    "mediaType": "tv",
    "phase": "5. MCU Phase 3 & Late-2010s Expansion (2016\u20132019)",
    "hero": "Daredevil",
    "runtime": "Series"
  },
  {
    "id": "spider_man_into_the_spider_verse_2018",
    "title": "Spider-Man: Into the Spider-Verse",
    "year": 2018,
    "tag": "Animated Film, Dec 2018",
    "mediaType": "movie",
    "phase": "5. MCU Phase 3 & Late-2010s Expansion (2016\u20132019)",
    "hero": "Spider-Man",
    "runtime": "120m"
  },
  {
    "id": "runaways_season_2_2018",
    "title": "Runaways Season 2",
    "year": 2018,
    "tag": "TV, Dec 2018",
    "mediaType": "tv",
    "phase": "5. MCU Phase 3 & Late-2010s Expansion (2016\u20132019)",
    "hero": "Runaways",
    "runtime": "Series"
  },
  {
    "id": "marvel_future_avengers_season_2_2018",
    "title": "Marvel Future Avengers Season 2",
    "year": 2018,
    "tag": "Animated Series, July 2018",
    "mediaType": "tv",
    "phase": "5. MCU Phase 3 & Late-2010s Expansion (2016\u20132019)",
    "hero": "The Avengers",
    "runtime": "Series"
  },
  {
    "id": "marvel_s_spider_man_season_2_2018",
    "title": "Marvel's Spider-Man Season 2",
    "year": 2018,
    "tag": "Animated Series, June 2018",
    "mediaType": "tv",
    "phase": "5. MCU Phase 3 & Late-2010s Expansion (2016\u20132019)",
    "hero": "Spider-Man",
    "runtime": "Series"
  },
  {
    "id": "avengers_assemble_season_5_2018",
    "title": "Avengers Assemble Season 5",
    "year": 2018,
    "tag": "Animated Series, Sept 2018",
    "mediaType": "tv",
    "phase": "5. MCU Phase 3 & Late-2010s Expansion (2016\u20132019)",
    "hero": "The Avengers",
    "runtime": "Series"
  },
  {
    "id": "legion_season_2_2018",
    "title": "Legion Season 2",
    "year": 2018,
    "tag": "TV, April 2018",
    "mediaType": "tv",
    "phase": "5. MCU Phase 3 & Late-2010s Expansion (2016\u20132019)",
    "hero": "Marvel Universe",
    "runtime": "Series"
  },
  {
    "id": "the_gifted_season_2_2018",
    "title": "The Gifted Season 2",
    "year": 2018,
    "tag": "TV, Sept 2018",
    "mediaType": "tv",
    "phase": "5. MCU Phase 3 & Late-2010s Expansion (2016\u20132019)",
    "hero": "Marvel Universe",
    "runtime": "Series"
  },
  {
    "id": "the_punisher_season_2_2019",
    "title": "The Punisher Season 2",
    "year": 2019,
    "tag": "TV, Jan 2019",
    "mediaType": "tv",
    "phase": "5. MCU Phase 3 & Late-2010s Expansion (2016\u20132019)",
    "hero": "The Punisher",
    "runtime": "Series"
  },
  {
    "id": "captain_marvel_2019",
    "title": "Captain Marvel",
    "year": 2019,
    "tag": "Film, March 2019",
    "mediaType": "movie",
    "phase": "5. MCU Phase 3 & Late-2010s Expansion (2016\u20132019)",
    "hero": "Captain Marvel",
    "runtime": "120m"
  },
  {
    "id": "cloak_dagger_season_2_2019",
    "title": "Cloak & Dagger Season 2",
    "year": 2019,
    "tag": "TV, April 2019",
    "mediaType": "tv",
    "phase": "5. MCU Phase 3 & Late-2010s Expansion (2016\u20132019)",
    "hero": "Cloak & Dagger",
    "runtime": "Series"
  },
  {
    "id": "avengers_endgame_2019",
    "title": "Avengers: Endgame",
    "year": 2019,
    "tag": "Film, April 2019",
    "mediaType": "movie",
    "phase": "5. MCU Phase 3 & Late-2010s Expansion (2016\u20132019)",
    "hero": "The Avengers",
    "runtime": "181m"
  },
  {
    "id": "agents_of_s_h_i_e_l_d_season_6_2019",
    "title": "Agents of S.H.I.E.L.D. Season 6",
    "year": 2019,
    "tag": "TV, May 2019",
    "mediaType": "tv",
    "phase": "5. MCU Phase 3 & Late-2010s Expansion (2016\u20132019)",
    "hero": "Marvel Universe",
    "runtime": "Series"
  },
  {
    "id": "jessica_jones_season_3_2019",
    "title": "Jessica Jones Season 3",
    "year": 2019,
    "tag": "TV, June 2019",
    "mediaType": "tv",
    "phase": "5. MCU Phase 3 & Late-2010s Expansion (2016\u20132019)",
    "hero": "Jessica Jones",
    "runtime": "Series"
  },
  {
    "id": "spider_man_far_from_home_2019",
    "title": "Spider-Man: Far From Home",
    "year": 2019,
    "tag": "Film, July 2019",
    "mediaType": "movie",
    "phase": "5. MCU Phase 3 & Late-2010s Expansion (2016\u20132019)",
    "hero": "Spider-Man",
    "runtime": "120m"
  },
  {
    "id": "dark_phoenix_2019",
    "title": "Dark Phoenix",
    "year": 2019,
    "tag": "Film, June 2019",
    "mediaType": "movie",
    "phase": "5. MCU Phase 3 & Late-2010s Expansion (2016\u20132019)",
    "hero": "Marvel Universe",
    "runtime": "120m"
  },
  {
    "id": "guardians_of_the_galaxy_season_3_2019",
    "title": "Guardians of the Galaxy Season 3",
    "year": 2019,
    "tag": "Animated Series, April 2019",
    "mediaType": "tv",
    "phase": "5. MCU Phase 3 & Late-2010s Expansion (2016\u20132019)",
    "hero": "Guardians",
    "runtime": "Series"
  },
  {
    "id": "legion_season_3_2019",
    "title": "Legion Season 3",
    "year": 2019,
    "tag": "TV, June 2019",
    "mediaType": "tv",
    "phase": "5. MCU Phase 3 & Late-2010s Expansion (2016\u20132019)",
    "hero": "Marvel Universe",
    "runtime": "Series"
  },
  {
    "id": "runaways_season_3_2019",
    "title": "Runaways Season 3",
    "year": 2019,
    "tag": "TV, Dec 2019",
    "mediaType": "tv",
    "phase": "5. MCU Phase 3 & Late-2010s Expansion (2016\u20132019)",
    "hero": "Runaways",
    "runtime": "Series"
  },
  {
    "id": "agents_of_s_h_i_e_l_d_season_7_2020",
    "title": "Agents of S.H.I.E.L.D. Season 7",
    "year": 2020,
    "tag": "TV, May 2020",
    "mediaType": "tv",
    "phase": "6. MCU Phase 4 & New Avengers Era (2020\u20132022)",
    "hero": "Marvel Universe",
    "runtime": "Series"
  },
  {
    "id": "the_new_mutants_2020",
    "title": "The New Mutants",
    "year": 2020,
    "tag": "Film, Aug 2020",
    "mediaType": "movie",
    "phase": "6. MCU Phase 4 & New Avengers Era (2020\u20132022)",
    "hero": "Marvel Universe",
    "runtime": "120m"
  },
  {
    "id": "marvel_s_spider_man_season_3_2020",
    "title": "Marvel's Spider-Man Season 3",
    "year": 2020,
    "tag": "Animated Series, May 2020",
    "mediaType": "tv",
    "phase": "6. MCU Phase 4 & New Avengers Era (2020\u20132022)",
    "hero": "Spider-Man",
    "runtime": "Series"
  },
  {
    "id": "helstrom_season_1_2020",
    "title": "Helstrom Season 1",
    "year": 2020,
    "tag": "TV, Oct 2020",
    "mediaType": "tv",
    "phase": "6. MCU Phase 4 & New Avengers Era (2020\u20132022)",
    "hero": "Marvel Universe",
    "runtime": "Series"
  },
  {
    "id": "wandavision_2021",
    "title": "WandaVision",
    "year": 2021,
    "tag": "Disney+ Series, Jan 2021",
    "mediaType": "tv",
    "phase": "6. MCU Phase 4 & New Avengers Era (2020\u20132022)",
    "hero": "Wanda & Vision",
    "runtime": "Series"
  },
  {
    "id": "the_falcon_and_the_winter_soldier_2021",
    "title": "The Falcon and the Winter Soldier",
    "year": 2021,
    "tag": "Disney+ Series, March 2021",
    "mediaType": "tv",
    "phase": "6. MCU Phase 4 & New Avengers Era (2020\u20132022)",
    "hero": "Falcon & Bucky",
    "runtime": "Series"
  },
  {
    "id": "loki_season_1_2021",
    "title": "Loki Season 1",
    "year": 2021,
    "tag": "Disney+ Series, June 2021",
    "mediaType": "tv",
    "phase": "6. MCU Phase 4 & New Avengers Era (2020\u20132022)",
    "hero": "Loki",
    "runtime": "Series"
  },
  {
    "id": "black_widow_2021",
    "title": "Black Widow",
    "year": 2021,
    "tag": "Film, July 2021",
    "mediaType": "movie",
    "phase": "6. MCU Phase 4 & New Avengers Era (2020\u20132022)",
    "hero": "Black Widow",
    "runtime": "120m"
  },
  {
    "id": "what_if_season_1_2021",
    "title": "What If...? Season 1",
    "year": 2021,
    "tag": "Animated Series, Aug 2021",
    "mediaType": "tv",
    "phase": "6. MCU Phase 4 & New Avengers Era (2020\u20132022)",
    "hero": "Multiverse",
    "runtime": "Series"
  },
  {
    "id": "shang_chi_and_the_legend_of_the_ten_rings_2021",
    "title": "Shang-Chi and the Legend of the Ten Rings",
    "year": 2021,
    "tag": "Film, Sept 2021",
    "mediaType": "movie",
    "phase": "6. MCU Phase 4 & New Avengers Era (2020\u20132022)",
    "hero": "Shang-Chi",
    "runtime": "132m"
  },
  {
    "id": "eternals_2021",
    "title": "Eternals",
    "year": 2021,
    "tag": "Film, Nov 2021",
    "mediaType": "movie",
    "phase": "6. MCU Phase 4 & New Avengers Era (2020\u20132022)",
    "hero": "Eternals",
    "runtime": "120m"
  },
  {
    "id": "hawkeye_2021",
    "title": "Hawkeye",
    "year": 2021,
    "tag": "Disney+ Series, Nov 2021",
    "mediaType": "tv",
    "phase": "6. MCU Phase 4 & New Avengers Era (2020\u20132022)",
    "hero": "Hawkeye",
    "runtime": "Series"
  },
  {
    "id": "spider_man_no_way_home_2021",
    "title": "Spider-Man: No Way Home",
    "year": 2021,
    "tag": "Film, Dec 2021",
    "mediaType": "movie",
    "phase": "6. MCU Phase 4 & New Avengers Era (2020\u20132022)",
    "hero": "Spider-Man",
    "runtime": "148m"
  },
  {
    "id": "venom_let_there_be_carnage_2021",
    "title": "Venom: Let There Be Carnage",
    "year": 2021,
    "tag": "Film, Oct 2021",
    "mediaType": "movie",
    "phase": "6. MCU Phase 4 & New Avengers Era (2020\u20132022)",
    "hero": "Marvel Universe",
    "runtime": "120m"
  },
  {
    "id": "m_o_d_o_k_season_1_2021",
    "title": "M.O.D.O.K. Season 1",
    "year": 2021,
    "tag": "Animated Series, May 2021",
    "mediaType": "tv",
    "phase": "6. MCU Phase 4 & New Avengers Era (2020\u20132022)",
    "hero": "Marvel Universe",
    "runtime": "Series"
  },
  {
    "id": "hit_monkey_season_1_2021",
    "title": "Hit-Monkey Season 1",
    "year": 2021,
    "tag": "Animated Series, Nov 2021",
    "mediaType": "tv",
    "phase": "6. MCU Phase 4 & New Avengers Era (2020\u20132022)",
    "hero": "Marvel Universe",
    "runtime": "Series"
  },
  {
    "id": "spidey_and_his_amazing_friends_season_1_2021",
    "title": "Spidey and His Amazing Friends Season 1",
    "year": 2021,
    "tag": "Animated Series, Aug 2021",
    "mediaType": "tv",
    "phase": "6. MCU Phase 4 & New Avengers Era (2020\u20132022)",
    "hero": "Spider-Man",
    "runtime": "Series"
  },
  {
    "id": "moon_knight_2022",
    "title": "Moon Knight",
    "year": 2022,
    "tag": "Disney+ Series, March 2022",
    "mediaType": "tv",
    "phase": "6. MCU Phase 4 & New Avengers Era (2020\u20132022)",
    "hero": "Moon Knight",
    "runtime": "Series"
  },
  {
    "id": "doctor_strange_in_the_multiverse_of_madness_2022",
    "title": "Doctor Strange in the Multiverse of Madness",
    "year": 2022,
    "tag": "Film, May 2022",
    "mediaType": "movie",
    "phase": "6. MCU Phase 4 & New Avengers Era (2020\u20132022)",
    "hero": "Doctor Strange",
    "runtime": "126m"
  },
  {
    "id": "ms_marvel_2022",
    "title": "Ms. Marvel",
    "year": 2022,
    "tag": "Disney+ Series, June 2022",
    "mediaType": "tv",
    "phase": "6. MCU Phase 4 & New Avengers Era (2020\u20132022)",
    "hero": "Ms. Marvel",
    "runtime": "Series"
  },
  {
    "id": "thor_love_and_thunder_2022",
    "title": "Thor: Love and Thunder",
    "year": 2022,
    "tag": "Film, July 2022",
    "mediaType": "movie",
    "phase": "6. MCU Phase 4 & New Avengers Era (2020\u20132022)",
    "hero": "Thor",
    "runtime": "120m"
  },
  {
    "id": "i_am_groot_season_1_2022",
    "title": "I Am Groot Season 1",
    "year": 2022,
    "tag": "Animated Shorts, Aug 2022",
    "mediaType": "tv",
    "phase": "6. MCU Phase 4 & New Avengers Era (2020\u20132022)",
    "hero": "Groot",
    "runtime": "Series"
  },
  {
    "id": "she_hulk_attorney_at_law_2022",
    "title": "She-Hulk: Attorney at Law",
    "year": 2022,
    "tag": "Disney+ Series, Aug 2022",
    "mediaType": "tv",
    "phase": "6. MCU Phase 4 & New Avengers Era (2020\u20132022)",
    "hero": "Hulk",
    "runtime": "Series"
  },
  {
    "id": "werewolf_by_night_2022",
    "title": "Werewolf by Night",
    "year": 2022,
    "tag": "Special Presentation, Oct 2022",
    "mediaType": "movie",
    "phase": "6. MCU Phase 4 & New Avengers Era (2020\u20132022)",
    "hero": "Marvel Universe",
    "runtime": "120m"
  },
  {
    "id": "black_panther_wakanda_forever_2022",
    "title": "Black Panther: Wakanda Forever",
    "year": 2022,
    "tag": "Film, Nov 2022",
    "mediaType": "movie",
    "phase": "6. MCU Phase 4 & New Avengers Era (2020\u20132022)",
    "hero": "Black Panther",
    "runtime": "161m"
  },
  {
    "id": "the_guardians_of_the_galaxy_holiday_special_2022",
    "title": "The Guardians of the Galaxy Holiday Special",
    "year": 2022,
    "tag": "Special, Nov 2022",
    "mediaType": "movie",
    "phase": "6. MCU Phase 4 & New Avengers Era (2020\u20132022)",
    "hero": "Guardians",
    "runtime": "120m"
  },
  {
    "id": "morbius_2022",
    "title": "Morbius",
    "year": 2022,
    "tag": "Film, April 2022",
    "mediaType": "movie",
    "phase": "6. MCU Phase 4 & New Avengers Era (2020\u20132022)",
    "hero": "Marvel Universe",
    "runtime": "120m"
  },
  {
    "id": "spidey_and_his_amazing_friends_season_2_2022",
    "title": "Spidey and His Amazing Friends Season 2",
    "year": 2022,
    "tag": "Animated Series, Aug 2022",
    "mediaType": "tv",
    "phase": "6. MCU Phase 4 & New Avengers Era (2020\u20132022)",
    "hero": "Spider-Man",
    "runtime": "Series"
  },
  {
    "id": "ant_man_and_the_wasp_quantumania_2023",
    "title": "Ant-Man and the Wasp: Quantumania",
    "year": 2023,
    "tag": "Film, Feb 2023",
    "mediaType": "movie",
    "phase": "7. MCU Phase 5 & Recent Releases (2023\u20132025)",
    "hero": "Ant-Man",
    "runtime": "120m"
  },
  {
    "id": "guardians_of_the_galaxy_vol_3_2023",
    "title": "Guardians of the Galaxy Vol. 3",
    "year": 2023,
    "tag": "Film, May 2023",
    "mediaType": "movie",
    "phase": "7. MCU Phase 5 & Recent Releases (2023\u20132025)",
    "hero": "Guardians",
    "runtime": "120m"
  },
  {
    "id": "secret_invasion_2023",
    "title": "Secret Invasion",
    "year": 2023,
    "tag": "Disney+ Series, June 2023",
    "mediaType": "tv",
    "phase": "7. MCU Phase 5 & Recent Releases (2023\u20132025)",
    "hero": "Nick Fury",
    "runtime": "Series"
  },
  {
    "id": "i_am_groot_season_2_2023",
    "title": "I Am Groot Season 2",
    "year": 2023,
    "tag": "Animated Shorts, Sept 2023",
    "mediaType": "tv",
    "phase": "7. MCU Phase 5 & Recent Releases (2023\u20132025)",
    "hero": "Groot",
    "runtime": "Series"
  },
  {
    "id": "loki_season_2_2023",
    "title": "Loki Season 2",
    "year": 2023,
    "tag": "Disney+ Series, Oct 2023",
    "mediaType": "tv",
    "phase": "7. MCU Phase 5 & Recent Releases (2023\u20132025)",
    "hero": "Loki",
    "runtime": "Series"
  },
  {
    "id": "the_marvels_2023",
    "title": "The Marvels",
    "year": 2023,
    "tag": "Film, Nov 2023",
    "mediaType": "movie",
    "phase": "7. MCU Phase 5 & Recent Releases (2023\u20132025)",
    "hero": "Captain Marvel",
    "runtime": "120m"
  },
  {
    "id": "what_if_season_2_2023",
    "title": "What If...? Season 2",
    "year": 2023,
    "tag": "Animated Series, Dec 2023",
    "mediaType": "tv",
    "phase": "7. MCU Phase 5 & Recent Releases (2023\u20132025)",
    "hero": "Multiverse",
    "runtime": "Series"
  },
  {
    "id": "spider_man_across_the_spider_verse_2023",
    "title": "Spider-Man: Across the Spider-Verse",
    "year": 2023,
    "tag": "Animated Film, June 2023",
    "mediaType": "movie",
    "phase": "7. MCU Phase 5 & Recent Releases (2023\u20132025)",
    "hero": "Spider-Man",
    "runtime": "120m"
  },
  {
    "id": "echo_2024",
    "title": "Echo",
    "year": 2024,
    "tag": "Disney+ Series, Jan 2024",
    "mediaType": "tv",
    "phase": "7. MCU Phase 5 & Recent Releases (2023\u20132025)",
    "hero": "Echo",
    "runtime": "Series"
  },
  {
    "id": "deadpool_wolverine_2024",
    "title": "Deadpool & Wolverine",
    "year": 2024,
    "tag": "Film, July 2024",
    "mediaType": "movie",
    "phase": "7. MCU Phase 5 & Recent Releases (2023\u20132025)",
    "hero": "Deadpool & Wolverine",
    "runtime": "128m"
  },
  {
    "id": "agatha_all_along_2024",
    "title": "Agatha All Along",
    "year": 2024,
    "tag": "Disney+ Series, Sept 2024",
    "mediaType": "tv",
    "phase": "7. MCU Phase 5 & Recent Releases (2023\u20132025)",
    "hero": "Agatha Harkness",
    "runtime": "Series"
  },
  {
    "id": "what_if_season_3_2024",
    "title": "What If...? Season 3",
    "year": 2024,
    "tag": "Animated Series, Dec 2024",
    "mediaType": "tv",
    "phase": "7. MCU Phase 5 & Recent Releases (2023\u20132025)",
    "hero": "Multiverse",
    "runtime": "Series"
  },
  {
    "id": "your_friendly_neighborhood_spider_man_season_1_2024",
    "title": "Your Friendly Neighborhood Spider-Man Season 1",
    "year": 2024,
    "tag": "Animated Series, Nov 2024",
    "mediaType": "tv",
    "phase": "7. MCU Phase 5 & Recent Releases (2023\u20132025)",
    "hero": "Spider-Man",
    "runtime": "Series"
  },
  {
    "id": "madame_web_2024",
    "title": "Madame Web",
    "year": 2024,
    "tag": "Film, Feb 2024",
    "mediaType": "movie",
    "phase": "7. MCU Phase 5 & Recent Releases (2023\u20132025)",
    "hero": "Marvel Universe",
    "runtime": "120m"
  },
  {
    "id": "venom_the_last_dance_2024",
    "title": "Venom: The Last Dance",
    "year": 2024,
    "tag": "Film, Oct 2024",
    "mediaType": "movie",
    "phase": "7. MCU Phase 5 & Recent Releases (2023\u20132025)",
    "hero": "Marvel Universe",
    "runtime": "120m"
  },
  {
    "id": "kraven_the_hunter_2024",
    "title": "Kraven the Hunter",
    "year": 2024,
    "tag": "Film, Dec 2024",
    "mediaType": "movie",
    "phase": "7. MCU Phase 5 & Recent Releases (2023\u20132025)",
    "hero": "Marvel Universe",
    "runtime": "120m"
  },
  {
    "id": "spidey_and_his_amazing_friends_season_3_2024",
    "title": "Spidey and His Amazing Friends Season 3",
    "year": 2024,
    "tag": "Animated Series, Jan 2024",
    "mediaType": "tv",
    "phase": "7. MCU Phase 5 & Recent Releases (2023\u20132025)",
    "hero": "Spider-Man",
    "runtime": "Series"
  },
  {
    "id": "hit_monkey_season_2_2024",
    "title": "Hit-Monkey Season 2",
    "year": 2024,
    "tag": "Animated Series, July 2024",
    "mediaType": "tv",
    "phase": "7. MCU Phase 5 & Recent Releases (2023\u20132025)",
    "hero": "Marvel Universe",
    "runtime": "Series"
  },
  {
    "id": "x_men_97_season_1_2024",
    "title": "X-Men '97 Season 1",
    "year": 2024,
    "tag": "Disney+ Series, March 2024",
    "mediaType": "tv",
    "phase": "7. MCU Phase 5 & Recent Releases (2023\u20132025)",
    "hero": "X-Men",
    "runtime": "Series"
  },
  {
    "id": "captain_america_brave_new_world_2025",
    "title": "Captain America: Brave New World",
    "year": 2025,
    "tag": "Film, Feb 2025",
    "mediaType": "movie",
    "phase": "7. MCU Phase 5 & Recent Releases (2023\u20132025)",
    "hero": "Captain America",
    "runtime": "120m"
  },
  {
    "id": "daredevil_born_again_season_1_2025",
    "title": "Daredevil: Born Again Season 1",
    "year": 2025,
    "tag": "Disney+ Series, March 2025",
    "mediaType": "tv",
    "phase": "7. MCU Phase 5 & Recent Releases (2023\u20132025)",
    "hero": "Daredevil",
    "runtime": "Series"
  },
  {
    "id": "thunderbolts_2025",
    "title": "Thunderbolts*",
    "year": 2025,
    "tag": "Film, May 2025",
    "mediaType": "movie",
    "phase": "7. MCU Phase 5 & Recent Releases (2023\u20132025)",
    "hero": "Thunderbolts",
    "runtime": "120m"
  },
  {
    "id": "ironheart_2025",
    "title": "Ironheart",
    "year": 2025,
    "tag": "Disney+ Series, June 2025",
    "mediaType": "tv",
    "phase": "7. MCU Phase 5 & Recent Releases (2023\u20132025)",
    "hero": "Marvel Universe",
    "runtime": "Series"
  },
  {
    "id": "the_fantastic_four_first_steps_2025",
    "title": "The Fantastic Four: First Steps",
    "year": 2025,
    "tag": "Film, July 2025",
    "mediaType": "movie",
    "phase": "7. MCU Phase 5 & Recent Releases (2023\u20132025)",
    "hero": "Fantastic Four",
    "runtime": "120m"
  },
  {
    "id": "eyes_of_wakanda_2025",
    "title": "Eyes of Wakanda",
    "year": 2025,
    "tag": "Animated Series, Aug 2025",
    "mediaType": "tv",
    "phase": "7. MCU Phase 5 & Recent Releases (2023\u20132025)",
    "hero": "Marvel Universe",
    "runtime": "Series"
  },
  {
    "id": "marvel_zombies_2025",
    "title": "Marvel Zombies",
    "year": 2025,
    "tag": "Animated Series, Oct 2025",
    "mediaType": "tv",
    "phase": "7. MCU Phase 5 & Recent Releases (2023\u20132025)",
    "hero": "Marvel Universe",
    "runtime": "Series"
  },
  {
    "id": "wonder_man_2026",
    "title": "Wonder Man",
    "year": 2026,
    "tag": "Disney+ Series, Jan 2026",
    "mediaType": "tv",
    "phase": "8. MCU Phase 6 & Upcoming Horizons (2026\u20132028 and Beyond)",
    "hero": "Marvel Universe",
    "runtime": "Series"
  },
  {
    "id": "daredevil_born_again_season_2_2026",
    "title": "Daredevil: Born Again Season 2",
    "year": 2026,
    "tag": "Disney+ Series, March 2026",
    "mediaType": "tv",
    "phase": "8. MCU Phase 6 & Upcoming Horizons (2026\u20132028 and Beyond)",
    "hero": "Daredevil",
    "runtime": "Series"
  },
  {
    "id": "the_punisher_one_last_kill_2026",
    "title": "The Punisher: One Last Kill",
    "year": 2026,
    "tag": "Special Presentation, May 2026",
    "mediaType": "movie",
    "phase": "8. MCU Phase 6 & Upcoming Horizons (2026\u20132028 and Beyond)",
    "hero": "The Punisher",
    "runtime": "120m"
  },
  {
    "id": "spider_man_brand_new_day_2026",
    "title": "Spider-Man: Brand New Day",
    "year": 2026,
    "tag": "Film, July 2026",
    "mediaType": "movie",
    "phase": "8. MCU Phase 6 & Upcoming Horizons (2026\u20132028 and Beyond)",
    "hero": "Spider-Man",
    "runtime": "120m"
  },
  {
    "id": "visionquest_2026",
    "title": "VisionQuest",
    "year": 2026,
    "tag": "Disney+ Series, Oct 2026",
    "mediaType": "tv",
    "phase": "8. MCU Phase 6 & Upcoming Horizons (2026\u20132028 and Beyond)",
    "hero": "Vision",
    "runtime": "8 Episodes"
  },
  {
    "id": "avengers_doomsday_2026",
    "title": "Avengers: Doomsday",
    "year": 2026,
    "tag": "Film, Dec 2026",
    "mediaType": "movie",
    "phase": "8. MCU Phase 6 & Upcoming Horizons (2026\u20132028 and Beyond)",
    "hero": "The Avengers",
    "runtime": "120m"
  },
  {
    "id": "your_friendly_neighborhood_spider_man_season_2_2027",
    "title": "Your Friendly Neighborhood Spider-Man Season 2",
    "year": 2027,
    "tag": "Animated Series, Jan 2027",
    "mediaType": "tv",
    "phase": "8. MCU Phase 6 & Upcoming Horizons (2026\u20132028 and Beyond)",
    "hero": "Spider-Man",
    "runtime": "Series"
  },
  {
    "id": "daredevil_born_again_season_3_2027",
    "title": "Daredevil: Born Again Season 3",
    "year": 2027,
    "tag": "Disney+ Series, March 2027",
    "mediaType": "tv",
    "phase": "8. MCU Phase 6 & Upcoming Horizons (2026\u20132028 and Beyond)",
    "hero": "Daredevil",
    "runtime": "Series"
  },
  {
    "id": "spider_man_beyond_the_spider_verse_2027",
    "title": "Spider-Man: Beyond the Spider-Verse",
    "year": 2027,
    "tag": "Animated Film, June 2027",
    "mediaType": "movie",
    "phase": "8. MCU Phase 6 & Upcoming Horizons (2026\u20132028 and Beyond)",
    "hero": "Spider-Man",
    "runtime": "120m"
  },
  {
    "id": "x_men_97_season_3_2027",
    "title": "X-Men '97 Season 3",
    "year": 2027,
    "tag": "Animated Series, Fall 2027",
    "mediaType": "tv",
    "phase": "8. MCU Phase 6 & Upcoming Horizons (2026\u20132028 and Beyond)",
    "hero": "X-Men",
    "runtime": "Series"
  },
  {
    "id": "marvel_zombies_specials_2027",
    "title": "Marvel Zombies Specials",
    "year": 2027,
    "tag": "Animated Specials, Halloween 2027\u20132029",
    "mediaType": "movie",
    "phase": "8. MCU Phase 6 & Upcoming Horizons (2026\u20132028 and Beyond)",
    "hero": "Marvel Universe",
    "runtime": "120m"
  },
  {
    "id": "avengers_secret_wars_2027",
    "title": "Avengers: Secret Wars",
    "year": 2027,
    "tag": "Film, Dec 2027",
    "mediaType": "movie",
    "phase": "8. MCU Phase 6 & Upcoming Horizons (2026\u20132028 and Beyond)",
    "hero": "The Avengers",
    "runtime": "120m"
  },
  {
    "id": "untitled_x_men_movie_2028",
    "title": "Untitled X-Men Movie",
    "year": 2028,
    "tag": "Film, May 2028",
    "mediaType": "movie",
    "phase": "8. MCU Phase 6 & Upcoming Horizons (2026\u20132028 and Beyond)",
    "hero": "X-Men",
    "runtime": "104m"
  },
  {
    "id": "ghost_rider_2028",
    "title": "Ghost Rider",
    "year": 2028,
    "tag": "Film, July 2028",
    "mediaType": "movie",
    "phase": "8. MCU Phase 6 & Upcoming Horizons (2026\u20132028 and Beyond)",
    "hero": "Ghost Rider",
    "runtime": "120m"
  },
  {
    "id": "black_panther_3_2028",
    "title": "Black Panther 3",
    "year": 2028,
    "tag": "Film, Dec 2028",
    "mediaType": "movie",
    "phase": "8. MCU Phase 6 & Upcoming Horizons (2026\u20132028 and Beyond)",
    "hero": "Black Panther",
    "runtime": "120m"
  },
  {
    "id": "zodiac_2028",
    "title": "Zodiac",
    "year": 2028,
    "tag": "Disney+ Series, 2028",
    "mediaType": "tv",
    "phase": "8. MCU Phase 6 & Upcoming Horizons (2026\u20132028 and Beyond)",
    "hero": "Marvel Universe",
    "runtime": "Series"
  },
  {
    "id": "armor_wars_2024",
    "title": "Armor Wars",
    "year": 2024,
    "tag": "Film, TBA",
    "mediaType": "movie",
    "phase": "8. MCU Phase 6 & Upcoming Horizons (2026\u20132028 and Beyond)",
    "hero": "Marvel Universe",
    "runtime": "120m"
  },
  {
    "id": "blade_2024",
    "title": "Blade",
    "year": 2024,
    "tag": "Film, TBA",
    "mediaType": "movie",
    "phase": "8. MCU Phase 6 & Upcoming Horizons (2026\u20132028 and Beyond)",
    "hero": "Blade",
    "runtime": "120m"
  },
  {
    "id": "nova_2024",
    "title": "Nova",
    "year": 2024,
    "tag": "Film, TBA",
    "mediaType": "movie",
    "phase": "8. MCU Phase 6 & Upcoming Horizons (2026\u20132028 and Beyond)",
    "hero": "Marvel Universe",
    "runtime": "120m"
  },
  {
    "id": "shang_chi_2_2024",
    "title": "Shang-Chi 2",
    "year": 2024,
    "tag": "Film, TBA",
    "mediaType": "movie",
    "phase": "8. MCU Phase 6 & Upcoming Horizons (2026\u20132028 and Beyond)",
    "hero": "Shang-Chi",
    "runtime": "132m"
  },
  {
    "id": "star_lord_project_2024",
    "title": "Star-Lord Project",
    "year": 2024,
    "tag": "Disney+ Series, TBA",
    "mediaType": "tv",
    "phase": "8. MCU Phase 6 & Upcoming Horizons (2026\u20132028 and Beyond)",
    "hero": "Marvel Universe",
    "runtime": "Series"
  },
  {
    "id": "untitled_wakanda_okoye_series_2024",
    "title": "Untitled Wakanda / Okoye Series",
    "year": 2024,
    "tag": "Disney+ Series, TBA",
    "mediaType": "tv",
    "phase": "8. MCU Phase 6 & Upcoming Horizons (2026\u20132028 and Beyond)",
    "hero": "Marvel Universe",
    "runtime": "Series"
  }
];

export const CAMEO_EXTRA_ITEMS: MarvelItem[] = [
  {
    "title": "Spider-Man",
    "year": 2002,
    "tag": "Film, May 2002",
    "mediaType": "movie",
    "phase": "Multiverse Cameos",
    "hero": "Spider-Man",
    "runtime": "121m",
    "id": "spider_man_2002"
  },
  {
    "title": "Spider-Man 2",
    "year": 2004,
    "tag": "Film, June 2004",
    "mediaType": "movie",
    "phase": "Multiverse Cameos",
    "hero": "Spider-Man",
    "runtime": "127m",
    "id": "spider_man_2_2004"
  },
  {
    "title": "Spider-Man 3",
    "year": 2007,
    "tag": "Film, May 2007",
    "mediaType": "movie",
    "phase": "Multiverse Cameos",
    "hero": "Spider-Man",
    "runtime": "139m",
    "id": "spider_man_3_2007"
  },
  {
    "title": "The Amazing Spider-Man",
    "year": 2012,
    "tag": "Film, July 2012",
    "mediaType": "movie",
    "phase": "Multiverse Cameos",
    "hero": "Spider-Man",
    "runtime": "136m",
    "id": "the_amazing_spider_man_2012"
  },
  {
    "title": "The Amazing Spider-Man 2",
    "year": 2014,
    "tag": "Film, May 2014",
    "mediaType": "movie",
    "phase": "Multiverse Cameos",
    "hero": "Spider-Man",
    "runtime": "142m",
    "id": "the_amazing_spider_man_2_2014"
  },
  {
    "title": "X-Men",
    "year": 2000,
    "tag": "Film, July 2000",
    "mediaType": "movie",
    "phase": "Multiverse Cameos",
    "hero": "X-Men",
    "runtime": "104m",
    "id": "x_men_2000"
  },
  {
    "title": "X2: X-Men United",
    "year": 2003,
    "tag": "Film, May 2003",
    "mediaType": "movie",
    "phase": "Multiverse Cameos",
    "hero": "X-Men",
    "runtime": "134m",
    "id": "x2_x_men_united_2003"
  },
  {
    "title": "X-Men: Days of Future Past",
    "year": 2014,
    "tag": "Film, May 2014",
    "mediaType": "movie",
    "phase": "Multiverse Cameos",
    "hero": "X-Men",
    "runtime": "132m",
    "id": "x_men_days_of_future_past_2014"
  },
  {
    "title": "Logan",
    "year": 2017,
    "tag": "Film, March 2017",
    "mediaType": "movie",
    "phase": "Multiverse Cameos",
    "hero": "Wolverine",
    "runtime": "137m",
    "id": "logan_2017"
  },
  {
    "title": "Deadpool",
    "year": 2016,
    "tag": "Film, Feb 2016",
    "mediaType": "movie",
    "phase": "Multiverse Cameos",
    "hero": "Deadpool",
    "runtime": "108m",
    "id": "deadpool_2016"
  },
  {
    "title": "Deadpool 2",
    "year": 2018,
    "tag": "Film, May 2018",
    "mediaType": "movie",
    "phase": "Multiverse Cameos",
    "hero": "Deadpool",
    "runtime": "119m",
    "id": "deadpool_2_2018"
  }
];

export const getMarvelOrderItems = (config: MarvelOrderConfig): MarvelItem[] => {
  if (config.property === 'doomsday') {
    return [...DOOMSDAY_ITEMS];
  }
  if (config.property === 'all') {
    return [...ALL_MARVEL_RELEASE_ITEMS];
  }
  let baseList = config.order === 'story' ? [...MCU_STORY_ITEMS] : [...MCU_RELEASE_ITEMS];
  if (config.addCameos) {
    baseList = [...baseList, ...CAMEO_EXTRA_ITEMS];
  }
  return baseList;
};
