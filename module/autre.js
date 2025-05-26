/**
 * Génère un nom d'arme unique et inventif à partir d'une arme et de caractéristiques,
 * en utilisant les données de la feuille de calcul "La Caisse a Selenis".
 * Gère différents types de nomenclature pour plus de variété,
 * en utilisant toujours un maximum de traits disponibles.
 *
 * @param {string} arme - Le nom de l'arme (ex: "épée", "arc", "hache", "dague", "lance", "kanabo").
 * @param {string} rareteArme - La rareté de l'arme ("Commune", "Rare", "Epic", "Legendaire").
 * @return {string} Le nom d'arme généré.
 * @customfunction
 */
function GENERER_NOM(arme, rareteArme) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var feuilleArriereBoutique = ss.getSheetByName("La Caisse a Selenis");

  // Vérifie si la feuille "La Caisse a Selenis" existe
  if (!feuilleArriereBoutique) {
    Logger.log("Erreur : La feuille 'La Caisse a Selenis' est introuvable.");
    return "Erreur : Feuille 'La Caisse a Selenis' introuvable !";
  }

  // Détermine le genre de l'arme pour les accords.
  let genreArme = "masculin";
  if (arme.startsWith("h") || arme.startsWith("H")) {
    genreArme = "masculin";
  } else if (arme.startsWith("a") || arme.startsWith("A") || arme.startsWith("e") || arme.startsWith("E") ||
    arme.startsWith("i") || arme.startsWith("I") || arme.startsWith("o") || arme.startsWith("O") ||
    arme.startsWith("u") || arme.startsWith("U")) {
    genreArme = "féminin";
  } else {
    if (arme.endsWith("e")) {
      genreArme = "féminin";
    } else {
      genreArme = "masculin";
    }
  }

  // Fonction pour accorder un adjectif au genre de l'arme.
  function accordeAdjectif(adjectif, genre) {
    if (genre === "féminin") {
      if (adjectif.endsWith("f")) {
        return adjectif.slice(0, -1) + "ve";
      } else if (adjectif.endsWith("x")) {
        return adjectif.slice(0, -1) + "sse";
      } else if (adjectif.endsWith("c")) {
        return adjectif.slice(0, -1) + "que";
      } else if (adjectif.endsWith("g")) {
        return adjectif.slice(0, -1) + "ue";
      } else if (adjectif.endsWith("al")) {
        return adjectif.slice(0, -2) + "ale";
      } else if (adjectif.endsWith("el")) {
        return adjectif.slice(0, -2) + "elle";
      } else if (adjectif.endsWith("ul")) {
        return adjectif.slice(0, -2) + "ulle";
      } else if (adjectif.endsWith("eil")) {
        return adjectif.slice(0, -3) + "eille";
      } else if (adjectif.endsWith("eux")) {
        return adjectif.slice(0, -3) + "euse";
      } else if (adjectif.endsWith("eur")) {
        return adjectif.slice(0, -3) + "euse";
      } else if (!adjectif.endsWith("e")) {
        return adjectif + "e";
      }
    }
    return adjectif;
  }
  // Fonction pour accorder la rareté
  function accordeRarete(rarete, genre) {
    if (genre === "féminin") {
      if (rarete === "Rare") {
        return "Rare"; // Laisse "Rare" inchangé
      } else if (rarete === "Epic") {
        return "Epique";
      } else if (rarete === "Legendaire") {
        return "Légendaire";
      } else {
        return "Commune";
      }
    }
    return rarete; // Retourne la rareté originale pour le masculin
  }

  // Tableaux de correspondance pour les traits et les imperfections
  const tableauTraits = [
    ["Régénérant", "Régénération", "Régénère", "Régénérant", "Régénérante", "Régénérants", "Régénérantes", "Régénérant"],
    ["Adepte", "Adepte", "Adepte", "Adepte", "Adepte", "Adeptes", "Adeptes", "En adepte"],
    ["Déphasé", "Déphasage", "Déphase", "Déphasé", "Déphasée", "Déphasés", "Déphasées", "Déphasé"],
    ["Dissimulant", "Dissimulation", "Dissimule", "Dissimulant", "Dissimulante", "Dissimulants", "Dissimulantes", "Dissimulant"],
    ["Létale", "Létalité", "Létale", "Létal", "Létale", "Létaux", "Létales", "Létalement"],
    ["Avantageux", "Avantage", "Avantage", "Avantageux", "Avantageuse", "Avantageux", "Avantageuses", "Avantageusement"],
    ["Aidant", "Aide", "Aide", "Aidant", "Aidante", "Aidants", "Aidantes", "Aidant"],
    ["Lié", "Lien", "Lie", "Lié", "Liée", "Liés", "Liées", "Lié"],
    ["Chuchoteur", "Chuchotement", "Chuchote", "Chuchoteur", "Chuchoteuse", "Chuchoteurs", "Chuchoteuses", "En chuchoteur"],
    ["Polymorphe", "Polymorphisme", "Polymorphe", "Polymorphe", "Polymorphe", "Polymorphes", "Polymorphes", "Polymorphiquement"],
    ["Surchargé", "Surcharge", "Surcharge", "Surchargé", "Surchargée", "Surchargés", "Surchargées", "Surchargé"],
    ["Acrobatique", "Acrobatie", "Acrobatiquement", "Acrobatique", "Acrobatique", "Acrobatiques", "Acrobatiques", "Acrobatiquement"],
    ["Ingénieux", "Ingéniosité", "Ingénie", "Ingénieux", "Ingénieuse", "Ingénieux", "Ingénieuses", "Ingénieusement"],
    ["Puissant", "Puissance", "Puissance", "Puissant", "Puissante", "Puissants", "Puissantes", "Puissamment"],
    ["Splendide", "Splendeur", "Splendide", "Splendide", "Splendide", "Splendides", "Splendides", "Splendidement"],
    ["Incassable", "Incassabilité", "Incassable", "Incassable", "Incassable", "Incassables", "Incassables", "Incassablement"],
    ["Veinard", "Chance", "Veinarde", "Veinard", "Veinarde", "Veinards", "Veinardes", "Veinardement"],
    ["Génial", "Génie", "Génie", "Génial", "Géniale", "Géniaux", "Géniales", "En génie"],
    ["Brutal", "Brutalité", "Brutalise", "Brutal", "Brutale", "Brutaux", "Brutales", "Brutalement"],
    ["Sadique", "Sadisme", "Sadise", "Sadique", "Sadique", "Sadiques", "Sadiques", "Sadiquement"],
    ["Affilé", "Affilage", "Affile", "Affilé", "Affilée", "Affilés", "Affilées", "Affilé"],
    ["Pénétrant", "Pénétration", "Pénètre", "Pénétrant", "Pénétrante", "Pénétrants", "Pénétrantes", "Pénétrant"],
    ["Retiré", "Retraite", "Retire", "Retiré", "Retirée", "Retirés", "Retirées", "Retiré"],
    ["Sage", "Sagesse", "Sage", "Sage", "Sage", "Sages", "Sages", "Sagement"],
    ["Vengeur", "Vengeance", "Se venge", "Vengeur", "Vengeresse", "Vengeurs", "Vengeresses", "Vengeur"],
    ["Hermétique", "Hermétisme", "Hermétise", "Hermétique", "Hermétique", "Hermétiques", "Hermétiques", "Hermétiquement"],
    ["Maîtrise Psychique", "Maîtrise psychique", "Maîtrise psychiquement", "Psychique", "Psychique", "Psychiques", "Psychiques", "Avec maîtrise psychique"],
    ["Invisible", "Invisibilité", "Invisible", "Invisible", "Invisible", "Invisibles", "Invisibles", "Invisiblement"],
    ["Éblouissant", "Éblouissement", "Éblouit", "Éblouissant", "Éblouissante", "Éblouissants", "Éblouissantes", "Éblouissamment"],
    ["Inébranlable", "Inébranlabilité", "Inébranlable", "Inébranlable", "Inébranlable", "Inébranlables", "Inébranlables", "Inébranlablement"],
    ["Ferrailleur", "Ferraille", "Ferraille", "Ferrailleur", "Ferrailleuse", "Ferrailleurs", "Ferrailleuses", "En ferrailleur"],
    ["Fatal", "Fatalité", "Fatale", "Fatal", "Fatale", "Fatals", "Fatales", "Fatalement"],
    ["Céleste", "Ciel", "Céleste", "Céleste", "Céleste", "Célestes", "Célestes", "Célestement"],
    ["Triplé", "Triplet", "Triple", "Triplé", "Triplée", "Triplés", "Triplées", "Triplement"],
    ["Tamponneur", "Tampon", "Tamponne", "Tamponneur", "Tamponneuse", "Tamponneurs", "Tamponneuses", "En tamponneur"],
    ["Runique", "Rune", "Runique", "Runique", "Runique", "Runiques", "Runiques", "Runiquement"],
    ["Machiavélique", "Machiavélisme", "Machiavéliquement", "Machiavélique", "Machiavélique", "Machiavéliques", "Machiavéliques", "Machiavéliquement"]
  ];

  const tableauImperfections = [
    ["Maladroit", "Maladresse", "Maladroit", "Maladroit", "Maladroite", "Maladroits", "Maladroites", "Maladroitement"],
    ["Impotent", "Impuissance", "Impotente", "Impotent", "Impotente", "Impotents", "Impotentes", "Impotemment"],
    ["Chétif", "Chétivité", "Chétifie", "Chétif", "Chétive", "Chétifs", "Chétives", "Chétivement"],
    ["Laid", "Laideur", "Enlaidir", "Laid", "Laide", "Laids", "Laides", "Laideur"],
    ["Fragile", "Fragilité", "Fragilise", "Fragile", "Fragile", "Fragiles", "Fragiles", "Fragilement"],
    ["Infortuné", "Infortune", "Infortune", "Infortuné", "Infortunée", "Infortunés", "Infortunées", "Infortunément"],
    ["Inapte", "Inaptitude", "Inapte", "Inapte", "Inapte", "Inaptes", "Inaptes", "Inaptement"],
    ["Pacifiste", "Pacifisme", "Pacifie", "Pacifiste", "Pacifiste", "Pacifistes", "Pacifistes", "Pacifiquement"],
    ["Grossier", "Grossièreté", "Grossit", "Grossier", "Grossière", "Grossiers", "Grossières", "Grossièrement"],
    ["Farceur", "Farce", "Farce", "Farceur", "Farceuse", "Farceurs", "Farceuses", "En farceur"],
    ["Court", "Courte durée/brièveté", "Raccourcit", "Court", "Courte", "Courts", "Courtes", "Court"],
    ["Masochiste", "Masochisme", "Masochiste", "Masochiste", "Masochiste", "Masochistes", "Masochistement"],
    ["Gênant", "Gêne", "Gêne", "Gênant", "Gênante", "Gênants", "Gênantes", "Gênant"],
    ["Poissard", "Malchance", "Poissarde", "Poissard", "Poissarde", "Poissards", "Poissardes", "En poissard"],
    ["Naïf", "Naïveté", "Naïvement", "Naïf", "Naïve", "Naïfs", "Naïves", "Naïvement"],
    ["Lent", "Lenteur", "Ralentit", "Lent", "Lente", "Lents", "Lentes", "Lentement"],
    ["Préoccupant", "Préoccupation", "Préoccupe", "Préoccupant", "Préoccupante", "Préoccupants", "Préoccupantes", "Préoccupant"],
    ["Bruyant", "Bruit", "Bruyamment", "Bruyant", "Bruyante", "Bruyants", "Bruyantes", "Bruyamment"],
    ["Pathétique", "Pathos", "Pathétise", "Pathétique", "Pathétique", "Pathétiques", "Pathétiques", "Pathétiquement"],
    ["Inratable", "Inratable", "Inratable", "Inratable", "Inratable", "Inratables", "Inratables", "Inratablement"],
    ["Abruti", "Abruti", "Abrutit", "Abruti", "Abrutie", "Abrutis", "Abruties", "Comme un abruti"],
    ["Maladif", "État maladif", "Maladivement", "Maladif", "Maladive", "Maladifs", "Maladives", "Maladivement"],
    ["Dépressif", "Dépression", "Déprime", "Dépressif", "Dépressive", "Dépressifs", "Dépressives", "Dépressivement"],
    ["Maudit", "Malédiction", "Maudit", "Maudit", "Maudite", "Maudits", "Maudites", "Mauditement"],
    ["Encombrant", "Encombrement", "Encombre", "Encombrant", "Encombrante", "Encombrants", "Encombrantes", "Encombrant"],
    ["Siphonnant", "Siphonnement", "Siphonne", "Siphonnant", "Siphonnante", "Siphonnants", "Siphonnantes", "En siphonnant"],
    ["Drainant", "Drainage", "Draine", "Drainant", "Drainante", "Drainants", "Drainantes", "En drainant"],
    ["Lâche", "Lâcheté", "Lâche", "Lâche", "Lâche", "Lâches", "Lâches", "Lâchement"],
    ["Rodé", "Rodage", "Rode", "Rodé", "Rodée", "Rodés", "Rodées", "En rodage"],
    ["Amnésique", "Amnésie", "Amnésique", "Amnésique", "Amnésique", "Amnésiques", "Amnésiques", "Amnésiquement"],
    ["Craintif", "Crainte", "Craintivement", "Craintif", "Craintive", "Craintifs", "Craintives", "Craintivement"],
    ["Inattentif", "Inattention", "Inattentivement", "Inattentif", "Inattentive", "Inattentifs", "Inattentives", "Inattentivement"],
    ["Affligeant", "Affliction", "Afflige", "Affligeant", "Affligeante", "Affligeants", "Affligeantes", "Affligeant"],
    ["Fracassé", "Fracas", "Fracasse", "Fracassé", "Fracassée", "Fracassés", "Fracassées", "Fracassé"],
    ["Pataud", "Patauderie", "Pataudement", "Pataud", "Pataude", "Patauds", "Pataudes", "Pataudement"],
    ["Perturbateur", "Perturbation", "Perturbe", "Perturbateur", "Perturbatrice", "Perturbateurs", "Perturbatrices", "Perturbateur"],
    ["Victime", "Victime", "Victime", "Victime", "Victime", "Victimes", "Victimes", "En victime"],
    ["Épuisant", "Épuisement", "Épuise", "Épuisant", "Épuisante", "Épuisants", "Épuisantes", "Épuisamment"],
    ["Coercitif", "Coercition", "Coerce", "Coercitif", "Coercitive", "Coercitifs", "Coercitives", "Coercitivement"]
  ];

  // Récupère les traits et imperfections depuis la feuille de calcul
  const trait1 = feuilleArriereBoutique.getRange("C17").getValue();
  const trait2 = feuilleArriereBoutique.getRange("C24").getValue();
  const trait3 = feuilleArriereBoutique.getRange("C31").getValue();
  const imperfection1 = feuilleArriereBoutique.getRange("H17").getValue();
  const imperfection2 = feuilleArriereBoutique.getRange("H24").getValue();

  // Crée les tableaux de traits et imperfections en filtrant les valeurs vides
  const traits = [trait1, trait2, trait3].filter(Boolean);
  const imperfections = [imperfection1, imperfection2].filter(Boolean);

  // Détermine l'article en fonction du genre de l'arme.
  let article = "L'";
  if (genreArme === "masculin") {
    article = "Le ";
  } else {
    article = "La ";
  }
  if (arme.startsWith("h") || arme.startsWith("H")) {
    article = "L'";
  } else if (arme.startsWith("a") || arme.startsWith("A") || arme.startsWith("e") || arme.startsWith("E") ||
    arme.startsWith("i") || arme.startsWith("I") || arme.startsWith("o") || arme.startsWith("O") ||
    arme.startsWith("u") || arme.startsWith("U")) {
    article = "L'";
  }

  // Accorde les traits et imperfections en utilisant les tableaux intégrés
  const traitsAccordes = traits.map(trait => {
    const traitTrouve = tableauTraits.find(t => t[0] === trait);
    return traitTrouve ? accordeAdjectif(traitTrouve[3], genreArme) : trait;
  });

  const imperfectionsAccordes = imperfections.map(imperfection => {
    const imperfectionTrouvee = tableauImperfections.find(i => i[0] === imperfection);
    const nomImperfection = imperfectionTrouvee ? imperfectionTrouvee[1] : '';
    return {
      nom: nomImperfection,
      adjectif: imperfectionTrouvee ? accordeAdjectif(imperfectionTrouvee[3], genreArme) : imperfection
    };
  });

  // Accorde la rareté de l'arme
  const rareteAccorde = accordeRarete(rareteArme, genreArme);

  // Fonction pour choisir la nomenclature en fonction du nombre de traits
  function choisirNomenclature(nombreTraits, nombreImperfections) {
    if (nombreTraits === 1) {
      return 1; // Nomenclature 1
    } else if (nombreTraits === 2) {
      return 2; // Nomenclature 2
    } else if (nombreTraits === 3) {
      return 3; // Nomenclature 3
    }
    return 1; // Nomenclature par défaut
  }

  // Génère le nom de l'arme en utilisant la nomenclature appropriée
  let nomArme = "";
  if (traitsAccordes.length > 0) {
    const nomenclatureChoisie = choisirNomenclature(traitsAccordes.length, imperfectionsAccordes.length);

    if (nomenclatureChoisie === 1) {
      // Article + Arme + Adjectif trait 1 + Rareté
      nomArme = article + arme + " " + traitsAccordes[0] + " " + rareteAccorde;
    } else if (nomenclatureChoisie === 2) {
      // Article + Adjectif trait 2 + Arme + Adjectif trait 1  ou  Article + Adjectif trait 1 + Arme + Adjectif trait 2
      const choix = Math.floor(Math.random() * 2);
      if (choix === 0) {
        nomArme = article + traitsAccordes[1] + " " + arme + " " + traitsAccordes[0];
      } else {
        nomArme = article + traitsAccordes[0] + " " + arme + " " + traitsAccordes[1];
      }
    } else if (nomenclatureChoisie === 3) {
      // Article + Adjectif 3 + Arme + Adjectif 1, Article + Nom imperfection 1 ou 2 + Adjectif 2
      //  Article + Adjectif 2 + Arme + Adjectif 3, Article + Nom imperfection 1 ou 2 + Adjectif 1
      //  Article + Adjectif 1 + Arme + Adjectif 3, Article + Nom imperfection 1 ou 2 + Adjectif 2
      //  Article + Adjectif 1 + Arme + Adjectif 2, Article + Nom imperfection 1 ou 2 + Adjectif 3
      if (imperfectionsAccordes.length > 0) {
        const imperfectionIndex = Math.floor(Math.random() * imperfectionsAccordes.length);
        const choix = Math.floor(Math.random() * 4);
        if (choix === 0) {
          nomArme = article + traitsAccordes[2] + " " + arme + " " + traitsAccordes[0] + ", " +
            article + imperfectionsAccordes[imperfectionIndex].nom + " " + imperfectionsAccordes[imperfectionIndex].adjectif;
        } else if (choix === 1) {
          nomArme = article + traitsAccordes[1] + " " + arme + " " + traitsAccordes[2] + ", " +
            article + imperfectionsAccordes[imperfectionIndex].nom + " " + imperfectionsAccordes[imperfectionIndex].adjectif;
        } else if (choix === 2) {
          nomArme = article + traitsAccordes[0] + " " + arme + " " + traitsAccordes[2] + ", " +
            article + imperfectionsAccordes[imperfectionIndex].nom + " " + imperfectionsAccordes[imperfectionIndex].adjectif;
        } else {
          nomArme = article + traitsAccordes[0] + " " + arme + " " + traitsAccordes[1] + ", " +
            article + imperfectionsAccordes[imperfectionIndex].nom + " " + imperfectionsAccordes[imperfectionIndex].adjectif;
        }
      }
      else{
        const choix = Math.floor(Math.random() * 3);
        if(choix === 0){
           nomArme = article + arme + " " + traitsAccordes[0] + " " + rareteAccorde;
        }
        else if (choix === 1){
          nomArme = article + traitsAccordes[1] + " " + arme + " " + traitsAccordes[0];
        }
        else{
          nomArme = article + traitsAccordes[0] + " " + arme + " " + traitsAccordes[1];
        }
      }
    }
  } else {
    nomArme = article + arme + " " + rareteAccorde;
  }

  return nomArme;
}

