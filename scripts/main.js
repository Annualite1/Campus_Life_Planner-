import{
    activities,
    settings,
    addActivity,
    setActivities,
    updateActivity,
    deleteActivity
}from "./state.js";
import{
    loadActivities,
    saveActivities,
    loadSettings,
    saveSettings
 }from"./storage.js";
 import { validateActivity } from"./validators.js";
 import  { searchActivities, sortActivities} from "./search.js";
 import { renderActivities, updateDashboard } from "./ui.js";
 const exportButton = document.querySelector("#export-button");
 const dataStatus = document.querySelector("#data-status");

exportButton?.addEventListener("click", exportActivities);
const importFileInput = document.querySelector("#import-file");
const durationUnitSelect = document.querySelector("#duration-unit");
importFileInput?.addEventListener("change", event=> {
    const file = event.target.files?.[0];

    if (file) {
        importActivities(file);
    }
});


const form = document.querySelector("#activity-form");
const titleInput = document.querySelector("#title");
const titleError = document.querySelector("#title-error");
const activitiesContainer = document.querySelector(".activities-list");
const searchInput = document.querySelector("#search-input");
const tagFilter = document.querySelector("#tag-filter");
const sortBy = document.querySelector("#sort-by");
const caseInsensitive = document.querySelector("#case-insensitive");
const searchStatus = document.querySelector("#search-status");
const activityCapInput = document.querySelector("#activity-cap");
const capStatus = document.querySelector("#cap-status");
const savedActivities = loadActivities();
if(savedActivities) {
    setActivities(savedActivities);
}
const savedSettings= loadSettings();
if(savedSettings && typeof savedSettings === "object") {
    if(
        savedSettings.durationUnit ==="minutes" ||
        savedSettings.durationUnit ==="hours"
    ) {
        settings.durationUnit = savedSettings.durationUnit;
    }
    if(
        Number.isInteger(savedSettings.activityCap) &&
        savedSettings.activityCap >= 1 &&
        savedSettings.activityCap <=100
    ){
        settings.activityCap = savedSettings.activityCap;
    }

}
if(durationUnitSelect) {
    durationUnitSelect.value = settings.durationUnit;
}
if (activityCapInput) {
    activityCapInput.value = settings.activityCap;
}
function updateCapStatus() {
    const cap = Number(settings.activityCap);
    const total = activities.length;

    if(capStatus){
            capStatus.textContent =
            `${Math.min(total, cap)} of ${cap} activities used.`;
    }
            const capAlert = document.querySelector("#cap-alert");

            if(capAlert) {
                const limitReached = total >= cap;
                capAlert.hidden = !limitReached;
                capAlert.textContent = limitReached
                ? `Activity limit reached: ${cap}. Increase the cap or remove an activity to add another.`
                : "";
            }
            }
        
    

