export function validateActivity(activity) {
    const errors ={};
     const title =activity.title?.trim() || "";
     if(title.length <3 || title.length >100) {
        errors.title ="Title must be between 3 and 100  characters.";
     }
     const dueDate = activity.dueDate;
     if (!dueDate || !/^\d{4}-\d{2}-\d{2}$/.test(dueDate)) {
        errors.dueDate ="Enter a valid due date.";
     }
     else {
        const [year, month, day] = dueDate.split("-").map(Number);
        const parsedDate = new Date(year, month - 1, day);

        if (
            parsedDate.getFullYear() !== year ||
            parsedDate.getMonth() !== month - 1 ||
            parsedDate.getDate() !== day
        ) {
            errors.dueDate = "Enter a valid due date.";
        } else {
            const now = new Date();
            const today = new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate()
            );
            if(parsedDate < today) {
                errors.dueDate = "Due Date must be today or in the future.";

            }
        }
    }
    
      const duration = Number(activity.duration);
      if (!Number.isInteger(duration) || duration <1 ||duration >1440) {
        errors.duration ="Duration must be an integer from 1 to 1440 minutes.";
      }
      const tag =activity.tag?.trim() || "";
      const tagPattern =/^[A-Za-z][A-Za-z -]{1,29}$/;
      if(!tagPattern.test(tag)) {
        errors.tag ="Tag must start with a letter and contain 2-30 letters, spaces, or hyphens.";
      }
      if (/(.)\1{2,}/.test(title)) {
        errors.title = "Avoid repeating the same character three or more times.";
      }
      if(/<[^>]*>/.test(title)){
        errors.title ="HTML tags are not allowed in the title.";

      }
      return{
        isValid: Object.keys(errors).length ===0,
        errors
      }
    };