function GENERER_DEGATS_ARME() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var feuille = ss.getSheetByName("La Caisse a Selenis"); // Nom de la feuille contenant les données
  var feuilleCatalogue = ss.getSheetByName("Le Catalogue"); // Nom de la feuille contenant le catalogue des dégâts

  // Lecture des valeurs de la rareté et du nombre de mains depuis les cellules
  var rareteArme = feuille.getRange("H10").getValue(); // Cellule contenant la rareté de l'arme
  var nombreMains = feuille.getRange("F10").getValue(); // Cellule contenant le nombre de mains

  // Vérification des arguments d'entrée
  if (rareteArme === "-" || nombreMains === "-") {
    return "-"; // Retourne "-" si l'une des valeurs est "-"
  }

  if (typeof rareteArme !== 'string' || (nombreMains !== "1 Main" && nombreMains !== "2 Mains" && nombreMains !== 1 && nombreMains !== 2)) {
    return "Invalid Input";
  }

  // Si nombreMains est une chaîne, le convertir en nombre
  if (typeof nombreMains === "string") {
    nombreMains = nombreMains === "1 Main" ? 1 : 2;
  }

  // Récupération des données de dégâts depuis le tableau 'Le Catalogue!C2:G6'
  var plageDegats = feuilleCatalogue.getRange("C2:G6").getValues();

  // Recherche de la ligne correspondant à la rareté de l'arme
  var ligneRarete = -1;
  for (var i = 0; i < plageDegats.length; i++) {
    if (plageDegats[i][0] === rareteArme) {
      ligneRarete = i;
      break;
    }
  }

  // Si la rareté n'est pas trouvée, retourner "Invalid Input"
  if (ligneRarete === -1) {
    return "Invalid Input";
  }

  // Récupération des dégâts et bonus en fonction du nombre de mains
  var degats = "";
  if (nombreMains === 1) {
      if(plageDegats[ligneRarete][3] = 0) {
        degats = plageDegats[ligneRarete][1]; 
        // @ts-ignore
        }else { 
        degats = plageDegats[ligneRarete][1] + " + " + plageDegats[ligneRarete][3];
        }
    } else { // nombreMains === 2
    degats = plageDegats[ligneRarete][2] + " + " + plageDegats[ligneRarete][4];
  }

  // Retourne la chaîne de dégâts
  return degats;
}