function saveAndRender(){
    saveActivities(activities);
    updateDashboard(activities);
    updateCapStatus();
    displayActivities();
}
function exportActivities(){
    try{
        const jsonData = JSON.stringify(activities, null, 2);
        const file = new Blob ([jsonData], {
            type:"application/json"
        });
        const downloadUrl= URL.createObjectURL(file);
        const link = document.createElement("a");
     link.href = downloadUrl;
     link.download = "campus-life-activities.json";
     document.body.appendChild(link);
     link.click();
     link.remove();
     URL.revokeObjectURL(downloadUrl);

     if (dataStatus){
        dataStatus.textContent = "Activities exported successfully.";
     }
    } catch (error) {
        console.error("Could not export activities:", error);

        if(dataStatus) {
            dataStatus.textContent = "Export failed.Please try again.";
        }
    }
}
async function importActivities(file) {
    if(!file) return;


    try {
        const fileText= await file.text();
        const importedData = JSON.parse(fileText);

        if (!Array.isArray(importedData)) {
            throw new Error("The JSON file must contain an array of activities.");
        }

        const requiredFields = ["id", "title", "dueDate", "duration", "tag"];

        const isValidData = importedData.every(activity =>
            activity &&
            typeof activity === "object" &&
            !Array.isArray(activity) &&
            requiredFields.every(field =>
                Object.prototype.hasOwnProperty.call(activity,field)) &&
                typeof activity.id === "string" &&
                activity.id.trim() !== "" &&
                typeof activity.title === "string" &&
                typeof activity.dueDate === "string" &&
                Number.isInteger(Number(activity.duration)) &&
                Number(activity.duration) >= 1 &&
                Number(activity.duration) <= 1440 &&
                typeof activity.tag === "string" &&
                (
                    activity.status === undefined ||
                    ["Upcoming", "Completed"].includes(activity.status)
                ) &&
                (
                    activity.createdAt === undefined ||
                    (
                        typeof activity.createdAt === "string" &&
                        !Number.isNaN(Date.parse(activity.createdAt))
                    )
                ) &&
                (
                    activity.updatedAt === undefined ||
                    (
                        typeof activity.updatedAt === "string" &&
                        !Number.isNaN(Date.parse(activity.updatedAt))
                    )
                )
            );
            if (!isValidData) {
                throw new Error("The file contains activities with missing or invalid fields.");
            }
            const hasInvalidId = importedData.some(
                activity => typeof activity.id !== "string" || !activity.id.trim()
            );
            if(hasInvalidId) {
                throw new Error("Every activity must have a non-empty ID.");

            }
            const ids = importedData.map(activity => activity.id);
            if (new Set(ids).size !==ids.length) {
                throw new Error("Each activity must have a unique ID.");
            }
            
             const invalidActivity= importedData.some(activity =>
                !validateActivity(activity).isValid
             );
             if(invalidActivity) {
                throw new Error("Some activities do not meet the required validation rules.");

             }
             setActivities(importedData);
             saveAndRender();

             if(dataStatus) {
                dataStatus.textContent =
                `${importedData.length} activities imported successfully.`;
             }
            }catch (error) {
                if(dataStatus) {
                    dataStatus.textContent =
                    `Import failed: ${error.message || "Please choose a valid JSON file."}`;
                }
            } finally {
                const input = document.querySelector("#import-file");
                if (input) input.value = "";
    }
}
function displayActivities() {
let results = [...activities];
const selectedTag =tagFilter?.value || "";
if(selectedTag) {
    results= results.filter(
        activity =>activity.tag.toLowerCase() ===selectedTag.toLowerCase()
    );
    
}
const searchResult= searchActivities(
    results,
    searchInput?.value || "",
    caseInsensitive?.checked ?? true
);
 if (searchStatus) {
    searchStatus.textContent=searchResult.error ||
    `${searchResult.results.length} activity/activities found.`;
 }
 results =sortActivities(searchResult.results, sortBy?.value);
 renderActivities(
    results,
    activitiesContainer,
    searchInput?.value || "",
    caseInsensitive?.checked ?? true

    );

}
activitiesContainer?.addEventListener("click", event => {
    const button = event.target.closest("button[data-action]");
    if(!button) return;

    const id =button.dataset.id;
    const action = button.dataset.action;
    const activity = activities.find(item => item.id ===id);

    if(!activity) return;
    if(action === "delete") {
        if(confirm(`Delete "${activity.title}"?`)) {
            deleteActivity(id);
            saveAndRender();
        }
    }
    if (action === "edit") {
        const title = prompt("Edit activity title:", activity.title);
        if(title === null ) return;
         const dueDate= prompt("Edit due date (YYYY-MM-DD):", activity.dueDate);
         if(dueDate === null) return;
          const  duration = prompt("Edit duration in minutes:", activity.duration);
          if (duration === null) return;
          const tag = prompt("Edit activity tag:", activity.tag);
          if(tag === null) return;
          const updatedActivity = {
            ...activity,
            title: title.trim(),
            dueDate: dueDate.trim(),
            duration:Number(duration),
            tag: tag.trim(),
            updatedAt: new Date().toISOString()
          };
          const validation = validateActivity(updatedActivity);
          if(!validation.isValid) {
            alert(Object.values(validation.errors).join("\n"));
            return;
          }
          updateActivity(id, updatedActivity);
          saveAndRender();
    } 
});
form?.addEventListener("submit", event => {
    event.preventDefault();
    const cap = Number(activityCapInput?.value || settings.activityCap);
    if (activities.length >= cap) {
        updateCapStatus();
        return;
    }

    const activity={
        id:crypto.randomUUID(),
        title:document.querySelector("#title").value.trim(),
        dueDate:document.querySelector("#dueDate").value,
        duration:Number(document.querySelector("#duration").value),
        tag: document.querySelector("#tag").value.trim(),
        status:"Upcoming",
        createdAt:new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    console.log("Date from form:", activity.dueDate);
    console.log("Current local date:", new Date().toLocaleDateString());

    const validation = validateActivity(activity);
    if (!validation.isValid) {
        const messages=Object.values(validation.errors).join("\n");
        alert (messages);
        return; 
    }
    addActivity(activity);
    saveAndRender();
    form.reset();
});
searchInput?.addEventListener("input", displayActivities);
titleInput?.addEventListener("input", () => {
    const title = titleInput.value.trim();
    if(title.length <3) {
        titleError.textContent = "Title must be at least 3 characters.";
    } else if (title.length > 100) {
        titleError.textContent = "Title must not exceed 100 characters.";
    } else if (/(.)\1{2,}/.test(title)) {
        titleError.textContent = "Avoid repeating the same character three or more times.";
    } else if (/<[^>]*>/.test(title)) {
        titleError.textContent = "HTML tags are not allowed in the title.";
    } else {
        titleError.textContent = "";
    }

});

tagFilter?.addEventListener("change", displayActivities);
sortBy?.addEventListener("change", displayActivities);
caseInsensitive?.addEventListener("change", displayActivities);
activityCapInput?.addEventListener("change", () =>{
    const cap = Number(activityCapInput.value);
    if(!Number.isInteger(cap) || cap < 1 || cap > 100) {
    activityCapInput.value = settings.activityCap;
    updateCapStatus();
    return;
    }
    settings.activityCap = cap;
    saveSettings(settings);
    updateCapStatus();
});

durationUnitSelect?.addEventListener("change", () => {
    settings.durationUnit = durationUnitSelect.value;
    saveSettings(settings);
    updateDashboard(activities);
    displayActivities();
});
saveSettings(settings);
updateDashboard(activities);
updateCapStatus();
displayActivities();