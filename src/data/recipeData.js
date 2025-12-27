export const MOCK_RECIPE_ITEMS = [
  // --- RECETTE 1 : Ton exemple (Malsain) ---
  {
    id: 1,
    label: "Petit Déjeuner rapide",
    description: "Nutella sur pain avec un Twix\n\ntset\n\n\ntest",
    caloricintake: 850,
    nbeaters: null,
    timetomake: 5,
    ingredientamount_ingredientamount_recipeTorecipe: [
      {
        recipe: 1,
        food: 1,
        quantity: 50,
        food_ingredientamount_foodTofood: {
          id: 1,
          label: "Nutella",
          diet: null,
          nutriscore: "E",
          measuringunit: "gram",
          barcode: "3017620422003",
          imagepath: "/images/default.jpg"
        }
      },
      {
        recipe: 1,
        food: 2,
        quantity: 1,
        food_ingredientamount_foodTofood: {
          id: 2,
          label: "Twix",
          diet: null,
          nutriscore: "E",
          measuringunit: "unit",
          barcode: "5000159484695",
          imagepath: "/images/default.jpg"
        }
      }
    ]
  },

  // --- RECETTE 2 : Plat Familial (Classique) ---
  {
    id: 2,
    label: "Spaghetti Bolognese",
    description: "La recette classique pour toute la famille.\n\nFaire revenir la viande, ajouter la sauce et laisser mijoter.",
    caloricintake: 650,
    nbeaters: 4,
    timetomake: 30,
    ingredientamount_ingredientamount_recipeTorecipe: [
      {
        recipe: 2,
        food: 3,
        quantity: 500,
        food_ingredientamount_foodTofood: {
          id: 3,
          label: "Spaghetti Panzani",
          diet: "vegetarian",
          nutriscore: "A",
          measuringunit: "gram",
          barcode: "3038350042801",
          imagepath: "/images/pasta.jpg"
        }
      },
      {
        recipe: 2,
        food: 4,
        quantity: 400,
        food_ingredientamount_foodTofood: {
          id: 4,
          label: "Viande Hachée",
          diet: null,
          nutriscore: "C",
          measuringunit: "gram",
          barcode: "2093847102938",
          imagepath: "/images/meat.jpg"
        }
      },
      {
        recipe: 2,
        food: 5,
        quantity: 50,
        food_ingredientamount_foodTofood: {
          id: 5,
          label: "Sauce Tomate",
          diet: "vegan",
          nutriscore: "B",
          measuringunit: "centiliter",
          barcode: "3029182736450",
          imagepath: "/images/sauce.jpg"
        }
      }
    ]
  },

  // --- RECETTE 3 : Healthy / Vegan ---
  {
    id: 3,
    label: "Salade de Quinoa",
    description: "Une salade fraîcheur pour l'été.\nRiche en protéines végétales.",
    caloricintake: 320,
    nbeaters: 2,
    timetomake: null,
    ingredientamount_ingredientamount_recipeTorecipe: [
      {
        recipe: 3,
        food: 6,
        quantity: 200,
        food_ingredientamount_foodTofood: {
          id: 6,
          label: "Quinoa Bio",
          diet: "vegan",
          nutriscore: "A",
          measuringunit: "gram",
          barcode: "3298471029384",
          imagepath: "/images/quinoa.jpg"
        }
      },
      {
        recipe: 3,
        food: 7,
        quantity: 1,
        food_ingredientamount_foodTofood: {
          id: 7,
          label: "Concombre",
          diet: "vegan",
          nutriscore: "A",
          measuringunit: "unit",
          barcode: "000000000001",
          imagepath: "/images/cucumber.jpg"
        }
      }
    ]
  },

  // --- RECETTE 4 : Dessert rapide ---
  {
    id: 4,
    label: "Smoothie Banane Lait",
    description: "Idéal après le sport ou pour le goûter.\nMixer le tout pendant 30 secondes.",
    caloricintake: 180,
    nbeaters: 1,
    timetomake: 3,
    ingredientamount_ingredientamount_recipeTorecipe: [
      {
        recipe: 4,
        food: 8,
        quantity: 2,
        food_ingredientamount_foodTofood: {
          id: 8,
          label: "Banane Cavendish",
          diet: "vegan",
          nutriscore: "B",
          measuringunit: "unit",
          barcode: "948372615243",
          imagepath: "/images/banana.jpg"
        }
      },
      {
        recipe: 4,
        food: 9,
        quantity: 25,
        food_ingredientamount_foodTofood: {
          id: 9,
          label: "Lait Demi-Écrémé",
          diet: "vegetarian",
          nutriscore: "B",
          measuringunit: "centiliter",
          barcode: "3152647584930",
          imagepath: "/images/milk.jpg"
        }
      }
    ]
  },

  // --- RECETTE 5 : Recette Complexe (Test scroll description) ---
  {
    id: 5,
    label: "Poulet Curry Coco",
    description: "1. Couper le poulet en dés.\n2. Faire revenir les oignons.\n3. Ajouter le curry et le lait de coco.\n4. Laisser mijoter 20 minutes.\n5. Servir avec du riz basmati.\n\nAttention : ne pas faire bouillir trop fort le lait de coco sinon il tranche.",
    caloricintake: 550,
    nbeaters: null,
    timetomake: null,
    ingredientamount_ingredientamount_recipeTorecipe: [
      {
        recipe: 5,
        food: 10,
        quantity: 300,
        food_ingredientamount_foodTofood: {
          id: 10,
          label: "Filet de Poulet",
          diet: null,
          nutriscore: "B",
          measuringunit: "gram",
          barcode: "2837465019283",
          imagepath: "/images/chicken.jpg"
        }
      },
      {
        recipe: 5,
        food: 11,
        quantity: 40,
        food_ingredientamount_foodTofood: {
          id: 11,
          label: "Lait de Coco",
          diet: "vegan",
          nutriscore: "D",
          measuringunit: "centiliter",
          barcode: "4839201928374",
          imagepath: "/images/coconut.jpg"
        }
      },
      {
        recipe: 5,
        food: 12,
        quantity: 150,
        food_ingredientamount_foodTofood: {
          id: 12,
          label: "Riz Basmati",
          diet: "vegan",
          nutriscore: "A",
          measuringunit: "gram",
          barcode: "3847562910293",
          imagepath: "/images/rice.jpg"
        }
      }
    ]
  },

  // --- RECETTE 6 : Recette ---
  {
    id: 6,
    label: "Eau chaude au citron",
    description: "Juste de l'eau et du citron pour détoxifier.",
    caloricintake: 5,
    nbeaters: 1,
    timetomake: 2,
    ingredientamount_ingredientamount_recipeTorecipe: [
        {
        recipe: 6,
        food: 10,
        quantity: 300,
        food_ingredientamount_foodTofood: {
          id: 10,
          label: "Filet de Poulet",
          diet: null,
          nutriscore: "B",
          measuringunit: "gram",
          barcode: "2837465019283",
          imagepath: "/images/chicken.jpg"
        }
      }
    ]
  }
];