function RandomSelectFromRange(nomFeuilleCible, celluleCible, nomFeuilleSource, plageSource) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var feuilleCible = ss.getSheetByName(nomFeuilleCible);
  var celluleMenuDeroulant = feuilleCible.getRange(celluleCible);
  var plageOptions = ss.getSheetByName(nomFeuilleSource).getRange(plageSource);
  var options = plageOptions.getValues()
    .flat()
    .filter(function(option) {
      return option !== "-" && String(option).trim() !== "";
    });

  if (options.length > 0) {
    var randomIndex = Math.floor(Math.random() * options.length);
    celluleMenuDeroulant.setValue(options[randomIndex]);
  } else {
    Logger.log("La plage d'options " + plageSource + " dans la feuille " + nomFeuilleSource + " ne contient aucune valeur valide.");
  }
}

var ProbabilitesRarete = {
  Commune: 0,
  Rare: 0,
  Epic: 0,
  Legendaire: 0
};

function SetProbabilitesNovice() {
  ProbabilitesRarete.Commune = 0.95;
  ProbabilitesRarete.Rare = 0.05;
  ProbabilitesRarete.Epic = 0;
  ProbabilitesRarete.Legendaire = 0;
  Logger.log("Probabilités de rareté définies pour le niveau Novice: " + JSON.stringify(ProbabilitesRarete));
}

