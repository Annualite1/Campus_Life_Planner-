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
const searcStatus = document.querySelector("#search-status");
const savedActivities = loadActivities();
if(savedActivities) {
    setActivities(savedActivities);
}
const savedSettings= loadSettings();
if(savedSettings) {
    Object.assign(settings,savedSettings);

}
function saveAndRender(){
    saveActivities(activities);
    updateDashboard(activities);
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

saveSettings(settings);
updateDashboard(activities);
displayActivities();
