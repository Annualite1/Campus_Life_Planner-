export function renderActivities(activities, container) {
    container.replaceChildren();

    if(activities.length === 0){
        const message =document.createElement("p");
        message.textContent ="No activities found. add an activity  to get started.";
        container.appendChild(message);
        return;
    }
    activities.forEach(activity =>) {
        const card =document.createElement("article");
        card.className ="activity-card";
         const title =document.createElement("h3");
         title.textContent=activity.title;
         const dueDate=document.createElement("p");
         dueDate.textContent= `Due date: ${activity.dueDate}`;
         const duration =document.createElement("p");
         duration.textContent=`Duration: ${activity.duration} minutes`;
         const tag =document.createElement("p");
         tag.textContent =`tag: ${activity.tag}`;
         const status = document.createElement("p");
         status.textContent = `Status: ${activity.status || "Upcoming"}`;

         card.append(title,dueDate,duration,tag,status);
         container.appendChild(card);
    };

    }
    export function updatedashboard(activities) {
        const totalElement =document.querySelector("#total-activities");
        const upcomingElement=document.querySelector("#upcoming-activities");
        const completedElement =document.querySelector("#completed-activities")
        const total =activities.length;
        const completed=activities.filter(
            activity=> activity.status ==="completed"
        ).length;
        const upcoming =total - completed;
        if (totalElement){
            totalElement.textContent= total;

        }
        if(upcomingElement) {
            upcomingElement.textContent =upcoming;
        }
        if (completedElement) {
            completedElement.textContent=completed;
        }

        
    }

