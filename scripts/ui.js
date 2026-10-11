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
    export function updateDashboard(activities) {
        const totalElement =document.querySelector("#total-activities");
        const upcomingElement=document.querySelector("#upcoming-activities");
        const completedElement =document.querySelector("#completed-activities")
        const durationElement = document.querySelector("#total-duration");
        const topTagElement = document.querySelector("#top_tag");
        const total =activities.length;
        const weeklyTrendElement = document.querySelector("#weekly-trend");
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const lastSevenDays = [];
        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);

            const dateKey = [
                date.getFullYear(),
                String(date.getMonth() + 1).padStart(2, "0"),
                String(date.getDate()).padStart(2, "0")
            ].join("-");
            const count = activities.filter(activity =>
                activity.createdAt &&
                activity.createdAt.slice(0, 10) ===dateKey
            ).length;

            lastSevenDays.push({
                date:dateKey,
                count
            });
        }
        if (weeklyTrendElement){
            weeklyTrendElement.textContent = lastSevenDays
            .map(day => `${day.date}: ${day.count} activities`)
            .join(" | ");
        }

        const completed=activities.filter(
            activity=> activity.status ==="Completed"
        ).length;
        const upcoming =total - completed;
        const totalDuration = activities.reduce(
            (sum, activity) => sum + Number(activity.duration || 0),
            0
        );
        const tagCounts = {};
        activities.forEach(activity =>){
            const tag =activity.tag?.trim();
            if (tag) {
                const key = tag.toLowerCase();
                if(!tagCounts[key]) {
                    tagCounts[key] ={ name: tag, count: 0 };
                }
                tagCounts[key].count++;
            }


        };
        const tags = Object.values(tagCounts);
        const topTag = tags.sort((a, b) => b.count - a.count)[0];

        if (totalElement){
            totalElement.textContent= total;

        }
        if(upcomingElement) {
            upcomingElement.textContent =upcoming;
        }
        if (completedElement) {
            completedElement.textContent=completed;
        }
        if (durationElement) {
            durationElement.textContent = `${totalDuration} minutes`;
        }
        if (topTagElement) {
            topTagElement.textContent = topTag 
            ? `${topTag.name} (${topTag.count})`
            : "None yet";
        }

        
    }

