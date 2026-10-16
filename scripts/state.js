export let activities = [];
export let settings = {
    durationUnit: "minutes",
    activityCap:10
};
export function setActivities(newActivities) {
    activities = newActivities;
}
export function addActivity(activity) {
    activities.push(activity);
}
export function updateActivity(id,updatedFields) {
    activities = activities.map(activity =>activity.id ===id ? {
        ...activity, ...updatedFields } :activity);
     } 
     export function updateSettings(newSettings) {
        settings = { ...settings, ...newSettings };
}