function SetProbabilitesConfirme() {
  ProbabilitesRarete.Commune = 0.17;
  ProbabilitesRarete.Rare = 0.77;
  ProbabilitesRarete.Epic = 0.05;
  ProbabilitesRarete.Legendaire = 0;
  Logger.log("Probabilités de rareté définies pour le niveau Confirmé: " + JSON.stringify(ProbabilitesRarete));
}

function SetProbabilitesExpert() {
  ProbabilitesRarete.Commune = 0.05;
  ProbabilitesRarete.Rare = 0.10;
  ProbabilitesRarete.Epic = 0.845;
  ProbabilitesRarete.Legendaire = 0.005;
  Logger.log("Probabilités de rareté définies pour le niveau Expert: " + JSON.stringify(ProbabilitesRarete));
}

function ResetSelecteur (nomFeuilleCible, celluleCible, valeurAReset) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var feuilleCible = ss.getSheetByName(nomFeuilleCible);
  var celluleMenuDeroulant = feuilleCible.getRange(celluleCible);
  celluleMenuDeroulant.setValue(valeurAReset);
}

function ResetArmes() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var feuilleCible = ss.getSheetByName('La Caisse a Selenis');
  var valeurDeReset = "-";

  // Réinitialise les sélecteurs d'armes
  ResetSelecteur('La Caisse a Selenis', 'La Caisse a Selenis!$c$10', valeurDeReset);
  ResetSelecteur('La Caisse a Selenis', 'La Caisse a Selenis!$h$10', valeurDeReset);
  ResetSelecteur('La Caisse a Selenis', 'La Caisse a Selenis!$h$12', valeurDeReset);
  ResetSelecteur('La Caisse a Selenis', 'La Caisse a Selenis!$f$10', valeurDeReset);
  ResetSelecteur('La Caisse a Selenis', 'La Caisse a Selenis!$c$12', valeurDeReset);

  // Réinitialise les traits et les bonus/explications
  for (var ligne = 17; ligne <= 100; ligne += 7) { // Ajustez 100 à la dernière ligne utilisée pour les traits
    var rangeTrait = feuilleCible.getRange(ligne, 3, 1, 3);
    rangeTrait.clearContent();
    rangeTrait.setBackground(null);
    rangeTrait.breakApart();
    rangeTrait.setBorder(false, false, false, false, false, false, null, null); // Supprime les bordures

    var rangeBonus = feuilleCible.getRange(ligne + 1, 3, 4, 3);
    rangeBonus.clearContent();
    rangeBonus.setBackground(null);
    rangeBonus.breakApart();
    rangeBonus.setBorder(false, false, false, false, false, false, null, null); // Supprime les bordures
  }

  // Réinitialise les imperfections et les malus/explications
  for (var ligne = 17; ligne <= 100; ligne += 7) { // Ajustez 100 à la dernière ligne utilisée pour les imperfections
    var rangeImperfection = feuilleCible.getRange(ligne, 7, 1, 3);
    rangeImperfection.clearContent();
    rangeImperfection.setBackground(null);
    rangeImperfection.breakApart();
    rangeImperfection.setBorder(false, false, false, false, false, false, null, null); // Supprime les bordures

    var rangeBonusImperfection = feuilleCible.getRange(ligne + 1, 7, 4, 3);
    rangeBonusImperfection.clearContent();
    rangeBonusImperfection.setBackground(null);
    rangeBonusImperfection.breakApart();
    rangeBonusImperfection.setBorder(false, false, false, false, false, false, null, null); // Supprime les bordures
  }
  EffacerEtEcrireFormuleG7()
}

