// src/data/foodData.js
import { getTodayDateString, addDays } from '../utils/dateHelpers';

const TODAY = getTodayDateString();

export const MOCK_FOOD_ITEMS = [
  {
    id: '1',
    label: 'Pâtes Carbonara',
    diet: 'non-vegan',
    nutriScore: 'C',
    quantity: 1,
    storageType: 'Frigo',
    // Périmé hier (Test pour le rouge)
    expirationDate: addDays(TODAY, -1), 
  },
  {
    id: '2',
    label: 'Lait demi-écrémé',
    diet: 'vegetarien',
    nutriScore: 'B',
    quantity: 1,
    storageType: 'Frigo',
    // Expire aujourd'hui (Test pour le jaune/orange)
    expirationDate: TODAY, 
  },
  {
    id: '3',
    label: 'Ciao Kamboutcha',
    diet: 'vegan',
    nutriScore: 'B',
    quantity: 1,
    storageType: 'Frigo',
    // Expire demain (Test pour le jaune/orange)
    expirationDate: addDays(TODAY, 1), 
  },
  {
    id: '4',
    label: 'Saumon Fumé',
    diet: 'pescetarien',
    nutriScore: 'D',
    quantity: 200,
    storageType: 'Frigo',
    // Expire dans 10 jours (Test pour le vert)
    expirationDate: addDays(TODAY, 10), 
  },
  {
    id: '5',
    label: 'Yaourt Nature',
    diet: 'vegetarien',
    nutriScore: 'A',
    quantity: 4,
    storageType: 'Frigo',
    // Expire dans 10 jours aussi (2 items le même jour)
    expirationDate: addDays(TODAY, 10), 
  },
  {
    id: '6',
    label: 'Pommes de Terre',
    diet: 'vegan',
    nutriScore: 'A',
    quantity: 2,
    storageType: 'Garde-manger',
    // Expire dans 30 jours
    expirationDate: addDays(TODAY, 30),
  },
  {
    id: '7',
    label: 'Poulet Rôti',
    diet: 'non-vegan',
    nutriScore: 'C',
    quantity: 1,
    storageType: 'Frigo',
    // Expire dans 3 jours
    expirationDate: addDays(TODAY, 3),
  },
  {
    id: '8',
    label: 'Kombucha Fruit du Dragon - ciao - 330ml',
    diet: 'Carnivore',
    nutriScore: 'E',
    quantity: 1,
    storageType: 'Frigo',
    // Expire dans 5 jours
    expirationDate: addDays(TODAY, -10000),
  }
];
