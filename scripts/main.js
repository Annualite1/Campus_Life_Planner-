import{
    activities,
    settings,
    addActivity,
    setActivities
}from "./state.js";

import{
    loadActivities,
    saveActivities,
    loadSettings,
    saveSettings
}from "./storage.js";

import{ validateActivity } from "./validators.js";
import { searchActivities, sortActivities} from "./search.js";
import { renderActivities,updateDashboard } from "./ui.js";

const form = document.querySelector("#activity-form");
const activitiesContainer = document.querySelector("#activities-list");
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
if(savedSettings) {
    Object.assign(settings,savedSettings);

}
if (activityCapInput) {
    activityCapInput.value = settings.activityCap;
}
function updatecapStatus(){
    const cap = Number(settings.activityCap);
    const total = activities.length;

    if(capStatus){
            capStatus.textContent =
            `${Math.min(total, cap)} of ${cap} activities used.`;
            const capalert = document.querySelector("#cap-alert");
            if(capAlert) {
                const limitReached = total >= cap;
                capAlert.hidden = !limitReached;
                capAlert.textContent = limitReached
                ? `Activity limit reached: ${cap}. Increase the cap or remove an activity to add another.`
                : "";
            }
            }
        
    }
}
function saveAndRender(){
    saveActivities(activities);
    updateDashboard(activities);
    updateCapStatus();
    displayActivities();
}
function displayActivities(){
let results=[...activities];
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
 renderActivities(results, activitiesContainer);
}
form?.addEventListener("submit", event =>){
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
        updateAt: new Date().toISOString()
    };
    const validation =validate Activity(activity);
    if (!validation.isValid) {
        const messages=Object.values(validation.errors).join("\n");
        alert (messages);
        return; 
    }
    addActivity(activity);
    saveAndRender();
    form.reset();

};
searchInput?.addEventListener("input", displayActivities);
tagFilter?.addEventListener("change", displayActivities);
sortBy?.addEventListener("change", displayActivities);
caseInsensitive?.addEventListener("change", displayActivities);
activityCapInput?.addEventListener("change", () =>{
    const cap = Number(activityCapInput.value);
    if(!Number.isInteger(cap) || cap < 1 || cap > 100) {
        activityCapInput.value = settings.activityCap;
        updatecapStatus();
        return;
    }
    settings.activityCap = cap;
    saveSettings(settings);
    updateCapStatus();
});

saveSettings(settings);
updateDashboard(activities);
updateCapStatus();
displayActivities();