function EffacerEtEcrireFormuleG7() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var feuille = ss.getSheetByName("La Caisse a Selenis");

  // Vérifie si la feuille de calcul existe.
  if (!feuille) {
    Logger.log("Feuille 'La Caisse a Selenis' non trouvée.");
    return;
  }

  // Efface le contenu de la cellule G7.
  feuille.getRange("G7").clearContent();

  // Écrit la formule dans la cellule G7.
  feuille.getRange("G7").setFormula("=GENERER_DEGATS_ARME()");

  Logger.log("Le contenu de la cellule G7 a été effacé et la formule '=GENERER_DEGATS_ARME()' a été écrite.");
}

function exempleAppelEffacerEtRecalculerG7() {
  // Exemple d'utilisation : efface le contenu de la cellule G7 et force le recalcul.
  effacerEtRecalculerG7();
}

function RandomTypeArme() {
  RandomSelectFromRange('La Caisse a Selenis', 'La Caisse a Selenis!$c$10', 'Le Catalogue', 'Le Catalogue!$B$10:$B$16');
}
function RandomTouche() {
  RandomSelectFromRange('La Caisse a Selenis', 'La Caisse a Selenis!$h$12', 'Le Catalogue', 'Le Catalogue!$J$3:$J$7');
}
function RandomMains() {
  RandomSelectFromRange('La Caisse a Selenis', 'La Caisse a Selenis!$f$10', 'Le Catalogue', 'Le Catalogue!$B$2:$b$3');
}
function RandomArme() {
  RandomSelectFromRange('La Caisse a Selenis', 'La Caisse a Selenis!$c$12', 'Arrière boutique', 'Arrière boutique!$x$4:$x$25');
}
function RandomRarete() {
  var ss = SpreadsheetApp.getActiveSpreadsheet(); // Récupérer l'objet Spreadsheet à chaque fois
  var feuilleCible = ss.getSheetByName('La Caisse a Selenis');
  var celluleMenuDeroulant = feuilleCible.getRange('La Caisse a Selenis!$h$10');
  var options = [];
  var raretes = Object.keys(ProbabilitesRarete);

  raretes.forEach(function(rarete) {
    var probabilite = ProbabilitesRarete[rarete];
    for (var i = 0; i < probabilite * 1000; i++) {
      options.push(rarete);
    }
  });
  var catalogueSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Le Catalogue'); // Récupérer la feuille Catalogue ici
  var plageOptionsCatalogue = catalogueSheet.getRange('Le Catalogue!$C$3:$C$7').getValues();
  var optionsValides = options.filter(function(option) {
    return plageOptionsCatalogue.flat().includes(option) && option !== "-";
  });

  Logger.log("Tableau optionsValides avant la sélection : " + JSON.stringify(optionsValides));

  if (optionsValides.length > 0) {
    var randomIndex = Math.floor(Math.random() * optionsValides.length);
    celluleMenuDeroulant.setValue(optionsValides[randomIndex]);
  } else {
    Logger.log("Aucune rareté valide trouvée avec les probabilités actuelles ou la plage du catalogue est vide (en excluant '-').");
  }
}

