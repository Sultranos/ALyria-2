import AlyriaItemSheet from "./sheet/alyriaitemsheet.js";
import AlyriaActorSheet from "./sheet/alyriaactorsheet.js";

hooks.once("init", () => {
    console.log("Alyria | Initialisation du système Alyria");

    // Register the AlyriaItemSheet
    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("alyria", AlyriaItemSheet, { makeDefault: true });

    // Register the AlyriaActorSheet
    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("alyria", AlyriaActorSheet, { makeDefault: true });
    console.log("Alyria | Fiches d'acteurs et d'objets enregistrées");

    // Register the Alyria system settings
    game.settings.register("alyria", "exampleSetting", {
        name: "Example Setting",
        hint: "An example setting for the Alyria system.",
        scope: "world",
        config: true,
        type: String,
        default: "default value"
    });
});