export function searchActivities(activities, query, ignoreCase =true) {
    if(!query.trim()) {
        return { results: [...activities], error:null };
    }
     let pattern;
      try {
        const flags=ignoreCase ? "gi" : "g";
        pattern = new RegExp(query,flags);
      }catch (error){
        return {
            results: [],
            error: "Invalid regular expression.Please check your search pattern."
        };
        }
        const results = activities.filter(activity => {
            const searchableText =[
                activity.title,
                activity.tag,
                activity.dueDate,
                activity.status || ""
            ].join(" ");

            pattern.lastIndex =0;
            return pattern.test(searchableText);
        });
        return {results, error: null };
      }
      export function sortActivities(activities, sortBy ="dueDate-asc") {
        const sorted =[...activities];
         
        switch(sortBy) {
            case "dueDate-asc":
                return sorted.sort((a, b) =>
                    a.dueDate.localeCompare(b.dueDate)
            );
             case "dueDate-desc":
                return sorted.sort((a, b) =>
                    b.dueDate.localeCompare(a.dueDate)
            );
             case "title-asc":
                return sorted.sort((a, b) =>
                    a.title.localeCompare(b.title)
            );
             case "title-desc":
                return sorted.sort((a, b) =>
                    b.title.localeCompare(a.title)
            );
             case "duration-asc":
                return sorted.sort((a, b) =>
                   Number (a.duration)-Number(b.duration)
            );
             case "duration-desc":
                return sorted.sort((a, b) =>
                    Number(b.duration)-Number(a.duration)
            );
            default:
                return sorted;
        }
        }