function getBackgroundColorForRarity(rarete) {
  switch (rarete) {
    case "Commune":
      return "#c2f0c2";
    case "Rare":
      return "#add8e6";
    case "Epic":
      return "#e0b0ff";
    case "Legendaire":
      return "#fffacd";
    default:
      return "#ffffff";
  }
}

function GenererTraitsArme(rareteArme, nombreMains) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('La Caisse a Selenis');
  var ligneDepart = 17;
  var colonneTrait = 3;
  var colonneBonus = 3;
  var colonneImperfection = 7;
  var ligneFormuleTrait = 1;
  var colonneFormuleTrait = 1;
  var nombreTraitsBase = 0;
  var nombreImperfections = 0;
  var traitsGeneres = [];
  var imperfectionsGeneres = [];
  var nomArme = sheet.getRange('C12').getValue();
  var typeArme = sheet.getRange('C10').getValue();
  var toucheArme = sheet.getRange('H12').getValue();

  var plagesTraitsParRarete = {
    "Commune": ['Arrière Boutique!Y4:Y'],
    "Rare": ['Arrière Boutique!Z4:Z'],
    "Epic": ['Arrière Boutique!AA4:AA'],
    "Legendaire": ['Arrière Boutique!AB4:AB']
  };
  var traitsDejaPresents = {};

  // 1. Déterminer le nombre de traits de base
  var jetD4 = Math.floor(Math.random() * 4) + 1;
  Logger.log("Jet de D4 pour le nombre de traits de base : " + jetD4);

  // Exclure la valeur 4 du jet de D4
  if (jetD4 === 4) {
    jetD4 = Math.floor(Math.random() * 3) + 1; // Relance un D3 (1, 2 ou 3)
    Logger.log("Jet de D4 relancé (résultat 4 exclu) : " + jetD4);
  }

  switch (rareteArme) {
    case "Commune":
      nombreTraitsBase = jetD4;
      nombreImperfections = nombreTraitsBase - 1;
      break;
    case "Rare":
      nombreTraitsBase = jetD4;
      nombreImperfections = nombreTraitsBase - 2;
      break;
    case "Epic":
      nombreTraitsBase = jetD4;
      nombreImperfections = nombreTraitsBase - 3;
      break;
    case "Legendaire":
      nombreTraitsBase = Math.max(Math.floor(Math.random() * 4) + 1, 2);
      nombreImperfections = Math.max(0, nombreTraitsBase - 4);
      break;
    default:
      Logger.log("Rareté d'arme non reconnue : " + rareteArme);
      return;
  }

  Logger.log("Nombre de traits de base : " + nombreTraitsBase);
  Logger.log("Nombre d'imperfections de base : " + nombreImperfections);

  // 2. Appliquer le bonus de trait pour les armes à deux mains
  var bonusTraitDeuxMains = 0; // Variable pour stocker le bonus de trait
  if (nombreMains === '2') {
    bonusTraitDeuxMains = 1;
    nombreTraitsBase += bonusTraitDeuxMains; // Ajoute le bonus au nombre de traits
    Logger.log("Bonus de +1 trait pour arme à deux mains. Nouveau nombre de traits : " + nombreTraitsBase);
  }
  else{
    Logger.log("Pas de bonus de trait pour arme à une main.");
  }

  // 3. Ajustement du nombre de traits maximum par rareté
  if (rareteArme === "Commune" || rareteArme === "Rare") {
    nombreTraitsBase = Math.min(nombreTraitsBase, 3); // Limite à 3 pour Commune et Rare
  } else if (rareteArme === "Epic") {
    nombreTraitsBase = Math.min(nombreTraitsBase, 4); // Limite à 4 pour Epic
  }
  Logger.log("Nombre total de traits à générer : " + nombreTraitsBase);
  Logger.log("Nombre total d'imperfections à générer : " + Math.max(0, nombreImperfections));

  // 4. Sélectionner et afficher les traits et imperfections
  var ligneCourante = ligneDepart;
  var nombreTraitsGeneres = 0; // Compteur de traits générés
  for (var i = 0; i < nombreTraitsBase; i++) {
    // Sélectionner un trait aléatoire
    var plageTraitSource = plagesTraitsParRarete[rareteArme][0];
    var plageSourceRange = ss.getRange(plageTraitSource);
    var plageSourceValues = plageSourceRange.getValues().flat().filter(String);
    var traitSelectionne = "Aucun trait trouvé";
    var traitValide = false;

    while (!traitValide) { // Boucle pour assurer un trait unique
      if (plageSourceValues.length > 0) {
        // Filtrer les valeurs pour exclure "-"
        var valeursFiltrees = plageSourceValues.filter(valeur => valeur !== "-");
        if (valeursFiltrees.length > 0) {
          var indexTraitAleatoire = Math.floor(Math.random() * valeursFiltrees.length);
          traitSelectionne = valeursFiltrees[indexTraitAleatoire];
          var nomTrait = traitSelectionne.split(' ')[0];

          // Vérifie si le trait est déjà présent
          if (!traitsDejaPresents[nomTrait]) {
            traitsDejaPresents[nomTrait] = true;
            traitsGeneres.push(traitSelectionne);
            traitValide = true; // Sort de la boucle si le trait est unique
            nombreTraitsGeneres++; // Incremente le compteur de traits
          } else {
            Logger.log("Doublon détecté pour le trait : " + nomTrait + ". Sélection d'un autre trait.");
            // Ne pas ajouter "Aucun trait trouvé" ici, on va relancer la sélection
          }
        } else {
          traitsGeneres.push("Aucun trait trouvé");
          Logger.log("Aucun trait valide trouvé (après exclusion de '-') pour l'arme de rareté : " + rareteArme);
          traitValide = true; // Sort de la boucle, même si aucun trait n'est trouvé
          nombreTraitsGeneres++;
        }
      } else {
        traitsGeneres.push("Aucun trait trouvé");
        Logger.log("Aucun trait trouvé dans la plage pour l'arme de rareté : " + rareteArme);
        traitValide = true; // Sort de la boucle, même si aucun trait n'est trouvé
        nombreTraitsGeneres++;
      }
    }

    // Afficher le trait
    var rangeTrait = sheet.getRange(ligneCourante, colonneTrait, 1, 3);
    rangeTrait.merge();
    rangeTrait.setValue(traitSelectionne);
    rangeTrait.setFontWeight("bold").setFontStyle("italic").setFontSize(18).setHorizontalAlignment("center");
    var backgroundColor = getBackgroundColorForRarity(rareteArme);
    rangeTrait.setBackground(backgroundColor);
    rangeTrait.setBorder(true, true, true, true, true, true, "black", SpreadsheetApp.BorderStyle.THICK);

    // Afficher le bonus du trait (sous le trait)
    var formuleBonus = "=INDEX('Traits Armes'!$A$7:$D; MATCH(\"" + traitSelectionne + "\";'Traits Armes'!$C$7:$C;0);4)";
    var rangeBonus = sheet.getRange(ligneCourante + 1, colonneBonus, 4, 3);
    rangeBonus.merge();
    rangeBonus.setFormula(formuleBonus);
    rangeBonus.setFontSize(12); // Taille de police par défaut
    rangeBonus.setHorizontalAlignment("center");
    rangeBonus.setBackground(backgroundColor);
    rangeBonus.setBorder(true, true, true, true, true, true, "black", SpreadsheetApp.BorderStyle.THICK);

    // Ajuster la taille de la police en fonction de la longueur du texte
    var bonusText = sheet.getRange(ligneCourante + 1, colonneBonus).getValue();
    var bonusLength = bonusText.length;
    if (bonusLength > 50) {
      rangeBonus.setFontSize(10);
    } else if (bonusLength > 30) {
      rangeBonus.setFontSize(11);
    }

    ligneCourante += 7;
  }
  var trait1 = traitsGeneres[0] || '';
  var trait2 = traitsGeneres[1] || '';
  var trait3 = traitsGeneres[2] || '';
  var trait4 = traitsGeneres[3] || '';
  var trait5 = traitsGeneres[4] || '';
  var trait6 = traitsGeneres[5] || '';
  var trait7 = traitsGeneres[6] || '';
  var trait8 = traitsGeneres[7] || '';

  // Afficher les imperfections
  ligneCourante = ligneDepart;
  var nombreImperfectionsGenerees = 0;
  for (var i = 0; i < Math.max(0, nombreImperfections); i++) {
    var plageImperfections = ss.getSheetByName('Traits Armes').getRange('F7:F225').getValues().flat().filter(String); // Correction ici
    if (plageImperfections.length > 0) {
      var indexImperfectionAleatoire = Math.floor(Math.random() * plageImperfections.length);
      var imperfectionAleatoire = plageImperfections[indexImperfectionAleatoire];
      imperfectionsGeneres.push(imperfectionAleatoire);
      nombreImperfectionsGenerees++;

      var rangeImperfection = sheet.getRange(ligneCourante, colonneImperfection, 1, 3);
      rangeImperfection.merge();
      rangeImperfection.setValue(imperfectionAleatoire);
      rangeImperfection.setFontWeight("bold").setFontStyle("italic").setFontSize(18).setHorizontalAlignment("center");
      rangeImperfection.setBackground("#ffe0e0");
      rangeImperfection.setBorder(true, true, true, true, true, true, "black", SpreadsheetApp.BorderStyle.THICK); // Correction ici

      var celluleImperfection = sheet.getRange(ligneCourante + 1, colonneImperfection, 4, 3);
      rangeBonusImperfection = sheet.getRange(ligneCourante + 1, colonneImperfection, 4, 3);
      rangeBonusImperfection.merge();
      var formuleBonusImperfection = "=INDEX('Traits Armes'!$A$7:$H; MATCH(\"" + imperfectionAleatoire + "\";'Traits Armes'!$F$7:$F;0);8)";
      rangeBonusImperfection.setFormula(formuleBonusImperfection);
      rangeBonusImperfection.setFontSize(12); // Taille de police par défaut
      rangeBonusImperfection.setHorizontalAlignment("center");
      rangeBonusImperfection.setBackground("#ffe0e0");
      rangeBonusImperfection.setBorder(true, true, true, true, true, true, "black", SpreadsheetApp.BorderStyle.THICK); // Correction ici

      // Ajuster la taille de la police en fonction de la longueur du texte
      var bonusImperfectionText = sheet.getRange(ligneCourante + 1, colonneImperfection).getValue();
      var bonusImperfectionLength = bonusImperfectionText.length;
      if (bonusImperfectionLength > 50) {
        rangeBonusImperfection.setFontSize(10);
      } else if (bonusImperfectionLength > 30) {
        rangeBonusImperfection.setFontSize(11);
      }

      ligneCourante += 7;
    } else {
      Logger.log("Aucune imperfection trouvée.");
    }
  }
  var imperfection1 = imperfectionsGeneres[0] || '';
  var imperfection2 = imperfectionsGeneres[1] || '';
  var imperfection3 = imperfectionsGeneres[2] || '';
  Logger.log("Traits générés : " + traitsGeneres.join(", "));
  Logger.log("Imperfections générées : " + imperfectionsGeneres.join(", "));
  EnregistrerArmeGeneree(rareteArme, nomArme, typeArme, toucheArme, nombreMains, [imperfection1, imperfection2, imperfection3], [trait1, trait2, trait3, trait4, trait5, trait6, trait7, trait8]);
}


