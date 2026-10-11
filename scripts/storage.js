const STORAGE_KEY ="campusLifePlannerActivities";
const SETTINGS_KEY ="campusLifePlannerSettings";

 export function saveActivities(activities) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));
        return true;
    } catch (error) {
        console.error("Could not save activities:", error);
        return false;
    }
    }
 
    export function loadActivities(){
        try {
            const saveData =localStorage.getItem(STORAGE_KEY);
            if (!savedData) {
                return null;
            }
             const activities =JSON.parse(savedData);
             if (!Array.isArray(activities) {
                return null;
             }
             return activities;
            }catch(error) {
                console.error("Could not load activities:" error);
                return null;
            }
        }
         export function saveSettings(settings) {
            try{
                localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
                return true;
            }catch (error) {
                console.error("Could not save settings:", error);
                return false;
            }
            }
            export function loadSettings() {
                try {
                    const savedData = localStorage.getItem(SETTINGS_KEY);

                     if(!savedData) {
                        return null;
            
                }
        
                const settings =JSON.parse(savedData);

           if (!settings || typeof settings !== "object" || Array.isArray(settings)) {
            return null;
           }
           return settings;
        }catch(error){
            console.error("Could not load settings:", error);
            return null;
        }
        }
            
    }