function EnregistrerArmeGeneree(rareteArme, nomArme, typeArme, toucheArme, nombreMains, imperfections, traits) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('La Caisse a Selenis');
  var ligneInsertion = 100; // Ligne où insérer les données de la nouvelle arme
  var colonneDepart = 3; // Décaler le début des données à la colonne C

  // Créer un tableau avec les données de l'arme
  var armeData = [
    rareteArme,
    nomArme,
    typeArme,
    toucheArme,
    nombreMains,
    (imperfections && imperfections.length > 0) ? imperfections[0] || '' : '', // Vérifie si imperfections est défini et contient des éléments
    (imperfections && imperfections.length > 1) ? imperfections[1] || '' : '',
    (imperfections && imperfections.length > 2) ? imperfections[2] || '' : '',
    (traits && traits.length > 0) ? traits[0] || '' : '',       // Vérifie si traits est défini et contient des éléments
    (traits && traits.length > 1) ? traits[1] || '' : '',
    (traits && traits.length > 2) ? traits[2] || '' : '',
    (traits && traits.length > 3) ? traits[3] || '' : '',
    (traits && traits.length > 4) ? traits[4] || '' : '',
    (traits && traits.length > 5) ? traits[5] || '' : '',
    (traits && traits.length > 6) ? traits[6] || '' : '',
    (traits && traits.length > 7) ? traits[7] || '' : ''
  ];

  // Déplacer les données précédentes vers le bas
  if (sheet.getLastRow() >= ligneInsertion) {
    var numRowsToMove = sheet.getLastRow() - ligneInsertion + 1;
    var rangeToMove = sheet.getRange(ligneInsertion, colonneDepart, numRowsToMove, armeData.length);
    var valuesToMove = rangeToMove.getValues();

    sheet.getRange(ligneInsertion + 1, colonneDepart, numRowsToMove, armeData.length).setValues(valuesToMove);
  }

  // Insérer les nouvelles données
  var rangeInsertion = sheet.getRange(ligneInsertion, colonneDepart, 1, armeData.length);
  rangeInsertion.setValues([armeData]);

  // Appliquer la couleur de fond pour la rareté
  var rareteColor = getBackgroundColorForRarity(rareteArme);
  sheet.getRange(ligneInsertion, colonneDepart).setBackground(rareteColor);

  Logger.log("Arme enregistrée dans le tableau : " + nomArme);
}

//*****************************************************************************************************************************
//*****************************************************************************************************************************


function FaisMoiUneArmeNovice () {
  // Option : Réinitialiser avant de générer
  //ResetArmes();
  //Utilities.sleep(100);
var ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('La Caisse a Selenis')
    RandomMains();
  Utilities.sleep(100);
  RandomTypeArme();
  Utilities.sleep(100);
  SetProbabilitesNovice(); 
  RandomRarete();       
  Utilities.sleep(100);
  RandomTouche();
  Utilities.sleep(100);
  RandomArme();
  Utilities.sleep(100);
  var rareteArme = ss.getRange('La Caisse a Selenis!$H$10').getValue();
  var nombreMains = ss.getRange('La Caisse a Selenis!$F$10').getValue();
  GenererTraitsArme(rareteArme, nombreMains)
  Utilities.sleep(100);
  var degats = GENERER_DEGATS_ARME();
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var feuille = ss.getSheetByName("La Caisse a Selenis");
  feuille.getRange("G7").setValue(degats);
 
}  

function FaisMoiUneArmeConfirmé () {
  // Option : Réinitialiser avant de générer
  // ResetArmes();
  // Utilities.sleep(100);
var ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('La Caisse a Selenis')

  RandomMains();
  Utilities.sleep(100);
  RandomTypeArme();
  Utilities.sleep(100);
  SetProbabilitesConfirme(); 
  RandomRarete();       
  Utilities.sleep(100);
  RandomTouche();
  Utilities.sleep(100);
  RandomArme();
  Utilities.sleep(100);
  var rareteArme = ss.getRange('La Caisse a Selenis!$H$10').getValue();
  var nombreMains = ss.getRange('La Caisse a Selenis!$F$10').getValue();

  GenererTraitsArme(rareteArme, nombreMains)
  Utilities.sleep(100);
  var degats = GENERER_DEGATS_ARME();
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var feuille = ss.getSheetByName("La Caisse a Selenis");
  feuille.getRange("G7").setValue(degats);

}
function FaisMoiUneArmeExpert () {
  // Option : Réinitialiser avant de générer
  // ResetArmes();
  // Utilities.sleep(100);
var ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('La Caisse a Selenis')

  RandomMains();
  Utilities.sleep(100);
  RandomTypeArme();
  Utilities.sleep(100);
  SetProbabilitesExpert(); 
  RandomRarete();       
  Utilities.sleep(100);
  RandomTouche();
  Utilities.sleep(100);
  RandomArme();
  Utilities.sleep(100);
  var rareteArme = ss.getRange('La Caisse a Selenis!$H$10').getValue();
  var nombreMains = ss.getRange('La Caisse a Selenis!$F$10').getValue();

  GenererTraitsArme(rareteArme, nombreMains)
  Utilities.sleep(100);
  var degats = GENERER_DEGATS_ARME();
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var feuille = ss.getSheetByName("La Caisse a Selenis");
  feuille.getRange("G7").setValue(degats);
}